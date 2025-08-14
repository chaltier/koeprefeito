import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";

export default function SimpleDashboard() {
  const { data: session, status } = useSession();

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
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-primary-600">
                  KoePrefeito
                </h1>
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
                🎉 Login com Google funcionando!
              </h2>
              <p className="mt-1 text-gray-600">
                Parabéns! O OAuth está configurado corretamente.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    ✅ Seus Dados
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <strong>Nome:</strong> {session.user?.name || "N/A"}
                    </div>
                    <div>
                      <strong>Email:</strong> {session.user?.email || "N/A"}
                    </div>
                    <div>
                      <strong>ID:</strong> {session.user?.id || "N/A"}
                    </div>
                    {session.user?.image && (
                      <div>
                        <strong>Avatar:</strong>
                        <img 
                          src={session.user.image} 
                          alt="Avatar" 
                          className="w-16 h-16 rounded-full mt-2"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    🚀 Sistema Funcionando
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span>Google OAuth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span>NextAuth.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span>Banco PostgreSQL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span>Design System</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">
                    🎯 Próximos Passos
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">📝</div>
                      <h4 className="font-medium mb-2">Criar Solicitações</h4>
                      <p className="text-sm text-gray-600">
                        Implemente formulário para cidadãos reportarem problemas
                      </p>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-medium mb-2">Dashboard Admin</h4>
                      <p className="text-sm text-gray-600">
                        Interface para gestores municipais
                      </p>
                    </div>
                    <div className="text-center p-4 border border-gray-200 rounded-lg">
                      <div className="text-2xl mb-2">🚀</div>
                      <h4 className="font-medium mb-2">Deploy</h4>
                      <p className="text-sm text-gray-600">
                        Configure CI/CD e publique na web
                      </p>
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