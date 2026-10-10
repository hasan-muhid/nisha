import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import letterImg from '../assets/images/romantic_letter_roses_1791642786689.jpg';

interface SplashSectionProps {
  onOpen: () => void;
}

export const SplashSection: React.FC<SplashSectionProps> = ({ onOpen }) => {
  const handleOpen = () => {
    romanticAudio.playHeartPop();
    // Start the rich romantic piano piece immediately
    if (!romanticAudio.getMusicState()) {
      romanticAudio.startMusic();
    }
    onOpen();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[78vh] px-3 sm:px-4 py-6 text-center">
      {/* Luxury Romantic Love Letter Still Life */}
      <div className="relative mb-6 w-full max-w-[280px] sm:max-w-xs mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-300/50 border-2 border-white/90 aspect-square group">
          <img
            src={letterImg}
            alt="Handwritten love letter with wax seal and pink roses for Nusrat"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent pointer-events-none" />

          {/* Golden Letter Tag */}
          <div className="absolute bottom-3 left-3 right-3 glass-panel-deep rounded-2xl py-2 px-3 text-center border border-white/80 shadow-md">
            <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-rose-800 uppercase font-sans">
              Dedicated to my dearest Nisha 🌹
            </p>
          </div>
        </div>

        {/* Ambient candle flame accent */}
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-rose-500 gentle-sway">
          <Heart className="w-5 h-5 fill-rose-500" />
        </div>
      </div>

      {/* Glassmorphism Romantic Invitation Card */}
      <div className="w-full glass-panel-deep rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-6 border border-white/90">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-medium mb-3">
          <Feather className="w-3.5 h-3.5 text-rose-600" />
          <span>A Love Letter From My Soul</span>
        </div>

        {/* Romantic Calligraphic Greeting */}
        <h2 className="text-3xl sm:text-4xl text-rose-600 font-cursive mb-1">
          Hey Sona...
        </h2>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 font-serif leading-snug mb-3">
          O Nusrat, My Baby... <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">
            I built a secret world just for you.
          </span>
        </h1>

        {/* Literary Poetic Dedication */}
        <div className="py-2 px-3 rounded-2xl bg-rose-50/70 border border-rose-100/80 mb-5 text-left sm:text-center">
          <p className="font-poetry text-base sm:text-lg italic text-slate-700 leading-relaxed">
            &ldquo;In all the universe, there is no heart for me like yours. Whatever our souls are made of, my Jan, yours and mine are woven from the very same starlight.&rdquo;
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-sans">
          You are the quiet peace in my chaos, my greatest gift, and my forever home. Walk with me through these pages, my <span className="font-semibold text-rose-600">Sona</span>...
        </p>

        {/* Glowing "Open My Heart" Button */}
        <button
          onClick={handleOpen}
          type="button"
          className="pulse-glow w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-base sm:text-lg shadow-lg shadow-rose-500/35 flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Heart className="w-5 h-5 fill-white animate-pulse" />
          <span>Open My Heart 💖</span>
          <Sparkles className="w-4 h-4 ml-1 opacity-90 text-amber-200" />
        </button>
      </div>

      {/* Gentle music hint */}
      <p className="text-xs text-rose-500/90 font-poetry italic text-sm tracking-wide">
        ♪ Romantic piano melody will play softly for you...
      </p>
    </div>
  );
};
