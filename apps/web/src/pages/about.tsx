import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>Sobre - KoePrefeito Maricá</title>
        <meta name="description" content="Conheça o KoePrefeito Maricá - plataforma que conecta cidadãos e prefeitura para melhorar nossa cidade" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre o <span className="text-primary-600">Koe</span><span className="text-marica-500">Prefeito</span> <span className="text-secondary-600">Maricá</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma digital que aproxima os cidadãos de Maricá da administração municipal, 
            facilitando a comunicação e o acompanhamento de demandas públicas.
          </p>
        </div>

        <div className="space-y-8">
          {/* Nossa Missão */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">Nossa Missão</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                O KoePrefeito Maricá foi criado para fortalecer a participação cidadã e tornar mais transparente 
                e eficiente a gestão pública municipal. Nossa plataforma permite que os moradores de Maricá reportem 
                problemas urbanos, façam sugestões e acompanhem o progresso das solicitações em tempo real.
              </p>
            </CardContent>
          </Card>

          {/* Como Funciona */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">Como Funciona</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Reporte</h3>
                  <p className="text-gray-600">
                    Identifique um problema em Maricá e crie uma solicitação com fotos e localização precisa.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Acompanhe</h3>
                  <p className="text-gray-600">
                    Monitore o status da sua solicitação e receba atualizações sobre o progresso da resolução.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Resolva</h3>
                  <p className="text-gray-600">
                    A Prefeitura de Maricá trabalha para resolver o problema e comunica a conclusão.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefícios */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">Benefícios para Maricá</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Participação Cidadã</h4>
                      <p className="text-gray-600 text-sm">Engaja os moradores na melhoria contínua da cidade</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Resposta Rápida</h4>
                      <p className="text-gray-600 text-sm">Agiliza a identificação e resolução de problemas urbanos</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transparência</h4>
                      <p className="text-gray-600 text-sm">Torna visível o trabalho da administração pública</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Colaboração</h4>
                      <p className="text-gray-600 text-sm">Fortalece a parceria entre cidadãos e governo</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tecnologia */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">Tecnologia e Segurança</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                O KoePrefeito Maricá foi desenvolvido com tecnologias modernas e seguras, garantindo:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Autenticação segura via Google OAuth
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Proteção de dados pessoais conforme LGPD
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Interface responsiva para todos os dispositivos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  Acessibilidade e usabilidade otimizadas
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Faça parte da transformação de Maricá!
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Junte-se aos cidadãos que já utilizam o KoePrefeito para melhorar nossa cidade. 
                Sua participação é fundamental para construirmos uma Maricá ainda melhor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/issues/new">
                  <Button size="lg" className="w-full sm:w-auto">
                    Criar Solicitação
                  </Button>
                </Link>
                <Link href="/issues">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Ver Solicitações
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}