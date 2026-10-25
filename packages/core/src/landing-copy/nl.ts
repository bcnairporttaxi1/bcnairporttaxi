import type { LandingCopy } from '../landing-pages';

/** Dutch long-form copy for the keyword landing pages. */
export const NL_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Luchthaven Barcelona Centrum | Online Boeken',
    description:
      'Boek een taxi van de luchthaven Barcelona naar het centrum. Vaste alles-inbegrepen prijs, El Prat-toeslag al inbegrepen, chauffeur in de aankomsthal.',
    h1: 'Taxi van de luchthaven Barcelona naar het centrum',
    intro:
      'Een taxi van El Prat naar het centrum van Barcelona duurt 25 tot 35 minuten, afhankelijk van het verkeer en de terminal waar u landt. Vooraf boeken betekent dat er bij de landing al een chauffeur klaarstaat met een naambordje in de aankomsthal, in plaats van aansluiten in de rij bij T1 of T2.',
    sections: [
      {
        h2: 'Wat een transfer vanaf de luchthaven kost',
        body: 'De prijs stellen wij vast: geen meterstand en geen schatting, en elke officiële toeslag die op de route van toepassing is zit er al in. In de praktijk kost een rit van de luchthaven naar elke plek in Barcelona een vaste 50 EUR in een standaardtaxi, ongeacht de afstand en ongeacht het tijdstip; in het weekend en op feestdagen komt er 7,5 % bij. Vul hierboven uw exacte bestemming in om uw prijs te zien.',
      },
      {
        h2: 'Waar uw chauffeur op u wacht',
        body: 'Uw chauffeur wacht in de aankomsthal van uw terminal met een naambordje en volgt uw vluchtnummer, zodat een vertraging u de auto niet kost. Het exacte ontmoetingspunt voor T1 en T2 staat in uw bevestigingsmail.',
      },
      {
        h2: 'Terminal 1 en Terminal 2',
        body: 'Beide terminals hebben een officiële taxistandplaats en onze chauffeurs bedienen ze allebei. T1 verwerkt het meeste langeafstandsverkeer en het grootste deel van Vueling; T2 bedient veel prijsvechters. Het prijsverschil is klein — een paar kilometer — al ligt T1 iets verder van de stad.',
      },
    ],
  },

  'city-to-airport': {
    title: 'Taxi Barcelona naar de Luchthaven | Online Boeken',
    description:
      'Boek een taxi van Barcelona stad naar luchthaven El Prat. Vaste ophaaltijd, vaste alles-inbegrepen prijs en chauffeurs die de terminaldeuren kennen.',
    h1: 'Taxi van Barcelona naar de luchthaven',
    intro:
      'Het is de heenrit die het echt waard is om te boeken. Een vooraf bestelde taxi staat op de afgesproken tijd voor uw hotel of appartement, en dat weegt veel zwaarder wanneer u een vlucht moet halen dan wanneer u aankomt.',
    sections: [
      {
        h2: 'Wanneer u uw ophaaltijd boekt',
        body: 'Reken voor een Europese korteafstandsvlucht twee uur tussen aankomst op El Prat en vertrek; voor langeafstand drie. Tel er 30 tot 40 minuten rijtijd vanuit het centrum bij op, en meer tijdens de spits doordeweeks. Ons formulier vraagt minimaal drie uur vooraf, dus boek uiterlijk de avond ervoor.',
      },
      {
        h2: 'Afzetten bij de juiste terminal',
        body: 'Geef uw luchtvaartmaatschappij door en we zetten u bij de juiste deur af. Vertrek T1 is één grote hal; T2 is verdeeld in blok A, B en C, en bij het verkeerde blok afgezet worden betekent een lange wandeling met bagage.',
      },
      {
        h2: 'Vroege vertrekken vanaf El Prat',
        body: 'De eerste vertrekgolf verlaat El Prat vóór 07:00 uur, wat ophaaltijden vanaf 04:30 uur betekent. Een rit om 04:30 kost hetzelfde als dezelfde rit om het middaguur, want het tijdstip verandert een vaste prijs niet, en wij bevestigen de chauffeur de avond ervoor zodat er om vier uur \'s nachts niets meer te regelen is.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Luchthaven El Prat | Vergunde Transfers',
    description:
      'Vergunde taxi’s van en naar luchthaven Barcelona-El Prat (BCN). Boek online tegen een vaste prijs, met een chauffeur voor uw vlucht.',
    h1: 'Taxi luchthaven El Prat',
    intro:
      'De luchthaven Josep Tarradellas Barcelona-El Prat, die vrijwel iedereen nog gewoon El Prat noemt, ligt ongeveer 15 km ten zuidwesten van de stad. Het is de op één na drukste luchthaven van Spanje, en de taxi is op vrijwel elk uur de snelste weg naar Barcelona — mits er een wagen klaarstaat.',
    sections: [
      {
        h2: 'Boeken in plaats van in de rij staan',
        body: 'De officiële standplaats op El Prat is goed geregeld en beweegt meestal vlot. Hij loopt vol op voorspelbare momenten: de aankomstgolven halverwege de ochtend, zondagavond en wanneer er meerdere langeafstandsvluchten tegelijk landen. Vooraf boeken haalt dat risico er volledig uit en zet uw chauffeur vast, voor dezelfde vaste prijs.',
      },
      {
        h2: 'De luchthaventoeslag',
        body: 'De officiële luchthaventoeslag en elke andere kost die bij de route hoort zitten in de vaste prijs die wij u geven. Er loopt geen meter tijdens uw rit en er is geen tweede bedrag aan het eind, dus er kan niets verrassen.',
      },
      {
        h2: 'Cruisepassagiers',
        body: 'Wie doorreist naar een cruise: het traject tussen El Prat en de cruiseterminal Moll Adossat kent een eigen officiële vaste prijs in plaats van de meter. Voer de cruiseterminal in als bestemming en de schatting schakelt automatisch over op die vaste prijs.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Taxiprijs Luchthaven Barcelona | AMB-tarieven 2026',
    description:
      'Wat een taxi naar de luchthaven van Barcelona echt kost: onze vaste prijzen per voertuig en wat het weekendtarief eraan toevoegt.',
    h1: 'Taxiprijs naar de luchthaven van Barcelona',
    intro:
      'Taxiprijzen in Barcelona zijn gereguleerd. Geen enkele vergunde taxi mag meer of minder rekenen dan de officiële AMB-taxameter, wat betekent dat het eerlijke antwoord op "wat kost het" een berekening is en geen verkooppraatje. Zo werkt die berekening precies.',
    sections: [
      {
        h2: 'Hoe uw tarief tot stand komt',
        body: 'Een transfer is één vaste prijs, bepaald door route en voertuig, niet door afstand of klok. Van de luchthaven naar elke plek in Barcelona is één bedrag, van de luchthaven naar de cruiseterminal een ander, en standaardtaxi, zespersoons minivan en zevenpersoons van hebben elk hun eigen bedrag. Slechts drie dingen kunnen erbij komen: een bestemming buiten de vaste zone, een transfer naar de cruisehaven, en het weekend- en feestdagtarief. Elk verschijnt vóór het betalen als een eigen regel.',
      },
      {
        h2: 'Bestaat er een goedkope taxi vanaf de luchthaven?',
        body: 'Vergelijk op waartegen de prijs u beschermt, niet alleen op het bedrag. Een vaste prijs beweegt niet meer zodra hij is afgesproken: het verkeer, een omleiding, een late landing en het tijdstip zijn ons probleem, niet het uwe, en in de auto wordt niets geïnd. Wat u wel kunt kiezen is het voertuig en reizen buiten het weekend. Wees op uw hoede bij een opvallend lage prijs: dat duidt meestal op een voertuig zonder vergunning, of op een bedrag dat nog groeit voordat u aankomt.',
      },
      {
        h2: 'Hoe ver de vaste prijs reikt',
        body: 'De stadsprijs dekt alles binnen een straal van 16 km van de terminal, dus heel Barcelona en de gemeenten er direct naast: een korte rit naar El Prat dorp en een tocht door de stad naar Park Güell kosten hetzelfde. Buiten die straal blijft de vaste prijs gelden en komen alleen de kilometers erbij die eruit steken, tegen een bekendgemaakt tarief.',
      },
      {
        h2: 'Wat uw prijs omvat',
        body: 'U betaalt bij het online boeken één all-in prijs. Die dekt de rit volgens het vaste prijs, elke officiële toeslag die op uw route van toepassing is, en onze service om de auto te reserveren en te garanderen. Er is geen tweede bedrag: in de taxi betaalt u niets.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcelona Luchthaven | Deur tot Deur',
    description:
      'Boek een taxi van uw hotel in Barcelona naar luchthaven El Prat, of tot aan uw hoteldeur. Deur tot deur, vergund, tegen een vaste prijs.',
    h1: 'Hotel-luchthaventransfers in Barcelona',
    intro:
      'De meeste van onze boekingen zijn hoteltransfers, in beide richtingen. Een deur-tot-deurtaxi haalt het deel van de reis weg dat het vaakst wordt onderschat: bagage van de lobby naar een standplaats sjouwen, of na een lange vlucht het juiste adres vinden.',
    sections: [
      {
        h2: 'Taxi van uw hotel naar de luchthaven',
        body: 'Geef ons de hotelnaam, wij regelen de rest. In de smalle straten van de Gotische Wijk en El Born, waar auto\'s niet altijd tot de ingang komen, spreken we vooraf het dichtstbijzijnde bereikbare ophaalpunt met u af in plaats van het op de dag zelf aan het toeval over te laten.',
      },
      {
        h2: 'Transfer van de luchthaven naar uw hotel',
        body: 'In de andere richting ontvangt uw chauffeur u in de aankomsthal met een naambordje en brengt u rechtstreeks naar de hotelingang. Waardevol met kinderen, zware bagage of een late landing.',
      },
      {
        h2: 'Appartementen en vakantieverhuur',
        body: 'Hetzelfde geldt voor kortlopende huurappartementen en Airbnb-adressen. Zet de deurcode of de precieze ingang in de opmerkingen bij de boeking, dan heeft uw chauffeur die vóór het ophalen.',
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Taxi Station Sants naar Luchthaven Barcelona',
    description:
      'Boek een taxi van station Barcelona-Sants naar luchthaven El Prat. Ongeveer 15 minuten, vaste alles-inbegrepen prijs inclusief stationstoeslag.',
    h1: 'Taxi van station Sants naar de luchthaven',
    intro:
      'Sants is het belangrijkste treinstation van Barcelona en het aankomstpunt van de AVE-treinen uit Madrid, Valencia en Sevilla. Het is ook het grote vervoersknooppunt dat het dichtst bij El Prat ligt: de taxirit duurt buiten de spits zo\'n 15 minuten.',
    sections: [
      {
        h2: 'De toeslag voor station Sants',
        body: 'Ritten die op station Sants beginnen of eindigen kennen naast de vaste prijs een kleine vaste toeslag van de AMB. Samen met de luchthaventoeslag zitten beide in de schatting die u vóór het boeken ziet, en het totaal aan toeslagen kent een maximum per rit.',
      },
      {
        h2: 'Waar u uw chauffeur treft',
        body: 'De officiële standplaats ligt aan de kant van plaça dels Països Catalans. Bij een geboekte transfer leggen we bij de reservering een precies ontmoetingspunt vast — in Sants zeker de moeite, want het is een groot station met meerdere uitgangen.',
      },
      {
        h2: 'Aansluiting vanaf de AVE',
        body: 'Komt u met de AVE aan, plan de ophaaltijd dan ongeveer 15 minuten na de geplande aankomst, zodat u met bagage van het perron naar de straat kunt.',
      },
    ],
  },

  'private-transfer': {
    title: 'Privétransfer Luchthaven Barcelona | Uw Eigen Taxi',
    description:
      'Een privétransfer vanaf de luchthaven van Barcelona: uw vergunde taxi alleen voor u, zonder delen of wachten op andere passagiers, tegen het vaste prijs.',
    h1: 'Privétransfer luchthaven Barcelona',
    intro:
      'Elke boeking hier is een privétransfer. Het voertuig is alleen van u: geen gedeelde shuttle, geen omwegen om andere passagiers op te halen, geen vast vertrekmoment. U rijdt rechtstreeks van uw ophaalpunt naar uw bestemming.',
    sections: [
      {
        h2: 'Privé of gedeelde shuttle',
        body: 'Gedeelde shuttles zijn per persoon goedkoper, maar halen meerdere gezelschappen op en zetten ze achter elkaar af, wat een rit van 30 minuten met een uur kan verlengen. Vanaf twee reizigers wordt het prijsverschil al klein, en voor een gezin met bagage is een privétaxi meestal zowel sneller als eenvoudiger.',
      },
      {
        h2: 'Voertuigkeuze',
        body: 'Standaardtaxi tot vier passagiers, Mercedes Vito voor zes, V-Class voor zeven met bijbehorende bagage. De vaste prijs verandert niet met de voertuiggrootte — dat stelt de AMB vast — dus kies op capaciteit en comfort.',
      },
      {
        h2: 'Zakenreizen',
        body: 'Voor zakelijke ritten kunnen we de V-Class inzetten. De bon voor het volledige bedrag ontvangt u per e-mail bij uw bevestiging; hebt u daarnaast de officiële taxameterfactuur nodig, vraag die dan in de auto aan uw chauffeur.',
      },
    ],
  },

  '24-hour-taxi': {
    title: '24-uurs Taxi Luchthaven Barcelona | Nachttransfers',
    description:
      'Taxiservice 24 uur per dag op de luchthaven van Barcelona. Boek nachtelijke landingen en vertrekken vóór zonsopgang tegen het officiële AMB-nachttarief.',
    h1: '24-uurs taxi op de luchthaven van Barcelona',
    intro:
      'El Prat draait vierentwintig uur per dag, en de taxiservice ook. De uren die het echt waard zijn om te boeken zijn de onhandige: landingen na middernacht en vertrekken die een ophaaltijd vóór zonsopgang vragen.',
    sections: [
      {
        h2: 'Het nachttarief',
        body: 'Een rit \'s nachts kost hetzelfde als dezelfde rit om het middaguur: het tijdstip verandert een vaste prijs niet. Weekenden en feestdagen wel: zaterdag en zondag, Kerst, Nieuwjaar en de Catalaanse kalender voegen 7,5 % toe, vóór het betalen als eigen regel vermeld in plaats van achteraf ontdekt.',
      },
      {
        h2: 'Late aankomsten',
        body: 'Landt uw vlucht om 01:00 uur, dan draait de standplaats op El Prat nog, maar de dekking dunt uit naarmate de nacht vordert. Een geboekte wagen met uw vluchtnummer eraan gekoppeld is het verschil tussen meteen naar buiten lopen en wachten.',
      },
      {
        h2: 'Vertrekken vóór zonsopgang',
        body: 'Ophalen vanaf 04:00 uur is voor ons routine. Boek uiterlijk de avond ervoor, dan bevestigen we de chauffeur per e-mail en valt er op dat tijdstip niets meer te regelen.',
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Taxi Gotische Wijk naar Luchthaven Barcelona',
    description:
      'Boek een taxi van de Gotische Wijk naar de luchthaven van Barcelona. We spreken vooraf een ophaalpunt af waar een auto bij kan komen.',
    h1: 'Taxi van de Gotische Wijk naar de luchthaven',
    intro:
      'Het Barri Gòtic is het deel van Barcelona waar vooraf boeken de ervaring echt verandert. Het grootste deel van de wijk is voetgangersgebied of te smal voor een auto, dus de vraag is niet wanneer uw taxi komt, maar waar hij u werkelijk kan bereiken.',
    sections: [
      {
        h2: 'Ophaalpunten die werken',
        body: 'We spreken bij de boeking een concreet bereikbaar punt af: meestal Via Laietana, plaça de la Catedral, Passeig de Colom of de Rambla-kant, afhankelijk van uw adres. Uw chauffeur wacht daar en helpt vanaf de hoek met de bagage, in plaats van rond te rijden in straten waar hij niet in mag.',
      },
      {
        h2: 'Reistijd naar El Prat',
        body: 'Van de Gotische Wijk naar de luchthaven is het buiten de spits ongeveer 20 tot 30 minuten via de Ronda Litoral. Reken op meer op doordeweekse ochtenden en bij een cruisewissel in de haven.',
      },
      {
        h2: 'Aankomen in de wijk',
        body: 'Vanaf de luchthaven geldt dezelfde beperking omgekeerd. Geef ons het exacte adres en we zetten u zo dicht mogelijk af als voertuigen mogen komen, met aanwijzing van het korte stukje lopen naar de deur.',
      },
    ],
  },

  'neighborhoods/eixample': {
    title: 'Taxi Eixample naar Luchthaven Barcelona',
    description:
      'Boek een taxi van de Eixample naar luchthaven Barcelona-El Prat. Eenvoudige deur-tot-deurophaling op het raster, tegen het vaste prijs.',
    h1: 'Taxi van de Eixample naar de luchthaven van Barcelona',
    intro:
      'De Eixample is de handigste wijk van Barcelona om een taxi op te halen. Het raster van Cerdà maakt vrijwel elk adres met de auto bereikbaar, met ruimte om te stoppen en bagage in te laden — precies het tegenovergestelde van de oude stad.',
    sections: [
      {
        h2: 'Deur-tot-deurophaling op het raster',
        body: 'Geef ons de straat en het huisnummer en uw chauffeur staat voor de deur. De afgeschuinde hoeken van de Eixample-blokken zijn handige en veilige laadpunten als uw adres op een druk stuk van Aragó of Balmes valt.',
      },
      {
        h2: 'Reistijd',
        body: 'Van de Eixample naar El Prat duurt doorgaans 25 tot 35 minuten. Vanuit de Dreta de l\'Eixample en de omgeving van de Sagrada Família iets meer; vanuit de blokken bij Sants en plaça d\'Espanya iets minder.',
      },
      {
        h2: 'Hotels in de wijk',
        body: 'In de Eixample ligt een groot deel van de hotels van Barcelona, waaronder vrijwel alle panden aan de Passeig de Gràcia. Typ de hotelnaam in plaats van het adres, dan vinden wij hem.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Centrum Barcelona naar de Luchthaven',
    description:
      'Boek een taxi van het centrum van Barcelona naar luchthaven El Prat. Ophalen op elk centraal adres, vaste alles-inbegrepen prijs en vooraf bevestigde chauffeur.',
    h1: 'Taxi van het centrum van Barcelona naar de luchthaven',
    intro:
      'Vanaf elk centraal punt — de Rambla, plaça de Catalunya, El Born, de Raval of de Passeig de Gràcia — is El Prat 20 tot 35 minuten rijden. Vooraf boeken legt de ophaaltijd en de wagen vast, wat vooral op de heenrit telt.',
    sections: [
      {
        h2: 'Ophaalpunten in het centrum',
        body: 'Brede centrale straten laten ophalen direct voor de deur toe. Voor adressen in voetgangersgebied spreken we bij de boeking de dichtstbijzijnde bereikbare hoek af, zodat er op de dag zelf niets geïmproviseerd hoeft te worden.',
      },
      {
        h2: 'Verkeer en marges',
        body: 'Doordeweeks tussen 08:00 en 09:30 uur en vanaf 18:00 uur lopen de ronda\'s merkbaar vast. Onze schatting bevat een realistische rijtijd, maar plan voor een vroege vlucht wat marge in de ophaaltijd.',
      },
      {
        h2: 'Wat de rit kost',
        body: 'Eén vaste prijs van elk punt in het centrum tot El Prat, met alle officiële toeslagen er al in en niets te betalen in de taxi. Het tijdstip verandert hem niet; weekenden en feestdagen voegen 7,5 % toe. Vul uw adres in om uw exacte prijs te zien voordat u beslist.',
      },
    ],
  },

  'book-online': {
    title: 'Taxi Luchthaven Barcelona Online Boeken | Direct Prijs',
    description:
      'Boek in enkele minuten een taxi naar de luchthaven van Barcelona. Direct een vaste prijs, veilig betalen en meteen een bevestiging.',
    h1: 'Een taxi naar de luchthaven van Barcelona online boeken',
    intro:
      'Online boeken kost twee minuten en levert u een bevestigde wagen met toegewezen chauffeur op. U betaalt online één all-in prijs en bent in de taxi niets verschuldigd.',
    sections: [
      {
        h2: 'Wat u nodig heeft om te boeken',
        body: 'Uw ophaaladres, de bestemming, datum en tijd en een telefoonnummer. Voeg bij ophalen op de luchthaven uw vluchtnummer toe, zodat uw chauffeur de landing kan volgen. Boekingen vragen minimaal drie uur vooraf; voor iets korters kunt u ons op WhatsApp schrijven.',
      },
      {
        h2: 'Wat er daarna gebeurt',
        body: 'U krijgt direct een bevestigingsmail met uw route, het voertuig, de tariefschatting en de bon van wat u online betaalde. Daarna wordt een chauffeur toegewezen en sturen we u zijn gegevens vóór de rit.',
      },
      {
        h2: 'Wijzigen en annuleren',
        body: 'Plannen veranderen. Annuleer minimaal 24 uur vóór het ophalen en u krijgt het volledige bedrag terug. Wilt u een boeking verzetten, beantwoord dan de bevestigingsmail.',
      },
    ],
  },
};
