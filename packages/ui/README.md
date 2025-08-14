# @koeprefeito/ui

Biblioteca de componentes UI para a plataforma KoePrefeito, construída com React, TypeScript e Tailwind CSS.

## 🎨 Design System

### Cores

O design system utiliza uma paleta de cores consistente com foco em acessibilidade:

- **Primary**: Azul institucional (#1E40AF) - Cor principal da plataforma
- **Success**: Verde (#059669) - Estados de sucesso e confirmação 
- **Warning**: Laranja (#EA580C) - Alertas e avisos
- **Error**: Vermelho (#DC2626) - Erros e ações destrutivas
- **Gray**: Escala de cinzas para texto e backgrounds

### Tipografia

- **Font Family**: Inter (sistema principal)
- **Tamanhos**: xs (12px) até 6xl (60px)
- **Pesos**: normal, medium, semibold, bold, extrabold

### Espaçamento

Sistema baseado em múltiplos de 4px:
- 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, etc.

## 📦 Componentes

### Core Components

#### Button
Componente de botão com múltiplas variantes e tamanhos.

```tsx
import { Button } from "@koeprefeito/ui";

<Button variant="primary" size="md">
  Clique aqui
</Button>

<Button variant="outline" size="lg" asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

**Variantes**: primary, secondary, outline, ghost, destructive, success, warning
**Tamanhos**: sm, md, lg, xl, icon

#### Input
Campo de entrada com suporte a ícones, validação e estados.

```tsx
import { Input } from "@koeprefeito/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

<Input 
  label="Email"
  placeholder="seu@email.com"
  error="Email é obrigatório"
/>

<Input 
  placeholder="Buscar..."
  startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
/>
```

#### Textarea
Área de texto expansível com contador de caracteres.

```tsx
import { Textarea } from "@koeprefeito/ui";

<Textarea 
  label="Descrição"
  maxLength={500}
  showCount
  placeholder="Descreva o problema..."
/>
```

#### Select
Componente de seleção estilizado com Headless UI.

```tsx
import { Select } from "@koeprefeito/ui";

const options = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
];

<Select 
  label="Estado"
  options={options}
  value={selectedState}
  onChange={setSelectedState}
/>
```

#### Card
Container flexível para organizar conteúdo.

```tsx
import { Card, CardHeader, CardContent } from "@koeprefeito/ui";

<Card>
  <CardHeader>
    <h3>Título do Card</h3>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card...</p>
  </CardContent>
</Card>
```

#### Badge
Indicadores visuais para status e categorias.

```tsx
import { Badge } from "@koeprefeito/ui";

<Badge variant="success">Resolvido</Badge>
<Badge variant="warning" size="sm">Em Andamento</Badge>
```

#### Modal
Diálogos modais com Headless UI.

```tsx
import { Modal, ModalHeader, ModalContent, ModalFooter } from "@koeprefeito/ui";

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>
    Confirmar Ação
  </ModalHeader>
  <ModalContent>
    <p>Tem certeza que deseja continuar?</p>
  </ModalContent>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      Cancelar
    </Button>
    <Button onClick={handleConfirm}>
      Confirmar
    </Button>
  </ModalFooter>
</Modal>
```

### Feedback Components

#### Toast
Notificações temporárias.

```tsx
import { Toast, ToastContainer } from "@koeprefeito/ui";

<ToastContainer position="top-right">
  <Toast 
    variant="success"
    title="Sucesso!"
    description="Solicitação enviada com sucesso"
    onClose={() => {}}
  />
</ToastContainer>
```

#### Spinner
Indicadores de carregamento.

```tsx
import { Spinner, LoadingOverlay, InlineLoading } from "@koeprefeito/ui";

<Spinner size="lg" variant="primary" />

<LoadingOverlay isLoading={loading}>
  <div>Conteúdo que pode estar carregando...</div>
</LoadingOverlay>

<InlineLoading text="Salvando..." />
```

#### Progress
Barras de progresso lineares e circulares.

```tsx
import { Progress, CircularProgress } from "@koeprefeito/ui";

<Progress 
  value={75} 
  max={100} 
  label="Upload do arquivo"
  showValue
/>

<CircularProgress 
  value={60}
  size={120}
  variant="primary"
  label="Processando"
/>
```

#### Skeleton
Placeholders de carregamento.

```tsx
import { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonAvatar 
} from "@koeprefeito/ui";

<Skeleton className="h-4 w-full" />
<SkeletonText lines={3} />
<SkeletonCard />
<SkeletonAvatar size="lg" />
```

### Display Components

#### Avatar
Avatares de usuário com fallback para iniciais.

```tsx
import { Avatar, AvatarGroup } from "@koeprefeito/ui";

<Avatar 
  src="https://example.com/avatar.jpg"
  alt="João Silva"
  fallback="João Silva"
  size="lg"
/>

<AvatarGroup max={3} size="md">
  <Avatar src="..." alt="User 1" />
  <Avatar src="..." alt="User 2" />
  <Avatar src="..." alt="User 3" />
  <Avatar src="..." alt="User 4" />
</AvatarGroup>
```

## 🛠️ Utilitários

### cn (className utility)
Função para combinar classes CSS com tailwind-merge.

```tsx
import { cn } from "@koeprefeito/ui";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

### Funções de formatação
```tsx
import { formatDate, formatDateTime, truncateText } from "@koeprefeito/ui";

formatDate(new Date()) // "15 de janeiro de 2024"
formatDateTime(new Date()) // "15 de jan de 2024, 14:30"
truncateText("Texto muito longo...", 20) // "Texto muito longo..."
```

## 🎨 Design Tokens

### Usando as cores do tema
```tsx
import { colors, theme } from "@koeprefeito/ui";

// Acessar cores individuais
const primaryColor = colors.primary[500]; // #1E40AF

// Usar o tema completo
const buttonStyles = {
  backgroundColor: theme.colors.primary[500],
  borderRadius: theme.borderRadius.lg,
  padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
};
```

## 📱 Responsividade

Todos os componentes são responsivos por padrão. Use os breakpoints do tema:

```tsx
// Breakpoints disponíveis
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large desktop
```

## ♿ Acessibilidade

- Todos os componentes seguem as diretrizes WCAG 2.1
- Suporte completo a navegação por teclado
- Labels e descrições adequadas para screen readers
- Contraste de cores em conformidade com AA
- Estados de foco visíveis

## 🔧 Customização

### Extendendo componentes
```tsx
import { Button, type ButtonProps } from "@koeprefeito/ui";
import { cn } from "@koeprefeito/ui";

interface CustomButtonProps extends ButtonProps {
  gradient?: boolean;
}

export function CustomButton({ gradient, className, ...props }: CustomButtonProps) {
  return (
    <Button 
      className={cn(
        gradient && "bg-gradient-to-r from-primary-500 to-primary-600",
        className
      )}
      {...props}
    />
  );
}
```

### Variantes personalizadas
Use `class-variance-authority` para criar novas variantes:

```tsx
import { cva } from "class-variance-authority";

const customVariants = cva(
  "base-classes",
  {
    variants: {
      intent: {
        primary: "bg-primary-500",
        custom: "bg-gradient-to-r from-purple-500 to-pink-500",
      },
    },
  }
);
```

## 📝 Contribuição

1. Siga as convenções de nomenclatura existentes
2. Adicione testes para novos componentes
3. Documente props e exemplos de uso
4. Mantenha acessibilidade em foco
5. Use TypeScript para type safety

## 🔗 Links Úteis

- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.com)
- [Heroicons](https://heroicons.com)
- [Class Variance Authority](https://cva.style)
- [Radix UI](https://radix-ui.com)