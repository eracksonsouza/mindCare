import type { LucideIcon } from "lucide-react";

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

export type EmotionOption = {
  icon: LucideIcon;
  label: string;
  value: Emotion;
  color: string;
};

export type DayOption = {
  value: number;
  label: string;
  fullLabel: string;
  date: Date;
};
