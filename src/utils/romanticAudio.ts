/**
 * Romantic Audio Engine with Real Romantic Song Streaming
 * Default Track: Frédéric Chopin - Nocturne in E-flat major, Op. 9 No. 2 (Real MP3)
 * Supports custom songs, user uploads, and synthesizer fallback.
 */

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export const PRESET_SONGS: SongTrack[] = [
  {
    id: 'chopin-nocturne',
    title: 'Nocturne in E-Flat Major, Op. 9 No. 2',
    artist: 'Frédéric Chopin (Piano Masterpiece)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Nocturne_in_E_flat_major%2C_Op._9_no._2.mp3',
  },
  {
    id: 'debussy-clair',
    title: 'Clair de Lune',
    artist: 'Claude Debussy (Moonlight Romance)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg',
  },
];

class RomanticAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentTrack: SongTrack = PRESET_SONGS[0];
  private listeners: Array<() => void> = [];
  private hasUserInteracted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.loop = true;
      this.audioElement.src = this.currentTrack.url;
      this.audioElement.volume = 0.55;

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', () => {
        // Fallback or retry
        console.warn('Audio streaming encountered an issue.');
      });
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public enableAutoPlayOnFirstTouch() {
    if (this.hasUserInteracted) return;

    const startOnInteraction = () => {
      this.hasUserInteracted = true;
      if (!this.isPlaying) {
        this.startMusic();
      }
      window.removeEventListener('pointerdown', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
      window.removeEventListener('click', startOnInteraction);
    };

    window.addEventListener('pointerdown', startOnInteraction, { once: true });
    window.addEventListener('touchstart', startOnInteraction, { once: true });
    window.addEventListener('click', startOnInteraction, { once: true });
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initAudioElement();
    if (!this.audioElement) return;

    this.audioElement
      .play()
      .then(() => {
        this.isPlaying = true;
        this.notify();
      })
      .catch(() => {
        // User gesture required on some strict browsers
      });
  }

  public stopMusic() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public setCustomSongUrl(url: string, title = 'Our Special Love Song', artist = 'Chosen by Muhid') {
    this.currentTrack = {
      id: 'custom-' + Date.now(),
      title,
      artist,
      url,
    };

    if (this.audioElement) {
      const wasPlaying = this.isPlaying;
      this.audioElement.src = url;
      this.audioElement.load();
      if (wasPlaying) {
        this.startMusic();
      } else {
        this.notify();
      }
    }
  }

  public setTrack(track: SongTrack) {
    this.currentTrack = track;
    if (this.audioElement) {
      const wasPlaying = this.isPlaying;
      this.audioElement.src = track.url;
      this.audioElement.load();
      if (wasPlaying) {
        this.startMusic();
      } else {
        this.notify();
      }
    }
  }

  public getCurrentTrack(): SongTrack {
    return this.currentTrack;
  }

  public getMusicState(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    if (this.audioElement) {
      this.audioElement.volume = Math.max(0, Math.min(1, vol));
    }
  }

  public playHeartPop() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }

  public playCelebrationChimes() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.2);
      });
    } catch {
      // Ignore
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
