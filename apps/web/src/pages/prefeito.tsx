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

export default function PrefeitoPage() {
  return (
    <Layout>
      <Head>
        <title>Prefeito Washington Quaquá - KoePrefeito Maricá</title>
        <meta name="description" content="Biografia, trajetória política e realizações do prefeito Washington Quaquá de Maricá" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Washington Quaquá
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prefeito de Maricá - Terceiro Mandato (2025-2028)
          </p>
        </div>

        {/* Informações Pessoais e Avatar */}
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar grande para o prefeito */}
              <div className="w-32 h-32 rounded-full bg-primary-500 text-white flex items-center justify-center text-3xl font-bold">
                {getInitials("Washington Quaquá")}
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-primary-800 mb-2">
                  Washington Luiz Cardoso Siqueira
                </h2>
                <p className="text-lg text-gray-700 mb-3">
                  <strong>Washington Quaquá</strong> - Prefeito de Maricá
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="error">Partido dos Trabalhadores (PT)</Badge>
                  <Badge variant="info">3º Mandato</Badge>
                  <Badge variant="success">Sociólogo</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dados Pessoais</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Nascimento:</strong> 31 de maio de 1971, São Gonçalo/RJ</p>
                  <p><strong>Naturalidade:</strong> São Gonçalo</p>
                  <p><strong>Estado Civil:</strong> Casado com Gabriela Siqueira Lopes</p>
                  <p><strong>Filhos:</strong> Helena (4 anos) e Diego Zeidan (26 anos)</p>
                  <p><strong>Netos:</strong> Luiz (9 anos) e Alice (5 anos)</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Formação e Trajetória</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Formação:</strong> Sociologia - UFF</p>
                  <p><strong>Origem:</strong> Comunidade do Caramujo, Niterói</p>
                  <p><strong>Militância:</strong> PT desde os 14 anos</p>
                  <p><strong>Cargo Nacional:</strong> Comitê Executivo Nacional do PT</p>
                  <p><strong>Livros:</strong> "Da Favela ao Poder" e "Cabeça nas Nuvens"</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trajetória Política */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Trajetória Política</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📅 Mandatos como Prefeito</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <h4 className="font-medium text-primary-800">1º Mandato: 2009-2012</h4>
                    <p className="text-sm text-gray-600">Eleito em 2008, primeira gestão progressista</p>
                  </div>
                  <div className="p-3 bg-secondary-50 rounded-lg">
                    <h4 className="font-medium text-secondary-800">2º Mandato: 2013-2016</h4>
                    <p className="text-sm text-gray-600">Reeleito em 2012, consolidação dos programas sociais</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">3º Mandato: 2025-2028 (Atual)</h4>
                    <p className="text-sm text-gray-600">Eleito com 73,74% dos votos válidos em 2024</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🏛️ Outros Cargos</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Deputado Federal (2023-2024)</h4>
                    <p className="text-sm text-gray-600">113.282 votos, renunciou para retornar à prefeitura</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Vice-presidente do PT</h4>
                    <p className="text-sm text-gray-600">Cargo nacional no partido</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-3 mt-6">🏆 Reconhecimentos</h3>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Medalha Tiradentes (2023)</h4>
                  <p className="text-sm text-gray-600">Assembleia Legislativa do Estado do Rio de Janeiro</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Principais Realizações */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Principais Realizações</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">🚌 Tarifa Zero</h3>
                <p className="text-sm text-gray-700">
                  Maricá foi o primeiro município brasileiro com mais de 100 mil habitantes a implementar 
                  transporte público gratuito com os "Vermelhinhos".
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">💰 Mumbuca</h3>
                <p className="text-sm text-gray-700">
                  Moeda social que posicionou Maricá como centro de inovação econômica e social, 
                  estimulando a economia circular local.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎓 Passaporte Universitário</h3>
                <p className="text-sm text-gray-700">
                  Programa inovador de acesso ao ensino superior para jovens de Maricá, 
                  democratizando a educação universitária.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">👴 Políticas para Idosos</h3>
                <p className="text-sm text-gray-700">
                  Programas específicos de atenção à terceira idade, incluindo centros de convivência 
                  e atividades especializadas.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">🛢️ Royalties do Petróleo</h3>
                <p className="text-sm text-gray-700">
                  Luta pelos direitos aos royalties do petróleo que transformou a realidade 
                  financeira do município.
                </p>
              </div>
              
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-2">🌱 Desenvolvimento Social</h3>
                <p className="text-sm text-gray-700">
                  Programas de apoio às populações vulneráveis, com foco na melhoria 
                  das condições de vida dos mais necessitados.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objetivos do Mandato Atual */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Objetivos do 3º Mandato (2025-2028)</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🌍 Visão Global</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Tornar Maricá uma cidade mundialmente conhecida
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Investimentos fortes em turismo, cultura e entretenimento
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Transformação da matriz econômica municipal
                  </li>
                </ul>
                
                <h3 className="font-semibold text-gray-900 mb-3 mt-6">🏭 Desenvolvimento Industrial</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Parcerias com setor privado para gerar emprego e renda
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Instalação de fábrica de aeronaves de médio porte (1.000+ empregos)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Conversas com Confederação Nacional da Indústria (CNI)
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🚀 Empreendedorismo</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Transformar Maricá numa cidade do empreendedorismo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Banco Mumbuca criará novas linhas de crédito
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Apoio para residentes abrirem negócios próprios
                  </li>
                </ul>
                
                <h3 className="font-semibold text-gray-900 mb-3 mt-6">🌿 Diversificação Econômica</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Transformar riqueza mineral do petróleo em desenvolvimento
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Foco em indústria, comércio e agroecologia
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-marica-500 rounded-full mt-2"></span>
                    Expansão do setor de serviços
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Biografia Pessoal */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">História Pessoal</h2>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                <strong>Washington Quaquá</strong> tem uma trajetória de vida marcada pela superação e pelo compromisso 
                com as causas sociais. Nascido em São Gonçalo e criado na comunidade do Caramujo em Niterói, 
                vivenciou na pele as dificuldades das populações mais vulneráveis.
              </p>
              
              <p className="mb-4">
                Filho de <strong>Luiz Carlos Siqueira</strong>, policial militar, e <strong>Ione Cardoso</strong>, dona de casa, 
                Quaquá iniciou sua militância política ainda adolescente, aos 14 anos, no Partido dos Trabalhadores (PT). 
                Essa experiência precoce com o ativismo político moldou sua visão de mundo e seu comprometimento 
                com a transformação social.
              </p>
              
              <p className="mb-4">
                Formado em <strong>Sociologia pela Universidade Federal Fluminense (UFF)</strong>, Quaquá aliou 
                o conhecimento acadêmico à experiência prática da militância política. Como sociólogo, desenvolveu 
                uma compreensão profunda das questões sociais que hoje se refletem nas políticas públicas inovadoras 
                implementadas em Maricá.
              </p>
              
              <p>
                Autor dos livros <strong>"Da Favela ao Poder"</strong> e <strong>"Cabeça nas Nuvens"</strong>, 
                Quaquá documenta sua trajetória e compartilha sua visão sobre política e transformação social. 
                Sua filosofia política é centrada na melhoria das condições de vida dos mais vulneráveis, 
                inspirada por sua própria experiência de superação da pobreza.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Legado e Referência Nacional */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Maricá como Referência Nacional</h2>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-primary-800 mb-2">16 Anos de Governos Progressistas</h3>
                <p className="text-gray-700">
                  Com este terceiro mandato, Maricá acumulará 16 anos consecutivos de governos progressistas, 
                  consolidando-se como referência nacional em políticas públicas inovadoras.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">3</div>
                  <div className="text-sm text-gray-600">Mandatos como Prefeito</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600">73,74%</div>
                  <div className="text-sm text-gray-600">Votos na última eleição</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-marica-600">16</div>
                  <div className="text-sm text-gray-600">Anos de governo progressista</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contato e Redes */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Acompanhe o Governo</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🏛️ Gabinete do Prefeito</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Endereço:</strong> Rua Álvares de Castro, 346 - 2º andar - Centro</p>
                  <p><strong>Telefone:</strong> (21) 2637-3907</p>
                  <p><strong>E-mail:</strong> secgabineteprefeito@marica.rj.gov.br</p>
                  <p><strong>Horário:</strong> Segunda a sexta, de 8h às 17h</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📱 Redes Sociais</h3>
                <div className="space-y-3">
                  <a 
                    href="https://www.instagram.com/washington.quaqua.5/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      📷
                    </div>
                    <span className="text-pink-700 font-medium">@washington.quaqua.5</span>
                  </a>
                  
                  <a 
                    href="https://www.facebook.com/Washington.Quaqua.13/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      📘
                    </div>
                    <span className="text-blue-700 font-medium">Washington Quaquá</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-primary-800 mb-2">💬 Canal Direto com o Cidadão</h4>
                  <p className="text-primary-700 text-sm">
                    Use o <strong>KoePrefeito</strong> para fazer suas solicitações e acompanhar demandas diretamente 
                    com a administração municipal. Sua participação é fundamental para uma cidade cada vez melhor!
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