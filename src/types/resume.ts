export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  dates: string;
  responsibilities: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationDate: string;
  details: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string;
}

export type TemplateType = 'modern' | 'classic' | 'creative';
