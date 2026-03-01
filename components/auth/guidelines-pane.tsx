import { BarChart3, Clock, FileText } from "lucide-react";

export const GuidelinesPane = () => (
  <div className="hidden lg:flex flex-col justify-between p-10 xl:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex-1 rounded-l-2xl xl:rounded-l-[2.5rem] relative overflow-hidden border-r border-slate-700">
    <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>

    <div className="relative z-10">
      <h2 className="text-xl xl:text-2xl font-bold mb-8 xl:mb-10 border-l-4 border-blue-600 pl-4 uppercase tracking-wide">
        Academic Guidelines
      </h2>
      <div className="space-y-6 xl:space-y-8">
        <div className="flex gap-4 group items-start">
          <div className="bg-white/5 p-2.5 xl:p-3 rounded-xl group-hover:bg-blue-600/20 transition-all border border-white/5 shrink-0">
            <FileText className="text-blue-400" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-base xl:text-lg text-blue-100">
              Lab Report Standards
            </h4>
            <p className="text-slate-400 text-xs xl:text-sm leading-relaxed mt-1">
              All laboratory reports must strictly follow the IEEE documentation
              format. Hard copies are to be submitted within 7 days of the
              experiment.
            </p>
          </div>
        </div>
        <div className="flex gap-4 group items-start">
          <div className="bg-white/5 p-2.5 xl:p-3 rounded-xl group-hover:bg-blue-600/20 transition-all border border-white/5 shrink-0">
            <Clock className="text-blue-400" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-base xl:text-lg text-blue-100">
              Attendance Threshold
            </h4>
            <p className="text-slate-400 text-xs xl:text-sm leading-relaxed mt-1">
              A strictly enforced 75% attendance is required for term exams.
              Shortfalls may lead to debarment.
            </p>
          </div>
        </div>
        <div className="flex gap-4 group items-start">
          <div className="bg-white/5 p-2.5 xl:p-3 rounded-xl group-hover:bg-blue-600/20 transition-all border border-white/5 shrink-0">
            <BarChart3 className="text-blue-400" size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-base xl:text-lg text-blue-100">
              Assessment Weighting
            </h4>
            <p className="text-slate-400 text-xs xl:text-sm leading-relaxed mt-1">
              Term Tests (20%), Class Participation (10%), Assignments (10%),
              and Semester Final Exam (60%).
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="relative z-10 pt-6 xl:pt-8 border-t border-slate-700/50">
      <p className="text-slate-500 text-[10px] xl:text-xs font-medium uppercase tracking-wide">
        Shahjalal University of Science & Technology
        <br />
        <span className="text-slate-400">
          Dept. of Electrical & Electronic Engineering
        </span>
      </p>
    </div>
  </div>
);
