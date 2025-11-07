# 🚀 Guia Rápido - MindCare

## Como usar a plataforma

### 1️⃣ Página Inicial
Ao acessar `http://localhost:3000`, você verá:
- Apresentação da plataforma MindCare
- Botões para "Fazer Check-in" e "Ver Microintervenções"
- Cards mostrando as funcionalidades disponíveis

### 2️⃣ Check-in Emocional (`/check-in`)
1. Escolha uma das 5 emoções disponíveis:
   - 😊 Feliz
   - 😌 Calmo
   - 😐 Neutro
   - 😰 Ansioso
   - 😢 Triste

2. Ajuste a intensidade de 1 a 10

3. Clique em "Continuar"

4. Se a emoção for negativa e intensa, você será redirecionado para as microintervenções

5. Caso contrário, verá uma mensagem de sucesso

**Nota:** Todos os dados são salvos no localStorage do navegador e são completamente anônimos.

### 3️⃣ Microintervenções (`/interventions`)

#### 🧘 Respiração Consciente (`/interventions/breathing`)
- **Técnica:** 4-4-4 (4s inspirar, 4s segurar, 4s expirar)
- **Como usar:**
  1. Clique em "Começar"
  2. Acompanhe o círculo e o contador
  3. Respire seguindo as instruções
  4. Continue por 3-5 minutos

#### 🧠 Meditação Guiada (`/interventions/meditation`)
- **Durações:** 5 ou 10 minutos
- **Como usar:**
  1. Escolha a duração
  2. Leia os passos que serão guiados
  3. Clique em "Começar Meditação"
  4. Siga as instruções que aparecem na tela

#### ⏱️ Técnica Pomodoro (`/interventions/pomodoro`)
- **Ciclo:** 25min foco + 5min pausa (pausa longa de 15min a cada 4 ciclos)
- **Como usar:**
  1. Clique em "Iniciar" quando estiver pronto para estudar
  2. Foque nos estudos durante os 25 minutos
  3. Faça uma pausa quando o timer acabar
  4. Repita o processo

**Dica:** Ative as notificações do navegador para ser avisado quando os timers terminarem!

#### ☕ Pausa Consciente (`/interventions/mindful-break`)
- **Exercícios disponíveis:**
  - Exercício 5-4-3-2-1 (5 minutos)
  - Body Scan Rápido (3 minutos)

- **Como usar:**
  1. Escolha o exercício
  2. Clique em "Começar Exercício"
  3. Siga as instruções passo a passo

#### 📝 Journaling Rápido (`/interventions/journaling`)
- **Como usar:**
  1. Leia o prompt reflexivo sugerido
  2. Escreva livremente sobre seus sentimentos
  3. Clique em "Salvar" quando terminar
  4. Acesse seu histórico clicando em "Mostrar"

**Privacidade:** Todas as entradas são salvas apenas no seu dispositivo!

### 4️⃣ Desafios (`/challegens`)
- **Status:** Em desenvolvimento
- Futuramente terá desafios diários de bem-estar

## 🎯 Dicas de Uso

### Para melhor experiência:

1. **Regularidade:** Use o check-in diariamente
2. **Variedade:** Experimente diferentes microintervenções
3. **Honestidade:** Seja sincero sobre suas emoções
4. **Persistência:** Leva tempo para criar hábitos saudáveis
5. **Privacidade:** Seus dados nunca saem do seu dispositivo

### Quando usar cada intervenção:

- **Ansioso/Estressado:** Respiração Consciente ou Pausa Consciente
- **Dificuldade de foco:** Técnica Pomodoro
- **Precisa relaxar:** Meditação Guiada
- **Emoções confusas:** Journaling Rápido
- **Cansado mental:** Pausa Consciente (Body Scan)

## 📱 Responsividade

A plataforma funciona em:
- 💻 Desktop
- 📱 Tablet
- 📱 Smartphone

Adapta-se automaticamente ao tamanho da tela!

## 🌙 Dark Mode

O tema escuro é ativado automaticamente baseado nas preferências do sistema operacional.

## 🔧 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 💡 Sugestões de Melhoria Futura

1. Sons ambiente para meditação
2. Gráficos de evolução emocional
3. Modo de crise com recursos de emergência
4. Integração com calendário para desafios
5. Exportação de dados do journaling

---

**Aproveite o MindCare e cuide bem de você! 💜**
