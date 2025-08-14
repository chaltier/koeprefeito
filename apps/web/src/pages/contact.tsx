import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { Button } from "@koeprefeito/ui";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Input } from "@koeprefeito/ui";

export default function ContactPage() {
  return (
    <Layout>
      <Head>
        <title>Contato - KoePrefeito Maricá</title>
        <meta name="description" content="Entre em contato com a equipe do KoePrefeito Maricá ou com a Prefeitura Municipal" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Precisa de ajuda com a plataforma ou quer falar diretamente com a Prefeitura de Maricá? 
            Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Contato */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">Envie uma Mensagem</h2>
              <p className="text-gray-600">
                Use este formulário para questões sobre o uso da plataforma KoePrefeito
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(21) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    required
                  >
                    <option value="">Selecione o assunto</option>
                    <option value="duvida-plataforma">Dúvida sobre a plataforma</option>
                    <option value="problema-tecnico">Problema técnico</option>
                    <option value="sugestao-melhoria">Sugestão de melhoria</option>
                    <option value="denuncia">Denúncia ou reclamação</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="Descreva sua questão ou sugestão detalhadamente..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Responderemos em até 2 dias úteis
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            {/* Prefeitura de Maricá */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-primary-800">Prefeitura de Maricá</h3>
                <p className="text-gray-600">Contatos oficiais da administração municipal</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <p className="text-gray-600 text-sm">
                      Rua Álvares de Castro, 346<br />
                      Centro - Maricá/RJ<br />
                      CEP: 24900-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefones</h4>
                    <p className="text-gray-600 text-sm">
                      (21) 2637-2052<br />
                      (21) 2637-2053
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Horário de Funcionamento</h4>
                    <p className="text-gray-600 text-sm">
                      Segunda a Sexta: 8h às 17h<br />
                      Sábados: 8h às 12h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Site Oficial</h4>
                    <a 
                      href="https://www.marica.rj.gov.br" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm underline"
                    >
                      www.marica.rj.gov.br
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ouvidoria */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-primary-800">Ouvidoria Municipal</h3>
                <p className="text-gray-600">Para denúncias, reclamações e sugestões oficiais</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-secondary-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">E-mail</h4>
                    <a 
                      href="mailto:ouvidoria@marica.rj.gov.br"
                      className="text-primary-600 hover:text-primary-700 text-sm underline"
                    >
                      ouvidoria@marica.rj.gov.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-secondary-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-600 text-sm">(21) 2637-2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergências */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <h3 className="text-xl font-semibold text-red-800">Em Caso de Emergência</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bombeiros:</span>
                    <span className="font-semibold text-red-700">193</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">SAMU:</span>
                    <span className="font-semibold text-red-700">192</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Polícia Militar:</span>
                    <span className="font-semibold text-red-700">190</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Guarda Municipal:</span>
                    <span className="font-semibold text-red-700">(21) 2637-2010</span>
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-3">
                  ⚠️ Para emergências, ligue diretamente para os números acima
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <Card className="mt-12">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Perguntas Frequentes</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Como faço para criar uma conta no KoePrefeito?
                </h4>
                <p className="text-gray-600 text-sm">
                  Basta clicar em "Entrar" e fazer login com sua conta Google. O cadastro é automático e seguro.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Quanto tempo demora para a prefeitura responder?
                </h4>
                <p className="text-gray-600 text-sm">
                  O prazo varia conforme a complexidade da solicitação. Questões simples são atendidas em 5-7 dias, 
                  enquanto obras podem levar algumas semanas.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Posso acompanhar solicitações de outros cidadãos?
                </h4>
                <p className="text-gray-600 text-sm">
                  Sim! Todas as solicitações são públicas e você pode votar e comentar para mostrar apoio às causas importantes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}