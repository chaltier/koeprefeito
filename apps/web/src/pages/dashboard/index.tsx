import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Badge } from "@koeprefeito/ui";
import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Fetch user's issues
  const { data: userIssues, isLoading: loadingIssues } = api.issues.getMyIssues.useQuery(
    undefined,
    { enabled: !!session }
  );

  // Calculate statistics
  const totalIssues = userIssues?.length || 0;
  const openIssues = userIssues?.filter(issue => issue.status === "OPEN").length || 0;
  const inProgressIssues = userIssues?.filter(issue => issue.status === "IN_PROGRESS").length || 0;
  const resolvedIssues = userIssues?.filter(issue => issue.status === "RESOLVED").length || 0;

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
            <div className="flex justify-between items-center py-4 lg:py-6">
              <div className="flex items-center gap-4 lg:gap-8">
                <Link href="/dashboard">
                  <h1 className="text-2xl lg:text-3xl font-bold text-primary-600">
                    KoePrefeito
                  </h1>
                </Link>
                <nav className="hidden sm:flex items-center gap-4 lg:gap-6">
                  <Link href="/issues" className="text-gray-600 hover:text-gray-900 font-medium">
                    Solicitações
                  </Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                    Dashboard
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="hidden sm:flex items-center gap-3">
                  {session.user?.image && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || ""}
                    />
                  )}
                  <div className="text-sm hidden lg:block">
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
                  className="text-sm"
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
                    <div className="text-3xl font-bold text-primary-600">
                      {loadingIssues ? "..." : totalIssues}
                    </div>
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
                      <Badge variant="info">{loadingIssues ? "..." : openIssues}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Em Andamento</span>
                      <Badge variant="warning">{loadingIssues ? "..." : inProgressIssues}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Resolvidas</span>
                      <Badge variant="success">{loadingIssues ? "..." : resolvedIssues}</Badge>
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Minhas Solicitações Recentes
                    </h3>
                    {totalIssues > 0 && (
                      <Link href="/issues" className="text-sm text-primary-600 hover:text-primary-500">
                        Ver todas
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {loadingIssues ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                      <p className="mt-2 text-sm text-gray-600">Carregando...</p>
                    </div>
                  ) : totalIssues === 0 ? (
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
                        Nenhuma solicitação ainda
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
                  ) : (
                    <div className="space-y-4">
                      {userIssues?.slice(0, 5).map((issue) => (
                        <Link key={issue.id} href={`/issues/${issue.id}`}>
                          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{issue.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                  {issue.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge 
                                    variant={
                                      issue.status === "OPEN" ? "info" :
                                      issue.status === "IN_PROGRESS" ? "warning" :
                                      issue.status === "RESOLVED" ? "success" : "secondary"
                                    }
                                    size="sm"
                                  >
                                    {issue.status === "OPEN" ? "Aberto" :
                                     issue.status === "IN_PROGRESS" ? "Em Andamento" :
                                     issue.status === "RESOLVED" ? "Resolvido" : "Fechado"}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {new Intl.DateTimeFormat("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    }).format(new Date(issue.createdAt))}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-500 ml-4">
                                <span className="flex items-center gap-1">
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4.707 4.707a1 1 0 01-1.414 0L8 16H5z" />
                                  </svg>
                                  {issue._count?.comments || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                  {issue._count?.votes || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}