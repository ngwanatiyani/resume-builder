import { ResumeData, TemplateType } from "@/types/resume";
import { cn } from "@/lib/utils";
import { Mail, Phone, Linkedin } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const templateStyles = {
    modern: "font-sans",
    classic: "font-serif",
    creative: "font-sans",
  };

  return (
    <div
      className={cn(
        "w-full bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden",
        "min-h-[400px] md:min-h-[842px] p-4 sm:p-6 md:p-12",
        templateStyles[template]
      )}
      id="resume-preview"
    >
      {/* Modern Template */}
      {template === 'modern' && (
        <div className="space-y-8">
          <div className="border-b-2 border-gray-300 pb-4 md:pb-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-3 tracking-tight break-words">
              {data.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-700">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-gray-600" />
                  <span>{data.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {data.summary && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-200 pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-800 leading-relaxed text-[15px]">{data.summary}</p>
            </div>
          )}

          {data.workExperience.length > 0 && data.workExperience[0].jobTitle && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-200 pb-2">
                Work Experience
              </h2>
              <div className="space-y-5">
                {data.workExperience.map((job) => (
                  job.jobTitle && (
                    <div key={job.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[17px] text-gray-900">{job.jobTitle}</h3>
                        <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">{job.dates}</span>
                      </div>
                      <p className="text-gray-700 font-semibold mb-2 text-[15px]">{job.company}</p>
                      <div className="text-gray-800 whitespace-pre-line leading-relaxed text-[14px]">
                        {job.responsibilities}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && data.education[0].degree && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  edu.degree && (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[16px] text-gray-900">{edu.degree}</h3>
                        <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">{edu.graduationDate}</span>
                      </div>
                      <p className="text-gray-700 font-semibold mb-1 text-[15px]">{edu.institution}</p>
                      {edu.details && (
                        <div className="text-gray-800 whitespace-pre-line leading-relaxed text-[14px]">
                          {edu.details}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {data.skills && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-200 pb-2">
                Skills
              </h2>
              <p className="text-gray-800 leading-relaxed text-[15px]">{data.skills}</p>
            </div>
          )}
        </div>
      )}

      {/* Classic Template */}
      {template === 'classic' && (
        <div className="space-y-7">
          <div className="text-center border-b-2 border-gray-800 pb-3 md:pb-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 tracking-wide break-words">
              {data.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-xs md:text-sm text-gray-700">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>•</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.linkedin && <span>•</span>}
              {data.linkedin && <span>{data.linkedin}</span>}
            </div>
          </div>

          {data.summary && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                Professional Summary
              </h2>
              <p className="text-gray-800 leading-relaxed text-[15px]">{data.summary}</p>
            </div>
          )}

          {data.workExperience.length > 0 && data.workExperience[0].jobTitle && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-5">
                {data.workExperience.map((job) => (
                  job.jobTitle && (
                    <div key={job.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[16px] text-gray-900">{job.jobTitle}</h3>
                        <span className="text-sm text-gray-600 italic whitespace-nowrap ml-4">{job.dates}</span>
                      </div>
                      <p className="text-gray-800 italic mb-2 text-[15px] font-medium">{job.company}</p>
                      <div className="text-gray-800 whitespace-pre-line leading-relaxed text-[14px]">
                        {job.responsibilities}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && data.education[0].degree && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  edu.degree && (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[15px] text-gray-900">{edu.degree}</h3>
                        <span className="text-sm text-gray-600 italic whitespace-nowrap ml-4">{edu.graduationDate}</span>
                      </div>
                      <p className="text-gray-800 italic mb-1 text-[14px] font-medium">{edu.institution}</p>
                      {edu.details && (
                        <div className="text-gray-800 whitespace-pre-line leading-relaxed text-[13px]">
                          {edu.details}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {data.skills && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide border-b-2 border-gray-400 pb-1">
                Core Competencies
              </h2>
              <p className="text-gray-800 leading-relaxed text-[15px]">{data.skills}</p>
            </div>
          )}
        </div>
      )}

      {/* Creative Template */}
      {template === 'creative' && (
        <div className="space-y-7">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 -m-4 sm:-m-6 md:-m-12 mb-4 md:mb-8 p-4 sm:p-6 md:p-10 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 md:mb-4 tracking-tight break-words">
              {data.name || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-2 md:gap-5 text-xs md:text-sm">
              {data.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span>{data.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {data.summary && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wide">
                Professional Profile
              </h2>
              <p className="text-gray-800 leading-relaxed text-[15px]">{data.summary}</p>
            </div>
          )}

          {data.workExperience.length > 0 && data.workExperience[0].jobTitle && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-5 uppercase tracking-wide">
                Career Experience
              </h2>
              <div className="space-y-6">
                {data.workExperience.map((job) => (
                  job.jobTitle && (
                    <div key={job.id} className="border-l-4 border-gray-800 pl-5">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[17px] text-gray-900">{job.jobTitle}</h3>
                        <span className="text-sm text-gray-600 font-semibold whitespace-nowrap ml-4">{job.dates}</span>
                      </div>
                      <p className="text-gray-700 font-semibold mb-2 text-[15px]">{job.company}</p>
                      <div className="text-gray-800 whitespace-pre-line leading-relaxed text-[14px]">
                        {job.responsibilities}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && data.education[0].degree && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-5 uppercase tracking-wide">
                Education
              </h2>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  edu.degree && (
                    <div key={edu.id} className="border-l-4 border-gray-800 pl-5">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-[16px] text-gray-900">{edu.degree}</h3>
                        <span className="text-sm text-gray-600 font-semibold whitespace-nowrap ml-4">{edu.graduationDate}</span>
                      </div>
                      <p className="text-gray-700 font-semibold mb-2 text-[15px]">{edu.institution}</p>
                      {edu.details && (
                        <div className="text-gray-800 whitespace-pre-line leading-relaxed text-[14px]">
                          {edu.details}
                        </div>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {data.skills && (
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wide">
                Key Skills
              </h2>
              <p className="text-gray-800 leading-relaxed text-[15px]">{data.skills}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
