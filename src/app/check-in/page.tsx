"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SmilePlus, Smile, Meh, AlertCircle, Frown, Lock } from "lucide-react";
import { DaySelector } from "@/components/check-in/day-selector";
import { EmotionSelector } from "@/components/check-in/emotion-selector";
import { IntensitySlider } from "@/components/check-in/intensity-slider";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { MAX_CHECK_INS } from "@/lib/constants";
import type {
  CheckIn,
  Emotion as EmotionType,
  EmotionOption,
  DayOption,
} from "@/types";

const emotions: EmotionOption[] = [
  {
    icon: SmilePlus,
    label: "Feliz",
    value: "happy",
    color: "hover:bg-gray-50 dark:hover:bg-gray-700",
  },
  {
    icon: Smile,
    label: "Calmo",
    value: "calm",
    color: "hover:bg-gray-50 dark:hover:bg-gray-700",
  },
  {
    icon: Meh,
    label: "Neutro",
    value: "neutral",
    color: "hover:bg-gray-50 dark:hover:bg-gray-700",
  },
  {
    icon: AlertCircle,
    label: "Ansioso",
    value: "anxious",
    color: "hover:bg-gray-50 dark:hover:bg-gray-700",
  },
  {
    icon: Frown,
    label: "Triste",
    value: "sad",
    color: "hover:bg-gray-50 dark:hover:bg-gray-700",
  },
];

const dayNames = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const CheckInPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [selectedDay, setSelectedDay] = useState<number>(0); // 0 = hoje
  const [dayOptions, setDayOptions] = useState<DayOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [useCustomDate, setUseCustomDate] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const options: DayOption[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      options.push({
        value: i,
        label:
          i === 0 ? "Hoje" : i === 1 ? "Ontem" : dayNamesShort[date.getDay()],
        fullLabel:
          i === 0 ? "Hoje" : i === 1 ? "Ontem" : dayNames[date.getDay()],
        date: date,
      });
    }

    setDayOptions(options);
  }, []);

  const handleSubmit = () => {
    if (!selectedEmotion) return;

    const finalDate =
      useCustomDate && selectedDate
        ? selectedDate
        : dayOptions[selectedDay]?.date || new Date();

    const timestamp = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      finalDate.getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );

    const checkIn: CheckIn = {
      emotion: selectedEmotion as EmotionType,
      intensity,
      timestamp: timestamp.toISOString(),
    };

    const checkIns = storage.get<CheckIn[]>(STORAGE_KEYS.CHECK_INS, []);
    const newCheckIns = [...checkIns, checkIn].slice(-MAX_CHECK_INS);
    storage.set(STORAGE_KEYS.CHECK_INS, newCheckIns);

    const shouldShowInterventions =
      ["anxious", "sad"].includes(selectedEmotion) && intensity >= 6;
    router.push(
      shouldShowInterventions ? "/interventions" : "/check-in/success"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4 sm:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-3">
            Como você está se sentindo agora?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Tire um momento para reconhecer suas emoções
          </p>
        </div>

        <DaySelector
          dayOptions={dayOptions}
          selectedDay={selectedDay}
          selectedDate={selectedDate}
          useCustomDate={useCustomDate}
          onSelectDay={setSelectedDay}
          onDateChange={setSelectedDate}
          onUseCustomDateChange={setUseCustomDate}
        />

        <EmotionSelector
          emotions={emotions}
          selectedEmotion={selectedEmotion}
          onSelectEmotion={(value) => setSelectedEmotion(value)}
        />

        {selectedEmotion && (
          <IntensitySlider
            intensity={intensity}
            onIntensityChange={setIntensity}
          />
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all"
          >
            ← Voltar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedEmotion}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all transform
              ${
                selectedEmotion
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
              }
            `}
          >
            Continuar →
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 backdrop-blur-sm">
          <Lock className="w-5 h-5 text-blue-500" />
          <p>Seu check-in é completamente anônimo e seguro</p>
        </div>
      </main>
    </div>
  );
};

export default CheckInPage;
