import { useState } from "react";
import { Landing } from "./Landing";
import { TemplateSelection } from "@/components/TemplateSelection";
import { EditorView } from "@/components/EditorView";
import { TemplateType } from "@/types/resume";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'templates' | 'editor'>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);

  const handleGetStarted = () => {
    setCurrentView('templates');
  };

  const handleSelectTemplate = (template: TemplateType) => {
    setSelectedTemplate(template);
    setCurrentView('editor');
  };

  const handleBackToTemplates = () => {
    setCurrentView('templates');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedTemplate(null);
  };

  return (
    <>
      {currentView === 'landing' && (
        <Landing onGetStarted={handleGetStarted} />
      )}
      {currentView === 'templates' && (
        <TemplateSelection
          onSelectTemplate={handleSelectTemplate}
          selectedTemplate={selectedTemplate || undefined}
          onBack={handleBackToLanding}
        />
      )}
      {currentView === 'editor' && selectedTemplate && (
        <EditorView template={selectedTemplate} onBack={handleBackToTemplates} />
      )}
    </>
  );
};

export default Index;
