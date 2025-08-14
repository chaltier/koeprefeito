import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";

const secretarias = [
  {
    nome: "Secretaria Municipal de Administração",
    secretario: "Gecimar Jorge de Aragão",
    areas: ["Licitações Públicas", "Gestão de Patrimônio", "Frota Municipal", "Arquivo Municipal", "Agências dos Correios"],
    endereco: "Rua Álvares de Castro, 346 - térreo - Centro",
    telefone: "(21) 2637-3706 (Ramal: 105)",
    email: "admprefmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria Municipal de Educação (SEMED)", 
    secretario: "Professor Rodrigo Moura",
    areas: ["77 Unidades Educacionais", "Educação Integral", "Passaporte Universitário", "Programa Corujinhas"],
    endereco: "Rua Nossa Senhora do Amparo, 196 - Centro",
    telefone: "(21) 2637-3706 / (21) 2637-4205",
    email: "gabinete.educacao@educ.marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "Gestão das políticas públicas educacionais com foco na Educação Integral, Democrática e Inclusiva"
  },
  {
    nome: "Secretaria Municipal de Saúde",
    secretario: "Marcelo Costa Velho Mendes de Azevedo",
    areas: ["Atenção Básica", "Urgência e Emergência", "Vigilância Sanitária", "26 USF nos 4 distritos"],
    endereco: "Rua Clímaco Pereira, 367 - Centro (próximo ao Caps 3)",
    telefone: "(21) 99140-0674 (Ramal: 433)",
    email: "saudemaricapmm@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "26 Unidades de Saúde da Família (USF) nos quatro distritos da cidade"
  },
  {
    nome: "Secretaria de Assistência Social e Cidadania",
    secretario: "Dryene Tavares Arêas Silva",
    areas: ["CRAS", "CREAS", "Programas Sociais", "Sistema Único de Assistência Social (SUAS)"],
    endereco: "Rua Domício da Gama, lote 4, quadra 14, loja 1 - Centro", 
    telefone: "(21) 2637-3648 / (21) 2634-0823",
    email: "assistenciasocial@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Segurança Cidadã (SESEG)",
    secretario: "Julio Cesar Veras Vieira",
    areas: ["Guarda Municipal (329 guardas)", "PROEIS com PM", "Inteligência e Políticas de Segurança"],
    endereco: "Rua Luiz Alberto Ramos Machado, lote 14, quadra K - Parque Eldorado",
    telefone: "(21) 2648-0269 (Ramal: 1007)",
    email: "gabinete.segurancacidada@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Economia Solidária e Empreendedorismo Social",
    secretario: "Matheus Silva do Amparo (Matheus Gaúcho)",
    areas: ["Renda Básica da Cidadania", "Mumbuca Futuro", "Combate à Pobreza", "Cooperativas"],
    endereco: "Rua Abreu Rangel, 138 - Centro",
    telefone: "(21) 2042-7222 (Ramal: 4501 e 459)",
    email: "economiasolidariamarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Turismo, Comércio, Indústria e Mercado Interno (STCIM)",
    secretario: "José Alexandre Almeida da Silva",
    areas: ["Carnaval", "Festa da Pesca", "Natal Iluminado", "Pratas da Casa", "Feirarte", "Centros de Informações Turísticas"],
    endereco: "Rua Domício da Gama, 259 - Centro",
    telefone: "(21) 2042-7222 (Ramal: 1240)",
    email: "turismo@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Cultura e das Utopias",
    secretario: "Sady Bianchin",
    areas: ["Atividades Artísticas", "Patrimônio Cultural", "Eventos Culturais", "Difusão Cultural"],
    endereco: "Rua Adelaide de Souza Bezerra, 104 - Centro",
    telefone: "(21) 2634-1165 / (21) 99748-9433 (Ramal: 1302)",
    email: "gabinetecultura@marica.rj.gov.br / cultura@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Esporte e Lazer",
    secretario: "Filipe Dias Bittencourt",
    areas: ["30+ Modalidades Gratuitas", "Ginástica", "Ballet", "Vôlei", "Futebol", "Artes Marciais", "Esportes Aquáticos"],
    endereco: "Avenida Roberto Silveira, 46, 2º andar - Centro",
    telefone: "(21) 2042-7222 (Ramal: 2102)",
    email: "esportemarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    cep: "24.900-445"
  },
  {
    nome: "Secretaria de Agricultura e Pecuária",
    secretario: "Wagner de Barros Soares",
    areas: ["Agroecologia", "Vacinação Gratuita de Gado", "Gestão Pesqueira", "Hortas Comunitárias", "Distribuição de Mudas Nativas"],
    endereco: "Rodovia Vereador Oldemar Guedes de Figueirado, Km 1, s/nº - Ubatiba",
    telefone: "(21) 99909-8116",
    email: "adm.secapmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Bem-Estar Animal",
    secretario: "Robson Teixeira da Silva (Robgol)",
    areas: ["Castração Gratuita", "Campanhas de Adoção", "Vacinação Animal", "Socialização de Animais"],
    endereco: "Rua Prefeito Hilário Costa e Silva, 100 - Parque Eldorado",
    telefone: "(21) 97556-7695",
    email: "protecaoanimal@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Habitação",
    secretario: "Marcus Toselli (Marcus Bambam)",
    areas: ["Regularização Fundiária", "Melhorias Habitacionais", "Auxílio Aluguel Social", "Relocações"],
    endereco: "Rua Álvares de Castro, 586 - Araçatiba",
    telefone: "(21) 2042-7222 (Ramal: 2503)",
    email: "habitacaomarica@gmail.com / secretariahabitacao@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h",
    whatsapp: "(21) 99169-7458"
  },
  {
    nome: "Secretaria de Transportes e Postura (SEMTRANS)",
    secretario: "Andre Luis Azeredo da Silva (André Casquinha)",
    areas: ["Transporte Público", "Taxi/Moto-taxi", "Van Escolar", "Posturas 1º ao 4º Distrito"],
    endereco: "Rodovia Amaral Peixoto, Km 21,5 - Centro Administrativo Integrado - São José do Imbassaí",
    telefone: "(21) 2637-3706 / (21) 2637-4208 / (21) 99698-3699",
    email: "semtransmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "Ramal 449 (atendimento contribuinte) / Ramal 448 (permissionários)"
  },
  {
    nome: "Secretaria de Assuntos Religiosos",
    secretario: "Pastor Sérgio Luis de Sousa",
    areas: ["Liberdade Religiosa", "Diversidade Religiosa", "Combate à Intolerância", "Diálogo Inter-religioso"],
    endereco: "Avenida Roberto Silveira, 46, 2º andar - prédio Costa Azul (prédio da Taco) - Centro",
    telefone: "(21) 97178-3934 (Ramal: 422)",
    email: "assuntosreligiososmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    website: "https://assuntosreligiosos.marica.rj.gov.br/"
  },
  {
    nome: "Secretaria de Comunicação Social",
    secretario: "Danielle Ferreira de Oliveira",
    areas: ["Divulgação de Ações Municipais", "Relações Públicas", "Conteúdo Jornalístico", "Redes Sociais"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2042-7222 (Ramal: 126)",
    email: "secommarica1@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "Canais: Facebook, Instagram, YouTube, WhatsApp, TikTok"
  },
  {
    nome: "Secretaria de Governança em Licitações e Contratos",
    secretario: "Felippe Gomes Lima",
    areas: ["Licitações Municipais", "Contratos Administrativos", "Plano Anual de Contratações (PCA)", "Plano de Logística Sustentável (PLS)"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 97272-2252 (Ramal: 309 e 334)",
    email: "gabinete.governanca@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria Municipal de Direitos Humanos",
    secretario: "João Carlos de Lima (Birigu)",
    areas: ["Programa Cultura de Direitos", "Comitê de Defesa do Bairro (CDB)", "Casa dos Conselhos", "Políticas de Garantia de Direitos"],
    endereco: "Rua Pereira Neves, 274 - Centro",
    telefone: "(21) 2634-1197 / (21) 99431-6472 (Ramal: 462)",
    email: "smdh@marica.rj.gov.br / sdhmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h"
  }
];

export default function SecretariasPage() {
  return (
    <Layout>
      <Head>
        <title>Secretarias Municipais - KoePrefeito Maricá</title>
        <meta name="description" content="Contatos e informações das Secretarias Municipais de Maricá" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secretarias Municipais
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contatos diretos com as secretarias da Prefeitura de Maricá para resolução
            de demandas específicas por área de atuação.
          </p>
        </div>

        {/* Informações Gerais */}
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Informações Gerais</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Endereço Central</h3>
                <p className="text-gray-700 mb-4">
                  Rua Álvares de Castro, 346<br />
                  Centro - Maricá/RJ<br />
                  CEP: 24900-000
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">Telefones Centrais</h3>
                <div className="space-y-1 text-gray-700">
                  <p>(21) 2637-2052 | (21) 2637-2053</p>
                  <p>(21) 2637-2054 | (21) 2637-2055</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
                <p className="text-gray-700 mb-4">
                  Segunda a Sexta: 8h às 17h<br />
                  Sábados: 8h às 12h
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">Central de Atendimento</h3>
                <p className="text-gray-700">
                  📞 156 (Central de Atendimento)<br />
                  📧 central156@marica.rj.gov.br
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Secretarias */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📋 Lista Completa das Secretarias ({secretarias.length})
          </h2>
          
          <div className="grid gap-6">
            {secretarias.map((secretaria, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary-800 mb-2">
                        {secretaria.nome}
                      </h3>
                      <p className="text-gray-700">
                        <strong>Secretário(a):</strong> {secretaria.secretario}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Áreas de Atuação</h4>
                      <ul className="space-y-1">
                        {secretaria.areas.map((area, areaIndex) => (
                          <li key={areaIndex} className="text-gray-600 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-marica-500 rounded-full"></span>
                            {area}
                          </li>
                        ))}
                      </ul>
                      
                      {secretaria.observacao && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-blue-800 text-sm">
                            ℹ️ {secretaria.observacao}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contato</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700">{secretaria.endereco}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-marica-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-700">{secretaria.telefone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-marica-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${secretaria.email}`} className="text-primary-600 hover:text-primary-700 underline">
                            {secretaria.email}
                          </a>
                        </div>
                        
                        {secretaria.horario && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-marica-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{secretaria.horario}</span>
                          </div>
                        )}
                        
                        {secretaria.whatsapp && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-gray-700">WhatsApp: {secretaria.whatsapp}</span>
                          </div>
                        )}
                        
                        {secretaria.website && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-marica-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                            <a href={secretaria.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">
                              Site oficial
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <Card className="mt-12">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Como Escolher a Secretaria Certa</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🏥 Problemas de Saúde</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Consultas, medicamentos, postos de saúde, vacinação, vigilância sanitária.
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-3">🎓 Questões Educacionais</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Matrículas, escolas, merenda escolar, transporte escolar, programas educacionais.
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-3">🚧 Obras e Infraestrutura</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Buracos, pavimentação, iluminação pública, manutenção urbana, construções.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🌱 Meio Ambiente</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Licenciamento, poda de árvores, limpeza urbana, fiscalização ambiental.
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-3">👮 Segurança</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Guarda Municipal, trânsito, Defesa Civil, situações de risco, emergências.
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-3">🤝 Assistência Social</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Programas sociais, CRAS, CREAS, auxílios, assistência às famílias.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">💡 Dica Importante</h4>
                  <p className="text-yellow-700 text-sm">
                    Se não souber qual secretaria procurar, use o <strong>KoePrefeito</strong> para criar sua solicitação. 
                    O sistema automaticamente encaminhará para a secretaria responsável ou entre em contato com a 
                    <strong> Central 156</strong> pelo telefone <strong>(21) 156</strong> ou e-mail <strong>central156@marica.rj.gov.br</strong>.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}