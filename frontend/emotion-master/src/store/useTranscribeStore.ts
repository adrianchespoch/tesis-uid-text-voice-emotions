import { create } from 'zustand';
import type { KaraokeEmotionResponse } from '@/types/karaokeEmotion';

type State = {
  audioFile: File | null;
  audioUrl: string | null;
  data: KaraokeEmotionResponse | null;
  currentTime: number; // para resaltar word
  setAudioFile: (f: File | null) => void;
  setAudioUrl: (u: string | null) => void;
  setData: (d: KaraokeEmotionResponse | null) => void;
  setCurrentTime: (t: number) => void;
};

export const useTranscribeStore = create<State>(set => ({
  audioFile: null,
  audioUrl: null,
  data: null,
  currentTime: 0,
  setAudioFile: f => set({ audioFile: f }),
  setAudioUrl: u => set({ audioUrl: u }),
  setData: d => set({ data: d }),
  setCurrentTime: t => set({ currentTime: t }),
}));
