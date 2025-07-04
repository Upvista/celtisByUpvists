'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { XMarkIcon, PlayCircleIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Episode {
  id: number;
  Title_en: string;
  Title_jp: string;
  Description_en: string;
  Description_jp: string;
  Youtube_URL: string;
  Thumbnail?: { url?: string };
  publishedAt?: string;
}

// Animated background SVG for the whole page
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

// Remove Strapi/data fetching logic and use hardcoded episodes

const HARDCODED_EPISODES = [
  {
    id: 1,
    Title_en: 'Episode 1: Introduction to CELITIS',
    Title_jp: 'エピソード1：CELITISの紹介',
    Description_en: 'Welcome to the first episode! Learn about our mission and vision.',
    Description_jp: '第1話へようこそ！私たちの使命とビジョンについて学びましょう。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx1',
    Thumbnail: { url: '/assets/galary/a1.png' },
    publishedAt: '2024-01-01',
  },
  {
    id: 2,
    Title_en: 'Episode 2: The Power of Community',
    Title_jp: 'エピソード2：コミュニティの力',
    Description_en: 'Discover how community shapes our journey.',
    Description_jp: 'コミュニティが私たちの歩みをどのように形作るかを発見しましょう。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx2',
    Thumbnail: { url: '/assets/galary/a2.png' },
    publishedAt: '2024-01-08',
  },
  {
    id: 3,
    Title_en: 'Episode 3: Innovation in Action',
    Title_jp: 'エピソード3：実践の中のイノベーション',
    Description_en: 'See innovation at work in CELITIS.',
    Description_jp: 'CELITISでのイノベーションの実例をご覧ください。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx3',
    Thumbnail: { url: '/assets/galary/a3.png' },
    publishedAt: '2024-01-15',
  },
  {
    id: 4,
    Title_en: 'Episode 4: Meet the Team',
    Title_jp: 'エピソード4：チーム紹介',
    Description_en: 'Get to know the people behind CELITIS.',
    Description_jp: 'CELITISを支えるメンバーを紹介します。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx4',
    Thumbnail: { url: '/assets/galary/a4.png' },
    publishedAt: '2024-01-22',
  },
  {
    id: 5,
    Title_en: 'Episode 5: Our Global Impact',
    Title_jp: 'エピソード5：世界への影響',
    Description_en: 'CELITIS around the world.',
    Description_jp: '世界中で活躍するCELITIS。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx5',
    Thumbnail: { url: '/assets/galary/a5.png' },
    publishedAt: '2024-01-29',
  },
  {
    id: 6,
    Title_en: 'Episode 6: Technology for Good',
    Title_jp: 'エピソード6：善のためのテクノロジー',
    Description_en: 'How we use tech to make a difference.',
    Description_jp: '私たちがどのようにテクノロジーを活用して社会に貢献しているか。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx6',
    Thumbnail: { url: '/assets/galary/a6.png' },
    publishedAt: '2024-02-05',
  },
  {
    id: 7,
    Title_en: 'Episode 7: Education Initiatives',
    Title_jp: 'エピソード7：教育への取り組み',
    Description_en: 'Our work in education.',
    Description_jp: '教育分野での私たちの活動。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx7',
    Thumbnail: { url: '/assets/galary/a7.png' },
    publishedAt: '2024-02-12',
  },
  {
    id: 8,
    Title_en: 'Episode 8: Partnerships',
    Title_jp: 'エピソード8：パートナーシップ',
    Description_en: 'Collaborating for greater impact.',
    Description_jp: 'より大きな影響を与えるための協力。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx8',
    Thumbnail: { url: '/assets/galary/a8.png' },
    publishedAt: '2024-02-19',
  },
  {
    id: 9,
    Title_en: 'Episode 9: Looking Ahead',
    Title_jp: 'エピソード9：これからの展望',
    Description_en: 'What\'s next for CELITIS?',
    Description_jp: 'CELITISの今後の展望。',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx9',
    Thumbnail: { url: '/assets/galary/a9.png' },
    publishedAt: '2024-02-26',
  },
  {
    id: 10,
    Title_en: 'Episode 10: Q&A Special',
    Title_jp: 'エピソード10：Q&Aスペシャル',
    Description_en: 'Answering your questions!',
    Description_jp: '皆さんの質問にお答えします！',
    Youtube_URL: 'https://www.youtube.com/watch?v=xxxxxxx10',
    Thumbnail: { url: '/assets/galary/a10.png' },
    publishedAt: '2024-03-04',
  },
];

export default function Watch() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Episode | null>(null);
  const [copied, setCopied] = useState(false);
  const [locale, setLocale] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleLangChange = (lng: string) => setLocale(lng);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

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
          <PlayCircleIcon className="w-8 h-8 text-amber-400" />
          {locale.startsWith('ja') ? 'エピソード' : 'Episodes'}
        </h1>
        <p className="text-lg md:text-xl text-blue-800 font-light mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {locale.startsWith('ja') ? '最新のエピソードをチェックしよう！' : 'Check out our latest episodes!'}
        </p>
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{HARDCODED_EPISODES.length} {locale.startsWith('ja') ? 'エピソード' : 'Episodes'}</span>
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
        {/* Hardcoded episode grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {HARDCODED_EPISODES.map((ep, idx) => {
            const title = locale.startsWith('ja') ? ep.Title_jp : ep.Title_en;
            const description = locale.startsWith('ja') ? ep.Description_jp : ep.Description_en;
            return (
              <div key={ep.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" style={{animationDelay: `${idx * 60}ms`}} tabIndex={0} aria-label={title} onClick={() => setSelected(ep)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(ep); }}>
                {/* Animated accent */}
                <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                {/* Floating badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📺 {t('episode')}</span>
                {ep.Thumbnail?.url ? (
                  <Image src={ep.Thumbnail.url} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" width={400} height={224} onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl">📺</div>
                )}
                <div className="p-5 w-full flex-1 flex flex-col">
                  <h2 className="text-lg font-bold mb-1 text-center text-blue-800 group-hover:text-blue-700 transition line-clamp-2">{title}</h2>
                  {ep.publishedAt && <div className="text-xs text-gray-500 mb-2 text-center">{t('published')}: {new Date(ep.publishedAt).toLocaleDateString(locale)}</div>}
                  <div className="text-xs text-gray-500 line-clamp-2 mb-2 text-center">{description}</div>
                  <div className="flex items-center gap-2 mt-auto justify-center">
                    <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold">{locale.toUpperCase()}</span>
                  </div>
                </div>
                <a
                  href={ep.Youtube_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow text-base font-semibold mt-2"
                >
                  <PlayCircleIcon className="w-5 h-5" /> {t('watch') || 'Watch on YouTube'}
                </a>
              </div>
            );
          })}
        </div>
        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-2" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl p-2 sm:p-4 md:p-6 mx-2 relative animate-fade-in max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelected(null)} aria-label="Close">
                <XMarkIcon className="w-7 h-7" />
              </button>
              <div className="overflow-y-auto p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2 text-blue-900 text-center">
                  {locale.startsWith('ja') ? selected.Title_jp : selected.Title_en}
                </h2>
                {selected.Thumbnail?.url && (
                  <div className="w-full flex justify-center mb-4">
                    <Image
                      src={selected.Thumbnail.url}
                      alt={locale.startsWith('ja') ? selected.Title_jp : selected.Title_en}
                      width={400}
                      height={224}
                      className="rounded-lg max-h-56 object-contain shadow"
                    />
                  </div>
                )}
                <div className="mb-2 text-gray-700 text-center">
                  {locale.startsWith('ja') ? selected.Description_jp : selected.Description_en}
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