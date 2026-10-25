import type { LandingCopy } from '../landing-pages';

/** Portuguese long-form copy for the keyword landing pages. */
export const PT_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Táxi Aeroporto Barcelona Centro | Reservar Online',
    description:
      'Reserve um táxi do aeroporto de Barcelona para o centro. Preço fixo tudo incluído, com o suplemento de El Prat já dentro, motorista nas chegadas.',
    h1: 'Táxi do aeroporto de Barcelona para o centro',
    intro:
      'Um táxi de El Prat até ao centro de Barcelona demora entre 25 e 35 minutos consoante o trânsito e o terminal de chegada. Reservar com antecedência significa ter já um motorista atribuído quando aterra, com um cartaz com o seu nome nas chegadas, em vez de fazer fila na praça do T1 ou do T2.',
    sections: [
      {
        h2: 'Quanto custa um transfer do aeroporto de Barcelona',
        body: 'O preço é fixado por nós: não é uma leitura do taxímetro nem uma estimativa, e todos os suplementos oficiais aplicáveis ao percurso já estão dentro. Na prática, uma viagem do aeroporto para qualquer ponto de Barcelona são 50 EUR fixos em táxi padrão, independentemente da distância e da hora; aos fins de semana e feriados acrescentam-se 7,5 %. Introduza acima o seu destino exato para ver o seu preço.',
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
      'Reserve um táxi de Barcelona para o aeroporto de El Prat. Hora de recolha fixa, preço fixo tudo incluído e motoristas experientes.',
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
        body: 'A primeira vaga de partidas sai de El Prat antes das 07:00, o que implica recolhas a partir das 04:30. Uma recolha às 04:30 custa o mesmo que a mesma viagem ao meio-dia, porque a hora não mexe num preço fixo, e confirmamos o motorista na véspera para que às quatro da manhã não falte resolver nada.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Táxi Aeroporto El Prat | Transferes Licenciados',
    description:
      'Táxis licenciados de e para o aeroporto de Barcelona-El Prat (BCN). Reserve online com estimativa pela preço fixo e motorista atribuído ao seu voo.',
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
        body: 'O suplemento oficial de aeroporto e qualquer outro encargo aplicável ao percurso estão dentro do preço fixo que lhe damos. Não há taxímetro a correr durante a viagem nem um segundo valor no fim, pelo que não há surpresas.',
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
      'O que custa realmente um táxi para o aeroporto de Barcelona: os nossos preços fixos por veículo e o que acrescenta a tarifa de fim de semana.',
    h1: 'Preço do táxi para o aeroporto de Barcelona',
    intro:
      'Um transfer com nós é um preço fixo, acordado antes de reservar e bloqueado ao reservar. Sem taxímetro, sem cálculos de distância e sem nada a pagar no carro. Esta é a tabela completa e as três coisas que podem acrescentar-se.',
    sections: [
      {
        h2: 'Como é calculada a sua tarifa',
        body: 'Um transfer é um preço fixo, definido pelo percurso e pelo veículo, não pela distância nem pela hora. Do aeroporto para qualquer ponto de Barcelona é um valor; do aeroporto para o terminal de cruzeiros, outro; e o táxi padrão, a minivan de seis lugares e a van de sete têm cada um o seu. Só três coisas podem acrescentar-se: um destino além da zona plana, um transfer ao porto de cruzeiros e a tarifa de fim de semana e feriados. Cada uma aparece como uma linha própria antes do pagamento.',
      },
      {
        h2: 'Existe táxi barato a partir do aeroporto?',
        body: 'Compare pelo que o preço o protege, não apenas pelo valor. Um preço fixo não se move depois de acordado: o trânsito, um desvio, uma aterragem atrasada e a hora do dia são problema nosso, não seu, e no carro não se cobra nada. O que pode escolher é o veículo e viajar fora do fim de semana. Desconfie de um preço invulgarmente baixo: costuma indicar um veículo sem licença, ou um valor que vai crescer antes de chegar.',
      },
      {
        h2: 'Até onde chega o preço fixo',
        body: 'O preço de cidade cobre tudo o que esteja num raio de 16 km do terminal, ou seja, toda a Barcelona e os concelhos imediatos: um percurso curto até El Prat vila e uma travessia da cidade até ao Park Güell custam o mesmo. Além desse raio o preço fixo mantém-se e só se acrescentam os quilómetros que sobram, a uma tarifa publicada.',
      },
      {
        h2: 'O que o seu preço inclui',
        body: 'Paga online um único preço com tudo incluído no momento da reserva. Cobre a viagem segundo a preço fixo, todos os suplementos oficiais aplicáveis ao seu percurso e o nosso serviço de reservar e garantir o carro. Não há um segundo valor: no táxi não paga nada.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcelona Aeroporto | Porta a Porta',
    description:
      'Reserve um táxi do seu hotel em Barcelona para o aeroporto de El Prat, ou do aeroporto até à porta do hotel. Porta a porta, licenciado e com preço fixo.',
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
        body: 'As viagens que começam ou terminam na estação de Sants levam um pequeno suplemento fixo definido pela AMB, além do preço da viagem. Juntamente com o suplemento de aeroporto, ambos estão incluídos na estimativa que vê antes de reservar, e o total de suplementos tem um teto por serviço.',
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
      'Um transfer privado do aeroporto de Barcelona: o seu táxi licenciado só para si, sem partilhas nem esperas por outros passageiros, com preço fixo.',
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
        body: 'Táxi standard até quatro passageiros, Mercedes Vito para seis, V-Class para sete com bagagem correspondente. Cada um tem o seu próprio preço fixo de transfer, mostrado lado a lado antes de reservar, para que possa pesar capacidade e conforto face ao valor.',
      },
      {
        h2: 'Viagens de trabalho',
        body: 'Para viagens de trabalho podemos atribuir a V-Class premium. O recibo do valor total segue por email com a sua confirmação; se precisar também da fatura oficial do taxímetro, peça-a ao motorista no carro.',
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
        body: 'Uma recolha à noite custa o mesmo que a mesma viagem ao meio-dia: a hora não mexe num preço fixo. Os fins de semana e feriados sim: sábados e domingos, Natal, Ano Novo e o calendário catalão acrescentam 7,5 %, indicado como linha própria antes do pagamento em vez de descoberto depois.',
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
      'Reserve um táxi do Bairro Gótico para o aeroporto de Barcelona. Combinamos previamente um ponto de recolha acessível a um carro.',
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
      'Reserve um táxi do Eixample para o aeroporto de Barcelona-El Prat. Recolha porta a porta na quadrícula, com preço fixo tudo incluído.',
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
      'Reserve um táxi do centro de Barcelona para o aeroporto de El Prat. Recolha em qualquer morada central, preço fixo e motorista confirmado com antecedência.',
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
        body: 'Um preço fixo de qualquer ponto do centro até El Prat, com todos os suplementos oficiais já dentro e nada a pagar no táxi. A hora não o altera; os fins de semana e feriados acrescentam 7,5 %. Introduza o seu endereço para ver o preço exato antes de decidir.',
      },
    ],
  },

  'book-online': {
    title: 'Reservar Táxi Aeroporto Barcelona Online | Preço Já',
    description:
      'Reserve um táxi para o aeroporto de Barcelona em minutos. Estimativa imediata com tarifas oficiais AMB, pagamento seguro e confirmação instantânea por email.',
    h1: 'Reservar um táxi para o aeroporto de Barcelona online',
    intro:
      'Reservar online demora um par de minutos e garante-lhe um carro confirmado com motorista atribuído. Paga um único preço com tudo incluído e não deve nada no táxi.',
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
        body: 'Os planos mudam. Cancele com pelo menos 24 horas de antecedência e é reembolsado na íntegra. Para mudar uma reserva, responda ao email de confirmação.',
      },
    ],
  },
};
