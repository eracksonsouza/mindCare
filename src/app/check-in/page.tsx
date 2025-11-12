"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  SmilePlus,
  Smile,
  Meh,
  AlertCircle,
  Frown,
  Calendar as CalendarIcon,
  Lock,
  Lightbulb,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { MAX_CHECK_INS } from "@/lib/constants";
import type { CheckIn, Emotion as EmotionType } from "@/types";

type Emotion = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
};

type DayOption = {
  value: number;
  label: string;
  fullLabel: string;
  date: Date;
};

const emotions: Emotion[] = [
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
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
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

        {/* Seleção do Dia */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Para qual dia é este check-in?
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3 mb-4">
            {dayOptions.map((day) => (
              <button
                key={day.value}
                onClick={() => {
                  setSelectedDay(day.value);
                  setUseCustomDate(false);
                }}
                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-xl border-2
                  transition-all duration-200 transform hover:scale-105
                  ${
                    !useCustomDate && selectedDay === day.value
                      ? "border-purple-500 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 shadow-lg"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md"
                  }
                `}
              >
                <span
                  className={`font-medium text-xs sm:text-sm ${
                    !useCustomDate && selectedDay === day.value
                      ? "text-purple-700 dark:text-purple-300"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {day.label}
                </span>
                <span
                  className={`text-xs ${
                    !useCustomDate && selectedDay === day.value
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {day.date.getDate()}/{day.date.getMonth() + 1}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`
                flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
                ${
                  useCustomDate && selectedDate
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
                    : "border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }
              `}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                {useCustomDate && selectedDate
                  ? `${selectedDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}`
                  : showCalendar
                  ? "Ocultar calendário"
                  : "Escolher data específica"}
              </span>
            </button>

            {/* Calendário expansível */}
            {showCalendar && (
              <div className="flex justify-center animate-fadeIn">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setUseCustomDate(true);
                    setShowCalendar(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  className="rounded-md border shadow"
                />
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Você pode registrar emoções de dias anteriores
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Selecione uma emoção
          </h2>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
            {emotions.map((emotion) => {
              const EmotionIcon = emotion.icon;
              return (
                <button
                  key={emotion.value}
                  onClick={() => setSelectedEmotion(emotion.value)}
                  className={`
                    flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-4 sm:py-3 rounded-xl border-2
                    transition-all duration-200 transform hover:scale-105
                    ${
                      selectedEmotion === emotion.value
                        ? "border-purple-500 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 shadow-lg"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md"
                    }
                  `}
                >
                  <EmotionIcon
                    className={`w-8 h-8 sm:w-6 sm:h-6 ${
                      selectedEmotion === emotion.value
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  />
                  <span
                    className={`font-medium text-sm sm:text-base ${
                      selectedEmotion === emotion.value
                        ? "text-purple-700 dark:text-purple-300"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {emotion.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedEmotion && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Qual a intensidade?
            </h2>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Pouco
              </span>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="flex-1 h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 dark:from-green-900/50 dark:via-yellow-900/50 dark:to-red-900/50 rounded-lg appearance-none cursor-pointer accent-purple-600 shadow-inner"
              />
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Muito
              </span>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
                <span className="text-lg font-bold text-white">
                  {intensity}
                </span>
              </div>
            </div>
          </div>
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
