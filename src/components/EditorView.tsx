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
      <header className="sticky top-16 md:top-20 z-40 bg-card/95 backdrop-blur-lg border-b shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-1 md:gap-2 hover:scale-105 transition-transform text-xs md:text-sm px-2 md:px-4"
            size="sm"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Back to Templates</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <h1 className="text-sm md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume Editor
          </h1>
          
          <Button
            variant="gradient"
            className="gap-1 md:gap-2 shadow-elegant hover:shadow-glow transition-all hover:scale-105 text-xs md:text-sm px-2 md:px-4"
            size="sm"
            onClick={handleDownloadPDF}
          >
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Export as PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column - Tabbed Controls */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <Tabs defaultValue="editor" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 mb-3 md:mb-4">
                <TabsTrigger value="editor" className="text-xs md:text-sm">Editor</TabsTrigger>
                <TabsTrigger value="ats" className="text-xs md:text-sm">ATS Check</TabsTrigger>
                <TabsTrigger value="job-match" className="text-xs md:text-sm">Job Match</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto pr-2 md:pr-4">
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
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="bg-muted/50 p-3 md:p-8 rounded-xl shadow-xl overflow-auto max-h-[60vh] lg:max-h-full">
              <ResumePreview data={resumeData} template={template} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
