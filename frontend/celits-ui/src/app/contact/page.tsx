"use client";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n';

const socialLinks = [
  { href: 'https://youtube.com/@smallstepchannel', label: 'YouTube' },
  
  { href: 'https://twitter.com/', label: 'Twitter' },
  { href: 'https://facebook.com/', label: 'Facebook' },
  { href: 'https://instagram.com/', label: 'Instagram' },
  { href: 'https://linkedin.com/', label: 'LinkedIn' },
  { href: 'https://tiktok.com/', label: 'TikTok' },
];

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-sky-50 to-blue-100 py-10 px-4 md:px-0 overflow-x-hidden">
      <section className="relative max-w-2xl w-full mx-auto z-10 bg-white/80 rounded-2xl shadow-lg p-8 border border-blue-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6 text-center drop-shadow">{t('contact')}</h1>
        <p className="text-blue-900 text-center mb-8">{t('contact_intro')}</p>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={e => {
            e.preventDefault();
            setSubmitted(true);
            setForm({ name: '', email: '', message: '' });
          }}
        >
          <input
            type="text"
            className="rounded px-4 py-2 border border-blue-200 focus:ring-2 focus:ring-emerald-200 outline-none text-blue-900 bg-white w-full text-base md:text-lg"
            placeholder={t('contact_name')}
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            type="email"
            className="rounded px-4 py-2 border border-blue-200 focus:ring-2 focus:ring-emerald-200 outline-none text-blue-900 bg-white w-full text-base md:text-lg"
            placeholder={t('contact_email')}
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <textarea
            className="rounded px-4 py-2 border border-blue-200 focus:ring-2 focus:ring-emerald-200 outline-none text-blue-900 bg-white min-h-[120px] w-full text-base md:text-lg"
            placeholder={t('contact_message')}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            required
          />
          <button type="submit" className="px-7 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-white font-bold shadow hover:scale-105 hover:from-amber-400 hover:to-emerald-500 transition-transform duration-200 text-lg">{t('contact_send')}</button>
        </form>
        {submitted && <div className="text-emerald-700 text-center mt-4 font-semibold">{t('contact_thankyou')}</div>}
        <div className="mt-10 text-center text-blue-900 flex flex-col gap-2 sm:gap-0 sm:block">
          <div className="mb-2 font-semibold">{t('contact_company')}</div>
          <div>{t('contact_email_label')}: <a href="mailto:info@celtis.co.jp" className="text-emerald-700 underline">info@celtis.co.jp</a></div>
          <div>{t('contact_location')}</div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {socialLinks.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-rose-600 transition underline text-sm md:text-base">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 