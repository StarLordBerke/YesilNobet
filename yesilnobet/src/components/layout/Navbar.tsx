import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Trees,
  AlertTriangle,
  Menu,
  X,
  Radio,
  ChevronDown,
  BookOpen,
  PhoneCall,
  Info,
  Sprout
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kurumsalDropdownOpen, setKurumsalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setKurumsalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setKurumsalDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const kurumsalSubLinks = [
    {
      path: '/hakkinda',
      label: 'Hakkında',
      description: 'Proje vizyonu, mimari ve etki analizi',
      icon: Info
    },
    {
      path: '/fidan-bagisi',
      label: 'Fidan Bağışı & Ağaçlandırma',
      description: 'Tahrip olan ormanları yaşama döndürme seferberliği',
      icon: Sprout
    },
    {
      path: '/blog',
      label: 'Blog & Raporlar',
      description: 'Yapay zeka, biyo-akustik ve saha bültenleri',
      icon: BookOpen
    },
    {
      path: '/iletisim',
      label: 'İletişim',
      description: 'OGM, STK koordinasyonu ve acil hatlar',
      icon: PhoneCall
    },
  ];

  const isKurumsalActive =
    location.pathname.startsWith('/hakkinda') ||
    location.pathname.startsWith('/fidan-bagisi') ||
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/iletisim');

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-lg xl:text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Trees className="w-5 h-5" />
            </div>
            <span>YeşilNöbet</span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop: xl breakpoint for comfortable horizontal spacing) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`relative py-1 transition-colors whitespace-nowrap ${
                location.pathname === '/'
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Anasayfa
            </Link>

            <Link
              to="/harita"
              className={`relative py-1 transition-colors whitespace-nowrap ${
                isActive('/harita')
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Risk ve Isı Haritası
            </Link>

            <Link
              to="/ihbar"
              className={`relative py-1 transition-colors whitespace-nowrap ${
                isActive('/ihbar')
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Vatandaş İhbarı
            </Link>

            <Link
              to="/admin"
              className={`relative py-1 transition-colors whitespace-nowrap ${
                isActive('/admin')
                  ? 'text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              OGM & STK Paneli
            </Link>

            {/* Kurumsal Açılır Menü (Dropdown) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setKurumsalDropdownOpen(!kurumsalDropdownOpen)}
                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer select-none whitespace-nowrap ${
                  isKurumsalActive || kurumsalDropdownOpen
                    ? 'text-emerald-400 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
                aria-expanded={kurumsalDropdownOpen}
              >
                <span>Kurumsal</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    kurumsalDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-stone-400'
                  }`}
                />
              </button>

              {kurumsalDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800 mb-1">
                    Kurumsal Sayfalar
                  </div>
                  {kurumsalSubLinks.map((item) => {
                    const IconComp = item.icon;
                    const isItemActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setKurumsalDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                          isItemActive
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                            : 'text-stone-200 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isItemActive
                              ? 'bg-emerald-800 text-white'
                              : 'bg-stone-800 text-emerald-400'
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-snug">{item.label}</div>
                          <div className="text-[11px] text-stone-400 leading-tight mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Actions (Desktop xl) */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <Link
              to="/harita"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800/80 rounded-lg hover:bg-emerald-900/80 transition-colors whitespace-nowrap"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>Sensör Ağı Aktif</span>
            </Link>

            <Link
              to="/ihbar"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 shadow-sm active:translate-y-0.5 transition-all whitespace-nowrap"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Şüpheli Kesim İhbarı</span>
            </Link>
          </div>

          {/* Tablet & Mobile Right Zone (< xl: 1280px altında temiz ve ferah gösterim) */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/harita"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800/80 rounded-lg"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden md:inline">Sensör Ağı</span>
            </Link>

            <Link
              to="/ihbar"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors whitespace-nowrap"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>İhbar Et</span>
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Drawer (< xl) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-2 animate-fade-in shadow-2xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-emerald-900/50 text-emerald-300 font-semibold'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            Anasayfa
          </Link>

          <Link
            to="/harita"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/harita')
                ? 'bg-emerald-900/50 text-emerald-300 font-semibold'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            Risk ve Isı Haritası
          </Link>

          <Link
            to="/ihbar"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/ihbar')
                ? 'bg-emerald-900/50 text-emerald-300 font-semibold'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            Vatandaş İhbarı
          </Link>

          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive('/admin')
                ? 'bg-emerald-900/50 text-emerald-300 font-semibold'
                : 'text-stone-300 hover:bg-stone-800 hover:text-white'
            }`}
          >
            OGM & STK Paneli
          </Link>

          {/* Kurumsal Alt Bölüm (Tablet & Mobile) */}
          <div className="pt-2 pb-1 border-t border-stone-800 space-y-1">
            <div className="px-3.5 py-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Kurumsal
            </div>
            {kurumsalSubLinks.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-emerald-900/50 text-emerald-300 font-semibold'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-800">
            <Link
              to="/ihbar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors shadow-md"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Şüpheli Kesim İhbarı Gönder</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
