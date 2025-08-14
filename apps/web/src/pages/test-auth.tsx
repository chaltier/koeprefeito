import { useSession, signOut } from "next-auth/react";
import Head from "next/head";

export default function TestAuth() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Teste de Autenticação - KoePrefeito</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              🔐 Teste de Autenticação
            </h1>
            <p className="mt-2 text-gray-600">
              Status do login e dados da sessão
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Status da Sessão:</h2>
            
            <div className="space-y-4">
              <div>
                <strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  status === "loading" ? "bg-yellow-100 text-yellow-800" :
                  status === "authenticated" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {status}
                </span>
              </div>

              {status === "loading" && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Carregando sessão...</p>
                </div>
              )}

              {status === "unauthenticated" && (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Você não está logado</p>
                  <a 
                    href="/auth/signin"
                    className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                  >
                    Fazer Login
                  </a>
                </div>
              )}

              {status === "authenticated" && session && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Dados do Usuário:</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <p><strong>Nome:</strong> {session.user?.name || "N/A"}</p>
                        <p><strong>Email:</strong> {session.user?.email || "N/A"}</p>
                        <p><strong>ID:</strong> {session.user?.id || "N/A"}</p>
                        <p><strong>Role:</strong> {(session.user as any)?.role || "N/A"}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Avatar:</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        {session.user?.image ? (
                          <img 
                            src={session.user.image} 
                            alt="Avatar" 
                            className="w-16 h-16 rounded-full"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600">👤</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Objeto Session Completo:</h3>
                    <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(session, null, 2)}
                    </pre>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
                    >
                      Fazer Logout
                    </button>
                    <a 
                      href="/dashboard"
                      className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                    >
                      Ir para Dashboard
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="text-primary-600 hover:text-primary-500">
              ← Voltar para o início
            </a>
          </div>
        </div>
      </div>
    </>
  );
}