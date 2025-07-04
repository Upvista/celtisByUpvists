'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { fetchStrapiCollection } from '../../lib/strapi';
import '../../i18n';
import { useModal } from '../ModalProvider';
import { CalendarDaysIcon, MapPinIcon, XMarkIcon, ArrowTopRightOnSquareIcon, PhotoIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Event {
  id: number;
  Title: string;
  Description?: string | { children?: { text: string }[] }[];
  Date_Time?: string;
  Location?: string;
  Galary?: { url?: string }[];
  Registration_link?: string;
}

function mapStrapiEvent(entry: Record<string, unknown>): Event {
  return {
    id: entry.id as number,
    Title: entry.Title as string,
    Description: entry.Description as string | undefined,
    Date_Time: entry.Date_Time as string | undefined,
    Location: entry.Location as string | undefined,
    Galary: Array.isArray(entry.Galary)
      ? (entry.Galary as { url?: string }[]).map((img) => ({ url: img.url }))
      : [],
    Registration_link: entry.Registration_link as string | undefined,
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

const HeroSVG = () => (
  <svg className="absolute left-0 top-0 w-full h-40 md:h-56 opacity-20 pointer-events-none select-none" viewBox="0 0 1440 320" fill="none"><path fill="url(#grad)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" /><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a5b4fc"/><stop offset="100%" stopColor="#fef9c3"/></linearGradient></defs></svg>
);

// Helper to split and sort events
function splitEvents(events: Event[]) {
  const now = new Date();
  const upcoming = events
    .filter(e => e.Date_Time && new Date(e.Date_Time) >= now)
    .sort((a, b) => new Date(a.Date_Time!).getTime() - new Date(b.Date_Time!).getTime());
  const previous = events
    .filter(e => !e.Date_Time || new Date(e.Date_Time) < now)
    .sort((a, b) => new Date(b.Date_Time!).getTime() - new Date(a.Date_Time!).getTime());
  return { upcoming, previous };
}

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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Event | null>(null);
  const locale = i18n.language || 'en';
  const { setModalOpen } = useModal();

  useEffect(() => {
    fetchStrapiCollection('events', locale)
      .then((data) => setEvents(data.map(mapStrapiEvent)))
      .finally(() => setLoading(false));
  }, [locale]);

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
        <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-xs font-semibold shadow mt-2">{events.length} {t('events')}</span>
      </section>
      <main className="relative z-10 max-w-6xl mx-auto pb-16 px-2 md:px-6">
        <GridAccent />
        {loading ? (
          <p className="text-center text-gray-400">{t('loading')}</p>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <PhotoIcon className="w-20 h-20 text-blue-200 mb-4" />
            <p className="text-center text-gray-400 text-lg">{t('events_no_upcoming')}</p>
          </div>
        ) : (
          (() => {
            const { upcoming, previous } = splitEvents(events);
            return (
              <>
                {/* Upcoming Events Section */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-2 animate-fade-in">
                    <CalendarDaysIcon className="w-6 h-6 text-amber-400" />{t('Upcoming Events')}
                  </h2>
                  {upcoming.length > 0 ? (
                    <>
                      {/* Featured Event */}
                      <div className="mb-8">
                        <div className="relative group bg-white/80 backdrop-blur-lg border-2 border-emerald-200 rounded-3xl shadow-2xl flex flex-col md:flex-row cursor-pointer hover:shadow-emerald-300 hover:scale-[1.03] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 animate-slide-up" tabIndex={0} aria-label={upcoming[0].Title} onClick={() => setSelected(upcoming[0])} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(upcoming[0]); }}>
                          {/* Animated accent */}
                          <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                          {/* Floating badge */}
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📅 {t('events')}</span>
                          {upcoming[0].Galary && upcoming[0].Galary.length > 0 && upcoming[0].Galary[0].url ? (
                            <Image src={STRAPI_URL + upcoming[0].Galary[0].url} alt={upcoming[0].Title} width={400} height={192} className="w-full md:w-96 h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
                          ) : (
                            <div className="w-full md:w-96 h-56 md:h-72 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl"><PhotoIcon className="w-16 h-16" /></div>
                          )}
                          <div className="p-6 flex-1 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-indigo-900 group-hover:text-blue-700 transition line-clamp-2">{upcoming[0].Title}</h3>
                            {upcoming[0].Date_Time && <div className="text-sm text-gray-500 mb-1 flex items-center gap-1"><CalendarDaysIcon className="w-5 h-5" />{new Date(upcoming[0].Date_Time).toLocaleString(locale)}</div>}
                            {upcoming[0].Location && <div className="text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPinIcon className="w-5 h-5" />{upcoming[0].Location}</div>}
                            <div className="text-base text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{Array.isArray(upcoming[0].Description)
                              ? upcoming[0].Description.map((d: { children?: { text: string }[] }) => Array.isArray(d.children) ? d.children.map((c: { text: string }) => c.text).join(' ') : '').join(' ')
                              : upcoming[0].Description}</div>
                            <div className="flex items-center gap-2 mt-auto">
                              <button className="inline-flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-200 transition" onClick={e => { e.stopPropagation(); setSelected(upcoming[0]); }}>
                                {t('events_learn_more')} <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                              </button>
                              {upcoming[0].Registration_link && (
                                <a href={upcoming[0].Registration_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold hover:bg-emerald-600 transition" onClick={e => e.stopPropagation()}>
                                  {t('events_register_now')}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Other Upcoming Events */}
                      {upcoming.length > 1 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                          {upcoming.slice(1).map((event, idx) => (
                            <div key={event.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-300 hover:scale-[1.04] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-300 p-8 animate-slide-up" style={{animationDelay: `${idx * 60}ms`}} tabIndex={0} aria-label={event.Title} onClick={() => setSelected(event)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(event); }}>
                              {/* Animated accent */}
                              <svg className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                              {/* Floating badge */}
                              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-amber-300 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📅 {t('events')}</span>
                              {event.Galary && event.Galary.length > 0 && event.Galary[0].url ? (
                                <Image src={STRAPI_URL + event.Galary[0].url} alt={event.Title} width={400} height={192} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
                              ) : (
                                <div className="w-full h-40 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl"><PhotoIcon className="w-12 h-12" /></div>
                              )}
                              <div className="p-5 w-full flex-1 flex flex-col">
                                <h2 className="text-lg font-bold mb-1 text-center text-indigo-800 group-hover:text-blue-700 transition line-clamp-2">{event.Title}</h2>
                                {event.Date_Time && <div className="text-xs text-gray-500 mb-1 flex items-center gap-1 justify-center"><CalendarDaysIcon className="w-4 h-4" />{new Date(event.Date_Time).toLocaleString(locale)}</div>}
                                {event.Location && <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 justify-center"><MapPinIcon className="w-4 h-4" />{event.Location}</div>}
                                <div className="text-xs text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{Array.isArray(event.Description)
                                  ? event.Description.map((d: { children?: { text: string }[] }) => Array.isArray(d.children) ? d.children.map((c: { text: string }) => c.text).join(' ') : '').join(' ')
                                  : event.Description}</div>
                                <div className="flex items-center gap-2 mt-auto">
                                  <button className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition" onClick={e => { e.stopPropagation(); setSelected(event); }}>
                                    {t('events_learn_more')} <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                  </button>
                                  {event.Registration_link && (
                                    <a href={event.Registration_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold hover:bg-emerald-600 transition" onClick={e => e.stopPropagation()}>
                                      {t('events_register_now')}
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <PhotoIcon className="w-20 h-20 text-blue-200 mb-4" />
                      <p className="text-center text-gray-400 text-lg">{t('events_no_upcoming')}</p>
                    </div>
                  )}
                </section>
                {/* Previous Events Section */}
                {previous.length > 0 && (
                  <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6 text-indigo-900 flex items-center gap-2 animate-fade-in">
                      <CalendarDaysIcon className="w-6 h-6 text-blue-300" />{t('Previous Events')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                      {previous.map((event, idx) => (
                        <div key={event.id} className="relative group bg-white/70 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:shadow-emerald-200 hover:scale-[1.03] transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-200 p-8 animate-slide-up" style={{animationDelay: `${idx * 60}ms`}} tabIndex={0} aria-label={event.Title} onClick={() => setSelected(event)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(event); }}>
                          {/* Animated accent */}
                          <svg className="absolute -top-8 -right-8 w-20 h-20 opacity-20 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="#a5b4fc" strokeWidth="8" strokeDasharray="20 10" /></svg>
                          {/* Floating badge */}
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-300 to-amber-200 text-white px-4 py-1 rounded-full shadow-lg font-bold text-xs animate-bounce z-10">📅 {t('events')}</span>
                          {event.Galary && event.Galary.length > 0 && event.Galary[0].url ? (
                            <Image src={STRAPI_URL + event.Galary[0].url} alt={event.Title} width={400} height={192} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" onError={e => (e.currentTarget.style.display = 'none')} />
                          ) : (
                            <div className="w-full h-40 flex items-center justify-center bg-blue-50 text-blue-200 text-4xl"><PhotoIcon className="w-12 h-12" /></div>
                          )}
                          <div className="p-5 w-full flex-1 flex flex-col">
                            <h2 className="text-lg font-bold mb-1 text-center text-indigo-800 group-hover:text-blue-700 transition line-clamp-2">{event.Title}</h2>
                            {event.Date_Time && <div className="text-xs text-gray-500 mb-1 flex items-center gap-1 justify-center"><CalendarDaysIcon className="w-4 h-4" />{new Date(event.Date_Time).toLocaleString(locale)}</div>}
                            {event.Location && <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 justify-center"><MapPinIcon className="w-4 h-4" />{event.Location}</div>}
                            <div className="text-xs text-gray-700 text-center whitespace-normal break-words line-clamp-3 mb-2 mt-2 animate-fade-in delay-100">{Array.isArray(event.Description)
                              ? event.Description.map((d: { children?: { text: string }[] }) => Array.isArray(d.children) ? d.children.map((c: { text: string }) => c.text).join(' ') : '').join(' ')
                              : event.Description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            );
          })()
        )}
        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm mx-2" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in flex flex-col" onClick={e => e.stopPropagation()}>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 z-10" onClick={() => setSelected(null)} aria-label="Close">
                <XMarkIcon className="w-7 h-7" />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-indigo-900 text-center">{selected.Title}</h2>
              <p className="mb-2 text-gray-700 text-center">{Array.isArray(selected.Description)
                ? selected.Description.map((d: { children?: { text: string }[] }) => Array.isArray(d.children) ? d.children.map((c: { text: string }) => c.text).join(' ') : '').join(' ')
                : selected.Description}</p>
              {selected.Date_Time && (
                <div className="text-sm text-gray-500 mb-1 text-center">{t('date')}: {new Date(selected.Date_Time).toLocaleString(locale)}</div>
              )}
              {selected.Location && (
                <div className="text-sm text-gray-500 mb-2 text-center">{t('location')}: {selected.Location}</div>
              )}
              {selected.Galary && selected.Galary.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {selected.Galary.map((img, idx) => img.url && (
                    <Image key={idx} src={STRAPI_URL + img.url} alt={`event-img-${idx}`} width={400} height={128} className="w-32 h-24 object-cover rounded" />
                  ))}
                </div>
              )}
              {selected.Registration_link && (
                <a href={selected.Registration_link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {t('register')}
                </a>
              )}
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