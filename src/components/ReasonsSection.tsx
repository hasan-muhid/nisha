import React, { useState } from 'react';
import { Heart, Sparkles, Smile, MessageCircleHeart, ShieldCheck, CheckCircle2, ArrowRight, Feather } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

interface ReasonCard {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tag: string;
  quoteAuthor: string;
  loveNote: string;
  petNamePhrase: string;
}

const REASONS: ReasonCard[] = [
  {
    id: 1,
    title: 'Your Mesmerizing Smile',
    subtitle: 'The light that turns my darkness into gold',
    icon: <Smile className="w-6 h-6 text-rose-500" />,
    tag: 'My Laughter & Joy',
    quoteAuthor: 'Pablo Neruda',
    loveNote:
      'Take away the sun, take away the morning air, my baby, but never take away your laughter. When your eyes crinkle with joy, O Nusrat, every burden I carry vanishes into thin air.',
    petNamePhrase: 'You are the music of my life, my Sona 💖',
  },
  {
    id: 2,
    title: 'The Grace of Your Soul',
    subtitle: 'Gentle warmth that heals my restless heart',
    icon: <Heart className="w-6 h-6 text-pink-500 fill-pink-100" />,
    tag: 'Pure Sanctuary',
    quoteAuthor: 'Kahlil Gibran',
    loveNote:
      'In a noisy world, your tenderness is my shelter. You don’t just love me; you hold the quietest corners of my soul with endless patience. I adore every fragment of who you are, my baby.',
    petNamePhrase: 'O Nusrat, my heart beats solely for you 🌸',
  },
  {
    id: 3,
    title: 'Our Late-Night Whispers',
    subtitle: 'Where seconds turn into eternity',
    icon: <MessageCircleHeart className="w-6 h-6 text-rose-600" />,
    tag: 'Midnight Magic',
    quoteAuthor: 'F. Scott Fitzgerald',
    loveNote:
      'When the clock strikes 2 AM and the city goes quiet, it is just your voice that makes the universe feel right. Every confession and every laugh with you, Jan, feels like coming home.',
    petNamePhrase: 'My favorite conversation in this lifetime ✨',
  },
  {
    id: 4,
    title: 'You Are My Chosen Destiny',
    subtitle: 'Where every road of my life was leading',
    icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
    tag: 'Soulmate Bond',
    quoteAuthor: 'Rumi',
    loveNote:
      'I did not simply fall in love with you; I recognized you. As Rumi wrote, lovers do not meet somewhere by chance—they were inside each other all along. You are my forever answer, my Jan.',
    petNamePhrase: 'Yours through every lifetime, my Nusrat 💍',
  },
];

interface ReasonsSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ onNext, onBack }) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    romanticAudio.playHeartPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-5 animate-fade-in flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-2">
          <Feather className="w-3.5 h-3.5 text-rose-600" />
          <span>From My Heart To Yours</span>
        </div>
        <h2 className="text-3xl sm:text-4xl text-rose-600 font-cursive mb-1">
          Why I Love You, Nisha...
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif mb-2">
          O Nusrat, You Are My Entire Universe
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-sans leading-relaxed">
          Tap each card below, my <span className="font-semibold text-rose-600">Sona</span>, to read what I whisper to the stars about you every night.
        </p>

        {/* Counter */}
        <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-rose-600 bg-white/80 px-3.5 py-1.5 rounded-full border border-rose-200 shadow-sm">
          <span>Letters Unveiled: {flippedCount} of {REASONS.length}</span>
          {flippedCount === REASONS.length && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          )}
        </div>
      </div>

      {/* Grid of 3D Flip Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
        {REASONS.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="perspective-1000 h-68 cursor-pointer select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleFlip(card.id);
                }
              }}
              aria-label={`Flip card: ${card.title}`}
            >
              <div
                className={`w-full h-full relative transition-transform duration-500 transform-style-preserve-3d rounded-3xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 backface-hidden glass-panel-deep rounded-3xl p-5 flex flex-col justify-between border border-white/90 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 font-sans">
                      {card.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-rose-100/70 flex items-center justify-center text-rose-600">
                      {card.icon}
                    </div>
                  </div>

                  <div className="text-center my-auto py-2">
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif mb-1 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans line-clamp-2">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-100/80 flex items-center justify-between text-xs text-rose-600 font-medium font-sans">
                    <span>Touch to read my letter 💌</span>
                    <span className="text-base">➜</span>
                  </div>
                </div>

                {/* BACK FACE (REVEALED REASON) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-5 flex flex-col justify-between bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider text-rose-100 uppercase font-sans">
                      Letter #{card.id} • Inspired by {card.quoteAuthor}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </div>

                  <div className="my-auto text-center px-1">
                    <p className="font-poetry text-base sm:text-lg italic text-rose-50 leading-relaxed mb-2">
                      &ldquo;{card.loveNote}&rdquo;
                    </p>
                    <p className="text-xs font-semibold text-amber-200 font-sans">
                      — {card.petNamePhrase}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-rose-100 font-medium font-sans">
                    <span>Tap to flip back</span>
                    <span className="text-base">💖</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onBack}
          type="button"
          className="w-full sm:w-auto px-5 py-3 rounded-2xl glass-panel text-slate-600 font-medium text-xs sm:text-sm hover:text-slate-800 active:scale-95 transition-all text-center cursor-pointer"
        >
          ← Back to Letter
        </button>

        <button
          onClick={() => {
            romanticAudio.playHeartPop();
            onNext();
          }}
          type="button"
          className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all cursor-pointer font-sans"
        >
          <span>See How Deep My Love Measures 💕</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
