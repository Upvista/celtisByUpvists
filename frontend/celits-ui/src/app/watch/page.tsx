'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { fetchStrapiCollection } from '../../lib/strapi';
import '../../i18n';
import { XMarkIcon, PlayCircleIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Episode {
  id: number;
  Title: string;
  Description?: string | { children?: { text: string }[] }[];
  Youtube_URL: string;
  Thumbnail?: { url?: string };
  publishedAt?: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

const HeroSVG = () => (
  <svg className="absolute left-0 top-0 w-full h-40 md:h-56 opacity-20 pointer-events-none select-none" viewBox="0 0 1440 320" fill="none"><path fill="url(#grad)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" /><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a5b4fc"/><stop offset="100%" stopColor="#fef9c3"/></linearGradient></defs></svg>
);

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

export default function Watch() {
  const { t, i18n } = useTranslation();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Episode | null>(null);
  const [copied, setCopied] = useState(false);
  const locale = i18n.language || 'en';

  useEffect(() => {
    fetchStrapiCollection('episodes', locale).then(setEpisodes).finally(() => setLoading(false));
  }, [locale]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 relative px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroSVG />
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 drop-shadow flex items-center gap-2">
          <PlayCircleIcon className="w-8 h-8 text-amber-400" />{t('episodes')}
        </h1>
        <p className="text-lg md:text-xl text-blue-800 font-light mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('hero_subtitle')}
        </p>
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{episodes.length} {t('episodes')}</span>
      </section>
      {/* Mission/Why Watch Section */}
      <section className="max-w-2xl mx-auto mb-12 animate-fade-in">
        <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-2xl shadow p-6 md:p-8 flex flex-col gap-4">
          <div className="text-lg md:text-xl text-blue-900 font-semibold mb-1">{t('episodesMissionHeadline')}</div>
          <div className="text-base text-gray-700 mb-2">{t('episodesMissionBody')}</div>
        </div>
      </section>
      <main className="relative z-10 max-w-6xl mx-auto pb-16 px-2 md:px-6">
        <GridAccent />
        <div className="text-center text-2xl font-bold text-blue-700 mb-6 animate-fade-in">{t('episodes_grid_headline')}</div>
        {loading ? (
          <p className="text-center text-gray-400">{t('loading')}</p>
        ) : episodes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <svg width="120" height="120" fill="none" viewBox="0 0 24 24" className="mb-4 text-blue-200"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="M8 12h8M8 16h5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="9" r="1" fill="#3b82f6" /><circle cx="15" cy="9" r="1" fill="#3b82f6" /></svg>
            <p className="text-center text-gray-400 text-lg">{t('coming_soon')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {episodes.map((ep, idx) => (
              <div key={ep.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" style={{animationDelay: `${idx * 60}ms`}} tabIndex={0} aria-label={ep.Title} onClick={() => setSelected(ep)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(ep); }}>
                {/* Animated accent */}
                <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                {/* Floating badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📺 {t('episode')}</span>
                {ep.Thumbnail?.url ? (
                  <Image src={STRAPI_URL + ep.Thumbnail.url} alt={ep.Title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" width={400} height={224} onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl">📺</div>
                )}
                <div className="p-5 w-full flex-1 flex flex-col">
                  <h2 className="text-lg font-bold mb-1 text-center text-blue-800 group-hover:text-blue-700 transition line-clamp-2">{ep.Title}</h2>
                  {ep.publishedAt && <div className="text-xs text-gray-500 mb-2 text-center">{t('published')}: {new Date(ep.publishedAt).toLocaleDateString(locale)}</div>}
                  <div className="text-xs text-gray-500 line-clamp-2 mb-2 text-center">{Array.isArray(ep.Description) ? ep.Description.map((d: { children?: { text: string }[] }) => Array.isArray(d.children) ? d.children.map((c: { text: string }) => c.text).join(' ') : '').join(' ') : ep.Description}</div>
                  <div className="flex items-center gap-2 mt-auto justify-center">
                    <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold">{locale.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-2" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-0 relative animate-fade-in max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelected(null)} aria-label="Close">
                <XMarkIcon className="w-7 h-7" />
              </button>
              <div className="overflow-y-auto p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2 text-blue-900 text-center">{selected.Title}</h2>
                {selected.Thumbnail?.url && (
                  <div className="w-full flex justify-center mb-4">
                    <Image
                      src={STRAPI_URL + selected.Thumbnail.url}
                      alt={selected.Title}
                      width={400}
                      height={224}
                      className="rounded-lg max-h-56 object-contain shadow"
                    />
                  </div>
                )}
                <div className="mb-2 text-gray-700 text-center">
                  {Array.isArray(selected.Description) ? selected.Description.map((d: { children?: { text: string }[] }) => Array.isArray(d.children) ? d.children.map((c: { text: string }) => c.text).join(' ') : '').join(' ') : selected.Description}
                </div>
                {selected.publishedAt && <div className="text-xs text-gray-500 mb-2 text-center">{t('published')}: {new Date(selected.publishedAt).toLocaleDateString(locale)}</div>}
                <div className="flex gap-3 mt-4 flex-wrap justify-center">
                  {selected.Youtube_URL && (
                    <a
                      href={selected.Youtube_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow text-base font-semibold"
                    >
                      <PlayCircleIcon className="w-5 h-5" /> {t('watch') || 'Watch on YouTube'}
                    </a>
                  )}
                  <button
                    onClick={() => handleCopy(selected.Youtube_URL)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 shadow"
                  >
                    <ShareIcon className="w-5 h-5" /> {copied ? t('copied') || 'Copied!' : t('share') || 'Share'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Thank You Section */}
        <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
          <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
            {t('episodes_grid_thankyou')}
          </div>
        </section>
        {/* CTA with animated SVG */}
        <section className="max-w-2xl mx-auto mt-16 mb-32">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-emerald-300 via-amber-100 to-blue-200 shadow-lg animate-fade-in">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-emerald-500 animate-bounce" />
                <h3 className="text-xl md:text-2xl font-extrabold text-blue-900 drop-shadow">{t('want_to_share')}</h3>
              </div>
              <p className="text-blue-800 text-center mb-2 text-base md:text-lg font-light">{t('contact_cta')}</p>
              <Link href="/contact" className="px-7 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-white font-extrabold shadow-lg hover:scale-105 hover:from-amber-400 hover:to-emerald-500 transition-transform duration-200 text-lg tracking-wide focus:outline-none focus:ring-4 focus:ring-emerald-300">
                {t('episodesContactButton')}
              </Link>
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