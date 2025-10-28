import { FileText } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onLogoClick?: () => void;
  showGetStarted?: boolean;
  onGetStarted?: () => void;
}

export const Navbar = ({ onLogoClick, showGetStarted, onGetStarted }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="mx-4 mt-4">
        <div className="bg-card/70 backdrop-blur-xl border border-border/50 rounded-2xl shadow-elegant">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={onLogoClick}
                className="flex items-center gap-3 group transition-all hover:scale-105"
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow group-hover:shadow-glow transition-all">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LEO AI
                </span>
              </button>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <a 
                  href="#how-it-works" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  How It Works
                </a>
                <a 
                  href="#mission" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Mission
                </a>
                <a 
                  href="#about" 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  About
                </a>
              </div>

              {/* CTA Button */}
              {showGetStarted && onGetStarted && (
                <Button 
                  onClick={onGetStarted}
                  className="shadow-elegant hover:shadow-glow transition-all"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
