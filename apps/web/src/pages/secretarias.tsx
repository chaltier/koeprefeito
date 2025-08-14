import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";

const secretarias = [
  {
    nome: "Secretaria Municipal de Administração",
    secretario: "Gecimar Jorge de Aragão",
    areas: ["Recursos Humanos", "Administração Geral", "Patrimônio"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "administracao@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Educação", 
    secretario: "Professor Rodrigo Moura",
    areas: ["Ensino Fundamental", "Educação Infantil", "Programas Educacionais"],
    endereco: "Rua Bacelar da Silva Bezerra, 121 - Centro",
    telefone: "(21) 2637-8817",
    email: "gabineteeducacaosme@gmail.com"
  },
  {
    nome: "Secretaria Municipal de Saúde",
    secretario: "Marcelo Costa Velho Mendes de Azevedo",
    areas: ["Atenção Básica", "Urgência e Emergência", "Vigilância Sanitária"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "saude@marica.rj.gov.br",
    observacao: "26 Unidades de Saúde da Família (USF) nos quatro distritos"
  },
  {
    nome: "Secretaria Municipal de Segurança Cidadã",
    secretario: "Julio Cesar Veras Vieira",
    areas: ["Guarda Municipal", "Defesa Civil", "Trânsito"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2010",
    email: "seguranca@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Meio Ambiente e Sustentabilidade",
    secretario: "Helter Viana Ferreira de Almeida",
    areas: ["Licenciamento Ambiental", "Fiscalização", "Sustentabilidade"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "meioambiente@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Assistência Social e Cidadania",
    secretario: "A definir",
    areas: ["CRAS", "CREAS", "Programas Sociais"],
    endereco: "Rua Álvares de Castro, 346 - Centro", 
    telefone: "(21) 2637-2052",
    email: "assistenciasocial@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Obras e Urbanismo",
    secretario: "A definir",
    areas: ["Obras Públicas", "Manutenção Urbana", "Pavimentação"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "obras@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Economia Solidária e Empreendedorismo Social",
    secretario: "A definir",
    areas: ["Microcrédito", "Cooperativas", "Economia Solidária"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "economia@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Transição Climática e Resiliência Ambiental",
    secretario: "A definir",
    areas: ["Mudanças Climáticas", "Sustentabilidade", "Resiliência"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "climatica@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Esporte e Lazer",
    secretario: "A definir",
    areas: ["Esportes", "Recreação", "Equipamentos Esportivos"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "esporte@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Cultura",
    secretario: "A definir",
    areas: ["Patrimônio Cultural", "Eventos", "Arte e Cultura"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "cultura@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Turismo",
    secretario: "A definir",
    areas: ["Desenvolvimento Turístico", "Promoção", "Eventos"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "turismo@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Agricultura, Pecuária e Pesca",
    secretario: "A definir", 
    areas: ["Agricultura Familiar", "Pesca Artesanal", "Pecuária"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "agricultura@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Desenvolvimento Urbano e Habitação",
    secretario: "A definir",
    areas: ["Planejamento Urbano", "Habitação Popular", "Regularização"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "habitacao@marica.rj.gov.br"
  },
  {
    nome: "Secretaria Municipal de Transportes",
    secretario: "A definir",
    areas: ["Transporte Público", "Mobilidade", "Trânsito"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "transportes@marica.rj.gov.br"
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