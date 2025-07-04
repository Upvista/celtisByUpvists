'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import '../../i18n';
import { CalendarDaysIcon, MapPinIcon, XMarkIcon, PhotoIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Event {
  id: number;
  Title_en: string;
  Title_jp: string;
  Description_en: string;
  Description_jp: string;
  Date_Time: string;
  Location_en: string;
  Location_jp: string;
  Galary?: { url?: string }[];
  Registration_link?: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    Title_en: 'CELITIS Spring Meetup',
    Title_jp: 'CELITIS春のミートアップ',
    Description_en: 'Join us for our annual spring meetup to connect and learn.',
    Description_jp: '毎年恒例の春のミートアップで交流と学びを深めましょう。',
    Date_Time: '2024-05-20T18:00:00',
    Location_en: 'Tokyo International Forum',
    Location_jp: '東京国際フォーラム',
    Galary: [{ url: '/assets/galary/a1.png' }],
    Registration_link: 'https://example.com/register-spring',
  },
  {
    id: 2,
    Title_en: 'Tech for Good Workshop',
    Title_jp: '善のためのテクノロジーワークショップ',
    Description_en: 'A workshop on using technology for social impact.',
    Description_jp: '社会的インパクトのためのテクノロジー活用ワークショップ。',
    Date_Time: '2024-06-10T14:00:00',
    Location_en: 'Osaka Innovation Hub',
    Location_jp: '大阪イノベーションハブ',
    Galary: [{ url: '/assets/galary/a2.png' }],
    Registration_link: 'https://example.com/register-tech',
  },
];

const PREVIOUS_EVENTS: Event[] = [
  {
    id: 3,
    Title_en: 'Winter Networking Night',
    Title_jp: '冬のネットワーキングナイト',
    Description_en: 'A cozy evening of networking and sharing ideas.',
    Description_jp: 'アイデアを共有する温かいネットワーキングの夜。',
    Date_Time: '2023-12-15T19:00:00',
    Location_en: 'Nagoya Civic Hall',
    Location_jp: '名古屋市民会館',
    Galary: [{ url: '/assets/galary/a3.png' }],
  },
  {
    id: 4,
    Title_en: 'CELITIS Summer Festival',
    Title_jp: 'CELITIS夏祭り',
    Description_en: 'Celebrating community and culture at our summer festival.',
    Description_jp: 'コミュニティと文化を祝う夏祭り。',
    Date_Time: '2023-08-05T16:00:00',
    Location_en: 'Fukuoka Event Plaza',
    Location_jp: '福岡イベントプラザ',
    Galary: [{ url: '/assets/galary/a4.png' }],
  },
  {
    id: 5,
    Title_en: 'Online Q&A Session',
    Title_jp: 'オンラインQ&Aセッション',
    Description_en: 'An online session to answer your questions about CELITIS.',
    Description_jp: 'CELITISについての質問にお答えするオンラインセッション。',
    Date_Time: '2023-10-01T20:00:00',
    Location_en: 'Online',
    Location_jp: 'オンライン',
    Galary: [{ url: '/assets/galary/a5.png' }],
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

export default function Events() {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<Event | null>(null);
  const [locale, setLocale] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleLangChange = (lng: string) => setLocale(lng);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 relative overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroSVG />
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-2 drop-shadow flex items-center gap-2 animate-fade-in">
          <CalendarDaysIcon className="w-8 h-8 text-amber-400" />{t('events')}
        </h1>
        <div className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2 animate-slide-up">{t('events_mission_headline')}</div>
        <p className="text-lg md:text-xl text-indigo-800 font-light mb-2 flex items-center justify-center gap-2 animate-fade-in">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('events_mission_subtitle')}
        </p>
        <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow p-4 md:p-6 mb-4 animate-fade-in">
          <span className="block text-base md:text-lg text-gray-700 font-light text-center">{t('events_mission_body')}</span>
        </div>
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{UPCOMING_EVENTS.length + PREVIOUS_EVENTS.length} {locale.startsWith('ja') ? 'イベント' : 'Events'}</span>
      </section>
      <main className="relative z-10 max-w-6xl mx-auto pb-16 px-2 md:px-6">
        <GridAccent />
        {/* Upcoming Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-2 animate-fade-in">
            <CalendarDaysIcon className="w-6 h-6 text-amber-400" />{locale.startsWith('ja') ? '今後のイベント' : 'Upcoming Events'}
          </h2>
          {UPCOMING_EVENTS.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in">
              {UPCOMING_EVENTS.map((event) => {
                const title = locale.startsWith('ja') ? event.Title_jp : event.Title_en;
                const description = locale.startsWith('ja') ? event.Description_jp : event.Description_en;
                const location = locale.startsWith('ja') ? event.Location_jp : event.Location_en;
                return (
                  <div key={event.id} className="relative group bg-white/80 backdrop-blur-lg border-2 border-emerald-200 rounded-3xl shadow-2xl flex flex-col cursor-pointer hover:shadow-emerald-300 hover:scale-[1.03] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 animate-slide-up" tabIndex={0} aria-label={title} onClick={() => setSelected(event)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(event); }}>
                    {/* Animated accent */}
                    <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                    {/* Floating badge */}
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📅 {locale.startsWith('ja') ? 'イベント' : 'Event'}</span>
                    {event.Galary && event.Galary.length > 0 && event.Galary[0].url ? (
                      <Image src={event.Galary[0].url} alt={title} width={400} height={192} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-full h-56 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl"><PhotoIcon className="w-16 h-16" /></div>
                    )}
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-indigo-900 group-hover:text-blue-700 transition line-clamp-2">{title}</h3>
                      <div className="text-sm text-gray-500 mb-1 flex items-center gap-1"><CalendarDaysIcon className="w-5 h-5" />{new Date(event.Date_Time).toLocaleString(locale)}</div>
                      <div className="text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPinIcon className="w-5 h-5" />{location}</div>
                      <div className="text-base text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{description}</div>
                      <div className="flex items-center gap-2 mt-auto">
                        {event.Registration_link && (
                          <a href={event.Registration_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold hover:bg-emerald-600 transition">
                            {locale.startsWith('ja') ? '申し込む' : 'Register'}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <PhotoIcon className="w-20 h-20 text-blue-200 mb-4" />
              <p className="text-center text-gray-400 text-lg">{locale.startsWith('ja') ? '今後のイベントはありません' : 'No upcoming events'}</p>
            </div>
          )}
        </section>
        {/* Previous Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-2 animate-fade-in">
            <CalendarDaysIcon className="w-6 h-6 text-amber-400" />{locale.startsWith('ja') ? '過去のイベント' : 'Previous Events'}
          </h2>
          {PREVIOUS_EVENTS.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in">
              {PREVIOUS_EVENTS.map((event) => {
                const title = locale.startsWith('ja') ? event.Title_jp : event.Title_en;
                const description = locale.startsWith('ja') ? event.Description_jp : event.Description_en;
                const location = locale.startsWith('ja') ? event.Location_jp : event.Location_en;
                return (
                  <div key={event.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" tabIndex={0} aria-label={title} onClick={() => setSelected(event)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(event); }}>
                    {/* Animated accent */}
                    <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                    {/* Floating badge */}
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📅 {locale.startsWith('ja') ? 'イベント' : 'Event'}</span>
                    {event.Galary && event.Galary.length > 0 && event.Galary[0].url ? (
                      <Image src={event.Galary[0].url} alt={title} width={400} height={192} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl"><PhotoIcon className="w-12 h-12" /></div>
                    )}
                    <div className="p-5 w-full flex-1 flex flex-col">
                      <h2 className="text-lg font-bold mb-1 text-center text-indigo-800 group-hover:text-blue-700 transition line-clamp-2">{title}</h2>
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1 justify-center"><CalendarDaysIcon className="w-4 h-4" />{new Date(event.Date_Time).toLocaleString(locale)}</div>
                      <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 justify-center"><MapPinIcon className="w-4 h-4" />{location}</div>
                      <div className="text-xs text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <PhotoIcon className="w-20 h-20 text-blue-200 mb-4" />
              <p className="text-center text-gray-400 text-lg">{locale.startsWith('ja') ? '過去のイベントはありません' : 'No previous events'}</p>
            </div>
          )}
        </section>
        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-2" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-0 relative animate-fade-in max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelected(null)} aria-label="Close">
                <XMarkIcon className="w-7 h-7" />
              </button>
              <div className="overflow-y-auto p-6 flex-1">
                <h2 className="text-2xl font-bold mb-2 text-indigo-900 text-center">{locale.startsWith('ja') ? selected.Title_jp : selected.Title_en}</h2>
                {selected.Galary && selected.Galary.length > 0 && selected.Galary[0].url && (
                  <div className="w-full flex justify-center mb-4">
                    <Image
                      src={selected.Galary[0].url}
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
                <div className="text-xs text-gray-500 mb-2 text-center">
                  <CalendarDaysIcon className="w-4 h-4 inline-block mr-1" />{new Date(selected.Date_Time).toLocaleString(locale)}
                </div>
                <div className="text-xs text-gray-500 mb-2 text-center">
                  <MapPinIcon className="w-4 h-4 inline-block mr-1" />{locale.startsWith('ja') ? selected.Location_jp : selected.Location_en}
                </div>
                {selected.Registration_link && (
                  <div className="flex gap-3 mt-4 flex-wrap justify-center">
                    <a
                      href={selected.Registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 shadow text-base font-semibold"
                    >
                      {locale.startsWith('ja') ? '申し込む' : 'Register'}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Thank You Section */}
        <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
          <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
            {t('events_thankyou')}
          </div>
        </section>
        {/* CTA */}
        <section className="max-w-2xl mx-auto mt-16 mb-32">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-emerald-300 via-amber-100 to-blue-200 shadow-lg animate-fade-in">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDaysIcon className="w-7 h-7 text-emerald-500 animate-bounce" />
                <h3 className="text-xl md:text-2xl font-extrabold text-indigo-900 drop-shadow">{t('events_cta_headline')}</h3>
              </div>
              <p className="text-indigo-800 text-center mb-2 text-base md:text-lg font-light">{t('events_cta')}</p>
              <Link href="/donate" className="px-7 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-white font-bold shadow hover:scale-105 hover:from-amber-400 hover:to-emerald-500 transition-transform duration-200 text-lg">{t('donateButton')}</Link>
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