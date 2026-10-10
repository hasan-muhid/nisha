import React, { useState, useRef, useCallback } from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import coupleImg from '../assets/images/romantic_couple_dusk_1791642773029.jpg';

interface ProposalSectionProps {
  onAccept: () => void;
  onBack: () => void;
}

const EVASIVE_QUOTES = [
  "Nice try baby! That button isn't allowed to exist! 😜",
  "Oops! Did it slip away, my Nusrat? Look at the glowing YES! 💕",
  "No way, Jan! My heart won't let you choose anything else! 🙈",
  "You can't escape my love that easily, my sweet Sona! 🥰",
  "Look how huge the YES button is getting! It wants you to press it! ✨",
  "There is only one true destiny for us, my baby! 💖",
  "Surrender, my Nusrat! You are stuck with me forever! ❤️",
];

export const ProposalSection: React.FC<ProposalSectionProps> = ({ onAccept, onBack }) => {
  const [evasionCount, setEvasionCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentQuote, setCurrentQuote] = useState<string | null>(null);
  const [funnyModalOpen, setFunnyModalOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Calculate jump position away from finger/mouse
  const dodgeNoButton = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    romanticAudio.playHeartPop();

    setEvasionCount((prev) => {
      const nextCount = prev + 1;
      const quoteIndex = (nextCount - 1) % EVASIVE_QUOTES.length;
      setCurrentQuote(EVASIVE_QUOTES[quoteIndex]);
      return nextCount;
    });

    const area = areaRef.current;
    if (area) {
      const areaRect = area.getBoundingClientRect();
      const buttonWidth = 100;

      const maxX = (areaRect.width / 2) - (buttonWidth / 2) - 16;
      const maxY = 65;

      let randomX = (Math.random() * 2 - 1) * maxX;
      let randomY = (Math.random() * 2 - 1) * maxY;

      if (Math.abs(randomX - noPosition.x) < 55) {
        randomX = randomX > 0 ? randomX - 85 : randomX + 85;
      }

      setNoPosition({ x: randomX, y: randomY });
    } else {
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 110;
      setNoPosition({ x: randomX, y: randomY });
    }
  }, [noPosition.x]);

  const yesScale = Math.min(1 + evasionCount * 0.18, 2.15);

  const handleYesClick = () => {
    romanticAudio.playCelebrationChimes();
    onAccept();
  };

  const handleNoClickFallback = () => {
    setFunnyModalOpen(true);
    setTimeout(() => {
      setFunnyModalOpen(false);
      handleYesClick();
    }, 2200);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-4 py-5 animate-fade-in flex flex-col items-center">
      {/* Fine Art Masterpiece of Couple Under Lanterns */}
      <div className="relative mb-5 w-full max-w-sm mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-300/50 border-2 border-white/95 aspect-[4/3] group">
          <img
            src={coupleImg}
            alt="Muhid and Nusrat embraced under wisteria lanterns at dusk"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 text-white text-center">
            <p className="font-poetry text-base sm:text-lg italic drop-shadow-md text-rose-100">
              &ldquo;Under starlight and lanterns, my soul chose you.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Main Proposal Card */}
      <div className="w-full glass-panel-deep rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-6 text-center border border-white/95">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-2 font-sans">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>My Whole Heart Laid Bare</span>
        </div>

        {/* Romantic Calligraphic Heading */}
        <h3 className="text-3xl sm:text-4xl text-rose-600 font-cursive mb-1">
          O Nusrat, My Baby...
        </h3>

        {/* Heading from user request */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif leading-tight mb-3">
          Will you go on a romantic date with me, my <span className="text-rose-600">Jan</span>? 🥰
        </h2>

        {/* First-person romantic prose */}
        <p className="font-poetry text-base sm:text-lg italic text-slate-700 mb-5 max-w-md mx-auto leading-relaxed">
          &ldquo;Let me hold your hands in mine, look into your eyes, and remind you why you are the sweetest blessing my life has ever known, my Sona.&rdquo;
        </p>

        {/* Evasive reaction quote toast */}
        {currentQuote && (
          <div className="mb-5 p-3 rounded-2xl bg-amber-50/95 border border-amber-200 text-amber-800 text-xs sm:text-sm font-medium animate-bounce shadow-sm font-sans">
            {currentQuote}
          </div>
        )}

        {/* Interactive Arena for YES and NO buttons */}
        <div
          ref={areaRef}
          className="relative min-h-[160px] flex flex-col sm:flex-row items-center justify-center gap-5 pt-3 pb-2"
        >
          {/* THE YES BUTTON */}
          <div
            className="transition-transform duration-300 ease-out z-20"
            style={{
              transform: `scale(${yesScale})`,
            }}
          >
            <button
              onClick={handleYesClick}
              type="button"
              className="pulse-glow px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-500/40 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap font-sans"
            >
              <Heart className="w-5 h-5 fill-white animate-pulse" />
              <span>YES! 💕</span>
            </button>
          </div>

          {/* THE NO BUTTON (The Mobile Touch Trick) */}
          <div
            className="relative z-10 transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
          >
            <button
              ref={noButtonRef}
              type="button"
              onPointerDown={dodgeNoButton}
              onTouchStart={dodgeNoButton}
              onMouseEnter={dodgeNoButton}
              onFocus={dodgeNoButton}
              onClick={handleNoClickFallback}
              className="px-6 py-2.5 rounded-full bg-slate-200/90 text-slate-600 hover:text-slate-800 font-semibold text-sm shadow-sm border border-slate-300/80 transition-all select-none cursor-pointer whitespace-nowrap active:scale-90 font-sans"
              style={{
                touchAction: 'none',
              }}
              aria-label="No option"
            >
              <span>NO 😢</span>
            </button>
          </div>
        </div>

        {/* Evasion Counter Subtitle */}
        {evasionCount > 0 ? (
          <p className="text-xs text-rose-500 mt-4 font-sans font-medium">
            Times you tried to tap NO: <span className="font-bold">{evasionCount}</span> (I won&apos;t ever let you slip away, my baby 😉)
          </p>
        ) : (
          <p className="text-xs text-slate-400 mt-4 font-sans italic">
            Press YES with all your heart, my Sona... ✨
          </p>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        type="button"
        className="text-xs text-slate-500 hover:text-slate-800 transition-colors py-2 px-4 rounded-full font-sans"
      >
        ← Back to Love Meter
      </button>

      {/* Funny fallback modal if NO is ever triggered */}
      {funnyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel-deep rounded-3xl p-6 max-w-xs text-center border-2 border-rose-300 shadow-2xl">
            <span className="text-4xl mb-2 block">🚫💖</span>
            <h4 className="text-lg font-bold text-slate-900 font-serif mb-2">
              Love Override!
            </h4>
            <p className="text-xs text-slate-600 mb-4 font-sans">
              There is no &apos;NO&apos; when it comes to you and me, Nusrat! Converting your answer to <strong>YES</strong> forever... 🥰
            </p>
            <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
};
