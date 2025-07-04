'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { XMarkIcon, SparklesIcon, NewspaperIcon, ChatBubbleLeftRightIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import '../../i18n';

interface Article {
  id: number;
  Title_en: string;
  Title_jp: string;
  Description_en: string;
  Description_jp: string;
  Cover_Image?: { url?: string };
  publishedAt?: string;
}

const HARDCODED_ARTICLES: Article[] = [
  {
    id: 1,
    Title_en: 'Article 1: CELITIS Launches New Initiative',
    Title_jp: '記事1：CELITISが新しい取り組みを開始',
    Description_en: 'CELITIS is excited to announce a new initiative to support local communities.',
    Description_jp: 'CELITISは地域社会を支援する新しい取り組みを発表しました。',
    Cover_Image: { url: '/assets/galary/a1.png' },
    publishedAt: '2024-01-05',
  },
  {
    id: 2,
    Title_en: 'Article 2: Interview with the CEO',
    Title_jp: '記事2：CEOへのインタビュー',
    Description_en: 'An exclusive interview with the CEO of CELITIS about future plans.',
    Description_jp: 'CELITISのCEOに今後の計画について独占インタビュー。',
    Cover_Image: { url: '/assets/galary/a2.png' },
    publishedAt: '2024-01-12',
  },
  {
    id: 3,
    Title_en: 'Article 3: Community Event Highlights',
    Title_jp: '記事3：コミュニティイベントのハイライト',
    Description_en: 'Highlights from our recent community event.',
    Description_jp: '最近のコミュニティイベントのハイライトをご紹介します。',
    Cover_Image: { url: '/assets/galary/a3.png' },
    publishedAt: '2024-01-19',
  },
  {
    id: 4,
    Title_en: 'Article 4: Technology for Good',
    Title_jp: '記事4：善のためのテクノロジー',
    Description_en: 'How CELITIS uses technology to make a positive impact.',
    Description_jp: 'CELITISがどのようにテクノロジーを活用して社会に貢献しているか。',
    Cover_Image: { url: '/assets/galary/a4.png' },
    publishedAt: '2024-01-26',
  },
  {
    id: 5,
    Title_en: 'Article 5: Volunteer Stories',
    Title_jp: '記事5：ボランティアの物語',
    Description_en: 'Stories from our amazing volunteers.',
    Description_jp: '素晴らしいボランティアの皆さんの物語。',
    Cover_Image: { url: '/assets/galary/a5.png' },
    publishedAt: '2024-02-02',
  },
  {
    id: 6,
    Title_en: 'Article 6: Educational Programs',
    Title_jp: '記事6：教育プログラム',
    Description_en: 'An overview of our educational programs.',
    Description_jp: '私たちの教育プログラムの概要。',
    Cover_Image: { url: '/assets/galary/a6.png' },
    publishedAt: '2024-02-09',
  },
  {
    id: 7,
    Title_en: 'Article 7: Partnership Announcements',
    Title_jp: '記事7：パートナーシップ発表',
    Description_en: 'Announcing new partnerships for greater impact.',
    Description_jp: 'より大きな影響を与えるための新しいパートナーシップを発表。',
    Cover_Image: { url: '/assets/galary/a7.png' },
    publishedAt: '2024-02-16',
  },
  {
    id: 8,
    Title_en: 'Article 8: Sustainability Efforts',
    Title_jp: '記事8：持続可能性への取り組み',
    Description_en: 'CELITIS\'s efforts towards sustainability.',
    Description_jp: 'CELITISの持続可能性への取り組み。',
    Cover_Image: { url: '/assets/galary/a8.png' },
    publishedAt: '2024-02-23',
  },
  {
    id: 9,
    Title_en: 'Article 9: Looking Ahead',
    Title_jp: '記事9：これからの展望',
    Description_en: 'What\'s next for CELITIS?',
    Description_jp: 'CELITISの今後の展望。',
    Cover_Image: { url: '/assets/galary/a9.png' },
    publishedAt: '2024-03-01',
  },
  {
    id: 10,
    Title_en: 'Article 10: Q&A with Supporters',
    Title_jp: '記事10：サポーターとのQ&A',
    Description_en: 'We answer questions from our supporters.',
    Description_jp: 'サポーターの皆さんからの質問にお答えします。',
    Cover_Image: { url: '/assets/galary/a10.png' },
    publishedAt: '2024-03-08',
  },
];

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

export default function Articles() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Article | null>(null);
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-2 drop-shadow flex items-center gap-2">
          <NewspaperIcon className="w-8 h-8 text-amber-400" />{t('articles')}
        </h1>
        <p className="text-lg md:text-xl text-indigo-800 font-light mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {locale.startsWith('ja')
            ? '希望を灯し、心をつなぎ、世界を変えるストーリーを――一つの記事から。'
            : 'Stories that spark hope, bridge hearts, and change the world—one article at a time.'}
        </p>
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{HARDCODED_ARTICLES.length} {locale.startsWith('ja') ? '記事' : 'Articles'}</span>
      </section>
      {/* Mission/Why Read Section */}
      <section className="max-w-2xl mx-auto mb-12 animate-fade-in">
        <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-2xl shadow p-6 md:p-8 flex flex-col gap-4">
          <div className="text-lg md:text-xl text-indigo-900 font-semibold mb-1">{t('articlesMissionHeadline')}</div>
          <div className="text-base text-gray-700 mb-2">{t('articlesMissionBody')}</div>
        </div>
      </section>
      <main className="relative z-10 max-w-6xl mx-auto pb-16 px-2 md:px-6">
        <GridAccent />
        <div className="text-center text-2xl font-bold text-indigo-700 mb-6 animate-fade-in">
          {locale.startsWith('ja')
            ? '共に発見し、学び、成長しよう'
            : 'Discover, Learn, and Grow Together'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {HARDCODED_ARTICLES.map((article, idx) => {
            const title = locale.startsWith('ja') ? article.Title_jp : article.Title_en;
            const description = locale.startsWith('ja') ? article.Description_jp : article.Description_en;
            return (
              <div key={article.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" style={{animationDelay: `${idx * 60}ms`}} tabIndex={0} aria-label={title} onClick={() => setSelected(article)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(article); }}>
                {/* Animated accent */}
                <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                {/* Floating badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📰 {locale.startsWith('ja') ? '記事' : 'Article'}</span>
                {article.Cover_Image?.url ? (
                  <Image src={article.Cover_Image.url} alt={title} width={400} height={192} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl">📰</div>
                )}
                <div className="p-5 w-full flex-1 flex flex-col">
                  <h2 className="text-lg font-bold mb-1 text-center text-indigo-800 group-hover:text-blue-700 transition line-clamp-2">{title}</h2>
                  {article.publishedAt && <div className="text-xs text-gray-500 mb-2 text-center">{locale.startsWith('ja') ? '公開日' : 'Published'}: {new Date(article.publishedAt).toLocaleDateString(locale)}</div>}
                  <div className="text-xs text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{description}</div>
                  <div className="flex items-center gap-2 mt-auto justify-center">
                    <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold">{locale.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-2" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in flex flex-col" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelected(null)} aria-label="Close">
                <XMarkIcon className="w-7 h-7" />
              </button>
              {selected.Cover_Image?.url && (
                <Image src={selected.Cover_Image.url} alt={locale.startsWith('ja') ? selected.Title_jp : selected.Title_en} width={400} height={128} className="w-full h-32 object-cover rounded mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2 text-indigo-900 text-center">{locale.startsWith('ja') ? selected.Title_jp : selected.Title_en}</h2>
              {selected.publishedAt && <div className="text-xs text-gray-500 mb-2 text-center">{locale.startsWith('ja') ? '公開日' : 'Published'}: {new Date(selected.publishedAt).toLocaleDateString(locale)}</div>}
              <div className="mb-4 text-gray-700 text-center">{locale.startsWith('ja') ? selected.Description_jp : selected.Description_en}</div>
              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                <button
                  onClick={() => handleCopy(window.location.href)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 shadow"
                >
                  <ShareIcon className="w-5 h-5" /> {copied ? (locale.startsWith('ja') ? 'コピーしました！' : 'Copied!') : (locale.startsWith('ja') ? '共有' : 'Share')}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Thank You Section */}
        <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
          <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
            {t('articles_grid_thankyou')}
          </div>
        </section>
        {/* CTA with animated SVG */}
        <section className="max-w-2xl mx-auto mt-16 mb-32">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-emerald-300 via-amber-100 to-blue-200 shadow-lg animate-fade-in">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-emerald-500 animate-bounce" />
                <h3 className="text-xl md:text-2xl font-extrabold text-indigo-900 drop-shadow">{t('articles_want_to_contribute')}</h3>
              </div>
              <p className="text-indigo-800 text-center mb-2 text-base md:text-lg font-light">{t('articles_cta')}</p>
              <Link href="/contact" className="px-7 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-white font-extrabold shadow-lg hover:scale-105 hover:from-amber-400 hover:to-emerald-500 transition-transform duration-200 text-lg tracking-wide focus:outline-none focus:ring-4 focus:ring-emerald-300">
                {t('articlesContactButton')}
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