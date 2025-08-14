import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@koeprefeito/ui";

const errors: Record<string, string> = {
  Configuration: "Erro de configuração do servidor",
  AccessDenied: "Acesso negado",
  Verification: "Token expirado ou inválido",
  Default: "Erro de autenticação",
};

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const errorMessage = error && typeof error === "string" 
    ? errors[error] ?? errors.Default 
    : errors.Default;

  return (
    <>
      <Head>
        <title>Erro de Autenticação - KoePrefeito</title>
        <meta name="description" content="Erro durante o processo de autenticação" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Erro de Autenticação
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {errorMessage}
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/auth/signin">
              <Button className="w-full">
                Tentar Novamente
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                Voltar ao Início
              </Button>
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && error && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-xs text-gray-500">
                Erro técnico: {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}