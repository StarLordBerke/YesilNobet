import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Building2,
  HeartHandshake,
  Radio,
  FileQuestion,
  Loader2,
  Trees,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: string;
  category: 'general' | 'sensors' | 'reporting' | 'volunteering';
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'YeşilNöbet sistemi nasıl çalışır ve hangi teknolojileri kullanır?',
    answer: 'YeşilNöbet, üç katmanlı hibrit bir izleme mimarisiyle çalışır: 1) ESA Sentinel-2 ve NASA VIIRS uydu görüntülerindeki NDVI ve termal anomali analizleri, 2) Orman içine yerleştirilen güneş enerjili LoRaWAN biyo-akustik sensör düğümleri ve 3) Sahadan gelen coğrafi etiketli vatandaş ihbarları. Yapay zeka modellerimiz bu verileri harmanlayarak şüpheli kesim veya yangın durumunda 3 dakika içinde OGM ve kolluk kuvvetlerine alarm üretir.'
  },
  {
    id: 'faq-2',
    category: 'sensors',
    question: 'Biyo-akustik sensörler motorlu testere sesini diğer seslerden nasıl ayırt eder?',
    answer: 'Ormanlık alanlara yerleştirilen sensör donanımlarında gömülü çalışan Edge-AI (uçta yapay zeka) derin öğrenme modelleri bulunur. 1200 - 2400 Hz harmonik frekans paterni, rüzgar hışırtısı, kuş sesleri, traktör veya şimşek gibi çevre seslerinden filtre edilerek sadece motorlu testerenin mekanik kesim spektrogramı algılandığında sistem tetiklenir.'
  },
  {
    id: 'faq-3',
    category: 'reporting',
    question: 'Vatandaş ihbarı yaptığımda kimlik bilgilerim gizli kalır mı?',
    answer: 'Evet. YeşilNöbet üzerinden yaptığınız tüm çevre, yasadışı ağaç kesimi ve yangın bildirimlerinde KVKK ve veri gizliliği ilkeleri gereği kimlik ve iletişim bilgileriniz 256-bit SSL şifrelemeyle korunur. Sahadaki kamu denetçileri yalnızca ihbarın koordinatını, fotoğrafını ve teknik açıklamasını görür.'
  },
  {
    id: 'faq-4',
    category: 'volunteering',
    question: 'Ekolojik Koridor fidan dikim etkinliklerine bireysel veya topluluk olarak nasıl katılabilirim?',
    answer: 'Harita bölümünde "Kopuk Koridorlar" katmanını inceleyerek bölgenizdeki aktif fidan dikim etaplarını görebilir, veya "İhbar / Gönüllü Ol" formundan gönüllü olarak kaydolabilirsiniz. Dikim mevsimlerinde (Kasım - Mart) yerel STK ve OGM koordinatörlerimiz sizinle iletişime geçerek yerli fidan dikim günlerine davet eder.'
  },
  {
    id: 'faq-5',
    category: 'sensors',
    question: 'Sensörler orman yangınlarını ne kadar sürede tespit eder?',
    answer: 'NASA VIIRS 375m gece termal uyduları ile IoT duman ve yüzey ısı sensörleri entegre çalışır. Yoğun duman veya 60°C üzerindeki yüzey ısı anomalileri algılandığında haritada kırmızı kritik seviyede işaretlenir ve ortalama 3 ila 5 dakika içinde ilk müdahale ekiplerine SMS/telsiz bildirimi ulaştırılır.'
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'YeşilNöbet açık kaynak mı? Akademik araştırmalar için veri talep edebilir miyiz?',
    answer: 'Evet. Platformumuz açık kaynaklı çevre izleme ilkelerini benimser. Üniversiteler, çevre enstitüleri ve yüksek lisans/doktora araştırmacıları "İletişim" formundaki Kurumsal/Akademik seçeneği üzerinden anonimleştirilmiş biyo-akustik ses ve uydu NDVI veri setlerini talep edebilirler.'
  }
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationType: 'stk_volunteer',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Send message to Python FastAPI contact endpoint (POST /api/v1/contact/submit)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organizationType: 'stk_volunteer',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = activeFaqCategory === 'all'
    ? FAQS_DATA
    : FAQS_DATA.filter(f => f.category === activeFaqCategory);

  return (
    <div className="flex-1 bg-stone-50 text-stone-900 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-stone-900 text-stone-100 py-16 border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>İletişim & Koordinasyon Merkezi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ormanlar İçin <span className="text-emerald-400">Birlikte Nöbetteyiz</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
            Kurumsal işbirlikleri, fidan dikim gönüllü programları, sensör ağı kurulum talepleri ve akademik veri paylaşımı için koordinasyon ekibimizle iletişime geçin.
          </p>
        </div>
      </section>

      {/* Emergency Hotline Alert Ribbon */}
      <div className="bg-rose-50 border-b border-rose-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-rose-900 font-medium">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 animate-bounce" />
            <span>
              <strong>Acil Yangın veya Aktif Suç İhbarı:</strong> Yangın, silahlı kaçak kesim veya acil suç vakalarında gecikmeksizin resmi <strong>ALO 112</strong> veya <strong>ALO 177 Orman Yangın İhbar</strong> hattını arayınız.
            </span>
          </div>
          <a
            href="tel:112"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-rose-600 text-white rounded-md font-bold hover:bg-rose-700 transition-colors shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>ALO 112 / 177 Ara</span>
          </a>
        </div>
      </div>

      {/* Contact Cards & Form Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Contact Info & Institutional Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Koordinasyon İrtibatları
            </h2>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">OGM ve Kurumsal İrtibat</span>
                  <span className="text-stone-600 block mt-0.5">Orman Genel Müdürlüğü Nöbetçi Koordinasyon Masası</span>
                  <span className="text-emerald-700 font-mono block mt-1">kurumsal@yesilnobet.gov.tr</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-100">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Gönüllü ve STK Ağları</span>
                  <span className="text-stone-600 block mt-0.5">Kopuk koridor fidan dikim günleri ve saha ekipleri</span>
                  <span className="text-amber-800 font-mono block mt-1">gonullu@yesilnobet.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center shrink-0 border border-sky-100">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">IoT Biyo-Akustik & Uydu Verisi</span>
                  <span className="text-stone-600 block mt-0.5">Sensör donanım dağıtımı ve açık araştırma API'si</span>
                  <span className="text-sky-800 font-mono block mt-1">arge@yesilnobet.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 border border-stone-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-stone-900 block text-sm">Merkez Operasyon Lokasyonu</span>
                  <span className="text-stone-600 block mt-0.5">
                    ODTÜ Teknokent Bilişim İnovasyon Merkezi, Çankaya / Ankara
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SLA / Çalışma Saatleri */}
          <div className="bg-stone-900 text-stone-200 rounded-3xl p-6 border border-stone-800 text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <Clock className="w-4 h-4" />
              <span>7/24 Kesintisiz Nöbet Masası</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Yapay zeka modellerimiz ve LoRaWAN sensör düğümlerimiz 7 gün 24 saat aralıksız çalışmaktadır. Gelen kritik alarmlar OGM nöbetçi telsiz ve komuta masasına 3 dakika içinde aktarılır.
            </p>
          </div>
        </div>

        {/* Right Col: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xs">
            <h2 className="text-xl font-bold text-stone-900 mb-2">
              İletişim & İşbirliği Formu
            </h2>
            <p className="text-xs text-stone-600 mb-6">
              Platforma ilişkin teknik sorular, sensör talepleri ve kurumsal işbirliği teklifleriniz için formu doldurabilirsiniz.
            </p>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block">Mesajınız başarıyla iletildi!</span>
                  <span>En geç 24 saat içinde koordinatör ekibimiz dönüş yapacaktır.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1.5">
                  Adınız ve Soyadınız <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Örn: Dr. Selim Arıkan"
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-900 block mb-1.5">
                    E-Posta Adresi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="selim@universite.edu.tr"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-900 block mb-1.5">
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0532 000 00 00"
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-900 block mb-1.5">
                    Temsil Ettiğiniz Yapı
                  </label>
                  <select
                    value={formData.organizationType}
                    onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 text-stone-900"
                  >
                    <option value="stk_volunteer">Sivil Toplum / Doğa Derneği / Gönüllü</option>
                    <option value="academic">Üniversite / Akademisyen / Araştırmacı</option>
                    <option value="ogm_public">OGM / Kamu Kurumu / Kolluk</option>
                    <option value="tech_company">Teknoloji / Donanım Sağlayıcısı</option>
                    <option value="press">Basın & Medya Mensubu</option>
                    <option value="other">Bireysel Doğa Sever</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1.5">
                  Konu Başlığı <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Örn: Kazdağları bölgesine LoRaWAN sensör desteği talebi"
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1.5">
                  Mesajınız <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="İşbirliği detayları, bölge bilgisi veya sorularınızı yazınız..."
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:border-emerald-600 text-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 shadow-md active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Mesajı Gönder</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Sık Sorulan Sorular ve Cevapları (FAQ) Bölümü */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Merak Edilenler & Rehber</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            YeşilNöbet sistemi, sensör teknolojisi, ihbar süreçleri ve fidan dikim seferberliği hakkında en çok yöneltilen soruların yanıtları.
          </p>
        </div>

        {/* FAQ Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { key: 'all', label: 'Tüm Sorular' },
            { key: 'general', label: 'Genel & Sistem' },
            { key: 'sensors', label: 'Sensör & Yapay Zeka' },
            { key: 'reporting', label: 'İhbar & Gizlilik' },
            { key: 'volunteering', label: 'Gönüllülük & Fidan' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFaqCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFaqCategory === cat.key
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-emerald-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-emerald-100 text-emerald-800 rotate-180'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Farklı bir sorunuz veya özel bir öneriniz mi var?
              </h4>
              <p className="text-xs text-emerald-100/90 mt-1">
                Yukarıdaki iletişim formunu kullanarak veya doğrudan e-posta ile uzmanlarımıza ulaşabilirsiniz.
              </p>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-stone-950 text-xs font-bold hover:bg-emerald-50 transition-colors shadow-sm cursor-pointer"
          >
            Forma Dön
          </button>
        </div>
      </section>
    </div>
  );
};
