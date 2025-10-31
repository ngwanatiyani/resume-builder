import { FileText, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface NavbarProps {
  onLogoClick?: () => void;
  showGetStarted?: boolean;
  onGetStarted?: () => void;
}

export const Navbar = ({ onLogoClick, showGetStarted, onGetStarted }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="mx-2 md:mx-4 mt-2 md:mt-4">
        <div className="bg-card/70 backdrop-blur-xl border border-border/50 rounded-2xl shadow-elegant">
          <div className="container mx-auto px-3 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={onLogoClick}
                className="flex items-center gap-2 md:gap-3 group transition-all hover:scale-105"
              >
                <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow group-hover:shadow-glow transition-all">
                  <FileText className="w-4 h-4 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <span className="text-base md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  LEO AI
                </span>
              </button>

              {/* Desktop Navigation Links */}
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

              {/* Desktop CTA Button */}
              {showGetStarted && onGetStarted && (
                <Button 
                  onClick={onGetStarted}
                  className="hidden md:flex shadow-elegant hover:shadow-glow transition-all"
                >
                  Get Started
                </Button>
              )}

              {/* Mobile Menu Button */}
              {showGetStarted && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-foreground" />
                  ) : (
                    <Menu className="w-5 h-5 text-foreground" />
                  )}
                </button>
              )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && showGetStarted && (
              <div className="md:hidden mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col gap-4">
                  <a 
                    href="#how-it-works" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  >
                    How It Works
                  </a>
                  <a 
                    href="#mission" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  >
                    Mission
                  </a>
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  >
                    About
                  </a>
                  {onGetStarted && (
                    <Button 
                      onClick={() => {
                        onGetStarted();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full shadow-elegant hover:shadow-glow transition-all"
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
