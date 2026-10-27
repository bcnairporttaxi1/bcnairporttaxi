import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "nl" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const NL_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: "Hoeveel kost een taxi vanaf de luchthaven van Barcelona?",
    description:
      "Taxiprijzen vanaf de luchthaven van Barcelona: onze vaste prijzen naar de stad, hoe de taximeter bij de standplaats verschilt en wat de toeslagen kosten.",
    h1: "Hoeveel kost een taxi vanaf de luchthaven van Barcelona?",
    excerpt:
      "Een geboekte transfer van El Prat naar Barcelona kost € 50 voor een auto met vier zitplaatsen, vast en online betaald. De standplaats bij aankomst werkt anders, met een gereguleerde taximeter. Dit is wat elk van beide werkelijk kost, en waarom de twee bedragen niet gelijk zijn.",
    sections: [
      {
        h2: "Het korte antwoord",
        body: [
          "Een geboekte transfer tussen El Prat en een willekeurig adres in Barcelona kost € 50 in een auto met vier zitplaatsen, € 70 in een Mercedes Vito met zes zitplaatsen en € 75 in een V-Klasse met zeven zitplaatsen. Dat is de volledige prijs. U krijgt de prijs voor vertrek te zien, betaalt online bij het boeken en bent in de auto niets meer aan de chauffeur verschuldigd.",
          "De cruiseterminal bij Moll Adossat is een eigen route: € 60, € 80 en € 85 voor dezelfde drie voertuigmaten.",
          "Die bedragen veranderen niet met het uur van de dag. Een ophaaltijd van 04:30 voor een vroege vlucht kost hetzelfde als een om twee uur 's middags. Het enige dat ze verhoogt is een weekend of een feestdag: dat voegt 7,5% toe, zodat een transfer in een gewone auto op zaterdag € 53,75 kost in plaats van € 50.",
          "Neemt u in plaats daarvan een taxi bij de standplaats buiten de aankomsthal, dan koopt u helemaal geen vaste prijs, maar een rit op de meter, en het bedrag aan het eind hangt af van het verkeer, het uur en de route. De rest van deze pagina legt beide uit, want welke goedkoper is, hangt echt af van wanneer u reist.",
        ],
      },
      {
        h2: "Waarom één prijs in plaats van een meterstand",
        body: [
          "De taxitarieven in Barcelona worden vastgesteld door de Àrea Metropolitana de Barcelona, en elke erkende taxi in de stad rekent met dezelfde meter tegen dezelfde tarieven. Dat is een echte consumentenbescherming en daar hebben wij geen bezwaar tegen. Wat een gereguleerde meter niet doet, is u de prijs vooraf vertellen.",
          "Bij een rit van 15 kilometer naar de Eixample verschilt de meterstand ruwweg tien euro, afhankelijk van of u de Ronda de Dalt rijdend of stilstaand treft, en nog eens vijfentwintig procent, afhankelijk van of het dinsdag rond de lunch is of zaterdagavond. Beide bedragen kloppen. Geen van beide is te weten als u in de aankomsthal staat te beslissen wat u doet.",
          "Een vaste prijs legt die onzekerheid bij ons. Wij noemen € 50, wij rekenen met de chauffeur af naar wat de rit uiteindelijk kost, en het verschil is hoe dan ook voor onze rekening. Op een rustige dinsdag is dat voor u een slechtere deal dan de standplaats. In het vrijdagavondverkeer is het een betere. Wat het altijd is, is bekend.",
          "Het is ook de enige eerlijke manier om een transfer te verkopen aan iemand die nog niet in Barcelona is. Niemand die in maart vanuit Manchester boekt, kan de meterstand van een donderdagmiddag in juli voorspellen. Een offerte die eigenlijk een schatting is, kan dus onjuist zijn, en ze is altijd onjuist in de richting van een hoger bedrag.",
        ],
      },
      {
        h2: "De zone van 16 kilometer, en waarom die hemelsbreed wordt gemeten",
        body: [
          "De lijstprijs geldt voor elk adres binnen 16 kilometer van de terminal, in rechte lijn gemeten. Dat is het hele centrum en vrijwel alles waar een bezoeker verblijft: de Plaça de Catalunya op 12,3 km, de Barceloneta op 12,8, de Sagrada Família op 14,0, Park Güell op de heuvel achter Gràcia op 14,3 en Poblenou op 15,5 betalen allemaal dezelfde € 50 als een hotel aan de Passeig de Gràcia. Het is niet de hele gemeente, en het is goed te weten welk deel erbuiten valt: de buitenste noordelijke en oostelijke wijken liggen buiten de zone, met La Sagrera op 16,4 km, het Fòrum op 17,4, Sant Andreu op 17,7, Nou Barris op 17,9 en Torre Baró op 19,3, en voor die adressen geldt het onderstaande tarief voor extra kilometers.",
          "De meting in rechte lijn is bewust gekozen, en het loont om dat te begrijpen, want het werkt in uw voordeel. De Plaça de Catalunya ligt hemelsbreed 12,3 kilometer van de terminal en 19,6 kilometer over de weg, omdat de weg om de Llobregat heen moet en via de Gran Via de stad in gaat. Een zone van 16 kilometer langs de weg gemeten zou het hart van Barcelona er buiten laten vallen en extra kilometers rekenen op de meest voorkomende rit waarvoor de prijs bestaat. De zone is dus op de kaart getekend, niet op de route.",
          "Buiten de zone is de prijs de lijstprijs plus € 1,50 voor elke extra kilometer. Badalona ligt op 21,8 kilometer en Sant Cugat del Vallès op 19,5, dus beide betalen de stadsprijs plus het verschil. Dat zijn de bijna-missers; het grootste deel van de metropoolregio ligt binnen de zone.",
          "Die € 1,50 is één vastgesteld bedrag en niet het tarief van het moment, wat belangrijker is dan het klinkt. Het officiële nachttarief is € 1,66 per kilometer tegenover € 1,35 overdag. Als wij steeds het geldende tarief rekenden, kwam het tijdstip terug in een prijslijst die juist bedoeld is om niet van het uur af te hangen, en iemand die hoort „vijftig euro plus anderhalve euro per kilometer” zou zonder waarschuwing meer in rekening gebracht krijgen. Eén bedrag, de hele dag.",
        ],
      },
      {
        h2: "Wat de standplaats in plaats daarvan rekent",
        body: [
          "Loopt u naar de standplaats, dan vormen drie dingen samen het bedrag op de meter: een instaptarief zodra de meter loopt, een tarief per kilometer en eventuele toeslagen.",
          "Het instaptarief, de bajada de bandera, is € 2,80. Het tarief per kilometer is € 1,35 onder tarief T-1, dat geldt van maandag tot en met vrijdag tussen 08:00 en 20:00, en € 1,66 onder T-2 op alle andere momenten: avonden, nachten, de hele zaterdag en zondag, en feestdagen. Het verschil is ongeveer 23%, en daarom kost een identieke rit om 22:00 echt meer dan om 14:00.",
          "Daarnaast is er een wachttarief van € 27,75 per uur, dat de meter telt zolang u stilstaat. In de praktijk maakt dit aankomsten in de spits onvoorspelbaar: de meter stopt niet wanneer het verkeer stopt.",
          "De huidige tarieven gelden van 19 januari 2026 tot 17 januari 2027. De AMB herziet ze elk jaar in januari, en wie u een taxitarief in Barcelona noemt op basis van een oud bord, noemt het tarief van het verkeerde jaar. De onze worden gecontroleerd aan de hand van het gedrukte tariefbord en niet overgenomen van een andere website.",
        ],
      },
      {
        h2: "De toeslagen, en het maximum dat u waarschijnlijk niet haalt",
        body: [
          "Bovenop het meterbedrag komen vaste toeslagen voor specifieke plaatsen en situaties. De toeslag voor luchthaven El Prat is € 4,60 en geldt voor elke rit die op de luchthaven begint of eindigt. De cruiseterminal Moll Adossat heeft dezelfde € 4,60. Station Sants kost € 2,55 en het beurscomplex Fira Gran Via € 3,30.",
          'Een voertuig met vijf of meer passagiers kost € 4,60 extra. Dat is een tariefsupplement voor het grotere voertuig zelf en geen bedrag per persoon, en het is een van de redenen waarom de zeszits Vito op dezelfde rit meer kost dan een sedan.',
          "Drie nachten per jaar hebben een extra toeslag van € 4,60: kerstavond tot kerstochtend, oudejaarsavond tot nieuwjaarsdag en de Revetlla de Sant Joan in de nacht van 23 juni. Landt u in een van die nachten, dan kost de standplaats meer dan het gebruikelijke tarief en de geboekte prijs niet.",
          "Er is een maximum van € 17,10 voor het totaal aan toeslagen dat op één rit mag worden gerekend, bedoeld voor uitzonderlijke gevallen, bijvoorbeeld een groot voertuig dat op oudejaarsavond de cruiseterminal verlaat. Op een gewone luchthavenrit betaalt u één toeslag van € 4,60 en komt u nergens in de buurt van dat plafond.",
          "Dit alles zit in onze vaste prijs. De € 50 is geen tarief waar toeslagen nog bij komen; het is het totaal, met de luchthaventoeslag, het voertuig, het tarief en onze eigen servicekosten er al in. De meest voorkomende klacht over luchthaventransfers overal ter wereld is een prijs die tussen offerte en stoeprand groeit, en de manier om dat niet te doen is het bedrag te noemen dat u daadwerkelijk gaat rekenen.",
        ],
      },
      {
        h2: "Het minimumtarief vanaf El Prat",
        body: [
          "Elke rit op de meter die op de luchthaven begint, kost minstens € 21,00. Als de meter minder had opgeleverd, betaalt u het minimum.",
          "Dat bestaat omdat een taxi die veertig minuten in de rij staat bij de standplaats voor een sprong van vier euro naar een luchthavenhotel verlies maakt op de dienst, en zonder ondergrens zou niemand de korte ritten nemen. Het speelt alleen bij werkelijk korte ritten: naar het dorp El Prat of naar een van de hotels langs de luchthavenweg.",
          "Voor alles richting Barcelona zelf komt de meter ruim boven € 21 uit, dus het minimum speelt dan geen rol. Krijgt u een prijs voor een taxi vanaf de luchthaven van Barcelona genoemd „vanaf € 21”, dan is dat de ondergrens voor een rit van twee kilometer die als stadstarief wordt gepresenteerd.",
        ],
      },
      {
        h2: "De cruiseterminal is een geval apart",
        body: [
          "De rit tussen El Prat en Moll Adossat heeft een officiële vaste prijs van € 46,00 onder tarief T-4, vastgesteld door de AMB en niet door ons. Die rit loopt helemaal niet op de meter.",
          "Dat is ongebruikelijk en het heeft een goede reden: cruisepassagiers reizen met een inscheepdeadline, vaak in het drukste havenverkeer van de week, en een meterbedrag in zo'n situatie is een gok die niemand wil nemen. Een vaste prijs haalt het verkeersrisico weg uit een rit waarbij te laat komen geen ongemak is maar een gemist schip.",
          "Onze geboekte prijs voor dezelfde route is € 60 in een gewone auto. Dat is hoger dan de officiële vaste prijs, omdat daarin een garantie zit die de standplaats niet biedt: een vooraf toegewezen chauffeur die u opwacht met een naambord en uw plek vasthoudt, of het schip nu op tijd aanmeert of niet. Voor een gezin met bagage en een vertrektijd is dat meestal het geld waard. Voor een alleenreiziger met een rugzak en een rustige middag is de standplaats voor € 46 de betere koop, en dat zeggen wij liever dan dat we iets anders voorwenden.",
          "Een transfer tussen de cruiseterminal en de stad, dus niet de luchthaven, kost de stadsprijs plus € 10 havenopslag, wat op dezelfde € 60 uitkomt. Die symmetrie is bedoeld.",
        ],
      },
      {
        h2: "Buiten de metropoolregio: Sitges, Girona, Tarragona",
        body: [
          "Zodra een van beide uiteinden van de rit buiten de metropoolregio ligt, gelden de tarieven van Barcelona helemaal niet meer en wordt de rit afgerekend volgens de interstedelijke tarieven van de Generalitat de Catalunya. Dat zijn T-6, van maandag tot en met vrijdag van 08:00 tot 20:00, en T-7 op alle andere momenten, ook het hele weekend.",
          "De interstedelijke meter heeft een eigenschap die bijna iedereen verrast: hij rekent de terugweg mee. Een taxi van Barcelona naar Sitges is volgens het tarief een heen-en-terugrit, het gesloten circuit, omdat de chauffeur naar huis moet en onderweg geen passagier mag oppikken. Een kilometer naar het zuiden kost dus twee kilometer op de meter. Bij het T-6-tarief van € 0,82 per kilometer is dat € 1,64 per daadwerkelijk gereden kilometer, niet € 0,82.",
          'Daarom kost een lange transfer wat hij kost, en daarom is een bedrag dat op een vergelijkingssite op een kilometerprijs lijkt vaak de helft van de echte. Alles inbegrepen, ook onze dienst, komt dat neer op ongeveer € 2,16 per gereden kilometer op werkdagen (T-6) en tussen € 2,38 en € 2,48 ’s nachts en in het weekend (T-7), plus een instaptarief. Sitges, op 38 kilometer, kost in totaal € 90,78. Niets wordt dubbel geteld.',
          "De praktische conclusie: Sitges, Tarragona, Girona, Reus en de Costa Brava worden per kilometer berekend en vooraf geofferd, net als al het andere. Ze vallen niet onder de vaste stadslijst, en geen enkele eerlijke vaste lijst kan ze dekken: de afstanden verschillen met een factor vijf.",
        ],
      },
      {
        h2: "Weekends, feestdagen en wat er echt verandert",
        body: [
          "Een vaste prijs stijgt met 7,5% in het weekend en op feestdagen. Op een gewone auto van € 50 is dat € 3,75. De toeslag bestaat omdat bezetting in het weekend en op feestdagen meer kost, en het is één vastgesteld percentage en geen piekmultiplicator die met de vraag meebeweegt: de prijs die u voor een zaterdag in februari krijgt, is dezelfde als voor een zaterdag in augustus.",
          "Hij geldt alleen voor de vaste stads- en havenprijzen. Een interstedelijke rit gaat in het weekend al van T-6 naar T-7, met een eigen hoger tarief, dus een toeslag daarbovenop zou dezelfde meerprijs twee keer rekenen.",
          "Wat niet verandert: het uur van de dag, de terminal, het verkeer, de route die de chauffeur neemt, het aantal passagiers binnen de capaciteit van het voertuig of de hoeveelheid bagage daarin. Een auto met vier zitplaatsen en drie koffers om 06:00 en een auto met vier zitplaatsen en één tas om 18:00 kosten beide € 50 op een werkdag.",
        ],
      },
      {
        h2: "Wat moet u dus begroten?",
        body: [
          "Voor een geboekte transfer naar Barcelona: € 50 op een werkdag in een auto met vier zitplaatsen, € 53,75 in het weekend. € 70 of € 75 als u een voertuig met zes of zeven zitplaatsen nodig hebt, wat voor vier volwassenen met vier grote koffers meestal het eerlijke antwoord is en geen verkooptruc: drie koffers is de realistische grens in een Corolla of een Toledo.",
          "Voor de standplaats, op een werkdag overdag naar het centrum: de meter plus de toeslag van € 4,60, meestal ergens in de veertig, en hoger 's avonds, in het weekend of bij druk verkeer. Houd er rekening mee dat een pinapparaat het soms niet doet.",
          "Voor de cruiseterminal: € 46 tegen de officiële vaste prijs, of € 60 geboekt met een chauffeur die uw plek vasthoudt.",
          "Eén ding moet duidelijk gezegd worden: de standplaats en een geboekte auto zijn niet hetzelfde product tegen een andere prijs. Het ene is een gereguleerde rit op de meter die u bij aankomst koopt. Het andere is een vast bedrag, een chauffeur met naam en een auto die al is toegewezen wanneer uw vlucht landt. Welke meer waard is, hangt er helemaal van af hoeveel de zekerheid u die dag waard is, en voor veel ritten is het antwoord „niet veel”, en dan staat de standplaats gewoon voor de deur.",
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: "Taxi of Aerobús vanaf de luchthaven van Barcelona?",
    description:
      "Taxi, Aerobús of metro vanaf El Prat: de echte kosten per groep, eerlijke deur-tot-deurtijden en wanneer bagage of een late aankomst de doorslag geeft.",
    h1: "Taxi of Aerobús vanaf de luchthaven van Barcelona?",
    excerpt:
      "De Aerobús is per persoon goedkoper en de metro nog goedkoper. Geen van beide is automatisch beter als u groepsgrootte, bagage en de wandeling aan de andere kant meetelt, en voor een of twee mensen met weinig bagage is de taxi de verkeerde keuze, en dat zeggen we ook.",
    sections: [
      {
        h2: "De rekensom, met de echte cijfers",
        body: [
          "De Aerobús rekent per persoon. Een taxi rekent per auto. Dat ene verschil beslist de meeste van deze discussies voordat de andere factoren meetellen.",
          "Een geboekte transfer met vier zitplaatsen naar Barcelona kost € 50 vast. Gedeeld door twee personen is dat € 25 per persoon, een veelvoud van een stoel in de Aerobús. Gedeeld door vier is het € 12,50 per persoon, en dan wordt het verschil iets waar de meeste mensen niet meer om malen, nog los van het feit dat de taxi voor uw deur stopt en de bus bij de Plaça de Catalunya.",
          "Het omslagpunt ligt meestal bij drie passagiers, en bij vier is het gewoonlijk verdwenen. Een groep van zes in een Vito voor € 70 betaalt minder dan € 12 per persoon, van deur tot deur, met de bagage in de kofferbak en niet op schoot.",
          "De eerlijke versie van de vergelijking is deze: alleen reizend is de bus een betere koop en dat scheelt veel. Als gezin van vier met koffers is de taxi meestal zowel in totaal goedkoper als aanzienlijk gemakkelijker. Alles ertussen hangt af van de bagage.",
        ],
      },
      {
        h2: "Deur-tot-deurtijd, niet de tijd uit de folder",
        body: [
          "De Aerobús wordt aangeprezen met ongeveer 35 minuten naar de Plaça de Catalunya, en dat klopt, van halte tot halte. De tijd die u werkelijk ervaart is langer, want de reis begint niet bij de buslocatie en eindigt niet op het plein.",
          "Tel daar de wandeling van de aankomsthal naar de halte bij, die bij T1 met een bagagekar een paar minuten kost. Tel de wachttijd erbij, die in de spits kort is en 's avonds vijftien minuten kan oplopen. Tel dan het stuk van de Plaça de Catalunya of Sants naar uw verblijf: met de metro en koffers, in een tweede taxi of te voet over de keien van het Gotische kwartier.",
          "Een taxi van El Prat naar het centrum van Barcelona duurt 25 tot 35 minuten, afhankelijk van het verkeer en waar in de stad u heen moet, en eindigt op het adres dat u hebt ingevoerd. Voor de Eixample of Sant Antoni is het verschil in totale deur-tot-deurtijd misschien twintig minuten. Voor een plek hoog in Gràcia, of een appartement met een straatingang in El Born, is het vaak dichter bij vijfenveertig.",
          "De spreiding telt net zo zwaar als het gemiddelde. De bus is betrouwbaar en de taxi is sneller; bij druk verkeer lopen ze naar elkaar toe, omdat de bus in hetzelfde verkeer staat en vaker stopt.",
        ],
      },
      {
        h2: "De metro is goedkoper dan beide, onder voorwaarden",
        body: [
          "Lijn 9 Sud bedient beide terminals en is veruit de goedkoopste manier om de stad in te komen. Het is een echt goede optie en bezoekers gebruiken hem te weinig.",
          "De voorwaarden zijn wel echt. Hij gaat niet rechtstreeks naar het centrum: u stapt over, meestal bij Collblanc of Torrassa, op een andere lijn, en voor de luchthavenstations hebt u een specifiek luchthavenkaartje nodig en geen gewoon enkeltje. De stations hebben liften, maar de overstappen bestaan uit gangen, en die doen met twee grote koffers en een moe kind klinkt prima als u boekt en voelt niet prima om 23:00.",
          "Reist u licht, verblijft u bij een overstappunt van lijn 9 en hebt u geen haast, dan is de metro het juiste antwoord en kost hij een fractie van al het andere. Klopt een van die drie niet, dan is hij al snel niet meer het juiste antwoord.",
        ],
      },
      {
        h2: "Bagage is de echte doorslag",
        body: [
          "Meer dan prijs en meer dan tijd beslist de bagage, en die onderschatten mensen als ze thuis boeken.",
          "Een taxi in Barcelona met vier zitplaatsen, een Corolla of een SEAT Toledo, neemt vier passagiers en ongeveer drie koffers mee. Vier volwassenen met elk een grote koffer passen niet, en dan is het antwoord een Vito met zes zitplaatsen, die zes passagiers en zes koffers meeneemt, of een V-Klasse met zeven zitplaatsen. Dat vooraf weten is het verschil tussen een transfer en een probleem op de stoep.",
          "In de Aerobús gaat de bagage in een laadruimte onder de bus en is er een rek bij de deur, wat goed werkt. In de metro gaat ze waar u haar kunt vasthouden, en dat is in de spits boven op u.",
          "De vuistregel die standhoudt: één tas per persoon en u hebt echt keuze uit alle drie. Twee tassen per persoon en alleen de taxi is echt prettig, wat de rekensom ook zegt.",
        ],
      },
      {
        h2: "Wanneer de taxi duidelijk wint",
        body: [
          "Aankomst na middernacht. De Aerobús rijdt 's nachts niet meer en de metro sluit, met daartussen een beperkt nachtbusnet dat met bagage en zonder Catalaans geen realistisch voorstel is.",
          "Reizen met kinderen, een kinderwagen of een autostoeltje. De bus is te doen met één kind en lastig met twee, en niemand vindt de metro-overstap met een kinderwagen en een koffer leuk.",
          "Een vroege vlucht halen. Een ophaaltijd van 04:30 voor een vertrek om 06:30 heeft geen equivalent in het openbaar vervoer, en een geboekte auto tegen een vaste prijs is de enige variant waarmee u tot de wekker kunt slapen.",
          "Verblijven op een plek waar het laatste stuk echt lastig is: het Gotische kwartier, waar voertuigen veel adressen niet kunnen bereiken maar wel een stuk dichterbij komen dan een bushalte; Gràcia en Sarrià, de heuvel op vanaf alle busroutes; overal waar u anders met een tweede taxi eindigt, waardoor de „goedkopere” optie meer kost.",
          "Groepen van vier of meer. Dan heeft de prijs per auto al op geld gewonnen, dus het gemak is gratis.",
        ],
      },
      {
        h2: "Wanneer niet, en dat zeggen we eerlijk",
        body: [
          "Een of twee personen, weinig bagage, verblijf bij de Plaça de Catalunya of aan een directe metrolijn, aankomst midden op de dag. In dat geval is de Aerobús de verstandige keuze, de metro de goedkope, en is een taxi van € 50 een betaling voor gemak dat u niet bijzonder nodig hebt.",
          "Dat schrijven we liever op dan te doen alsof de taxi altijd goed is. Een luchthaventransfer is een dienst met een bepaalde vorm, vaste prijs, toegewezen chauffeur, van deur tot deur, bagage geregeld, en die vorm is veel waard voor een gezin van vier om middernacht en weinig voor een alleenreiziger met een rugzak om twee uur 's middags.",
          "Dezelfde logica geldt voor de standplaats. Een taxi op de meter van de standplaats op een rustige werkdagmiddag komt vaak onder een geboekte vaste prijs uit, omdat de vaste prijs het verkeersrisico opvangt dat die dag niet is opgetreden. Zo werken vaste prijzen, in beide richtingen.",
        ],
      },
      {
        h2: "Het nachtelijke gat waar niemand over praat",
        body: [
          "Er is een venster, ruwweg van de laatste Aerobús tot de eerste ochtendmetro, waarin het openbaar vervoer wegvalt naar een nachtbus en de standplaats de standaardkeuze wordt. Op een gewone nacht is de standplaats bij T1 goed beheerd en gaat het snel.",
          "Het gaat mis wanneer een vertraagde vlucht in dat venster landt, tegelijk met twee andere vertraagde vluchten. De rij is dan veertig mensen lang en het aanbod aan taxi's om 02:00 is dun, want chauffeurs staan niet voor de zekerheid bij een terminal. Dat is het enige scenario waarin aankomen met een al toegewezen auto duidelijk meer waard is dan het kost.",
          "Landt uw vlucht volgens de planning na ongeveer 23:30, dan kunt u dit beter voor vertrek beslissen dan in de aankomsthal.",
        ],
      },
      {
        h2: "Terug naar de luchthaven is een ander probleem",
        body: [
          "Bijna iedereen plant de aankomst en improviseert het vertrek, en het vertrek is de moeilijkste helft.",
          "Op de heenreis hebt u opties omdat u op een luchthaven staat, de enige plek in de regio waar zeker taxi's zijn. Op de terugreis staat u om 05:00 in een straat in Gràcia met een vlucht om 07:30, en alles wat de bus en de metro aantrekkelijk maakte, rijdt niet meer.",
          "De Aerobús helpt niet bij vroege vertrekken, en een taxi aanhouden in een woonstraat voor zonsopgang is onbetrouwbaar op een manier die op de Gran Via niet geldt. Barcelona heeft genoeg taxi's; het heeft er niet genoeg op uw hoek om vijf uur 's ochtends.",
          "Voor een vertrek overdag vanaf een centraal adres werken alle drie de opties omgekeerd precies zoals heen, en dezelfde rekensom geldt. Voor alles voor ongeveer 07:00, of vanaf een adres buiten het hoofdnet, is een geboekte ophaling minder een gemak dan de enige variant die betrouwbaar gebeurt. De vaste prijs is in beide richtingen gelijk: € 50 de stad in en € 50 eruit, op werkdagen, in een auto met vier zitplaatsen.",
        ],
      },
      {
        h2: "Hoe u in tien seconden beslist",
        body: [
          "Tel de mensen en tel de tassen. Een of twee mensen met elk een tas, aankomst overdag, centraal verblijf: neem de Aerobús, of de metro als u op elke euro let.",
          "Drie of meer mensen, of twee of meer tassen per persoon, of een aankomst nadat de bussen stoppen, of een adres boven op een heuvel of in een steegje: neem een taxi, en beslis apart of u de standplaats wilt of een vooraf geboekte auto.",
          "Standplaats of geboekt komt neer op één vraag: hoe erg zou een rij van veertig minuten of een onbekend eindbedrag uw avond beïnvloeden? Is het antwoord „niet erg”, dan staat de standplaats vlak buiten de aankomsthal en kost die minder. Reist u met mensen die dat niet aankunnen, of tegen een deadline, boek dan.",
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: "Terminals luchthaven Barcelona: T1 en T2 uitgelegd",
    description:
      "Welke terminal uw maatschappij gebruikt op Barcelona El Prat, hoe de pendelbus T1-T2 werkt, waar de taxistandplaatsen zijn en waar uw geboekte chauffeur wacht.",
    h1: "Terminals van de luchthaven van Barcelona: T1 en T2",
    excerpt:
      "De verkeerde terminal kost u een pendelrit en twintig minuten, en bij vertrek kan het u de vlucht kosten. Dit is welke welke is, waar de taxi's bij elk echt staan en het ene dat u de dag voor vertrek moet controleren.",
    sections: [
      {
        h2: "Twee terminals, enkele kilometers uit elkaar",
        body: [
          "Barcelona El Prat heeft twee passagiersterminals, T1 en T2, en het allerbelangrijkste om te weten is dat u niet van de ene naar de andere kunt lopen. Ze liggen aan weerszijden van de start- en landingsbanen, een paar kilometer uit elkaar, verbonden door een gratis pendelbus.",
          "Dat verrast mensen, omdat een „terminal” op veel luchthavens een andere vleugel van hetzelfde gebouw is. Hier is het een ander gebouw met een busrit ertussen, en die rit duurt 10 tot 15 minuten, nog zonder het wachten op de bus.",
          "T1 is de nieuwere en veel grotere van de twee, geopend in 2009, en handelt het meeste langeafstandsverkeer af, samen met het grootste deel van Vueling en de traditionele maatschappijen. T2 is de oorspronkelijke terminal, ouder en met lagere plafonds, verdeeld in drie blokken en in gebruik bij een aantal lagekostenmaatschappijen.",
          "Beide zijn volledig uitgerust: inchecken, beveiliging, winkels, eten, autoverhuur, taxistandplaatsen. Geen van beide is een afgelegen buitenpost. De enige echte straf voor de verkeerde terminal is tijd.",
        ],
      },
      {
        h2: "Welke maatschappijen waar zitten",
        body: [
          "T1 neemt het meeste af wat van buiten Europa komt, plus Vueling, de dominante maatschappij op de luchthaven, en de meeste traditionele nationale maatschappijen.",
          "T2 bedient een aantal lagekostenmaatschappijen, waarvan Ryanair een van de grootste is, naast wat charter- en seizoensverkeer.",
          "De nuttige kanttekening: dit is niet stabiel. Maatschappijen wisselen van terminal wanneer hun contracten veranderen, soms met een paar weken opzegtermijn, en seizoensdienstregelingen schudden alles verder door elkaar. Een gids die u vol zekerheid vertelt welke terminal uw maatschappij gebruikt, vertelt u welke terminal die gebruikte toen de gids werd geschreven.",
          "Codeshares maken het erger. Hebt u via de ene maatschappij geboekt en vliegt u met het toestel van een andere, dan volgt de terminal de uitvoerende maatschappij en niet die op uw boekingsbevestiging. De terminal op uw instapkaart is de terminal die telt, en de enige bron die u kunt vertrouwen.",
        ],
      },
      {
        h2: "Wisselen tussen T1 en T2",
        body: [
          "De pendelbus tussen de terminals is gratis, rijdt vaak en ook 's nachts, al minder vaak in de kleine uurtjes. Hij stopt buiten de aankomsthal van T1 en bij elk blok van T2.",
          "Reken op 25 minuten van deur tot deur en niet op de 10 tot 15 die de rit zelf duurt: u wacht op de bus, laadt bagage in en loopt aan de andere kant nog een stuk. Op drukke momenten, met een volle bus en alleen staanplaatsen, duurt het langer en is het met koffers een stuk minder prettig.",
          "Ook lijn 9 Sud van de metro verbindt de twee terminals, met een station bij elk, en dat is soms sneller dan op de bus wachten als u al ondergronds bent. Het is niet gratis en vereist het luchthavenkaartje.",
          "Als u overstapt van een vlucht naar T2 op een vlucht vanaf T1 op losse tickets, behandel die overstap dan als een echt deel van de reis en geef hem een uur. Hier missen mensen vluchten.",
        ],
      },
      {
        h2: "T2 bestaat uit drie blokken, en het blok doet ertoe",
        body: [
          "T2 is verdeeld in de blokken A, B en C, in een rij langs de voorkant van het gebouw. Ze zijn binnen met elkaar verbonden, dus u kunt ertussen lopen, maar van het ene uiteinde naar het andere is het een wandeling van enkele minuten.",
          "Uw maatschappij gebruikt een bepaald blok, en de incheckbalies, de beveiliging en de taxistandplaats hangen daaraan vast. Afgezet worden bij blok C terwijl u blok A nodig hebt is geen ramp, maar wel een wandeling met bagage die u niet had gepland.",
          "Boekt u een transfer met ophalen of afzetten bij T2, vermeld dan het blok. Het is het verschil tussen een chauffeur die staat waar u naar buiten komt en een chauffeur die driehonderd meter verderop langs de gevel staat.",
        ],
      },
      {
        h2: "Waar de taxistandplaatsen zijn",
        body: [
          "Beide terminals hebben officiële taxistandplaatsen direct buiten de aankomsthal, duidelijk bewegwijzerd, onder toezicht en meestal druk. Bij T1 ligt de standplaats recht voor de aankomsthal. Bij T2 zijn er standplaatsen voor elk van de blokken.",
          "De taxi's op deze standplaatsen zijn erkende taxi's van Barcelona in de gebruikelijke zwart-gele uitvoering, allemaal met dezelfde gereguleerde meter. Er wordt niet onderhandeld en u kiest niet: u neemt de auto vooraan. Zo is het systeem bedoeld, en het betekent dat u ten opzichte van het tarief niet te veel kunt worden aangerekend.",
          "Elke rit die op de luchthaven begint, heeft een toeslag van € 4,60 en kost minstens het minimumtarief van € 21, beide onderdeel van het officiële tarief en niets wat de chauffeur zelf heeft toegevoegd.",
          "Wat de standplaats niet kan, is u de prijs vooraf zeggen of garanderen dat er een auto is wanneer u landt. Op een gewone middag is dat allebei prima. Na een reeks vertraagde late aankomsten is de rij het hele verhaal.",
        ],
      },
      {
        h2: "Waar een geboekte chauffeur u in plaats daarvan opwacht",
        body: [
          "Een vooraf geboekte transfer gebruikt de standplaats niet, en dit is het deel dat mensen bij aankomst het vaakst verkeerd doen.",
          "Uw chauffeur wacht in de aankomsthal, aan de publieke kant van de uitgang van de bagageband, met een bord met uw naam. Hij staat niet aan de stoeprand en niet in de rij bij de standplaats. U loopt de bagagehal uit en hij staat daar, en dat is het hele punt van boeken.",
          "Het exacte ontmoetingspunt wordt voor uw reis per e-mail bevestigd, omdat het per terminal verschilt en bij T2 per blok. Lees die e-mail in het vliegtuig en niet in de hal.",
          "De chauffeur volgt uw vluchtnummer, dus een vertraging verschuift de ophaling en doet haar niet vervallen. Dat is het praktische verschil tussen een geboekte auto en een standplaats: bij een landing een uur te laat om 01:00 is er een chauffeur die er nog is, in plaats van een standplaats die uitgedund is.",
          "Als u elkaar niet kunt vinden, bereikt het telefoonnummer in de bevestiging de chauffeur rechtstreeks en geen callcenter. Aankomsthallen zijn groot en borden zakken weg; één telefoontje lost het op.",
        ],
      },
      {
        h2: "Verandert de terminal het tarief?",
        body: [
          "Nauwelijks, en voor een geboekte transfer helemaal niet.",
          "T1 ligt een paar kilometer verder van de stad dan T2. Bij een rit van 15 kilometer naar het centrum van Barcelona is dat verschil klein, en de luchthaventoeslag van € 4,60 is vanaf beide terminals gelijk. Op de meter ziet u misschien een of twee euro verschil.",
          "Een geboekte vaste prijs maakt helemaal geen onderscheid: € 50 de stad in, in een auto met vier zitplaatsen vanaf T1 of T2, op een werkdag, met de toeslag al in het bedrag. Hetzelfde geldt omgekeerd voor vertrekken.",
          "Wat de terminal wel verandert, is het risico op de pendelrit. Wordt u bij de verkeerde afgezet, dan kost het 25 minuten en een bus, wat bij aankomst vervelend is en bij vertrek de vlucht kan zijn.",
        ],
      },
      {
        h2: "Vertrek: waar een fout echt pijn doet",
        body: [
          "Bij aankomst kost de verkeerde terminal u tijd. Bij vertrek kan hij u de reis kosten, want u ontdekt de fout bij een incheckbalie die uw vlucht niet heeft, met een pendelbus die 25 minuten duurt die u niet hebt.",
          "Noem de terminal wanneer u een vertrektransfer boekt, en controleer hem aan de hand van de instapkaart en niet aan de hand van uw herinnering aan de heenvlucht. Maatschappijen gebruiken in elke richting regelmatig verschillende terminals, en een terugvlucht met een codeshare kan gemakkelijk een andere terminal zijn dan de heenvlucht.",
          "Voor een vroeg vertrek betekent een vlucht van 06:30 vanaf El Prat een ophaling rond 04:30 in de stad, eerder als u verder weg zit. Een geboekte auto tegen een vaste prijs is de enige variant daarvan waarbij u niet bij dageraad op straat staat te hopen.",
        ],
      },
      {
        h2: "Hoe lang u er echt over doet om weg te komen",
        body: [
          "De tijd die voor een ophaling telt, is niet wanneer het toestel landt maar wanneer u de bagagehal uitloopt, en het gat daartussen is groter dan de meeste mensen inplannen.",
          "Bij een aankomst uit de Schengenzone met alleen handbagage is tien tot vijftien minuten van landing tot aankomsthal realistisch. Van buiten Schengen, met paspoortcontrole en een ingecheckte tas, is een half uur normaal en gebeurt een uur ook, vooral bij T1 halverwege de ochtend, wanneer meerdere langeafstandsvluchten tegelijk landen en de rij bij de controle de flessenhals is en niet de bagageband.",
          "Daarom is een geboekte transfer gekoppeld aan uw vluchtnummer en niet aan een tijd die u hebt ingetypt. De chauffeur volgt de werkelijke landing en houdt rekening met de hal, waardoor de gok wegvalt die u anders weken van tevoren thuis bij het boeken zou moeten maken.",
          "Het betekent ook dat het geen zin heeft uw eigen schatting op te rekken. Een ophaling een uur na de landing boeken „voor de zekerheid” helpt niet, omdat de tracking dat al afhandelt, en u wacht dan op een auto die bewust te laat is.",
          "Het enige wat u zelf moet doen: als u ongewoon snel door de bagagehal bent en uw chauffeur nog niet op positie staat, bereikt het nummer op de bevestiging hem rechtstreeks. Een auto die acht minuten verwijderd is, is een normale uitkomst van een snelle uitgang en geen probleem.",
        ],
      },
      {
        h2: "Controleer het de dag ervoor",
        body: [
          "Eén gewoonte voorkomt bijna al dit gedoe: lees de avond voor uw vlucht de terminal op de instapkaart. Niet op de boekingsbevestiging, niet in de gids die u in maart las, niet op de algemene routepagina van de maatschappij, maar op de instapkaart voor de vlucht die u neemt.",
          "Komt die niet overeen met wat u ons hebt doorgegeven, antwoord dan op de bevestigingsmail en wij verzetten het. Een terminal op een boeking wijzigen kost niets en duurt een minuut. Het om 05:00 ontdekken kost de pendelrit, de stress en soms de vlucht.",
        ],
      },
    ],
  },
};
