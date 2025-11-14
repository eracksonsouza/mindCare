"use client";

type IntensitySliderProps = {
  intensity: number;
  onIntensityChange: (value: number) => void;
};

export const IntensitySlider = ({
  intensity,
  onIntensityChange,
}: IntensitySliderProps) => {
  return (
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
          onChange={(event) => onIntensityChange(Number(event.target.value))}
          className="flex-1 h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 dark:from-green-900/50 dark:via-yellow-900/50 dark:to-red-900/50 rounded-lg appearance-none cursor-pointer accent-purple-600 shadow-inner"
        />
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Muito
        </span>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
          <span className="text-lg font-bold text-white">{intensity}</span>
        </div>
      </div>
    </div>
  );
};
