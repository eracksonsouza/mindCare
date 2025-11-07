import Link from 'next/link';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-6 text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Voltar ao início
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            🎯 Desafios de Bem-Estar
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Desafios diários para desenvolver hábitos saudáveis e cuidar da sua saúde mental
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Em Breve!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Estamos preparando desafios incríveis para você praticar autocuidado de forma divertida e consistente.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-6">
              <div className="text-3xl mb-2">📅</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Desafios Diários</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pequenas ações para praticar todo dia
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-6">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Sistema de Conquistas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Acompanhe seu progresso
              </p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/30 rounded-2xl p-6">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Desafios em Grupo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Participe com seus amigos
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-6">
              <div className="text-3xl mb-2">💪</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">Hábitos Saudáveis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Construa rotinas positivas
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
