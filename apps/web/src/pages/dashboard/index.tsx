import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Badge } from "@koeprefeito/ui";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Removido useEffect que causava loop de redirecionamento

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar esta página.</p>
          <a href="/auth/signin" className="text-primary-600 hover:text-primary-500">
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - KoePrefeito</title>
        <meta name="description" content="Painel do cidadão KoePrefeito" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center gap-8">
                <Link href="/dashboard">
                  <h1 className="text-3xl font-bold text-primary-600">
                    KoePrefeito
                  </h1>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/issues" className="text-gray-600 hover:text-gray-900 font-medium">
                    Solicitações
                  </Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                    Dashboard
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {session.user?.image && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || ""}
                    />
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {session.user?.name}
                    </p>
                    <p className="text-gray-500">{session.user?.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  size="sm"
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Bem-vindo ao seu painel, {session.user?.name?.split(" ")[0]}!
              </h2>
              <p className="mt-1 text-gray-600">
                Acompanhe suas solicitações e participe da melhoria da sua cidade.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    Minhas Solicitações
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl font-bold text-primary-600">0</div>
                    <p className="text-sm text-gray-600 mt-1">
                      Solicitações enviadas
                    </p>
                  </div>
                  <Link href="/issues/new">
                    <Button className="w-full" size="sm">
                      Nova Solicitação
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    Status das Solicitações
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Abertas</span>
                      <Badge variant="info">0</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Em Andamento</span>
                      <Badge variant="warning">0</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Resolvidas</span>
                      <Badge variant="success">0</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    Minha Participação
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl font-bold text-success-600">
                      Cidadão Ativo
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Nível de participação
                    </p>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    Ver Conquistas
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    Últimas Atividades
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-gray-400">
                      <svg
                        className="mx-auto h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Nenhuma atividade ainda
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Comece criando sua primeira solicitação para a prefeitura.
                    </p>
                    <div className="mt-6">
                      <Link href="/issues/new">
                        <Button>
                          Criar primeira solicitação
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}