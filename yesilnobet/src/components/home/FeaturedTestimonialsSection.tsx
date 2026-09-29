import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Star,
  ShieldCheck,
  Trees,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Send,
  Building2,
  UserCheck
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  roleType: 'ogm' | 'stk' | 'academic' | 'volunteer';
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarInitials: string;
  avatarImage?: string;
}

export const FeaturedTestimonialsSection: React.FC = () => {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);
  const [newComment, setNewComment] = useState({
    name: '',
    role: '',
    organization: '',
    comment: '',
    rating: 5,
  });

  const initialTestimonials: Testimonial[] = [
    {
      id: 'test-1',
      name: 'Kemal Öztürk',
      title: 'Bölge Orman Muhafaza Şefi',
      organization: 'Muğla Orman Bölge Müdürlüğü',
      roleType: 'ogm',
      rating: 5,
      date: '22 Mart 2026',
      comment:
        'Köyceğiz ve Fethiye hattında motorlu testere sesini 3 dakika içinde telsiz masamıza koordinatlı olarak düşüren LoRaWAN sensör ağı sayesinde, iki ayrı kaçak kesim girişimini daha ilk ağaç devrilmeden yerinde engelledik.',
      verified: true,
      avatarInitials: 'KÖ',
      avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'test-2',
      name: 'Dr. Ayça Sönmez',
      title: 'Biyoçeşitlilik & Koridor Araştırmacısı',
      organization: 'Hacettepe Üniversitesi Ekoloji ABD',
      roleType: 'academic',
      rating: 5,
      date: '15 Mart 2026',
      comment:
        'Yaban hayatının parçalanmış alanlardaki genetik izolasyonunu önlemek için uydu verilerini harita katmanı olarak kullanmak devrim niteliğinde. Kopuk koridor algoritması sayesinde fidan dikim noktaları artık rastgele değil, ekolojik matematik ile belirleniyor.',
      verified: true,
      avatarInitials: 'AS',
      avatarImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'test-3',
      name: 'Mert Aksoy',
      title: 'Saha Koordinatörü & Gönüllü',
      organization: 'Kazdağları Koruma Girişimi',
      roleType: 'stk',
      rating: 5,
      date: '08 Mart 2026',
      comment:
        'Geçtiğimiz pazar günü yaptığımız Madra etabı fidan dikiminde platformun gösterdiği 4 kritik geçiş patikasına 15 bin fidan diktik. Haritanın kullanıcı dostu olması gönüllü katılımını inanılmaz kolaylaştırdı.',
      verified: true,
      avatarInitials: 'MA',
      avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'test-4',
      name: 'Elif Ceren Doğan',
      title: 'Doğa Yürüyüşçüsü & Vatandaş Denetçisi',
      organization: 'Bolu Doğa Sporları Kulübü',
      roleType: 'volunteer',
      rating: 5,
      date: '28 Şubat 2026',
      comment:
        'Yedigöller kırsalında yürüyüş yaparken tespit ettiğimiz şüpheli dozer izlerini ve devrilmiş kayın ağaçlarını Vatandaş İhbarı sekmesinden fotoğrafla gönderdik. 45 dakika içinde OGM ekibinin bölgeye ulaştığı teyit bildirimi geldi.',
      verified: true,
      avatarInitials: 'ED',
      avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'test-5',
      name: 'Prof. Dr. Tarık Yeldan',
      title: 'Yapay Zeka ve Uzaktan Algılama Enstitüsü',
      organization: 'ODTÜ Bilişim İnovasyon',
      roleType: 'academic',
      rating: 5,
      date: '19 Şubat 2026',
      comment:
        'Sentinel-2 multispektral görüntülerindeki NDVI değişim analizi ile akustik frekans analizinin entegre edilmesi, çevre izleme teknolojilerinde dünya standartlarında bir açık kaynak başarı örneği sunuyor.',
      verified: true,
      avatarInitials: 'TY',
      avatarImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 'test-6',
      name: 'Serhat Bilgin',
      title: 'Orman Mühendisi & Denetmen',
      organization: 'Bursa Orman İşletmesi',
      roleType: 'ogm',
      rating: 5,
      date: '11 Şubat 2026',
      comment:
        'Geniş orman alanlarında kör noktaları ortadan kaldırdı. Isı haritası ve kırmızı seviye uyarılar, ekiplerimizin nöbet rotalarını veriye dayalı planlamasını sağladı. Emeği geçen tüm mühendisleri kutluyorum.',
      verified: true,
      avatarInitials: 'SB',
      avatarImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
    },
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const filterTags = [
    { key: 'all', label: 'Tüm Yorumlar' },
    { key: 'ogm', label: 'OGM & Kolluk' },
    { key: 'academic', label: 'Akademisyen & Bilim' },
    { key: 'stk', label: 'STK & Dernekler' },
    { key: 'volunteer', label: 'Gönüllü & Doğa Severler' },
  ];

  const filtered = filterRole === 'all'
    ? testimonials
    : testimonials.filter((t) => t.roleType === filterRole);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;

    const initials = newComment.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const created: Testimonial = {
      id: `user-${Date.now()}`,
      name: newComment.name,
      title: newComment.role || 'Gönüllü Denetçi',
      organization: newComment.organization || 'Doğa Dostu Topluluğu',
      roleType: 'volunteer',
      rating: newComment.rating,
      date: 'Şimdi',
      comment: newComment.comment,
      verified: false,
      avatarInitials: initials || 'GN',
      avatarImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    };

    setTestimonials([created, ...testimonials]);
    setSubmittedMessage(true);
    setNewComment({ name: '', role: '', organization: '', comment: '', rating: 5 });

    setTimeout(() => {
      setShowModal(false);
      setSubmittedMessage(false);
    }, 2000);
  };

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-700" />
              <span>Saha Deneyimi & Güven</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Öne Çıkan Yorumlar & Saha Görüşleri
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
              Orman Genel Müdürlüğü muhafaza ekiplerinden üniversite araştırmacılarına ve gönüllü koruma derneklerine kadar YeşilNöbet'i sahada aktif kullanan paydaşlarımızın değerlendirmeleri.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 transition-all shadow-md shadow-emerald-950/10 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Saha Görüşü Ekle</span>
          </button>
        </div>

        {/* Filter Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-stone-200">
          {filterTags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => setFilterRole(tag.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterRole === tag.key
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {tag.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400 font-mono hidden sm:inline">
            {filtered.length} saha görüşü listeleniyor
          </span>
        </div>

        {/* Testimonials Grid (2x3 or 3x2 responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Rating and Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {item.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Doğrulanmış Paydaş</span>
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info with Photo */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.avatarImage ? (
                    <img
                      src={item.avatarImage}
                      alt={item.name}
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-600/30 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-900 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs border border-emerald-200">
                      {item.avatarInitials}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-medium">
                      {item.organization}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-stone-400 shrink-0">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Info Banner */}
        <div className="mt-12 bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-950/20">
              <HeartHandshake className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Siz de Sahadan Tecrübenizi ve Gözlemlerinizi Paylaşın
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Yerel orman köylüleri, doğa dernekleri ve nöbetçi orman muhafızlarının geri bildirimleri platformumuzun algoritmalarını her geçen gün daha hassas hale getirmektedir.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-800 font-bold text-xs hover:bg-stone-50 transition-colors shadow-xs cursor-pointer"
          >
            Yorum Gönder
          </button>
        </div>
      </div>

      {/* Add Comment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-stone-900 mb-1 flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-emerald-700" />
              <span>Saha Görüşü & Deneyim Bildirimi</span>
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              YeşilNöbet sisteminin orman koruma süreçlerinize etkisini paylaşın.
            </p>

            {submittedMessage ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-stone-900">Yorumunuz Başarıyla İletildi!</h4>
                <p className="text-xs text-stone-600 max-w-xs">
                  Değerli katkınız için teşekkür ederiz. İnceleme sonrasında öne çıkan görüşler arasında yer alacaktır.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddComment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    required
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    placeholder="Örn: Dr. Mehmet Kaya"
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Unvan / Göreviniz
                    </label>
                    <input
                      type="text"
                      value={newComment.role}
                      onChange={(e) => setNewComment({ ...newComment, role: e.target.value })}
                      placeholder="Örn: Orman Mühendisi"
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Kurum / STK / Kulüp
                    </label>
                    <input
                      type="text"
                      value={newComment.organization}
                      onChange={(e) => setNewComment({ ...newComment, organization: e.target.value })}
                      placeholder="Örn: TEMA Vakfı Gönüllüsü"
                      className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Deneyim ve Görüşünüz *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    placeholder="Sistemin kaçak kesim, uydu tespiti veya koridor fidan dikimi sürecine katkısını açıklayınız..."
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Değerlendirmeniz (Puan)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newComment.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-700 ml-2">
                      {newComment.rating} / 5 Yıldız
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Görüşü Yayınla</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
