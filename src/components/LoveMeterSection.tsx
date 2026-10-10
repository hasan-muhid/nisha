import React, { useState } from 'react';
import { Heart, Sparkles, Flame, ArrowRight, Zap, Feather } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface LoveMeterSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export const LoveMeterSection: React.FC<LoveMeterSectionProps> = ({ onNext, onBack }) => {
  const [loveScore, setLoveScore] = useState(1000);
  const [boostCount, setBoostCount] = useState(0);
  const [bursting, setBursting] = useState(false);

  const boostLove = () => {
    romanticAudio.playHeartPop();
    setBursting(true);
    setBoostCount((prev) => prev + 1);
    setLoveScore((prev) => prev + 500);

    setTimeout(() => {
      setBursting(false);
    }, 400);
  };

  const getDynamicMessage = () => {
    if (loveScore < 1500) {
      return {
        author: 'Shakespeare',
        tag: 'Everlasting Devotion',
        text: 'Doubt that the stars are fire, doubt that the sun doth move, but never doubt my love for you, my Nusrat.',
      };
    } else if (loveScore < 3000) {
      return {
        author: 'Alfred Lord Tennyson',
        tag: 'Endless Thoughts',
        text: 'If I had a single flower for every moment I think of you, my baby, I could walk through my garden forever.',
      };
    } else if (loveScore < 5000) {
      return {
        author: 'Pablo Neruda',
        tag: 'Eternal Flame',
        text: 'I love you without knowing how, or when, or from where. I love you directly without problems or pride, my Jan.',
      };
    } else {
      return {
        author: 'From My Very Soul',
        tag: 'Beyond All Galaxies',
        text: 'Human numbers fail here, Sona. My entire existence, breath, and heartbeat belong completely to you.',
      };
    }
  };

  const dynamicInfo = getDynamicMessage();

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-4 py-5 animate-fade-in flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium mb-2 font-sans">
          <Feather className="w-3.5 h-3.5 text-pink-500" />
          <span>The Measure of My Heart</span>
        </div>
        <h2 className="text-3xl sm:text-4xl text-rose-600 font-cursive mb-1">
          Our Infinite Bond
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif mb-2">
          How Deeply I Adore You, Sona
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-sans">
          There is no scale in this world large enough to hold my devotion to you, my <span className="font-semibold text-rose-600">Jan</span>.
        </p>
      </div>

      {/* Love Meter Card */}
      <div className="w-full glass-panel-deep rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-6 border border-white/90">
        {/* Metric Display */}
        <div className="flex flex-col items-center justify-center mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-rose-600 font-sans mb-1">
            Our Soul Connection
          </span>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 tracking-tight tabular-nums font-serif">
              {loveScore.toLocaleString()}%
            </span>
          </div>

          <span className="text-xs font-semibold text-rose-500 mt-1 flex items-center gap-1 font-sans">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            (Infinite &amp; Everlasting Love)
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="relative w-full h-6 rounded-full bg-rose-100 p-1 shadow-inner overflow-hidden mb-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-md relative transition-all duration-300"
            style={{ width: '100%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center text-xs text-rose-600">
            💖
          </div>
        </div>

        {/* Dynamic literary quote card */}
        <div className="glass-panel rounded-2xl p-4 border border-rose-100 text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px] font-semibold tracking-wide uppercase text-rose-700 font-sans">
              {dynamicInfo.tag} • {dynamicInfo.author}
            </span>
          </div>
          <p className="font-poetry text-base sm:text-lg italic text-slate-700 leading-relaxed">
            &ldquo;{dynamicInfo.text}&rdquo;
          </p>
        </div>

        {/* Tap to Boost Button */}
        <button
          onClick={boostLove}
          type="button"
          className={`w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans ${
            bursting ? 'scale-105' : ''
          }`}
        >
          <Heart className={`w-5 h-5 fill-white ${bursting ? 'animate-ping' : ''}`} />
          <span>Shower Your Touch On My Heart! 💗</span>
          <Zap className="w-4 h-4 text-amber-300" />
        </button>

        {boostCount > 0 && (
          <p className="text-[11px] text-center text-rose-500 mt-2 font-medium font-sans">
            Sona filled my heart {boostCount} {boostCount === 1 ? 'time' : 'times'}! ✨
          </p>
        )}
      </div>

      {/* Romantic micro-vows */}
      <div className="w-full grid grid-cols-3 gap-2.5 mb-7 text-center">
        <div className="glass-panel rounded-2xl p-3 border border-white/80">
          <span className="block text-base font-bold text-slate-800 font-serif">100%</span>
          <span className="text-[11px] text-slate-500 font-sans">True Devotion</span>
        </div>
        <div className="glass-panel rounded-2xl p-3 border border-white/80">
          <span className="block text-base font-bold text-slate-800 font-serif">∞</span>
          <span className="text-[11px] text-slate-500 font-sans">Endless Smiles</span>
        </div>
        <div className="glass-panel rounded-2xl p-3 border border-white/80">
          <span className="block text-base font-bold text-slate-800 font-serif">Always</span>
          <span className="text-[11px] text-slate-500 font-sans">Yours, Nusrat</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onBack}
          type="button"
          className="w-full sm:w-auto px-5 py-3 rounded-2xl glass-panel text-slate-600 font-medium text-xs sm:text-sm hover:text-slate-800 active:scale-95 transition-all text-center cursor-pointer font-sans"
        >
          ← Back to Letters
        </button>

        <button
          onClick={() => {
            romanticAudio.playHeartPop();
            onNext();
          }}
          type="button"
          className="pulse-glow w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all cursor-pointer font-sans"
        >
          <span>I Have One Question For You, Jan... 💍</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
