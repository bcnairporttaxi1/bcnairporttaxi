import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "ca" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const CA_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: 'Quant costa un taxi des de l’aeroport de Barcelona?',
    description:
      'Preus del taxi de l’aeroport de Barcelona: les nostres tarifes fixes tot inclòs fins a la ciutat, en què es diferencia el taxímetre i què sumen els suplements.',
    h1: 'Quant costa un taxi des de l’aeroport de Barcelona?',
    excerpt:
      'Un trasllat reservat des d’El Prat fins a Barcelona costa 50 € en un cotxe de quatre places, preu fix i pagat en línia. La parada de taxis de la sortida d’arribades funciona diferent, amb un taxímetre regulat. Aquí veuràs què costa cadascun i per què les dues xifres no coincideixen.',
    sections: [
      {
        h2: 'La resposta curta',
        body: [
          'Un trasllat reservat entre El Prat i qualsevol punt de Barcelona costa 50 € en un cotxe de quatre places, 70 € en un Mercedes Vito de sis places i 75 € en una Mercedes V-Class de set places. Aquest és el preu complet. Te’l donem abans de viatjar, es paga en línia en reservar i no deus res al conductor dins del cotxe.',
          'El terminal de creuers del Moll Adossat és una ruta pròpia: 60 €, 80 € i 85 € per als mateixos tres tipus de vehicle.',
          'Aquestes xifres no varien segons l’hora del dia. Una recollida a les 04:30 per a un vol de matinada costa el mateix que una a les dues de la tarda. L’únic que les puja és un cap de setmana o un festiu, que afegeix un 7,5 %, de manera que un trasllat en cotxe de quatre places un dissabte costa 53,75 € i no 50 €.',
          'Si agafes un taxi a la parada de la sortida d’arribades, no compres un preu fix: compres un trajecte amb taxímetre, i la xifra final depèn del trànsit, de l’hora i de la ruta. La resta d’aquesta pàgina explica totes dues opcions, perquè quina és més barata depèn realment de quan viatgis.',
        ],
      },
      {
        h2: 'Per què un sol preu i no la lectura d’un taxímetre',
        body: [
          'Les tarifes dels taxis de Barcelona les regula l’Àrea Metropolitana de Barcelona, i tots els taxis amb llicència de la ciutat porten el mateix taxímetre amb les mateixes tarifes. És una protecció real per al consumidor i no la qüestionem. El que un taxímetre regulat no fa és dir-te el preu per avançat.',
          'En un trajecte de 15 quilòmetres fins a l’Eixample, la lectura del taxímetre varia uns deu euros segons si trobes la Ronda de Dalt fluida o aturada, i un vint-i-cinc per cent més segons si és dimarts a l’hora de dinar o dissabte a la nit. Les dues xifres són correctes. Cap de les dues es pot saber quan ets a la sala d’arribades decidint què fer.',
          'Un preu fix ens trasllada aquesta variació a nosaltres. Et donem 50 €, ho liquidem amb el conductor segons el que acabi costant realment el trajecte, i la diferència és nostra tant si és a favor com en contra. Un dimarts amb trànsit fluid, això és pitjor per a tu que la parada. Amb el trànsit d’un divendres al vespre, és millor. El que sempre és, és conegut.',
          'També és l’única manera honesta de vendre un trasllat a algú que encara no és a Barcelona. Ningú que reserva des de Manchester al març pot calcular la lectura del taxímetre d’una tarda de dijous al juliol, de manera que un pressupost que en realitat és una estimació és un pressupost que pot ser erroni, i sempre s’equivoca en el sentit que la xifra puja.',
        ],
      },
      {
        h2: 'La zona de 16 quilòmetres i per què es mesura en línia recta',
        body: [
          'El preu de la llista cobreix qualsevol adreça a menys de 16 quilòmetres del terminal, mesurats en línia recta. Això inclou tot el centre i gairebé tots els llocs on s’allotja un visitant: la plaça de Catalunya a 12,3 km, la Barceloneta a 12,8, la Sagrada Família a 14,0, el Park Güell, al turó darrere de Gràcia, a 14,3 i el Poblenou a 15,5 paguen tots els mateixos 50 € que un hotel del passeig de Gràcia. No és tot el municipi, i convé saber quina part en queda fora: els districtes exteriors del nord i de l’est queden fora de la zona, amb La Sagrera a 16,4 km, el Fòrum a 17,4, Sant Andreu a 17,7, Nou Barris a 17,9 i Torre Baró a 19,3, i aquestes adreces paguen la tarifa d’excés que s’explica més avall.',
          'La mesura en línia recta és deliberada, i val la pena entendre-la perquè juga al teu favor. La plaça de Catalunya és a 12,3 quilòmetres del terminal en línia recta i a 19,6 quilòmetres per carretera, perquè la via ha de vorejar el Llobregat i entrar per la Gran Via. Una zona mesurada per carretera a 16 quilòmetres deixaria el centre mateix de Barcelona fora i començaria a cobrar quilòmetres addicionals en el trajecte més habitual que el preu existeix per cobrir. Per això la zona es dibuixa sobre el mapa, no sobre la ruta.',
          'Fora de la zona, el preu és el de la llista més 1,50 € per cada quilòmetre addicional. Badalona és a 21,8 quilòmetres i Sant Cugat del Vallès a 19,5, de manera que tots dos paguen el preu de la ciutat més la diferència. Són els casos que s’hi queden a prop; la major part de l’àrea metropolitana és dins de la zona.',
          'Aquest 1,50 € és una xifra única i publicada, no la tarifa de l’hora, cosa que importa més del que sembla. La tarifa nocturna oficial és de 1,66 € per quilòmetre davant d’1,35 € de dia. Aplicar la que correspongui tornaria a posar l’hora del dia en una llista de preus l’objectiu de la qual és precisament que l’hora no els mogui, i qui hagués sentit «cinquanta euros més un euro cinquanta per quilòmetre» es trobaria amb un import superior sense avís. Un sol nombre, tot el dia.',
        ],
      },
      {
        h2: 'Què cobra la parada de taxis',
        body: [
          'Si surts a la parada de taxis, tres elements es combinen en la xifra del taxímetre: una tarifa de sortida des del moment que el taxímetre comença a comptar, una tarifa per quilòmetre i els suplements que corresponguin.',
          'La tarifa de sortida —la baixada de bandera— és de 2,80 €. La tarifa per quilòmetre és d’1,35 € amb la tarifa T-1, que s’aplica de dilluns a divendres entre les 08:00 i les 20:00, i d’1,66 € amb la T-2 en qualsevol altre moment: vespres, nits, tot el dissabte i el diumenge, i els festius. La diferència és d’un 23 per cent aproximadament, i per això un mateix trajecte costa realment més a les 22:00 que a les 14:00.',
          'També hi ha una tarifa d’espera de 27,75 € l’hora, que el taxímetre compta mentre estàs aturat. A la pràctica, això és el que fa imprevisibles les arribades en hora punta: el taxímetre no s’atura quan s’atura el trànsit.',
          'Les tarifes actuals són vigents del 19 de gener de 2026 al 17 de gener de 2027. L’AMB les revisa cada gener, i qui et doni una tarifa de taxi de Barcelona d’un cartell antic t’està donant la d’un altre any. Les nostres es contrasten amb el cartell de tarifes imprès, no es copien d’una altra web.',
        ],
      },
      {
        h2: 'Els suplements i el límit que probablement no assoliràs',
        body: [
          'A sobre de la tarifa del taxímetre hi ha suplements fixos per a llocs i situacions concrets. El suplement de l’aeroport d’El Prat és de 4,60 € i s’aplica a qualsevol trajecte que comenci o acabi a l’aeroport. El terminal de creuers del Moll Adossat té el mateix 4,60 €. L’estació de Sants és de 2,55 € i el recinte firal de la Fira Gran Via de 3,30 €.',
          'Un vehicle amb cinc o més passatgers afegeix 4,60 €. És un suplement de la tarifa pel propi vehicle gran i no un càrrec per persona, i és una de les raons per les quals la Vito de sis places costa més que un turisme en el mateix trajecte.',
          'Tres nits a l’any porten un altre suplement de 4,60 €: la nit de Nadal cap al matí de Nadal, la nit de Cap d’Any cap al dia d’Any Nou i la revetlla de Sant Joan, la nit del 23 de juny. Si arribes en avió una d’aquestes nits, la parada et costarà més que la seva tarifa habitual i el preu reservat no.',
          'Hi ha un límit de 17,10 € al total de suplements que es poden cobrar en un sol servei, que existeix per als casos extrems —per exemple, un vehicle gran que surt del terminal de creuers la nit de Cap d’Any. En un trajecte d’aeroport normal pagues un únic suplement de 4,60 € i ets molt lluny del límit.',
          'Tot això és dins del nostre preu fix. Els 50 € no són una tarifa a la qual s’afegiran suplements; són el total, amb el suplement de l’aeroport, el vehicle, la tarifa i el nostre propi cost de servei ja inclosos. La queixa més freqüent sobre els trasllats d’aeroport a tot arreu és un preu que creix entre el pressupost i la vorera, i la manera de no fer-ho és donar la xifra que realment cobraràs.',
        ],
      },
      {
        h2: 'La tarifa mínima des d’El Prat',
        body: [
          'Qualsevol trajecte amb taxímetre que comenci a l’aeroport es factura com a mínim a 21,00 €. Si el taxímetre n’hagués marcat menys, el mínim és el que pagues.',
          'Això existeix perquè un taxi que fa cua quaranta minuts a la parada del terminal per un trajecte de quatre euros fins a un hotel de l’aeroport ha perdut diners en aquell torn, i sense un mínim ningú faria els trajectes curts. Només s’aplica a trajectes realment curts: cap al poble d’El Prat o a algun dels hotels de la carretera de l’aeroport.',
          'Per a qualsevol destinació dins de Barcelona, el taxímetre supera de sobra els 21 € per si sol, de manera que el mínim no entra mai en el càlcul. Si et donen un preu de taxi de l’aeroport de Barcelona «des de 21 €», és el mínim d’un trajecte de dos quilòmetres presentat com una tarifa de ciutat.',
        ],
      },
      {
        h2: 'El terminal de creuers és un cas a part',
        body: [
          'El trajecte entre El Prat i el Moll Adossat té un preu tancat fix oficial de 46,00 € amb la tarifa T-4, establert per l’AMB i no per nosaltres. No funciona amb taxímetre en absolut.',
          'És poc habitual i té una bona raó: els passatgers de creuer viatgen contra una hora límit d’embarcament, sovint en el pitjor trànsit portuari de la setmana, i una tarifa amb taxímetre en aquesta situació és una aposta que ningú vol fer. Un preu tancat elimina el risc de trànsit d’un trajecte en què arribar tard no és una molèstia sinó perdre el vaixell.',
          'El nostre preu reservat per a la mateixa ruta és de 60 € en un cotxe de quatre places, per sobre del preu tancat oficial perquè inclou una garantia concreta que la parada no ofereix: un conductor assignat per avançat, que et rep amb un cartell amb el teu nom i que et guarda l’hora tant si el vaixell atraca puntual com si no. Per a una família amb equipatge i una hora de sortida, això sol ser el que val la pena pagar. Per a un viatger sol amb motxilla i una tarda sense pressa, la parada a 46 € és la millor compra, i preferim dir-ho a fer veure el contrari.',
          'Un trasllat entre el terminal de creuers i la ciutat —en lloc de l’aeroport— és el preu de la ciutat més un recàrrec portuari de 10 €, que arriba als mateixos 60 €. La simetria és intencionada.',
        ],
      },
      {
        h2: 'Més enllà de l’àrea metropolitana: Sitges, Girona, Tarragona',
        body: [
          'Quan un dels dos extrems del trajecte és fora de l’àrea metropolitana, les tarifes de Barcelona deixen d’aplicar-se del tot i el trajecte es factura amb les tarifes interurbanes fixades per la Generalitat de Catalunya. Són la T-6, de dilluns a divendres de 08:00 a 20:00, i la T-7 en qualsevol altre moment, inclosos tot el dissabte i el diumenge.',
          'El taxímetre interurbà té una característica que sorprèn gairebé tothom: cobra el trajecte de tornada. Un taxi de Barcelona a Sitges és, segons la tarifa, un trajecte d’anada i tornada —el circuit tancat— perquè el conductor ha de tornar a casa i no pot recollir cap client pel camí. Així, un quilòmetre cap al sud val dos quilòmetres al taxímetre. Amb la tarifa T-6 de 0,82 € el quilòmetre, són 1,64 € per cada quilòmetre realment recorregut, no 0,82 €.',
          'Per això un trasllat llarg costa el que costa, i per això una xifra que sembla una tarifa per quilòmetre en un comparador sol ser la meitat de la real. Amb tot inclòs, també el nostre servei, surt a uns 2,16 € per quilòmetre recorregut en dia feiner (T-6) i entre 2,38 € i 2,48 € de nit i en cap de setmana (T-7), més una quota de sortida. Sitges, a 38 quilòmetres, costa 90,78 € en total. No es duplica res dues vegades.',
          'En la pràctica: Sitges, Tarragona, Girona, Reus i la Costa Brava es calculen per quilòmetre i es pressuposten abans de reservar, com tota la resta. No els cobreix la llista fixa de la ciutat, i cap llista fixa honesta no podria cobrir-los: les distàncies es diferencien en un factor de cinc.',
        ],
      },
      {
        h2: 'Caps de setmana, festius i què canvia realment',
        body: [
          'Un preu fix puja un 7,5 per cent els caps de setmana i els festius. En un cotxe de quatre places de 50 € són 3,75 €. L’increment existeix perquè la cobertura de caps de setmana i festius costa més de dotar de personal, i és una tarifa única i publicada, no un multiplicador que varia amb la demanda: el preu que et donem un dissabte de febrer és el mateix que et donem un dissabte d’agost.',
          'S’aplica només als preus fixos de ciutat i de port. Un trajecte interurbà ja passa de la T-6 a la T-7 el cap de setmana, que porta la seva pròpia tarifa més alta, de manera que afegir-hi l’increment a sobre cobraria dues vegades el mateix recàrrec.',
          'El que no canvia: l’hora del dia, el terminal, el trànsit, la ruta que segueix el conductor, el nombre de passatgers dins de la capacitat del vehicle ni la quantitat d’equipatge dins d’aquesta capacitat. Un cotxe de quatre places amb tres maletes a les 06:00 i un cotxe de quatre places amb una sola bossa a les 18:00 costen tots dos 50 € en dia feiner.',
        ],
      },
      {
        h2: 'Doncs quin pressupost cal comptar?',
        body: [
          'Per a un trasllat reservat a Barcelona: 50 € en dia feiner en un cotxe de quatre places, 53,75 € en cap de setmana. 70 € o 75 € si necessites un vehicle de sis o set places, que per a quatre adults amb quatre maletes grans sol ser la resposta honesta i no una venda forçada: tres maletes és el límit realista en un Corolla o un Toledo.',
          'Per a la parada, en un trajecte diürn en dia feiner fins al centre: el taxímetre més el suplement de 4,60 €, que normalment queda en algun punt dels quaranta, i més alt al vespre, en cap de setmana o amb molt de trànsit. Compta amb la possibilitat que el datàfon no funcioni, cosa que passa.',
          'Per al terminal de creuers: 46 € al preu tancat oficial, o 60 € reservat amb un conductor que et guarda l’hora.',
          'El que cal dir amb claredat és que la parada i un cotxe reservat no són el mateix producte a un preu diferent. L’un és un trajecte regulat amb taxímetre que compres en arribar. L’altre és una xifra fixa, un conductor amb nom i un cotxe que ja està assignat quan aterra el teu vol. Quina opció val més la pena depèn totalment de quant valgui per a tu la certesa aquell dia, i per a molts trajectes la resposta és «no gaire», i en aquest cas la parada és allà mateix.',
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: 'Taxi o Aerobús des de l’aeroport de Barcelona?',
    description:
      'Taxi, Aerobús o metro des d’El Prat: el cost real per grup, els temps reals de porta a porta i els casos d’equipatge i de nit en què guanya cadascun.',
    h1: 'Taxi o Aerobús des de l’aeroport de Barcelona?',
    excerpt:
      'L’Aerobús és més barat per persona i el metro encara ho és més. Cap dels dos és automàticament millor quan comptes la mida del grup, l’equipatge i el tros a peu final; i per a una o dues persones que viatgen lleugeres, el taxi és l’opció equivocada, i t’ho direm.',
    sections: [
      {
        h2: 'L’aritmètica, amb els números reals',
        body: [
          'L’Aerobús cobra per cap. Un taxi cobra per cotxe. Aquesta sola diferència decideix la majoria d’aquestes discussions abans que cap altre factor hi tingui res a dir.',
          'Un trasllat reservat a Barcelona en un cotxe de quatre places costa 50 € fixos. Repartit entre dues persones són 25 € cadascuna, que són diverses vegades el preu d’un seient d’Aerobús. Repartit entre quatre són 12,50 € cadascuna, i la diferència es redueix fins a un punt que la majoria de gent deixa de comptar, abans fins i tot de tenir en compte que el taxi t’acaba deixant a la porta i l’autobús t’acaba deixant a la plaça de Catalunya.',
          'El punt d’inflexió sol ser a tres passatgers, i amb quatre ja acostuma a haver desaparegut. Un grup de sis en un Vito a 70 € paga menys de 12 € per cap, de porta a porta, amb l’equipatge al maleter i no als genolls.',
          'La versió honesta de la comparació és aquesta: viatjant sol, l’autobús és més rendible i no hi ha color. Viatjant com una família de quatre amb maletes, el taxi sol ser més barat en total i molt més còmode. Tot el que hi ha entremig depèn de l’equipatge.',
        ],
      },
      {
        h2: 'Temps de porta a porta, no el temps del titular',
        body: [
          'L’Aerobús s’anuncia amb uns 35 minuts fins a la plaça de Catalunya, i és exacte —de parada a parada. El temps que realment vius és més llarg, perquè el viatge no comença al moll de l’autobús ni acaba a la plaça.',
          'Suma el camí a peu des de la sala d’arribades fins a la parada, que a la T1 són uns minuts amb un carretó. Suma l’espera, que és curta en hora punta i pot arribar a quinze minuts a la tarda-nit. I després suma el tram des de la plaça de Catalunya o Sants fins on t’allotges: amb el metro i les maletes, en un segon taxi o a peu per les llambordes del Gòtic.',
          'Un taxi d’El Prat al centre de Barcelona triga entre 25 i 35 minuts segons el trànsit i la zona de la ciutat on vagis, i t’acaba a l’adreça que has indicat. Per a l’Eixample o Sant Antoni, la diferència en el temps total de porta a porta és d’uns vint minuts. Per a un lloc a dalt de Gràcia, o un apartament amb entrada de carrer al Born, sovint s’acosta més als quaranta-cinc.',
          'La variació importa tant com la mitjana. L’autobús és fiable i el taxi és més ràpid; amb molt de trànsit convergeixen, perquè l’autobús és al mateix trànsit i fa més parades.',
        ],
      },
      {
        h2: 'El metro és més barat que tots dos, amb condicions',
        body: [
          'La línia 9 Sud serveix els dos terminals i és la manera més barata d’entrar a la ciutat, i amb diferència. És una opció realment bona i els visitants la fan servir poc.',
          'Les condicions, però, són reals. No va directament al centre: cal fer transbord, normalment a Collblanc o a Torrassa, a una altra línia, i les estacions de l’aeroport requereixen una tarifa específica d’aeroport en lloc d’un bitllet senzill normal. Les estacions tenen ascensors, però els transbords impliquen passadissos, i fer-los amb dues maletes grans i un nen cansat és una cosa que sona bé quan reserves i no ho sembla tant a les 23:00.',
          'Si viatges lleuger, t’allotges a prop d’un transbord de la línia 9 i no tens pressa, el metro és la resposta correcta i costa una fracció de tota la resta. Si qualsevol d’aquestes tres condicions no es compleix, deixa de ser la resposta correcta ben de pressa.',
        ],
      },
      {
        h2: 'L’equipatge és el factor decisiu de debò',
        body: [
          'Més que el preu i més que el temps, l’equipatge és el que realment decideix, i és el que la gent subestima quan reserva des de casa.',
          'Un taxi de Barcelona de quatre places —un Corolla, un SEAT Toledo— admet quatre passatgers i unes tres maletes. Quatre adults amb una maleta gran cadascun no hi caben, i la solució és un Vito de sis places, que admet sis passatgers i sis maletes, o una V-Class de set places. Saber-ho per avançat és la diferència entre un trasllat i un problema a la vorera.',
          'A l’Aerobús, l’equipatge va a la bodega sota l’autobús i hi ha un prestatge a prop de la porta, cosa que funciona bé. Al metro va allà on el puguis subjectar, que en hora punta és a sobre teu.',
          'La regla pràctica que s’aguanta: una bossa per persona i tens una elecció real entre els tres. Dues bosses per persona i el taxi és l’únic que és realment agradable, digui el que digui l’aritmètica.',
        ],
      },
      {
        h2: 'Quan el taxi guanya clarament',
        body: [
          'Arribant passada la mitjanit. L’Aerobús deixa de circular de matinada i el metro tanca, amb una xarxa limitada d’autobusos nocturns entremig que no és una proposta realista amb equipatge i sense parlar català.',
          'Viatjant amb nens, un cotxet o una cadira infantil. L’autobús és manejable amb un nen i incòmode amb dos, i a ningú no li agrada el transbord del metro amb un cotxet i una maleta.',
          'Agafant un vol matiner. Una recollida a les 04:30 per agafar una sortida a les 06:30 no té equivalent en transport públic, i un cotxe reservat a preu fix és l’única versió que et deixa dormir fins que sona el despertador.',
          'Allotjant-te en un lloc on l’últim tram és realment complicat: el Gòtic, on els vehicles no poden arribar a moltes adreces però s’hi poden acostar molt més que una parada d’autobús; Gràcia i Sarrià, pujada amunt des de qualsevol de les rutes d’autobús; qualsevol lloc on acabaries amb un segon taxi, que fa que l’opció «més barata» costi més.',
          'Grups de quatre o més. En aquest punt el preu per cotxe ja ha guanyat en diners, de manera que la comoditat és gratuïta.',
        ],
      },
      {
        h2: 'Quan no, i t’ho direm',
        body: [
          'Una o dues persones, equipatge lleuger, allotjades a prop de la plaça de Catalunya o en una línia de metro directa, arribant a mig dia. En aquesta situació l’Aerobús és l’opció assenyada, el metro és la barata, i un taxi de 50 € és pagar per una comoditat que no necessites especialment.',
          'Preferim escriure-ho que fer veure que el taxi sempre és la resposta. Un trasllat d’aeroport és un servei amb una forma concreta —preu fix, conductor assignat, de porta a porta, equipatge gestionat— i aquesta forma val alguna cosa per a una família de quatre a mitjanit i molt poc per a un viatger sol amb motxilla a les dues de la tarda.',
          'La mateixa lògica val per a la parada. Un taxi amb taxímetre de la parada una tarda tranquil·la entre setmana sovint sortirà per sota d’un preu fix reservat, perquè el preu fix inclou assumir un risc de trànsit que aquell dia no s’ha materialitzat. Així funcionen els preus fixos, en tots dos sentits.',
        ],
      },
      {
        h2: 'El buit de la nit del qual ningú no parla',
        body: [
          'Hi ha una franja, més o menys des de l’últim Aerobús fins al primer metro del matí, en què les opcions de transport públic es redueixen a un autobús nocturn i la parada passa a ser l’opció per defecte. En una nit normal, la parada de la T1 està ben supervisada i avança de pressa.',
          'On es torça és quan un vol retardat aterra en aquesta franja alhora que dos altres vols retardats. La cua de la parada és llavors de quaranta persones i l’oferta de taxis a les 02:00 és escassa, perquè els conductors no esperen en un terminal per si de cas. És l’únic escenari en què arribar amb un cotxe ja assignat val clarament més del que costa.',
          'Si el teu vol està previst que aterri passades les 23:30 aproximadament, val la pena decidir-ho abans de volar i no a la sala d’arribades.',
        ],
      },
      {
        h2: 'Tornar a l’aeroport és un problema diferent',
        body: [
          'Gairebé tothom planifica l’arribada i improvisa la sortida, i la sortida és la meitat més difícil.',
          'A l’arribada tens opcions perquè ets en un aeroport, que és l’únic lloc de la regió on hi ha taxis segur. A la sortida ets en un carrer de Gràcia a les 05:00 amb un vol a les 07:30, i tot allò que feia atractius l’autobús i el metro ha deixat de circular.',
          'L’Aerobús no serveix per a sortides matineres, i fer parar un taxi en un carrer residencial abans de l’alba és poc fiable d’una manera que no ho és a la Gran Via. Barcelona té molts taxis; el que no té són molts taxis a la teva cantonada a les cinc de la matinada.',
          'Per a una sortida de dia des d’una adreça cèntrica, les tres opcions funcionen a la inversa exactament igual que a l’arribada, i val la mateixa aritmètica. Per a qualsevol cosa abans de les 07:00 aproximadament, o des d’una adreça fora de la quadrícula principal, una recollida reservada és menys una comoditat que l’única versió que passa de manera fiable. El preu fix és el mateix en tots dos sentits: 50 € cap a la ciutat i 50 € des de la ciutat, en dia feiner, cotxe de quatre places.',
        ],
      },
      {
        h2: 'Com decidir-ho en deu segons',
        body: [
          'Compta les persones i compta les bosses. Una o dues persones amb una bossa cadascuna, arribant de dia, allotjades al centre: agafa l’Aerobús, o el metro si vigiles cada euro.',
          'Tres persones o més, o dues bosses o més per persona, o una arribada quan els autobusos ja no circulen, o una adreça a dalt d’un turó o al fons d’un carreró: agafa un taxi, i decideix per separat si vols la parada o un cotxe reservat per avançat.',
          'Parada o reservat es redueix a una pregunta: fins a quin punt t’afectaria una cua de quaranta minuts o una xifra final desconeguda en la teva vetllada? Si la resposta és «no gaire», la parada és just a la sortida d’arribades i costa menys. Si viatges amb gent que no ho suportaria, o contra rellotge, reserva.',
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: 'Terminals de l’aeroport de Barcelona: T1 i T2',
    description:
      'Quin terminal fa servir la teva aerolínia a El Prat, com funciona el servei de llançadora T1-T2, on són les parades de taxis i on et rep un conductor reservat.',
    h1: 'Terminals de l’aeroport de Barcelona: T1 i T2',
    excerpt:
      'Equivocar-te de terminal et costa un trajecte en llançadora i vint minuts, i en una sortida et pot costar el vol. Aquí tens quin és quin, on són realment els taxis a cadascun i l’única cosa que has de comprovar el dia abans de volar.',
    sections: [
      {
        h2: 'Dos terminals, a diversos quilòmetres un de l’altre',
        body: [
          'L’aeroport d’El Prat de Barcelona té dos terminals de passatgers, T1 i T2, i el més important que cal saber és que no es pot anar d’un a l’altre a peu. Són a costats oposats de les pistes, a uns quants quilòmetres de distància, units per un autobús llançadora gratuït.',
          'Això sorprèn la gent perquè en molts aeroports «terminal» vol dir una altra ala del mateix edifici. Aquí vol dir un altre edifici amb un trajecte en autobús pel mig, i el trajecte dura de 10 a 15 minuts sense comptar l’espera.',
          'La T1 és la més nova i molt més gran de les dues, inaugurada el 2009, i atén la major part del tràfic de llarg abast juntament amb la majoria de Vueling i de les aerolínies tradicionals. La T2 és el terminal original, més antic i de sostre més baix, dividit en tres blocs i que serveix diverses aerolínies de baix cost.',
          'Tots dos estan plenament equipats: facturació, control de seguretat, botigues, restauració, lloguer de cotxes, parades de taxis. Cap dels dos no és un racó apartat. L’únic càstig real per anar al terminal equivocat és el temps.',
        ],
      },
      {
        h2: 'Quines aerolínies fan servir cadascun',
        body: [
          'La T1 rep la major part del que arriba de fora d’Europa, a més de Vueling, que és l’aerolínia dominant de l’aeroport, i la majoria de les aerolínies de bandera tradicionals.',
          'La T2 serveix un conjunt d’aerolínies de baix cost, entre les quals Ryanair és de les més grans, juntament amb part del tràfic xàrter i de temporada.',
          'L’advertència útil: això no és estable. Les aerolínies canvien de terminal quan canvien els seus contractes, de vegades amb unes setmanes d’antelació, i els horaris de temporada ho remenen encara més. Una guia que t’indica amb seguretat quin terminal fa servir la teva aerolínia et diu quin terminal feia servir quan es va escriure la guia.',
          'Els codis compartits ho empitjoren. Si has reservat amb una aerolínia i vols a l’avió d’una altra, el terminal segueix l’operador, no el de la confirmació de la teva reserva. El terminal imprès a la targeta d’embarcament és el que compta, i és l’única font en què val la pena confiar.',
        ],
      },
      {
        h2: 'Anar de la T1 a la T2',
        body: [
          'L’autobús llançadora entre els terminals és gratuït, passa sovint i funciona tota la nit, encara que amb menys freqüència de matinada. Para a la sortida d’arribades de la T1 i a cada bloc de la T2.',
          'Compta 25 minuts de porta a porta en lloc dels 10 a 15 que dura el trajecte en si: esperaràs l’autobús, carregaràs l’equipatge i caminaràs a l’altre extrem. En moments de molta afluència, amb l’autobús ple i només lloc dret, triga més i és considerablement menys agradable amb maletes.',
          'La línia 9 Sud del metro també connecta els dos terminals, amb una estació a cadascun, cosa que de vegades és més ràpid que esperar l’autobús si ja ets sota terra. No és gratuïta i requereix la tarifa d’aeroport.',
          'Si fas una connexió entre un vol que arriba a la T2 i un vol que surt de la T1 amb bitllets separats, tracta el transbord com un tram real del viatge i dona-li una hora. Hi ha gent que perd vols així.',
        ],
      },
      {
        h2: 'La T2 són tres blocs, i el bloc importa',
        body: [
          'La T2 es divideix en els blocs A, B i C, disposats en línia al llarg de la façana de l’edifici. Estan units per dins, de manera que pots caminar d’un a l’altre, però el camí d’un extrem a l’altre són uns quants minuts.',
          'La teva aerolínia fa servir un bloc concret, i els taulells de facturació, el control de seguretat i la parada de taxis hi estan lligats. Que et deixin al bloc C quan necessites el bloc A no és cap desastre, però és una caminada amb equipatge que no havies previst.',
          'Quan reserves un trasllat amb recollida o destinació a la T2, val la pena indicar-ne el bloc. És la diferència entre un conductor que t’espera on surts i un conductor que és tres-cents metres més enllà de la façana.',
        ],
      },
      {
        h2: 'On són les parades de taxis',
        body: [
          'Tots dos terminals tenen parades de taxis oficials just a la sortida d’arribades, ben senyalitzades, supervisades i normalment concorregudes. A la T1 la parada és just davant de la sala d’arribades. A la T2 hi ha parades que serveixen cadascun dels blocs.',
          'Els taxis d’aquestes parades són taxis de Barcelona amb llicència, amb la lliurea estàndard negra i groga, tots amb el mateix taxímetre regulat. No hi ha negociació ni elecció: agafes el cotxe que és al davant. És el sistema funcionant tal com està dissenyat, i vol dir que no et poden cobrar de més respecte de la tarifa.',
          'Qualsevol trajecte que comenci a l’aeroport porta un suplement de 4,60 € i es factura com a mínim a la tarifa mínima de 21 €, tots dos part de la tarifa oficial i no res que hi hagi afegit el conductor.',
          'El que la parada no pot fer és dir-te el preu abans de sortir, ni garantir que hi haurà un cotxe quan aterris. Una tarda normal, tots dos van bé. Després d’un grup d’arribades tardanes amb retard, la cua ho és tot.',
        ],
      },
      {
        h2: 'On et rep un conductor reservat',
        body: [
          'Un trasllat reservat no fa servir la parada, i aquesta és la part que la gent més sovint entén malament en arribar.',
          'El teu conductor t’espera dins de la sala d’arribades, al costat públic de la sortida de la recollida d’equipatge, amb un cartell amb el teu nom. No és a la vorera ni a la cua de la parada. Surts de la recollida d’equipatge i és allà dret, que és tot el sentit de reservar.',
          'El punt de trobada exacte es confirma per correu electrònic abans de viatjar, perquè canvia segons el terminal i, a la T2, segons el bloc. Llegeix aquest correu a l’avió i no a la sala.',
          'El conductor segueix el número del teu vol, de manera que un retard mou la recollida en lloc de perdre-la. Aquesta és la diferència pràctica entre un cotxe reservat i una parada: una aterrada amb una hora de retard a la 01:00 vol dir un conductor que encara és allà, en lloc d’una parada que s’ha buidat.',
          'Si no us trobeu, el número de telèfon de la confirmació arriba directament al conductor, no a un centre d’atenció telefònica. Les sales d’arribades són grans i els cartells s’abaixen; una trucada ho soluciona.',
        ],
      },
      {
        h2: 'El terminal canvia la tarifa?',
        body: [
          'Gairebé gens, i en un trasllat reservat gens.',
          'La T1 és un parell de quilòmetres més lluny de la ciutat que la T2. En un trajecte de 15 quilòmetres fins al centre de Barcelona aquesta diferència és petita, i el suplement d’aeroport de 4,60 € és idèntic des de qualsevol dels dos terminals. Al taxímetre pots veure un euro o dos de diferència entre ells.',
          'Un preu fix reservat no distingeix entre ells en absolut: 50 € fins a la ciutat en un cotxe de quatre places des de la T1 o la T2, en dia feiner, amb el suplement ja inclòs a la xifra. El mateix val a la inversa per a les sortides.',
          'El que el terminal sí que canvia és el risc de la llançadora. Si et deixen a l’equivocat, el cost són 25 minuts i un autobús, que en una arribada és fastiguejant i en una sortida pot ser el vol.',
        ],
      },
      {
        h2: 'Sortides: on equivocar-se fa mal de debò',
        body: [
          'A l’arribada, el terminal equivocat et costa temps. A la sortida et pot costar el viatge, perquè descobreixes l’error en un taulell de facturació que no té el teu vol i amb una llançadora que triga 25 minuts que no tens.',
          'Digues el terminal quan reserves un trasllat de sortida, i comprova’l amb la targeta d’embarcament i no amb el record del vol d’anada. Les aerolínies fan servir sovint terminals diferents en cada sentit, i una tornada en un codi compartit pot ser fàcilment un terminal diferent de l’anada.',
          'Per a una sortida matinera, sortir de Barcelona per ser a El Prat per a un vol de les 06:30 vol dir una recollida cap a les 04:30 a la ciutat, abans si ets més lluny. Un cotxe reservat a preu fix és l’única versió d’això que no implica esperar en un carrer a l’alba amb l’esperança que passi alguna cosa.',
        ],
      },
      {
        h2: 'Quant trigaràs realment a sortir',
        body: [
          'El temps que importa per a una recollida no és quan aterra l’avió, sinó quan surts de la recollida d’equipatge, i la distància entre els dos és més gran del que la majoria de la gent preveu.',
          'En una arribada de Schengen amb només equipatge de mà, de deu a quinze minuts des que les rodes toquen terra fins a la sala d’arribades és realista. Des de fora de Schengen, amb control de passaports i una maleta facturada, una mitja hora és normal i una hora passa —sobretot a la T1 a mig matí, quan aterren diversos vols de llarg abast alhora i la cua del control és el coll d’ampolla i no la cinta.',
          'Per això un trasllat reservat va lligat al número del teu vol i no a una hora que has escrit. El conductor vigila l’aterratge real i té en compte la sala, cosa que elimina l’endevinalla que hauries de fer en reservar des de casa setmanes abans.',
          'També vol dir que no serveix de res allargar la teva pròpia estimació. Reservar una recollida una hora després de l’aterratge «per si de cas» no ajuda, perquè el seguiment ja ho resol, i et deixa esperant un cotxe que arriba tard deliberadament.',
          'L’única cosa que has de fer tu mateix: si surts de la recollida inusualment de pressa i el teu conductor encara no és en posició, el número de telèfon de la confirmació arriba directament a ell. Un cotxe a vuit minuts és un resultat normal d’una sortida ràpida, no un problema.',
        ],
      },
      {
        h2: 'Comprova-ho el dia abans',
        body: [
          'Un hàbit elimina gairebé tot això: la vigília del vol, obre la targeta d’embarcament i llegeix el terminal. No la confirmació de la reserva, no la guia que vas llegir al març, no la pàgina general de rutes de l’aerolínia: la targeta d’embarcament del vol que agafaràs.',
          'Si no coincideix amb el que ens vas dir, respon al correu de confirmació i ho canviarem. Canviar un terminal en una reserva no costa res i es fa en un minut. Descobrir-ho a les 05:00 costa la llançadora, l’estrès i de vegades el vol.',
        ],
      },
    ],
  },
};
