import Link from "next/link";
import { Sparkles, Activity, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-6 sm:px-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="mb-4">
            <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
              MindCare
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Seu espaço seguro para cuidar das emoções
            </p>
          </div>

          <div className="max-w-2xl space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              Bem-vindo(a) ao MindCare! Um espaço criado especialmente para
              você, estudante, que quer aprender a reconhecer e cuidar das suas
              emoções.
            </p>
            <p className="text-lg leading-relaxed">
              Aqui você pode fazer check-in das suas emoções de forma anônima e
              acessar microintervenções que vão te ajudar a se acalmar, focar e
              se sentir melhor.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/check-in"
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-blue-600 px-8 text-white text-lg font-semibold transition-all hover:shadow-lg hover:scale-105 dark:from-purple-500 dark:to-blue-500"
            >
              <Sparkles className="w-5 h-5" />
              Fazer Check-in Agora
            </Link>
            <Link
              href="/interventions"
              className="flex h-14 items-center justify-center rounded-full border-2 border-purple-600 dark:border-purple-400 px-8 text-purple-600 dark:text-purple-400 text-lg font-semibold transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              Ver Microintervenções
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="mt-4 text-purple-600 dark:text-purple-400 hover:underline font-semibold flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5" />
            Ver Meu Dashboard Emocional
          </Link>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 max-w-md flex items-start gap-2">
            <Heart className="w-5 h-5 mt-0.5 shrink-0" />
            <span>
              Lembre-se: Suas emoções são válidas. Não há resposta certa ou
              errada. Este é um espaço seguro e anônimo para você.
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
