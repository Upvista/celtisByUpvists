'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useState, useEffect } from 'react';
import { HeartIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const playfair = {
  fontFamily: 'Playfair Display, serif',
};

// Animated background SVG for the whole page
const AnimatedBG = () => (
  <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none animate-float-slow" style={{opacity:0.12}} viewBox="0 0 1440 900" fill="none">
    <circle cx="200" cy="200" r="120" fill="#a5b4fc" />
    <circle cx="1240" cy="700" r="180" fill="#fef9c3" />
    <circle cx="900" cy="200" r="90" fill="#f87171" />
    <circle cx="400" cy="800" r="100" fill="#34d399" />
  </svg>
);

// Decorative SVG above the grid
const GridAccent = () => (
  <svg className="mx-auto mb-4 w-32 h-10 animate-pulse" viewBox="0 0 200 40" fill="none">
    <ellipse cx="100" cy="20" rx="90" ry="10" fill="#fef9c3" />
    <ellipse cx="100" cy="20" rx="60" ry="6" fill="#a5b4fc" opacity="0.5" />
  </svg>
);

export default function Home() {
  const { t, i18n } = useTranslation();
  // Animated quote logic
  const quotes = [
    t('quote1'),
    t('quote2'),
    t('quote3'),
    t('quote4'),
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((idx) => (idx + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [i18n.language, quotes.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-x-hidden">
      <AnimatedBG />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-16">
        {/* Hero Section: Centered Welcome and Intro */}
        <section className="w-full max-w-3xl mx-auto mb-6 animate-fade-in flex flex-col items-center text-center relative">
          {/* Decorative SVG BG */}
          <svg className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[220px] md:w-[600px] md:h-[320px] z-0 pointer-events-none" viewBox="0 0 600 320" fill="none">
            <ellipse cx="180" cy="120" rx="160" ry="80" fill="#a5b4fc" fillOpacity="0.18" />
            <ellipse cx="420" cy="180" rx="120" ry="60" fill="#fef9c3" fillOpacity="0.18" />
            <circle cx="300" cy="160" r="90" fill="#f87171" fillOpacity="0.10" />
            <circle cx="500" cy="60" r="40" fill="#34d399" fillOpacity="0.13" />
          </svg>
          <div className="relative z-10 w-full flex flex-col items-center">
            <UserGroupIcon className="w-16 h-16 text-amber-400 mb-4 animate-bounce" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow tracking-tight animate-slide-down flex items-center gap-2 justify-center">{t('welcome')}</h1>
            <p className="text-lg sm:text-xl text-blue-900 mb-6 max-w-xl mx-auto animate-fade-in delay-100 font-light flex items-center justify-center gap-2">
              <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
              {t('home_intro')}
            </p>
            <svg width="120" height="28" viewBox="0 0 120 28" fill="none" className="mx-auto mb-4 animate-fade-in delay-300"><ellipse cx="60" cy="14" rx="60" ry="10" fill="#2563eb" fillOpacity="0.10"/><ellipse cx="60" cy="18" rx="40" ry="6" fill="#10b981" fillOpacity="0.10"/></svg>
            <p className="text-emerald-600 text-base animate-fade-in delay-400">{t('site_theme_summary')}</p>
          </div>
        </section>
        {/* Hero Quote + Image Row */}
        <section className="w-full max-w-5xl mx-auto mb-10 flex flex-col md:flex-row items-center md:items-center gap-8 animate-fade-in">
          {/* Left: Animated Rotating Quote */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="relative flex flex-col items-center md:items-start my-8 min-h-[90px]">
              <svg className="absolute -top-4 -left-6 w-10 h-10 text-amber-400 animate-fade-in hidden md:block" viewBox="0 0 32 32" fill="currentColor"><path d="M12 6C7.03 6 3 10.03 3 15c0 3.87 3.13 7 7 7 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3-.55 0-1-.45-1-1s.45-1 1-1c2.76 0 5 2.24 5 5 0 3.31-2.69 6-6 6-4.97 0-9-4.03-9-9S7.03 3 12 3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
              <span
                key={quoteIdx}
                className={`text-2xl sm:text-3xl font-semibold drop-shadow-lg px-6 py-2 rounded-xl transition-all duration-700 ease-in-out bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 animate-fade-in`}
                style={playfair}
              >
                {quotes[quoteIdx]}
              </span>
              <svg className="absolute -bottom-4 -right-6 w-10 h-10 text-amber-400 rotate-180 animate-fade-in hidden md:block" viewBox="0 0 32 32" fill="currentColor"><path d="M20 26c4.97 0 9-4.03 9-9 0-3.87-3.13-7-7-7-2.21 0-4 1.79-4 4 0 1.66 1.34 3 3 3 .55 0 1 .45 1 1s-.45 1-1 1c-2.76 0-5-2.24-5-5 0-3.31 2.69-6 6-6 4.97 0 9 4.03 9 9s-4.03 9-9 9c-.55 0-1-.45-1-1s.45-1 1-1z"/></svg>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div className="flex-1 flex justify-center items-center w-full md:w-auto">
        <Image
              src="/assets/hero1.png" 
              alt="CELTIS community hero illustration" 
              width={320} 
              height={320} 
              className="object-cover rounded-3xl shadow-lg border-2 border-blue-100 w-64 h-64 md:w-80 md:h-80 bg-white" 
          priority
            />
          </div>
        </section>
        <GridAccent />
        {/* Thematic Cards Grid */}
        <section className="w-full max-w-5xl mx-auto animate-fade-in delay-500">
          <div className="mb-6 flex flex-col items-center">
            <span className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 via-emerald-100 to-amber-100 text-blue-900 font-bold text-lg tracking-wide shadow animate-fade-in">{t('mission_label')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2">
            {/* Coexistence & Co-Prosperity Card */}
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition group border border-blue-50 relative">
              <span className="absolute -top-4 -left-4 bg-blue-100 text-blue-700 font-extrabold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow animate-bounce-slow">{t('mission_1_num')}</span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2 animate-bounce-slow"><circle cx="24" cy="24" r="22" fill="#2563eb" fillOpacity="0.13"/><ellipse cx="24" cy="18" rx="12" ry="6" fill="#10b981" fillOpacity="0.10"/></svg>
              <h2 className="text-lg font-bold text-blue-800 mb-1 animate-slide-up group-hover:text-emerald-600 transition">{t('mission_1_title')}</h2>
              <p className="text-sm text-gray-700 animate-fade-in delay-600">{t('mission_1_desc')}</p>
            </div>
            {/* Eliminate Loneliness Card */}
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition group border border-emerald-50 relative">
              <span className="absolute -top-4 -left-4 bg-emerald-100 text-emerald-700 font-extrabold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow animate-bounce-slow">{t('mission_2_num')}</span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2 animate-bounce-slow"><circle cx="24" cy="24" r="22" fill="#10b981" fillOpacity="0.13"/><ellipse cx="24" cy="30" rx="14" ry="5" fill="#2563eb" fillOpacity="0.10"/></svg>
              <h2 className="text-lg font-bold text-emerald-600 mb-1 animate-slide-up group-hover:text-amber-500 transition">{t('mission_2_title')}</h2>
              <p className="text-sm text-gray-700 animate-fade-in delay-700">{t('mission_2_desc')}</p>
            </div>
            {/* Empowerment & Contribution Card */}
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition group border border-amber-50 relative">
              <span className="absolute -top-4 -left-4 bg-amber-100 text-amber-700 font-extrabold text-2xl w-10 h-10 flex items-center justify-center rounded-full shadow animate-bounce-slow">{t('mission_3_num')}</span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2 animate-bounce-slow"><circle cx="24" cy="24" r="22" fill="#fbbf24" fillOpacity="0.13"/><ellipse cx="24" cy="30" rx="14" ry="5" fill="#2563eb" fillOpacity="0.10"/></svg>
              <h2 className="text-lg font-bold text-amber-500 mb-1 animate-slide-up group-hover:text-blue-800 transition">{t('mission_3_title')}</h2>
              <p className="text-sm text-gray-700 animate-fade-in delay-800">{t('mission_3_desc')}</p>
            </div>
          </div>
        </section>
        {/* CEO Message Section */}
        <section className="w-full max-w-3xl mx-auto my-20 animate-fade-in">
          <div className="bg-white/90 rounded-3xl shadow-lg p-6 flex flex-col items-center gap-6 border border-amber-100">
            <Image src="/assets/ceo.jpeg" alt="Kanako Koga, CEO" width={128} height={128} className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-100 mb-2" />
            <span className="text-lg font-bold text-blue-800 mt-2">Kanako Koga</span>
            <span className="text-sm text-emerald-600 mb-2">CEO, CELTIS Inc.</span>
            <div className="w-full flex flex-col items-center">
              <svg className="w-8 h-8 text-amber-400 mb-2" viewBox="0 0 32 32" fill="currentColor"><path d="M12 6C7.03 6 3 10.03 3 15c0 3.87 3.13 7 7 7 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3-.55 0-1-.45-1-1s.45-1 1-1c2.76 0 5 2.24 5 5 0 3.31-2.69 6-6 6-4.97 0-9-4.03-9-9S7.03 3 12 3c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
              <p className="font-serif text-lg text-gray-800 leading-relaxed mb-2 text-center whitespace-pre-line max-w-2xl">
                {i18n.language === 'ja' ? t('ceo_message_ja') : t('ceo_message_en')}
              </p>
              <svg className="w-8 h-8 text-amber-400 mt-2" viewBox="0 0 32 32" fill="currentColor"><path d="M20 26c4.97 0 9-4.03 9-9 0-3.87-3.13-7-7-7-2.21 0-4 1.79-4 4 0 1.66 1.34 3 3 3 .55 0 1 .45 1 1s-.45 1-1 1c-2.76 0-5-2.24-5-5 0-3.31 2.69-6 6-6 4.97 0 9 4.03 9 9s-4.03 9-9 9c-.55 0-1-.45-1-1s.45-1 1-1z"/></svg>
            </div>
          </div>
        </section>
        {/* Career Highlights & Representatives Section */}
        <section className="w-full max-w-4xl mx-auto my-16 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 flex items-center gap-2"><UserGroupIcon className="w-8 h-8 text-amber-400" />{t('home_representatives_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TM Enterprise */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-200 flex flex-col gap-2">
              <span className="text-lg font-bold text-blue-800">{t('home_representatives_tm')}</span>
              <span className="text-xs text-gray-500">{t('home_representatives_tm_period')}</span>
              <span className="text-sm text-gray-700 mb-2">{t('home_representatives_tm_duties')}</span>
              <ul className="list-disc pl-5 text-blue-900 text-sm mb-2">
                <li>{t('home_representatives_tm_qbc')}</li>
                <li>{t('home_representatives_tm_jaf')}</li>
              </ul>
            </div>
            {/* Office Leene */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-200 flex flex-col gap-2">
              <span className="text-lg font-bold text-emerald-800">{t('home_representatives_leene')}</span>
              <span className="text-xs text-gray-500">{t('home_representatives_leene_period')}</span>
              <span className="text-sm text-gray-700 mb-2">{t('home_representatives_leene_affil')}</span>
              <ul className="list-disc pl-5 text-blue-900 text-sm mb-2">
                <li>{t('home_representatives_leene_events')}</li>
              </ul>
            </div>
            {/* CELTIS Co., Ltd. */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-rose-200 flex flex-col gap-2">
              <span className="text-lg font-bold text-rose-800">{t('home_representatives_celtis')}</span>
              <span className="text-xs text-gray-500">{t('home_representatives_celtis_period')}</span>
              <ul className="list-disc pl-5 text-blue-900 text-sm mb-2">
                <li>{t('home_representatives_celtis_tv')}</li>
                <li>{t('home_representatives_celtis_tomoni')}</li>
                <li>{t('home_representatives_celtis_agri')}</li>
                <li>{t('home_representatives_celtis_musubi')}</li>
                <li>{t('home_representatives_celtis_npo')}</li>
                <li>{t('home_representatives_celtis_fes')}</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Gallery Section */}
        <section className="w-full max-w-6xl mx-auto my-16 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-indigo-900 mb-4 flex items-center gap-2"><SparklesIcon className="w-8 h-8 text-amber-400 animate-pulse" />{t('home_gallery_title')}</h2>
          <p className="text-blue-800 mb-8 text-lg font-light">{t('home_gallery_desc')}</p>
          {/* Artistic Masonry Gallery */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {/* Example: alternate large/small, you can edit the label text later */}
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a1.png" alt="Gallery image 1" width={600} height={800} className="rounded-2xl shadow-lg w-full object-cover mb-2 hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_1')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a2.png" alt="Gallery image 2" width={400} height={400} className="rounded-2xl shadow-lg w-3/4 object-cover mb-2 mx-auto hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_2')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a3.png" alt="Gallery image 3" width={600} height={400} className="rounded-2xl shadow-lg w-full object-cover mb-2 hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_3')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a4.png" alt="Gallery image 4" width={300} height={400} className="rounded-2xl shadow-lg w-2/3 object-cover mb-2 mx-auto hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_4')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a5.png" alt="Gallery image 5" width={500} height={700} className="rounded-2xl shadow-lg w-full object-cover mb-2 hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_5')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a6.png" alt="Gallery image 6" width={400} height={400} className="rounded-2xl shadow-lg w-3/4 object-cover mb-2 mx-auto hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_6')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a7.png" alt="Gallery image 7" width={600} height={400} className="rounded-2xl shadow-lg w-full object-cover mb-2 hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_7')}</div>
            </div>
            
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a9.png" alt="Gallery image 9" width={500} height={700} className="rounded-2xl shadow-lg w-full object-cover mb-2 hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_9')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a10.png" alt="Gallery image 10" width={400} height={400} className="rounded-2xl shadow-lg w-3/4 object-cover mb-2 mx-auto hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_10')}</div>
            </div>
            <div className="break-inside-avoid mb-4">
              <Image src="/assets/galary/a11.png" alt="Gallery image 11" width={600} height={800} className="rounded-2xl shadow-lg w-full object-cover mb-2 hover:scale-105 transition-transform duration-300" />
              <div className="text-center text-blue-900 text-sm font-semibold">{t('gallery_label_11')}</div>
            </div>
          </div>
        </section>
        {/* Thank You / Join Us Section */}
        <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
          <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
            {t('supporters_cta_headline')}
          </div>
          <p className="text-blue-900 mb-2 mt-4">{t('supporters_cta')}</p>
        </section>
        {/* Overview Section */}
        <section className="w-full max-w-6xl mx-auto my-20 px-4 animate-fade-in" id="overview">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-12 text-center drop-shadow animate-slide-down">{t('overview_title')}</h2>
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16 group">
            <div className="flex-1 w-full md:w-1/2 animate-fade-in-left">
              <Image src="/assets/c1.jpg" alt="Family at home - CELTIS" width={600} height={400} className="rounded-3xl shadow-xl border-4 border-blue-100 group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex-1 w-full md:w-1/2 animate-fade-in-right">
              <div className="bg-white/90 rounded-2xl shadow-lg p-8 border-l-4 border-emerald-200 animate-fade-in">
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">{t('overview_company')}</h3>
                <p className="text-lg text-gray-800 mb-2">{t('overview_business')}</p>
                <ul className="list-disc pl-6 text-base text-blue-900 mb-2">
                  <li>{t('overview_list_1')}</li>
                  <li>{t('overview_list_2')}</li>
                  <li>{t('overview_list_3')}</li>
                  <li>{t('overview_list_4')}</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Block 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 group">
            <div className="flex-1 w-full md:w-1/2 animate-fade-in-right">
              <Image src="/assets/c2.jpg" alt="Child playing with blocks - CELTIS" width={600} height={400} className="rounded-3xl shadow-xl border-4 border-amber-100 group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex-1 w-full md:w-1/2 animate-fade-in-left">
              <div className="bg-white/90 rounded-2xl shadow-lg p-8 border-l-4 border-amber-200 animate-fade-in">
                <h4 className="text-xl font-bold text-amber-700 mb-2">{t('overview_established')}</h4>
                <p className="text-base text-gray-800 mb-2">{t('overview_established_date')}</p>
                <h4 className="text-xl font-bold text-amber-700 mb-2">{t('overview_ceo')}</h4>
                <p className="text-base text-gray-800 mb-1">{t('overview_ceo_name')}</p>
                <p className="text-sm text-blue-700 mb-2">{t('overview_ceo_roles')}</p>
                <h4 className="text-xl font-bold text-amber-700 mb-2">{t('overview_location')}</h4>
                <p className="text-base text-gray-800">{t('overview_location_address')}</p>
                <div className="mt-4">
                  <a href="https://www.youtube.com/@smallstepchannel" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 text-white font-semibold shadow hover:scale-105 transition-transform duration-300 animate-pulse">{t('overview_youtube_button')}</a>
                </div>
              </div>
            </div>
        </div>
        </section>
        {/* Floating animated CTA button */}
        <Link href="/donate" className="fixed bottom-8 right-8 z-50 animate-bounce drop-shadow-xl">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-emerald-400 text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform duration-200 border-4 border-white/40 backdrop-blur-xl">
            <HeartIcon className="w-6 h-6" /> {t('donateButton')}
          </button>
        </Link>
      </main>
    </div>
  );
}
