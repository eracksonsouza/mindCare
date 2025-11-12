"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Sparkles, Lightbulb } from "lucide-react";

const exercises = [
  {
    id: 1,
    title: "Exercício 5-4-3-2-1",
    duration: 5,
    description: "Técnica de ancoragem para o momento presente",
    steps: [
      { text: "Respire fundo 3 vezes", duration: 15 },
      { text: "Identifique 5 coisas que você pode VER", duration: 30 },
      { text: "Identifique 4 coisas que você pode TOCAR", duration: 30 },
      { text: "Identifique 3 coisas que você pode OUVIR", duration: 30 },
      { text: "Identifique 2 coisas que você pode CHEIRAR", duration: 30 },
      { text: "Identifique 1 coisa que você pode SABOREAR", duration: 30 },
      { text: "Respire fundo novamente e volte ao presente", duration: 15 },
    ],
  },
  {
    id: 2,
    title: "Body Scan Rápido",
    duration: 3,
    description: "Escaneamento corporal para relaxamento",
    steps: [
      { text: "Sente-se confortavelmente e feche os olhos", duration: 10 },
      { text: "Observe a sensação nos seus pés", duration: 20 },
      { text: "Suba para as pernas, soltando qualquer tensão", duration: 30 },
      { text: "Note as sensações no seu tronco e costas", duration: 30 },
      { text: "Relaxe os ombros e braços", duration: 30 },
      { text: "Suavize os músculos do rosto", duration: 20 },
      { text: "Respire e aprecie a sensação de relaxamento", duration: 40 },
    ],
  },
];

export default function MindfulBreakPage() {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimeRemaining, setStepTimeRemaining] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    if (currentStep >= selectedExercise.steps.length) {
      setIsActive(false);
      return;
    }

    setStepTimeRemaining(selectedExercise.steps[currentStep].duration);

    const timer = setInterval(() => {
      setStepTimeRemaining((prev) => {
        if (prev <= 1) {
          setCurrentStep((prevStep) => prevStep + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentStep, selectedExercise]);

  const start = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const stop = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const totalProgress = (currentStep / selectedExercise.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-teal-900 font-sans p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link
            href="/interventions"
            className="inline-block mb-4 text-green-600 dark:text-green-400 hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <Coffee className="w-10 h-10 text-green-600 dark:text-green-400" />
            Pausa Consciente
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Momento de mindfulness para recarregar
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
          {!isActive ? (
            <>
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
                  Escolha um exercício
                </h2>
                {exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => setSelectedExercise(exercise)}
                    className={`
                      w-full text-left p-6 rounded-2xl transition-all
                      ${
                        selectedExercise.id === exercise.id
                          ? "bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/40 dark:to-teal-900/40 ring-4 ring-green-500 shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        {exercise.title}
                      </h3>
                      <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        {exercise.duration} min
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {exercise.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {exercise.steps.length} passos
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={start}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Começar Exercício
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>
                    Passo {currentStep + 1} de {selectedExercise.steps.length}
                  </span>
                  <span>{stepTimeRemaining}s</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-600 to-teal-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${totalProgress}%` }}
                  />
                </div>
              </div>

              {currentStep < selectedExercise.steps.length ? (
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-6">
                    <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-2xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
                    {selectedExercise.steps[currentStep].text}
                  </p>
                </div>
              ) : (
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-6">
                    <Sparkles className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
                    Exercício Completo!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ótimo trabalho! Você dedicou um tempo para si mesmo.
                  </p>
                </div>
              )}

              <div className="flex justify-center gap-4">
                {currentStep < selectedExercise.steps.length ? (
                  <button
                    onClick={stop}
                    className="px-8 py-4 rounded-full bg-red-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Parar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsActive(false);
                        setCurrentStep(0);
                      }}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Fazer Novamente
                    </button>
                    <Link
                      href="/interventions"
                      className="px-8 py-4 rounded-full border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all flex items-center"
                    >
                      Outras Intervenções
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

          <div className="mt-8 bg-green-50 dark:bg-green-900/30 rounded-2xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
              <span>
                <strong>Dica:</strong> Pausas conscientes são especialmente
                úteis quando você se sente sobrecarregado ou precisa renovar o
                foco. Faça sempre que precisar!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
