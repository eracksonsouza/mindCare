'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 font-sans p-4">
      <main className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Check-in Realizado!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Parabéns por dedicar um momento para reconhecer suas emoções! 💜
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-6 mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Dica:</strong> Reconhecer suas emoções é o primeiro passo para cuidar da sua saúde mental.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Se você quiser relaxar ou se concentrar melhor, experimente nossas microintervenções!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/interventions"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Ver Microintervenções 🧘
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-full border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
          >
            Voltar ao Início
          </Link>
        </div>
      </main>
    </div>
  );
}
