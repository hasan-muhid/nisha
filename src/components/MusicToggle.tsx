import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Settings2, Upload, Check, Play, Pause } from 'lucide-react';
import { romanticAudio, PRESET_SONGS, SongTrack } from '../utils/romanticAudio';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getMusicState());
  const [currentTrack, setCurrentTrack] = useState<SongTrack>(romanticAudio.getCurrentTrack());
  const [showSettings, setShowSettings] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe(() => {
      setIsPlaying(romanticAudio.getMusicState());
      setCurrentTrack(romanticAudio.getCurrentTrack());
    });
    return unsubscribe;
  }, []);

  const toggleMusic = () => {
    const nextState = romanticAudio.toggleMusic();
    setIsPlaying(nextState);
    if (nextState) {
      romanticAudio.playHeartPop();
    }
  };

  const handleSelectTrack = (track: SongTrack) => {
    romanticAudio.playHeartPop();
    romanticAudio.setTrack(track);
    setShowSettings(false);
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) return;
    romanticAudio.playHeartPop();
    romanticAudio.setCustomSongUrl(
      customUrl.trim(),
      customTitle.trim() || 'Our Favorite Love Song',
      'For Nisha'
    );
    setShowSettings(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const songName = file.name.replace(/\.[^/.]+$/, '');
      romanticAudio.playHeartPop();
      romanticAudio.setCustomSongUrl(objectUrl, songName, 'From Muhid to Nisha');
      setShowSettings(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* Main Quick Play/Pause Button */}
        <button
          onClick={toggleMusic}
          type="button"
          className="group relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full glass-panel-deep text-xs font-medium text-rose-700 hover:text-rose-900 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer border border-rose-200/90"
          aria-label={isPlaying ? 'Pause romantic song' : 'Play romantic song'}
        >
          <span className="relative flex h-4 w-4 items-center justify-center">
            {isPlaying ? (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-40" />
                <Volume2 className="h-3.5 w-3.5 text-rose-600 relative z-10" />
              </>
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-slate-400 relative z-10" />
            )}
          </span>

          <span className="whitespace-nowrap font-sans text-[11px] sm:text-xs font-semibold">
            {isPlaying ? (
              <span className="flex items-center gap-1">
                <span className="truncate max-w-[90px] sm:max-w-[130px]">
                  {currentTrack.title.split(',')[0]}
                </span>
                <Music className="h-3 w-3 text-rose-500 animate-bounce shrink-0" />
              </span>
            ) : (
              'Play Song 🎵'
            )}
          </span>
        </button>

        {/* Change Song Button */}
        <button
          onClick={() => {
            romanticAudio.playHeartPop();
            setShowSettings(!showSettings);
          }}
          type="button"
          className="w-7 h-7 rounded-full glass-panel-deep flex items-center justify-center text-slate-600 hover:text-rose-600 border border-rose-200 transition-all active:scale-90 cursor-pointer"
          title="Change or upload romantic song"
          aria-label="Song settings"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Song Customizer Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel-deep rounded-3xl p-5 sm:p-6 max-w-sm w-full border-2 border-rose-300 shadow-2xl relative">
            <button
              onClick={() => setShowSettings(false)}
              type="button"
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-bold"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Music className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Choose Our Romantic Song 🎵
              </h3>
            </div>

            <p className="text-xs text-slate-600 mb-4 font-sans">
              Select a romantic classic or upload your own song for Nisha:
            </p>

            {/* Presets */}
            <div className="space-y-2 mb-4">
              {PRESET_SONGS.map((song) => {
                const isSelected = currentTrack.id === song.id;
                return (
                  <button
                    key={song.id}
                    onClick={() => handleSelectTrack(song)}
                    type="button"
                    className={`w-full p-2.5 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-white/80 text-slate-800 border-rose-100 hover:bg-rose-50'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                        {song.title}
                      </p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                        {song.artist}
                      </p>
                    </div>
                    {isSelected ? (
                      <Check className="w-4 h-4 shrink-0 text-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Upload your own song */}
            <div className="border-t border-rose-100 pt-3 mb-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans">
                Upload your MP3 from device:
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="w-full py-2 px-3 rounded-xl border border-dashed border-rose-300 bg-rose-50/60 hover:bg-rose-100/60 text-rose-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Song (Any Hindi / Bangla / English MP3)</span>
              </button>
            </div>

            {/* Paste direct audio link */}
            <div className="border-t border-rose-100 pt-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
                Or paste direct MP3 URL:
              </label>
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://.../romantic-song.mp3"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-rose-200 bg-white text-slate-800 mb-2 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
              <button
                onClick={handleApplyCustomUrl}
                type="button"
                className="w-full py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-sm active:scale-95"
              >
                Apply Song
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
