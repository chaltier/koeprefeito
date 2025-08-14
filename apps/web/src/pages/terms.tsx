import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";

export default function TermsPage() {
  return (
    <Layout>
      <Head>
        <title>Termos de Uso - KoePrefeito Maricá</title>
        <meta name="description" content="Termos de Uso e Condições de Utilização da plataforma KoePrefeito Maricá" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Última atualização: 14 de agosto de 2025
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto mt-2">
            Ao utilizar o KoePrefeito Maricá, você concorda com os termos e condições descritos neste documento.
          </p>
        </div>

        <div className="space-y-8">
          {/* Aceitação dos Termos */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">1. Aceitação dos Termos</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Ao acessar e utilizar a plataforma KoePrefeito Maricá, você declara ter lido, compreendido 
                e aceito integralmente estes Termos de Uso. Se não concordar com qualquer disposição, 
                não utilize a plataforma.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  ℹ️ <strong>Importante:</strong> Estes termos constituem um acordo legal entre você e a 
                  Prefeitura Municipal de Maricá.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sobre a Plataforma */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">2. Sobre a Plataforma</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                O KoePrefeito Maricá é uma plataforma digital oficial da Prefeitura Municipal de Maricá, 
                destinada a:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                  Facilitar a comunicação entre cidadãos e a administração municipal
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                  Permitir o relato de problemas e sugestões para melhoria da cidade
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                  Promover a transparência na gestão pública municipal
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                  Fomentar a participação cidadã nas questões municipais
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Cadastro e Conta */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">3. Cadastro e Conta de Usuário</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3.1. Criação de Conta</h3>
                <p className="text-gray-700 mb-4">
                  Para utilizar a plataforma, é necessário criar uma conta através do login com Google. 
                  Ao se cadastrar, você declara:
                </p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Ser maior de 16 anos ou ter autorização dos responsáveis</li>
                  <li>• Fornecer informações verdadeiras e atualizadas</li>
                  <li>• Manter a confidencialidade de sua conta</li>
                  <li>• Ser responsável por todas as atividades realizadas em sua conta</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3.2. Responsabilidades</h3>
                <p className="text-gray-700">
                  Você é responsável por manter suas informações de conta atualizadas e por todas as 
                  ações realizadas através de sua conta, incluindo solicitações, comentários e votos.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Uso Adequado */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">4. Uso Adequado da Plataforma</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ É permitido:</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Reportar problemas reais relacionados à infraestrutura de Maricá</li>
                  <li>• Fazer sugestões construtivas para melhoria da cidade</li>
                  <li>• Comentar e votar em solicitações de forma respeitosa</li>
                  <li>• Fornecer informações adicionais sobre problemas reportados</li>
                  <li>• Anexar fotos que ilustrem adequadamente os problemas</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-3">❌ É proibido:</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Postar conteúdo falso, enganoso ou mal-intencionado</li>
                  <li>• Usar linguagem ofensiva, discriminatória ou inadequada</li>
                  <li>• Fazer ameaças ou incitar violência</li>
                  <li>• Divulgar informações pessoais de terceiros</li>
                  <li>• Utilizar a plataforma para fins comerciais ou políticos</li>
                  <li>• Criar múltiplas contas ou contas falsas</li>
                  <li>• Tentar hackear ou comprometer a segurança da plataforma</li>
                  <li>• Postar conteúdo que viole direitos autorais</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Conteúdo do Usuário */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">5. Conteúdo do Usuário</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5.1. Responsabilidade pelo Conteúdo</h3>
                <p className="text-gray-700">
                  Você é totalmente responsável pelo conteúdo que publica na plataforma, incluindo textos, 
                  imagens, comentários e qualquer outra informação compartilhada.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5.2. Licença de Uso</h3>
                <p className="text-gray-700">
                  Ao publicar conteúdo na plataforma, você concede à Prefeitura de Maricá uma licença 
                  não exclusiva para usar, reproduzir e compartilhar esse conteúdo para fins de 
                  administração pública municipal.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5.3. Moderação</h3>
                <p className="text-gray-700">
                  A Prefeitura de Maricá reserva-se o direito de moderar, editar ou remover qualquer 
                  conteúdo que viole estes termos, independentemente de notificação prévia.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">6. Privacidade e Dados Pessoais</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                O tratamento de seus dados pessoais está detalhado em nossa 
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline mx-1">
                  Política de Privacidade
                </Link>
                que é parte integrante destes Termos de Uso.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Transparência das Informações</h4>
                <p className="text-blue-700 text-sm">
                  As solicitações criadas na plataforma são públicas e visíveis a todos os usuários, 
                  incluindo seu nome e as informações fornecidas na solicitação.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disponibilidade */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">7. Disponibilidade do Serviço</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Embora nos esforcemos para manter a plataforma disponível 24/7, não garantimos 
                disponibilidade ininterrupta devido a:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Manutenções programadas do sistema</li>
                <li>• Problemas técnicos ou de infraestrutura</li>
                <li>• Atualizações de segurança</li>
                <li>• Circunstâncias fora de nosso controle</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Faremos o possível para comunicar previamente sobre manutenções programadas.
              </p>
            </CardContent>
          </Card>

          {/* Limitação de Responsabilidade */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">8. Limitação de Responsabilidade</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A Prefeitura de Maricá não se responsabiliza por:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Danos resultantes do uso ou impossibilidade de uso da plataforma</li>
                <li>• Conteúdo publicado por outros usuários</li>
                <li>• Perda de dados devido a problemas técnicos</li>
                <li>• Decisões tomadas com base em informações da plataforma</li>
              </ul>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ <strong>Importante:</strong> A plataforma é um canal de comunicação. 
                  Em situações de emergência, utilize sempre os serviços oficiais de emergência 
                  (Bombeiros 193, SAMU 192, Polícia 190).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Violações e Penalidades */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">9. Violações e Penalidades</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Em caso de violação destes termos, podemos aplicar as seguintes medidas:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <div className="text-yellow-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-yellow-800">Advertência</h4>
                  <p className="text-sm text-yellow-700 mt-1">Primeira violação menor</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <div className="text-orange-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-orange-800">Suspensão</h4>
                  <p className="text-sm text-orange-700 mt-1">Temporária (7-30 dias)</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-red-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-red-800">Banimento</h4>
                  <p className="text-sm text-red-700 mt-1">Violações graves/repetidas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alterações dos Termos */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">10. Alterações dos Termos</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Estes Termos de Uso podem ser atualizados periodicamente. Mudanças significativas 
                serão comunicadas através da plataforma com antecedência mínima de 30 dias.
              </p>
              <p className="text-gray-700">
                O uso continuado da plataforma após as alterações constitui aceitação dos novos termos.
              </p>
            </CardContent>
          </Card>

          {/* Lei Aplicável */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">11. Lei Aplicável e Foro</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Estes Termos de Uso são regidos pelas leis brasileiras. Eventuais disputas serão 
                resolvidas no foro da Comarca de Maricá, Estado do Rio de Janeiro, com exclusão 
                de qualquer outro, por mais privilegiado que seja.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">12. Contato</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Para dúvidas sobre estes Termos de Uso, entre em contato:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  📧 E-mail: <a href="mailto:koeprefeito@marica.rj.gov.br" className="text-primary-600 hover:text-primary-700 underline">koeprefeito@marica.rj.gov.br</a>
                </p>
                <p className="text-gray-700">
                  📱 Telefone: (21) 2637-2052
                </p>
                <p className="text-gray-700">
                  📍 Endereço: Rua Álvares de Castro, 346 - Centro, Maricá/RJ - CEP: 24900-000
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Versão */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">Informações da Versão</h2>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">Versão</h4>
                    <p className="text-gray-600">1.0</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Publicação</h4>
                    <p className="text-gray-600">14/08/2025</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Vigência</h4>
                    <p className="text-gray-600">Imediata</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}