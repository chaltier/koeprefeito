import type { NextApiRequest, NextApiResponse } from "next";

interface HealthResponse {
  status: "ok" | "error";
  timestamp: string;
  version: string;
  environment: string;
  services: {
    database: "ok" | "error";
    auth: "ok" | "error";
  };
  uptime: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: "error",
        auth: "error",
      },
      uptime: process.uptime(),
    });
  }

  try {
    // Verificar se o banco está acessível
    let databaseStatus: "ok" | "error" = "ok";
    try {
      // Aqui você pode adicionar uma verificação real do banco
      // const { prisma } = await import("@koeprefeito/database");
      // await prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      console.error("Database health check failed:", error);
      databaseStatus = "error";
    }

    // Verificar se a autenticação está funcionando
    let authStatus: "ok" | "error" = "ok";
    try {
      // Verificação básica se as variáveis de ambiente estão configuradas
      if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) {
        authStatus = "error";
      }
    } catch (error) {
      console.error("Auth health check failed:", error);
      authStatus = "error";
    }

    const healthStatus: HealthResponse = {
      status: databaseStatus === "ok" && authStatus === "ok" ? "ok" : "error",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: databaseStatus,
        auth: authStatus,
      },
      uptime: process.uptime(),
    };

    const statusCode = healthStatus.status === "ok" ? 200 : 503;
    res.status(statusCode).json(healthStatus);
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: "error",
        auth: "error",
      },
      uptime: process.uptime(),
    });
  }
}