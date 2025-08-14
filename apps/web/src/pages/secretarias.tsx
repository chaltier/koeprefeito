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
    nome: "Secretaria de Agricultura e Pecuária",
    secretario: "Wagner de Barros Soares",
    areas: ["Posto Municipal de Defesa Agropecuária", "Gestão Pesqueira", "Fazenda Pública Joaquín Piñero", "Programa Lagoa Limpa, Mar de Peixe"],
    endereco: "Rodovia Vereador Oldemar Guedes de Figueirado, Km 1, s/nº - Ubatiba",
    telefone: "(21) 99909-8116",
    email: "adm.secapmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h"
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
    nome: "Secretaria de Assistência Social e Cidadania",
    secretario: "Dryene Tavares Arêas Silva",
    areas: ["CRAS", "CREAS", "Programas Sociais", "Sistema Único de Assistência Social (SUAS)"],
    endereco: "Rua Domício da Gama, lote 4, quadra 14, loja 1 - Centro", 
    telefone: "(21) 2637-3648 / (21) 2634-0823",
    email: "assistenciasocial@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Bem-Estar Animal",
    secretario: "Robson Teixeira da Silva (Robgol)",
    areas: ["Programa Municipal de Controle Reprodutivo", "Campanhas de Adoção", "Campanhas de Vacinação", "Mumbucão"],
    endereco: "Rua Prefeito Hilário Costa e Silva, 100 - Parque Eldorado",
    telefone: "(21) 97556-7695",
    email: "protecaoanimal@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Ciência e Tecnologia",
    secretario: "Sabrina dos Santos Alves",
    areas: ["Pesquisa Científica", "Popularização da Ciência", "Praça Cientizar", "Observatório Astronômico"],
    endereco: "Avenida Roberto Silveira, 1978 - Flamengo",
    telefone: "(21) 2042-7222 (Ramal: 551 e 552)",
    email: "gabinete.ct@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "Ativa em Facebook, Instagram, YouTube, WhatsApp e TikTok"
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
    nome: "Secretaria de Cultura e das Utopias",
    secretario: "Sady Bianchin",
    areas: ["Atividades Artísticas", "Patrimônio Cultural", "Eventos Culturais", "Difusão Cultural"],
    endereco: "Rua Adelaide de Souza Bezerra, 104 - Centro",
    telefone: "(21) 2634-1165 / (21) 99748-9433 (Ramal: 1302)",
    email: "gabinetecultura@marica.rj.gov.br / cultura@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Defesa do Consumidor",
    secretario: "Rick Aquino",
    areas: ["Orientação Jurídica", "Projetos de Educação para Consumo", "PROCON Maricá", "Fiscalização de Empresas"],
    endereco: "Rua Coronel Aloísio Costa e Silva, 18 - Parque Eldorado",
    telefone: "(21) 96738-7962 / (21) 97235-7207",
    email: "defesadoconsumidor@marica.rj.gov.br",
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
    nome: "Secretaria de Energias Renováveis e Iluminação Pública",
    secretario: "Verônica da Silva Costa Faria",
    areas: ["Plano Municipal de Iluminação", "Instalação de Iluminação", "Manutenção de Iluminação Pública"],
    endereco: "Rua: Alcebíades Alves de Matos, Lote 8A Quadra C - Centro",
    telefone: "(21) 99649-5256",
    email: "pmmiluminacao@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    whatsapp: "(21) 99673-7511 (apenas mensagens)",
    cep: "24.900-710"
  },
  {
    nome: "Secretaria Especial de Promoção das Comunidades e do Minha Casa, Minha Vida",
    secretario: "Brunna Letícia de Oliveira Tavares (Brunna Índia)",
    areas: ["Desenvolvimento Urbano", "Regularização Fundiária", "Acesso à Habitação Digna", "Fortalecimento da Integração Social"],
    endereco: "Rua Van Lerberghe, 249 - Itaipuaçu",
    telefone: "(21) 98674-0090 (Ramal: 1282)",
    email: "sec.comunidades@marica.rj.gov.br",
    horario: "Segunda a sexta, de 9h às 17h"
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
    nome: "Executiva de Gestão de Governo",
    secretario: "Arlen Pereira",
    areas: ["Articulação Política", "Relações Executivo-Legislativo", "Coordenação da Administração Municipal", "Desenvolvimento de Recursos Humanos"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 3731-2067 (Ramal: 273)",
    email: "secretariadegoverno@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Gabinete do Prefeito",
    secretario: "Dayrlene da Silva Costa (Chefe de Gabinete)",
    areas: ["Assistência ao Executivo Municipal", "Coordenação de Ações Estratégicas", "Execução de Políticas Públicas", "Agenda do Prefeito"],
    endereco: "Rua Álvares de Castro, 346 - 2º andar - Centro",
    telefone: "(21) 2637-3907 (Ramal: 207 e 218)",
    email: "secgabineteprefeito@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h",
    cep: "24.900-880"
  },
  {
    nome: "Secretaria de Gestão Tributária e Fiscal",
    secretario: "Lawrice dos Santos Souza",
    areas: ["Administração de Receitas Municipais", "Políticas Tributárias", "Cadastros Fiscais", "Controle de Arrecadações"],
    endereco: "Rua Álvares de Castro, 272 - Centro",
    telefone: "(21) 2637-4208 (Ramal: 1233)",
    email: "seget@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
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
    nome: "Secretaria de Habitação",
    secretario: "Marcus Toselli (Marcus Bambam)",
    areas: ["Regularização Fundiária", "Programa de Melhorias Habitacionais", "Programa de Aluguel Social", "Programa de Relocação"],
    endereco: "Rua Álvares de Castro, 586 - Araçatiba",
    telefone: "(21) 2042-7222 (Ramal: 2503)",
    email: "habitacaomarica@gmail.com / secretariahabitacao@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h",
    whatsapp: "(21) 99169-7458"
  },
  {
    nome: "Secretaria de Justiça e Cidadania",
    secretario: "A definir",
    areas: ["Políticas de Justiça", "Cidadania", "Direitos Civis", "Mediação de Conflitos"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "justicacidadania@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Juventude e Participação Popular",
    secretario: "A definir",
    areas: ["Políticas de Juventude", "Participação Cidadã", "Conselhos Municipais", "Orçamento Participativo"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "juventude@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Meio Ambiente e Sustentabilidade",
    secretario: "Helter Viana Ferreira de Almeida",
    areas: ["Licenciamento Ambiental", "Fiscalização", "Arborização Urbana", "Educação Ambiental", "Unidades de Conservação"],
    endereco: "Rua Albatroz, 556 - Parque Nanci",
    telefone: "(21) 2042-7222 (Ramal: 289 e 2406)",
    email: "ambiente.marica.rj@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    cep: "24.914-100",
    observacao: "E-mails específicos: podaecortemarica.rj@gmail.com (poda), fiscalizacao.ambiente@gmail.com (energia)"
  },
  {
    nome: "Secretaria de Pesca",
    secretario: "A definir",
    areas: ["Pesca Artesanal", "Aquicultura", "Políticas Pesqueiras", "Apoio aos Pescadores"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "pesca@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria da Pessoa com Deficiência e Inclusão",
    secretario: "A definir",
    areas: ["Políticas de Inclusão", "Acessibilidade", "Direitos da Pessoa com Deficiência", "Tecnologia Assistiva"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "inclusao@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Planejamento, Orçamento e Fazenda",
    secretario: "A definir",
    areas: ["Planejamento Municipal", "Elaboração Orçamentária", "Gestão Financeira", "Controle Interno"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "planejamento@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Direito das Mulheres",
    secretario: "A definir",
    areas: ["Políticas para Mulheres", "Combate à Violência", "Empoderamento Feminino", "Casa da Mulher Maricaense"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "direitosmulheres@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Políticas de Desenvolvimento Regional e Articulação com o CONLESTE",
    secretario: "A definir",
    areas: ["Desenvolvimento Regional", "Articulação Intermunicipal", "CONLESTE", "Parcerias Regionais"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "desenvolvimentoregional@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Políticas para a Terceira Idade",
    secretario: "A definir",
    areas: ["Políticas para Idosos", "Centros de Convivência", "Atividades para Terceira Idade", "Proteção ao Idoso"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "terceiraidade@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Promoção de Eventos",
    secretario: "A definir",
    areas: ["Organização de Eventos", "Festivais", "Shows", "Eventos Culturais", "Logística de Eventos"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "eventos@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Proteção e Defesa Civil",
    secretario: "A definir",
    areas: ["Defesa Civil", "Prevenção de Riscos", "Emergências", "Proteção da População"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "defesacivil@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Recursos Hídricos e Minerais",
    secretario: "A definir",
    areas: ["Gestão de Recursos Hídricos", "Políticas Hídricas", "Recursos Minerais", "Conservação da Água"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "recursoshidricos@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Representação e Articulação Institucional",
    secretario: "A definir",
    areas: ["Articulação Institucional", "Representação Municipal", "Relações Governamentais", "Convênios"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "representacao@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Relações Internacionais",
    secretario: "A definir",
    areas: ["Relações Internacionais", "Cooperação Internacional", "Cidades Irmãs", "Projetos Internacionais"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "internacional@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
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
    nome: "Secretaria de Segurança Cidadã (SESEG)",
    secretario: "Julio Cesar Veras Vieira",
    areas: ["Guarda Municipal (329 guardas)", "PROEIS com PM", "Inteligência e Políticas de Segurança"],
    endereco: "Rua Luiz Alberto Ramos Machado, lote 14, quadra K - Parque Eldorado",
    telefone: "(21) 2648-0269 (Ramal: 1007)",
    email: "gabinete.segurancacidada@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Bem-Estar Social e Entretenimento",
    secretario: "A definir",
    areas: ["Bem-Estar Social", "Entretenimento", "Lazer Social", "Atividades Comunitárias"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "bemestar@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Trânsito",
    secretario: "A definir",
    areas: ["Trânsito Municipal", "Sinalização", "Educação no Trânsito", "Fiscalização"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "transito@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Trabalho e Emprego",
    secretario: "A definir",
    areas: ["Políticas de Emprego", "Qualificação Profissional", "Intermediação de Mão de Obra", "Economia Popular"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "trabalhoemprego@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Transportes e Postura (SEMTRANS)",
    secretario: "Andre Luis Azeredo da Silva (André Casquinha)",
    areas: ["Transporte Público", "Taxi/Moto-taxi", "Van Escolar", "Posturas 1º ao 4º Distrito"],
    endereco: "Rodovia Amaral Peixoto, Km 21,5 - Centro Administrativo Integrado - São José do Imbassaí",
    telefone: "(21) 2637-3706 / (21) 2637-4208 / (21) 99698-3699",
    email: "semtransmarica@gmail.com",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "Ramal 449 (atendimento contribuinte) / Ramal 448 (permissionários) / E-mails específicos para posturas"
  },
  {
    nome: "Secretaria de Transição Climática e Resiliência Ambiental",
    secretario: "A definir",
    areas: ["Mudanças Climáticas", "Resiliência Ambiental", "Sustentabilidade", "Adaptação Climática"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "transicaoclimatica@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  },
  {
    nome: "Secretaria de Turismo, Comércio, Indústria e Mercado Interno (STCIM)",
    secretario: "José Alexandre Almeida da Silva",
    areas: ["Carnaval", "Festa da Pesca", "Natal Iluminado", "Pratas da Casa", "Feirarte", "Centros de Informações Turísticas"],
    endereco: "Rua Domício da Gama, 259 - Centro",
    telefone: "(21) 2042-7222 (Ramal: 1240)",
    email: "turismo@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h",
    observacao: "Centros de Informação Turística no Centro, Aeroporto/Codemar e móvel em eventos"
  },
  {
    nome: "Secretaria de Urbanismo",
    secretario: "A definir",
    areas: ["Planejamento Urbano", "Licenciamento Urbanístico", "Ordenamento Territorial", "Projetos Urbanos"],
    endereco: "Rua Álvares de Castro, 346 - Centro",
    telefone: "(21) 2637-2052",
    email: "urbanismo@marica.rj.gov.br",
    horario: "Segunda a sexta, de 8h às 17h"
  }
];

export default function SecretariasPage() {
  return (
    <Layout>
      <Head>
        <title>Secretarias Municipais - KoePrefeito Maricá</title>
        <meta name="description" content="Contatos e informações completas das 43 Secretarias Municipais de Maricá" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secretarias Municipais de Maricá
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contatos diretos com as 43 secretarias da Prefeitura de Maricá para resolução
            de demandas específicas por área de atuação municipal.
          </p>
        </div>

        {/* Informações Gerais */}
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Informações Gerais da Prefeitura</h2>
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
                  <p>(21) 3731-2067</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Horário de Funcionamento Padrão</h3>
                <p className="text-gray-700 mb-4">
                  Segunda a Sexta: 8h às 17h<br />
                  Sábados: 8h às 12h (algumas secretarias)
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
            📋 Lista Completa das {secretarias.length} Secretarias Municipais
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
                        
                        {secretaria.cep && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-marica-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="text-gray-700">CEP: {secretaria.cep}</span>
                          </div>
                        )}
                        
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

        {/* Guia de Como Escolher */}
        <Card className="mt-12">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-primary-800">Como Escolher a Secretaria Certa</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🏥 Saúde e Bem-Estar</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <strong>Saúde:</strong> USF, medicamentos, vacinação</li>
                  <li>• <strong>Assistência Social:</strong> CRAS, CREAS, programas sociais</li>
                  <li>• <strong>Bem-Estar Animal:</strong> castração, adoção</li>
                  <li>• <strong>Terceira Idade:</strong> políticas para idosos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🏫 Educação e Cultura</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <strong>Educação:</strong> matrículas, merenda, transporte</li>
                  <li>• <strong>Cultura:</strong> eventos, patrimônio cultural</li>
                  <li>• <strong>Esportes:</strong> 30+ modalidades gratuitas</li>
                  <li>• <strong>Ciência e Tecnologia:</strong> inovação</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">🏗️ Infraestrutura</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <strong>Urbanismo:</strong> planejamento urbano</li>
                  <li>• <strong>Iluminação:</strong> manutenção de postes</li>
                  <li>• <strong>Transportes:</strong> ônibus, táxi, posturas</li>
                  <li>• <strong>Meio Ambiente:</strong> licenças, poda</li>
                </ul>
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
                    <strong> Central 156</strong> pelo telefone <strong>(21) 156</strong>.
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