"use client";
import { useTranslation } from "react-i18next";
import '../../i18n';
import { ShieldCheckIcon, DocumentTextIcon, SparklesIcon } from "@heroicons/react/24/outline";

const AnimatedBG = () => (
  <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none animate-float-slow" style={{opacity:0.10}} viewBox="0 0 1440 900" fill="none">
    <circle cx="200" cy="200" r="120" fill="#a5b4fc" />
    <circle cx="1240" cy="700" r="180" fill="#fef9c3" />
    <circle cx="900" cy="200" r="90" fill="#f87171" />
    <circle cx="400" cy="800" r="100" fill="#34d399" />
  </svg>
);

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 md:px-0 overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative max-w-2xl w-full mx-auto z-10 flex flex-col items-center text-center mb-10">
        <ShieldCheckIcon className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 drop-shadow flex items-center gap-2">{t('privacy_title')}</h1>
        <p className="text-lg md:text-xl text-blue-900 font-light leading-relaxed mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('privacy_subtitle')}
        </p>
      </section>
      {/* Policy Content Section */}
      <section className="max-w-2xl w-full mx-auto bg-white/90 rounded-3xl shadow-lg p-8 mb-12 border border-blue-100 animate-fade-in text-blue-900">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2"><DocumentTextIcon className="w-7 h-7 text-blue-400 animate-bounce" />{t('privacy_policy_headline')}</h2>
        <ul className="list-disc pl-6 space-y-3 text-base">
          <li>{t('privacy_policy_1')}</li>
          <li>{t('privacy_policy_2')}</li>
          <li>{t('privacy_policy_3')}</li>
          <li>{t('privacy_policy_4')}</li>
          <li>{t('privacy_policy_5')}</li>
        </ul>
        <p className="text-xs text-gray-500 mt-4">{t('privacy_last_updated')}</p>
      </section>
      {/* Thank You Section */}
      <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
        <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
          {t('privacy_thankyou')}
        </div>
      </section>
    </main>
  );
} 