"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const socialLinks = [
  { href: 'https://youtube.com/@smallstepchannel', label: 'YouTube', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.566A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { href: 'https://twitter.com/', label: 'Twitter', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.485 0-4.5 2.015-4.5 4.5 0 .353.04.697.116 1.026C7.728 9.37 4.1 7.575 1.67 4.95a4.48 4.48 0 0 0-.61 2.264c0 1.563.796 2.942 2.006 3.75a4.48 4.48 0 0 1-2.037-.563v.057c0 2.183 1.553 4.004 3.617 4.42a4.48 4.48 0 0 1-2.03.077c.573 1.788 2.236 3.09 4.205 3.125A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.94 8.94 0 0 1-2.54.698z"/></svg> },
  { href: 'https://facebook.com/', label: 'Facebook', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg> },
  { href: 'https://instagram.com/', label: 'Instagram', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-.353-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
  { href: 'https://linkedin.com/', label: 'LinkedIn', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.25 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72zm-12.25-9h-.03c-.01 0-.01 0-.01 0h.04z"/></svg> },
  { href: 'https://tiktok.com/', label: 'TikTok', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2v14.25a2.25 2.25 0 1 1-2.25-2.25h1.5a.75.75 0 0 0 0-1.5h-1.5A3.75 3.75 0 1 0 14.25 16V7.81a6.75 6.75 0 0 0 3.75 1.19V7.5a5.25 5.25 0 0 1-3.75-1.5V2h-1.5z"/></svg> },
];

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative z-10 bg-gradient-to-br from-blue-50 via-white to-amber-50 pt-14 pb-10 mt-auto border-t border-blue-100 shadow-inner animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4 sm:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <span className="bg-white rounded-full p-1 flex items-center justify-center shadow-sm">
            <Image src="assets/logo2.png" alt="CELTIS Logo" width={38} height={38} className="object-contain" />
          </span>
          <span className="text-lg font-bold text-blue-800 tracking-tight">CELTIS Inc.</span>
        </div>
        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center w-full sm:w-auto">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-4 sm:mb-0">
            {socialLinks.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-rose-600 transition group relative" aria-label={s.label}>
                {s.icon}
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 bg-amber-400 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all whitespace-nowrap z-20 shadow-lg">{s.label}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-blue-800 text-sm">
            <Link href="/about" className="hover:text-rose-600 transition">{t('footer_about')}</Link>
            <Link href="/contact" className="hover:text-rose-600 transition">{t('footer_contact')}</Link>
            <Link href="/privacy" className="hover:text-rose-600 transition">{t('footer_privacy')}</Link>
            <Link href="/testimonials" className="hover:text-rose-600 transition">{t('footer_testimonials')}</Link>
          </div>
        </div>
        {/* YouTube Subscribe CTA */}
        <a
          href="https://youtube.com/@smallstepchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/90 rounded-full px-6 py-2 shadow border border-blue-100 hover:shadow-lg transition mt-6 md:mt-0 w-full sm:w-auto font-semibold text-rose-600 hover:text-amber-500 text-base"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.566A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.566a2.994 2.994 0 0 0 2.107-2.12C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          {t('footer_youtube_subscribe')}
        </a>
      </div>
      <div className="text-center text-blue-300 text-xs mt-8">&copy; {new Date().getFullYear()} {t('footer_copyright')} <a href="https://www.upvistadigital.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600">{t('footer_made_by')}</a> <span className="mx-2">|</span> {t('footer_rights')}</div>
    </footer>
  );
} 