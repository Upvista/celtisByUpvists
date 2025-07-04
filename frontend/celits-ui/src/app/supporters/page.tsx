'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { fetchStrapiCollection } from '../../lib/strapi';
import '../../i18n';
import { HeartIcon, GlobeAltIcon, UserGroupIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Supporter {
  id: number;
  Name: string;
  Logo?: { url?: string };
  Website?: string;
  Donation_Link?: string;
  Description?: string;
  publishedAt?: string;
}

function mapStrapiSupporter(entry: Record<string, unknown>): Supporter {
  return {
    id: entry.id as number,
    Name: entry.Name as string,
    Logo: entry.Logo ? { url: (entry.Logo as { url?: string }).url } : undefined,
    Website: entry.Website as string | undefined,
    Donation_Link: entry.Donation_Link as string | undefined,
    Description: entry.Description as string | undefined,
    publishedAt: entry.publishedAt as string | undefined,
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';
const YOUTUBE_URL = 'https://youtube.com/@smallstepchannel';

function formatUrl(url?: string) {
  if (!url) return '';
  return url.startsWith('http://') || url.startsWith('https://') ? url : 'http://' + url;
}

const HeroSVG = () => (
  <svg className="absolute left-0 top-0 w-full h-40 md:h-56 opacity-20 pointer-events-none select-none" viewBox="0 0 1440 320" fill="none"><path fill="url(#grad)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" /><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a5b4fc"/><stop offset="100%" stopColor="#fef9c3"/></linearGradient></defs></svg>
);

// Custom SVGs for support options
const SupportSVGs = {
  donate: (
    <svg className="w-10 h-10 mx-auto mb-2 animate-bounce" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#fef9c3"/><path d="M24 36s-8-5.33-8-12a8 8 0 0 1 16 0c0 6.67-8 12-8 12Z" fill="#f87171"/><circle cx="24" cy="24" r="4" fill="#fff"/></svg>
  ),
  social: (
    <svg className="w-10 h-10 mx-auto mb-2 animate-pulse" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#dbeafe"/><path d="M16 32v-8a8 8 0 0 1 16 0v8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="20" r="3" fill="#2563eb"/></svg>
  ),
  awareness: (
    <svg className="w-10 h-10 mx-auto mb-2 animate-wiggle" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#f0fdf4"/><path d="M24 14v12l8 4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="4" fill="#10b981"/></svg>
  ),
  marketing: (
    <svg className="w-10 h-10 mx-auto mb-2 animate-bounce" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#fef3c7"/><rect x="16" y="16" width="16" height="16" rx="4" fill="#f59e42"/><path d="M24 20v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  cohost: (
    <svg className="w-10 h-10 mx-auto mb-2 animate-pulse" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#ede9fe"/><path d="M16 32l8-8 8 8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="20" r="4" fill="#8b5cf6"/></svg>
  ),
  volunteer: (
    <svg className="w-10 h-10 mx-auto mb-2 animate-wiggle" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#f0fdfa"/><path d="M24 32v-8a8 8 0 0 1 8-8" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="4" fill="#14b8a6"/></svg>
  ),
};

const supportOptions = [
  { key: 'donate' },
  { key: 'social' },
  { key: 'awareness' },
  { key: 'marketing' },
  { key: 'cohost' },
  { key: 'volunteer' },
];

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

export default function Supporters() {
  const { t, i18n } = useTranslation();
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = i18n.language || 'en';
  const [selectedSupporter, setSelectedSupporter] = useState<Supporter | null>(null);

  useEffect(() => {
    fetchStrapiCollection('supporters', locale)
      .then((data) => setSupporters(data.map(mapStrapiSupporter)))
      .finally(() => setLoading(false));
  }, [locale]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 relative px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroSVG />
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-2 drop-shadow flex items-center gap-2"><UserGroupIcon className="w-8 h-8 text-amber-400" />{t('supporters_hero_headline')}</h1>
        <p className="text-lg md:text-xl text-indigo-800 font-light mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('supporters_hero_subtitle')}
        </p>
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{supporters.length} {t('supporters')}</span>
      </section>
      {/* Founder Story & Why Support Section */}
      <section className="max-w-2xl mx-auto mb-12 animate-fade-in">
        <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-2xl shadow p-6 md:p-8 flex flex-col gap-4">
          <div className="text-lg md:text-xl text-indigo-900 font-semibold mb-1">{t('supporters_founder_story')}</div>
          <div className="text-base text-gray-700 mb-2">{t('supporters_why_support')}</div>
        </div>
      </section>
      {/* Support YouTube Channel Section */}
      <section className="mb-16 animate-fade-in">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-rose-200 via-amber-100 to-blue-200 shadow-2xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-blue-100">
            <div className="flex-shrink-0 flex items-center justify-center">
              <svg className="w-32 h-32 md:w-40 md:h-40 animate-bounce" viewBox="0 0 128 128" fill="none"><circle cx="64" cy="64" r="64" fill="#f87171"/><rect x="40" y="40" width="48" height="48" rx="12" fill="#fff"/><path d="M56 52v24l20-12-20-12Z" fill="#f87171"/></svg>
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-rose-600 mb-2 drop-shadow">{t('supporters_youtube_title')}</h2>
              <p className="text-lg md:text-xl text-indigo-800 font-light mb-4">{t('supporters_youtube_subtitle')}</p>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 text-white font-bold text-xl shadow-lg hover:scale-105 hover:from-amber-400 hover:to-rose-500 transition-transform duration-200 animate-pulse">
                {t('supporters_youtube_title')}
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Ways to Support Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-2 animate-fade-in"><HeartIcon className="w-6 h-6 text-rose-400" />{t('supporters_ways_to_support')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {supportOptions.map(opt => (
            <div key={opt.key} className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-2xl shadow flex flex-col items-center p-4 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in">
              {SupportSVGs[opt.key as keyof typeof SupportSVGs]}
              <div className="font-bold text-sm text-indigo-800 mb-1 text-center">{t(`supporters_option_${opt.key}`)}</div>
              <div className="text-xs text-gray-500 text-center">{t(`supporters_option_${opt.key}_desc`)}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Supporters Grid Section */}
      <GridAccent />
      <div className="text-center text-2xl font-bold text-indigo-700 mb-6 animate-fade-in">{t('supporters_our_supporters')}</div>
      {loading ? (
        <p className="text-center text-gray-400 animate-fade-in">{t('loading')}</p>
      ) : supporters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <UserGroupIcon className="w-20 h-20 text-blue-200 mb-4" />
          <p className="text-center text-gray-400 text-lg">{t('supporters_no_supporters')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          {supporters.map((sup, idx) => (
            <div key={sup.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" tabIndex={0} aria-label={sup.Name} style={{animationDelay: `${idx * 60}ms`}}>
              {/* Animated accent */}
              <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
              {/* Floating badge */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">🌟 Supporter</span>
              {sup.Logo?.url ? (
                <Image src={STRAPI_URL + sup.Logo.url} alt={sup.Name} width={80} height={80} className="w-20 h-20 object-contain rounded-full border-4 border-white shadow-lg bg-white" onError={e => (e.currentTarget.style.display = 'none')} />
              ) : (
                <UserGroupIcon className="w-20 h-20 text-blue-200 mb-2" />
              )}
              <h2 className="text-lg font-extrabold mb-1 text-center text-indigo-800 group-hover:text-blue-700 transition drop-shadow-lg">{sup.Name}</h2>
              <div className="text-xs text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">
                {sup.Description}
                {sup.Description && sup.Description.length > 120 && (
                  <>
                    <span className="inline-block align-middle">... </span>
                    <button
                      className="text-emerald-600 underline hover:text-rose-500 ml-1 text-xs font-semibold"
                      onClick={e => { e.stopPropagation(); setSelectedSupporter(sup); }}
                    >
                      Read more
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-auto justify-center">
                {sup.Website && (
                  <a href={formatUrl(sup.Website)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition">
                    <GlobeAltIcon className="w-4 h-4" /> {t('supporters_website')}
                  </a>
                )}
                {sup.Donation_Link && (
                  <a href={formatUrl(sup.Donation_Link)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold hover:bg-emerald-600 transition">
                    <HeartIcon className="w-4 h-4" /> {t('supporters_donate_now')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Thank You Section */}
      <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
        <div className="text-lg md:text-xl text-emerald-700 font-semibold">{t('supporters_grid_thankyou')}</div>
      </section>
      {/* CTA with animated SVG */}
      <section className="max-w-2xl mx-auto mt-16 mb-32">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-emerald-300 via-amber-100 to-blue-200 shadow-lg animate-fade-in">
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <HeartIcon className="w-7 h-7 text-rose-500 animate-bounce" />
              <h3 className="text-xl md:text-2xl font-extrabold text-indigo-900 drop-shadow">{t('supporters_cta_headline')}</h3>
            </div>
            <p className="text-indigo-800 text-center mb-2 text-base md:text-lg font-light">{t('supporters_cta')}</p>
            <Link href="/contact" className="px-7 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-white font-bold shadow hover:scale-105 hover:from-amber-400 hover:to-emerald-500 transition-transform duration-200 text-lg">{t('supporters_contact')}</Link>
          </div>
        </div>
      </section>
      {/* Floating animated CTA button */}
      <Link href="/donate" className="fixed bottom-8 right-8 z-50 animate-bounce drop-shadow-xl">
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-emerald-400 text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform duration-200 border-4 border-white/40 backdrop-blur-xl">
          <HeartIcon className="w-6 h-6" /> {t('donateButton')}
        </button>
      </Link>
      {/* Supporter Description Modal */}
      {selectedSupporter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSupporter(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in flex flex-col" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelectedSupporter(null)} aria-label="Close">
              <XMarkIcon className="w-7 h-7" />
            </button>
            <h2 className="text-xl font-bold mb-2 text-indigo-900 text-center">{selectedSupporter.Name}</h2>
            <div className="mb-2 text-gray-700 text-center whitespace-pre-line break-words">
              {selectedSupporter.Description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 