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
    const { html, format, fileName } = await req.json();
    console.log(`Exporting resume as ${format}`);

    if (format === 'html') {
      return new Response(JSON.stringify({ 
        content: html,
        fileName: `${fileName}.html`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (format === 'pdf') {
      // For PDF, we'll use jsPDF via a client-side library
      // Return the HTML with styling for client-side PDF generation
      return new Response(JSON.stringify({ 
        html,
        fileName: `${fileName}.pdf`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (format === 'docx') {
      // For DOCX, we'll use html-docx-js via client-side
      return new Response(JSON.stringify({ 
        html,
        fileName: `${fileName}.docx`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Unsupported format');
  } catch (error) {
    console.error('Export error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
