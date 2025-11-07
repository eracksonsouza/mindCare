'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const meditations = [
  {
    duration: 5,
    title: 'Meditação Rápida',
    steps: [
      'Sente-se confortavelmente e feche os olhos',
      'Respire naturalmente e observe sua respiração',
      'Note os pensamentos sem julgá-los',
      'Traga sua atenção de volta à respiração',
      'Sinta seu corpo relaxando a cada expiração',
    ],
  },
  {
    duration: 10,
    title: 'Meditação Completa',
    steps: [
      'Encontre uma posição confortável',
      'Feche os olhos e respire profundamente 3 vezes',
      'Escaneie seu corpo dos pés à cabeça',
      'Observe as sensações sem tentar mudá-las',
      'Note os sons ao seu redor sem julgamento',
      'Volte à sua respiração sempre que se distrair',
      'Cultive sentimentos de gratidão e paz',
    ],
  },
];

export default function MeditationPage() {
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);

  const currentMeditation = meditations.find(m => m.duration === selectedDuration) || meditations[0];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const stepDuration = (selectedDuration * 60) / currentMeditation.steps.length;
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < currentMeditation.steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration * 1000);

    return () => clearInterval(stepTimer);
  }, [isActive, selectedDuration, currentMeditation.steps.length]);

  const start = () => {
    setIsActive(true);
    setTimeRemaining(selectedDuration * 60);
    setCurrentStep(0);
  };

  const stop = () => {
    setIsActive(false);
    setTimeRemaining(selectedDuration * 60);
    setCurrentStep(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration * 60 - timeRemaining) / (selectedDuration * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 font-sans p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link
            href="/interventions"
            className="inline-block mb-4 text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
            🧠 Meditação Guiada
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Encontre paz e clareza mental
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
          {!isActive ? (
            <>
              {/* Seleção de duração */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
                  Escolha a duração
                </h2>
                <div className="flex gap-4 justify-center">
                  {meditations.map((med) => (
                    <button
                      key={med.duration}
                      onClick={() => {
                        setSelectedDuration(med.duration);
                        setTimeRemaining(med.duration * 60);
                      }}
                      className={`
                        px-6 py-3 rounded-2xl font-semibold transition-all
                        ${selectedDuration === med.duration
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105'
                        }
                      `}
                    >
                      {med.duration} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview dos passos */}
              <div className="mb-8 bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  {currentMeditation.title}
                </h3>
                <ul className="space-y-2">
                  {currentMeditation.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={start}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Começar Meditação
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Timer */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                  {formatTime(timeRemaining)}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Passo atual */}
              <div className="mb-8 bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-6 text-center">
                <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                  Passo {currentStep + 1} de {currentMeditation.steps.length}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-200">
                  {currentMeditation.steps[currentStep]}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={stop}
                  className="px-8 py-4 rounded-full bg-red-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Parar
                </button>
              </div>
            </>
          )}

          {/* Dicas */}
          <div className="mt-8 bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>💡 Dica:</strong> Não se preocupe se sua mente vagar. É completamente normal! 
              Apenas reconheça gentilmente e traga sua atenção de volta ao momento presente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
