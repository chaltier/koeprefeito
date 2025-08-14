# 📋 Critérios de Aceitação Detalhados - Primeiras Histórias

## 🎯 **Objetivo**
Detalhar critérios de aceitação específicos, testáveis e completos para as primeiras histórias do KoePrefeito, garantindo que todos os cenários sejam cobertos e que a implementação atenda exatamente às necessidades do produto.

---

## 🏗️ **Epic 1.1: História 1.1.1 - Setup do Monorepo**

### **Critérios de Aceitação Detalhados:**

#### **AC1: Estrutura Turborepo Funcional**
- **DADO** que sou um desenvolvedor querendo trabalhar no projeto
- **QUANDO** eu clono o repositório e executo `npm install`
- **ENTÃO** todas as dependências são instaladas sem erros
- **E** a estrutura de diretórios segue o padrão:
  ```
  koeprefeito/
  ├── apps/
  │   ├── mobile/
  │   └── web/
  ├── packages/
  │   ├── shared/
  │   └── ui/
  ├── turbo.json
  └── package.json
  ```

#### **AC2: Comandos de Desenvolvimento Unificados**
- **DADO** que o monorepo está configurado
- **QUANDO** eu executo `npm run dev`
- **ENTÃO** o comando inicia simultaneamente:
  - Expo Dev Server na porta 19000
  - Next.js dev server na porta 3000
  - TypeScript watch mode para packages/shared
- **E** todos os serviços estão acessíveis em menos de 30 segundos
- **E** hot reload funciona para alterações em qualquer package

#### **AC3: Build de Produção Funcional**
- **DADO** que quero validar o build de produção
- **QUANDO** eu executo `npm run build`
- **ENTÃO** o build completa sem erros em menos de 5 minutos
- **E** são gerados artifacts para:
  - Mobile: Bundle APK/IPA
  - Web: Static files em .next/
  - Packages: Transpiled JS/TS files
- **E** todos os assets são otimizados (minified, tree-shaken)

#### **AC4: TypeScript Integration**
- **DADO** que estou desenvolvendo no monorepo
- **QUANDO** eu faço uma alteração em packages/shared/types
- **ENTÃO** o TypeScript compiler detecta a mudança
- **E** recompila automaticamente
- **E** apps que usam os tipos são atualizadas via hot reload
- **E** não há erros de tipo em nenhuma aplicação

---

## 🔐 **Epic 1.2: História 1.2.1 - Configuração NextAuth.js**

### **Critérios de Aceitação Detalhados:**

#### **AC1: Configuração Básica do NextAuth**
- **DADO** que o sistema de autenticação precisa ser configurado
- **QUANDO** eu acesso `/api/auth/signin`
- **ENTÃO** vejo a página de login padrão do NextAuth.js
- **E** vejo opções para login com email/senha
- **E** vejo botões para login social (Google, Facebook)
- **E** a página está estilizada com o tema do KoePrefeito

#### **AC2: Autenticação com Email/Senha**
- **DADO** que sou um usuário registrado
- **QUANDO** eu preencho email "user@test.com" e senha "123456"
- **E** clico em "Entrar"
- **ENTÃO** sou redirecionado para a dashboard
- **E** recebo um JWT token válido
- **E** o token expira em 15 minutos
- **E** recebo um refresh token válido por 7 dias

#### **AC3: Login Social (Google)**
- **DADO** que quero fazer login com Google
- **QUANDO** eu clico no botão "Entrar com Google"
- **ENTÃO** sou redirecionado para a página de autorização do Google
- **E** após autorizar, volto para a aplicação logado
- **E** meus dados são salvos na tabela users:
  - email do Google
  - nome do Google
  - avatar_url do Google
  - provider: "google"
- **E** minha conta é automaticamente verificada (is_verified: true)

#### **AC4: Middleware de Proteção**
- **DADO** que existem rotas protegidas
- **QUANDO** eu tento acessar `/dashboard` sem estar logado
- **ENTÃO** sou redirecionado para `/api/auth/signin`
- **E** após login, sou redirecionado de volta para `/dashboard`
- **E** se já estou logado, acesso a rota diretamente

#### **AC5: Logout**
- **DADO** que estou logado
- **QUANDO** eu clico em "Sair"
- **ENTÃO** minha sessão é invalidada
- **E** meu JWT token é marcado como inválido
- **E** sou redirecionado para a página inicial
- **E** tentativas de acessar rotas protegidas me redirecionam para login

---

## 📱 **Epic 1.2: História 1.2.2 - Registro e Verificação**

### **Critérios de Aceitação Detalhados:**

#### **AC1: Formulário de Registro (Mobile)**
- **DADO** que sou um novo usuário no app mobile
- **QUANDO** eu abro a tela de registro
- **ENTÃO** vejo um formulário com campos:
  - Nome completo (obrigatório)
  - Email (obrigatório, validação de formato)
  - Telefone (obrigatório, formato brasileiro)
  - Senha (obrigatório, mínimo 8 caracteres)
  - Confirmar senha (obrigatório, deve ser igual à senha)
  - Checkbox "Aceito os termos" (obrigatório)
- **E** todos os campos têm validação em tempo real
- **E** erros são mostrados abaixo de cada campo

#### **AC2: Validação de Dados**
- **DADO** que estou preenchendo o formulário de registro
- **QUANDO** eu preencho um email inválido (ex: "email-inválido")
- **ENTÃO** vejo a mensagem "Email deve ter um formato válido"
- **E** o botão "Criar Conta" fica desabilitado
- **QUANDO** eu preencho um telefone inválido (ex: "123")
- **ENTÃO** vejo a mensagem "Telefone deve ter 11 dígitos (com DDD)"
- **QUANDO** eu preencho senhas diferentes
- **ENTÃO** vejo a mensagem "Senhas não conferem"

#### **AC3: Criação de Conta**
- **DADO** que preenchi todos os campos corretamente
- **QUANDO** eu clico em "Criar Conta"
- **ENTÃO** uma conta é criada na tabela users com:
  - id: UUID gerado
  - email: email fornecido
  - phone: telefone fornecido
  - name: nome fornecido
  - is_verified: false
  - role: CITIZEN
  - created_at: timestamp atual
- **E** recebo um SMS com código de verificação de 6 dígitos
- **E** sou direcionado para a tela de verificação

#### **AC4: Verificação por SMS**
- **DADO** que recebi o SMS de verificação
- **QUANDO** eu insiro o código correto na tela de verificação
- **ENTÃO** minha conta é marcada como verificada (is_verified: true)
- **E** sou automaticamente logado na aplicação
- **E** sou direcionado para o onboarding
- **QUANDO** eu insiro um código incorreto
- **ENTÃO** vejo a mensagem "Código inválido. Tente novamente."
- **E** posso tentar novamente (máximo 3 tentativas)

#### **AC5: Rate Limiting**
- **DADO** que existe proteção contra spam
- **QUANDO** eu tento criar mais de 3 contas com o mesmo IP em 1 hora
- **ENTÃO** recebo a mensagem "Muitas tentativas. Tente novamente em 1 hora."
- **E** o formulário fica bloqueado temporariamente
- **QUANDO** eu tento solicitar mais de 3 códigos SMS em 10 minutos
- **ENTÃO** recebo a mensagem "Muitas solicitações de código. Aguarde 10 minutos."

#### **AC6: Cenários de Erro**
- **DADO** que pode haver problemas técnicos
- **QUANDO** o serviço de SMS está indisponível
- **ENTÃO** vejo a mensagem "Erro ao enviar SMS. Tente novamente em alguns minutos."
- **E** posso tentar reenviar após 1 minuto
- **QUANDO** o email já está cadastrado
- **ENTÃO** vejo a mensagem "Este email já possui uma conta. Faça login ou recupere sua senha."
- **QUANDO** o telefone já está cadastrado
- **ENTÃO** vejo a mensagem "Este telefone já está vinculado a uma conta."

---

## 🎨 **Epic 1.5: História 1.5.1 - Design System Base**

### **Critérios de Aceitação Detalhados:**

#### **AC1: Configuração do Tamagui**
- **DADO** que preciso de um design system consistente
- **QUANDO** eu importo um componente do design system
- **ENTÃO** ele carrega sem erros de configuração
- **E** aplica automaticamente os tokens de design
- **E** suporta temas dark e light
- **E** é otimizado para performance (compile-time optimization)

#### **AC2: Tokens de Design Implementados**
- **DADO** que o design system está configurado
- **QUANDO** eu acesso as configurações de tokens
- **ENTÃO** tenho disponível:
  - **Cores:**
    - Primary: #1E40AF (Azul Institucional)
    - Success: #059669 (Verde Cívico)
    - Warning: #EA580C (Laranja Alerta)
    - Error: #DC2626 (Vermelho Emergência)
    - Gray scale: 50, 100, 200, ..., 900
  - **Espaçamentos:** 4, 8, 16, 24, 32, 48, 64px
  - **Typography:** Inter font family com sizes 12, 14, 16, 20, 24, 32px
  - **Border radius:** 4, 8, 12, 16, 24px
  - **Shadows:** sm, md, lg, xl

#### **AC3: Componente Button**
- **DADO** que preciso de botões consistentes
- **QUANDO** eu uso `<Button variant="primary">Texto</Button>`
- **ENTÃO** renderiza um botão com:
  - Background: cor primary
  - Text: branco
  - Padding: 12px 24px
  - Border radius: 8px
  - Font weight: 500
  - Height mínima: 44px (acessibilidade)
- **E** suporta variantes: primary, secondary, outline, ghost
- **E** suporta tamanhos: sm, md, lg
- **E** suporta estados: loading, disabled
- **E** tem animações de hover/press

#### **AC4: Componente Input**
- **DADO** que preciso de inputs consistentes
- **QUANDO** eu uso `<Input placeholder="Digite seu email" />`
- **ENTÃO** renderiza um input com:
  - Border: 1px solid gray-300
  - Padding: 12px 16px
  - Font size: 16px
  - Border radius: 8px
  - Height: 48px
- **E** suporta estados: default, focus, error, disabled
- **E** suporta tipos: text, email, password, number
- **E** tem feedback visual em focus (border azul)
- **E** integra com validation (mostra erro se presente)

#### **AC5: Componente Card**
- **DADO** que preciso de containers consistentes
- **QUANDO** eu uso `<Card>conteúdo</Card>`
- **ENTÃO** renderiza um container com:
  - Background: branco
  - Border radius: 12px
  - Shadow: elevation-1
  - Padding: 16px
- **E** suporta variantes: default, elevated, outlined
- **E** adapta automaticamente ao tema (dark/light)
- **E** tem hover effects quando clicável

#### **AC6: Temas Dark/Light**
- **DADO** que a aplicação suporta múltiplos temas
- **QUANDO** eu mudo para tema dark
- **ENTÃO** todos os componentes atualizam automaticamente:
  - Backgrounds escuros
  - Textos claros
  - Cores de accent mantidas
  - Contraste WCAG AA mantido
- **E** a preferência é salva no device
- **E** a mudança é instantânea sem flicker
- **E** ícones e imagens se adaptam ao tema

#### **AC7: Documentação de Componentes**
- **DADO** que outros desenvolvedores vão usar o design system
- **QUANDO** eu acesso a documentação dos componentes
- **ENTÃO** vejo para cada componente:
  - Props disponíveis com tipos
  - Exemplos de uso
  - Variantes visuais
  - Guidelines de quando usar
  - Código de exemplo copiável
- **E** a documentação está sempre atualizada
- **E** posso testar os componentes interativamente

---

## 🧪 **Epic 1.3: História 1.3.1 - Testes Automatizados**

### **Critérios de Aceitação Detalhados:**

#### **AC1: Jest Configurado (Backend)**
- **DADO** que preciso testar código backend
- **QUANDO** eu executo `npm test` no workspace backend
- **ENTÃO** Jest executa todos os testes em menos de 30 segundos
- **E** vejo um report de coverage mostrando:
  - Lines coverage
  - Functions coverage
  - Branches coverage
  - Statements coverage
- **E** testes falham se coverage for <80% para arquivos de lógica de negócio
- **E** configuração suporta TypeScript out-of-the-box

#### **AC2: Testing Library (Mobile)**
- **DADO** que preciso testar componentes React Native
- **QUANDO** eu escrevo um teste para um componente:
  ```typescript
  test('Button renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeOnTheScreen();
  });
  ```
- **ENTÃO** o teste executa com sucesso
- **E** posso testar interações (fireEvent.press)
- **E** posso testar acessibilidade (getByRole, getByLabelText)
- **E** posso mockar navigation e outros hooks

#### **AC3: Supertest (Testes de API)**
- **DADO** que preciso testar APIs REST
- **QUANDO** eu escrevo um teste de API:
  ```typescript
  test('POST /api/auth/register creates user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: '123456' })
      .expect(201);
    
    expect(response.body.user.email).toBe('test@test.com');
  });
  ```
- **ENTÃO** o teste executa usando uma database de teste isolada
- **E** a database é limpa entre testes
- **E** posso mockar serviços externos (AWS SNS, etc.)
- **E** posso testar autenticação e autorização

#### **AC4: Coverage Reports**
- **DADO** que executo a suite de testes completa
- **QUANDO** executo `npm run test:coverage`
- **ENTÃO** recebo um relatório HTML navegável
- **E** vejo coverage por arquivo
- **E** posso navegar para ver linhas não cobertas
- **E** relatório é gerado em `coverage/lcov-report/index.html`
- **E** CI/CD falha se coverage geral for <80%

#### **AC5: Mocks para Serviços Externos**
- **DADO** que minha aplicação depende de serviços externos
- **QUANDO** executo testes
- **ENTÃO** todos os serviços externos são mockados:
  - AWS SNS (SMS)
  - Google Maps API
  - Firebase FCM
  - Stripe (futuramente)
- **E** mocks retornam respostas realistas
- **E** posso simular cenários de erro
- **E** mocks são facilmente configuráveis por teste

---

## ✅ **Formato de Validação dos Critérios**

### **Checklist de Qualidade para Critérios de Aceitação:**

#### **Cada critério deve ser:**
- [ ] **Específico**: Descreve exatamente o que deve acontecer
- [ ] **Testável**: Pode ser verificado objetivamente
- [ ] **Completo**: Cobre cenários positivos e negativos
- [ ] **Independente**: Não depende de outros critérios para ser validado
- [ ] **Rastreável**: Pode ser linkado a testes automatizados

#### **Cenários obrigatórios para cada história:**
- [ ] **Happy Path**: Fluxo principal funciona corretamente
- [ ] **Edge Cases**: Casos extremos são tratados
- [ ] **Error Handling**: Erros são tratados graciosamente
- [ ] **Performance**: Tempos de resposta são aceitáveis
- [ ] **Security**: Validações de segurança implementadas
- [ ] **Accessibility**: Padrões de acessibilidade seguidos

#### **Formato Given-When-Then aplicado:**
- [ ] **DADO** (contexto): Estado inicial claro
- [ ] **QUANDO** (ação): Ação específica do usuário
- [ ] **ENTÃO** (resultado): Resultado esperado observável
- [ ] **E** (condições adicionais): Detalhes complementares

---

## 🎯 **Próximos Passos**

### **Validação dos Critérios:**
1. **Review com Tech Lead**: Validar viabilidade técnica
2. **Review com UX Designer**: Validar experiência do usuário
3. **Review com QA**: Validar testabilidade
4. **Refinement com PO**: Ajustar escopo se necessário

### **Implementação:**
1. **Tasks Breakdown**: Quebrar cada critério em tasks técnicas
2. **Test Cases**: Criar casos de teste para cada critério
3. **Acceptance Tests**: Automatizar testes de aceitação
4. **Demo Scripts**: Preparar scripts para demo

---

**Estes critérios garantem que cada história seja implementada com qualidade, completude e alinhamento com as expectativas do produto KoePrefeito! ✅**