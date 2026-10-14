import React from 'react';
import { SKILLS_MATRIX } from '../data/projectData';
import { CheckCircle2, Wrench, Brain, HelpCircle, MessageSquare } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
            <span>Candidate Competency Profile</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Demonstrated in GameZone Project</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Skills Demonstrated & Interview Talking Points
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Concrete evidence of technical rigor and business instinct applied across all phases of the audit.
          </p>
        </div>

        {/* 2-Column Grid: Hard Skills vs Soft Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: Hard Technical Skills */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-5">
                <div className="p-2 bg-indigo-950/80 border border-indigo-800/60 rounded-lg text-indigo-400">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Hard Technical Competencies
                  </h3>
                  <p className="text-xs text-slate-400">
                    Data engineering, QA frameworks, and analytical tools
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {SKILLS_MATRIX.hardSkills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-mono text-indigo-400">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Environment: MS Excel, Power Query, Relational SQL</span>
              <span className="font-mono text-emerald-400">Ready for BI Role</span>
            </div>
          </div>

          {/* Right Column: Soft Skills & Commercial Instincts */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-5">
                <div className="p-2 bg-emerald-950/80 border border-emerald-800/60 rounded-lg text-emerald-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Soft Skills & Commercial Acumen
                  </h3>
                  <p className="text-xs text-slate-400">
                    Strategic communication, skepticism, and executive empathy
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {SKILLS_MATRIX.softSkills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        Executive-Grade
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}

                {/* Recruiter Cheat Sheet Box */}
                <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-4 mt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    <span>Suggested Behavioral Interview Question:</span>
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "Tell me about a time when removing bad data would have actually hurt the business, and how you resolved the conflict between clean metrics and revenue completeness."
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Candidate: Eyasin</span>
              <span className="font-mono text-slate-400">eyasin.113t@gmail.com</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
