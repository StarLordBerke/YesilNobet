import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogPost } from '../../data/blogData';
import { BookOpen, Calendar, Clock, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import canopyImg from '../../assets/images/hero_forest_canopy_1790591910625.jpg';
import acousticImg from '../../assets/images/acoustic_sensor_device_1790591923119.jpg';
import reforestImg from '../../assets/images/forest_reforestation_1790591935001.jpg';
import wildlifeImg from '../../assets/images/wildlife_corridor_1790593109625.jpg';
import satelliteImg from '../../assets/images/satellite_orbit_1790593122412.jpg';
import citizenImg from '../../assets/images/citizen_hiker_1790593133865.jpg';
import wildfireImg from '../../assets/images/wildfire_thermal_1790594965972.jpg';
import landDegradationImg from '../../assets/images/land_degradation_1790594980082.jpg';

export const FeaturedBlogSection: React.FC = () => {
  // 4 diversified highlight blog posts covering Wildfire, Land Degradation, Bio-Acoustic & Corridors
  const featuredPosts = BLOG_POSTS.slice(0, 4);

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
    <section className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Güncel Araştırmalar & Saha Bültenleri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Öne Çıkan Blog Yazıları & Raporlar
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-2xl leading-relaxed">
              Yapay zeka modellerimiz, orman içi akustik analizleri, yaban hayatı koridorları ve saha operasyonlarımıza dair bilimsel ve topluluk makaleleri.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-50 border border-stone-200 shadow-xs transition-all shrink-0 self-start sm:self-end group"
          >
            <span>Tüm Yazıları Gör ({BLOG_POSTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-700" />
          </Link>
        </div>

        {/* Featured Posts Cards (4 cards: Yangın, Arazi Tahribatı, Akustik, Koridor) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              to="/blog"
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Tag */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={getImageSrc(post.imageUrl)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-stone-900/80 backdrop-blur-md text-emerald-300">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
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

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug mb-2.5 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {post.author.avatarUrl ? (
                      <img
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-emerald-600/30 shadow-xs"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px]">
                        {post.author.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-stone-700 font-medium text-xs truncate max-w-[140px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-emerald-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
                    <span>İncele</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
