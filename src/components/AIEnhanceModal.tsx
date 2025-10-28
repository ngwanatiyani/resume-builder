import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface AIEnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseText: (text: string) => void;
  enhancedText: string;
  isLoading: boolean;
}

export const AIEnhanceModal = ({ isOpen, onClose, onUseText, enhancedText, isLoading }: AIEnhanceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI-Enhanced Description
          </DialogTitle>
          <DialogDescription>
            Our AI has enhanced your job responsibilities to make them more impactful and professional.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Enhancing your text with AI...</p>
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-6 max-h-96 overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {enhancedText}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              onUseText(enhancedText);
              onClose();
            }}
            disabled={isLoading}
            className="flex-1"
          >
            Use This Text
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
