import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Middleware adicional pode ser adicionado aqui
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Rotas que requerem autenticação
        const protectedPaths = ["/dashboard", "/profile", "/admin"];
        const { pathname } = req.nextUrl;

        // Permite acesso se não for uma rota protegida
        if (!protectedPaths.some(path => pathname.startsWith(path))) {
          return true;
        }

        // Requer token para rotas protegidas
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // Temporariamente desabilitado para evitar loops
    // "/dashboard/:path*",
    // "/profile/:path*", 
    // "/admin/:path*"
  ]
};