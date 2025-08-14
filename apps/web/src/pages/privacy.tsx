import Head from "next/head";
import { Layout } from "~/components/Layout";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";

export default function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>Política de Privacidade - KoePrefeito Maricá</title>
        <meta name="description" content="Política de Privacidade e Proteção de Dados do KoePrefeito Maricá - LGPD" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Última atualização: 14 de agosto de 2025
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto mt-2">
            Esta política descreve como o KoePrefeito Maricá coleta, usa e protege suas informações pessoais, 
            em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
        </div>

        <div className="space-y-8">
          {/* Informações Coletadas */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">1. Informações que Coletamos</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dados fornecidos por você:</h3>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Nome completo e e-mail (via Google OAuth)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Foto do perfil (opcional, do Google)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Conteúdo das solicitações (título, descrição, fotos)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Localização dos problemas reportados
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Comentários e votos em solicitações
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dados coletados automaticamente:</h3>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Endereço IP e informações do dispositivo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Data e hora de acesso à plataforma
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                    Páginas visitadas e tempo de navegação
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Como Usamos */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">2. Como Usamos suas Informações</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Utilizamos suas informações pessoais para:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Autenticar sua identidade e gerenciar sua conta
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Processar e encaminhar suas solicitações à Prefeitura de Maricá
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Permitir interação com outras solicitações (votos e comentários)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Melhorar a funcionalidade e segurança da plataforma
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gerar estatísticas agregadas para a administração municipal
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Compartilhamento */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">3. Compartilhamento de Dados</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Compartilhamos com:</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Prefeitura de Maricá (para resolução das solicitações)</li>
                  <li>• Outros usuários (informações públicas das solicitações)</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Nunca compartilhamos com:</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Empresas de marketing ou publicidade</li>
                  <li>• Terceiros não autorizados</li>
                  <li>• Outros governos ou entidades externas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Seus Direitos */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">4. Seus Direitos (LGPD)</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Conforme a Lei Geral de Proteção de Dados, você tem direito a:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Acesso</h4>
                      <p className="text-sm text-gray-600">Saber quais dados temos sobre você</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Correção</h4>
                      <p className="text-sm text-gray-600">Corrigir dados incorretos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Exclusão</h4>
                      <p className="text-sm text-gray-600">Apagar seus dados pessoais</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Portabilidade</h4>
                      <p className="text-sm text-gray-600">Receber seus dados em formato legível</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Oposição</h4>
                      <p className="text-sm text-gray-600">Opor-se ao tratamento dos dados</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-secondary-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">Informação</h4>
                      <p className="text-sm text-gray-600">Saber como seus dados são tratados</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">5. Segurança dos Dados</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Implementamos medidas técnicas e organizacionais para proteger suas informações:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Medidas Técnicas:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Criptografia de dados em trânsito (HTTPS)</li>
                    <li>• Autenticação segura via Google OAuth</li>
                    <li>• Backup automático dos dados</li>
                    <li>• Monitoramento de segurança 24/7</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Medidas Organizacionais:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Acesso restrito aos dados pessoais</li>
                    <li>• Treinamento da equipe em proteção de dados</li>
                    <li>• Políticas internas de segurança</li>
                    <li>• Auditoria regular dos sistemas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retenção */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">6. Retenção de Dados</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Mantemos suas informações pelo tempo necessário para cumprir as finalidades descritas nesta política:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Dados da conta:</strong> Enquanto sua conta estiver ativa</li>
                    <li><strong>Solicitações:</strong> Por 5 anos para fins de histórico municipal</li>
                    <li><strong>Comentários e votos:</strong> Permanentemente (dados anonimizados)</li>
                    <li><strong>Logs de acesso:</strong> Por 6 meses para segurança</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">7. Contato e Dúvidas</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Encarregado de Proteção de Dados (DPO):</strong>
                </p>
                <p className="text-gray-700">
                  📧 E-mail: <a href="mailto:dpo@marica.rj.gov.br" className="text-primary-600 hover:text-primary-700 underline">dpo@marica.rj.gov.br</a>
                </p>
                <p className="text-gray-700">
                  📱 Telefone: (21) 2637-2052
                </p>
                <p className="text-gray-700">
                  📍 Endereço: Rua Álvares de Castro, 346 - Centro, Maricá/RJ
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Alterações */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary-800">8. Alterações nesta Política</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre 
                mudanças significativas através da plataforma. Recomendamos que você revise esta página 
                regularmente para se manter informado sobre nossas práticas de privacidade.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Versão atual:</strong> 1.0 - Publicada em 14 de agosto de 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}