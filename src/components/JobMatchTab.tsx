import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ResumeData } from "@/types/resume";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Target, AlertTriangle, Lightbulb } from "lucide-react";

interface JobMatchTabProps {
  resumeData: ResumeData;
}

interface JobMatchAnalysis {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  keyPhrases: string[];
}

export const JobMatchTab = ({ resumeData }: JobMatchTabProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JobMatchAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('job-match', {
        body: { resumeData, jobDescription }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast.success("Job match analysis complete!");
    } catch (error) {
      console.error('Job match error:', error);
      toast.error("Failed to analyze job match. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Job Description Match</h2>
        <p className="text-muted-foreground">
          See how well your resume matches a specific job posting
        </p>
      </div>

      <div>
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="mt-2 min-h-[200px]"
        />
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !jobDescription.trim()}
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
          'Analyze Match'
        )}
      </Button>

      {analysis && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="p-6 border-2">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-2">{analysis.matchScore}%</div>
              <div className="text-muted-foreground">Job Match Score</div>
            </div>

            {analysis.matchingSkills.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Matching Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchingSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.missingSkills.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-4">• {rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.keyPhrases.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Key Phrases to Add</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keyPhrases.map((phrase, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {phrase}
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
