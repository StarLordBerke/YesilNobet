import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { ReportPage } from './pages/ReportPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ReforestationPage } from './pages/ReforestationPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
        {/* Navigation Bar */}
        <Navbar />

        {/* Multi-Page Routes */}
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hakkinda" element={<AboutPage />} />
            <Route path="/fidan-bagisi" element={<ReforestationPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/harita" element={<MapPage />} />
            <Route path="/ihbar" element={<ReportPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Footer (Tüm sayfalarda ve harita sayfasında da görünür) */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
