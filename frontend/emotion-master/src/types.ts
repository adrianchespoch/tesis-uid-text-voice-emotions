export type EmotionScore = { label: string; score: number };

export type Segment = {
  start: number;
  end: number;
  text: string;
  top_emotion: EmotionScore;
  emotions: EmotionScore[];
};

export type TranscribeResponse = {
  transcription: string;
  global_emotions: EmotionScore[];
  top_global_emotions: EmotionScore[];
  segments: Segment[];
};
