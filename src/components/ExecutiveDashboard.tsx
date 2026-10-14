import React, { useState } from 'react';
import { BOARD_INSIGHTS, BoardQuestionInsight } from '../data/projectData';
import { 
  BarChart3, 
  TrendingUp, 
  Truck, 
  Globe2, 
  DollarSign, 
  ChevronRight, 
  Lightbulb, 
  CheckCircle2 
} from 'lucide-react';

export const ExecutiveDashboard: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const currentInsight: BoardQuestionInsight = BOARD_INSIGHTS.find((q) => q.questionNumber === activeQuestion) || BOARD_INSIGHTS[0];

  return (
    <section id="executive-findings" className="py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
            <span>Commercial Deliverable</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>The 3 C-Suite Board Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Executive Insights Powered by Clean Data
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            The ultimate objective of the audit: empowering GameZone's Executive Board to make confident quarterly decisions using verified numbers.
          </p>
        </div>

        {/* 3 Executive Question Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {BOARD_INSIGHTS.map((q) => {
            const isActive = activeQuestion === q.questionNumber;
            return (
              <button
                key={q.questionNumber}
                onClick={() => setActiveQuestion(q.questionNumber)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md shadow-indigo-950/50'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
                      isActive ? 'text-indigo-300' : 'text-slate-500'
                    }`}>
                      Board Question #{q.questionNumber}
                    </span>
                    {q.questionNumber === 1 && <BarChart3 className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />}
                    {q.questionNumber === 2 && <Truck className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />}
                    {q.questionNumber === 3 && <Globe2 className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 mb-1">
                    {q.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {q.executiveQuestion}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-200">{q.keyMetric}</span>
                  <span className={`flex items-center gap-1 ${isActive ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Board Question Deep Dive Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left 6 cols: Answer & Strategic Recommendation */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wide">
                    Executive Strategic Response
                  </span>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <span className="text-xs text-slate-500">Quarterly Strategy Memo</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-50 mb-3">
                  {currentInsight.executiveQuestion}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {currentInsight.executiveAnswer}
                </p>

                {/* Strategic C-Suite Recommendation */}
                <div className="bg-indigo-950/30 border border-indigo-900/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    <Lightbulb className="w-4 h-4 text-indigo-400" />
                    <span>BI Analyst Strategic Recommendation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentInsight.strategicRecommendation}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified from Golden Dataset</span>
                </span>
                <span className="font-mono text-slate-500">Power BI Model: Fact_Sales_V2</span>
              </div>
            </div>

            {/* Right 6 cols: Data Breakdown Visual Chart */}
            <div className="lg:col-span-6 bg-slate-950/70 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-5">
                  <div>
                    <span className="text-xs font-semibold text-slate-200">
                      Segment Breakdown & Metrics
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {currentInsight.metricLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold font-mono text-indigo-300 tabular-nums">
                      {currentInsight.keyMetric}
                    </span>
                  </div>
                </div>

                {/* Progress bars visualizer */}
                <div className="space-y-4">
                  {currentInsight.breakdown.map((item, idx) => {
                    // Calculate visual width proportion
                    const maxVal = Math.max(...currentInsight.breakdown.map((b) => b.value));
                    const percentageWidth = Math.round((item.value / maxVal) * 100);

                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-200 font-medium">{item.label}</span>
                          <div className="flex items-center gap-2 font-mono tabular-nums">
                            <span className="text-slate-100 font-semibold">
                              {item.unit === 'USD' ? `$${(item.value / 1000).toFixed(1)}K` : `${item.value} ${item.unit}`}
                            </span>
                            {item.secondary && (
                              <span className="text-[11px] text-slate-500 font-sans">
                                ({item.secondary})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bar */}
                        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              idx === 0 
                                ? 'bg-indigo-500' 
                                : idx === 1 
                                ? 'bg-indigo-400' 
                                : idx === 2 
                                ? 'bg-sky-400' 
                                : 'bg-slate-600'
                            }`}
                            style={{ width: `${percentageWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>Normalization: ISO-3 & POS Reconciliation</span>
                <span>Audit Sample: 100% of Clean Master</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
