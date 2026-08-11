import type { LandingCopy } from '../landing-pages';

/** Portuguese long-form copy for the keyword landing pages. */
export const PT_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Táxi Aeroporto Barcelona Centro | Reservar Online',
    description:
      'Reserve um táxi do aeroporto de Barcelona para o centro. Tarifa oficial do taxímetro AMB, suplemento de El Prat incluído na estimativa, motorista nas chegadas.',
    h1: 'Táxi do aeroporto de Barcelona para o centro',
    intro:
      'Um táxi de El Prat até ao centro de Barcelona demora entre 25 e 35 minutos consoante o trânsito e o terminal de chegada. Reservar com antecedência significa ter já um motorista atribuído quando aterra, com um cartaz com o seu nome nas chegadas, em vez de fazer fila na praça do T1 ou do T2.',
    sections: [
      {
        h2: 'Quanto custa um transfer do aeroporto de Barcelona',
        body: 'A tarifa é a do taxímetro oficial da AMB. A partir de El Prat paga o valor do taxímetro mais o suplemento fixo de aeroporto, e existe uma tarifa mínima para percursos muito curtos com origem no aeroporto. Na prática, uma viagem do aeroporto para o centro de Barcelona costuma situar-se entre os trinta e cinco e os quarenta e cinco euros, mais cara à noite e aos fins de semana quando se aplica a tarifa T-2. Introduza acima o destino exato para uma estimativa precisa.',
      },
      {
        h2: 'Onde o motorista o espera',
        body: 'O seu motorista aguarda dentro da sala de chegadas do seu terminal com um cartaz com o seu nome e acompanha o número do voo, pelo que um atraso não lhe faz perder o carro. O ponto de encontro exato para T1 e T2 vai no email de confirmação.',
      },
      {
        h2: 'Terminal 1 e Terminal 2',
        body: 'Ambos os terminais têm praça de táxis oficial e os nossos motoristas servem os dois. O T1 concentra os voos de longo curso e boa parte da Vueling; o T2 serve muitas companhias low cost. A diferença de preço entre eles é pequena, uns quilómetros, embora o T1 fique um pouco mais longe da cidade.',
      },
    ],
  },

  'city-to-airport': {
    title: 'Táxi de Barcelona para o Aeroporto | Reservar',
    description:
      'Reserve um táxi de Barcelona cidade para o aeroporto de El Prat. Hora de recolha fixa, tarifa oficial do taxímetro e motoristas que conhecem as portas de cada terminal.',
    h1: 'Táxi de Barcelona para o aeroporto',
    intro:
      'É a viagem de ida que compensa mesmo reservar. Um táxi marcado com antecedência chega ao seu hotel ou apartamento a uma hora combinada, o que pesa muito mais quando tem um voo para apanhar do que quando está a chegar.',
    sections: [
      {
        h2: 'Quando reservar a recolha',
        body: 'Para um voo europeu de curto curso, conte duas horas entre chegar a El Prat e a partida; para longo curso, três. Some 30 a 40 minutos de percurso a partir do centro de Barcelona, e mais nas horas de ponta durante a semana. O nosso formulário exige um mínimo de três horas de antecedência, por isso reserve o mais tardar na véspera à noite.',
      },
      {
        h2: 'Deixar no terminal certo',
        body: 'Diga-nos a companhia aérea e deixamo-lo à porta correta. As partidas do T1 são uma única sala grande; o T2 divide-se nos blocos A, B e C, e sair no bloco errado significa uma caminhada longa com bagagem.',
      },
      {
        h2: 'Partidas de madrugada',
        body: 'A primeira vaga de partidas sai de El Prat antes das 07:00, o que implica recolhas a partir das 04:30. Essas viagens seguem a tarifa noturna T-2, e confirmamos o motorista na véspera para que às quatro da manhã não fique nada por resolver.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Táxi Aeroporto El Prat | Transferes Licenciados',
    description:
      'Táxis licenciados de e para o aeroporto de Barcelona-El Prat (BCN). Reserve online com estimativa pela tarifa oficial AMB e motorista atribuído ao seu voo.',
    h1: 'Táxi aeroporto El Prat',
    intro:
      'O aeroporto Josep Tarradellas Barcelona-El Prat, que quase toda a gente continua a tratar apenas por El Prat, fica a cerca de 15 km a sudoeste da cidade. É o segundo aeroporto espanhol com mais tráfego, e o táxi é a forma mais rápida de chegar a Barcelona a quase qualquer hora, desde que haja um carro à espera.',
    sections: [
      {
        h2: 'Reservar em vez de esperar na fila',
        body: 'A praça oficial de El Prat está bem organizada e costuma andar depressa. Congestiona em momentos previsíveis: as vagas de chegadas a meio da manhã, os domingos à noite e quando aterram vários voos de longo curso ao mesmo tempo. Reservar elimina esse risco por completo e fixa o seu motorista à partida, com a mesma tarifa de taxímetro.',
      },
      {
        h2: 'O suplemento de aeroporto',
        body: 'Toda a viagem que comece ou termine em El Prat leva um suplemento de aeroporto fixo definido pela AMB, e as viagens com origem no aeroporto têm tarifa mínima. Ambos estão incluídos na estimativa que vê antes de reservar, por isso o taxímetro não traz surpresas.',
      },
      {
        h2: 'Passageiros de cruzeiro',
        body: 'Para quem liga a um cruzeiro, o percurso entre El Prat e o terminal de cruzeiros do Moll Adossat tem preço fechado oficial em vez de taxímetro. Introduza o terminal de cruzeiros como destino e a estimativa muda automaticamente para esse preço fixo.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Preço Táxi Aeroporto Barcelona | Tarifas AMB 2026',
    description:
      'O que custa realmente um táxi para o aeroporto de Barcelona: tabela oficial AMB, suplemento de El Prat, tarifa mínima de aeroporto e a nossa taxa de reserva.',
    h1: 'Preço do táxi para o aeroporto de Barcelona',
    intro:
      'Os preços dos táxis em Barcelona são regulados. Nenhum táxi licenciado pode cobrar mais nem menos do que o taxímetro oficial da AMB, o que significa que a resposta honesta a «quanto custa» é uma conta, não um número comercial. É assim que essa conta funciona.',
    sections: [
      {
        h2: 'Como é calculada a sua tarifa',
        body: 'Cada viagem começa com uma bandeirada fixa e depois soma um preço por quilómetro. A tarifa aplicável depende de quando viaja: a T-1 é a tarifa diurna de segunda a sexta entre as 08:00 e as 20:00, e a T-2 é a mais alta, que cobre noites, todo o sábado e domingo e os feriados. Os suplementos de aeroporto, porto de cruzeiros, estação de Sants e Fira Gran Via somam-se, com um máximo por serviço.',
      },
      {
        h2: 'Existe táxi barato a partir do aeroporto?',
        body: 'Não no sentido de um operador ficar abaixo de outro: o taxímetro da AMB é idêntico em todos os táxis licenciados, por isso ninguém pode legalmente ser mais barato na corrida. O que pode controlar é o horário e o veículo. Viajar na faixa diurna T-1 custa bastante menos por quilómetro do que à noite ou ao fim de semana, e a quatro pessoas um só carro compensa mais do que quatro bilhetes. Desconfie de quem anuncia tarifas muito abaixo do taxímetro: costuma indicar veículo sem licença.',
      },
      {
        h2: 'A tarifa mínima de aeroporto',
        body: 'As viagens que começam em El Prat têm tarifa mínima. Se o taxímetro marcar menos do que esse mínimo num percurso curto, paga o mínimo. Afeta sobretudo as deslocações para El Prat vila ou hotéis próximos, não as viagens para Barcelona.',
      },
      {
        h2: 'O que cobramos',
        body: 'A nossa taxa de reserva é uma percentagem da corrida, paga online no momento da reserva: 20% de segunda a sexta e 25% aos fins de semana, feriados e noites especiais. É um serviço de organização da viagem, não um agravamento da tarifa, e nunca aparece no taxímetro. Vê-a como linha separada antes de pagar e recebe recibo próprio. Também pode pré-pagar a viagem completa a preço fechado, ficando sem nada a pagar no táxi.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcelona Aeroporto | Porta a Porta',
    description:
      'Reserve um táxi do seu hotel em Barcelona para o aeroporto de El Prat, ou do aeroporto até à porta do hotel. Porta a porta, licenciado e com tarifa oficial.',
    h1: 'Transferes de hotel para o aeroporto de Barcelona',
    intro:
      'A maioria das nossas reservas são transferes de hotel, nos dois sentidos. Um táxi porta a porta elimina a parte da viagem que mais se subestima: levar as malas do átrio do hotel até uma praça de táxis, ou encontrar a morada certa depois de um voo longo.',
    sections: [
      {
        h2: 'Táxi do hotel para o aeroporto',
        body: 'Dê-nos o nome do hotel e tratamos do resto. Nas ruas estreitas do Bairro Gótico e do Born, onde os carros nem sempre chegam à entrada, combinamos consigo previamente o ponto de recolha acessível mais próximo em vez de deixar ao acaso no próprio dia.',
      },
      {
        h2: 'Transfer do aeroporto para o hotel',
        body: 'No sentido inverso, o seu motorista recebe-o nas chegadas com um cartaz e leva-o diretamente à entrada do hotel. Muito útil com crianças, bagagem pesada ou uma aterragem de madrugada.',
      },
      {
        h2: 'Apartamentos e alojamento local',
        body: 'O mesmo se aplica a apartamentos de arrendamento curto e moradas de Airbnb. Acrescente o código da porta ou a entrada exata nas notas da reserva e o motorista terá essa informação antes da recolha.',
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Táxi Estação de Sants para o Aeroporto de Barcelona',
    description:
      'Reserve um táxi da estação de Barcelona-Sants para o aeroporto de El Prat. Cerca de 15 minutos, tarifa oficial com suplemento de estação incluído.',
    h1: 'Táxi da estação de Sants para o aeroporto',
    intro:
      'Sants é a principal estação ferroviária de Barcelona e o ponto de chegada dos AVE de Madrid, Valência e Sevilha. É também o grande nó de transportes mais próximo de El Prat: a viagem de táxi ronda os 15 minutos fora das horas de ponta.',
    sections: [
      {
        h2: 'O suplemento da estação de Sants',
        body: 'As viagens que começam ou terminam na estação de Sants levam um pequeno suplemento fixo definido pela AMB, além da tarifa do taxímetro. Juntamente com o suplemento de aeroporto, ambos estão incluídos na estimativa que vê antes de reservar, e o total de suplementos tem um teto por serviço.',
      },
      {
        h2: 'Onde encontrar o motorista',
        body: 'A praça oficial fica do lado da plaça dels Països Catalans. Num transfer reservado combinamos um ponto de encontro concreto no momento da reserva, o que em Sants compensa: é uma estação grande com várias saídas.',
      },
      {
        h2: 'Ligações do AVE',
        body: 'Se chega de AVE, marque a recolha cerca de 15 minutos depois da hora prevista para ter margem entre a plataforma e a rua com bagagem.',
      },
    ],
  },

  'private-transfer': {
    title: 'Transfer Privado Aeroporto Barcelona | Táxi Só Para Si',
    description:
      'Um transfer privado do aeroporto de Barcelona: o seu táxi licenciado só para si, sem partilhas nem esperas por outros passageiros, com tarifa oficial da AMB.',
    h1: 'Transfer privado do aeroporto de Barcelona',
    intro:
      'Todas as reservas aqui são transferes privados. O veículo é só seu: sem shuttle partilhado, sem desvios para apanhar outros passageiros e sem horário fixo. Segue direto do ponto de recolha até ao destino.',
    sections: [
      {
        h2: 'Privado ou shuttle partilhado',
        body: 'Os shuttles partilhados saem mais baratos por pessoa, mas recolhem vários grupos e deixam-nos em cadeia, o que pode acrescentar uma hora a um percurso de 30 minutos. A partir de dois viajantes a diferença de preço estreita-se bastante, e para uma família com bagagem o táxi privado costuma ser ao mesmo tempo mais rápido e mais simples.',
      },
      {
        h2: 'Escolher o veículo',
        body: 'Táxi standard até quatro passageiros, Mercedes Vito para seis, V-Class para sete com bagagem correspondente. A tarifa do taxímetro não muda com o tamanho do veículo, porque é fixada pela AMB, por isso escolha por capacidade e conforto.',
      },
      {
        h2: 'Viagens de trabalho',
        body: 'Para deslocações profissionais podemos atribuir a V-Class e fornecer a fatura do táxi para despesas. Peça a fatura do taxímetro ao motorista dentro do carro; o recibo da taxa de reserva segue à parte por email.',
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Táxi 24 Horas Aeroporto Barcelona | Transferes Noturnos',
    description:
      'Serviço de táxi 24 horas no aeroporto de Barcelona. Reserve aterragens noturnas e partidas antes do amanhecer com a tarifa noturna oficial da AMB.',
    h1: 'Táxi 24 horas no aeroporto de Barcelona',
    intro:
      'El Prat funciona vinte e quatro horas por dia, e o serviço de táxi também. As horas que realmente vale a pena reservar são as mais incómodas: aterragens depois da meia-noite e partidas que exigem recolha antes do amanhecer.',
    sections: [
      {
        h2: 'A tarifa noturna',
        body: 'Entre as 20:00 e as 08:00, durante todo o fim de semana e em feriados aplica-se a tarifa mais alta T-2. É fixada pela AMB e vale por igual para todos os táxis licenciados de Barcelona: não é um agravamento nosso. A sua estimativa usa automaticamente a tarifa certa para a hora real de recolha. As noites de Natal e de Ano Novo têm ainda um suplemento oficial.',
      },
      {
        h2: 'Chegadas tardias',
        body: 'Se o seu voo aterra à uma da manhã, a praça de El Prat continua a funcionar, mas a cobertura diminui à medida que a noite avança. Um carro reservado com o número do voo associado é a diferença entre sair diretamente e ficar à espera.',
      },
      {
        h2: 'Partidas antes do amanhecer',
        body: 'Recolhas a partir das 04:00 são rotina para nós. Reserve o mais tardar na véspera à noite e confirmamos o motorista por email, para que a essa hora não fique nada por organizar.',
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Táxi Bairro Gótico para o Aeroporto de Barcelona',
    description:
      'Reserve um táxi do Bairro Gótico para o aeroporto de Barcelona. Combinamos previamente um ponto acessível, porque quase todas as ruas do Barri Gòtic são demasiado estreitas.',
    h1: 'Táxi do Bairro Gótico para o aeroporto',
    intro:
      'O Barri Gòtic é a zona de Barcelona onde reservar com antecedência muda mesmo a experiência. Grande parte do bairro é pedonal ou demasiado estreita para um carro, por isso a pergunta não é quando chega o táxi, mas onde ele o consegue efetivamente apanhar.',
    sections: [
      {
        h2: 'Pontos de recolha praticáveis',
        body: 'Combinamos um ponto acessível concreto na reserva: normalmente Via Laietana, a praça da Catedral, o Passeig de Colom ou o lado da Rambla, consoante a morada. O motorista espera aí e ajuda com a bagagem a partir da esquina, em vez de andar às voltas por ruas onde não pode entrar.',
      },
      {
        h2: 'Tempo de viagem até El Prat',
        body: 'Do Bairro Gótico ao aeroporto são cerca de 20 a 30 minutos fora das horas de ponta, pela Ronda Litoral. Conte mais tempo nas manhãs de dias úteis e quando há troca de cruzeiro no porto.',
      },
      {
        h2: 'Chegar ao bairro',
        body: 'Vindo do aeroporto a limitação é a mesma ao contrário. Dê-nos a morada exata e deixamo-lo tão perto quanto os veículos podem chegar, indicando-lhe os poucos metros a pé até à porta.',
      },
    ],
  },

  'neighborhoods/eixample': {
    title: 'Táxi Eixample para o Aeroporto de Barcelona',
    description:
      'Reserve um táxi do Eixample para o aeroporto de Barcelona-El Prat. Recolha porta a porta na quadrícula, com tarifa oficial da AMB.',
    h1: 'Táxi do Eixample para o aeroporto de Barcelona',
    intro:
      'O Eixample é o bairro mais cómodo de Barcelona para apanhar um táxi. A quadrícula de Cerdà torna quase todas as moradas acessíveis de carro, com espaço para parar e carregar bagagem: exatamente o contrário do centro histórico.',
    sections: [
      {
        h2: 'Recolha porta a porta na quadrícula',
        body: 'Dê-nos a rua e o número e o motorista estará à porta. Os cantos chanfrados dos quarteirões do Eixample são pontos de carga cómodos e seguros se a sua morada calhar num troço movimentado de Aragó ou Balmes.',
      },
      {
        h2: 'Tempo de viagem',
        body: 'Do Eixample a El Prat são normalmente 25 a 35 minutos. Da Dreta de l\'Eixample e da zona da Sagrada Família, um pouco mais; dos quarteirões junto a Sants e à praça de Espanha, um pouco menos.',
      },
      {
        h2: 'Hotéis do bairro',
        body: 'O Eixample concentra boa parte dos hotéis de Barcelona, incluindo quase todos os do Passeig de Gràcia. Escreva o nome do hotel em vez da morada e nós encontramo-lo.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Táxi Centro de Barcelona para o Aeroporto',
    description:
      'Reserve um táxi do centro de Barcelona para o aeroporto de El Prat. Recolha em qualquer morada central, tarifa oficial e motorista confirmado com antecedência.',
    h1: 'Táxi do centro de Barcelona para o aeroporto',
    intro:
      'De qualquer ponto central — a Rambla, a praça de Catalunya, o Born, o Raval ou o Passeig de Gràcia — El Prat fica a 20 ou 35 minutos de carro. Reservar fixa a hora de recolha e o veículo, o que conta sobretudo na viagem de ida.',
    sections: [
      {
        h2: 'Pontos de recolha no centro',
        body: 'As ruas centrais largas permitem recolha diretamente à porta. Para moradas dentro de zonas pedonais combinamos a esquina acessível mais próxima na reserva, para não ser preciso improvisar no próprio dia.',
      },
      {
        h2: 'Trânsito e margens',
        body: 'Nos dias úteis entre as 08:00 e as 09:30 e a partir das 18:00 as rondas abrandam bastante. A nossa estimativa inclui um tempo de viagem realista, mas para um voo de manhã cedo marque a recolha com margem.',
      },
      {
        h2: 'Quanto custa a viagem',
        body: 'O valor do taxímetro do centro até El Prat, mais o suplemento fixo de aeroporto. À noite e aos fins de semana aplica-se a tarifa mais alta T-2. Introduza a morada para uma estimativa exata antes de decidir.',
      },
    ],
  },

  'book-online': {
    title: 'Reservar Táxi Aeroporto Barcelona Online | Preço Já',
    description:
      'Reserve um táxi para o aeroporto de Barcelona em minutos. Estimativa imediata com tarifas oficiais AMB, pagamento seguro e confirmação instantânea por email.',
    h1: 'Reservar um táxi para o aeroporto de Barcelona online',
    intro:
      'Reservar online demora dois minutos e garante-lhe um carro confirmado com motorista atribuído. Pague agora apenas a taxa de reserva e acerte o taxímetro com o motorista, ou pré-pague a viagem completa a preço fechado e não deva nada no táxi.',
    sections: [
      {
        h2: 'O que precisa para reservar',
        body: 'A morada de recolha, o destino, a data e a hora e um telefone de contacto. Para recolhas no aeroporto acrescente o número do voo para o motorista poder acompanhar a aterragem. As reservas exigem um mínimo de três horas de antecedência; para algo mais próximo, escreva-nos no WhatsApp.',
      },
      {
        h2: 'O que acontece depois',
        body: 'Recebe de imediato um email de confirmação com o percurso, o veículo, a estimativa e o recibo do que pagou online. Depois é atribuído um motorista e enviamos-lhe os dados antes da viagem.',
      },
      {
        h2: 'Alterações e cancelamentos',
        body: 'Os planos mudam. Cancele com pelo menos 24 horas de antecedência e a taxa de reserva é devolvida na íntegra. Para mudar uma reserva, responda ao email de confirmação e reagendamos.',
      },
    ],
  },
};
