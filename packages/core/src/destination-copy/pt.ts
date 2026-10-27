import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "pt" locale (European Portuguese). Keyed by
 * destination slug and group slug; the parity test in translation-parity.test.ts
 * forbids falling back to English for any of them.
 */
export const PT_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: 'Costa Brava',
      route: 'Barcelona para a Costa Brava',
      blurb:
        'Transferes porta a porta de El Prat para as estâncias da Costa Brava, com espaço de bagagem para toda a família.',
      body: [
        'A Costa Brava começa cerca de uma hora a norte de Barcelona e prolonga-se até à fronteira francesa, e quase todos os visitantes chegam por El Prat. A estrada costeira é simples, mas é uma viagem a sério e não um salto dentro da cidade: conte com cerca de 80 minutos até Lloret de Mar e perto de duas horas para as enseadas do norte.',
        'Aqui, um transfer privado conta mais do que numa viagem urbana. Não há comboio direto para a maioria das localidades, os autocarros só param nas maiores, e o último troço até um hotel na encosta ou uma moradia fora da vila raramente se faz a pé com malas. O seu motorista leva-o até à porta.',
        'Recebemo-lo nas chegadas com um cartaz com o seu nome e acompanhamos o seu voo, por isso um atraso na aterragem não lhe faz perder o carro. Para grupos, a Mercedes Vito ou a V-Class transportam seis ou sete passageiros com a bagagem correspondente, o que costuma ser mais barato do que dois carros separados e bastante mais simples.',
        'Como a Costa Brava fica fora da área metropolitana de Barcelona, a viagem não é calculada pelo taxímetro. Indicamos-lhe um preço fixo para o percurso antes de se comprometer, confirmado por escrito, pelo que não há nada a acertar no destino além do que combinou.',
      ],
    },
    girona: {
      place: 'Girona',
      route: 'Barcelona para Girona',
      blurb:
        'Centro da cidade, aeroporto de Girona ou cidade velha: uma viagem direta para norte, sem transbordos.',
      body: [
        'Girona fica a cerca de 100 km a norte de Barcelona e demora pouco mais de uma hora de carro. É um transfer frequente por três razões bem diferentes: a própria cidade, o aeroporto que lhe leva o nome e os degraus da catedral, que atraem um fluxo constante de visitantes.',
        'O comboio é rápido entre os dois centros urbanos, mas não ajuda se parte de El Prat com bagagem, chega tarde ou vai para um local que não é a estação. Um carro privado elimina os transbordos nas duas pontas.',
        'O aeroporto de Girona fica 15 minutos para lá da cidade e recebe uma boa parte do tráfego charter da Costa Brava. Se faz a ligação entre El Prat e o aeroporto de Girona, diga-nos os dois números de voo e prevemos uma margem sensata.',
        'Este percurso fica fora da zona metropolitana, por isso confirmamos antecipadamente um preço fixo. Os veículos vão do táxi normal de quatro lugares à V-Class de sete lugares, para famílias e grupos.',
      ],
    },
    'lloret-de-mar': {
      place: 'Lloret de Mar',
      route: 'Barcelona para Lloret de Mar',
      blurb: 'A estância mais movimentada da Costa Brava, a cerca de 70 minutos de El Prat.',
      body: [
        'Lloret de Mar é a estância mais conhecida da Costa Brava e uma das nossas viagens de longa distância mais frequentes. O percurso demora cerca de 70 minutos desde El Prat, fora dos períodos de maior movimento.',
        'Os autocarros servem Lloret na época alta, mas cumprem um horário e param num ponto central, o que é incómodo se o seu hotel fica numa das colinas sobre a baía. Um transfer privado termina à entrada.',
        'Para grupos que chegam juntos, uma minivan de seis ou sete lugares costuma sair melhor do que vários carros e mantém todos no mesmo horário.',
        'O percurso fica fora da zona metropolitana, pelo que o preço é fixo e combinado antecipadamente, e não calculado pelo taxímetro.',
      ],
    },
    'tossa-de-mar': {
      place: 'Tossa de Mar',
      route: 'Barcelona para Tossa de Mar',
      blurb: 'Vila amuralhada e praias mais tranquilas, a cerca de 80 minutos.',
      body: [
        'Tossa de Mar é a vizinha mais sossegada de Lloret, conhecida pela sua vila amuralhada sobre a praia. Fica a cerca de 80 minutos do aeroporto de Barcelona.',
        'A aproximação final pela estrada costeira é pitoresca mas lenta, e os transportes públicos implicam pelo menos um transbordo. A maioria dos hóspedes considera que um carro direto compensa depois de um voo.',
        'A cidade velha é em grande parte pedonal, por isso combinamos consigo, na reserva, o ponto de largada acessível mais próximo, em vez de improvisar à chegada.',
        'O preço é fixo para este percurso e confirmado antes da viagem, uma vez que fica além da área metropolitana.',
      ],
    },
    blanes: {
      place: 'Blanes',
      route: 'Barcelona para Blanes',
      blurb: 'A porta de entrada sul da Costa Brava, a cerca de uma hora.',
      body: [
        'Blanes marca o limite sul da Costa Brava e é a principal estância mais próxima de Barcelona, a cerca de uma hora de carro.',
        'Tem estação de comboio, o que faz dela uma das localidades da Costa Brava mais acessíveis, mas a ligação a partir do aeroporto continua a exigir transbordos e uma caminhada no final.',
        'Recebemo-lo nas chegadas ou em qualquer morada de Barcelona e seguimos diretamente, o que convém a famílias e a quem viaja com equipamento de praia.',
        'Como no resto da costa, a tarifa é um preço fixo indicado de antemão e não a leitura de um taxímetro.',
      ],
    },
    cadaques: {
      place: 'Cadaqués',
      route: 'Barcelona para Cadaqués',
      blurb: 'O extremo norte, depois do Cap de Creus: cerca de duas horas e meia.',
      body: [
        'Cadaqués é a mais isolada das localidades da Costa Brava, a que se chega pelo promontório do Cap de Creus, numa estrada de montanha sinuosa. Conte com cerca de duas horas e meia desde Barcelona.',
        'Não há qualquer ligação ferroviária, e o serviço de autocarros é limitado e lento. Para a maioria dos visitantes, um transfer privado é a única forma prática de chegar a uma hora razoável.',
        'A estrada sobre o desfiladeiro é estreita e deve ser conduzida por quem a conhece, sobretudo depois de escurecer. Os nossos motoristas fazem este percurso com regularidade.',
        'Dada a distância, é sempre uma viagem de preço fixo, acordado antecipadamente. Peça-nos um orçamento pelo WhatsApp, indicando as suas datas.',
      ],
    },
    roses: {
      place: 'Roses',
      route: 'Barcelona para Roses',
      blurb: 'Estância na baía de Roses, no extremo norte da Costa Brava.',
    },
    empuriabrava: {
      place: 'Empuriabrava',
      route: 'Barcelona para Empuriabrava',
      blurb: 'A povoação dos canais no golfo de Roses.',
    },
    begur: {
      place: 'Begur',
      route: 'Barcelona para Begur',
      blurb: 'Aldeia no alto de uma colina e as enseadas lá em baixo.',
    },
    'calella-de-palafrugell': {
      place: 'Calella de Palafrugell',
      route: 'Barcelona para Calella de Palafrugell',
      blurb: 'Aldeia de pescadores caiada de branco, no centro da Costa Brava.',
    },
    sitges: {
      place: 'Sitges',
      route: 'Barcelona para Sitges',
      blurb: 'A estância mais próxima de Barcelona: cerca de 25 minutos de El Prat.',
      body: [
        'Sitges é a mais curta das nossas viagens de longa distância e a mais reservada. De El Prat são cerca de 25 minutos; do centro de Barcelona, perto de 40.',
        'A localidade é um clássico para fins de semana de praia, para participantes em congressos alojados fora da cidade e para o calendário de festivais. Tem boa ligação de comboio a partir de Barcelona-Sants, mas não a partir do aeroporto, razão pela qual a maioria prefere um carro direto.',
        'O centro histórico tem ruas estreitas de sentido único e acesso restrito em alguns pontos. Combinamos um ponto de largada prático na reserva, para que nada tenha de ser resolvido à porta.',
        'Sitges fica logo fora da zona metropolitana, por isso a viagem tem um preço fixo e não é calculada pelo taxímetro. Pergunte-nos pelo WhatsApp e confirmamos antes de viajar.',
      ],
    },
    tarragona: {
      place: 'Tarragona',
      route: 'Barcelona para Tarragona',
      blurb: 'Cidade romana e porto de cruzeiros, a cerca de 75 minutos para sul.',
      body: [
        'Tarragona fica a cerca de 100 km a sul de Barcelona, a aproximadamente 75 minutos por autoestrada. Atrai visitantes pelo anfiteatro romano e pela cidade velha, e cada vez mais como porto de cruzeiros por direito próprio.',
        'Os transferes de cruzeiro são a versão mais sensível ao tempo desta viagem. Se vai embarcar num navio, prevemos uma margem e confirmamos o terminal, porque perder a partida não tem remédio.',
        'A cidade é também a porta de entrada para as praias da Costa Dourada, e muitos hóspedes combinam as duas: podemos deixá-lo num hotel da costa pelo caminho.',
        'Este percurso fica além da zona metropolitana, por isso indicamos antecipadamente um preço fixo, sem recorrer ao taxímetro.',
      ],
    },
    salou: {
      place: 'Salou',
      route: 'Barcelona para Salou',
      blurb: 'Estância da Costa Dourada junto ao PortAventura.',
    },
    portaventura: {
      place: 'PortAventura',
      route: 'Barcelona para PortAventura',
      blurb: 'Transfer direto até à entrada do parque temático.',
    },
    cambrils: {
      place: 'Cambrils',
      route: 'Barcelona para Cambrils',
      blurb: 'Localidade mais tranquila da Costa Dourada, a sul de Salou.',
    },
    peniscola: {
      place: 'Peñíscola',
      route: 'Barcelona para Peñíscola',
      blurb: 'Vila do castelo, na Costa do Azahar.',
    },
    reus: {
      place: 'Reus',
      route: 'Barcelona para Reus',
      blurb: 'Aeroporto e cidade de Reus, no interior a partir de Salou.',
    },
    montserrat: {
      place: 'Montserrat',
      route: 'Barcelona para Montserrat',
      blurb: 'O mosteiro na montanha, a cerca de uma hora da cidade.',
      body: [
        'Montserrat é a excursão de um dia mais popular a partir de Barcelona: um mosteiro beneditino num maciço rochoso recortado, a cerca de uma hora para o interior.',
        'Chegar lá de transportes públicos implica um comboio seguido de cremalheira ou teleférico, cada um com a sua fila. Um carro vai diretamente ao parque de estacionamento do mosteiro, o que conta se quer lá estar antes de chegarem os autocarros.',
        'A maioria reserva ida e volta com tempo de espera, tipicamente três a quatro horas no local, para que o mesmo motorista o traga de volta. Diga-nos quanto tempo quer e orçamentamos como uma única viagem.',
        'Montserrat fica fora da zona metropolitana, por isso a viagem tem um preço fixo, com a espera incluída, e não é calculada pelo taxímetro.',
      ],
    },
    andorra: {
      place: 'Andorra',
      route: 'Barcelona para Andorra',
      blurb: 'Três horas até aos Pirenéus, para esquiar ou fazer compras.',
      body: [
        'Andorra fica a cerca de três horas de Barcelona, com uma subida constante até aos Pirenéus. É uma viagem habitual no inverno, para as estâncias de esqui, e durante todo o ano, para as compras livres de impostos.',
        'O percurso atravessa uma fronteira internacional. Leve passaportes ou bilhetes de identidade de todos os passageiros: os controlos costumam ser rápidos, mas existem, e ser mandado voltar para trás é uma forma cara de o descobrir.',
        'No inverno, a subida final pode exigir correntes ou pneus de inverno. Atribuímos um veículo preparado para as condições, em vez de mandar um carro de cidade normal pela montanha em fevereiro.',
        'Para grupos de esqui, a V-Class leva sete pessoas com bagagem, embora os esquis e as pranchas devam ser indicados na reserva para atribuirmos o veículo certo. É um percurso de preço fixo, indicado antes da viagem.',
      ],
    },
    'la-molina': {
      place: 'La Molina',
      route: 'Barcelona para La Molina',
      blurb: 'Estância de esqui dos Pirenéus, a cerca de duas horas.',
    },
    'vall-de-nuria': {
      place: 'Vall de Núria',
      route: 'Barcelona para Vall de Núria',
      blurb: 'Santuário de montanha a que se chega de cremalheira.',
    },
    'baqueira-beret': {
      place: 'Baqueira Beret',
      route: 'Barcelona para Baqueira Beret',
      blurb: 'A maior área de esqui dos Pirenéus espanhóis.',
    },
    valencia: {
      place: 'Valência',
      route: 'Barcelona para Valência',
      blurb: 'Três horas e meia pela costa, porta a porta.',
      body: [
        'Valência fica a cerca de 350 km a sul de Barcelona, a aproximadamente três horas e meia por autoestrada. É um transfer longo e, para a maioria dos viajantes, o comboio AVE é a escolha sensata.',
        'Um carro privado justifica-se em situações concretas: um grupo de seis ou sete em que os bilhetes de comboio individuais somam muito, uma chegada demasiado tardia para o último comboio, bagagem ou equipamento que viaja mal de comboio, ou a necessidade de porta a porta nas duas pontas.',
        'Fazemos o percurso direto, com uma paragem para descanso, e podemos deixá-lo em qualquer morada da cidade, no porto para um cruzeiro ou no aeroporto de Valência.',
        'É sempre uma viagem de preço fixo, indicado antecipadamente. Envie-nos uma mensagem com as suas datas e o número de pessoas e confirmamos.',
      ],
    },
    'la-roca-village': {
      place: 'La Roca Village',
      route: 'La Roca Village',
      blurb: 'A aldeia de outlets, a cerca de 40 minutos para norte.',
      body: [
        'La Roca Village é um outlet de marcas de luxo a cerca de 40 minutos a norte de Barcelona e um dos destinos, fora do aeroporto, que mais nos pedem.',
        'O autocarro da cidade funciona razoavelmente, mas prende-o a uma hora de regresso fixa, o que é a restrição errada para um dia de compras. Um carro privado espera por si.',
        'A maioria das reservas é de ida e volta com tempo de espera, normalmente de três a cinco horas. Orçamentamos como uma única viagem, com a espera incluída, e há espaço para os sacos no regresso.',
        'A aldeia fica fora da zona metropolitana, por isso o preço é fixo e confirmado antes de viajar.',
      ],
    },
    alicante: {
      place: 'Alicante',
      route: 'Barcelona para Alicante',
      blurb: 'Costa Blanca, a cerca de cinco horas para sul.',
    },
    zaragoza: {
      place: 'Saragoça',
      route: 'Barcelona para Saragoça',
      blurb: 'A capital de Aragão, a cerca de três horas para o interior.',
    },
    madrid: {
      place: 'Madrid',
      route: 'Barcelona para Madrid',
      blurb: 'Viagem de longa distância até à capital.',
    },
    marbella: {
      place: 'Marbella',
      route: 'Barcelona para Marbella',
      blurb: 'Costa del Sol, uma viagem de um dia inteiro.',
    },
    malaga: {
      place: 'Málaga',
      route: 'Barcelona para Málaga',
      blurb: 'Costa andaluza, transfer de longa distância.',
    },
  },
  groups: {
    'costa-brava': {
      title: 'Transferes para a Costa Brava',
      intro:
        'Transferes privados de Barcelona para Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués e o resto da Costa Brava.',
    },
    'south-and-theme-parks': {
      title: 'Sul de Barcelona e parques temáticos',
      intro:
        'Transferes de táxi e minivan para Sitges, Tarragona, Salou, PortAventura, Cambrils e a costa a sul da cidade.',
    },
    'mountains-and-ski': {
      title: 'Montanha, natureza e esqui',
      intro:
        'Motoristas privados para Montserrat, Andorra, as estâncias de esqui e as aldeias de montanha, incluindo excursões de um dia flexíveis.',
    },
    'long-distance': {
      title: 'Transferes de longa distância',
      intro:
        'Transferes diretos de táxi e minivan privados de Barcelona para as principais cidades espanholas.',
    },
  },
};
