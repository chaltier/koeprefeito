import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/Layout";
import { Card, CardContent, CardHeader } from "@koeprefeito/ui";
import { Badge } from "@koeprefeito/ui";

// Helper function to get initials from a name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(word => word.length > 0)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
};

// Helper function to generate consistent colors based on name
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-primary-500 text-white",
    "bg-secondary-500 text-white", 
    "bg-marica-500 text-white",
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-purple-500 text-white",
    "bg-indigo-500 text-white",
    "bg-pink-500 text-white",
    "bg-red-500 text-white",
    "bg-yellow-500 text-gray-900"
  ];
  
  const hash = name.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};

const vereadores = [
  {
    nome: "Adelso Pereira",
    partido: "AVANTE",
    email: "vereadoradelsopereira@marica.rj.leg.br",
    areas: ["Infraestrutura", "Desenvolvimento Urbano"]
  },
  {
    nome: "Adriana Luiza da Costa", 
    partido: "PDT",
    email: "adrianaluiza@marica.rj.leg.br",
    areas: ["Direitos da Mulher", "Assistência Social"]
  },
  {
    nome: "Adailton Pereira da Costa Filho",
    partido: "PDT", 
    email: "adailton@marica.rj.leg.br",
    areas: ["Juventude", "Esporte"]
  },
  {
    nome: "Aldair Nunes Elias",
    partido: "PT",
    email: "aldair@marica.rj.leg.br",
    areas: ["Trabalho", "Economia Solidária"]
  },
  {
    nome: "Andrea Cunha da Silva Monken",
    partido: "PT",
    email: "andrea@marica.rj.leg.br", 
    areas: ["Educação", "Cultura"]
  },
  {
    nome: "Adenizio do Nascimento Filho",
    partido: "AVANTE",
    email: "adenizio@marica.rj.leg.br",
    areas: ["Saúde", "Terceira Idade"]
  },
  {
    nome: "Christiane de Lima Corrêa Botelho",
    partido: "PT",
    email: "christiane@marica.rj.leg.br",
    areas: ["Meio Ambiente", "Sustentabilidade"]
  },
  {
    nome: "Luis Felipe Paulino Auni",
    partido: "PSD", 
    email: "luisfelipe@marica.rj.leg.br",
    areas: ["Turismo", "Desenvolvimento Econômico"]
  },
  {
    nome: "Fabricio da Silva Gomes",
    partido: "PSD",
    email: "fabricio@marica.rj.leg.br",
    areas: ["Segurança", "Ordem Pública"]
  },
  {
    nome: "Felipe Paiva de Oliveira",
    partido: "CIDADANIA",
    email: "felipe@marica.rj.leg.br", 
    areas: ["Inovação", "Tecnologia"]
  },
  {
    nome: "Frank Francisco Fonseca da Costa",
    partido: "AVANTE",
    email: "frank@marica.rj.leg.br",
    areas: ["Agricultura", "Pesca"]
  },
  {
    nome: "Luiz Felipe Santos de Oliveira",
    partido: "PT",
    email: "luizfelipesantos@marica.rj.leg.br",
    areas: ["Habitação", "Direitos Humanos"]
  },
  {
    nome: "Igor Nunes Corrêa",
    partido: "ANL",
    email: "igor@marica.rj.leg.br",
    areas: ["Finanças", "Orçamento"]
  },
  {
    nome: "Gleice Kelly Bernardo dos Santos Figueiredo",
    partido: "PT",
    email: "gleice@marica.rj.leg.br",
    areas: ["Assistência Social", "Família"]
  },
  {
    nome: "Marco Ebenezer Oliveira Borges",
    partido: "PDT", 
    email: "marco@marica.rj.leg.br",
    areas: ["Educação", "Desenvolvimento Social"]
  },
  {
    nome: "Ricardo Magalhães Garcia Gutierrez",
    partido: "PR",
    email: "ricardo@marica.rj.leg.br",
    areas: ["Transportes", "Mobilidade Urbana"]
  },
  {
    nome: "Rita de Cássia Rocha Livermore",
    partido: "PT",
    email: "rita@marica.rj.leg.br",
    areas: ["Saúde da Mulher", "Direitos Sociais"]
  },
  {
    nome: "Robson Dutra da Silva",
    partido: "PSD",
    email: "robson@marica.rj.leg.br",
    areas: ["Obras", "Infraestrutura"]
  },
  {
    nome: "Ademilton da Silva Diniz",
    partido: "CIDADANIA",
    email: "ademilton@marica.rj.leg.br",
    areas: ["Comércio", "Indústria"]
  },
  {
    nome: "Paulo Thiago Fonseca de Araujo",
    partido: "PT",
    email: "paulothiago@marica.rj.leg.br",
    areas: ["Meio Ambiente", "Sustentabilidade"]
  },
  {
    nome: "Valdevino Costa da Silva",
    partido: "PL", 
    email: "valdevino@marica.rj.leg.br",
    areas: ["Segurança Pública", "Defesa Civil"]
  }
];

const partidoColors: Record<string, "info" | "warning" | "success" | "secondary" | "error"> = {
  "PT": "error",
  "PDT": "warning", 
  "PSD": "info",
  "AVANTE": "success",
  "CIDADANIA": "secondary",
  "ANL": "info",
  "PR": "warning",
  "PL": "info"
};

export default function VerreadoresPage() {
  const partidoStats = vereadores.reduce((acc, vereador) => {
    acc[vereador.partido] = (acc[vereador.partido] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <Head>
        <title>Vereadores - KoePrefeito Maricá</title>
        <meta name="description" content="Lista completa dos 21 vereadores de Maricá com contatos e áreas de atuação" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Câmara Municipal de Maricá
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os 21 vereadores eleitos que representam os interesses da população
            no Poder Legislativo de Maricá.
          </p>
        </div>

        {/* Informações da Câmara */}
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Contato da Câmara Municipal</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Endereço</h3>
                <p className="text-gray-700 mb-4">
                  Av. Nossa Sra. do Amparo, Nº 57<br />
                  Centro - Maricá/RJ<br />
                  CEP: 24900-830
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-2">Site Oficial</h3>
                <a 
                  href="https://marica.rj.leg.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  marica.rj.leg.br
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Telefones</h3>
                <div className="space-y-1 text-gray-700 mb-4">
                  <p>📞 (21) 2634-2205 / 2634-2105</p>
                  <p>📞 Presidência: (21) 3731-0101</p>
                  <p>📞 Gratuito: 0800 101 1177</p>
                  <p>📱 Imprensa: +55 21 99996-6220</p>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">E-mails</h3>
                <div className="space-y-1 text-gray-700">
                  <p>📧 administracao@marica.rj.leg.br</p>
                  <p>📧 imprensa@marica.rj.leg.br</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
              <p className="text-gray-700">
                🕘 Segunda a Sexta: 9h às 17h
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Composição Partidária */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Composição Partidária</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(partidoStats)
                .sort(([,a], [,b]) => b - a)
                .map(([partido, quantidade]) => (
                  <Badge 
                    key={partido} 
                    variant={partidoColors[partido] || "secondary"}
                    className="text-sm font-medium px-3 py-1"
                  >
                    {partido}: {quantidade} {quantidade === 1 ? 'vereador' : 'vereadores'}
                  </Badge>
                ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Total: {vereadores.length} vereadores representando {Object.keys(partidoStats).length} partidos políticos
            </p>
          </CardContent>
        </Card>

        {/* Lista de Vereadores */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            👥 Lista Completa dos Vereadores
          </h2>
          
          <div className="grid gap-4">
            {vereadores
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((vereador, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      {/* Avatar e informações do vereador */}
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(vereador.nome)}`}
                        >
                          {getInitials(vereador.nome)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {vereador.nome}
                            </h3>
                            <Badge variant={partidoColors[vereador.partido] || "secondary"}>
                              {vereador.partido}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Vereador</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-marica-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a 
                          href={`mailto:${vereador.email}`} 
                          className="text-primary-600 hover:text-primary-700 underline text-sm"
                        >
                          {vereador.email}
                        </a>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-marica-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2" />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-gray-900">Áreas de Atuação: </span>
                          <span className="text-sm text-gray-600">
                            {vereador.areas.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${vereador.email}`}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contatar
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Informações sobre o Papel dos Vereadores */}
        <Card className="mt-12">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">O Papel dos Vereadores</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📝 Função Legislativa</h3>
                <ul className="space-y-2 text-gray-600 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Elaborar e aprovar leis municipais
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Propor projetos de lei de interesse público
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Discutir e votar o orçamento municipal
                  </li>
                </ul>
                
                <h3 className="font-semibold text-gray-900 mb-3">🔍 Função Fiscalizadora</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Fiscalizar atos do Poder Executivo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Acompanhar execução orçamentária
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Realizar audiências públicas
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🗣️ Representação Popular</h3>
                <ul className="space-y-2 text-gray-600 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Representar interesses da população
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Ouvir demandas dos cidadãos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Propor soluções para problemas locais
                  </li>
                </ul>
                
                <h3 className="font-semibold text-gray-900 mb-3">🤝 Como Participar</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Participe das sessões da Câmara
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Entre em contato direto por e-mail
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Use o KoePrefeito para demandas públicas
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Dica para Contato</h4>
                  <p className="text-blue-700 text-sm">
                    Ao entrar em contato com um vereador, seja claro sobre sua solicitação e forneça informações relevantes. 
                    Para questões gerais da cidade, você também pode usar o <strong>KoePrefeito</strong> que encaminhará 
                    sua demanda para o órgão competente.
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