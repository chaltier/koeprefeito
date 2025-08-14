import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent } from "@koeprefeito/ui";
import { Layout } from "~/components/Layout";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout showHeader={false}>
      <Head>
        <title>KoePrefeito Maricá - Plataforma Cidadã</title>
        <meta name="description" content="Plataforma oficial de comunicação entre cidadãos e Prefeitura de Maricá" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-3xl font-bold hover:opacity-90 transition-opacity">
              <span className="text-primary-600">Koe</span><span className="text-marica-500">Prefeito</span>
              <span className="text-secondary-600 text-sm block font-normal -mt-1">Maricá</span>
            </Link>
            <div className="flex items-center gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <Link href="/auth/signin">
                  <Button>Entrar</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Sua voz importa na</span>
              <span className="block text-primary-600">transformação de</span>
              <span className="block text-marica-500 text-5xl sm:text-6xl md:text-7xl">Maricá</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-700">
              Conecte-se diretamente com a <span className="text-primary-600 font-semibold">Prefeitura de Maricá</span>. 
              Relate problemas, acompanhe soluções e participe ativamente da melhoria da nossa cidade.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button size="lg">Acessar Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button size="lg">Começar agora</Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg">Saiba mais</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Como o <span className="text-primary-600">KoePrefeito</span> <span className="text-marica-500">Maricá</span> funciona
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Uma plataforma simples e eficiente para conectar cidadãos e governo
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="text-center">
                <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center ring-2 ring-primary-200">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-primary-800">
                  1. Relate o problema
                </h3>
                <p className="mt-2 text-gray-700">
                  Descreva a situação, adicione fotos e localize o problema no mapa
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center ring-2 ring-primary-200">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-primary-800">
                  2. Acompanhe o progresso
                </h3>
                <p className="mt-2 text-gray-700">
                  Receba atualizações em tempo real sobre o andamento da sua solicitação
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center ring-2 ring-primary-200">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 001.414-.586l.775-.776a2.5 2.5 0 013.536 0l.775.776a2.5 2.5 0 001.414.586H18" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-primary-800">
                  3. Veja a solução
                </h3>
                <p className="mt-2 text-gray-700">
                  Confirme a resolução do problema e avalie o atendimento recebido
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Pronto para fazer a diferença?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Junte-se a milhares de cidadãos que já usam o KoePrefeito
            </p>
            <div className="mt-8">
              {session ? (
                <Link href="/dashboard">
                  <Button variant="secondary" size="lg">
                    Ir para o Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="secondary" size="lg">
                    Criar conta gratuita
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-primary-50 to-white border-t-4 border-primary-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
              <span className="text-primary-600">Koe</span><span className="text-marica-500">Prefeito</span>
              <span className="text-secondary-600 text-sm block font-normal -mt-1">Maricá</span>
            </Link>
            <p className="mt-2 text-gray-700">
              Conectando cidadãos e <span className="text-primary-600 font-semibold">Prefeitura de Maricá</span> para uma cidade melhor.
            </p>
            <p className="mt-8 text-center text-gray-600 text-sm">
              © 2025 <span className="text-primary-600 font-semibold">KoePrefeito Maricá</span>. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}