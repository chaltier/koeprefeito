import { PrismaClient, IssueCategory, IssueStatus, IssuePriority, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar usuários de exemplo
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@koeprefeito.com.br" },
    update: {},
    create: {
      name: "Administrador KoePrefeito",
      email: "admin@koeprefeito.com.br",
      role: UserRole.ADMIN,
      city: "São Paulo",
      state: "SP",
    },
  });

  const moderatorUser = await prisma.user.upsert({
    where: { email: "moderador@prefeitura.sp.gov.br" },
    update: {},
    create: {
      name: "João Silva - Secretário de Obras",
      email: "moderador@prefeitura.sp.gov.br",
      role: UserRole.MODERATOR,
      city: "São Paulo",
      state: "SP",
    },
  });

  const citizenUser = await prisma.user.upsert({
    where: { email: "maria.santos@gmail.com" },
    update: {},
    create: {
      name: "Maria Santos",
      email: "maria.santos@gmail.com",
      role: UserRole.CITIZEN,
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
  });

  // Criar issues de exemplo
  const infraIssue = await prisma.issue.create({
    data: {
      title: "Buraco na Rua das Palmeiras",
      description: "Há um buraco grande na Rua das Palmeiras, próximo ao número 456. O buraco está causando problemas para os carros e pode ser perigoso para pedestres. Solicito reparo urgente.",
      category: IssueCategory.INFRASTRUCTURE,
      status: IssueStatus.OPEN,
      priority: IssuePriority.HIGH,
      latitude: -23.550520,
      longitude: -46.633308,
      address: "Rua das Palmeiras, 456 - Vila Madalena, São Paulo - SP",
      authorId: citizenUser.id,
      assignedToId: moderatorUser.id,
    },
  });

  const healthIssue = await prisma.issue.create({
    data: {
      title: "Falta de medicamentos no Posto de Saúde",
      description: "O Posto de Saúde do bairro está sem medicamentos para hipertensão há mais de uma semana. Muitos idosos dependem destes medicamentos.",
      category: IssueCategory.HEALTH,
      status: IssueStatus.IN_PROGRESS,
      priority: IssuePriority.URGENT,
      latitude: -23.561414,
      longitude: -46.656166,
      address: "Rua Dr. Vila Nova, 228 - Vila Buarque, São Paulo - SP",
      authorId: citizenUser.id,
      assignedToId: moderatorUser.id,
    },
  });

  const environmentIssue = await prisma.issue.create({
    data: {
      title: "Árvore caída na Praça da República",
      description: "Uma árvore de grande porte caiu na Praça da República após a chuva forte de ontem. A árvore está bloqueando parte da calçada.",
      category: IssueCategory.ENVIRONMENT,
      status: IssueStatus.RESOLVED,
      priority: IssuePriority.MEDIUM,
      latitude: -23.543847,
      longitude: -46.641656,
      address: "Praça da República - República, São Paulo - SP",
      authorId: citizenUser.id,
      assignedToId: moderatorUser.id,
      resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
    },
  });

  // Criar comentários
  await prisma.comment.create({
    data: {
      content: "Obrigado pela solicitação. Nossa equipe irá verificar o local ainda hoje.",
      isOfficial: true,
      issueId: infraIssue.id,
      authorId: moderatorUser.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Estamos providenciando a reposição dos medicamentos. Previsão de normalização em 48h.",
      isOfficial: true,
      issueId: healthIssue.id,
      authorId: moderatorUser.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "A árvore foi removida com sucesso. A área está liberada para circulação.",
      isOfficial: true,
      issueId: environmentIssue.id,
      authorId: moderatorUser.id,
    },
  });

  // Criar votos
  await prisma.vote.create({
    data: {
      type: "UP",
      userId: citizenUser.id,
      issueId: infraIssue.id,
    },
  });

  console.log("✅ Seed concluído com sucesso!");
  console.log(`👤 Usuários criados: ${adminUser.name}, ${moderatorUser.name}, ${citizenUser.name}`);
  console.log(`📝 Issues criadas: ${infraIssue.title}, ${healthIssue.title}, ${environmentIssue.title}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro durante o seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });