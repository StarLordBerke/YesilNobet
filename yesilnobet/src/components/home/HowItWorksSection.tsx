import React from 'react';
import { Satellite, Radio, Cpu, BellRing, Route, CheckCircle2 } from 'lucide-react';
import sensorImg from '../../assets/images/acoustic_sensor_device_1790591923119.jpg';
import reforestationImg from '../../assets/images/forest_reforestation_1790591935001.jpg';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Termal Uydu, Spektral Tarama & Akustik Dinleme',
      description:
        'Avrupa Uzay Ajansı Sentinel-2 ve NASA VIIRS uydularından günlük multispektral ve termal sıcaklık akışı çekilir. Yangın başlangıçları, orman sınırını dozerle kazıyan yasadışı tahribatlar ve ağaç gövdesindeki LoRaWAN mikrofonlarla testere sesleri 7/24 izlenir.',
      highlights: ['Termal yangın hotspot taraması (VIIRS)', '10m NDVI & orman sınırı kadastro takibi', 'Güneş enerjili LoRaWAN biyo-akustik nodları'],
      icon: Satellite,
      accent: 'emerald',
    },
    {
      stepNumber: '02',
      title: 'Yapay Zeka Yangın & Orman Tahribatı Analizi',
      description:
        'Derin öğrenme modelleri (PyTorch ResNet & GIS vektör çakıştırma), motorlu testere frekanslarını (1200-2400 Hz), ani sıcaklık sıçramalarını ve orman sınırına dozerle yapılan kaçak açma müdahalelerini anında sınıflandırır.',
      highlights: ['Yangın yayılım yönü simülasyonu', 'Yasadışı orman tahribatı alarmı', 'Yanlış alarm filtreleme algoritması (%94+ güven)'],
      icon: Cpu,
      accent: 'amber',
    },
    {
      stepNumber: '03',
      title: 'OGM Ekiplerine Bildirim & Koridor Onarımı',
      description:
        'Kritik alarmlar Orman Genel Müdürlüğü (OGM) devriye timlerine ve yangın ilk müdahale araçlarına koordinat ve rota bilgisiyle anında iletilir. Tahrip edilen veya kopan yeşil koridorlar için gönüllü fidan dikim güzergahları otomatik planlanır.',
      highlights: ['Otomatik devriye GPS sevk paketi', 'Yangın söndürme ve savcılık suç duyurusu', 'Biyolojik koridor fidan planlaması'],
      icon: BellRing,
      accent: 'rose',
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-2">
            Mimarimiz & Koruma Döngüsü
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 text-balance">
            Sistem Nasıl Çalışır?
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            YeşilNöbet, uydu uzaktan algılama ve sahadaki IoT akustik dinleme teknolojilerini birleştirerek reaktif değil, proaktif bir orman muhafaza kalkanı oluşturur.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="bg-white rounded-2xl border border-stone-200/90 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono text-stone-300">
                      {step.stepNumber}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-emerald-700 border border-stone-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="text-xs font-semibold text-stone-900 mb-2">Öne Çıkan Yetenekler</div>
                  <ul className="space-y-1.5">
                    {step.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Proof Spotlight: Sensor node in nature & Reforestation */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-stone-100/80 rounded-2xl p-6 sm:p-8 border border-stone-200">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Sahadaki Gerçek Ekipman
            </span>
            <h3 className="text-2xl font-bold text-stone-900">
              Ağaç Dostu Akustik Düğümler & Fidan Koridorları
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Her bir LoRaWAN cihazı ağaç kabuğuna zarar vermeyen elastik kauçuk kelepçelerle sabitlenir. Güneş hücresi sayesinde 5 yıl boyunca bakım gerektirmeden çalışır. Tespit edilen parçalanmış orman alanlarında ise STK'lar ve gönüllüler fidan dikim seferberliğine yönlendirilir.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500 pt-2 font-mono">
              <span>Menzil: 15 km LoRa</span>
              <span>·</span>
              <span>Pil: Sürekli Solar Şarj</span>
              <span>·</span>
              <span>Hassasiyet: 0.1 kHz - 12 kHz</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="overflow-hidden rounded-xl border border-stone-300 shadow-sm aspect-4/3">
              <img
                src={sensorImg}
                alt="Ağaç gövdesine takılı güneş enerjili akustik orman sensörü"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-stone-300 shadow-sm aspect-4/3">
              <img
                src={reforestationImg}
                alt="Gönüllüler ve ormancılar fidan dikimi yapıyor"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
