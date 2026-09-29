import React, { useState } from 'react';
import { CitizenReportForm } from '../components/report/CitizenReportForm';
import { CitizenReport } from '../types/forest';
import { INITIAL_CITIZEN_REPORTS } from '../data/mockData';
import { ShieldCheck, Trees, PhoneCall, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export const ReportPage: React.FC = () => {
  const [reports, setReports] = useState<CitizenReport[]>(INITIAL_CITIZEN_REPORTS);

  const handleReportSubmitted = (newReport: CitizenReport) => {
    setReports([newReport, ...reports]);
  };

  return (
    <div className="flex-1 bg-stone-100/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Citizen Form */}
        <CitizenReportForm onSubmitSuccess={handleReportSubmitted} />

        {/* Safety & What Happens Next Info Section */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 mb-1">
              1. Otomatik Ön İnceleme
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Yüklenen görsel ve GPS koordinatları Sentinel-2 uydu arşiviyle anında eşleştirilir ve yapay zeka ön doğrulaması yapılır.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <PhoneCall className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 mb-1">
              2. OGM Devriye Sevk Emri
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Kritik bulunan ihbarlar en yakın Orman İşletme Şefliği ve Orman Muhafaza Memuru ekiplerinin devriye tabletine düşer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Trees className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 mb-1">
              3. Koridor Restorasyonu
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zarar gören bölge, YeşilNöbet fidan dikim rotasına dahil edilerek gönüllüler ile yeniden ağaçlandırılır.
            </p>
          </div>
        </div>

        {/* Son Doğrulanan İhbarlar Akışı */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-stone-900">
                Vatandaş Bildirimleri & Durum Akışı
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              {reports.length} İhbar Kayıtlı
            </span>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <span>{report.locationName}</span>
                    <span className="text-stone-400">·</span>
                    <span className="font-mono text-[11px] font-normal text-stone-500">
                      {report.id}
                    </span>
                  </div>
                  <p className="text-stone-600 mt-1 line-clamp-1">
                    {report.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {report.submittedAt}
                  </span>
                  <span
                    className={`font-semibold text-xs flex items-center gap-1 ${
                      report.status === 'verified'
                        ? 'text-emerald-700'
                        : 'text-amber-700'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {report.status === 'verified' ? 'Doğrulandı' : 'İnceleniyor'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
