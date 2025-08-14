# 🔧 Solução Rápida - KoePrefeito

## 🚨 **Problemas Identificados e Soluções:**

### 1. **Porta 3000/3001 em uso**
**Problema**: Processo Node.js ainda rodando em background

**Solução**:
```bash
# Windows - Matar processos Node.js
tasklist | findstr node
taskkill /F /IM node.exe

# Ou reiniciar o computador (mais rápido)
```

### 2. **Dependências faltando**
**Problema**: Alguns pacotes não foram instalados corretamente

**Solução**:
```bash
cd C:/Users/Vader/Desktop/Projetos/koeprefeito/apps/web
pnpm install
```

## ✅ **TESTE FUNCIONANDO AGORA:**

### **Opção 1: Teste Simples (Sem Banco)**
```bash
cd C:/Users/Vader/Desktop/Projetos/koeprefeito
pnpm clean
pnpm install
```

**Edite o arquivo `apps/web/.env.local`:**
```env
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=teste-koeprefeito-123456
SKIP_ENV_VALIDATION=1
DATABASE_URL=postgresql://test:test@localhost:5432/test
```

**Edite `apps/web/package.json`:**
```json
"dev": "next dev --port 3002"
```

**Inicie:**
```bash
pnpm dev:web
```

**Acesse**: http://localhost:3002

### **Opção 2: Reset Completo**
```bash
# 1. Parar tudo
docker-compose down
taskkill /F /IM node.exe

# 2. Limpar
pnpm clean
rm -rf node_modules
rm pnpm-lock.yaml

# 3. Reinstalar
pnpm install

# 4. Restart Docker
docker-compose up -d
sleep 10

# 5. Configurar banco
pnpm db:generate
pnpm db:push
pnpm --filter=database db:seed

# 6. Iniciar app
pnpm dev:web
```

## 🌐 **URLs para Testar:**

### ✅ **Banco de Dados (Funcionando):**
- **Adminer**: http://localhost:8080
- **Login**: 
  - Server: `postgres` 
  - Username: `koeprefeito`
  - Password: `password`
  - Database: `koeprefeito`

### 🔄 **Aplicação Web:**
- **URL**: http://localhost:3002 (ou porta disponível)

## 🎯 **O que DEVE funcionar:**

### ✅ **Banco (8080):**
- Interface Adminer carrega
- Consegue conectar com credenciais
- Tabelas criadas pelo Prisma

### ✅ **Aplicação (3002):**
- Landing page carrega
- Design responsivo
- Navegação funciona
- CSS/Tailwind aplicado

## 🚨 **Problemas Conhecidos:**

### ❌ **Login não funciona sem OAuth**
**Normal** - Google OAuth precisa ser configurado

### ❌ **APIs retornam erro**
**Normal** - Sem autenticação, algumas APIs falham

### ❌ **Dashboard inacessível**  
**Normal** - Precisa estar logado

## 🔧 **Debug Rápido:**

### **Se a aplicação não carrega:**
```bash
# Verificar logs em tempo real
cd C:/Users/Vader/Desktop/Projetos/koeprefeito
pnpm dev:web

# Verificar erros no terminal
```

### **Se o banco não conecta:**
```bash
# Verificar containers
docker ps

# Restart se necessário
docker-compose restart postgres
```

### **Se há erro de dependências:**
```bash
# Limpar e reinstalar
cd apps/web
rm -rf node_modules
pnpm install
```

## 🎉 **Resultado Esperado:**

1. **Banco Adminer**: ✅ Funcionando em http://localhost:8080
2. **App Frontend**: ✅ Carregando em http://localhost:3002
3. **Design System**: ✅ Tailwind + componentes UI
4. **Navegação**: ✅ Entre páginas funciona

**Não funciona (normal sem OAuth):**
- Login/Logout
- Dashboard
- APIs autenticadas

---

## 🆘 **Se nada funcionar:**

1. **Reinicie o computador** (mata todos os processos)
2. **Execute**: `pnpm setup` 
3. **Configure porta diferente**: 3003, 3004, etc.
4. **Use versão simplificada**: só frontend sem banco

**✨ O importante é ver o frontend funcionando primeiro!**