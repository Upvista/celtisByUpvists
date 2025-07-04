"use client";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useModal } from '../ModalProvider';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/watch', label: 'episodes' },
  { href: '/articles', label: 'articles' },
  { href: '/events', label: 'events' },
  { href: '/art', label: 'art' },
  { href: '/supporters', label: 'supporters' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { modalOpen } = useModal();

  // Hide mobile menu if modal is open
  if (modalOpen && menuOpen) setMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-50 via-white to-emerald-50 backdrop-blur shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="bg-white rounded-full p-1 flex items-center justify-center shadow-sm">
            <Image src="assets/logo2.png" alt="CELTIS Logo" width={44} height={44} className="object-contain" priority />
          </span>
          <span className="text-2xl font-extrabold text-blue-800 tracking-tight drop-shadow group-hover:text-emerald-600 transition">CELTIS</span>
        </Link>
        {/* Desktop Nav + Language Toggle */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 relative">
          <nav className="flex gap-6 items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`relative text-lg font-medium transition group px-2 py-1 ${isActive ? 'text-rose-600' : 'text-blue-800 hover:text-rose-600'}`}>
                  <span className="relative z-10 group-hover:opacity-90 group-hover:scale-105 transition-transform duration-200">{t(item.label)}</span>
                  <span className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-80'}`}></span>
                </Link>
              );
            })}
          </nav>
          {/* Desktop Language Toggle (right-aligned) */}
          <div className="absolute right-0">
            <button
              className={`relative w-24 h-9 rounded-full flex items-center bg-gradient-to-r from-blue-100 via-white to-emerald-100 border-2 border-blue-200 shadow-inner transition focus:outline-none focus:ring-2 focus:ring-emerald-200`}
              aria-label="Toggle language"
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en')}
            >
              <span
                className={`absolute top-1 left-1 w-10 h-7 rounded-full bg-white shadow transition-transform duration-300 ease-in-out ${i18n.language === 'ja' ? 'translate-x-12' : 'translate-x-0'}`}
              ></span>
              <span className={`z-10 flex-1 text-center font-semibold text-xs transition-colors duration-200 ${i18n.language === 'en' ? 'text-emerald-600' : 'text-blue-400'}`}>EN</span>
              <span className={`z-10 flex-1 text-center font-semibold text-xs transition-colors duration-200 ${i18n.language === 'ja' ? 'text-emerald-600' : 'text-blue-400'}`}>日本語</span>
            </button>
          </div>
        </div>
        {/* Mobile: Language Toggle left of burger */}
        <div className="flex md:hidden items-center gap-2">
          <div className="mr-2">
            <button
              className={`relative w-24 h-9 rounded-full flex items-center bg-gradient-to-r from-blue-100 via-white to-emerald-100 border-2 border-blue-200 shadow-inner transition focus:outline-none focus:ring-2 focus:ring-emerald-200`}
              aria-label="Toggle language"
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en')}
            >
              <span
                className={`absolute top-1 left-1 w-10 h-7 rounded-full bg-white shadow transition-transform duration-300 ease-in-out ${i18n.language === 'ja' ? 'translate-x-12' : 'translate-x-0'}`}
              ></span>
              <span className={`z-10 flex-1 text-center font-semibold text-xs transition-colors duration-200 ${i18n.language === 'en' ? 'text-emerald-600' : 'text-blue-400'}`}>EN</span>
              <span className={`z-10 flex-1 text-center font-semibold text-xs transition-colors duration-200 ${i18n.language === 'ja' ? 'text-emerald-600' : 'text-blue-400'}`}>日本語</span>
            </button>
          </div>
          {/* Burger Menu Button (Mobile) */}
          <button
            className="ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <XMarkIcon className="w-7 h-7 text-blue-800" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-blue-800" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay and Drawer: Hide if modalOpen */}
      {!modalOpen && menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 opacity-100 pointer-events-auto"
            aria-hidden={false}
            onClick={() => setMenuOpen(false)}
          />
          <nav
            className="fixed top-0 right-0 z-[100] w-screen h-screen bg-white shadow-2xl border-l border-blue-100 md:hidden flex flex-col pt-8 px-6 gap-4"
            aria-label="Mobile menu"
          >
            <button
              className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <XMarkIcon className="w-7 h-7 text-blue-800" />
            </button>
            <div className="flex flex-col gap-4 mt-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-semibold py-2 px-2 rounded transition ${isActive ? 'text-rose-600' : 'text-blue-800 hover:text-rose-600'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(item.label)}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}