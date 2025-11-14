"use client";

import type { EmotionOption } from "@/types";

type EmotionSelectorProps = {
  emotions: EmotionOption[];
  selectedEmotion: string | null;
  onSelectEmotion: (value: string) => void;
};

export const EmotionSelector = ({
  emotions,
  selectedEmotion,
  onSelectEmotion,
}: EmotionSelectorProps) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Selecione uma emoção
      </h2>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
        {emotions.map((emotion) => {
          const EmotionIcon = emotion.icon;
          const isSelected = selectedEmotion === emotion.value;

          return (
            <button
              key={emotion.value}
              onClick={() => onSelectEmotion(emotion.value)}
              className={`
                flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-4 sm:py-3 rounded-xl border-2
                transition-all duration-200 transform hover:scale-105
                ${
                  isSelected
                    ? "border-purple-500 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 shadow-lg"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md"
                }
              `}
            >
              <EmotionIcon
                className={`w-8 h-8 sm:w-6 sm:h-6 ${
                  isSelected
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              />
              <span
                className={`font-medium text-sm sm:text-base ${
                  isSelected
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
  );
};
