# 👥 Integração da Equipe - KoePrefeito

## 🎯 **Bem-vindos ao Time KoePrefeito!**

Este documento contém todas as informações necessárias para que você possa contribuir efetivamente desde o primeiro dia no projeto KoePrefeito - uma plataforma de civic tech que vai transformar a comunicação entre cidadãos e governo municipal.

---

## 🌟 **Visão Geral do Projeto**

### **O que é o KoePrefeito?**
Uma rede social municipal onde cidadãos reportam problemas urbanos através de **vídeos curtos** (15-30s) e fotos geolocalizadas, criando um canal direto e humanizado com o poder público.

### **Proposta de Valor**
*"Koeprefeito, me ajuda aqui!"* - Transformar reclamações em oportunidades de gestão eficiente e capital político através de comunicação direta entre cidadão e gestor público.

### **Impacto Esperado**
- **40% redução** no tempo médio de resolução de problemas
- **60% aumento** na satisfação com serviços públicos
- **15% da população** ativa cadastrada no primeiro ano

---

## 📋 **Informações do Projeto**

### **Fase Atual:** Sprint 0 - Fundação Técnica
### **Duração do Projeto:** 6 meses (MVP)
### **Metodologia:** Scrum com sprints de 2 semanas
### **Horário de Trabalho:** 9h-18h (flexível dentro do horário central 10h-16h)

### **Stack Tecnológica:**
- **Frontend Mobile:** React Native 0.73.x + Expo + Tamagui
- **Frontend Web:** Next.js 14 + Tailwind CSS + tRPC
- **Backend:** Node.js 20.x + TypeScript + Prisma
- **Database:** PostgreSQL + Redis
- **Cloud:** AWS (ECS, S3, RDS, CloudFront)
- **Monorepo:** Turborepo
- **Testing:** Jest + Cypress + Detox

---

## 👥 **Estrutura da Equipe**

### **Equipe Principal:**
- **🎯 Product Owner (Sarah):** Priorização, gestão de stakeholders, qualidade de produto
- **🏗️ Tech Lead/Arquiteto:** Decisões técnicas, mentoring, code review final
- **📱 Senior Mobile Developer:** React Native, UX implementation, performance mobile
- **⚙️ Senior Backend Developer:** APIs, integrações, performance backend
- **🚀 DevOps Engineer:** Infraestrutura, CI/CD, monitoramento
- **🎨 UX Designer:** Interface, usabilidade, design system

### **Stakeholders:**
- **🏛️ Prefeito/Secretários:** Validação de requisitos, feedback de negócio
- **🏢 Equipe Municipal:** Testing, feedback operacional, treinamento
- **👥 Cidadãos Beta:** User testing, validação de usabilidade

---

## 🛠️ **Setup do Ambiente de Desenvolvimento**

### **Ferramentas Obrigatórias:**
```bash
# Versões obrigatórias
node --version    # v20.x
npm --version     # v10.x
git --version     # v2.40+
```

### **Ferramentas Recomendadas:**
- **IDE:** VS Code com extensões recomendadas
- **Terminal:** Windows Terminal / iTerm2 / Hyper
- **Git Client:** Sourcetree / GitHub Desktop (opcional)
- **Database:** DBeaver / TablePlus
- **API Testing:** Postman / Insomnia

### **Extensões VS Code Obrigatórias:**
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.eslint",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-json",
    "expo.vscode-expo-tools"
  ]
}
```

### **Configuração Inicial (Primeiro Dia):**

#### **1. Acesso aos Repositórios:**
```bash
# Solicitar acesso ao PM/Tech Lead
# GitHub: https://github.com/org/koeprefeito
# Branch principal: main
# Política: Sempre trabalhar em feature branches
```

#### **2. Clone e Setup:**
```bash
git clone https://github.com/org/koeprefeito.git
cd koeprefeito
npm install
cp .env.example .env.local
# Editar .env.local com credenciais fornecidas
```

#### **3. Primeiro Build:**
```bash
# Testar se tudo funciona
npm run dev
# Deve iniciar mobile e web simultaneamente
```

#### **4. Testes:**
```bash
npm run test
# Todos os testes devem passar
```

---

## 📚 **Documentação Técnica**

### **Documentos Obrigatórios de Leitura:**
1. **📄 prd.md** - Requisitos completos do produto (30 min)
2. **📄 fullstack-architecture.md** - Arquitetura técnica detalhada (45 min)
3. **📄 front-end-spec.md** - Especificação UX/UI (30 min)
4. **📄 definition-of-done.md** - Critérios de qualidade (15 min)

### **Documentos de Referência:**
- **📄 project-governance.md** - Processos e métricas
- **📄 sprint-0-backlog.md** - Planejamento atual
- **📄 team-onboarding.md** - Este documento

### **Recursos Externos:**
- **React Native Docs:** https://reactnative.dev/docs/getting-started
- **Next.js Docs:** https://nextjs.org/docs
- **tRPC Docs:** https://trpc.io/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Tamagui Docs:** https://tamagui.dev/docs

---

## 🔄 **Processos de Desenvolvimento**

### **Git Workflow:**
```bash
# 1. Sempre criar branch a partir da main atualizada
git checkout main
git pull origin main
git checkout -b feature/JIRA-123-nome-da-feature

# 2. Commits seguem padrão conventional
git commit -m "feat: implementar sistema de login"
git commit -m "fix: corrigir validação de email"
git commit -m "docs: atualizar README com setup"

# 3. Push e Pull Request
git push origin feature/JIRA-123-nome-da-feature
# Criar PR no GitHub com template
```

### **Padrão de Commits:**
- **feat:** nova funcionalidade
- **fix:** correção de bug
- **docs:** documentação
- **style:** formatação (não afeta lógica)
- **refactor:** refatoração de código
- **test:** testes
- **chore:** tarefas de manutenção

### **Code Review Process:**
1. **Auto-review:** Revisar próprio código antes de criar PR
2. **Automated checks:** CI/CD deve passar (tests, lint, build)
3. **Peer review:** Pelo menos 1 aprovação de peer
4. **Tech Lead review:** Para mudanças de arquitetura
5. **Merge:** Squash and merge após aprovações

---

## 🎯 **Definition of Done (Resumo)**

### **Para Features:**
- [ ] Todos os critérios de aceitação atendidos
- [ ] Cobertura de testes ≥80% para lógica de negócio
- [ ] Code review aprovado
- [ ] Lint e TypeScript sem erros
- [ ] Build de produção bem-sucedido
- [ ] Testado em staging
- [ ] Documentação atualizada

### **Para Bug Fixes:**
- [ ] Causa raiz identificada
- [ ] Fix implementado sem regressões
- [ ] Teste que reproduz o bug adicionado
- [ ] Verificado pelo reporter original

---

## 📅 **Cerimônias Ágeis**

### **Daily Standup** (Diário - 15 min)
- **Quando:** 10h00 (após core team estar online)
- **Format:** O que fiz ontem / O que vou fazer hoje / Impedimentos
- **Ferramenta:** Google Meet + Slack para async updates

### **Sprint Planning** (Início do Sprint - 2h)
- **Quando:** Primeira segunda-feira do sprint
- **Objetivo:** Definir o que será entregue no sprint
- **Participantes:** Todo o time + PO

### **Sprint Review** (Final do Sprint - 1h)
- **Quando:** Última sexta-feira do sprint
- **Objetivo:** Demo do que foi entregue
- **Participantes:** Time + stakeholders

### **Sprint Retrospective** (Final do Sprint - 45 min)
- **Quando:** Após sprint review
- **Objetivo:** Melhorias no processo
- **Participantes:** Apenas o time

---

## 📞 **Comunicação**

### **Canais Principais:**
- **💬 Slack/Teams:** Comunicação diária (#koeprefeito-dev)
- **📧 Email:** Comunicação formal com stakeholders
- **📹 Meet/Zoom:** Reuniões e pareamento
- **📋 Jira/Azure DevOps:** Tracking de trabalho

### **Horários de Disponibilidade:**
- **Core Hours:** 10h-16h (todos devem estar online)
- **Flexível:** 9h-10h e 16h-18h
- **Response Time:** 
  - Slack: <2h durante core hours
  - Email: <24h
  - Emergências: WhatsApp/Telegram

### **Escalação de Problemas:**
1. **Técnico:** Developer → Tech Lead → Arquiteto
2. **Produto:** Developer → PO → Stakeholder
3. **Processo:** Qualquer um → Scrum Master/Tech Lead

---

## 🔐 **Segurança e Compliance**

### **Regras de Segurança:**
- **🚫 NUNCA** commitar credenciais, chaves ou senhas
- **🔐 Sempre** usar .env para variáveis sensíveis
- **🔒 Sempre** validar inputs do usuário
- **👤 Sempre** implementar autorização adequada
- **📝 Sempre** fazer log de ações sensíveis

### **LGPD Compliance:**
- Implementar soft delete para dados pessoais
- Logs de auditoria para acesso a dados
- Encriptação para dados sensíveis
- Processo de exclusão de dados documentado

### **Incident Response:**
- **P0 (Sistema Down):** Notificar imediatamente no Slack + WhatsApp
- **P1 (Funcionalidade Critical):** Notificar em 1h
- **P2 (Bug Menor):** Criar ticket, resolver no próximo sprint

---

## 🎯 **Metas e KPIs da Equipe**

### **Métricas Técnicas:**
- **Velocity:** 40-60 story points/sprint
- **Bug Escape Rate:** <5%
- **Test Coverage:** ≥80%
- **Build Success Rate:** ≥95%
- **Deploy Frequency:** Daily para staging

### **Métricas de Qualidade:**
- **Code Review Time:** <24h
- **First-time Approval Rate:** ≥70%
- **Technical Debt Ratio:** <30%
- **Performance:** API <500ms P95

### **Métricas de Entrega:**
- **Sprint Goal Achievement:** ≥80%
- **Story Completion Rate:** ≥90%
- **On-time Delivery:** ≥85%

---

## 🚀 **Roadmap e Expectativas**

### **Sprint 0 (Próximas 2 semanas):**
- Setup completo da infraestrutura
- Primeiro login funcionando
- Base de componentes UI
- Pipeline CI/CD operacional

### **Sprint 1-2 (Semanas 3-6):**
- Sistema completo de reportes
- Upload de vídeo e foto
- Geolocalização funcionando

### **Sprint 3-4 (Semanas 7-10):**
- Feed social e validação comunitária
- Interface administrativa básica

### **Sprint 5-6 (Semanas 11-14):**
- Dashboard executivo
- Analytics e métricas
- Preparação para go-live

---

## 📚 **Recursos de Aprendizado**

### **Para React Native:**
- **Curso:** React Native - The Practical Guide (Udemy)
- **Docs:** https://reactnative.dev/docs/getting-started
- **Community:** React Native Community Discord

### **Para Backend (Node.js/TypeScript):**
- **Curso:** Node.js - The Complete Guide (Udemy)
- **Docs:** https://nodejs.org/en/docs/
- **TypeScript:** https://www.typescriptlang.org/docs/

### **Para DevOps/AWS:**
- **Curso:** AWS Certified Developer Associate
- **Docs:** https://docs.aws.amazon.com/
- **Community:** AWS Community Builders

### **Para Metodologia:**
- **Livro:** Scrum: The Art of Doing Twice the Work in Half the Time
- **Certificação:** PSM I (Professional Scrum Master)

---

## 🎓 **Plano de Desenvolvimento da Equipe**

### **Primeira Semana:**
- **Dia 1:** Setup de ambiente + leitura de documentação
- **Dia 2-3:** Pair programming com senior da área
- **Dia 4-5:** Primeira task simples com mentoring

### **Primeira Sprint:**
- **Semana 1:** Tasks de complexidade baixa-média
- **Semana 2:** Participação ativa em todas as cerimônias

### **Primeiro Mês:**
- **Sprint 1:** Contribuição significativa para o sprint goal
- **Sprint 2:** Mentoring de novos membros (se aplicável)

### **Opportunities de Crescimento:**
- **Tech Talks:** Apresentações mensais sobre tecnologias
- **Code Reviews:** Participação ativa em reviews
- **Architecture Decisions:** Participação em discussões técnicas
- **Mentoring:** Oportunidades de mentoring quando experiente

---

## 📞 **Contatos Importantes**

### **Equipe Principal:**
- **Product Owner:** sarah@koeprefeito.com
- **Tech Lead:** techlead@koeprefeito.com
- **DevOps:** devops@koeprefeito.com

### **Emergency Contacts:**
- **On-call Rotation:** [Será definido após Sprint 0]
- **Incident Commander:** Tech Lead
- **Stakeholder Escalation:** Product Owner

### **Ferramentas de Suporte:**
- **IT Help:** it-support@empresa.com
- **HR:** rh@empresa.com
- **Facilities:** facilities@empresa.com

---

## ✅ **Checklist de Primeiro Dia**

### **Antes do Primeiro Dia:**
- [ ] Acesso ao GitHub repositório
- [ ] Acesso ao Slack/Teams
- [ ] Acesso ao Jira/Azure DevOps
- [ ] Credenciais de desenvolvimento recebidas
- [ ] Laptop/ambiente configurado

### **Primeiro Dia:**
- [ ] Ler documentação principal (PRD, Arquitetura, UX)
- [ ] Setup de ambiente de desenvolvimento
- [ ] Primeiro build bem-sucedido
- [ ] Conhecer o time em chamada de apresentação
- [ ] Entender o sprint atual e objetivos

### **Primeira Semana:**
- [ ] Completar primeira task com sucesso
- [ ] Participar de todas as cerimônias
- [ ] Fazer primeiro code review
- [ ] Entender workflow completo
- [ ] Setup de ferramentas pessoais

---

## 🎉 **Cultura da Equipe**

### **Nossos Valores:**
- **🎯 Foco no Usuario:** Sempre pensar no impacto para cidadãos
- **🔧 Qualidade Técnica:** Código limpo e testável
- **🤝 Colaboração:** Ajudar colegas e compartilhar conhecimento
- **📈 Melhoria Contínua:** Sempre buscar formas de melhorar
- **💬 Comunicação Clara:** Transparência em desafios e sucessos

### **Tradições da Equipe:**
- **Coffee Chat:** Sextas 16h (opcional, informal)
- **Demo Friday:** Demonstrações informais de features
- **Learning Hour:** Quarta 17h (estudos e tech talks)
- **Retrospective Fun:** Atividades criativas nas retros

---

**Bem-vindos ao time! Estamos construindo algo que vai realmente impactar a vida das pessoas. Vamos juntos fazer a diferença! 🚀**

---

*Para dúvidas sobre este documento, entre em contato com o Product Owner ou Tech Lead.*