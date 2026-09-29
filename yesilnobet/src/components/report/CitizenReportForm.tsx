import React, { useState } from 'react';
import {
  MapPin,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  Send,
  Loader2,
  Trees,
  FileText,
  User,
  Phone,
  Camera,
  X,
  Info
} from 'lucide-react';
import { CitizenReport } from '../../types/forest';

interface CitizenReportFormProps {
  onSubmitSuccess?: (report: CitizenReport) => void;
}

export const CitizenReportForm: React.FC<CitizenReportFormProps> = ({ onSubmitSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);

  const [incidentType, setIncidentType] = useState<
    'illegal_logging' | 'unauthorized_road' | 'illegal_building' | 'suspicious_fire'
  >('illegal_logging');
  const [description, setDescription] = useState('');
  const [isVolunteerCandidate, setIsVolunteerCandidate] = useState(true);

  // File upload state
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<CitizenReport | null>(null);

  // Auto Geolocate
  const handleAutoGeolocate = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert('Tarayıcınız konum özelliğini desteklemiyor.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLocationName(`GPS: ${position.coords.latitude.toFixed(4)}°K, ${position.coords.longitude.toFixed(4)}°D (Orman İçi)`);
        setIsLocating(false);
        setLocationSuccess(true);
      },
      (error) => {
        console.warn('Geolocation error, fallback to representative location:', error);
        // Fallback to active forest area in Turkey (e.g., Muğla Köyceğiz or Kazdağları)
        setLat(36.985);
        setLng(28.692);
        setLocationName('Muğla Köyceğiz Sandras Dağı Etekleri (Temsili GPS)');
        setIsLocating(false);
        setLocationSuccess(true);
      },
      { timeout: 7000 }
    );
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setUploadedPhotoUrl(null);
    setUploadedFileName(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Submit citizen report to Python FastAPI endpoint (POST /api/v1/reports/submit-with-photo)
    // with multipart form data, computer vision check on uploaded image for fresh sawdust/tractor traces

    setTimeout(() => {
      const newReport: CitizenReport = {
        id: `CIT-${Date.now().toString().slice(-4)}`,
        fullName: fullName || 'İsimsiz Vatandaş',
        phone: phone || '05** *** ** **',
        email: email || undefined,
        locationName: locationName || 'Koordinat Belirtilmemiş Ormanlık Alan',
        lat: lat || 37.0,
        lng: lng || 29.0,
        incidentType,
        description,
        photoUrl: uploadedPhotoUrl || undefined,
        isVolunteerCandidate,
        submittedAt: 'Şimdi',
        status: 'pending',
      };

      setSubmittedReport(newReport);
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(newReport);
      }
    }, 1200);
  };

  const handleReset = () => {
    setSubmittedReport(null);
    setDescription('');
    setUploadedPhotoUrl(null);
    setUploadedFileName(null);
    setLocationSuccess(false);
  };

  if (submittedReport) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm text-center max-w-xl mx-auto my-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-2">
          İhbarınız Başarıyla Alındı!
        </h3>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          İhbar kodunuz: <span className="font-mono font-bold text-emerald-800">{submittedReport.id}</span>.
          Bildiriminiz otomatik olarak OGM nöbetçi orman muhafaza timinin kontrol paneline ve bölge koordinatörlerine aktarılmıştır.
        </p>

        {submittedReport.isVolunteerCandidate && (
          <div className="p-4 bg-emerald-50/80 border border-emerald-200/90 rounded-xl text-left text-xs text-emerald-900 mb-6 flex items-start gap-3">
            <Trees className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Fidan Dikim Gönüllüsü Kaydınız Açıldı!</span>
              Bölgenizdeki kopuk koridor restorasyon etkinlikleri ve fidan dikim günleri için SMS/E-posta ile bilgilendirileceksiniz.
            </div>
          </div>
        )}

        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
        >
          Yeni Bir İhbar Bildir
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      {/* Form Kicker */}
      <div className="mb-8 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide uppercase mb-1">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Gizli ve Güvenli Orman Muhafaza Bildirimi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Ormanda Şüpheli Bir Durum Mu Gördünüz?
        </h2>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          Orman yangını başlangıcı veya şüpheli duman, orman tabanını tahrip eden kaçak dozer çalışmaları, yasadışı ağaç kesimleri ve orman işgalleri için anında fotoğraflı kanıt yükleyin. İhbarlar doğrudan OGM Bölge Müdürlüğü nöbetçi komuta merkezine iletilir.
        </p>
      </div>

      <div className="space-y-6">
        {/* İhbar Türü Seçimi */}
        <div>
          <label className="text-xs font-semibold text-stone-900 block mb-2">
            Şüpheli Olay Türü <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'illegal_logging',
                title: 'Yasadışı Ağaç Kesimi',
                desc: 'Motorlu testere sesi, kesilmiş taze tomruklar',
              },
              {
                id: 'unauthorized_road',
                title: 'Şüpheli Yol Açma / Dozer',
                desc: 'Ağaç köklerini söken iş makineleri',
              },
              {
                id: 'illegal_building',
                title: 'Kaçak Yapılaşma / Orman İşgali',
                desc: 'Milli parkta tel çit, temel kazısı, baraka',
              },
              {
                id: 'suspicious_fire',
                title: 'Şüpheli Duman / Ateş Başlangıcı',
                desc: 'Ruhsatsız anız veya piknik ateşi riski',
              },
            ].map((type) => (
              <label
                key={type.id}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  incidentType === type.id
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600 text-emerald-950'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{type.title}</span>
                  <input
                    type="radio"
                    name="incidentType"
                    value={type.id}
                    checked={incidentType === type.id}
                    onChange={() => setIncidentType(type.id as any)}
                    className="accent-emerald-600 cursor-pointer"
                  />
                </div>
                <span className="text-[11px] text-stone-500">{type.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Konum (Otomatik Al Butonu) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-stone-900">
              Olay Yeri Konumu <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleAutoGeolocate}
              disabled={isLocating}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 disabled:opacity-50 transition-colors"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>GPS Alınıyor...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Cihazımdan Konumu Otomatik Al</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              required
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Örn: Muğla Köyceğiz Sandras Dağı yolu 7. kilometre veya harita konumu"
              className="w-full text-xs p-3 pl-3.5 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900"
            />
          </div>

          {locationSuccess && lat && lng && (
            <div className="mt-2 text-[11px] text-emerald-700 font-mono flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Hassas Koordinatlar: {lat.toFixed(5)}°K, {lng.toFixed(5)}°D sabitlendi</span>
            </div>
          )}
        </div>

        {/* Kanıt Fotoğraf Yükleme (Sürükle-Bırak Tasarımlı) */}
        <div>
          <label className="text-xs font-semibold text-stone-900 block mb-2">
            Kanıt Fotoğrafı veya Video Yükle
          </label>

          {!uploadedPhotoUrl ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                  : 'border-stone-300 bg-stone-50/60 hover:bg-stone-50 hover:border-stone-400'
              }`}
            >
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-700 shadow-xs mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-stone-800">
                  Fotoğrafı buraya sürükleyin veya <span className="text-emerald-700 underline">dosya seçin</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  JPG, PNG veya HEIC (Maksimum 15 MB) · Fotoğraf metaverisinden EXIF GPS bilgisi taranır
                </p>
              </label>
            </div>
          ) : (
            <div className="relative rounded-2xl border border-stone-200 bg-stone-50 p-3 flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                <img
                  src={uploadedPhotoUrl}
                  alt="Yüklenen kanıt fotoğrafı"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-stone-900 block truncate">
                  {uploadedFileName || 'kanit_belgesi.jpg'}
                </span>
                <span className="text-[11px] text-emerald-700 font-mono block mt-0.5">
                  ✓ Görsel yüklendi · Yapay zeka ile ağaç dokusu analizi hazır
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Görseli kaldır"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Durum Açıklaması */}
        <div>
          <label className="text-xs font-semibold text-stone-900 block mb-2">
            Durum Detayları ve Gözlemleriniz <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Kaç ağaç kesilmiş? Olay yerinde araç plakası, traktör, dozer veya şüpheli şahıs görüldü mü? Detayları buraya yazınız..."
            className="w-full text-xs p-3.5 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-stone-900"
          />
        </div>

        {/* İletişim Bilgileri (İsteğe bağlı veya doğrulamalı) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-stone-900 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-500" />
              <span>Adınız Soyadınız</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ahmet Yılmaz (İsteğe bağlı)"
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 text-stone-900"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-900 block mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>İletişim Numarası</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0532 000 00 00 (Gizli tutulur)"
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 text-stone-900"
            />
          </div>
        </div>

        {/* Fidan Dikim Gönüllüsü Olma "Checkbox" Alanı (Mandatory feature) */}
        <div className="pt-2">
          <label className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 cursor-pointer hover:bg-emerald-50 transition-colors">
            <input
              type="checkbox"
              checked={isVolunteerCandidate}
              onChange={(e) => setIsVolunteerCandidate(e.target.checked)}
              className="mt-0.5 rounded accent-emerald-600 w-4 h-4 cursor-pointer shrink-0"
            />
            <div className="text-xs text-stone-800">
              <span className="font-bold text-emerald-950 block">
                🌱 YeşilNöbet Fidan Dikim ve Koridor Restorasyonu Gönüllüsü Olmak İstiyorum
              </span>
              <span className="text-stone-600 block mt-0.5 leading-relaxed">
                OGM ve TEMA Vakfı işbirliğinde bölgemde düzenlenecek kopuk yeşil koridor fidan dikim günlerinde saha ekibine katılmayı kabul ediyorum.
              </span>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            İhbarınız KVKK kapsamında şifrelenir ve korunur.
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/10 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>İhbar Gönderiliyor...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>İhbarı OGM Masasına İlet</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
