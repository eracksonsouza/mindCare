# Componente Calendar - shadcn/ui

## ✅ Instalação Completa

O componente Calendar do shadcn/ui foi instalado com sucesso no projeto MindCare!

## 📦 O que foi instalado

- **Componentes:**
  - `src/components/ui/calendar.tsx` - Componente Calendar principal
  - `src/components/ui/button.tsx` - Componente Button (dependência)
  - `src/lib/utils.ts` - Utilitários para classes CSS

- **Dependências:**
  - `react-day-picker` - Biblioteca base para o calendário
  - `date-fns` - Manipulação de datas
  - `class-variance-authority` - Gerenciamento de variantes de classes

## 🎨 Implementações

### 1. Página de Check-in (`/check-in`)
O componente Calendar foi integrado na página de check-in, substituindo o seletor de dias anterior. Agora os usuários podem:
- Visualizar um calendário completo e interativo
- Selecionar qualquer data (limitado a datas passadas e hoje)
- Ver a data selecionada formatada em português
- Expandir/recolher o calendário

### 2. Página de Demonstração (`/calendar-demo`)
Uma página completa com exemplos de todos os modos do Calendar:
- **Seleção Única:** Escolher uma data
- **Seleção de Período:** Escolher um intervalo (data inicial e final)
- **Seleção Múltipla:** Escolher várias datas
- **Com Restrições:** Desabilitar fins de semana e datas futuras

## 🚀 Como usar

### Importação básica
```tsx
import { Calendar } from '@/components/ui/calendar';
```

### Exemplo: Seleção única
```tsx
const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

### Exemplo: Seleção de período
```tsx
const [dateRange, setDateRange] = useState<{
  from: Date | undefined;
  to?: Date | undefined;
}>({
  from: new Date(),
  to: undefined,
});

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
  className="rounded-md border"
/>
```

### Exemplo: Múltiplas datas
```tsx
const [dates, setDates] = useState<Date[] | undefined>([]);

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
  className="rounded-md border"
/>
```

### Exemplo: Com datas desabilitadas
```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(date) => {
    // Desabilitar datas futuras
    return date > new Date();
  }}
  className="rounded-md border"
/>
```

## 🎯 Propriedades principais

| Propriedade | Tipo | Descrição |
|------------|------|-----------|
| `mode` | `"single" \| "multiple" \| "range"` | Modo de seleção |
| `selected` | `Date \| Date[] \| { from: Date, to?: Date }` | Data(s) selecionada(s) |
| `onSelect` | `Function` | Callback quando uma data é selecionada |
| `disabled` | `boolean \| Function` | Desabilitar datas específicas |
| `numberOfMonths` | `number` | Número de meses a exibir |
| `showOutsideDays` | `boolean` | Mostrar dias fora do mês atual |
| `className` | `string` | Classes CSS customizadas |

## 🎨 Customização

O componente usa Tailwind CSS e pode ser customizado através de:
- Classes CSS diretas via prop `className`
- Modificação do arquivo `calendar.tsx`
- Ajuste das variáveis CSS em `globals.css`

## 📱 Responsividade

O componente é totalmente responsivo e funciona bem em:
- 📱 Mobile (smartphones)
- 📱 Tablets
- 💻 Desktop

## 🌐 Localização

Para localização em português, você pode usar bibliotecas como `date-fns/locale`:

```tsx
import { ptBR } from 'date-fns/locale';

// Configure conforme necessário
```

## 🔗 Links úteis

- [Documentação oficial do shadcn/ui Calendar](https://ui.shadcn.com/docs/components/calendar)
- [react-day-picker (biblioteca base)](https://react-day-picker.js.org/)
- [date-fns (manipulação de datas)](https://date-fns.org/)

## 🎯 Próximos passos

1. ✅ Componente instalado
2. ✅ Integrado na página de check-in
3. ✅ Página de demonstração criada
4. 🎨 Personalizar estilos conforme design do MindCare
5. 🌍 Adicionar localização completa em PT-BR
6. 📊 Integrar com outras funcionalidades (relatórios, estatísticas, etc.)

## 💡 Dicas

- Use `disabled` para prevenir seleção de datas inválidas
- Combine com outros componentes do shadcn/ui para criar interfaces mais complexas
- O componente já está estilizado de acordo com o tema do MindCare (dark mode suportado)
