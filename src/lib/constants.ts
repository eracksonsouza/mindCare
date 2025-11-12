import { SmilePlus, Smile, Meh, AlertCircle, Frown } from "lucide-react";
import type { EmotionConfig } from "@/types";

export const EMOTION_CONFIG: Record<
  string,
  EmotionConfig & { icon: typeof SmilePlus }
> = {
  happy: {
    icon: SmilePlus,
    label: "Feliz",
    color: "from-green-400 to-emerald-400",
    value: 10,
  },
  calm: {
    icon: Smile,
    label: "Calmo",
    color: "from-blue-400 to-cyan-400",
    value: 8,
  },
  neutral: {
    icon: Meh,
    label: "Neutro",
    color: "from-gray-400 to-slate-400",
    value: 6,
  },
  anxious: {
    icon: AlertCircle,
    label: "Ansioso",
    color: "from-yellow-400 to-orange-400",
    value: 4,
  },
  sad: {
    icon: Frown,
    label: "Triste",
    color: "from-red-400 to-pink-400",
    value: 2,
  },
};

export const DAY_NAMES = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
export const DAY_NAMES_SHORT = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
];

export const MAX_CHECK_INS = 100;
export const MAX_JOURNAL_ENTRIES = 50;
export const CHECK_IN_COOLDOWN = 60000;
