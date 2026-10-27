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
      'Reserva un taxi de l’aeroport de Barcelona al centre. Preu fix tot inclòs, amb el suplement del Prat ja dins i conductor esperant a arribades.',
    h1: 'Taxi de l\'aeroport de Barcelona al centre',
    intro:
      'Un taxi des del Prat fins al centre de Barcelona triga entre 25 i 35 minuts segons el trànsit i la terminal on aterris. Reservar amb antelació vol dir que ja hi ha un conductor assignat quan arribes, amb un cartell amb el teu nom a la sala d\'arribades, en comptes de fer cua a la parada de la T1 o la T2.',
    sections: [
      {
        h2: 'Quant costa un trasllat de l\'aeroport de Barcelona',
        body: 'El preu el fixem nosaltres: no és una lectura del taxímetre ni una estimació, i tots els suplements oficials de la ruta ja són dins de la xifra. A la pràctica, un trajecte de l’aeroport a qualsevol punt de Barcelona són 50 EUR fixos en taxi estàndard, sigui quina sigui la distància i l’hora; els caps de setmana i festius hi afegeixen un 7,5 %. Introdueix la teva destinació exacta a dalt per veure el teu preu.',
      },
      {
        h2: 'On t\'espera el conductor a arribades',
        body: 'El teu conductor espera dins de la sala d\'arribades de la teva terminal amb un cartell amb el teu nom i segueix el número de vol, de manera que un retard no et deixa sense cotxe. El punt de trobada exacte per a la T1 i la T2 va inclòs al correu de confirmació.',
      },
      {
        h2: 'Terminal 1 i Terminal 2',
        body: 'Totes dues terminals tenen parada oficial de taxis i els nostres conductors atenen les dues. La T1 concentra els vols de llarg radi i bona part de Vueling; la T2 serveix moltes companyies de baix cost. La diferència de preu entre elles és petita, un parell de quilòmetres, tot i que la T1 queda una mica més lluny de la ciutat.',
      },
      {
        h2: "Fins on arriba els 50 EUR",
        body: "Un sol preu cobreix qualsevol adreça a menys de 16 km de la terminal, mesurats en línia recta i no per carretera. Això inclou tot el centre i gairebé tots els llocs on s’allotja un visitant —Ciutat Vella, l’Eixample, Gràcia, Sants, el front marítim fins a la Barceloneta i el Poblenou, i el Park Güell, a dalt de Gràcia, a 14,3 km— tot al mateix preu que un hotel del Passeig de Gràcia. Mesurar en línia recta juga al teu favor, perquè la carretera cap a la ciutat és força més llarga que la línia directa: ha de vorejar el Llobregat i entrar per la Gran Via, de manera que una zona traçada seguint la ruta deixaria el centre fora. Els districtes exteriors del nord i de l’est són on s’acaba la zona: la Sagrera a 16,4 km, el Fòrum a 17,4, Sant Andreu a 17,7 i Nou Barris a 17,9 queden més enllà, igual que Sant Cugat a 19,4 i Badalona a 21,8, i tots paguen el preu de la llista més 1,50 EUR per cada quilòmetre addicional.",
      },
      {
        h2: "Taxi, Aerobús o metro cap a la ciutat",
        body: "L’Aerobús cobra per persona i un taxi cobra per cotxe, i això ja resol bona part de la qüestió. Si viatges sol amb equipatge de mà, l’autobús surt més a compte i amb diferència; amb tres passatgers la distància s’ha escurçat, i amb quatre normalment ha desaparegut. La línia 9 Sud del metro és més barata que totes dues, però exigeix un transbord, cosa que està bé amb una maleta per cap i bastant pitjor amb dues. La regla honesta: compta les persones i compta les maletes. Una o dues de cadascuna i de dia, agafa l’autobús. Tres persones o més, o dues maletes per cap, o una arribada quan els autobusos ja no circulen: agafa un taxi.",
      },
    ],
  },

  'city-to-airport': {
    title: 'Taxi de Barcelona a l\'Aeroport | Reserva Online',
    description:
      'Reserva un taxi des de Barcelona a l’aeroport del Prat. Hora de recollida fixada, preu fix tot inclòs i conductors que coneixen les portes.',
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
        body: 'La primera onada de sortides del Prat s\'enlaira abans de les 07:00, cosa que implica recollides des de les 04:30. Una recollida a les 04:30 costa el mateix que el mateix trajecte al migdia, perquè l\'hora no mou un preu fix, i confirmem el conductor la tarda anterior perquè no quedi res per resoldre a les quatre del matí.',
      },
      {
        h2: "Comprova la terminal a la targeta d’embarcament, no a la reserva",
        body: "La T1 i la T2 no es poden recórrer a peu d’una a l’altra. Són a costats oposats de les pistes, unides per una llançadora gratuïta que triga de 10 a 15 minuts sense comptar l’espera: calcula 25 minuts de porta a porta. En una sortida això importa molt més que en una arribada: que et deixin a la terminal equivocada vol dir descobrir-ho en un taulell de facturació que no té el teu vol. Les companyies canvien de terminal quan canvien els contractes, i un vol en codi compartit depèn de la companyia que l’opera i no de la que surt a la teva confirmació, així que l’única font fiable és la terminal impresa a la targeta d’embarcament. Si no coincideix amb el que ens has dit, respon a la confirmació i ho canviem sense cap cost.",
      },
      {
        h2: "Si els teus plans canvien abans de la recollida",
        body: "Pots modificar les dades tu mateix durant els primers 30 minuts després de reservar, i a partir d’aleshores fins que el conductor surti: respon a la confirmació o escriu-nos per WhatsApp. Canviar l’hora de recollida, la terminal o l’adreça no costa res, i una terminal equivocada és la correcció més habitual. Si el viatge s’anul·la del tot, cancel·la amb un mínim de 24 hores d’antelació i l’import sencer es retorna a la targeta amb què has pagat, normalment en un termini de cinc a deu dies hàbils. Dins d’aquestes 24 hores intentarem ajudar-te igualment, però el reemborsament ja no és automàtic.",
      },
      {
        h2: "Triar vehicle quan portes molt d’equipatge",
        body: "Compta les maletes abans d’escollir. Un taxi de quatre places admet unes tres maletes grans, la Vito de sis places en admet sis i la V-Class de set places en admet set. Una sortida amb molt d’equipatge és l’únic cas en què val la pena pagar de més, de 20 a 25 EUR, per un vehicle més gran, perquè l’alternativa és arribar a la terminal amb una maleta damunt dels genolls.",
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aeroport del Prat | Trasllats amb Llicència',
    description:
      'Taxis amb llicència cap a i des de l’aeroport de Barcelona-el Prat (BCN). Reserva en línia a preu fix i conductor assignat al teu vol.',
    h1: 'Taxi aeroport del Prat',
    intro:
      'L\'aeroport Josep Tarradellas Barcelona-el Prat, que gairebé tothom continua anomenant simplement el Prat, és a uns 15 km al sud-oest de la ciutat. És el segon aeroport amb més trànsit de l\'Estat i el taxi és la manera més ràpida d\'arribar a Barcelona a gairebé qualsevol hora, sempre que hi hagi un cotxe esperant.',
    sections: [
      {
        h2: 'Reservar un taxi a l\'aeroport de Barcelona o anar a la parada',
        body: 'La parada oficial del Prat està ben organitzada i sol avançar de pressa. Es col·lapsa en moments previsibles: les onades d\'arribades de mig matí, els diumenges a la tarda i quan aterren diversos vols de llarg radi alhora. Reservar amb antelació elimina aquest risc del tot i fixa el teu conductor per endavant, al mateix preu fix.',
      },
      {
        h2: 'El suplement d\'aeroport del Prat',
        body: 'El suplement oficial d’aeroport i qualsevol altre càrrec que correspongui a la ruta són dins del preu fix que et donem. No hi ha taxímetre en marxa ni una segona xifra al final, així que no hi ha sorpreses.',
      },
      {
        h2: 'Passatgers de creuer',
        body: 'Per a qui enllaça amb un creuer, el trajecte entre el Prat i la terminal de creuers del Moll Adossat té el seu propi preu fix, indicat a part del preu de ciutat. Introdueix la terminal de creuers com a destinació i el preu canvia automàticament a aquest.',
      },
      {
        h2: "Quin vehicle necessites segons l’equipatge",
        body: "Tria segons les maletes, no segons el nombre de persones. Un taxi de quatre places porta quatre passatgers però només unes tres maletes grans: el maleter d’un Corolla o d’un SEAT Toledo és el límit real, i és el que més sovint es calcula malament quan es reserva des de casa. Quatre adults amb una maleta de mida gran cadascun necessiten la Mercedes Vito de sis places, que porta sis passatgers i sis maletes; per sobre, la V-Class de set places en porta set de cada. Qualsevol cosa fora de mida —una bicicleta, uns esquís, una taula de surf— cal posar-la a les notes de la reserva en lloc de confiar que un cotxe més gran bastarà, perquè de vegades la resposta és un vehicle concret i no simplement un de més espaiós.",
      },
      {
        h2: "Recollida a la Terminal 1 i a la Terminal 2",
        body: "Un trasllat reservat no fa servir la parada. El teu conductor t’espera dins de la sala d’arribades, a la part pública de la sortida de recollida d’equipatge, amb un cartell amb el teu nom: no a la vorera ni a la cua. La T2 es divideix en els blocs A, B i C al llarg de la façana, així que indicar el teu bloc en reservar fa la diferència entre un conductor just on surts i un a tres-cents metres per la façana. El conductor segueix el número del teu vol, de manera que un aterratge amb retard mou la recollida en lloc de perdre-la, i el telèfon de la confirmació et connecta directament amb ell i no amb una oficina.",
      },
      {
        h2: "Arribades tardanes i vols endarrerits",
        body: "Una recollida reservada segueix el teu vol, no l’horari. Si aterres hores tard, el conductor continua allà, no hi ha cap càrrec d’espera per un aterratge amb retard i no cal renegociar res quan arribes. Si el vol se cancel·la del tot, avisa’ns i es retorna l’import sencer.",
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Preu Taxi Aeroport Barcelona | Preus Fixos 2026',
    description:
      'El que costa un taxi a l’aeroport de Barcelona: els preus fixos per vehicle, fins on arriba el preu pla i què hi afegeixen cap de setmana i fora de zona',
    h1: 'Preu del taxi a l\'aeroport de Barcelona',
    intro:
      'Un trasllat a l’aeroport de Barcelona amb nosaltres és un preu fix, acordat abans de reservar i bloquejat quan reserves. Sense taxímetre, sense haver d’endevinar la distància i sense res a liquidar al cotxe. Aquí tens la llista sencera i les tres coses que hi poden afegir.',
    sections: [
      {
        h2: 'Com es calcula la tarifa del teu taxi a l\'aeroport',
        body: 'Un trasllat és un preu fix, definit per ruta i vehicle, no per distància ni per hora. De l’aeroport a qualsevol punt de Barcelona és una xifra; de l’aeroport a la terminal de creuers, una altra; i el taxi estàndard, el minivan de sis places i la van de set tenen cadascun la seva. Només tres coses hi poden afegir: una destinació més enllà de la zona plana, un trasllat al port de creuers i la tarifa de cap de setmana i festius. Cadascuna apareix com una línia pròpia abans de pagar.',
      },
      {
        h2: 'Hi ha algun taxi barat des de l\'aeroport de Barcelona?',
        body: 'Compara pel que el preu et protegeix, no només per la xifra. Un preu fix no es mou un cop acordat: el trànsit, un desviament, un aterratge amb retard i l’hora del dia són el nostre problema, no el teu, i al cotxe no es cobra res. El que sí que pots controlar és el vehicle i viatjar fora del cap de setmana. Desconfia d’un preu inusualment baix: sol indicar un vehicle sense llicència, o una xifra que creixerà abans que arribis.',
      },
      {
        h2: 'Fins on arriba el preu fix',
        body: 'El preu de ciutat cobreix tot el que estigui en un radi de 16 km des de la terminal, és a dir, tota Barcelona i els municipis immediats: un trajecte curt al Prat poble i una carrera al Park Güell costen el mateix. Més enllà d’aquest radi el preu fix continua valent i només s’hi afegeixen els quilòmetres que sobresurten, a un preu publicat.',
      },
      {
        h2: 'Què hi afegim a sobre',
        body: 'Pagues un únic preu amb tot inclòs en reservar en línia. Cobreix el trajecte, tots els suplements oficials que corresponguin a la teva ruta i el nostre servei de reservar i garantir el cotxe. No hi ha cap segon import: al taxi no es deu res en absolut i rebràs per correu un rebut de l’import complet.',
      },
      {
        h2: "Què no canvia mai el teu preu",
        body: "No l’hora del dia: una recollida a les 04:30 per a una sortida de matinada costa exactament el mateix que una a les dues de la tarda, perquè un preu fix no té tarifa nocturna. Tampoc el trànsit, la ruta que triï el conductor, la terminal on aterris, el nombre de passatgers dins de la capacitat del vehicle ni la quantitat d’equipatge que hi càpiga. Els caps de setmana i els festius són l’única cosa que puja un preu de la llista, i ho fan amb un percentatge publicat i no amb un recàrrec que varia segons la demanda. Tota la resta és risc nostre i no teu, que és precisament el que s’obté fixant un preu per endavant.",
      },
      {
        h2: "Com i quan es paga",
        body: "Tot l’import es paga en línia, amb targeta o Bizum, quan reserves, i amb la confirmació t’enviem per correu un rebut de l’import complet. Al cotxe no es cobra res, de manera que no cal buscar efectiu ni esperar que el datàfon funcioni a la vorera.",
      },
    ],
  },

  'hotel-transfers': {
    title: 'Trasllat Hotel Barcelona a l\'Aeroport | Porta a Porta',
    description:
      'Reserva un taxi des del teu hotel de Barcelona a l’aeroport del Prat, o a la porta del teu hotel. Porta a porta, amb llicència, a preu fix.',
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
      {
        h2: "Hotels en carrers on no arriba el cotxe",
        body: "Hi ha parts de Barcelona on no es pot arribar en cotxe fins a la porta. Bona part del Barri Gòtic, els carrerons del Born i els carrers estrets per sobre de Gràcia són de vianants o massa estrets perquè un taxi hi esperi, i una adreça d’hotel en un d’aquests llocs vol dir un punt de trobada a poca distància a peu i no a recepció. Digue’ns el nom de l’hotel en reservar i fixarem aquest punt i l’escriurem a la confirmació, en lloc de deixar el conductor donant voltes per un illa restringida mentre tu esperes a dins. Per a una sortida des d’una d’aquestes adreces, calcula cinc minuts més dels que indica el temps de trajecte.",
      },
      {
        h2: "Fer el check-out i on va l’equipatge",
        body: "Les sortides d’hotel s’amunteguen: la majoria de check-outs cauen entre les 10:00 i les 12:00, que és també quan el trànsit de la ciutat és menys previsible. Si el teu vol és a primera hora de la tarda, reserva la recollida a l’inici d’aquesta franja i no al final. Si has fet el check-out però la recollida és més tard, la majoria d’hotels guarden l’equipatge, i convé demanar-ho a recepció la nit anterior i no el mateix matí. L’ajuda amb les maletes per carregar-les i descarregar-les del maleter va inclosa en el preu i mai es cobra, igual que una espera raonable mentre acabes de pagar el compte.",
      },
      {
        h2: "Factures per a una estada de feina",
        body: "El rebut de l’import complet t’arriba amb el correu de confirmació, que sol ser el que demana un sistema de despeses i fa que no hagis de perseguir papers a la recepció de l’hotel en marxar. Si necessites una factura amb IVA amb les dades de l’empresa, envia-les’ns per correu i la emetrem amb el número de la reserva. Si l’estada inclou diversos trasllats, demana-ho i els facturarem junts en lloc d’un per un.",
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Taxi Estació de Sants a l\'Aeroport de Barcelona',
    description:
      'Reserva un taxi des de l\'estació de Sants a l\'aeroport del Prat. Uns 15 minuts, preu fix tot inclòs amb el suplement d\'estació inclòs.',
    h1: 'Taxi de l\'estació de Sants a l\'aeroport de Barcelona',
    intro:
      'Sants és la principal estació de tren de Barcelona i el punt d\'arribada dels AVE des de Madrid, València i Sevilla. També és el gran node de transport més proper al Prat: el trajecte en taxi ronda els 15 minuts fora d\'hora punta.',
    sections: [
      {
        h2: 'El suplement de l\'estació de Sants',
        body: 'Els trajectes que comencen o acaben a l\'estació de Sants porten un petit suplement fix establert per l\'AMB. Juntament amb el suplement d\'aeroport, tots dos són ja dins del preu que veus abans de reservar: no hi has d\'afegir res després.',
      },
      {
        h2: 'On trobar el teu conductor a Sants',
        body: 'La parada oficial de taxis és al costat de la plaça dels Països Catalans. Per a un trasllat reservat acordem un punt de trobada concret en fer la reserva, cosa que a Sants val la pena: és una estació gran amb diverses sortides.',
      },
      {
        h2: 'Enllaços amb l\'AVE',
        body: 'Si enllaces des d\'un AVE, reserva la recollida uns 15 minuts després de l\'hora prevista d\'arribada per tenir marge des de l\'andana fins al carrer amb equipatge.',
      },
      {
        h2: "Tren o taxi de Sants al Prat",
        body: "Hi ha un tren de Rodalies de Sants a l’aeroport, i per a una persona que viatja lleugera és la manera més barata d’arribar-hi, amb molta diferència. Les condicions són importants: serveix directament la T2, de manera que per a la T1 cal la llançadora a l’altre extrem, i té una freqüència còmoda si tens una hora de marge i incòmoda si no. Un taxi és per cotxe i no per persona, acaba a la porta de la teva terminal i s’emporta l’equipatge. Per a dues persones amb maletes, o per a qui enllaça amb un AVE endarrerit i té un vol a punt de sortir, sol ser la millor compra; i per a un viatger sol amb motxilla i temps de sobra, sincerament no ho és.",
      },
      {
        h2: "Tenir en compte una connexió que va tard",
        body: "Un tren de llarga distància que arriba tard és el motiu més habitual pel qual un trasllat des de Sants surt malament, i és l’únic que no podem seguir com seguim un vol. Si la connexió és justa, reserva la recollida a partir de l’hora d’arribada prevista i no de l’hora d’andana que esperes, i escriu-nos per WhatsApp tan bon punt sàpigues que el tren va amb retard: es pot moure una recollida mentre el conductor encara és de camí. Sants té diverses sortides a carrers diferents, per això el punt de trobada de la teva confirmació indica una porta concreta i no l’estació, que és un edifici amb quatre.",
      },
      {
        h2: "A quina terminal et deixem",
        body: "Digue’ns la teva companyia i et deixem a la porta de la terminal correcta. Des de Sants importa més que des d’un hotel, perquè l’alternativa en tren serveix la T2 i una sortida per la T1 vol dir la llançadora entre terminals a l’altre extrem: 25 minuts de porta a porta un cop has esperat. Un taxi elimina aquest tram del tot. La T1 és una única sala gran de sortides; la T2 són els blocs A, B i C al llarg de la façana, i el bloc equivocat és una caminada llarga amb maletes.",
      },
    ],
  },

  'private-transfer': {
    title: 'Trasllat Privat Aeroport Barcelona | Taxi Exclusiu',
    description:
      'Un trasllat privat des de l\'aeroport de Barcelona: taxi amb llicència només per a tu, sense compartir ni esperar altres passatgers, amb preu fix.',
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
        body: 'Tria un taxi estàndard per a fins a quatre passatgers, una Mercedes Vito per a sis o una V-Class per a set amb equipatge equivalent. Cadascun té el seu propi preu fix de trasllat, visible abans de reservar, així que tria per capacitat i comoditat.',
      },
      {
        h2: 'Viatges d\'empresa i factures',
        body: 'Per a viatges de feina podem assignar la V-Class premium. T\'enviem per correu el rebut de l\'import complet amb la confirmació; si a més vols la factura oficial del taxi del trajecte, el teu conductor te la pot donar dins del cotxe.',
      },
      {
        h2: "Què vol dir “privat” aquí",
        body: "El cotxe és teu durant tot el trajecte. No es recull ningú més, no es comparteix amb un altre grup que va al mateix lloc i no s’espera a la terminal que s’ompli un vehicle: les tres coses que fan més barat un trasllat d’aeroport més econòmic. És un taxi de Barcelona amb llicència i amb un conductor assignat a la teva reserva per endavant, que va del teu punt de recollida a la teva destinació i enlloc més. Val la pena pagar-ho en una arribada tardana amb criatures i bastant menys una tarda tranquil·la entre setmana viatjant sol, i preferim dir-ho abans que suggerir que cada trajecte ho necessita.",
      },
      {
        h2: "Grups massa grans per a un sol cotxe",
        body: "A partir de set passatgers cal més d’un vehicle, i es poden reservar junts i no per separat. Tria diversos cotxes en una sola reserva i queden reservats com un sol grup, es paguen en un sol pagament i van al mateix punt de recollida, fins a sis cotxes. Cadascun es cobra al preu publicat per a la seva mida, així que un grup de deu són dos cotxes al preu de la llista i no un pressupost a mida; i tot el grup s’assigna alhora, cosa que importa més que l’aritmètica quan deu persones esperen a la sala d’arribades a mitjanit.",
      },
      {
        h2: "Cadiretes infantils i qualsevol cosa fora del normal",
        body: "Les cadiretes infantils no van instal·lades de sèrie, així que, si en necessites una, indica-ho a les notes de la reserva i s’assigna el cotxe adequat en lloc del més proper. El mateix val per a qualsevol cosa que canviï el vehicle que ha de venir: una cadira de rodes plegada, una bicicleta, uns esquís, un instrument o una mascota. Si ho avises, no és cap problema; si no, tot són problemes a la vorera, i aquest és tot l’argument per mencionar-ho en reservar.",
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24 Hores Aeroport Barcelona | Trasllats Nocturns',
    description:
      'Servei de taxi 24 hores a l\'aeroport de Barcelona. Reserva aterratges nocturns i sortides de matinada per endavant, a preu fix i tot inclòs.',
    h1: 'Taxi 24 hores a l\'aeroport de Barcelona',
    intro:
      'El Prat funciona les vint-i-quatre hores, i el servei de taxi també. Les hores que de debò convé reservar són les incòmodes: aterratges passada la mitjanit i sortides que exigeixen recollida abans de l\'alba.',
    sections: [
      {
        h2: 'Taxi a l\'aeroport de Barcelona les 24 hores',
        body: 'Una recollida de nit costa el mateix que el mateix trajecte al migdia: l’hora no mou un preu fix. Els caps de setmana i festius sí: dissabtes i diumenges, Nadal, Cap d’Any i el calendari català hi afegeixen un 7,5 %, que apareix com una línia pròpia abans de pagar i no es descobreix després. Tres nits porten a més un suplement regulat: la nit de Nadal, la de Cap d’Any i la revetlla de Sant Joan, el 23 de juny.',
      },
      {
        h2: 'Arribades de matinada',
        body: 'Si el teu vol aterra a la una de la matinada, la parada del Prat continua operativa, però la cobertura es redueix a mesura que avança la nit. Un cotxe reservat amb el teu número de vol associat és la diferència entre sortir directament i quedar-te esperant.',
      },
      {
        h2: 'Sortides abans de l\'alba',
        body: 'Les recollides des de les 04:00 són rutina per a nosaltres. Reserva com a molt tard la tarda anterior i et confirmem el conductor per correu, perquè a aquella hora no quedi res per organitzar.',
      },
      {
        h2: "L’hora del dia no canvia el preu",
        body: "Una recollida a les 03:00 costa el mateix que el mateix trajecte a les tres de la tarda. És prou inusual com perquè valgui la pena dir-ho clarament: un preu fix no té tarifa nocturna, així que no hi ha cap franja que travessis a les 20:00 ni cap recàrrec que aparegui al final d’un trajecte fet a una hora incòmoda. Els caps de setmana i els festius hi afegeixen un percentatge publicat i res més el mou. Tres nits de l’any porten un suplement regulat addicional —la nit de Nadal, la de Cap d’Any i la nit de Sant Joan, el 23 de juny— i aquestes nits un preu reservat amb el suplement ja inclòs val més que de costum.",
      },
      {
        h2: "El forat després que s’acabin els autobusos",
        body: "Entre l’últim Aerobús i el primer metro del matí, les opcions públiques es redueixen a una xarxa prima d’autobusos nocturns, i la parada passa a ser el recurs per defecte. Una nit normal la parada de la T1 està ben supervisada i avança de pressa. Es complica quan tres vols endarrerits aterren a la vegada dins d’aquesta franja: la cua és llavors de quaranta persones i l’oferta de taxis a les 02:00 és escassa, perquè els conductors no esperen a la terminal per si de cas. És l’escenari en què arribar amb un cotxe ja assignat val clarament més del que costa, i convé decidir-ho abans de volar i no a la sala d’arribades.",
      },
      {
        h2: "Reservar una recollida enmig de la nit",
        body: "Una recollida a les 03:00 o a les 04:30 es confirma igual que qualsevol altra, i confirmem el conductor assignat la tarda anterior perquè no hi hagi incertesa a l’hora del dia en què és pitjor. Dona’ns un número de mòbil que estigui encès i, per a una recollida a l’aeroport, el número de vol: una arribada de nit és la que més probablement aterra tard, i seguir-la és el que manté el cotxe allà.",
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Taxi Barri Gòtic a l\'Aeroport de Barcelona',
    description:
      'Reserva un taxi des del Barri Gòtic a l’aeroport de Barcelona. Acordem abans un punt de recollida accessible per a un cotxe.',
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
      {
        h2: "L’equipatge sobre els empedrats",
        body: "El camí des del vehicle fins a una adreça del Gòtic gairebé sempre és sobre llambordes, i sovint amb un tram d’escales a l’altre extrem. És una caminada curta i incòmoda amb dues maletes grans, que és el que més val la pena preveure aquí. Quan l’adreça ho permet, fixem el punt de trobada al carrer més proper on un cotxe pot parar legalment i no al punt més proper del mapa, perquè al Barri Gòtic no són el mateix. L’ajuda amb les maletes cap al cotxe i des del cotxe va inclosa; les escales dins de l’edifici no les pot resoldre cap trasllat.",
      },
      {
        h2: "Sortir del barri per a un vol a primera hora",
        body: "En una sortida de matinada el barri és tranquil, els carrers són buits i el trajecte fins al Prat és el més ràpid: de 20 a 25 minuts i no els 30 a 35 que triga a les nou del matí. El que no és fàcil a les 04:30 és trobar un taxi. Fer-ne parar un en un carreró de vianants abans de l’alba no funciona, i la parada més propera és una caminada amb maletes. És el cas més clar de tot el lloc per reservar en lloc d’improvisar, i el preu és el mateix que el mateix trajecte al migdia.",
      },
      {
        h2: "Si el teu carrer està tancat als cotxes",
        body: "Hi ha parts del Barri Gòtic de vianants o restringides als vehicles de residents en certes hores, de manera que el conductor no sempre pot aturar-se a l’adreça mateixa. Digue’ns el carrer i la plaça més propera on pots arribar a peu amb l’equipatge, i el punt de trobada es fixa al carrer més proper on un taxi pot esperar legalment i s’escriu a la confirmació. En una sortida, calcula cinc minuts més per a la caminada.",
      },
    ],
  },

  'neighborhoods/eixample': {
    title: 'Taxi Eixample a l\'Aeroport de Barcelona | Porta a Porta',
    description:
      'Reserva un taxi des de l\'Eixample a l\'aeroport de Barcelona-el Prat. Recollida senzilla porta a porta a la quadrícula, amb preu fix.',
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
      {
        h2: "A quina cantonada de la illa esperar",
        body: "La quadrícula de l’Eixample fa fàcil la recollida i ambigu el punt de trobada: una sola illa té quatre cantonades, cadascuna en un carrer diferent, i un número de carrer pot ser a cent metres del encreuament on espera el conductor. Dona l’adreça completa en reservar i no l’encreuament, i el conductor vindrà a la porta. Quan el xamfrà és l’únic lloc on es pot parar legalment —als encreuaments més transitats d’Aragó, Balmes i la Gran Via sovint ho és— la confirmació indica quin.",
      },
      {
        h2: "El trànsit de sortida de l’Eixample, segons l’hora",
        body: "El trajecte al Prat des de l’Eixample és de 25 a 35 minuts durant la major part del dia i notablement pitjor dues vegades: els matins entre setmana entre les 08:00 i les 09:30, quan la Gran Via i la Ronda porten trànsit de pendulars en tots dos sentits, i els divendres a la tarda a partir de les 17:00 aproximadament. Des de la zona de la Sagrada Família, afegeix de cinc a deu minuts; des de les illes properes a la plaça d’Espanya, resta’n aproximadament el mateix. Un preu fix absorbeix tot això —la xifra no es mou amb el trànsit—, però l’hora de sortida encara ha de tenir-ho en compte.",
      },
      {
        h2: "Arribar de l’aeroport a l’Eixample",
        body: "Des del Prat, el conductor pren la més ràpida de les vies d’accés principals aquell dia, i el preu no depèn de quina sigui. El que canvia els últims centenars de metres és la quadrícula de sentit únic: una recollida o una baixada a l’altre costat d’una illa pot voler dir fer-ne la volta, així que indicar el número del carrer i no l’encreuament més proper estalvia uns minuts i una caminada curta amb maletes.",
      },
      {
        h2: "Apartaments amb porta al carrer",
        body: "Moltes adreces de l’Eixample són apartaments i no hotels: una porta al carrer amb porter automàtic, sense recepció i sovint sense ningú que et guardi les maletes. Posa les instruccions d’entrada o un telèfon de contacte de l’amfitrió a les notes de la reserva, i el conductor podrà trucar en arribar en lloc d’esperar fora.",
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Centre de Barcelona a l\'Aeroport',
    description:
      'Reserva un taxi des del centre de Barcelona a l’aeroport del Prat. Recollida a qualsevol adreça cèntrica, a un preu fix acordat abans.',
    h1: 'Taxi del centre de Barcelona a l\'aeroport',
    intro:
      'Des de qualsevol punt cèntric —la Rambla, la plaça de Catalunya, el Born, el Raval o el Passeig de Gràcia— el Prat queda a entre 20 i 35 minuts en cotxe. Reservar amb antelació fixa l\'hora de recollida i el vehicle, cosa que importa sobretot en el trajecte d\'anada.',
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
        body: 'Un preu fix des de qualsevol punt del centre fins al Prat, amb tots els suplements oficials ja dins i sense res a pagar al taxi. L’hora no el canvia; els caps de setmana i festius hi afegeixen un 7,5 %. Introdueix la teva adreça per veure el preu exacte abans de decidir.',
      },
      {
        h2: "Què compta com a centre per al preu fix",
        body: "Tot, i molt més enllà. El preu de la llista cobreix qualsevol adreça a menys de 16 km de la terminal mesurats en línia recta, així que la distinció entre el Barri Gòtic, l’Eixample, Gràcia, Sants, la Barceloneta i el Park Güell, a 14,3 km, no existeix pel que fa al preu: són una sola xifra. La zona s’acaba als districtes exteriors del nord i de l’est: Sant Andreu, Nou Barris, la Sagrera i el Fòrum són a més de 16 km i hi afegeixen el preu per quilòmetre. El que varia dins del centre és el temps de trajecte i si un cotxe pot arribar a la porta, per això l’adreça importa encara que el preu no.",
      },
      {
        h2: "On pot parar realment un cotxe",
        body: "El centre conté els dos casos incòmodes d’aquest lloc: carrers de vianants del tot i carrers prou estrets perquè parar-hi els bloquegi. En tots dos, el punt de trobada és el carrer més proper on un taxi pot esperar legalment, indicat a la teva confirmació i no deixat perquè ho esbrinis el mateix dia. En una arribada això vol dir un conductor en un lloc conegut amb un cartell; en una sortida, una caminada curta amb les maletes i cinc minuts més dels que suggereix només el temps de trajecte.",
      },
      {
        h2: "Arribar al centre de nit",
        body: "Passades les 23:30, el centre és la part de la ciutat on és més fàcil entrar en cotxe i més difícil travessar a peu amb equipatge: el metro tanca, els carrers al voltant de la Rambla van tan plens que alenteixen un cotxe, i els últims cent metres sobre llambordes es fan a les fosques. Un cotxe reservat acaba al punt més proper a la teva porta i no en una parada, i el conductor té l’adreça abans que aterris. El preu és la mateixa xifra que el mateix trajecte al migdia.",
      },
    ],
  },

  'group-taxi': {
    title: "Taxi de Grup Aeroport Barcelona | 5, 6 o 7 Places",
    description:
      "Taxi per a grups des de l’aeroport de Barcelona: una furgoneta de sis o set places, o diversos cotxes reservats junts en un sol pagament. Preu fix tot inclòs.",
    h1: "Taxi de grup des de l’aeroport de Barcelona",
    intro:
      "Un taxi estàndard de Barcelona té quatre places. Per a cinc, sis o set persones hi ha una Mercedes Vito de sis places i una Mercedes V-Class de set places, i per a un grup més gran es reserven dos o més cotxes junts. A Barcelona no existeix cap taxi de nou places, i preferim dir-ho que deixar que ho descobreixis a la vorera.",
    sections: [
      {
        h2: "Quanta gent i quantes maletes hi caben",
        body: "El límit honest és el maleter, no els seients. Un taxi estàndard de quatre places porta quatre passatgers i unes tres maletes grans; alguns models en porten quatre. La Mercedes Vito de sis places porta sis passatgers i sis maletes, i la Mercedes V-Class de set places en porta set de cada. Si viatges amb alguna cosa fora de mida —uns esquís, una bicicleta, un cotxet, un instrument— posa-ho a les notes de la reserva perquè s’assigni el vehicle adequat i no el més proper.",
      },
      {
        h2: "Cinc, sis o set persones: un sol vehicle",
        body: "Fins a set persones viatgen juntes en un sol vehicle, a un preu fix tot inclòs. El taxi de quatre places són 50 EUR entre l’aeroport i qualsevol punt de Barcelona, la Vito de sis places són 70 EUR i la V-Class de set places són 75 EUR. Els caps de setmana i els festius hi afegeixen un 7,5 %. Aquest és tot el preu: el suplement d’aeroport, el del vehicle més gran i el nostre servei ja hi són inclosos, i no es deu res al conductor.",
      },
      {
        h2: "Vuit, nou o deu persones: reserva dos cotxes junts",
        body: "A partir de set no hi ha cap taxi únic, així que la solució són dos o més vehicles que viatgen com un sol grup. Tria diversos cotxes en una sola reserva i queden reservats junts, es paguen en un sol pagament i van al mateix punt de recollida, fins a sis cotxes. Cadascun es cobra al preu publicat per a la seva mida, de manera que no hi ha pressupost a mida ni sorpreses: vuit persones poden viatjar en dos taxis de quatre places per 100 EUR un dia laborable, nou en una Vito de sis places i un taxi de quatre places per 120 EUR (70 EUR més 50 EUR), i onze en una V-Class de set places i un taxi de quatre places per 125 EUR.",
      },
      {
        h2: "Un sol pagament, un sol punt de recollida, tots els cotxes junts",
        body: "Els cotxes d’una reserva de grup s’assignen alhora i reps per correu el nom i el número de cada conductor. Esperen a la sala d’arribades de la teva terminal amb un cartell amb el teu nom i segueixen el mateix número de vol, de manera que un aterratge amb retard mou tot el grup en lloc de dividir-lo. Aquesta és la diferència pràctica amb fer cua a la parada amb vuit persones i esperar que els taxis vagin apareixent d’un en un o de dos en dos.",
      },
      {
        h2: "Grups de creuer, famílies i casaments",
        body: "La mateixa lògica val per a la terminal de creuers del Moll Adossat, on els preus fixos són 60 EUR, 80 EUR i 85 EUR per als vehicles de quatre, sis i set places, i per a una família amb avis i un munt d’equipatge. Per a un grup de casament o una delegació d’un congrés, digues-nos les hores d’arribada i el nombre de maletes en reservar i t’explicarem amb franquesa si dos cotxes són suficients o si tres és l’opció més segura.",
      },
    ],
  },

  'book-online': {
    title: 'Reservar Taxi Aeroport Barcelona Online | Preu a l\'Instant',
    description:
      'Reserva un taxi a l\'aeroport de Barcelona online en minuts. Preu fix tot inclòs a l\'instant, pagament segur i confirmació per correu de seguida.',
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
        body: 'Reps un correu de confirmació immediat amb la teva ruta, el vehicle, el preu que has pagat i el rebut corresponent. Després s\'assigna un conductor i t\'enviem les seves dades abans del viatge.',
      },
      {
        h2: 'Canvis i cancel·lacions',
        body: 'Els plans canvien. Cancel·la amb un mínim de 24 hores d\'antelació i et retornem l\'import íntegre. Per moure una reserva, respon al correu de confirmació i la reprogramem.',
      },
      {
        h2: "Què cal tenir a mà",
        body: "Una adreça completa i no un barri, el nombre de passatgers i quantes maletes porteu realment —això últim importa més del que la gent creu, perquè un cotxe de quatre places admet quatre passatgers però només unes tres maletes. Si arribes en avió, el número de vol: és opcional, però amb ell seguim l’aterratge real i movem la recollida automàticament, de manera que un retard no et costa res i no has d’endevinar una hora segura amb setmanes d’antelació. Un número de mòbil localitzable el dia del viatge completa el conjunt, perquè és com et troba el conductor si la sala d’arribades us supera a tots dos.",
      },
      {
        h2: "Per què el formulari demana tres hores d’antelació",
        body: "Les reserves en línia necessiten un mínim de tres hores abans de la recollida, i el motiu és un conductor i no un sistema: assignar de manera fiable un cotxe i una persona concrets a una hora concreta triga més que assignar-ne un en abstracte. Dins de les tres hores, la resposta honesta és escriure’ns per WhatsApp, on podem comprovar què hi ha realment disponible i confirmar un cotxe directament, o dir-te de seguida que no n’hi ha cap. És una experiència pitjor que el formulari i millor que una confirmació que no podem complir.",
      },
      {
        h2: "Com es paga i què en reps",
        body: "Tot l’import es paga en línia quan reserves, amb targeta de crèdit, targeta de dèbit o Bizum. No hi ha cap dipòsit amb saldo posterior i al conductor no se li deu res dins del cotxe: ni tarifa, ni suplement, ni cal deixar propina. Amb la confirmació t’enviem per correu un rebut de l’import complet, de manera que els papers per a una nota de despeses arriben abans del viatge i no després. Si a més necessites la factura regulada del taxi del trajecte, el conductor te la pot emetre si la hi demanes.",
      },
    ],
  },
};
