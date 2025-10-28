import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { FileText, Sparkles, Download, Users, Target, Heart } from "lucide-react";

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing = ({ onGetStarted }: LandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navbar showGetStarted onGetStarted={onGetStarted} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-32">
        <div className="text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-elegant">
              <FileText className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
            LEO AI Resume Builder
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Create professional, ATS-friendly resumes in minutes with the power of AI
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-20 bg-card/50 backdrop-blur-sm scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to your perfect resume
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center hover:shadow-elegant transition-all duration-300 border-border animate-in fade-in slide-in-from-bottom-6 hover:scale-105" style={{ animationDelay: "100ms" }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Choose a Template</h3>
            <p className="text-muted-foreground leading-relaxed">
              Select from our professionally designed templates that are optimized for applicant tracking systems
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-elegant transition-all duration-300 border-border animate-in fade-in slide-in-from-bottom-6 hover:scale-105" style={{ animationDelay: "200ms" }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Enhance with AI</h3>
            <p className="text-muted-foreground leading-relaxed">
              Let our AI technology polish your job descriptions and make them stand out to recruiters
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-elegant transition-all duration-300 border-border animate-in fade-in slide-in-from-bottom-6 hover:scale-105" style={{ animationDelay: "300ms" }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Download & Apply</h3>
            <p className="text-muted-foreground leading-relaxed">
              Export your polished resume as a PDF and start applying to your dream jobs immediately
            </p>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="container mx-auto px-6 py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Mission
            </h2>
          </div>
          <Card className="p-10 border-border shadow-card">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At LEO AI Resume Builder, we believe everyone deserves access to professional tools that help them succeed in their career journey. Our mission is to democratize professional resume creation by combining cutting-edge AI technology with expert design principles.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're committed to helping job seekers present their best selves to potential employers, removing barriers and making the job application process simpler, faster, and more effective.
            </p>
          </Card>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="container mx-auto px-6 py-20 bg-card/50 backdrop-blur-sm scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About Us
            </h2>
          </div>
          <Card className="p-10 border-border shadow-card">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              LEO AI Resume Builder was founded by a team of career coaches, HR professionals, and AI engineers who saw the challenges job seekers face in creating compelling resumes. We combined our expertise to build a platform that takes the stress out of resume writing.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our AI technology has been trained on thousands of successful resumes across various industries, ensuring that your resume not only looks professional but also passes through applicant tracking systems with ease.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary mt-8">
              <Heart className="w-6 h-6" />
              <p className="text-lg font-semibold">Built with care for your career success</p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of successful job seekers who landed their dream jobs with LEO AI
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all"
          >
            Start Building Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2025 LEO AI Resume Builder. Empowering careers with AI.</p>
        </div>
      </footer>
    </div>
  );
};
