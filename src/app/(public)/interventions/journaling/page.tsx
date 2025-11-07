'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, RefreshCw, Save, BookOpen, Lock, Lightbulb, Trash2, MessageCircle, CheckCircle } from 'lucide-react';

const prompts = [
  'Como você está se sentindo agora?',
  'O que está ocupando sua mente hoje?',
  'Pelo que você é grato hoje?',
  'O que te deixou feliz ou triste hoje?',
  'Que desafio você enfrentou recentemente?',
  'O que você gostaria de realizar amanhã?',
  'Como você pode ser gentil consigo mesmo hoje?',
  'O que te fez sorrir hoje?',
];

type JournalEntry = {
  id: string;
  date: string;
  prompt: string;
  content: string;
};

export default function JournalingPage() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [journalText, setJournalText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Carregar entradas do localStorage
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    
    // Selecionar prompt aleatório
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const saveEntry = () => {
    if (!journalText.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      prompt: currentPrompt,
      content: journalText,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    setIsSaved(true);
    setTimeout(() => {
      setJournalText('');
      setIsSaved(false);
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }, 2000);
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-amber-900 dark:to-yellow-900 font-sans p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <Link
            href="/interventions"
            className="inline-block mb-4 text-amber-600 dark:text-amber-400 hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <FileText className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            Journaling Rápido
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Expresse seus sentimentos e organize seus pensamentos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Área de escrita */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            {!isSaved ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <MessageCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    {currentPrompt}
                  </h2>
                  <button
                    onClick={() => setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)])}
                    className="text-sm text-amber-600 dark:text-amber-400 hover:underline mx-auto flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Mudar pergunta
                  </button>
                </div>

                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Escreva livremente... Não há certo ou errado."
                  className="w-full h-64 p-4 bg-amber-50/50 dark:bg-gray-700/50 border-2 border-amber-200 dark:border-amber-800 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 dark:text-gray-100"
                />

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {journalText.length} caracteres
                  </span>
                  <button
                    onClick={saveEntry}
                    disabled={!journalText.trim()}
                    className={`
                      px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2
                      ${journalText.trim()
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>

                <div className="mt-6 bg-amber-50 dark:bg-amber-900/30 rounded-2xl p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
                    <span><strong>Dica:</strong> Escrever sobre seus sentimentos ajuda a processá-los
                    e entender melhor o que está acontecendo dentro de você. Seja honesto e gentil consigo mesmo.</span>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Salvo com sucesso!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Suas reflexões foram guardadas de forma privada
                </p>
              </div>
            )}
          </div>

          {/* Histórico */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Suas Reflexões
              </h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-amber-600 dark:text-amber-400 hover:underline text-sm"
              >
                {showHistory ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {showHistory && (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {entries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="flex justify-center mb-2">
                      <BookOpen className="w-12 h-12" />
                    </div>
                    <p className="text-sm">Nenhuma entrada ainda</p>
                  </div>
                ) : (
                  entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-amber-50/50 dark:bg-gray-700/50 rounded-2xl p-4 border border-amber-200 dark:border-amber-800"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(entry.date)}
                        </span>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {entry.prompt}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {entry.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="mt-6 bg-orange-50 dark:bg-orange-900/30 rounded-2xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <Lock className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                <span><strong>Privacidade:</strong> Suas entradas são salvas apenas no seu dispositivo
                e nunca são enviadas para nenhum servidor. Só você tem acesso a elas.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
