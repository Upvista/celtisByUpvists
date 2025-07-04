'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useModal } from '../ModalProvider';
import { ChatBubbleLeftRightIcon, UserCircleIcon, XMarkIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  Name_en: string;
  Name_jp: string;
  Relation_en?: string;
  Relation_jp?: string;
  Message_en: string;
  Message_jp: string;
  Photo?: { url?: string };
}

const HARDCODED_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    Name_en: 'Yuki Tanaka',
    Name_jp: '田中 祐樹',
    Relation_en: 'CELITIS Volunteer',
    Relation_jp: 'CELITISボランティア',
    Message_en: 'CELITIS has changed my life. I have found a community that truly cares.',
    Message_jp: 'CELITISは私の人生を変えました。本当に思いやりのあるコミュニティに出会えました。',
    Photo: { url: '/assets/galary/a6.png' },
  },
  {
    id: 2,
    Name_en: 'Hiroko Suzuki',
    Name_jp: '鈴木 弘子',
    Relation_en: 'Supporter',
    Relation_jp: 'サポーター',
    Message_en: 'I am proud to support CELITIS and its mission for inclusion.',
    Message_jp: 'CELITISとそのインクルージョンの使命を支援できることを誇りに思います。',
    Photo: { url: '/assets/galary/a7.png' },
  },
  {
    id: 3,
    Name_en: 'John Smith',
    Name_jp: 'ジョン・スミス',
    Relation_en: 'Partner',
    Relation_jp: 'パートナー',
    Message_en: 'Working with CELITIS has been inspiring and rewarding.',
    Message_jp: 'CELITISと一緒に働くことは刺激的でやりがいがあります。',
    Photo: { url: '/assets/galary/a8.png' },
  },
];

const HeroSVG = () => (
  <svg className="absolute left-0 top-0 w-full h-40 md:h-56 opacity-20 pointer-events-none select-none" viewBox="0 0 1440 320" fill="none"><path fill="url(#grad)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" /><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a5b4fc"/><stop offset="100%" stopColor="#fef9c3"/></linearGradient></defs></svg>
);

// Animated background SVG for the whole page
const AnimatedBG = () => (
  <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none animate-float-slow" style={{opacity:0.10}} viewBox="0 0 1440 900" fill="none">
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

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [locale, setLocale] = useState(i18n.language || 'en');
  const { setModalOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLangChange = (lng: string) => setLocale(lng);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  // Sync modal open state with global context
  useEffect(() => {
    setModalOpen(selected != null);
    return () => setModalOpen(false);
  }, [selected, setModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 relative overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroSVG />
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-2 drop-shadow flex items-center gap-2 animate-fade-in"><ChatBubbleLeftRightIcon className="w-8 h-8 text-amber-400" />{t('testimonials')}</h1>
        <div className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2 animate-slide-up">{t('testimonials_mission_headline')}</div>
        <p className="text-lg md:text-xl text-indigo-800 font-light mb-2 flex items-center justify-center gap-2 animate-fade-in">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('testimonials_mission_subtitle')}
        </p>
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow p-4 md:p-6 mb-4 animate-fade-in">
          <span className="block text-base md:text-lg text-gray-700 font-light text-center">{t('testimonials_mission_body')}</span>
        </div>
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{HARDCODED_TESTIMONIALS.length} {t('testimonials')}</span>
      </section>
      <main className="relative z-10 max-w-6xl mx-auto pb-16 px-2 md:px-6">
        <GridAccent />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {HARDCODED_TESTIMONIALS.map((tst, idx) => {
            const name = locale.startsWith('ja') ? tst.Name_jp : tst.Name_en;
            const relation = locale.startsWith('ja') ? tst.Relation_jp : tst.Relation_en;
            const message = locale.startsWith('ja') ? tst.Message_jp : tst.Message_en;
            return (
              <div key={tst.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" tabIndex={0} aria-label={name} style={{animationDelay: `${idx * 60}ms`}}>
                {/* Animated accent */}
                <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                {/* Floating badge */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">💬 {locale.startsWith('ja') ? '声' : 'Testimonial'}</span>
                {tst.Photo?.url ? (
                  <Image src={tst.Photo.url} alt={name} width={80} height={80} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <UserCircleIcon className="w-20 h-20 text-blue-200 mb-2" />
                )}
                <h2 className="text-lg font-extrabold mb-1 text-center text-indigo-800 group-hover:text-blue-700 transition drop-shadow-lg">{name}</h2>
                {relation && <div className="text-xs text-gray-500 mb-2 text-center">{relation}</div>}
                <div className="text-xs text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{message}</div>
                <button className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition mt-auto" onClick={e => { e.stopPropagation(); setSelected(tst); }}>
                  {t('testimonials_read_more')}
                </button>
              </div>
            );
          })}
        </div>
        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-2" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-lg md:rounded-2xl shadow-2xl w-full max-w-xs md:max-w-xl p-2 md:p-6 relative animate-fade-in max-h-[60vh] md:max-h-[70vh] flex flex-col overflow-y-auto overflow-x-hidden" onClick={e => e.stopPropagation()} ref={modalRef}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelected(null)} aria-label="Close">
                <XMarkIcon className="w-7 h-7" />
              </button>
              <div className="flex flex-col items-center">
                {selected.Photo?.url ? (
                  <Image src={selected.Photo.url} alt={locale.startsWith('ja') ? selected.Name_jp : selected.Name_en} width={96} height={96} className="w-24 h-24 object-cover rounded-full border-4 border-emerald-100 mb-2" onError={e => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <UserCircleIcon className="w-24 h-24 text-blue-200 mb-2" />
                )}
                <h2 className="text-xl font-bold mb-1 text-center text-indigo-900">{locale.startsWith('ja') ? selected.Name_jp : selected.Name_en}</h2>
                {selected.Relation_en && <div className="text-xs text-gray-500 mb-2 text-center">{locale.startsWith('ja') ? selected.Relation_jp : selected.Relation_en}</div>}
                <div className="mb-4 text-gray-700 text-sm md:text-base text-center break-words">{locale.startsWith('ja') ? selected.Message_jp : selected.Message_en}</div>
              </div>
            </div>
          </div>
        )}
        {/* Thank You Section */}
        <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
          <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
            {t('testimonials_thankyou')}
          </div>
        </section>
        {/* CTA */}
        <section className="max-w-2xl mx-auto mt-16 mb-32">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-emerald-300 via-amber-100 to-blue-200 shadow-lg animate-fade-in">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-emerald-500 animate-bounce" />
                <h3 className="text-xl md:text-2xl font-extrabold text-indigo-900 drop-shadow">{t('testimonials_cta_headline')}</h3>
              </div>
              <p className="text-indigo-800 text-center mb-2 text-base md:text-lg font-light">{t('testimonials_cta')}</p>
              <Link href="/donate" className="px-7 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-white font-bold shadow hover:scale-105 hover:from-amber-400 hover:to-emerald-500 transition-transform duration-200 text-lg">{t('contact')}</Link>
            </div>
          </div>
        </section>
        <Link href="/donate" className="fixed bottom-8 right-8 z-50 animate-bounce drop-shadow-xl">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-emerald-400 text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform duration-200 border-4 border-white/40 backdrop-blur-xl">
            <HeartIcon className="w-6 h-6" /> {t('donateButton')}
          </button>
        </Link>
      </main>
    </div>
  );
} 