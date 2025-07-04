"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import '../../i18n';
import Link from "next/link";
import { HeartIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const whatWeDo = [
  {
    title: { en: "📺 Small Step TV", ja: "📺 スモールステップTV" },
    desc: {
      en: "A short-form welfare information show broadcast on J:COM Fukuoka, designed to share practical, easy-to-understand content with families and professionals.",
      ja: "J:COM福岡で放送されている短編福祉情報番組。家族や専門家に分かりやすく実用的な情報を届けます。"
    }
  },
  {
    title: { en: "📹 Small Step Channel", ja: "📹 スモールステップチャンネル" },
    desc: {
      en: "Our official YouTube channel, hosting all Small Step TV episodes and additional video content for those unable to access traditional broadcast TV.",
      ja: "全てのスモールステップTVエピソードや追加動画を配信する公式YouTubeチャンネル。テレビが見られない方にも情報を届けます。"
    }
  },
  {
    title: { en: "📰 STATICE Free Magazine", ja: "📰 STATICE 無料マガジン" },
    desc: {
      en: "A biannual print publication distributed to schools and welfare institutions, sharing real stories, facility spotlights, and educational guides in simple language.",
      ja: "年2回発行の無料冊子。学校や福祉施設に配布し、実話や施設紹介、分かりやすいガイドを掲載しています。"
    }
  },
  {
    title: { en: "🎤 Live Events & Forums", ja: "🎤 ライブイベント＆フォーラム" },
    desc: {
      en: "We host bold conversations around taboo topics like sexuality, independence, and adult care, giving voice to topics others avoid in the disability space.",
      ja: "性や自立、成人ケアなど、障害分野で語られにくいテーマにも切り込み、率直な対話の場を提供します。"
    }
  }
];

const aboutContent = {
  en: {
    title: "About CELTIS Inc.",
    intro: "CELTIS Inc. was born from a deeply personal journey — one that transformed pain into purpose, and confusion into action.",
    storyTitle: "Our Story",
    story1: "Our founder, Kanako Koga, spent over two decades in the television and video industry. Her life changed dramatically when both she and her son were diagnosed with developmental disorders. As a mother raising a child with autism in Japan, she encountered an overwhelming lack of accessible information, emotional support, and understanding from the world around her.",
    story2: "Kanako realized that while medical terms and institutional processes existed, there was a massive gap between information and understanding. Parents like her were left in the dark — anxious, isolated, and unsure where to turn. So, instead of remaining silent, she took action.",
    missionTitle: "Our Mission",
    mission1: "Founded in 2020 in Fukuoka, Japan, CELTIS Inc. exists to turn anxiety into reassurance. Our mission is to build a society where people with developmental disorders and disabilities are not pitied, but respected — seen not as burdens, but as valuable contributors.",
    mission2: "We want to eliminate the loneliness and fear that so often surrounds disability in Japan. Through powerful storytelling, accessible information, and community-based media, CELTIS creates a bridge between caregivers, educators, families, and society at large.",
    mission3: "Our guiding belief is 共存共栄 — Coexistence and Co-prosperity. We don't want to simply \"support\" people with disabilities. We want to build a world where everyone — regardless of ability — can live, work, and thrive side by side.",
    whatWeDoTitle: "What We Do",
    visionTitle: "Our Vision",
    visionList: [
      "People with disabilities are empowered taxpayers, not passive recipients of support",
      "Welfare and caregiving are seen as national strengths, not private struggles",
      "No one feels alone in raising or supporting a neurodiverse child",
      "True coexistence is achieved in workplaces, schools, and communities"
    ],
    visionText: "This isn't just about \"awareness.\" It's about systemic change — and we're building it, step by step.",
    whyTitle: "Why \"CELTIS\"?",
    why1: "Our name comes from the Japanese word \"Enoki\" (榎), a hardy tree known in English as Celtis, or hackberry. It's a tree that grows strong even in difficult environments — just like the families we serve.",
    why2: "We're here to nurture roots, offer shade, and build something lasting.",
    founderTitle: "From Our Founder",
    founderQuote: "I didn't start CELTIS because I was strong. I started it because I was scared, confused, and lost. No one was talking about what I was going through — so I decided to talk first. If this company can be a bridge between silence and support, then that's enough for me.",
    founderName: "— Kanako Koga, Founder & CEO, CELTIS Inc.",
    getInvolvedTitle: "Get Involved",
    getInvolved1: "If our story moves you, we invite you to walk with us. Become a supporter, a partner, or simply a listener. Even the smallest step can lead to something powerful.",
    getInvolved2: "Together, let's build a world where we all grow stronger — side by side."
  },
  ja: {
    title: "CELTIS株式会社について",
    intro: "CELTIS株式会社は、痛みを原動力に、混乱を行動に変えた個人的な旅から生まれました。",
    storyTitle: "私たちのストーリー",
    story1: "創業者の古賀加奈子は、20年以上テレビ・映像業界で働いてきました。自身と息子が発達障害と診断されたことで人生が一変。日本で自閉症の子どもを育てる母親として、情報や心の支え、周囲の理解の欠如に直面しました。",
    story2: "医療用語や制度はあっても、「情報」と「理解」の間には大きなギャップがありました。同じような親たちは不安と孤独の中、どこに頼ればいいか分からずにいました。古賀は沈黙せず、行動を選びました。",
    missionTitle: "私たちのミッション",
    mission1: "2020年、福岡で設立されたCELTIS株式会社は、「不安を安心に変える」ことを目指しています。発達障害や障害のある人々が哀れまれる存在ではなく、尊敬され、社会の貴重な一員として見られる社会を築くことがミッションです。",
    mission2: "日本で障害をめぐる孤独や恐怖をなくしたい。力強いストーリーテリング、分かりやすい情報、コミュニティメディアを通じて、保護者・教育者・家族・社会をつなぐ架け橋となります。",
    mission3: "私たちの信念は「共存共栄」。単なる「支援」ではなく、誰もが共に生き、働き、成長できる世界を目指します。",
    whatWeDoTitle: "私たちの活動",
    visionTitle: "ビジョン",
    visionList: [
      "障害のある人が「納税者」として自立し、支援の受け手で終わらない社会",
      "福祉や介護が「個人の苦労」ではなく「社会の強み」として認識される",
      "発達障害や多様な子どもを育てる親が孤立しない社会",
      "職場・学校・地域で「真の共生」が実現される"
    ],
    visionText: "単なる「啓発」ではなく、社会システムそのものを変える一歩一歩を積み重ねています。",
    whyTitle: "「CELTIS」の由来",
    why1: "社名は日本語の「榎（えのき）」に由来します。英語でCeltis（ハックベリー）と呼ばれるこの木は、厳しい環境でも力強く育つ家族の象徴です。",
    why2: "私たちは根を張り、木陰を作り、永く続くものを育てていきます。",
    founderTitle: "創業者のメッセージ",
    founderQuote: "私がCELTISを始めたのは、強かったからではありません。不安で、混乱し、迷っていたからです。誰も語らないなら、私が最初に語ろうと思いました。この会社が沈黙と支援の橋渡しになれたら、それだけで十分です。",
    founderName: "— 古賀加奈子（創業者・代表取締役）",
    getInvolvedTitle: "参加しませんか",
    getInvolved1: "私たちの想いに共感してくださる方、一緒に歩んでみませんか。サポーター、パートナー、リスナーとして、どんな小さな一歩も大きな力になります。",
    getInvolved2: "共に、より強く成長できる社会を築きましょう。"
  }
};

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

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const [showWhatWeDo, setShowWhatWeDo] = useState(true);
  const lang = i18n.language === 'ja' ? 'ja' : 'en';
  const content = aboutContent[lang];
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 md:px-0 overflow-x-hidden">
      <AnimatedBG />
      {/* Hero Section */}
      <section className="relative max-w-3xl w-full mx-auto z-10 flex flex-col items-center text-center mb-10">
        <UserGroupIcon className="w-16 h-16 text-amber-400 mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 drop-shadow flex items-center gap-2">{content.title}</h1>
        <p className="text-lg md:text-xl text-blue-900 font-light leading-relaxed mb-2 flex items-center justify-center gap-2">
          <SparklesIcon className="w-6 h-6 text-amber-400 inline-block animate-pulse" />
          {content.intro}
        </p>
      </section>
      <section className="relative max-w-3xl w-full mx-auto z-10">
        <GridAccent />
        {/* Founder Story */}
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12 animate-fade-in">
          <Image src="/assets/ceo.jpeg" alt="CEO" width={128} height={128} className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">{content.storyTitle}</h2>
            <p className="text-blue-900 mb-2">{content.story1}</p>
            <p className="text-blue-900">{content.story2}</p>
          </div>
        </div>
        {/* Mission Section */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">{content.missionTitle}</h2>
          <p className="text-blue-900 mb-2">{content.mission1}</p>
          <p className="text-blue-900 mb-2">{content.mission2}</p>
          <p className="text-blue-900">{content.mission3}</p>
        </section>
        {/* What We Do Section */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2 flex items-center gap-2">
            {content.whatWeDoTitle}
            <button
              className="md:hidden ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 hover:bg-blue-200 transition"
              onClick={() => setShowWhatWeDo((v) => !v)}
              aria-expanded={showWhatWeDo}
              aria-controls="whatwedo-content"
            >
              {showWhatWeDo ? (lang === 'ja' ? '閉じる' : 'Hide') : (lang === 'ja' ? '表示' : 'Show')}
            </button>
          </h2>
          <div id="whatwedo-content" className={`${showWhatWeDo ? "block" : "hidden md:block"} transition-all duration-300`}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {whatWeDo.map((item) => (
                <li key={item.title.en} className="bg-white/80 rounded-2xl shadow p-5 border-l-4 border-emerald-200 flex flex-col gap-2 animate-fade-in">
                  <span className="text-lg font-semibold text-blue-800">{item.title[lang]}</span>
                  <span className="text-blue-900 text-base">{item.desc[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* Vision Section */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">{content.visionTitle}</h2>
          <ul className="list-disc pl-6 text-blue-900 mb-2">
            {content.visionList.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
          <p className="text-blue-900">{content.visionText}</p>
        </section>
        {/* Why CELTIS Section */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">{content.whyTitle}</h2>
          <p className="text-blue-900 mb-2">{content.why1}</p>
          <p className="text-blue-900">{content.why2}</p>
        </section>
        {/* Founder Message Section */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">{content.founderTitle}</h2>
          <blockquote className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 border-l-4 border-emerald-400 rounded-2xl shadow p-6 my-4 animate-fade-in flex flex-col gap-4">
            <span className="text-4xl text-emerald-300 mb-2">“</span>
            <p className="text-lg md:text-2xl text-emerald-700 font-medium leading-relaxed whitespace-pre-line">{content.founderQuote}</p>
            <span className="block text-right text-blue-800 font-semibold mt-2">{content.founderName}</span>
          </blockquote>
        </section>
        {/* Join Us / Thank You Section */}
        <section className="max-w-2xl mx-auto mt-12 mb-4 text-center animate-fade-in">
          <div className="text-lg md:text-xl text-emerald-700 font-semibold bg-white/70 rounded-2xl p-4 shadow inline-block animate-fade-in">
            {content.getInvolvedTitle}
          </div>
          <p className="text-blue-900 mb-2 mt-4">{content.getInvolved1}</p>
          <p className="text-blue-900 font-semibold">{content.getInvolved2}</p>
        </section>
        {/* Floating animated CTA button */}
        <Link href="/donate" className="fixed bottom-8 right-8 z-50 animate-bounce drop-shadow-xl">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-emerald-400 text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform duration-200 border-4 border-white/40 backdrop-blur-xl">
            <HeartIcon className="w-6 h-6" /> {t('donateButton')}
          </button>
        </Link>
      </section>
    </main>
  );
} 