import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, Download, RotateCcw, CheckCircle2, Feather } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import coupleImg from '../assets/images/romantic_couple_dusk_1791642773029.jpg';

interface CelebrationSectionProps {
  onRestart: () => void;
}

interface DateIdea {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  vibe: string;
}

const DATE_IDEAS: DateIdea[] = [
  {
    id: 'dinner',
    title: 'Candlelight Rooftop Dinner',
    subtitle: 'Under glowing fairy lights, soft music, and city skyline',
    icon: '🕯️',
    vibe: 'Pure Romance',
  },
  {
    id: 'sunset',
    title: 'Sunset Beach Walk & Ice Cream',
    subtitle: 'Warm sand, listening to the waves, hand in hand',
    icon: '🌅',
    vibe: 'Peaceful & Sweet',
  },
  {
    id: 'movie',
    title: 'Cozy Movie & Dessert Cuddles',
    subtitle: 'Warm blankets, waffles, warm hugs, and midnight sweets',
    icon: '🎬',
    vibe: 'Warm & Intimate',
  },
  {
    id: 'picnic',
    title: 'Stargazing Fairy-Lit Picnic',
    subtitle: 'Your favorite treats, poetry books, and open skies',
    icon: '🧺',
    vibe: 'Dreamy & Unforgettable',
  },
];

export const CelebrationSection: React.FC<CelebrationSectionProps> = ({ onRestart }) => {
  const [selectedIdea, setSelectedIdea] = useState<string>('dinner');
  const [dateValue, setDateValue] = useState<string>('This Weekend');
  const [customWish, setCustomWish] = useState<string>('Bring me my favorite flowers and never let go of my hand! 🌸');
  const [showPassModal, setShowPassModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    // Grand celebration fireworks of hearts and rose gold confetti
    const end = Date.now() + 4 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#fda4af', '#f472b6', '#ffd700'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 110,
        origin: { y: 0.6 },
        colors,
      });
    }, 400);

    setTimeout(() => {
      confetti({
        particleCount: 130,
        spread: 130,
        origin: { y: 0.4 },
        colors,
      });
    }, 1200);
  }, []);

  const selectedDateObj = DATE_IDEAS.find((i) => i.id === selectedIdea) || DATE_IDEAS[0];

  const shareText = `Hey Muhid! Your Sona (Nusrat) said YES! 💕 I picked our romantic date: ${selectedDateObj.title} (${dateValue}). My wish: "${customWish}". I can't wait for our special date! 🥰`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    romanticAudio.playHeartPop();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-5 animate-fade-in flex flex-col items-center">
      {/* Celebration Trophy Card */}
      <div className="w-full glass-panel-deep rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-6 text-center border-2 border-rose-200">
        {/* Floating Heart Badge */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-400/35 text-2xl animate-bounce">
          💖
        </div>

        <h2 className="text-3xl sm:text-4xl text-rose-600 font-cursive mb-1">
          O Nusrat... My Heart is Yours!
        </h2>

        {/* Required Success Message */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif leading-tight mb-3">
          Yay! I knew you&apos;d say Yes, my baby!
        </h1>

        <div className="p-4 rounded-2xl bg-rose-50/90 border border-rose-200/90 mb-5">
          <p className="text-base sm:text-lg font-semibold text-rose-700 font-serif leading-relaxed">
            Muhid loves you so much! ❤️ <br />
            <span className="text-xs sm:text-sm font-sans font-normal text-slate-700">
              Can&apos;t wait for our special date, my sweetest <span className="font-semibold text-rose-600">Jan</span>!
            </span>
          </p>

          <p className="font-poetry text-base italic text-slate-600 mt-2">
            &ldquo;You are my today and all of my tomorrows, my Nusrat.&rdquo;
          </p>
        </div>

        {/* Couple Fine Art */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-white/90 aspect-[16/9] mb-6 relative">
          <img
            src={coupleImg}
            alt="Muhid and Nusrat celebration"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3 right-3 text-white text-center">
            <p className="text-xs font-serif font-medium text-rose-100">
              Muhid &amp; Nusrat • Written in the Stars Forever ✨
            </p>
          </div>
        </div>

        {/* Date Planner Section */}
        <div className="text-left border-t border-rose-100 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase text-slate-800 font-sans">
              Choose Our Dream Date, Sona:
            </h3>
          </div>

          {/* Date idea selections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            {DATE_IDEAS.map((idea) => {
              const isSelected = selectedIdea === idea.id;
              return (
                <button
                  key={idea.id}
                  onClick={() => {
                    romanticAudio.playHeartPop();
                    setSelectedIdea(idea.id);
                  }}
                  type="button"
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-[1.02]'
                      : 'bg-white/80 text-slate-700 border-rose-100 hover:bg-rose-50/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{idea.icon}</span>
                    <span className={`text-xs font-bold leading-tight font-sans ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {idea.title}
                    </span>
                  </div>
                  <p className={`text-[11px] leading-tight font-sans ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                    {idea.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Date Timing Preference */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans">
              When should I take you out, my Jan?
            </label>
            <div className="flex flex-wrap gap-2">
              {['This Weekend', 'Friday Night', 'Next Saturday', 'Surprise Me!'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    romanticAudio.playHeartPop();
                    setDateValue(val);
                  }}
                  className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition-all font-sans ${
                    dateValue === val
                      ? 'bg-rose-100 border-rose-300 text-rose-800 font-semibold shadow-sm'
                      : 'bg-white/70 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Sweet note / wish input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans">
              A sweet wish for me on our date:
            </label>
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white/95 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400 font-sans"
              placeholder="e.g. Bring pink lilies and hold my hand tight!"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsAppShare}
              type="button"
              className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-sans"
            >
              <Share2 className="w-4 h-4" />
              <span>Send RSVP to Muhid (WhatsApp)</span>
            </button>

            <button
              onClick={() => {
                romanticAudio.playHeartPop();
                setShowPassModal(true);
              }}
              type="button"
              className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-sans"
            >
              <Download className="w-4 h-4" />
              <span>View Date Pass 🎟️</span>
            </button>
          </div>

          {/* Copy option */}
          <div className="mt-3 text-center">
            <button
              onClick={handleCopy}
              type="button"
              className="text-xs text-rose-600 hover:text-rose-800 font-medium inline-flex items-center gap-1 font-sans"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied RSVP note to clipboard!</span>
                </>
              ) : (
                <span>Or copy RSVP text to send anywhere 📋</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Relive Experience Button */}
      <button
        onClick={onRestart}
        type="button"
        className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-rose-700 font-medium py-2 px-4 rounded-full glass-panel transition-all active:scale-95 cursor-pointer font-sans"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Experience our secret world again</span>
      </button>

      {/* Official Date Pass Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel-deep rounded-3xl p-6 max-w-sm w-full border-2 border-rose-300 shadow-2xl relative">
            <button
              onClick={() => setShowPassModal(false)}
              type="button"
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-bold"
              aria-label="Close pass"
            >
              ✕
            </button>

            {/* Boarding Pass Style Ticket */}
            <div className="border-2 border-dashed border-rose-300 rounded-2xl p-4 bg-gradient-to-b from-rose-50/90 to-pink-50/90 text-center mb-4">
              <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-rose-500 mb-2 font-sans">
                <span>OFFICIAL LOVE PASS</span>
                <span>TICKET #MN-FOREVER</span>
              </div>

              <h4 className="text-xl font-cursive text-rose-600 mb-0.5">
                For My Sona, Nusrat
              </h4>
              <p className="text-xs text-slate-600 mb-3 font-sans">
                Issued with unconditional devotion by Muhid
              </p>

              <div className="py-2.5 px-3 rounded-xl bg-white/95 shadow-sm border border-rose-100 text-left text-xs mb-3 space-y-1.5 font-sans">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-800">{selectedDateObj.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-semibold text-slate-800">{dateValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Her Sweet Wish:</span>
                  <span className="font-semibold text-rose-600 truncate max-w-[150px]">{customWish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Validity:</span>
                  <span className="font-semibold text-emerald-600">Lifetime &amp; Beyond ∞</span>
                </div>
              </div>

              <p className="font-poetry text-base italic text-rose-700 leading-snug">
                &ldquo;You are my heart, my life, and my one and only thought, my Jan.&rdquo;
              </p>
            </div>

            <button
              onClick={() => {
                romanticAudio.playCelebrationChimes();
                setShowPassModal(false);
              }}
              type="button"
              className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-md font-sans"
            >
              Keep Close to My Heart Forever 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
