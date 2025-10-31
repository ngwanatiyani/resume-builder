import { TemplateCard } from "./TemplateCard";
import { Navbar } from "./Navbar";
import { Button } from "./ui/button";
import { TemplateType } from "@/types/resume";
import modernTemplate from "@/assets/modern-template.png";
import classicTemplate from "@/assets/classic-template.png";
import creativeTemplate from "@/assets/creative-template.png";
import { FileText } from "lucide-react";

interface TemplateSelectionProps {
  onSelectTemplate: (template: TemplateType) => void;
  selectedTemplate?: TemplateType;
  onBack?: () => void;
}

export const TemplateSelection = ({ onSelectTemplate, selectedTemplate, onBack }: TemplateSelectionProps) => {
  const templates = [
    {
      id: 'modern' as TemplateType,
      name: 'Modern',
      description: 'Clean and contemporary design with bold typography',
      image: modernTemplate,
    },
    {
      id: 'classic' as TemplateType,
      name: 'Classic',
      description: 'Traditional and professional serif layout',
      image: classicTemplate,
    },
    {
      id: 'creative' as TemplateType,
      name: 'Creative',
      description: 'Bold and unique design that stands out',
      image: creativeTemplate,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-3 md:p-6 bg-gradient-to-br from-background via-background to-muted">
      <Navbar onLogoClick={onBack} />
      
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-2 md:p-3 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-foreground px-4">
            LEO AI Resume Builder
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Choose a template to start crafting your professional resume with AI assistance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
          {templates.map((template, index) => (
            <div 
              key={template.id}
              className="animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TemplateCard
                name={template.name}
                description={template.description}
                image={template.image}
                isSelected={selectedTemplate === template.id}
                onClick={() => onSelectTemplate(template.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
