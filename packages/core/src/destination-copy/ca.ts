import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "ca" locale. Filled in per destination slug and
 * group slug; anything missing falls back to the English original, which the
 * parity test in destination-copy.test.ts forbids for every page that has one.
 */
export const CA_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: "la Costa Brava",
      route: "Barcelona a la Costa Brava",
      blurb: "Trasllats porta a porta des del Prat fins als pobles de la Costa Brava, amb espai d'equipatge per a tota la família.",
      body: [
        "La Costa Brava comença més o menys una hora al nord de Barcelona i arriba fins a la frontera francesa, i gairebé tots els visitants hi arriben per l'aeroport del Prat. La carretera de la costa és senzilla, però és un viatge de debò i no un salt dins la ciutat: compta uns 80 minuts fins a Lloret de Mar i prop de dues hores fins a les cales del nord.",
        "Un trasllat privat és més important aquí que en un trajecte urbà. No hi ha tren directe a la majoria dels pobles de la costa, els autocars només aturen als més grans i l'últim tram fins a un hotel de muntanya o a una casa fora del poble rarament es pot fer a peu amb les maletes. El conductor et deixa a la porta.",
        "Et recollim a la sala d'arribades amb un cartell amb el teu nom i seguim el teu vol, de manera que un aterratge amb retard no et fa perdre el cotxe. Per a grups, el Mercedes Vito o la V-Class porten sis o set passatgers amb l'equipatge corresponent, cosa que normalment surt més a compte que dos cotxes i és molt més còmoda.",
        "Com que la Costa Brava queda fora de l'àrea metropolitana de Barcelona, el trajecte no es cobra pel taxímetre amb la tarifa de l'AMB. Et donem un preu fix per a la ruta abans que et comprometis, confirmat per escrit, de manera que a l'arribada no hi ha res a pagar més enllà del que has acordat.",
      ],
    },
    girona: {
      place: "Girona",
      route: "Barcelona a Girona",
      blurb: "Centre de la ciutat, aeroport de Girona o barri vell: un trajecte directe cap al nord, sense canvis.",
      body: [
        "Girona és a uns 100 km al nord de Barcelona i es triga una mica més d'una hora per carretera. És un trasllat habitual per tres motius ben diferents: la ciutat mateixa, l'aeroport que porta el seu nom i les escales de la catedral, que atrauen un degoteig constant de visitants.",
        "El tren és ràpid entre els dos centres urbans, però no serveix si surts del Prat amb maletes, si arribes tard o si vas a un lloc que no és l'estació. Un cotxe privat t'estalvia els transbordaments als dos extrems.",
        "L'aeroport de Girona és 15 minuts més enllà de la ciutat i rep bona part del trànsit xàrter de la Costa Brava. Si fas connexió entre el Prat i l'aeroport de Girona, digue'ns els dos números de vol i hi comptarem un marge prudent.",
        "Aquesta ruta queda fora de la zona de l'AMB amb taxímetre, així que et confirmem un preu fix per endavant. Els vehicles van des d'un taxi estàndard de quatre places fins a la V-Class de set places per a famílies i grups.",
      ],
    },
    'lloret-de-mar': {
      place: "Lloret de Mar",
      route: "Barcelona a Lloret de Mar",
      blurb: "El poble més concorregut de la Costa Brava, a uns 70 minuts del Prat.",
      body: [
        "Lloret de Mar és el destí turístic més conegut de la Costa Brava i un dels nostres trajectes llargs més freqüents. El viatge dura uns 70 minuts des del Prat fora de les èpoques de més trànsit.",
        "Els autocars arriben a Lloret en temporada, però van amb horari i paren en un punt cèntric, cosa que és incòmoda si el teu hotel és en un dels turons sobre la badia. Un trasllat privat acaba a l'entrada.",
        "Per a grups que arriben junts, un monovolum de sis o set places normalment surt millor que diversos cotxes i manté tothom al mateix horari.",
        "La ruta queda fora de la zona de l'AMB amb taxímetre, així que el preu és fix i s'acorda per endavant, sense passar pel taxímetre.",
      ],
    },
    'tossa-de-mar': {
      place: "Tossa de Mar",
      route: "Barcelona a Tossa de Mar",
      blurb: "Vila closa i platges més tranquil·les, a uns 80 minuts.",
      body: [
        "Tossa de Mar és la veïna més tranquil·la de Lloret, coneguda per la seva vila closa sobre la platja. És a uns 80 minuts de l'aeroport de Barcelona.",
        "L'última part del trajecte per la carretera de la costa és pintoresca però lenta, i amb transport públic cal fer almenys un transbordament. La majoria de clients troben que, després d'un vol, val la pena un cotxe directe.",
        "El nucli antic és en gran part per a vianants, així que acordem amb tu el punt de baixada accessible més proper en fer la reserva, en lloc d'improvisar a l'arribada.",
        "El preu és fix per a aquesta ruta i es confirma abans del viatge, ja que queda més enllà de la zona de l'AMB amb taxímetre.",
      ],
    },
    blanes: {
      place: "Blanes",
      route: "Barcelona a Blanes",
      blurb: "La porta sud de la Costa Brava, a una hora aproximadament.",
      body: [
        "Blanes marca l'extrem sud de la Costa Brava i és el més proper a Barcelona dels pobles principals, a una hora més o menys per carretera.",
        "Té estació de tren, cosa que la converteix en una de les poblacions de la Costa Brava més accessibles, però la connexió des de l'aeroport continua implicant transbordaments i una caminada final.",
        "Et recollim a la sala d'arribades o a qualsevol adreça de Barcelona i anem directes, cosa que va bé a famílies i a qui viatja amb equipament de platja.",
        "Com a la resta de la costa, la tarifa és un preu fix pressupostat i no una lectura del taxímetre.",
      ],
    },
    cadaques: {
      place: "Cadaqués",
      route: "Barcelona a Cadaqués",
      blurb: "L'extrem nord, passat el cap de Creus: unes dues hores i mitja.",
      body: [
        "Cadaqués és el més aïllat dels pobles de la Costa Brava, al qual s'arriba pel cap de Creus per una carretera de muntanya plena de revoltes. Compta unes dues hores i mitja des de Barcelona.",
        "No hi ha cap connexió ferroviària i el servei d'autobús és limitat i lent. Per a la majoria de visitants, un trasllat privat és l'única manera pràctica d'arribar a una hora raonable.",
        "La carretera del coll és estreta i convé que la condueixi algú que la conegui, sobretot de nit. Els nostres conductors fan aquesta ruta amb regularitat.",
        "Donada la distància, sempre és un trajecte a preu fix acordat per endavant. Demana'ns pressupost per WhatsApp amb les teves dates.",
      ],
    },
    roses: { place: "Roses", route: "Barcelona a Roses", blurb: "Població turística de la badia de Roses, a l'extrem nord de la Costa Brava." },
    empuriabrava: { place: "Empuriabrava", route: "Barcelona a Empuriabrava", blurb: "El poble dels canals al golf de Roses." },
    begur: { place: "Begur", route: "Barcelona a Begur", blurb: "Poble de muntanya i les cales que té als peus." },
    'calella-de-palafrugell': { place: "Calella de Palafrugell", route: "Barcelona a Calella de Palafrugell", blurb: "Poble de pescadors emblanquinat a la Costa Brava central." },
    sitges: {
      place: "Sitges",
      route: "Barcelona a Sitges",
      blurb: "El poble de costa més proper a Barcelona: uns 25 minuts del Prat.",
      body: [
        "Sitges és el més curt dels nostres trajectes llargs i el que es reserva més sovint. Des del Prat són uns 25 minuts; des del centre de Barcelona, prop de 40.",
        "La vila és un clàssic per a caps de setmana de platja, per a congressistes que s'allotgen fora de la ciutat i per al calendari de festivals. Té bon servei de tren des de Barcelona Sants, però no des de l'aeroport, per això la majoria d'arribades prefereixen un cotxe directe.",
        "El nucli antic té carrers estrets d'un sol sentit i accés restringit en alguns trams. Quan reserves, acordem un punt de baixada pràctic perquè no s'hagi de resoldre res a la porta.",
        "Sitges queda just fora de la zona de l'AMB amb taxímetre, així que el trajecte es pressuposta amb un preu fix i no amb el taxímetre. Pregunta'ns per WhatsApp i t'ho confirmem abans de viatjar.",
      ],
    },
    tarragona: {
      place: "Tarragona",
      route: "Barcelona a Tarragona",
      blurb: "Ciutat romana i port de creuers, a uns 75 minuts cap al sud.",
      body: [
        "Tarragona és a uns 100 km al sud de Barcelona, aproximadament 75 minuts per autopista. Atrau visitants pel seu amfiteatre romà i el centre històric, i cada cop més com a port de creuers.",
        "Els trasllats de creuer són la versió més urgent d'aquest trajecte. Si t'embarques, hi comptem un marge i confirmem la terminal, perquè perdre la sortida no té remei.",
        "La ciutat també és la porta d'entrada a les platges de la Costa Daurada, i molts clients combinen les dues coses: podem deixar-te en un hotel de la costa de camí.",
        "Aquesta ruta queda més enllà de la zona de l'AMB amb taxímetre, així que et pressupostem un preu fix per endavant, sense posar en marxa el taxímetre.",
      ],
    },
    salou: { place: "Salou", route: "Barcelona a Salou", blurb: "Població turística de la Costa Daurada al costat de PortAventura." },
    portaventura: { place: "PortAventura", route: "Barcelona a PortAventura", blurb: "Trasllat directe fins a les portes del parc temàtic." },
    cambrils: { place: "Cambrils", route: "Barcelona a Cambrils", blurb: "Poble més tranquil de la Costa Daurada, al sud de Salou." },
    peniscola: { place: "Peníscola", route: "Barcelona a Peníscola", blurb: "Poble amb castell a la Costa del Azahar." },
    reus: { place: "Reus", route: "Barcelona a Reus", blurb: "Aeroport i ciutat de Reus, a l'interior de Salou." },
    montserrat: {
      place: "Montserrat",
      route: "Barcelona a Montserrat",
      blurb: "El monestir de muntanya, a una hora de la ciutat.",
      body: [
        "Montserrat és l'excursió d'un dia més popular des de Barcelona: un monestir benedictí dins un massís de roca serrada a una hora cap a l'interior.",
        "Arribar-hi en transport públic vol dir un tren seguit del cremallera o del telefèric, cadascun amb la seva cua. Un cotxe va directament a l'aparcament del monestir, cosa que importa si vols ser-hi abans que arribin els autocars.",
        "La majoria de clients el reserven d'anada i tornada amb temps d'espera, normalment de tres a quatre hores al lloc, de manera que el mateix conductor els torna a portar. Digue'ns quant de temps vols i ho pressupostem com un sol trajecte.",
        "Montserrat queda fora de la zona amb taxímetre, així que l'excursió es pressuposta amb un preu fix que inclou l'espera, sense taxímetre.",
      ],
    },
    andorra: {
      place: "Andorra",
      route: "Barcelona a Andorra",
      blurb: "Tres hores fins als Pirineus, per esquiar o anar de compres.",
      body: [
        "Andorra és a unes tres hores de Barcelona, pujant de mica en mica cap als Pirineus. És un trajecte habitual a l'hivern per a les estacions d'esquí i durant tot l'any per les compres lliures d'impostos.",
        "La ruta creua una frontera internacional. Porta passaport o DNI de totes les persones que viatgeu: els controls solen ser ràpids, però existeixen, i que et facin tornar enrere és una manera molt cara d'aprendre-ho.",
        "A l'hivern, l'última pujada pot exigir cadenes o pneumàtics d'hivern. Assignem un vehicle preparat per a les condicions, en lloc d'enviar un cotxe de ciutat normal muntanya amunt al febrer.",
        "Per a grups d'esquí, la V-Class porta set persones amb equipatge, però els esquís i les taules s'han de declarar en reservar perquè assignem el vehicle adequat. És una ruta a preu fix, pressupostada abans del viatge.",
      ],
    },
    'la-molina': { place: "La Molina", route: "Barcelona a La Molina", blurb: "Estació d'esquí dels Pirineus, a unes dues hores." },
    'vall-de-nuria': { place: "Vall de Núria", route: "Barcelona a Vall de Núria", blurb: "Santuari de muntanya al qual s'arriba amb el cremallera." },
    'baqueira-beret': { place: "Baqueira Beret", route: "Barcelona a Baqueira Beret", blurb: "La zona d'esquí més gran dels Pirineus espanyols." },
    valencia: {
      place: "València",
      route: "Barcelona a València",
      blurb: "Tres hores i mitja costa avall, de porta a porta.",
      body: [
        "València és a uns 350 km al sud de Barcelona, aproximadament tres hores i mitja per autopista. És un trasllat llarg i, per a la majoria de viatgers, el tren AVE és l'opció sensata.",
        "Un cotxe privat té sentit en situacions concretes: un grup de sis o set persones en què els bitllets de tren individuals s'acumulen, una arribada massa tardana per a l'últim tren, equipatge o material que no viatja bé en tren, o la necessitat d'anar de porta a porta als dos extrems.",
        "El fem directe amb una parada per descansar, i et podem deixar a qualsevol adreça de la ciutat, al port si agafes un creuer o a l'aeroport de València.",
        "És sempre un trajecte a preu fix pressupostat per endavant. Escriu-nos amb les teves dates i el nombre de persones i t'ho confirmem.",
      ],
    },
    'la-roca-village': {
      place: "La Roca Village",
      route: "La Roca Village",
      blurb: "El poble d'outlets, a uns 40 minuts cap al nord.",
      body: [
        "La Roca Village és un outlet de marques de disseny a uns 40 minuts al nord de Barcelona i un dels destinis que no són l'aeroport que més ens demanen.",
        "L'autobús llançadora des de la ciutat funciona prou bé, però t'obliga a una hora de tornada fixa, que és la limitació equivocada en una sortida de compres. Un cotxe privat t'espera.",
        "La majoria de reserves són d'anada i tornada amb temps d'espera, habitualment de tres a cinc hores. Ho pressupostem com un sol trajecte que inclou l'espera, i a la tornada hi ha lloc per a les bosses.",
        "El poble queda fora de la zona de l'AMB amb taxímetre, així que el preu és fix i es confirma abans del viatge.",
      ],
    },
    alicante: { place: "Alacant", route: "Barcelona a Alacant", blurb: "Costa Blanca, a unes cinc hores cap al sud." },
    zaragoza: { place: "Saragossa", route: "Barcelona a Saragossa", blurb: "La capital d'Aragó, a unes tres hores cap a l'interior." },
    madrid: { place: "Madrid", route: "Barcelona a Madrid", blurb: "Trajecte de llarga distància fins a la capital." },
    marbella: { place: "Marbella", route: "Barcelona a Marbella", blurb: "Costa del Sol, un viatge d'un dia sencer." },
    malaga: { place: "Màlaga", route: "Barcelona a Màlaga", blurb: "Costa andalusa, trasllat de llarga distància." },
  },
  groups: {
    'costa-brava': {
      title: "Trasllats a la Costa Brava",
      intro: "Trasllats privats de Barcelona a Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués i la resta de la Costa Brava.",
    },
    'south-and-theme-parks': {
      title: "Sud de Barcelona i parcs temàtics",
      intro: "Trasllats en taxi i monovolum a Sitges, Tarragona, Salou, PortAventura, Cambrils i la costa al sud de la ciutat.",
    },
    'mountains-and-ski': {
      title: "Trasllats a la muntanya, la natura i l'esquí",
      intro: "Conductors privats per a Montserrat, Andorra, les estacions d'esquí i els pobles de muntanya, també per a excursions d'un dia flexibles.",
    },
    'long-distance': {
      title: "Trasllats de llarga distància",
      intro: "Trasllats directes en taxi privat i monovolum de Barcelona a les principals ciutats espanyoles.",
    },
  },
};
