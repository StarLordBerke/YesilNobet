import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  ArrowRight,
  Filter,
  Sparkles,
  Radio,
  Satellite,
  Trees,
  Share2,
  ChevronRight,
  X
} from 'lucide-react';
import canopyImg from '../assets/images/hero_forest_canopy_1790591910625.jpg';
import acousticImg from '../assets/images/acoustic_sensor_device_1790591923119.jpg';
import reforestImg from '../assets/images/forest_reforestation_1790591935001.jpg';
import wildlifeImg from '../assets/images/wildlife_corridor_1790593109625.jpg';
import satelliteImg from '../assets/images/satellite_orbit_1790593122412.jpg';
import citizenImg from '../assets/images/citizen_hiker_1790593133865.jpg';
import wildfireImg from '../assets/images/wildfire_thermal_1790594965972.jpg';
import landDegradationImg from '../assets/images/land_degradation_1790594980082.jpg';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    'Tümü',
    'Orman Yangınları',
    'Orman Tahribatı',
    'Teknoloji',
    'Saha Operasyonu',
    'Biyoçeşitlilik',
    'Topluluk & Gönüllülük'
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'Tümü' && post.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const getImageSrc = (key: string) => {
    switch (key) {
      case 'wildfire':
        return wildfireImg;
      case 'land_degradation':
        return landDegradationImg;
      case 'acoustic':
        return acousticImg;
      case 'wildlife':
        return wildlifeImg;
      case 'satellite':
        return satelliteImg;
      case 'reforestation':
        return reforestImg;
      case 'citizen':
        return citizenImg;
      default:
        return canopyImg;
    }
  };

  return (
    <div className="flex-1 bg-stone-50 text-stone-900 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-stone-900 text-stone-100 py-16 sm:py-20 border-b border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={canopyImg}
            alt="Orman örtüsü"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/90 to-stone-950/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>YeşilNöbet Blog & Ekolojik Raporlar</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Orman Bilimi, <span className="text-emerald-400">Teknoloji & Saha Hikayeleri</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
            Yapay zeka modellerimiz, uzaydan yapılan biyo-optik taramalar, biyo-akustik algoritmaları ve sahada fidan diken gönüllülerimizin en güncel analiz ve saha bültenleri.
          </p>

          {/* Search bar inside hero */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Yazı, yazar, algoritma veya anahtar kelime ara..."
              className="w-full pl-11 pr-4 py-3 bg-stone-950/90 border border-stone-700 rounded-2xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-emerald-500 shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Content & Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500 font-mono">
            {filteredPosts.length} makale listelendi
          </div>
        </div>

        {/* Featured Post (First item if no specific filter) */}
        {filteredPosts.length > 0 && selectedCategory === 'Tümü' && !searchQuery && (
          <div
            onClick={() => setActivePost(filteredPosts[0])}
            className="mt-8 bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden relative">
              <img
                src={getImageSrc(filteredPosts[0].imageUrl)}
                alt={filteredPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-800 text-white shadow">
                  Öne Çıkan Makale
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                  <span>{filteredPosts[0].category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-stone-400 font-mono lowercase">
                    <Clock className="w-3 h-3" />
                    {filteredPosts[0].readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug mb-3">
                  {filteredPosts[0].title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {filteredPosts[0].author.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{filteredPosts[0].author.name}</div>
                    <div className="text-[11px] text-stone-400">{filteredPosts[0].date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 group-hover:translate-x-1 transition-transform">
                  <span>Devamını Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={getImageSrc(post.imageUrl)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-900/80 backdrop-blur-md text-emerald-300">
                    {post.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono bg-stone-100 text-stone-600 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {post.author.avatarUrl ? (
                      <img
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-emerald-600/30 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[9px] shrink-0">
                        {post.author.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-stone-600 font-medium truncate max-w-[140px]">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-emerald-800 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>Oku</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 my-8">
            <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800 mb-1">Eşleşen Yazı Bulunamadı</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              "{searchQuery}" araması veya seçilen kategoride henüz yayınlanmış bir makale bulunmuyor.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tümü');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>

      {/* Reading Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-stone-900">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={getImageSrc(activePost.imageUrl)}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-800 text-white inline-block mb-2">
                  {activePost.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {activePost.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Author & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100 text-xs">
                <div className="flex items-center gap-3">
                  {activePost.author.avatarUrl ? (
                    <img
                      src={activePost.author.avatarUrl}
                      alt={activePost.author.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-emerald-600/30 shadow-xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-sm">
                      {activePost.author.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-stone-900">{activePost.author.name}</div>
                    <div className="text-stone-500">{activePost.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-stone-400 font-mono">
                  <span>{activePost.date}</span>
                  <span>·</span>
                  <span>{activePost.readTime}</span>
                </div>
              </div>

              {/* Excerpt callout */}
              <div className="p-4 rounded-xl bg-emerald-50 border-l-4 border-emerald-700 text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed italic">
                "{activePost.excerpt}"
              </div>

              {/* Body paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activePost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-500 mr-1">Etiketler:</span>
                {activePost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono bg-stone-100 text-stone-700 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/harita"
                  onClick={() => setActivePost(null)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-700"
                >
                  <Trees className="w-4 h-4" />
                  <span>İlgili Bölgeyi Canlı Haritada İncele</span>
                </Link>

                <button
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
