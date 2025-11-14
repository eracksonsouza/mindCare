"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

export default function CalendarDemoPage() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({
    from: new Date(),
    to: undefined,
  });
  const [multipleDates, setMultipleDates] = useState<Date[] | undefined>([
    new Date(),
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-3">
            Demonstração do Componente Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore diferentes modos de uso do componente Calendar do shadcn/ui
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Seleção Única
              </h2>
            </div>

            <div className="flex justify-center mb-4">
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                className="rounded-md border shadow"
              />
            </div>

            {singleDate && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Data selecionada:
                </p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {singleDate.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Seleção de Período
              </h2>
            </div>

            <div className="flex justify-center mb-4">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) =>
                  setDateRange(range || { from: undefined, to: undefined })
                }
                numberOfMonths={1}
                className="rounded-md border shadow"
              />
            </div>

            {dateRange?.from && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data inicial:
                  </p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {dateRange.from.toLocaleDateString("pt-BR")}
                  </p>
                </div>
                {dateRange.to && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Data final:
                    </p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {dateRange.to.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Seleção Múltipla
              </h2>
            </div>

            <div className="flex justify-center mb-4">
              <Calendar
                mode="multiple"
                selected={multipleDates}
                onSelect={setMultipleDates}
                className="rounded-md border shadow"
              />
            </div>

            {multipleDates && multipleDates.length > 0 && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Datas selecionadas ({multipleDates.length}):
                </p>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {multipleDates.map((date, index) => (
                    <p
                      key={index}
                      className="text-sm text-green-600 dark:text-green-400"
                    >
                      • {date.toLocaleDateString("pt-BR")}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CalendarIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Com Restrições
              </h2>
            </div>

            <div className="flex justify-center mb-4">
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                disabled={(date) => {
                  const day = date.getDay();
                  return day === 0 || day === 6 || date > new Date();
                }}
                className="rounded-md border shadow"
              />
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                📅 Fins de semana desabilitados
                <br />
                🔒 Datas futuras desabilitadas
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Exemplos de Código
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Seleção Única
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Seleção de Período
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {`<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
  className="rounded-md border"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Com Datas Desabilitadas
              </h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(date) => date > new Date()}
  className="rounded-md border"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
