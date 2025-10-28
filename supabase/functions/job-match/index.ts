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
    const { resumeData, jobDescription } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Analyzing job match...');

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
            content: `You are a career advisor analyzing job fit. Compare the resume against the job description and provide:
1. Overall match score (0-100)
2. Matching skills (array)
3. Missing skills (array)
4. Recommendations for tailoring the resume (array)
5. Key phrases to add (array)

Format your response as JSON with these fields: matchScore, matchingSkills, missingSkills, recommendations, keyPhrases` 
          },
          { 
            role: "user", 
            content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to analyze job match");
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
        matchScore: 70,
        matchingSkills: [],
        missingSkills: [],
        recommendations: [analysisText],
        keyPhrases: []
      };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Job match error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
