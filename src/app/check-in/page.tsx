'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Emotion = {
  emoji: string;
  label: string;
  value: string;
  color: string;
};

const emotions: Emotion[] = [
  { emoji: '😊', label: 'Feliz', value: 'happy', color: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
  { emoji: '😌', label: 'Calmo', value: 'calm', color: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
  { emoji: '😐', label: 'Neutro', value: 'neutral', color: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
  { emoji: '😰', label: 'Ansioso', value: 'anxious', color: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
  { emoji: '😢', label: 'Triste', value: 'sad', color: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
];

const CheckInPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const router = useRouter();

  const handleSubmit = () => {
    if (selectedEmotion) {
      // Salvar no localStorage (anonimamente)
      const checkIn = {
        emotion: selectedEmotion,
        intensity,
        timestamp: new Date().toISOString(),
      };
      
      const checkIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
      checkIns.push(checkIn);
      localStorage.setItem('checkIns', JSON.stringify(checkIns));
      
      // Redirecionar baseado na emoção
      if (['anxious', 'sad'].includes(selectedEmotion) && intensity >= 6) {
        router.push('/interventions');
      } else {
        router.push('/check-in/success');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <main className="w-full max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Como você está se sentindo agora?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tire um momento para reconhecer suas emoções
          </p>
        </div>

        {/* Seleção de Emoções */}
        <div className="flex gap-3 mb-6">
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => setSelectedEmotion(emotion.value)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border
                transition-all duration-200
                ${selectedEmotion === emotion.value 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                {emotion.label}
              </span>
            </button>
          ))}
        </div>

        {/* Intensidade */}
        {selectedEmotion && (
          <div className="mb-8 animate-fadeIn">
            <label className="block mb-4 text-base font-medium text-gray-700 dark:text-gray-200">
              Qual a intensidade? (1-10)
            </label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Pouco</span>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">Muito</span>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400 w-8 text-center">
                {intensity}
              </span>
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/')}
            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedEmotion}
            className={`
              px-5 py-2.5 rounded-lg font-medium transition-all
              ${selectedEmotion
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Continuar
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          🔒 Seu check-in é completamente anônimo e seguro
        </p>
      </main>
    </div>
  );
}

export default CheckInPage;
