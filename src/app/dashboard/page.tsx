'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Smile, Meh, Frown, AlertCircle, SmilePlus, Activity, TrendingUp, Calendar, Sparkles, Heart, Lightbulb } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type CheckIn = {
  emotion: string;
  intensity: number;
  timestamp: string;
};

type DayData = {
  day: string;
  dayName: string;
  icon: LucideIcon;
  intensity: number;
  emotion: string;
  color: string;
};

const emotionConfig: Record<string, { icon: LucideIcon; label: string; color: string; value: number }> = {
  happy: { icon: SmilePlus, label: 'Feliz', color: 'from-green-400 to-emerald-400', value: 10 },
  calm: { icon: Smile, label: 'Calmo', color: 'from-blue-400 to-cyan-400', value: 8 },
  neutral: { icon: Meh, label: 'Neutro', color: 'from-gray-400 to-slate-400', value: 6 },
  anxious: { icon: AlertCircle, label: 'Ansioso', color: 'from-yellow-400 to-orange-400', value: 4 },
  sad: { icon: Frown, label: 'Triste', color: 'from-red-400 to-pink-400', value: 2 },
};

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function DashboardPage() {
  const [weekData, setWeekData] = useState<DayData[]>([]);
  const [average, setAverage] = useState(0);
  const [saddestDay, setSaddestDay] = useState<DayData | null>(null);
  const [happiesDay, setHappiestDay] = useState<DayData | null>(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    loadWeekData();
  }, []);

  const loadWeekData = () => {
    const checkIns: CheckIn[] = JSON.parse(localStorage.getItem('checkIns') || '[]');
    
    if (checkIns.length === 0) {
      setHasData(false);
      return;
    }

    setHasData(true);

    // Pegar os últimos 7 dias
    const today = new Date();
    const weekDays: DayData[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      // Filtrar check-ins do dia
      const dayCheckIns = checkIns.filter(checkIn => {
        const checkInDate = new Date(checkIn.timestamp);
        return checkInDate >= date && checkInDate < nextDay;
      });

      // Calcular média do dia (se tiver check-ins)
      let dayEmotionValue = 5;
      let dayIntensity = 5;
      let dayEmotion = 'neutral';
      
      if (dayCheckIns.length > 0) {
        // Usar o último check-in do dia
        const lastCheckIn = dayCheckIns[dayCheckIns.length - 1];
        dayEmotion = lastCheckIn.emotion;
        dayIntensity = lastCheckIn.intensity;
        
        // Calcular valor baseado na emoção e intensidade
        const baseValue = emotionConfig[dayEmotion]?.value || 5;
        dayEmotionValue = dayIntensity;
      }

      const config = emotionConfig[dayEmotion] || emotionConfig.neutral;
      
      weekDays.push({
        day: date.getDate().toString(),
        dayName: dayNames[date.getDay()],
        icon: config.icon,
        intensity: dayIntensity,
        emotion: config.label,
        color: config.color,
      });
    }

    setWeekData(weekDays);

    // Calcular média da semana
    const validDays = weekDays.filter(d => d.intensity > 0);
    if (validDays.length > 0) {
      const avg = validDays.reduce((sum, day) => sum + day.intensity, 0) / validDays.length;
      setAverage(Math.round(avg * 10) / 10);
    }

    // Encontrar dia mais triste e mais feliz
    const sadDays = weekDays.filter(d => d.emotion === 'Triste' || d.emotion === 'Ansioso');
    if (sadDays.length > 0) {
      const saddest = sadDays.reduce((prev, curr) => prev.intensity > curr.intensity ? prev : curr);
      setSaddestDay(saddest);
    }

    const happyDays = weekDays.filter(d => d.emotion === 'Feliz' || d.emotion === 'Calmo');
    if (happyDays.length > 0) {
      const happiest = happyDays.reduce((prev, curr) => prev.intensity > curr.intensity ? prev : curr);
      setHappiestDay(happiest);
    }
  };

  const getInsight = () => {
    if (!hasData) {
      return "Você ainda não tem check-ins registrados. Comece a registrar suas emoções para ver insights!";
    }

    let insight = "Você teve uma semana ";
    
    if (average >= 7) {
      insight += "geralmente positiva! Suas emoções parecem mais equilibradas. ";
    } else if (average >= 5) {
      insight += "com altos e baixos. É normal ter dias diferentes. ";
    } else {
      insight += "mais desafiadora. Lembre-se de ser gentil consigo mesmo. ";
    }

    if (saddestDay) {
      insight += `${saddestDay.dayName} parece ter sido um dia mais difícil (${saddestDay.emotion} ${saddestDay.intensity}/10). `;
      insight += "Que tal agendar uma microintervenção para momentos assim? ";
    }

    if (happiesDay) {
      insight += `${happiesDay.dayName} foi um dia especialmente bom! `;
    }

    return insight;
  };

  const getAverageIcon = () => {
    if (average >= 8) return SmilePlus;
    if (average >= 6) return Smile;
    if (average >= 4) return Meh;
    if (average >= 2) return AlertCircle;
    return Frown;
  };

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-block mb-4 text-purple-600 dark:text-purple-400 hover:underline"
            >
              ← Voltar ao início
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
              <Activity className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              Sua Semana Emocional
            </h1>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-6">
              <TrendingUp className="w-16 h-16 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Comece Seu Registro
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Você ainda não tem check-ins registrados. Faça seu primeiro check-in para começar a acompanhar sua jornada emocional!
            </p>
            <Link
              href="/check-in"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Fazer Check-in Agora
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block mb-4 text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Voltar ao início
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <Activity className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            Sua Semana Emocional
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Acompanhe como você se sentiu nos últimos 7 dias
          </p>
        </div>

        {/* Card principal com a semana */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Sua Semana Emocional
            </h2>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 px-4 py-2 rounded-full">
              {(() => {
                const AverageIcon = getAverageIcon();
                return <AverageIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
              })()}
              <span className="font-bold text-gray-800 dark:text-gray-100">
                Média: {average.toFixed(1)}/10
              </span>
            </div>
          </div>

          {/* Visualização da semana */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-6">
            {weekData.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {day.dayName}
                  </span>
                  <div
                    className={`
                      w-full aspect-square rounded-2xl 
                      bg-gradient-to-br ${day.color}
                      flex flex-col items-center justify-center
                      shadow-lg hover:scale-105 transition-transform
                      ${day.intensity === 0 ? 'opacity-30' : ''}
                    `}
                  >
                    <DayIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-1" />
                    <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md">
                      {day.intensity > 0 ? `${day.intensity}/10` : '-'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Barra de progresso visual */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-1000 rounded-full flex items-center justify-end pr-2"
              style={{ width: `${(average / 10) * 100}%` }}
            >
              <span className="text-xs font-bold text-white drop-shadow-md">
                {average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Card de Insights */}
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-3xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-10 h-10 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                Insight da Semana
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {getInsight()}
              </p>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* Melhor dia */}
          {happiesDay && (() => {
            const HappyIcon = happiesDay.icon;
            return (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <HappyIcon className="w-8 h-8 text-green-500" />
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Melhor Dia
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong className="text-purple-600 dark:text-purple-400">{happiesDay.dayName}</strong> foi seu dia mais positivo, 
                  com {happiesDay.emotion} de intensidade {happiesDay.intensity}/10!
                </p>
              </div>
            );
          })()}

          {/* Dia mais desafiador */}
          {saddestDay && (() => {
            const SadIcon = saddestDay.icon;
            return (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <SadIcon className="w-8 h-8 text-red-500" />
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Dia Mais Desafiador
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong className="text-purple-600 dark:text-purple-400">{saddestDay.dayName}</strong> parece ter sido mais difícil.
                  Lembre-se: dias ruins são temporários.
                </p>
              </div>
            );
          })()}
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/check-in"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all text-center"
          >
            Fazer Novo Check-in
          </Link>
          <Link
            href="/interventions"
            className="px-8 py-4 rounded-full border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center"
          >
            Ver Microintervenções
          </Link>
        </div>

        {/* Dica */}
        <div className="mt-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span><strong>Dica:</strong> Check-ins regulares ajudam você a entender seus padrões emocionais e identificar o que te faz bem!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
