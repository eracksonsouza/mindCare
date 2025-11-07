'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Phase = 'work' | 'break' | 'longBreak';

export default function PomodoroPage() {
  const [phase, setPhase] = useState<Phase>('work');
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const durations = {
    work: 25 * 60,
    break: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handlePhaseComplete = () => {
    // Notificação sonora (opcional - pode adicionar um beep)
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro', {
          body: phase === 'work' ? 'Hora da pausa!' : 'Hora de focar!',
        });
      }
    }

    if (phase === 'work') {
      const newCompleted = completedPomodoros + 1;
      setCompletedPomodoros(newCompleted);
      
      // A cada 4 pomodoros, pausa longa
      if (newCompleted % 4 === 0) {
        setPhase('longBreak');
        setTimeRemaining(durations.longBreak);
      } else {
        setPhase('break');
        setTimeRemaining(durations.break);
      }
    } else {
      setPhase('work');
      setTimeRemaining(durations.work);
    }
    
    setIsActive(false);
  };

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTimeRemaining(durations[phase]);
  };

  const skipPhase = () => {
    setIsActive(false);
    if (phase === 'work') {
      setPhase('break');
      setTimeRemaining(durations.break);
    } else {
      setPhase('work');
      setTimeRemaining(durations.work);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const getPhaseInfo = () => {
    switch (phase) {
      case 'work':
        return {
          title: 'Foco nos Estudos',
          emoji: '📚',
          color: 'from-red-400 to-orange-400',
          bgColor: 'from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900',
          message: 'Concentre-se em uma tarefa por vez',
        };
      case 'break':
        return {
          title: 'Pausa Curta',
          emoji: '☕',
          color: 'from-green-400 to-teal-400',
          bgColor: 'from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-green-900 dark:to-teal-900',
          message: 'Relaxe e recarregue as energias',
        };
      case 'longBreak':
        return {
          title: 'Pausa Longa',
          emoji: '🎉',
          color: 'from-purple-400 to-pink-400',
          bgColor: 'from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900',
          message: 'Ótimo trabalho! Faça uma pausa maior',
        };
    }
  };

  const info = getPhaseInfo();
  const progress = ((durations[phase] - timeRemaining) / durations[phase]) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${info.bgColor} font-sans p-4 flex items-center justify-center`}>
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Link
            href="/interventions"
            className="inline-block mb-4 text-red-600 dark:text-red-400 hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent mb-2">
            ⏱️ Técnica Pomodoro
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gerencie seu tempo com foco e pausas
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12">
          {/* Status atual */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{info.emoji}</div>
            <h2 className={`text-3xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-2`}>
              {info.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{info.message}</p>
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <div className="text-7xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-mono">
              {formatTime(timeRemaining)}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className={`bg-gradient-to-r ${info.color} h-4 rounded-full transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Pomodoros completados */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < completedPomodoros % 4
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {completedPomodoros} pomodoro{completedPomodoros !== 1 ? 's' : ''} completo{completedPomodoros !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {!isActive ? (
              <button
                onClick={start}
                className={`px-8 py-4 rounded-full bg-gradient-to-r ${info.color} text-white font-semibold hover:shadow-lg hover:scale-105 transition-all`}
              >
                {timeRemaining === durations[phase] ? 'Iniciar' : 'Continuar'}
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-8 py-4 rounded-full bg-yellow-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Pausar
              </button>
            )}
            <button
              onClick={reset}
              className="px-8 py-4 rounded-full bg-gray-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Resetar
            </button>
            <button
              onClick={skipPhase}
              className="px-8 py-4 rounded-full border-2 border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Pular
            </button>
          </div>

          {/* Notificações */}
          {typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default' && (
            <button
              onClick={requestNotificationPermission}
              className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              🔔 Ativar notificações
            </button>
          )}

          {/* Dicas */}
          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>💡 Como funciona:</strong> Trabalhe focado por 25 minutos, depois faça uma pausa de 5 minutos.
              A cada 4 pomodoros, faça uma pausa mais longa de 15 minutos!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
