# 🔐 Configuração Google OAuth - KoePrefeito

## 📋 **Guia Passo a Passo**

### **1. Google Cloud Console**
1. Acesse: https://console.cloud.google.com
2. Faça login com sua conta Google

### **2. Criar Projeto**
1. Clique no seletor de projeto (canto superior esquerdo)
2. Clique em "Novo Projeto"
3. **Nome**: `KoePrefeito`
4. **Organização**: Deixe vazio (ou sua organização)
5. Clique "Criar"

### **3. Configurar Tela de Consentimento OAuth**
1. No menu lateral: **APIs e Serviços** → **Tela de consentimento OAuth**
2. **Tipo de usuário**: 
   - ✅ **Externo** (para teste público)
   - 📝 Interno (só se tiver Google Workspace)
3. Clique "Criar"

**Preencher informações:**
- **Nome do app**: `KoePrefeito`
- **Email de suporte do usuário**: `seu-email@gmail.com`
- **Logotipo do app**: (opcional)
- **Domínio do app**: deixe vazio por enquanto
- **Domínios autorizados**: deixe vazio
- **Email de contato do desenvolvedor**: `seu-email@gmail.com`

4. Clique "Salvar e continuar"
5. **Escopos**: Pule esta etapa (clique "Salvar e continuar")
6. **Usuários de teste**: Pule (clique "Salvar e continuar") 
7. **Resumo**: Clique "Voltar ao painel"

### **4. Criar Credenciais OAuth**
1. No menu lateral: **APIs e Serviços** → **Credenciais**
2. Clique "➕ Criar credenciais"
3. Selecione **"ID do cliente OAuth 2.0"**

**Configurar credenciais:**
- **Tipo de aplicativo**: `Aplicativo da Web`
- **Nome**: `KoePrefeito Web App`
- **URIs de origem autorizados**: 
  ```
  http://localhost:3002
  ```
- **URIs de redirecionamento autorizados**:
  ```
  http://localhost:3002/api/auth/callback/google
  ```

4. Clique "Criar"

### **5. Copiar Credenciais**
Após criar, você verá uma janela com:
- ✅ **ID do cliente**: `algo.apps.googleusercontent.com`
- ✅ **Chave secreta do cliente**: `string-aleatória`

⚠️ **IMPORTANTE**: Copie e guarde essas informações!

### **6. Configurar no Projeto**
Edite o arquivo `apps/web/.env.local`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=sua-client-secret-aqui
```

### **7. Reiniciar Aplicação**
```bash
# Parar aplicação (Ctrl+C no terminal)
# Reiniciar
cd C:/Users/Vader/Desktop/Projetos/koeprefeito
pnpm dev:web
```

### **8. Testar Login**
1. Acesse: http://localhost:3002
2. Clique "Entrar"
3. Clique "Continuar com Google"
4. Faça login com sua conta Google
5. Autorize o app KoePrefeito
6. Deve redirecionar para o Dashboard! 🎉

## ✅ **Resultado Esperado:**

### **Funcionando:**
- ✅ Botão "Continuar com Google" aparece
- ✅ Login redirect para Google
- ✅ Após autorizar, volta para o app
- ✅ Dashboard acessível
- ✅ Logout funciona
- ✅ Dados do usuário salvos no banco

### **Problemas Comuns:**

#### ❌ **"redirect_uri_mismatch"**
**Solução**: Verifique se a URL de callback está exata:
```
http://localhost:3002/api/auth/callback/google
```

#### ❌ **"Invalid client_id"**
**Solução**: Verifique se copiou corretamente o Client ID

#### ❌ **"Access denied"**
**Solução**: Configure corretamente a tela de consentimento

## 🔧 **URLs Importantes:**

- **Google Cloud Console**: https://console.cloud.google.com
- **Tela de Consentimento**: Console → APIs e Serviços → Tela de consentimento OAuth
- **Credenciais**: Console → APIs e Serviços → Credenciais
- **App Local**: http://localhost:3002
- **Callback URL**: http://localhost:3002/api/auth/callback/google

## 🎯 **Após Configurar:**

Você terá:
1. **Login completo** com Google
2. **Usuários salvos** no PostgreSQL
3. **Dashboard funcional** 
4. **Proteção de rotas**
5. **Sessões persistentes**

## 🚀 **Próximos Passos:**
- Testar fluxo completo de login/logout
- Explorar dashboard
- Ver dados no Adminer
- Implementar funcionalidades core (criar issues)

---

**💡 Dica**: Mantenha as credenciais seguras e nunca commit no Git!