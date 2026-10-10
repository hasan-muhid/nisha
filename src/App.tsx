/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicToggle } from './components/MusicToggle';
import { SplashSection } from './components/SplashSection';
import { ReasonsSection } from './components/ReasonsSection';
import { LoveMeterSection } from './components/LoveMeterSection';
import { ProposalSection } from './components/ProposalSection';
import { CelebrationSection } from './components/CelebrationSection';
import { Heart } from 'lucide-react';
import { romanticAudio } from './utils/romanticAudio';

type ScreenStep = 'splash' | 'reasons' | 'meter' | 'proposal' | 'celebration';

const STEP_LABELS: Record<ScreenStep, { num: number; label: string }> = {
  splash: { num: 1, label: 'Love Letter' },
  reasons: { num: 2, label: 'Why I Love You' },
  meter: { num: 3, label: 'Love Meter' },
  proposal: { num: 4, label: 'The Question' },
  celebration: { num: 5, label: 'Forever' },
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('splash');

  useEffect(() => {
    // Automatically start romantic acoustic melody on first touch anywhere on screen
    romanticAudio.enableAutoPlayOnFirstTouch();
  }, []);

  const goToStep = (step: ScreenStep) => {
    romanticAudio.playHeartPop();
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-100 to-amber-50/70 overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 font-sans text-slate-800">
      {/* Dynamic Background with floating hearts, falling rose petals, and touch ripples */}
      <FloatingHearts />

      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 w-full px-3 sm:px-4 py-2.5 max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-sm">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-cursive font-bold tracking-wide text-rose-700 leading-tight">
              Muhid &amp; Nusrat
            </span>
            <span className="text-[10px] text-slate-500 font-sans font-medium">
              For my Nisha, my Jan 💌
            </span>
          </div>
        </div>

        {/* Step Indicator (Compact Mobile Pill) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-xs text-slate-600">
          <span className="font-semibold text-rose-600 font-mono">
            0{STEP_LABELS[currentStep].num}
          </span>
          <span className="text-slate-300">/</span>
          <span>05</span>
          <span className="text-slate-400 font-sans">·</span>
          <span className="font-medium text-slate-800">
            {STEP_LABELS[currentStep].label}
          </span>
        </div>

        {/* Music Player Action */}
        <div className="shrink-0">
          <MusicToggle />
        </div>
      </header>

      {/* Main Interactive Viewport Container */}
      <main className="relative z-10 w-full max-w-2xl mx-auto pb-12 pt-1 px-2 sm:px-4">
        {currentStep === 'splash' && (
          <SplashSection onOpen={() => goToStep('reasons')} />
        )}

        {currentStep === 'reasons' && (
          <ReasonsSection
            onNext={() => goToStep('meter')}
            onBack={() => goToStep('splash')}
          />
        )}

        {currentStep === 'meter' && (
          <LoveMeterSection
            onNext={() => goToStep('proposal')}
            onBack={() => goToStep('reasons')}
          />
        )}

        {currentStep === 'proposal' && (
          <ProposalSection
            onAccept={() => goToStep('celebration')}
            onBack={() => goToStep('meter')}
          />
        )}

        {currentStep === 'celebration' && (
          <CelebrationSection onRestart={() => goToStep('splash')} />
        )}
      </main>

      {/* Quiet Romantic Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-rose-600/80 font-poetry italic text-sm">
        <p>&ldquo;In all the world, there is no heart for me like yours.&rdquo; — Yours forever, Muhid ❤️</p>
      </footer>
    </div>
  );
}
