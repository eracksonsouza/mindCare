'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BreathingPage() {
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const sequence = [
      { phase: 'inhale' as const, duration: 4000, text: 'Inspire' },
      { phase: 'hold' as const, duration: 4000, text: 'Segure' },
      { phase: 'exhale' as const, duration: 4000, text: 'Expire' },
      { phase: 'hold' as const, duration: 2000, text: 'Pausa' },
    ];

    let currentStep = 0;
    let countInterval: NodeJS.Timeout;
    let phaseTimeout: NodeJS.Timeout;

    const nextPhase = () => {
      const current = sequence[currentStep];
      setPhase(current.phase);
      setCount(0);

      // Contador visual
      const countDuration = current.duration / 1000;
      let currentCount = 0;
      countInterval = setInterval(() => {
        currentCount++;
        setCount(currentCount);
        if (currentCount >= countDuration) {
          clearInterval(countInterval);
        }
      }, 1000);

      phaseTimeout = setTimeout(() => {
        currentStep = (currentStep + 1) % sequence.length;
        if (currentStep === 0) {
          setCycles(prev => prev + 1);
        }
        nextPhase();
      }, current.duration);
    };

    nextPhase();

    return () => {
      clearInterval(countInterval);
      clearTimeout(phaseTimeout);
    };
  }, [isActive]);

  const start = () => {
    setIsActive(true);
    setCycles(0);
  };

  const stop = () => {
    setIsActive(false);
    setPhase('ready');
    setCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inspire profundamente pelo nariz';
      case 'hold': return count <= 4 ? 'Segure a respiração' : 'Pequena pausa';
      case 'exhale': return 'Expire lentamente pela boca';
      default: return 'Pressione começar quando estiver pronto';
    }
  };

  const getCircleSize = () => {
    switch (phase) {
      case 'inhale': return 'scale-150';
      case 'hold': return 'scale-150';
      case 'exhale': return 'scale-100';
      default: return 'scale-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900 font-sans p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link
            href="/interventions"
            className="inline-block mb-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
            🧘 Respiração Consciente
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Técnica 4-4-4 para acalmar a mente
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
          {/* Círculo de respiração */}
          <div className="flex items-center justify-center mb-8 h-64">
            <div className="relative">
              <div
                className={`
                  w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400
                  flex items-center justify-center
                  transition-all duration-4000 ease-in-out
                  ${getCircleSize()}
                  ${isActive ? 'opacity-80' : 'opacity-40'}
                `}
              >
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">
                    {isActive ? count : '•'}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-wide">
                    {phase === 'ready' ? 'Pronto' : phase === 'inhale' ? 'Inspire' : phase === 'exhale' ? 'Expire' : 'Segure'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instruções */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 dark:text-gray-200 font-medium mb-4">
              {getPhaseText()}
            </p>
            {isActive && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ciclo {cycles + 1} • Continue por 3-5 minutos
              </p>
            )}
          </div>

          {/* Controles */}
          <div className="flex justify-center gap-4">
            {!isActive ? (
              <button
                onClick={start}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Começar
              </button>
            ) : (
              <button
                onClick={stop}
                className="px-8 py-4 rounded-full bg-red-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Parar
              </button>
            )}
          </div>

          {/* Dicas */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>💡 Dica:</strong> Encontre uma posição confortável, feche os olhos se quiser,
              e concentre-se apenas na sua respiração. Se a mente divagar, gentilmente traga sua atenção de volta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
