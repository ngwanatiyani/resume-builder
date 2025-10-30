import { useState } from "react";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { ATSCheckTab } from "./ATSCheckTab";
import { JobMatchTab } from "./JobMatchTab";
import { Navbar } from "./Navbar";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ResumeData, TemplateType } from "@/types/resume";
import { ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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


  const handleDownloadPDF = async () => {
    toast.info("Generating PDF...");
    
    const previewElement = document.getElementById("resume-preview");
    if (!previewElement) {
      toast.error("Preview not found");
      return;
    }

    try {
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resumeData.name || 'Resume'}.pdf`);
      
      toast.success("PDF downloaded successfully!");
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
            className="gap-2 shadow-elegant hover:shadow-glow transition-all hover:scale-105"
            size="lg"
            onClick={handleDownloadPDF}
          >
            <Download className="w-4 h-4" />
            Export as PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Tabbed Controls */}
          <div className="lg:sticky lg:top-24 h-[calc(100vh-12rem)] overflow-hidden">
            <Tabs defaultValue="editor" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="ats">ATS Check</TabsTrigger>
                <TabsTrigger value="job-match">Job Match</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto pr-4">
                <TabsContent value="editor" className="mt-0">
                  <ResumeForm
                    data={resumeData}
                    onChange={setResumeData}
                  />
                </TabsContent>
                
                <TabsContent value="ats" className="mt-0">
                  <ATSCheckTab resumeData={resumeData} />
                </TabsContent>
                
                <TabsContent value="job-match" className="mt-0">
                  <JobMatchTab resumeData={resumeData} />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-muted/50 p-8 rounded-xl shadow-xl">
              <ResumePreview data={resumeData} template={template} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
