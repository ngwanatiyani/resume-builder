import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ResumeData } from "@/types/resume";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ATSCheckTabProps {
  resumeData: ResumeData;
}

interface ATSAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  keywords: string[];
}

export const ATSCheckTab = ({ resumeData }: ATSCheckTabProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ats-check', {
        body: { resumeData }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success("ATS analysis complete!");
    } catch (error) {
      console.error('ATS check error:', error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">ATS Compatibility Check</h2>
        <p className="text-muted-foreground">
          Analyze how well your resume will perform with Applicant Tracking Systems
        </p>
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        size="lg"
        className="w-full"
        variant="gradient"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Resume for ATS'
        )}
      </Button>

      {analysis && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="p-6 border-2">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-2">{analysis.score}%</div>
              <div className="text-muted-foreground">ATS Compatibility Score</div>
            </div>

            {analysis.strengths.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-4">• {strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.improvements.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-4">• {improvement}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-4">• {rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.keywords.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Suggested Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
