"use client";
import { useTranslation } from "react-i18next";
import '../../i18n';
import { SparklesIcon, PaintBrushIcon, PhotoIcon } from "@heroicons/react/24/outline";

const AnimatedBG = () => (
  <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none animate-float-slow" style={{opacity:0.10}} viewBox="0 0 1440 900" fill="none">
    <circle cx="200" cy="200" r="120" fill="#a5b4fc" />
    <circle cx="1240" cy="700" r="180" fill="#fef9c3" />
    <circle cx="900" cy="200" r="90" fill="#f87171" />
    <circle cx="400" cy="800" r="100" fill="#34d399" />
  </svg>
);

export default function ArtPage() {
  const { t } = useTranslation();
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 md:px-0 overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative max-w-3xl w-full mx-auto z-10 flex flex-col items-center text-center mb-10">
        <PaintBrushIcon className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2 drop-shadow flex items-center gap-2">{t('art_hero_title')}</h1>
        <p className="text-lg md:text-xl text-blue-900 font-light leading-relaxed mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('art_hero_subtitle')}
        </p>
      </section>
      {/* Project Description */}
      <section className="max-w-2xl w-full mx-auto bg-white/90 rounded-3xl shadow-lg p-8 mb-10 border border-amber-100 animate-fade-in text-blue-900">
        <h2 className="text-2xl font-bold text-amber-600 mb-4 flex items-center gap-2"><PhotoIcon className="w-7 h-7 text-amber-400 animate-bounce" />{t('art_intro_headline')}</h2>
        <p className="mb-4 text-base md:text-lg">{t('art_intro_body')}</p>
        <p className="mb-4 text-base md:text-lg">{t('art_intro_body2')}</p>
        <p className="mb-4 text-base md:text-lg">{t('art_intro_body3')}</p>
        <p className="mb-4 text-base md:text-lg">{t('art_intro_body4')}</p>
        <p className="mb-4 text-base md:text-lg">{t('art_intro_body5')}</p>
        <p className="mb-2 text-base md:text-lg font-semibold text-rose-600">{t('art_gallery_headline')}</p>
      </section>
      {/* Gallery Placeholder */}
      <section className="max-w-5xl w-full mx-auto mb-16 animate-fade-in">
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-amber-100 via-white to-blue-100 rounded-3xl border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-amber-400">
          <PhotoIcon className="w-20 h-20 mb-4 animate-pulse" />
          <span className="text-xl md:text-2xl font-bold">{t('art_gallery_placeholder')}</span>
          <span className="text-base text-amber-500 mt-2">{t('art_gallery_coming_soon')}</span>
        </div>
      </section>
    </main>
  );
} 