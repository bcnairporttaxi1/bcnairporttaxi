import type { LandingCopy } from '../landing-pages';

/**
 * Catalan long-form copy for the keyword landing pages.
 *
 * Catalan readers here are overwhelmingly local, so the tone is more direct
 * than the English and place names take their Catalan forms throughout
 * (Barri Gòtic, plaça de Catalunya, estació de Sants).
 */
export const CA_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Aeroport Barcelona al Centre | Reserva Online',
    description:
      'Reserva un taxi de l\'aeroport de Barcelona al centre. Tarifa oficial del taxímetre AMB, suplement del Prat inclòs a l\'estimació i conductor esperant a arribades.',
    h1: 'Taxi de l\'aeroport de Barcelona al centre',
    intro:
      'Un taxi des del Prat fins al centre de Barcelona triga entre 25 i 35 minuts segons el trànsit i la terminal on aterris. Reservar amb antelació vol dir que ja hi ha un conductor assignat quan arribes, amb un cartell amb el teu nom a la sala d\'arribades, en comptes de fer cua a la parada de la T1 o la T2.',
    sections: [
      {
        h2: 'Quant costa un trasllat de l\'aeroport de Barcelona',
        body: 'La tarifa la marca el taxímetre oficial de l\'AMB. Des del Prat pagues l\'import del taxímetre més el suplement fix d\'aeroport, i hi ha una tarifa mínima per als trajectes molt curts amb origen a l\'aeroport. A la pràctica, un trajecte de l\'aeroport al centre de Barcelona sol situar-se entre els trenta-i-escaig i els quaranta-i-pocs euros, més car de nit i els caps de setmana quan s\'aplica la tarifa T-2. Introdueix la teva destinació exacta aquí sobre per veure una estimació precisa.',
      },
      {
        h2: 'On t\'espera el conductor a arribades',
        body: 'El teu conductor espera dins de la sala d\'arribades de la teva terminal amb un cartell amb el teu nom i segueix el número de vol, de manera que un retard no et deixa sense cotxe. El punt de trobada exacte per a la T1 i la T2 va inclòs al correu de confirmació.',
      },
      {
        h2: 'Terminal 1 i Terminal 2',
        body: 'Totes dues terminals tenen parada oficial de taxis i els nostres conductors atenen les dues. La T1 concentra els vols de llarg radi i bona part de Vueling; la T2 serveix moltes companyies de baix cost. La diferència de preu entre elles és petita, un parell de quilòmetres, tot i que la T1 queda una mica més lluny de la ciutat.',
      },
    ],
  },

  'city-to-airport': {
    title: 'Taxi de Barcelona a l\'Aeroport | Reserva Online',
    description:
      'Reserva un taxi des de Barcelona ciutat a l\'aeroport del Prat. Hora de recollida fixada, tarifa oficial del taxímetre i conductors que coneixen les portes de cada terminal.',
    h1: 'Taxi de Barcelona a l\'aeroport',
    intro:
      'El trajecte d\'anada a l\'aeroport és el que realment convé reservar. Un taxi contractat prèviament arriba al teu hotel o apartament a una hora fixada, cosa que importa molt més quan has d\'agafar un vol que no pas quan estàs arribant.',
    sections: [
      {
        h2: 'Quan reservar el teu taxi de Barcelona a l\'aeroport',
        body: 'Per a un vol europeu de curt radi, calcula dues hores entre arribar al Prat i la sortida; per a llarg radi, tres. Afegeix entre 30 i 40 minuts de trajecte des del centre de Barcelona, i una mica més en hora punta entre setmana. El nostre formulari exigeix un mínim de tres hores d\'antelació, així que reserva com a molt tard la nit anterior.',
      },
      {
        h2: 'A quina terminal et deixem',
        body: 'Digues-nos la teva companyia aèria i et deixem a la porta correcta. Sortides de la T1 és una única sala gran; la T2 es divideix en els blocs A, B i C, i baixar al bloc equivocat significa una caminada llarga amb maletes.',
      },
      {
        h2: 'Vols de primera hora des del Prat',
        body: 'La primera onada de sortides del Prat s\'enlaira abans de les 07:00, cosa que implica recollides des de les 04:30. Aquests trajectes es facturen amb la tarifa nocturna T-2, i confirmem el conductor la tarda anterior perquè no quedi res per resoldre a les quatre del matí.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aeroport del Prat | Trasllats amb Llicència',
    description:
      'Taxis amb llicència cap a i des de l\'aeroport de Barcelona-el Prat (BCN). Reserva online amb estimació segons la tarifa oficial AMB i conductor assignat al teu vol.',
    h1: 'Taxi aeroport del Prat',
    intro:
      'L\'aeroport Josep Tarradellas Barcelona-el Prat, que gairebé tothom continua anomenant simplement el Prat, és a uns 15 km al sud-oest de la ciutat. És el segon aeroport amb més trànsit de l\'Estat i el taxi és la manera més ràpida d\'arribar a Barcelona a gairebé qualsevol hora, sempre que hi hagi un cotxe esperant.',
    sections: [
      {
        h2: 'Reservar un taxi a l\'aeroport de Barcelona o anar a la parada',
        body: 'La parada oficial del Prat està ben organitzada i sol avançar de pressa. Es col·lapsa en moments previsibles: les onades d\'arribades de mig matí, els diumenges a la tarda i quan aterren diversos vols de llarg radi alhora. Reservar amb antelació elimina aquest risc del tot i fixa el teu conductor per endavant, amb la mateixa tarifa de taxímetre.',
      },
      {
        h2: 'El suplement d\'aeroport del Prat',
        body: 'Tot trajecte en taxi que comenci o acabi al Prat porta un suplement fix d\'aeroport establert per l\'AMB, i els trajectes que surten de l\'aeroport tenen una tarifa mínima. Tots dos estan inclosos a l\'estimació que veus abans de reservar, així que el taxímetre no dona sorpreses.',
      },
      {
        h2: 'Passatgers de creuer',
        body: 'Per a qui enllaça amb un creuer, el trajecte entre el Prat i la terminal de creuers del Moll Adossat té el seu propi preu tancat fixat per l\'AMB, en lloc de funcionar amb taxímetre. Introdueix la terminal de creuers com a destinació i l\'estimació canvia automàticament a aquest preu fix.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Preu Taxi Aeroport Barcelona | Tarifes AMB 2026',
    description:
      'El que costa realment un taxi a l\'aeroport de Barcelona: la taula oficial de tarifes AMB, el suplement del Prat, la tarifa mínima d\'aeroport i com es calcula el teu preu amb tot inclòs.',
    h1: 'Preu del taxi a l\'aeroport de Barcelona',
    intro:
      'Els preus del taxi a Barcelona estan regulats. Cap taxi amb llicència pot cobrar més ni menys que el taxímetre oficial de l\'AMB, cosa que significa que la resposta honesta a "quant costa" és un càlcul, no una xifra comercial. Així funciona exactament aquest càlcul.',
    sections: [
      {
        h2: 'Com es calcula la tarifa del teu taxi a l\'aeroport',
        body: 'Cada trajecte comença amb una baixada de bandera fixa i després suma un preu per quilòmetre. Quin preu s\'aplica depèn de quan viatgis: la T-1 és la tarifa diürna de dilluns a divendres entre les 08:00 i les 20:00, i la T-2 és la tarifa més alta que cobreix nits, tot el dissabte i el diumenge, i els festius. Els suplements per aeroport, port de creuers, estació de Sants i Fira Gran Via se sumen a sobre, amb un màxim per servei.',
      },
      {
        h2: 'Hi ha algun taxi barat des de l\'aeroport de Barcelona?',
        body: 'No en el sentit que un operador pugui abaixar el preu respecte d\'un altre: el taxímetre de l\'AMB és idèntic a tots els taxis amb llicència, així que legalment ningú no pot ser més barat en la tarifa. El que sí que pots controlar és l\'horari i el vehicle. Viatjar dins la franja diürna T-1 costa força menys per quilòmetre que de nit o en cap de setmana, i per a un grup de quatre un sol cotxe surt millor que quatre bitllets solts. Desconfia de qui anunciï tarifes molt per sota del taxímetre; sol indicar un vehicle sense llicència.',
      },
      {
        h2: 'La tarifa mínima d\'aeroport',
        body: 'Els trajectes que comencen al Prat tenen una tarifa mínima. Si l\'import del taxímetre per a un trajecte curt queda per sota d\'aquest mínim, pagues el mínim. Això afecta sobretot els viatges al Prat poble o a hotels propers, no els trajectes cap a Barcelona.',
      },
      {
        h2: 'Què inclou el teu preu',
        body: 'Pagues un únic preu amb tot inclòs en reservar en línia. Cobreix el trajecte segons la tarifa oficial de l\'AMB, tots els suplements oficials que corresponguin a la teva ruta i el nostre servei de reservar i garantir el cotxe. No hi ha cap segon import: al taxi no es paga res.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Trasllat Hotel Barcelona a l\'Aeroport | Porta a Porta',
    description:
      'Reserva un taxi des del teu hotel de Barcelona a l\'aeroport del Prat, o de l\'aeroport a la porta del teu hotel. Porta a porta, amb llicència i tarifa oficial de taxímetre.',
    h1: 'Trasllats d\'hotel a l\'aeroport de Barcelona',
    intro:
      'La majoria de les nostres reserves són trasllats d\'hotel, en tots dos sentits. Un taxi porta a porta elimina la part del viatge que més es menysté: portar les maletes des del vestíbul de l\'hotel fins a una parada, o trobar l\'adreça correcta després d\'un vol llarg.',
    sections: [
      {
        h2: 'Taxi des de l\'hotel a l\'aeroport de Barcelona',
        body: 'Dona\'ns el nom de l\'hotel i ens encarreguem de la resta. Als carrers estrets del Barri Gòtic i el Born, on els cotxes no sempre arriben a l\'entrada, acordem amb tu per endavant el punt de recollida accessible més proper en lloc de deixar-ho a l\'atzar el mateix dia.',
      },
      {
        h2: 'Trasllat de l\'aeroport de Barcelona a l\'hotel',
        body: 'En sentit contrari, el teu conductor t\'espera dins d\'arribades amb un cartell amb el teu nom i et porta directament a l\'entrada de l\'hotel. Molt útil amb criatures, equipatge pesat o un aterratge de matinada.',
      },
      {
        h2: 'Apartaments i allotjaments turístics',
        body: 'El mateix val per a apartaments de lloguer temporal i adreces d\'Airbnb. Afegeix el codi de la porta o l\'entrada concreta a les notes de la reserva i el teu conductor ho tindrà abans de la recollida.',
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Taxi Estació de Sants a l\'Aeroport de Barcelona',
    description:
      'Reserva un taxi des de l\'estació de Sants a l\'aeroport del Prat. Uns 15 minuts, tarifa oficial de taxímetre amb el suplement d\'estació inclòs.',
    h1: 'Taxi de l\'estació de Sants a l\'aeroport de Barcelona',
    intro:
      'Sants és la principal estació de tren de Barcelona i el punt d\'arribada dels AVE des de Madrid, València i Sevilla. També és el gran node de transport més proper al Prat: el trajecte en taxi ronda els 15 minuts fora d\'hora punta.',
    sections: [
      {
        h2: 'El suplement de l\'estació de Sants',
        body: 'Els trajectes que comencen o acaben a l\'estació de Sants porten un petit suplement fix establert per l\'AMB, a més de la tarifa del taxímetre. Juntament amb el suplement d\'aeroport, tots dos van inclosos a l\'estimació que veus abans de reservar, i el total de suplements té un màxim per servei.',
      },
      {
        h2: 'On trobar el teu conductor a Sants',
        body: 'La parada oficial de taxis és al costat de la plaça dels Països Catalans. Per a un trasllat reservat acordem un punt de trobada concret en fer la reserva, cosa que a Sants val la pena: és una estació gran amb diverses sortides.',
      },
      {
        h2: 'Enllaços amb l\'AVE',
        body: 'Si enllaces des d\'un AVE, reserva la recollida uns 15 minuts després de l\'hora prevista d\'arribada per tenir marge des de l\'andana fins al carrer amb equipatge.',
      },
    ],
  },

  'private-transfer': {
    title: 'Trasllat Privat Aeroport Barcelona | Taxi Exclusiu',
    description:
      'Un trasllat privat des de l\'aeroport de Barcelona: taxi amb llicència només per a tu, sense compartir ni esperar altres passatgers, amb tarifa oficial de l\'AMB.',
    h1: 'Trasllat privat de l\'aeroport de Barcelona',
    intro:
      'Totes les reserves aquí són trasllats privats. El vehicle és només teu: sense llançadora compartida, sense desviaments per recollir altres passatgers i sense horari fix de sortida. Viatges directe des del teu punt de recollida fins a la teva destinació.',
    sections: [
      {
        h2: 'Per què reservar un taxi privat des de l\'aeroport de Barcelona',
        body: 'Les llançadores compartides surten més barates per persona, però recullen diversos grups i els deixen en cadena, cosa que pot afegir una hora a un trajecte de 30 minuts. A partir de dos viatgers la diferència de preu s\'estreny molt, i per a una família amb equipatge un taxi privat sol ser alhora més ràpid i més senzill.',
      },
      {
        h2: 'Triar vehicle',
        body: 'Tria un taxi estàndard per a fins a quatre passatgers, una Mercedes Vito per a sis o una V-Class per a set amb equipatge equivalent. La tarifa del taxímetre no canvia amb la mida del vehicle, perquè la fixa l\'AMB, així que tria per capacitat i comoditat.',
      },
      {
        h2: 'Viatges d\'empresa i factures',
        body: 'Per a viatges de feina podem assignar la V-Class premium. T\'enviem per correu el rebut de l\'import complet amb la confirmació; si a més necessites la factura oficial del taxímetre, demana-la al teu conductor dins del cotxe.',
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24 Hores Aeroport Barcelona | Trasllats Nocturns',
    description:
      'Servei de taxi 24 hores a l\'aeroport de Barcelona. Reserva aterratges nocturns i sortides de matinada amb la tarifa nocturna oficial de l\'AMB.',
    h1: 'Taxi 24 hores a l\'aeroport de Barcelona',
    intro:
      'El Prat funciona les vint-i-quatre hores, i el servei de taxi també. Les hores que de debò convé reservar són les incòmodes: aterratges passada la mitjanit i sortides que exigeixen recollida abans de l\'alba.',
    sections: [
      {
        h2: 'Taxi a l\'aeroport de Barcelona les 24 hores',
        body: 'Entre les 20:00 i les 08:00, tot el cap de setmana i en festius s\'aplica la tarifa més alta T-2. La fixa l\'AMB i regeix igual per a tots els taxis amb llicència de Barcelona: no és un recàrrec que hi afegim nosaltres. La teva estimació utilitza automàticament la tarifa correcta segons l\'hora real de recollida. Les nits de Nadal i de Cap d\'Any porten a més un suplement oficial.',
      },
      {
        h2: 'Arribades de matinada',
        body: 'Si el teu vol aterra a la una de la matinada, la parada del Prat continua operativa, però la cobertura es redueix a mesura que avança la nit. Un cotxe reservat amb el teu número de vol associat és la diferència entre sortir directament i quedar-te esperant.',
      },
      {
        h2: 'Sortides abans de l\'alba',
        body: 'Les recollides des de les 04:00 són rutina per a nosaltres. Reserva com a molt tard la tarda anterior i et confirmem el conductor per correu, perquè a aquella hora no quedi res per organitzar.',
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Taxi Barri Gòtic a l\'Aeroport de Barcelona',
    description:
      'Reserva un taxi des del Barri Gòtic a l\'aeroport de Barcelona. Acordem un punt de recollida accessible per endavant, perquè la majoria de carrers del Barri Gòtic són massa estrets.',
    h1: 'Taxi del Barri Gòtic a l\'aeroport de Barcelona',
    intro:
      'El Barri Gòtic és la zona de Barcelona on reservar amb antelació canvia de debò l\'experiència. Bona part del barri és de vianants o massa estret per a un cotxe, així que la pregunta no és quan arriba el teu taxi, sinó on pot arribar realment a recollir-te.',
    sections: [
      {
        h2: 'Punts de recollida que funcionen al Barri Gòtic',
        body: 'Acordem un punt accessible concret en reservar: normalment Via Laietana, la plaça de la Catedral, el Passeig de Colom o el costat de la Rambla, segons la teva adreça. El teu conductor espera allà i t\'ajuda amb l\'equipatge des de la cantonada, en lloc de fer voltes per carrers on no pot entrar.',
      },
      {
        h2: 'Temps de trajecte del Barri Gòtic al Prat',
        body: 'Del Barri Gòtic a l\'aeroport són uns 20 a 30 minuts fora d\'hora punta, per la Ronda Litoral. Calcula més temps els matins entre setmana i quan hi ha canvi de creuer al port.',
      },
      {
        h2: 'Arribar al barri des de l\'aeroport',
        body: 'Venint de l\'aeroport la limitació és la mateixa a la inversa. Dona\'ns l\'adreça exacta i et deixarem tan a prop com permetin els vehicles, indicant-te el breu passeig fins a la porta.',
      },
    ],
  },

  'neighborhoods/eixample': {
    title: 'Taxi Eixample a l\'Aeroport de Barcelona | Porta a Porta',
    description:
      'Reserva un taxi des de l\'Eixample a l\'aeroport de Barcelona-el Prat. Recollida senzilla porta a porta a la quadrícula, amb tarifa oficial de l\'AMB.',
    h1: 'Taxi de l\'Eixample a l\'aeroport de Barcelona',
    intro:
      'L\'Eixample és el districte més còmode de Barcelona per recollir un taxi. La quadrícula de Cerdà fa que gairebé qualsevol adreça sigui accessible en cotxe, amb espai per aturar-se i carregar l\'equipatge: just el contrari que el nucli antic.',
    sections: [
      {
        h2: 'Recollida porta a porta a la quadrícula de l\'Eixample',
        body: 'Dona\'ns el carrer i el número i el teu conductor serà a la porta. Els xamfrans de les illes de l\'Eixample són punts de càrrega còmodes i segurs si la teva adreça cau en un tram amb molt trànsit d\'Aragó o Balmes.',
      },
      {
        h2: 'Temps de trajecte de l\'Eixample al Prat',
        body: 'De l\'Eixample al Prat solen ser de 25 a 35 minuts. Des de la Dreta de l\'Eixample i la zona de la Sagrada Família, una mica més; des de les illes properes a Sants i la plaça d\'Espanya, una mica menys.',
      },
      {
        h2: 'Hotels del districte',
        body: 'L\'Eixample concentra bona part dels hotels de Barcelona, inclosos gairebé tots els del Passeig de Gràcia. Escriu el nom de l\'hotel en lloc de l\'adreça i el localitzem.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Centre de Barcelona a l\'Aeroport',
    description:
      'Reserva un taxi des del centre de Barcelona a l\'aeroport del Prat. Recollida a qualsevol adreça cèntrica, tarifa oficial de taxímetre i conductor confirmat per endavant.',
    h1: 'Taxi del centre de Barcelona a l\'aeroport',
    intro:
      'Des de qualsevol punt cèntric —la Rambla, la plaça de Catalunya, el Born, el Raval o el Passeig de Gràcia— el Prat queda a 20 o 35 minuts en cotxe. Reservar amb antelació fixa l\'hora de recollida i el vehicle, cosa que importa sobretot en el trajecte d\'anada.',
    sections: [
      {
        h2: 'Punts de recollida al centre',
        body: 'Els carrers cèntrics amples permeten recollida directa a la porta. Per a adreces dins de zones de vianants acordem la cantonada accessible més propera en reservar, de manera que no calgui improvisar el mateix dia.',
      },
      {
        h2: 'Trànsit i marges de temps',
        body: 'Els matins entre setmana de 08:00 a 09:30 i les tardes a partir de les 18:00 alenteixen notablement les rondes. La nostra estimació inclou un temps de trajecte realista, però per a un vol matiner reserva la recollida amb marge.',
      },
      {
        h2: 'Quant costa del centre a l\'aeroport',
        body: 'La tarifa del taxímetre des del centre fins al Prat, més el suplement fix d\'aeroport. Les nits i els caps de setmana s\'aplica la tarifa més alta T-2. Introdueix la teva adreça per a una estimació exacta abans de decidir.',
      },
    ],
  },

  'book-online': {
    title: 'Reservar Taxi Aeroport Barcelona Online | Preu a l\'Instant',
    description:
      'Reserva un taxi a l\'aeroport de Barcelona online en minuts. Estimació immediata amb tarifes oficials AMB, pagament segur i confirmació instantània per correu.',
    h1: 'Reservar un taxi a l\'aeroport de Barcelona online',
    intro:
      'Reservar en línia dura un parell de minuts i et deixa un cotxe confirmat amb conductor assignat. Pagues un únic preu amb tot inclòs i no deus res al taxi.',
    sections: [
      {
        h2: 'Què necessites per reservar un taxi a l\'aeroport de Barcelona',
        body: 'La teva adreça de recollida, la destinació, la data i l\'hora, i un telèfon de contacte. Per a recollides a l\'aeroport afegeix el número de vol perquè el teu conductor pugui seguir l\'aterratge. Les reserves requereixen un mínim de tres hores d\'antelació; per a alguna cosa abans, escriu-nos per WhatsApp.',
      },
      {
        h2: 'Què passa després de reservar',
        body: 'Reps un correu de confirmació immediat amb la teva ruta, el vehicle, l\'estimació de tarifa i el rebut del que has pagat online. Després s\'assigna un conductor i t\'enviem les seves dades abans del viatge.',
      },
      {
        h2: 'Canvis i cancel·lacions',
        body: 'Els plans canvien. Cancel·la amb un mínim de 24 hores d\'antelació i et retornem l\'import íntegre. Per moure una reserva, respon al correu de confirmació i la reprogramem.',
      },
    ],
  },
};
