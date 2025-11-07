# 💜 MindCare - Plataforma de Apoio Emocional para Estudantes

## 📖 Sobre o Projeto

MindCare é uma plataforma web desenvolvida especialmente para adolescentes estudantes que desejam cuidar de sua saúde emocional. A plataforma oferece um espaço seguro e anônimo para:

- 🎯 Fazer check-in emocional diário
- 🧘 Acessar microintervenções para autocuidado
- 📝 Praticar journaling e reflexão
- ⏱️ Gerenciar tempo de estudos com Pomodoro

## ✨ Funcionalidades

### 1. Check-in Emocional
- Interface interativa para identificar emoções (Feliz, Calmo, Neutro, Ansioso, Triste)
- Escala de intensidade emocional
- Completamente anônimo - dados salvos apenas no dispositivo

### 2. Microintervenções

#### 🧘 Respiração Consciente
- Técnica 4-4-4 guiada
- Animação visual do ciclo respiratório
- Contador de ciclos
- Duração: 3-5 minutos

#### 🧠 Meditação Guiada
- Duas opções de duração (5 e 10 minutos)
- Instruções passo a passo
- Timer visual com progresso

#### ⏱️ Técnica Pomodoro
- Timer de 25 minutos para estudo focado
- Pausas curtas (5 min) e longas (15 min)
- Sistema de tracking de pomodoros completados
- Notificações opcionais

#### ☕ Pausa Consciente
- Exercício 5-4-3-2-1 (ancoragem)
- Body Scan rápido
- Duração: 2-5 minutos
- Passo a passo guiado

#### 📝 Journaling Rápido
- Prompts reflexivos aleatórios
- Área de escrita livre
- Histórico de entradas privado
- Salvamento local seguro

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- npm ou yarn

### Instalação

1. Clone o repositório (ou use o projeto existente)

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Execute o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 🛠️ Tecnologias Utilizadas

- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **LocalStorage** - Armazenamento local para privacidade

## 📁 Estrutura do Projeto

\`\`\`
src/app/
├── (public)/
│   ├── page.tsx          # Página inicial
│   └── layout.tsx        # Layout principal
├── check-in/
│   ├── page.tsx          # Check-in emocional
│   └── success/
│       └── page.tsx      # Confirmação de check-in
├── interventions/
│   ├── page.tsx          # Lista de microintervenções
│   ├── breathing/        # Respiração consciente
│   ├── meditation/       # Meditação guiada
│   ├── pomodoro/         # Técnica Pomodoro
│   ├── mindful-break/    # Pausa consciente
│   └── journaling/       # Journaling rápido
└── challegens/
    └── page.tsx          # Desafios (em breve)
\`\`\`

## 🎨 Design

- Interface moderna e amigável para adolescentes
- Gradientes suaves e cores vibrantes
- Dark mode automático
- Animações suaves e interativas
- Responsivo para mobile e desktop

## 🔒 Privacidade

- **Totalmente anônimo** - não requer cadastro ou login
- **Dados locais** - todas as informações ficam no dispositivo
- **Nenhum tracking** - sem cookies ou analytics invasivos
- **Seguro** - nenhum dado é enviado para servidores

## 💡 Objetivos Pedagógicos

A plataforma foi desenvolvida com base em princípios de:

1. **Inteligência Emocional** - Reconhecer e nomear emoções
2. **Mindfulness** - Práticas de atenção plena
3. **Gestão de Tempo** - Técnicas de produtividade
4. **Expressão Emocional** - Journaling terapêutico
5. **Autocuidado** - Hábitos saudáveis para saúde mental

## 🚧 Próximas Funcionalidades

- [ ] Sistema de desafios diários
- [ ] Gráficos de evolução emocional
- [ ] Biblioteca de recursos educacionais
- [ ] Sons ambiente para meditação
- [ ] Modo de crise com recursos de emergência
- [ ] Compartilhamento anônimo de experiências

## 🤝 Contribuindo

Este é um projeto educacional focado no bem-estar de adolescentes. Sugestões e melhorias são bem-vindas!

## 📄 Licença

Este projeto é de uso educacional e desenvolvimento pessoal.

---

**Desenvolvido com 💜 para apoiar a saúde mental dos estudantes**
