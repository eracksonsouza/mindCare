export type Emotion = "happy" | "calm" | "neutral" | "anxious" | "sad";

export interface CheckIn {
  emotion: Emotion;
  intensity: number;
  timestamp: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
}

export interface EmotionConfig {
  label: string;
  color: string;
  value: number;
}
