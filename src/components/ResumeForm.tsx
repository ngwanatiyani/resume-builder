import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumeData, WorkExperience, Education } from "@/types/resume";
import { Plus, Sparkles, Trash2 } from "lucide-react";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onEnhanceClick: (jobId: string, currentText: string) => void;
}

export const ResumeForm = ({ data, onChange, onEnhanceClick }: ResumeFormProps) => {
  const handleChange = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleWorkExpChange = (id: string, field: keyof WorkExperience, value: string) => {
    const updatedExperience = data.workExperience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, workExperience: updatedExperience });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      dates: "",
      responsibilities: "",
    };
    onChange({ ...data, workExperience: [...data.workExperience, newExp] });
  };

  const removeWorkExperience = (id: string) => {
    if (data.workExperience.length > 1) {
      onChange({
        ...data,
        workExperience: data.workExperience.filter((exp) => exp.id !== id),
      });
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = data.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updatedEducation });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      graduationDate: "",
      details: "",
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const removeEducation = (id: string) => {
    if (data.education.length > 1) {
      onChange({
        ...data,
        education: data.education.filter((edu) => edu.id !== id),
      });
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-4">
      <Card className="p-6 space-y-4 border-2">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john.doe@email.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-4 border-2">
        <h2 className="text-xl font-semibold text-foreground">Professional Summary</h2>
        <div>
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Write a brief professional summary..."
            className="mt-1 min-h-[120px]"
          />
        </div>
      </Card>

      <Card className="p-6 space-y-4 border-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addWorkExperience}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>

        {data.workExperience.map((exp, index) => (
          <Card key={exp.id} className="p-4 space-y-4 bg-muted/30 relative">
            {data.workExperience.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeWorkExperience(exp.id)}
                className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            
            <h3 className="font-medium text-muted-foreground">Position {index + 1}</h3>
            
            <div>
              <Label htmlFor={`jobTitle-${exp.id}`}>Job Title</Label>
              <Input
                id={`jobTitle-${exp.id}`}
                value={exp.jobTitle}
                onChange={(e) => handleWorkExpChange(exp.id, "jobTitle", e.target.value)}
                placeholder="Senior Software Engineer"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`company-${exp.id}`}>Company</Label>
              <Input
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) => handleWorkExpChange(exp.id, "company", e.target.value)}
                placeholder="Tech Company Inc."
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`dates-${exp.id}`}>Dates</Label>
              <Input
                id={`dates-${exp.id}`}
                value={exp.dates}
                onChange={(e) => handleWorkExpChange(exp.id, "dates", e.target.value)}
                placeholder="Jan 2020 - Present"
                className="mt-1"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor={`responsibilities-${exp.id}`}>Responsibilities</Label>
                <Button
                  type="button"
                  variant="ai"
                  size="sm"
                  onClick={() => onEnhanceClick(exp.id, exp.responsibilities)}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Enhance with AI
                </Button>
              </div>
              <Textarea
                id={`responsibilities-${exp.id}`}
                value={exp.responsibilities}
                onChange={(e) => handleWorkExpChange(exp.id, "responsibilities", e.target.value)}
                placeholder="• Led development of key features&#10;• Improved system performance by 40%&#10;• Mentored junior developers"
                className="mt-1 min-h-[150px]"
              />
            </div>
          </Card>
        ))}
      </Card>

      <Card className="p-6 space-y-4 border-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Education</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEducation}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </div>

        {data.education.map((edu, index) => (
          <Card key={edu.id} className="p-4 space-y-4 bg-muted/30 relative">
            {data.education.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            
            <h3 className="font-medium text-muted-foreground">Education {index + 1}</h3>
            
            <div>
              <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
              <Input
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                placeholder="University Name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`graduationDate-${edu.id}`}>Graduation Date</Label>
              <Input
                id={`graduationDate-${edu.id}`}
                value={edu.graduationDate}
                onChange={(e) => handleEducationChange(edu.id, "graduationDate", e.target.value)}
                placeholder="May 2020"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`details-${edu.id}`}>Details (Optional)</Label>
              <Textarea
                id={`details-${edu.id}`}
                value={edu.details}
                onChange={(e) => handleEducationChange(edu.id, "details", e.target.value)}
                placeholder="GPA: 3.8/4.0&#10;Honors, Awards, Relevant Coursework..."
                className="mt-1 min-h-[80px]"
              />
            </div>
          </Card>
        ))}
      </Card>

      <Card className="p-6 space-y-4 border-2">
        <h2 className="text-xl font-semibold text-foreground">Skills</h2>
        <div>
          <Label htmlFor="skills">Skills</Label>
          <Textarea
            id="skills"
            value={data.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
            className="mt-1 min-h-[100px]"
          />
        </div>
      </Card>
    </div>
  );
};
