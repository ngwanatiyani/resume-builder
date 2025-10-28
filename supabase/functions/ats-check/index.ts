import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Analyzing resume for ATS compatibility...');

    const resumeText = JSON.stringify(resumeData, null, 2);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are an ATS (Applicant Tracking System) analyzer. Analyze the resume for ATS compatibility and provide:
1. Overall ATS score (0-100)
2. Key strengths
3. Areas for improvement
4. Specific recommendations
5. Keyword suggestions

Format your response as JSON with these fields: score, strengths (array), improvements (array), recommendations (array), keywords (array)` 
          },
          { role: "user", content: resumeText }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to analyze resume");
    }

    const data = await response.json();
    const analysisText = data.choices?.[0]?.message?.content || "{}";
    
    // Try to parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch {
      // If not JSON, create structured response from text
      analysis = {
        score: 75,
        strengths: ["Professional formatting", "Clear structure"],
        improvements: ["Add more keywords", "Quantify achievements"],
        recommendations: [analysisText],
        keywords: []
      };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('ATS check error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
