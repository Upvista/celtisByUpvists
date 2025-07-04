"use client";
import { useTranslation } from "react-i18next";
import { HeartIcon, GlobeAltIcon, SparklesIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import '../../i18n';

const AnimatedBG = () => (
  <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none animate-float-slow" style={{opacity:0.12}} viewBox="0 0 1440 900" fill="none">
    <circle cx="200" cy="200" r="120" fill="#a5b4fc" />
    <circle cx="1240" cy="700" r="180" fill="#fef9c3" />
    <circle cx="900" cy="200" r="90" fill="#f87171" />
    <circle cx="400" cy="800" r="100" fill="#34d399" />
  </svg>
);

const bankDetails = [
  { labelKey: "bankName", value: "Fukuoka Bank (福岡銀行)" },
  { labelKey: "bankBranch", value: "Tenjin Branch (天神支店)" },
  { labelKey: "bankAccountType", value: "Ordinary (普通)" },
  { labelKey: "bankAccountNumber", value: "1234567" },
  { labelKey: "bankAccountName", value: "CELTIS株式会社 (CELTIS Inc.)" },
];

const socialLinks = [
  { href: "https://youtube.com/@smallstepchannel", label: "YouTube", icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.566A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { href: "https://twitter.com/celtis_inc", label: "Twitter", icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .387.045.763.127 1.124C7.728 8.816 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg> },
  { href: "https://facebook.com/celtis.inc", label: "Facebook", icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg> },
];

export default function DonatePage() {
  const { t } = useTranslation();
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 md:px-0 overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative max-w-2xl w-full mx-auto z-10 flex flex-col items-center text-center mb-10">
        <HeartIcon className="w-16 h-16 text-rose-400 mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-rose-600 mb-2 drop-shadow flex items-center gap-2">{t('donateButton')}</h1>
        <p className="text-lg md:text-xl text-blue-900 font-light leading-relaxed mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {t('supporters_cta')}
        </p>
      </section>
      {/* Bank Details Section */}
      <section className="max-w-xl w-full mx-auto bg-white/90 rounded-3xl shadow-lg p-8 mb-12 border border-rose-100 animate-fade-in">
        <h2 className="text-2xl font-bold text-rose-500 mb-4 flex items-center gap-2"><HeartIcon className="w-7 h-7 text-rose-400 animate-bounce" />{t('bankTransferTitle')}</h2>
        <ul className="divide-y divide-rose-100">
          {bankDetails.map((item) => (
            <li key={item.labelKey} className="flex justify-between py-2 text-blue-900 text-base">
              <span className="font-semibold">{t(item.labelKey)}:</span>
              <span className="ml-4">{item.value}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4">{t('bankTransferNote')}</p>
      </section>
      {/* Social/YouTube Support Section */}
      <section className="max-w-2xl w-full mx-auto mb-16 animate-fade-in">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2"><GlobeAltIcon className="w-7 h-7 text-emerald-400 animate-pulse" />Support Us Online</h2>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 px-6 py-4 bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 rounded-2xl shadow hover:scale-105 hover:shadow-lg transition-all duration-300 border border-blue-100 animate-fade-in">
              {link.icon}
              <span className="font-bold text-blue-800 text-base">{link.label}</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-emerald-400" />
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-6">{t('supporters_youtube_subtitle')}</p>
      </section>
      {/* Thank You Section */}
      <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
        <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
          {t('supporters_grid_thankyou')}
        </div>
      </section>
    </main>
  );
} 