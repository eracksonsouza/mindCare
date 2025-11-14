"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Lightbulb } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import type { DayOption } from "@/types";

type DaySelectorProps = {
  dayOptions: DayOption[];
  selectedDay: number;
  selectedDate?: Date;
  useCustomDate: boolean;
  onSelectDay: (value: number) => void;
  onDateChange: (date: Date | undefined) => void;
  onUseCustomDateChange: (value: boolean) => void;
};

export const DaySelector = ({
  dayOptions,
  selectedDay,
  selectedDate,
  useCustomDate,
  onSelectDay,
  onDateChange,
  onUseCustomDateChange,
}: DaySelectorProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDaySelection = (value: number) => {
    onSelectDay(value);
    onUseCustomDateChange(false);
    setShowCalendar(false);
  };

  const handleCalendarToggle = () => setShowCalendar((prev) => !prev);

  const handleCustomDate = (date: Date | undefined) => {
    onDateChange(date);
    if (date) {
      onUseCustomDateChange(true);
      setShowCalendar(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        Para qual dia é este check-in?
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3 mb-4">
        {dayOptions.map((day) => (
          <button
            key={day.value}
            onClick={() => handleDaySelection(day.value)}
            className={`
              flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-xl border-2
              transition-all duration-200 transform hover:scale-105
              ${
                !useCustomDate && selectedDay === day.value
                  ? "border-purple-500 bg-linear-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 shadow-lg"
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
          onClick={handleCalendarToggle}
          className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
            ${
              useCustomDate && selectedDate
                ? "border-purple-500 bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
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

        {showCalendar && (
          <div className="flex justify-center animate-fadeIn">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleCustomDate}
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
  );
};
