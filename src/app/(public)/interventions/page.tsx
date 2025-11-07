import Link from 'next/link';
import { Wind, Brain, Timer, Coffee, FileText, Clock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type Intervention = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  duration: string;
  color: string;
};

const interventions: Intervention[] = [
  {
    id: 'breathing',
    title: 'Respiração Consciente',
    icon: Wind,
    description: 'Exercícios de respiração para acalmar a mente e reduzir a ansiedade',
    duration: '3-5 min',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'meditation',
    title: 'Meditação Guiada',
    icon: Brain,
    description: 'Meditação simples e guiada para relaxar e encontrar paz interior',
    duration: '5-10 min',
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 'pomodoro',
    title: 'Técnica Pomodoro',
    icon: Timer,
    description: 'Gerencie seu tempo de estudo com intervalos programados',
    duration: '25 + 5 min',
    color: 'from-red-400 to-orange-400',
  },
  {
    id: 'mindful-break',
    title: 'Pausa Consciente',
    icon: Coffee,
    description: 'Momento de mindfulness para recarregar suas energias',
    duration: '2-5 min',
    color: 'from-green-400 to-teal-400',
  },
  {
    id: 'journaling',
    title: 'Journaling Rápido',
    icon: FileText,
    description: 'Escreva sobre seus sentimentos e organize seus pensamentos',
    duration: '5-10 min',
    color: 'from-amber-400 to-yellow-400',
  },
];

export default function InterventionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-6 text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Voltar ao início
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Microintervenções
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Escolha uma atividade para cuidar do seu bem-estar emocional agora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {interventions.map((intervention) => (
            <Link
              key={intervention.id}
              href={`/interventions/${intervention.id}`}
              className="group"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${intervention.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <intervention.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {intervention.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {intervention.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {intervention.duration}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-center gap-2">
            <span className="text-2xl">💡</span>
            <span><strong>Dica:</strong> Experimente diferentes microintervenções e descubra qual funciona melhor para você!</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não existe uma resposta certa. Cada pessoa tem sua própria jornada de autocuidado.
          </p>
        </div>
      </div>
    </div>
  );
}
