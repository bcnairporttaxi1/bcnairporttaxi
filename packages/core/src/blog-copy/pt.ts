import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "pt" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const PT_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: 'Quanto custa um táxi do aeroporto de Barcelona?',
    description:
      'Preços do táxi do aeroporto de Barcelona: as nossas tarifas fixas, tudo incluído, como difere o taxímetro da praça de táxis e o que somam os suplementos.',
    h1: 'Quanto custa um táxi do aeroporto de Barcelona?',
    excerpt:
      'Um transfer reservado de El Prat para Barcelona custa 50 € num carro de 4 lugares, com preço fixo e pagamento online. A praça de táxis à saída das chegadas funciona de outra forma, com taxímetro regulado. Eis o que custa cada opção e porque é que os dois valores não coincidem.',
    sections: [
      {
        h2: 'A resposta curta',
        body: [
          'Um transfer reservado entre El Prat e qualquer ponto de Barcelona custa 50 € num carro de 4 lugares, 70 € no Mercedes Vito de 6 lugares e 75 € na V-Class de 7 lugares. Esse é o preço total. É indicado antes de viajar, pago online no momento da reserva, e não fica nada a dever ao motorista no carro.',
          'O terminal de cruzeiros de Moll Adossat é uma rota à parte: 60 €, 80 € e 85 € para os mesmos três tamanhos de veículo.',
          'Estes valores não variam com a hora do dia. Uma recolha às 04:30 para um voo cedo custa o mesmo que uma às duas da tarde. A única coisa que os aumenta é um fim de semana ou feriado, que acrescenta 7,5 %, pelo que um transfer de sedan ao sábado custa 53,75 € em vez de 50 €.',
          'Se, em vez disso, apanhar um táxi na praça à saída das chegadas, não está a comprar um preço fixo: está a comprar uma viagem com taxímetro, e o valor final depende do trânsito, da hora e do percurso. O resto desta página explica as duas opções, porque saber qual é mais barata depende mesmo de quando viaja.',
        ],
      },
      {
        h2: 'Porquê um preço fixo em vez da leitura do taxímetro',
        body: [
          'As tarifas dos táxis de Barcelona são reguladas pela Àrea Metropolitana de Barcelona, e todos os táxis licenciados da cidade usam o mesmo taxímetro com as mesmas tarifas. É uma proteção real do consumidor e não a pomos em causa. O que um taxímetro regulado não faz é dizer-lhe o preço com antecedência.',
          'Num percurso de 15 quilómetros até ao Eixample, o valor do taxímetro oscila cerca de dez euros consoante apanhe a Ronda de Dalt a fluir ou parada, e mais uns vinte e cinco por cento consoante seja uma terça-feira ao almoço ou um sábado à noite. Ambos os valores estão corretos. Nenhum se pode saber quando se está no hall das chegadas a decidir o que fazer.',
          'Um preço fixo passa essa variação para o nosso lado. Indicamos 50 €, acertamos contas com o motorista pelo que a viagem acabar por custar, e a diferença é sempre nossa. Numa terça-feira de trânsito livre, é um negócio pior para si do que a praça de táxis. Com o trânsito de uma sexta-feira ao fim da tarde, é melhor. O que é sempre é conhecido.',
          'É também a única forma honesta de vender um transfer a quem ainda não está em Barcelona. Ninguém que reserve de Manchester em março consegue prever a leitura do taxímetro numa quinta-feira à tarde em julho, pelo que um orçamento que na verdade é uma estimativa pode estar errado, e erra sempre no sentido de o valor subir.',
        ],
      },
      {
        h2: 'A zona de 16 quilómetros, e porque se mede em linha reta',
        body: [
          'O preço da nossa lista cobre qualquer morada a menos de 16 quilómetros do terminal, medidos em linha reta. É todo o centro e quase todos os sítios onde um visitante fica: a Praça da Catalunha a 12,3 km, a Barceloneta a 12,8, a Sagrada Família a 14,0, o Park Güell, na colina atrás de Gràcia, a 14,3 e o Poblenou a 15,5 pagam todos os mesmos 50 € que um hotel no Passeig de Gràcia. Não é o município inteiro, e convém saber que parte fica de fora: os bairros periféricos do norte e do leste ficam fora da zona, com La Sagrera a 16,4 km, o Fòrum a 17,4, Sant Andreu a 17,7, Nou Barris a 17,9 e Torre Baró a 19,3, e essas moradas pagam a taxa de excesso indicada abaixo.',
          'A medição em linha reta é deliberada e vale a pena percebê-la, porque funciona a seu favor. A Praça da Catalunha fica a 12,3 quilómetros do terminal em linha reta e a 19,6 quilómetros por estrada, porque a estrada tem de contornar o Llobregat e entrar pela Gran Via. Uma zona medida pela estrada, aos 16 quilómetros, deixaria o centro de Barcelona de fora e começaria a cobrar quilómetros extra na viagem mais comum para a qual este preço existe. Por isso a zona é traçada no mapa, não no percurso.',
          'Fora da zona, o preço é o da lista mais 1,50 € por cada quilómetro adicional. Badalona fica a 21,8 quilómetros e Sant Cugat del Vallès a 19,5, pelo que ambas pagam o preço da cidade mais a diferença. São os casos limite; a maior parte da área metropolitana está dentro da zona.',
          'Esses 1,50 € são um único valor publicado, e não a tarifa da hora, o que importa mais do que parece. A tarifa noturna oficial é de 1,66 € por quilómetro, contra 1,35 € de dia. Cobrar a que estivesse em vigor devolveria a hora do dia a uma lista de preços cujo propósito é precisamente que a hora não a altere, e quem ouvisse «cinquenta euros mais um euro e cinquenta por quilómetro» acabaria por pagar mais do que isso, sem aviso. Um só valor, o dia todo.',
        ],
      },
      {
        h2: 'O que cobra a praça de táxis',
        body: [
          'Se for até à praça de táxis, três coisas combinam-se no valor do taxímetro: uma bandeirada assim que o taxímetro arranca, uma tarifa por quilómetro e os suplementos que se apliquem.',
          'A bandeirada, a bajada de bandera, é de 2,80 €. A tarifa por quilómetro é de 1,35 € na tarifa T-1, que se aplica de segunda a sexta entre as 08:00 e as 20:00, e de 1,66 € na T-2 em todos os outros momentos: fins de tarde, noites, todo o sábado e domingo, e feriados. A diferença é de cerca de 23 %, razão pela qual uma viagem idêntica custa mesmo mais às 22:00 do que às 14:00.',
          'Há ainda uma tarifa de espera de 27,75 € por hora, que o taxímetro conta enquanto o carro está parado. Na prática, é isto que torna imprevisíveis as chegadas à hora de ponta: o taxímetro não pára quando o trânsito pára.',
          'As tarifas atuais vigoram de 19 de janeiro de 2026 a 17 de janeiro de 2027. A AMB revê-as todos os janeiros, e quem lhe indicar uma tarifa de táxi de Barcelona a partir de um quadro antigo está a indicar o ano errado. As nossas são verificadas no quadro de tarifas impresso, e não copiadas de outro site.',
        ],
      },
      {
        h2: 'Os suplementos, e o limite que provavelmente não vai atingir',
        body: [
          'Além do valor do taxímetro há suplementos fixos para locais e situações específicas. O suplemento do aeroporto de El Prat é de 4,60 € e aplica-se a qualquer viagem que comece ou termine no aeroporto. O terminal de cruzeiros de Moll Adossat tem os mesmos 4,60 €. A estação de Sants é de 2,55 € e o recinto de exposições Fira Gran Via é de 3,30 €.',
          'Um veículo com cinco ou mais passageiros acrescenta 4,60 €. É um suplemento de tarifa pelo próprio veículo maior e não uma cobrança por pessoa, e é uma das razões pelas quais a Vito de seis lugares custa mais do que uma berlina no mesmo percurso.',
          'Três noites do ano têm um acréscimo de 4,60 €: a Consoada para a manhã de Natal, a passagem de ano para o dia de Ano Novo, e a Revetlla de Sant Joan, na noite de 23 de junho. Se chegar numa dessas noites, a praça de táxis custará mais do que o habitual e o preço reservado não.',
          'Existe um limite de 17,10 € para o total de suplementos cobráveis num único serviço, pensado para casos extremos, como um veículo grande a sair do terminal de cruzeiros na passagem de ano. Numa viagem normal ao aeroporto paga um suplemento de 4,60 €, muito longe do teto.',
          'Tudo isto está incluído no nosso preço fixo. Os 50 € não são uma tarifa com suplementos a seguir; são o total, com o suplemento do aeroporto, o veículo, a tarifa e o nosso próprio custo de serviço já incluídos. A queixa mais comum sobre transfers de aeroporto em qualquer lado é um preço que cresce entre o orçamento e o passeio, e a forma de não o fazer é indicar o valor que realmente vamos cobrar.',
        ],
      },
      {
        h2: 'A tarifa mínima a partir de El Prat',
        body: [
          'Qualquer viagem com taxímetro que comece no aeroporto é cobrada com um mínimo de 21,00 €. Se o taxímetro tivesse marcado menos, paga-se o mínimo.',
          'Isto existe porque um táxi que espera quarenta minutos na fila do terminal por um salto de quatro euros até um hotel do aeroporto perdeu dinheiro no turno, e sem um piso ninguém aceitaria as viagens curtas. Só pesa em viagens realmente curtas: até à vila de El Prat ou a um dos hotéis ao longo da estrada do aeroporto.',
          'Para qualquer destino em Barcelona propriamente dita, o taxímetro ultrapassa folgadamente os 21 € por si só, pelo que o mínimo nunca entra na conta. Se lhe indicarem um preço de táxi do aeroporto de Barcelona «a partir de 21 €», esse é o piso de uma viagem de dois quilómetros apresentado como tarifa da cidade.',
        ],
      },
      {
        h2: 'O terminal de cruzeiros é um caso à parte',
        body: [
          'A ligação entre El Prat e Moll Adossat tem um preço oficial fechado de 46,00 € na tarifa T-4, definido pela AMB e não por nós. Não funciona com taxímetro.',
          'É invulgar e existe por boa razão: os passageiros de cruzeiro viajam contra uma hora limite de embarque, muitas vezes no pior trânsito do porto da semana, e uma tarifa de taxímetro nessa situação é uma aposta que ninguém quer fazer. Um preço fechado elimina o risco de trânsito numa viagem em que chegar tarde não é um incómodo mas um navio perdido.',
          'O nosso preço reservado para o mesmo percurso é de 60 € num sedan, acima do preço oficial fechado porque inclui uma garantia específica que a praça de táxis não oferece: um motorista atribuído com antecedência, que o espera com um cartaz com o seu nome, e mantém a recolha quer o navio atraque a horas ou não. Para uma família com bagagem e hora de partida, é geralmente aquilo por que vale a pena pagar. Para um viajante sozinho com uma mochila e uma tarde descontraída, a praça de táxis a 46 € é a melhor compra, e preferimos dizê-lo a fingir o contrário.',
          'Um transfer entre o terminal de cruzeiros e a cidade, em vez do aeroporto, custa o preço da cidade mais 10 € de taxa portuária, o que dá os mesmos 60 €. A simetria é intencional.',
        ],
      },
      {
        h2: 'Para lá da área metropolitana: Sitges, Girona, Tarragona',
        body: [
          'Quando uma das pontas da viagem fica fora da área metropolitana, as tarifas de Barcelona deixam de se aplicar por completo e a viagem é cobrada pelas tarifas interurbanas definidas pela Generalitat de Catalunya. São a T-6, de segunda a sexta das 08:00 às 20:00, e a T-7 em todos os outros momentos, incluindo todo o sábado e domingo.',
          'O taxímetro interurbano tem uma característica que surpreende quase toda a gente: cobra o trajeto de regresso. Um táxi de Barcelona a Sitges é, na tarifa, uma viagem de ida e volta, o circuito fechado, porque o motorista tem de voltar a casa e não pode apanhar clientes pelo caminho. Assim, um quilómetro percorrido para sul custa dois quilómetros no taxímetro. À tarifa T-6 de 0,82 € por quilómetro, são 1,64 € por cada quilómetro realmente percorrido, e não 0,82 €.',
          'É por isso que um transfer longo custa o que custa, e por isso que um valor que num comparador parece uma tarifa por quilómetro é muitas vezes metade do real. Com tudo incluído, também o nosso serviço, dá cerca de 2,16 € por quilómetro percorrido em dia útil (T-6) e entre 2,38 € e 2,48 € à noite e ao fim de semana (T-7), mais uma taxa de saída. Sitges, a 38 quilómetros, custa 90,78 € no total. Nada é duplicado duas vezes.',
          'Na prática: Sitges, Tarragona, Girona, Reus e a Costa Brava são preçados ao quilómetro e orçamentados antes de reservar, como tudo o resto. Não estão cobertos pela lista fixa da cidade, e nenhuma lista fixa honesta os poderia cobrir, porque as distâncias diferem por um fator de cinco.',
        ],
      },
      {
        h2: 'Fins de semana, feriados e o que realmente muda',
        body: [
          'Um preço fixo sobe 7,5 % ao fim de semana e em feriados. Num sedan de 50 €, são 3,75 €. O acréscimo existe porque a cobertura de fins de semana e feriados custa mais a assegurar, e é uma taxa única e publicada, não um multiplicador que varia com a procura: o preço que lhe indicamos num sábado de fevereiro é o mesmo que lhe indicamos num sábado de agosto.',
          'Aplica-se apenas aos preços fixos da cidade e do porto. Uma viagem interurbana já passa da T-6 para a T-7 ao fim de semana, que tem a sua própria tarifa mais alta, pelo que somar o acréscimo cobraria o mesmo prémio duas vezes.',
          'O que não muda: a hora do dia, o terminal, o trânsito, o percurso do motorista, o número de passageiros dentro da capacidade do veículo, nem a quantidade de bagagem dentro dela. Um carro de 4 lugares com três malas às 06:00 e um carro de 4 lugares com uma mala às 18:00 custam ambos 50 € num dia útil.',
        ],
      },
      {
        h2: 'Então que orçamento devo prever?',
        body: [
          'Para um transfer reservado para Barcelona: 50 € num dia útil num carro de 4 lugares, 53,75 € ao fim de semana. 70 € ou 75 € se precisar de 6 ou 7 lugares, o que para quatro adultos com quatro malas grandes é normalmente a resposta honesta e não uma tentativa de vender mais; três malas é o limite realista num Corolla ou num Toledo.',
          'Para a praça de táxis, num percurso diurno de dia útil até ao centro: o taxímetro mais o suplemento de 4,60 €, tipicamente na casa dos quarenta euros, e mais à noite, ao fim de semana ou com trânsito pesado. Conte com a possibilidade de a máquina de cartões não funcionar, o que acontece.',
          'Para o terminal de cruzeiros: 46 € ao preço oficial fechado, ou 60 € reservado, com um motorista a guardar a sua recolha.',
          'O que vale a pena dizer com clareza é que a praça de táxis e um carro reservado não são o mesmo produto a preços diferentes. Um é uma viagem regulada com taxímetro que se compra à chegada. O outro é um valor fixo, um motorista identificado e um carro já atribuído quando o seu voo aterra. Qual tem melhor relação qualidade-preço depende de quanto vale para si a incerteza nesse dia, e em muitas viagens a resposta é «não muito», caso em que a praça de táxis está mesmo ali.',
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: 'Táxi ou Aerobús a partir do aeroporto de Barcelona?',
    description:
      'Táxi, Aerobús ou metro desde El Prat: o custo real por grupo, tempos porta a porta honestos e os casos de bagagem e de noite em que cada opção compensa mais.',
    h1: 'Táxi ou Aerobús a partir do aeroporto de Barcelona?',
    excerpt:
      'O Aerobús é mais barato por pessoa e o metro mais barato ainda. Nenhum é automaticamente melhor depois de contar o tamanho do grupo, a bagagem e a caminhada no fim; e para uma ou duas pessoas com pouca bagagem, o táxi é a escolha errada e dizemo-lo.',
    sections: [
      {
        h2: 'As contas, com os números reais',
        body: [
          'O Aerobús cobra por pessoa. Um táxi cobra por carro. Essa única diferença decide a maior parte destas discussões antes de qualquer outro fator contar.',
          'Um transfer reservado de 4 lugares para Barcelona custa 50 € fixos. Dividido por duas pessoas, são 25 € cada, várias vezes o preço de um lugar no Aerobús. Dividido por quatro, são 12,50 € cada, e a diferença reduz-se a algo que a maioria deixa de ter em conta, antes ainda de contar que o táxi termina à sua porta e o autocarro na Praça da Catalunha.',
          'O ponto de viragem costuma ser três passageiros, e com quatro já costuma ter desaparecido. Um grupo de seis num Vito a 70 € paga menos de 12 € por cabeça, porta a porta, com a bagagem na mala em vez de ao colo.',
          'A versão honesta da comparação é esta: a viajar sozinho, o autocarro compensa mais e não há comparação. Em família de quatro com malas, o táxi costuma ser mais barato no total e consideravelmente mais fácil. Tudo o que fica no meio depende da bagagem.',
        ],
      },
      {
        h2: 'Tempo porta a porta, e não o tempo de cartaz',
        body: [
          'O Aerobús é anunciado com cerca de 35 minutos até à Praça da Catalunha, e é exato: de paragem a paragem. O tempo que realmente vive é maior, porque a viagem não começa na plataforma do autocarro nem termina na praça.',
          'Some a caminhada das chegadas até à paragem, que no T1 são uns minutos com um carrinho. Some a espera, curta nas horas de ponta e que pode chegar a quinze minutos ao fim da noite. Depois some o troço da Praça da Catalunha ou de Sants até onde fica alojado: de metro com malas, noutro táxi, ou a pé sobre a calçada do Bairro Gótico.',
          'Um táxi de El Prat ao centro de Barcelona demora 25 a 35 minutos consoante o trânsito e a zona da cidade, e termina na morada que indicou. Para o Eixample ou Sant Antoni, a diferença no tempo total porta a porta é talvez de vinte minutos. Para algum sítio no alto de Gràcia, ou um apartamento com entrada pela rua em El Born, aproxima-se muitas vezes de quarenta e cinco.',
          'A variação importa tanto como a média. O autocarro é fiável e o táxi é mais rápido; com trânsito pesado convergem, porque o autocarro está no mesmo trânsito e pára mais vezes.',
        ],
      },
      {
        h2: 'O metro é mais barato do que ambos, com condições',
        body: [
          'A linha 9 Sul serve os dois terminais e é a forma mais barata de entrar na cidade, com larga margem. É uma opção genuinamente boa e pouco usada pelos visitantes.',
          'As condições são reais, no entanto. Não vai diretamente ao centro: faz-se transbordo, normalmente em Collblanc ou Torrassa, para outra linha, e as estações do aeroporto exigem um bilhete específico do aeroporto em vez de um simples normal. As estações têm elevadores, mas os transbordos implicam corredores, e fazê-los com duas malas grandes e uma criança cansada é daquelas coisas que parecem bem quando se reserva e já não parecem bem às 23:00.',
          'Se viaja com pouca bagagem, fica perto de um transbordo da linha 9 e não tem pressa, o metro é a resposta certa e custa uma fração de tudo o resto. Se qualquer uma dessas três condições falhar, deixa rapidamente de ser a resposta certa.',
        ],
      },
      {
        h2: 'A bagagem é o verdadeiro fator decisivo',
        body: [
          'Mais do que o preço e mais do que o tempo, é a bagagem que decide, e é aquilo que as pessoas subestimam quando reservam de casa.',
          'Um táxi de 4 lugares de Barcelona, um Corolla ou um SEAT Toledo, leva quatro passageiros e cerca de 3 malas. Quatro adultos, cada um com uma mala grande, não cabem, e a resposta é um Vito de 6 lugares, que leva 6 passageiros e 6 malas, ou uma V-Class de 7 lugares. Saber isto com antecedência é a diferença entre um transfer e um problema no passeio.',
          'No Aerobús, a bagagem vai num porão por baixo do autocarro e há um suporte junto à porta, o que funciona bem. No metro vai onde conseguir segurá-la, o que, à hora de ponta, é em cima de si.',
          'A regra prática que se mantém: uma mala por pessoa e tem uma escolha real entre os três. Duas malas por pessoa e o táxi é o único realmente agradável, digam o que disserem as contas.',
        ],
      },
      {
        h2: 'Quando o táxi ganha claramente',
        body: [
          'Chegar depois da meia-noite. O Aerobús deixa de circular de madrugada e o metro fecha, com uma rede limitada de autocarros noturnos pelo meio que não é uma proposta realista com bagagem e sem falar catalão.',
          'Viajar com crianças, um carrinho de bebé ou uma cadeirinha. O autocarro é gerível com uma criança e incómodo com duas, e ninguém gosta do transbordo do metro com um carrinho e uma mala.',
          'Apanhar um voo cedo. Uma recolha às 04:30 para uma partida às 06:30 não tem equivalente em transportes públicos, e um carro reservado a preço fixo é a única versão que o deixa dormir até ao despertador.',
          'Ficar num sítio onde o último troço é verdadeiramente complicado: o Bairro Gótico, onde os veículos não chegam a muitas moradas mas chegam bem mais perto do que uma paragem de autocarro; Gràcia e Sarrià, no alto de qualquer das rotas de autocarro; qualquer sítio onde acabaria com um segundo táxi, o que faz a opção «mais barata» custar mais.',
          'Grupos de quatro ou mais. Nesse ponto o preço por carro já ganhou no dinheiro, pelo que a comodidade sai de graça.',
        ],
      },
      {
        h2: 'Quando não ganha, e dizemo-lo',
        body: [
          'Uma ou duas pessoas, bagagem leve, alojadas perto da Praça da Catalunha ou numa linha de metro direta, a chegar a meio do dia. Nessa situação o Aerobús é a escolha sensata, o metro é a barata, e um táxi de 50 € é pagar por uma comodidade de que não precisa especialmente.',
          'Preferimos escrevê-lo a fingir que o táxi tem sempre razão. Um transfer de aeroporto é um serviço com uma forma específica, preço fixo, motorista atribuído, porta a porta, bagagem tratada, e essa forma vale muito para uma família de quatro à meia-noite e muito pouco para um viajante sozinho com uma mochila às duas da tarde.',
          'A mesma lógica aplica-se à praça de táxis. Um táxi com taxímetro numa tarde calma de dia útil fica muitas vezes abaixo de um preço fixo reservado, porque o preço fixo inclui absorver um risco de trânsito que nesse dia não se concretizou. É assim que funcionam os preços fixos, nos dois sentidos.',
        ],
      },
      {
        h2: 'O vazio da noite de que ninguém fala',
        body: [
          'Há uma janela, aproximadamente entre o último Aerobús e o primeiro metro da manhã, em que as opções de transporte público se reduzem a um autocarro noturno e a praça de táxis passa a ser a opção por defeito. Numa noite normal, a praça do T1 é bem supervisionada e anda depressa.',
          'Onde corre mal é num voo atrasado que aterra nessa janela ao mesmo tempo que outros dois voos atrasados. A fila tem então quarenta pessoas e a oferta de táxis às 02:00 é escassa, porque os motoristas não ficam num terminal à espera de sorte. É o único cenário em que chegar com um carro já atribuído vale claramente mais do que custa.',
          'Se o seu voo está previsto aterrar depois das 23:30, mais ou menos, convém decidir isto antes de voar e não no hall das chegadas.',
        ],
      },
      {
        h2: 'Voltar ao aeroporto é um problema diferente',
        body: [
          'Quase toda a gente planeia a chegada e improvisa a partida, e a partida é a metade mais difícil.',
          'À chegada tem opções porque está num aeroporto, o único sítio da região onde há garantidamente táxis. À partida está numa rua de Gràcia às 05:00 com um voo às 07:30, e tudo o que tornava o autocarro e o metro atraentes deixou de circular.',
          'O Aerobús não ajuda em partidas cedo, e chamar um táxi numa rua residencial antes do amanhecer é pouco fiável de uma forma que não acontece na Gran Via. Barcelona tem muitos táxis; não tem muitos táxis na sua esquina às cinco da manhã.',
          'Para uma partida de dia a partir de uma morada central, as três opções funcionam no sentido inverso exatamente como à chegada, e aplicam-se as mesmas contas. Para qualquer coisa antes das 07:00 ou a partir de uma morada fora da malha principal, uma recolha reservada é menos uma comodidade do que a única versão que acontece de forma fiável. O preço fixo é o mesmo nos dois sentidos: 50 € para a cidade e 50 € de lá, dias úteis, carro de 4 lugares.',
        ],
      },
      {
        h2: 'Como decidir em dez segundos',
        body: [
          'Conte as pessoas e conte as malas. Uma ou duas pessoas com uma mala cada, a chegar de dia, alojadas no centro: apanhe o Aerobús, ou o metro se contar cada euro.',
          'Três ou mais pessoas, ou duas ou mais malas cada, ou uma chegada depois de os autocarros pararem, ou uma morada no alto de uma colina ou ao fundo de uma ruela: apanhe um táxi, e decida à parte se quer a praça de táxis ou um carro reservado com antecedência.',
          'Praça de táxis ou reservado resume-se a uma pergunta: até que ponto uma fila de quarenta minutos ou um valor final desconhecido afetariam a sua noite? Se a resposta for «pouco», a praça está mesmo à saída das chegadas e custa menos. Se viaja com pessoas que não lidariam bem com isso, ou contra um prazo, reserve.',
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: 'Terminais do aeroporto de Barcelona: T1 e T2',
    description:
      'Que terminal usa a sua companhia em Barcelona El Prat, como funciona o shuttle T1-T2, onde ficam as praças de táxis e onde o espera um motorista reservado.',
    h1: 'Terminais do aeroporto de Barcelona: T1 e T2',
    excerpt:
      'Enganar-se no terminal custa um shuttle e vinte minutos, e numa partida pode custar o voo. Eis qual é qual, onde ficam realmente os táxis em cada um, e a única coisa a verificar na véspera de voar.',
    sections: [
      {
        h2: 'Dois terminais, a vários quilómetros um do outro',
        body: [
          'O aeroporto de Barcelona El Prat tem dois terminais de passageiros, T1 e T2, e o mais importante a saber sobre eles é que não se vai a pé de um ao outro. Ficam em lados opostos das pistas, a alguns quilómetros de distância, ligados por um autocarro shuttle gratuito.',
          'Isto apanha as pessoas desprevenidas porque em muitos aeroportos «terminal» significa outra ala do mesmo edifício. Aqui significa outro edifício, com uma viagem de autocarro pelo meio, e a viagem demora 10 a 15 minutos, sem contar a espera.',
          'O T1 é o mais recente e muito maior dos dois, inaugurado em 2009, e recebe a maior parte do tráfego de longo curso, além da maioria da Vueling e das companhias tradicionais. O T2 é o terminal original, mais antigo e de tetos mais baixos, dividido em três blocos e utilizado por várias companhias de baixo custo.',
          'Ambos estão totalmente equipados: check-in, segurança, lojas, restauração, aluguer de carros, praças de táxis. Nenhum é um posto remoto. A única penalização real por ir ao errado é o tempo.',
        ],
      },
      {
        h2: 'Que companhias usam qual',
        body: [
          'O T1 recebe a maior parte do que chega de fora da Europa, além da Vueling, que é a companhia dominante no aeroporto, e da maioria das companhias de bandeira tradicionais.',
          'O T2 serve um conjunto de companhias de baixo custo, entre as quais a Ryanair é das maiores, além de algum tráfego charter e sazonal.',
          'A ressalva útil: isto não é estável. As companhias mudam de terminal quando os contratos mudam, por vezes com poucas semanas de aviso, e os horários sazonais baralham ainda mais as coisas. Um guia que lhe diz com confiança que terminal usa a sua companhia está a dizer-lhe que terminal usava quando o guia foi escrito.',
          'Os voos em codeshare pioram tudo. Se reservou através de uma companhia e voa no avião de outra, o terminal segue a companhia que opera, não a da sua confirmação de reserva. O terminal impresso no cartão de embarque é o que conta, e é a única fonte em que vale a pena confiar.',
        ],
      },
      {
        h2: 'Ir entre o T1 e o T2',
        body: [
          'O autocarro shuttle entre os terminais é gratuito, frequente e funciona durante a noite, embora com menos frequência de madrugada. Pára à saída das chegadas no T1 e em cada bloco do T2.',
          'Preveja 25 minutos porta a porta e não os 10 a 15 da viagem em si: vai esperar pelo autocarro, carregar bagagem e caminhar no fim. Em horas de movimento, com o autocarro cheio e só lugares em pé, demora mais e é bastante menos agradável com malas.',
          'A linha 9 Sul do metro também liga os dois terminais, com uma estação em cada, o que por vezes é mais rápido do que esperar pelo autocarro se já estiver no subsolo. Não é gratuita e exige o bilhete do aeroporto.',
          'Se faz ligação entre um voo para o T2 e um voo a partir do T1 em bilhetes separados, trate a transferência como um troço real da viagem e dê-lhe uma hora. Há quem perca voos por causa disto.',
        ],
      },
      {
        h2: 'O T2 tem três blocos, e o bloco importa',
        body: [
          'O T2 divide-se nos blocos A, B e C, dispostos em linha ao longo da frente do edifício. Estão ligados por dentro, pelo que se pode caminhar entre eles, mas a caminhada de uma ponta à outra demora vários minutos.',
          'A sua companhia usa um bloco específico, e os balcões de check-in, a segurança e a praça de táxis estão todos ligados a ele. Ser deixado no bloco C quando precisa do A não é um desastre, mas é uma caminhada com bagagem que não planeou.',
          'Ao reservar um transfer com recolha ou destino no T2, convém incluir o bloco. É a diferença entre um motorista que está onde sai e um motorista que está a trezentos metros ao longo da fachada.',
        ],
      },
      {
        h2: 'Onde ficam as praças de táxis',
        body: [
          'Ambos os terminais têm praças de táxis oficiais imediatamente à saída das chegadas, bem sinalizadas, supervisionadas e normalmente movimentadas. No T1 a praça fica mesmo em frente ao hall das chegadas. No T2 há praças para cada um dos blocos.',
          'Os táxis dessas praças são táxis licenciados de Barcelona com a pintura habitual preta e amarela, todos com o mesmo taxímetro regulado. Não há negociação nem escolha: apanha o carro da frente. É o sistema a funcionar como foi concebido, e significa que não pode ser cobrado a mais em relação à tarifa.',
          'Qualquer viagem que comece no aeroporto tem um suplemento de 4,60 € e uma tarifa mínima de 21 €, ambos parte da tarifa oficial e nada que o motorista tenha acrescentado.',
          'O que a praça de táxis não pode fazer é dizer-lhe o preço antes de partir, nem garantir que haverá um carro quando aterrar. Numa tarde normal, ambas as coisas correm bem. Depois de um conjunto de chegadas tardias atrasadas, a fila é a história toda.',
        ],
      },
      {
        h2: 'Onde o espera, em vez disso, um motorista reservado',
        body: [
          'Um transfer pré-reservado não usa a praça de táxis, e é a parte em que as pessoas mais se enganam à chegada.',
          'O seu motorista espera dentro do hall das chegadas, no lado público da saída da recolha de bagagem, com um cartaz com o seu nome. Não está no passeio nem na fila da praça. Sai da recolha de bagagem e ele está ali, que é todo o objetivo de reservar.',
          'O ponto de encontro exato é confirmado por email antes de viajar, porque difere consoante o terminal e, no T2, o bloco. Leia esse email no avião e não no hall.',
          'O motorista acompanha o número do seu voo, pelo que um atraso desloca a recolha em vez de a perder. É a diferença prática entre um carro reservado e a praça de táxis: um voo com uma hora de atraso a aterrar à 01:00 significa um motorista que ainda lá está, em vez de uma praça que esvaziou.',
          'Se não se encontrarem, o número de telefone na confirmação chega diretamente ao motorista, e não a um centro de atendimento. Os halls das chegadas são grandes e os cartazes baixam-se; um telefonema resolve.',
        ],
      },
      {
        h2: 'O terminal altera a tarifa?',
        body: [
          'Pouco, e num transfer reservado nada.',
          'O T1 fica uns quilómetros mais longe da cidade do que o T2. Num percurso de 15 quilómetros até ao centro de Barcelona, essa diferença é pequena, e o suplemento do aeroporto de 4,60 € é idêntico em qualquer dos terminais. No taxímetro pode ver um ou dois euros de diferença.',
          'Um preço fixo reservado não distingue entre eles: 50 € para a cidade num carro de 4 lugares, do T1 ou do T2, num dia útil, com o suplemento já incluído no valor. O mesmo se aplica em sentido inverso nas partidas.',
          'O que o terminal altera é o risco do shuttle. Se for deixado no errado, o custo são 25 minutos e um autocarro, o que numa chegada é aborrecido e numa partida pode ser o voo.',
        ],
      },
      {
        h2: 'Partidas: onde o erro realmente dói',
        body: [
          'À chegada, o terminal errado custa-lhe tempo. À partida pode custar-lhe a viagem, porque descobre o erro num balcão de check-in que não tem o seu voo e num shuttle que demora 25 minutos que não tem.',
          'Indique o terminal ao reservar um transfer de partida, e confirme-o no cartão de embarque e não de memória do voo de ida. As companhias usam rotineiramente terminais diferentes em cada sentido, e um regresso em codeshare pode facilmente ser num terminal diferente do da ida.',
          'Para uma partida cedo, sair de Barcelona para estar em El Prat para um voo às 06:30 significa uma recolha por volta das 04:30 na cidade, mais cedo se estiver mais longe. Um carro reservado a preço fixo é a única versão disto que não implica ficar numa rua ao amanhecer à espera de sorte.',
        ],
      },
      {
        h2: 'Quanto vai realmente demorar a sair',
        body: [
          'O tempo que conta numa recolha não é quando o avião aterra, é quando sai da recolha de bagagem, e a diferença entre os dois é maior do que a maioria das pessoas prevê.',
          'Numa chegada Schengen só com bagagem de mão, dez a quinze minutos desde a aterragem até ao hall das chegadas é realista. De fora de Schengen, com controlo de passaportes e bagagem de porão, meia hora é normal e uma hora acontece, sobretudo no T1 a meio da manhã, quando vários voos de longo curso aterram juntos e o gargalo é a fila do controlo e não o tapete.',
          'É por isso que um transfer reservado está ligado ao número do seu voo e não a uma hora que escreveu. O motorista acompanha a aterragem real e conta com o hall, o que elimina a estimativa que de outra forma teria de fazer ao reservar de casa semanas antes.',
          'Significa também que não há vantagem em folgar a sua estimativa. Reservar uma recolha uma hora depois da aterragem «por segurança» não ajuda, porque o acompanhamento já trata disso, e deixa-o à espera de um carro deliberadamente atrasado.',
          'A única coisa a fazer por si: se sair da recolha de bagagem invulgarmente depressa e o motorista ainda não estiver em posição, o número de telefone da confirmação chega-lhe diretamente. Um carro a oito minutos é um resultado normal de uma saída rápida, não um problema.',
        ],
      },
      {
        h2: 'Confirme-o na véspera',
        body: [
          'Um hábito elimina quase tudo isto: na noite anterior ao voo, abra o cartão de embarque e leia o terminal. Não a confirmação de reserva, não o guia que leu em março, não a página geral de rotas da companhia, mas o cartão de embarque do voo que vai apanhar.',
          'Se não corresponder ao que nos indicou, responda ao email de confirmação e alteramos. Mudar o terminal numa reserva não custa nada e demora um minuto. Descobri-lo às 05:00 custa o shuttle, o stress e por vezes o voo.',
        ],
      },
    ],
  },
};
