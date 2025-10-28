import { useState } from "react";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { AIEnhanceModal } from "./AIEnhanceModal";
import { Navbar } from "./Navbar";
import { Button } from "./ui/button";
import { ResumeData, TemplateType } from "@/types/resume";
import { ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";

interface EditorViewProps {
  template: TemplateType;
  onBack: () => void;
}

export const EditorView = ({ template, onBack }: EditorViewProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    workExperience: [
      {
        id: "1",
        jobTitle: "",
        company: "",
        dates: "",
        responsibilities: "",
      },
    ],
    education: [
      {
        id: "1",
        degree: "",
        institution: "",
        graduationDate: "",
        details: "",
      },
    ],
    skills: "",
  });

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [enhancedText, setEnhancedText] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhanceClick = async (jobId: string, currentText: string) => {
    if (!currentText.trim()) {
      toast.error("Please enter some responsibilities first");
      return;
    }

    setSelectedJobId(jobId);
    setIsAIModalOpen(true);
    setIsEnhancing(true);

    try {
      // Mock AI enhancement - in production, this would call Lovable AI
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enhanced version with professional formatting
      const enhanced = `• Spearheaded the development of innovative features, resulting in a 40% increase in user engagement and system efficiency
• Architected and implemented scalable solutions that reduced processing time by 35% and improved overall performance
• Collaborated with cross-functional teams to deliver high-quality products within aggressive timelines
• Mentored and coached junior developers, fostering a culture of continuous learning and technical excellence
• Led code reviews and established best practices that enhanced code quality and maintainability`;
      
      setEnhancedText(enhanced);
    } catch (error) {
      toast.error("Failed to enhance text");
      setIsAIModalOpen(false);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleUseEnhancedText = (text: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
        exp.id === selectedJobId ? { ...exp, responsibilities: text } : exp
      ),
    }));
  };

  const handleDownloadPDF = async () => {
    toast.info("Generating PDF...");
    
    // Get the resume preview element
    const previewElement = document.getElementById("resume-preview");
    if (!previewElement) {
      toast.error("Preview not found");
      return;
    }

    try {
      // PDF.co API integration
      const apiKey = "ngwanatiyanitn@gmail.com_Gydv9BCJQBUlqMzLfA6E5GTDlcpbqslSRzcJZSEDa2wUMQGN9lYyjDWqimoLKBEr";
      
      // Convert HTML to string
      const htmlContent = previewElement.outerHTML;
      
      // Create a complete HTML document
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; }
            .font-serif { font-family: Georgia, serif; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;

      // Call PDF.co API
      const response = await fetch("https://api.pdf.co/v1/pdf/convert/from/html", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          html: fullHtml,
          name: `${resumeData.name || 'Resume'}.pdf`,
          margins: "10mm",
          paperSize: "Letter",
          orientation: "Portrait",
          printBackground: true,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      if (data.url) {
        // Download the PDF
        const link = document.createElement("a");
        link.href = data.url;
        link.download = `${resumeData.name || 'Resume'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success("PDF downloaded successfully!");
      } else {
        throw new Error("No PDF URL returned");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navbar onLogoClick={onBack} />
      
      {/* Header */}
      <header className="sticky top-20 z-40 bg-card/95 backdrop-blur-lg border-b shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Button>
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume Editor
          </h1>
          
          <Button
            variant="gradient"
            onClick={handleDownloadPDF}
            className="gap-2 shadow-elegant hover:shadow-glow transition-all hover:scale-105"
            size="lg"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Form */}
          <div className="lg:sticky lg:top-24 h-[calc(100vh-12rem)] overflow-hidden">
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              onEnhanceClick={handleEnhanceClick}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-muted/50 p-8 rounded-xl shadow-xl">
              <ResumePreview data={resumeData} template={template} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Enhancement Modal */}
      <AIEnhanceModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onUseText={handleUseEnhancedText}
        enhancedText={enhancedText}
        isLoading={isEnhancing}
      />
    </div>
  );
};
