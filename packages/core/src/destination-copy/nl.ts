import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "nl" locale. Filled in per destination slug and
 * group slug; anything missing falls back to the English original, which the
 * parity test in destination-copy.test.ts forbids for every page that has one.
 */
export const NL_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: 'Costa Brava',
      route: 'Barcelona naar de Costa Brava',
      blurb:
        'Transfers van deur tot deur van El Prat naar de badplaatsen aan de Costa Brava, met bagageruimte voor het hele gezin.',
      body: [
        'De Costa Brava begint ruwweg een uur ten noorden van Barcelona en loopt door tot aan de Franse grens, en vrijwel iedere bezoeker komt aan via El Prat. De kustweg is eenvoudig, maar het is een echte reis en geen sprongetje door de stad: reken op ongeveer 80 minuten naar Lloret de Mar en bijna twee uur naar de baaitjes in het noorden.',
        'Een privétransfer is hier meer waard dan bij een rit binnen de stad. Naar de meeste badplaatsen rijdt geen directe trein, de touringcars stoppen alleen in de grotere plaatsen en het laatste stuk naar een hotel op een heuvel of een villa buiten het dorp leg je met koffers zelden te voet af. Uw chauffeur brengt u tot aan de deur.',
        'Wij halen u op in de aankomsthal met een naambordje en volgen uw vlucht, dus een vertraagde landing kost u de auto niet. Voor groepen biedt de Mercedes Vito of V-Class plaats aan zes of zeven passagiers met bijpassende bagage, wat meestal goedkoper is dan twee aparte auto’s en een stuk eenvoudiger.',
        'Omdat de Costa Brava buiten het grootstedelijk gebied van Barcelona ligt, wordt de rit niet volgens de AMB-taximeter berekend. Wij geven u voor de route een vaste prijs, voordat u boekt en schriftelijk bevestigd, zodat u aan het eind niets meer hoeft af te rekenen buiten wat u hebt afgesproken.',
      ],
    },
    girona: {
      place: 'Girona',
      route: 'Barcelona naar Girona',
      blurb:
        'Stadscentrum, luchthaven Girona of de oude stad: een directe rit naar het noorden zonder overstappen.',
      body: [
        'Girona ligt zo’n 100 km ten noorden van Barcelona en is per auto iets meer dan een uur rijden. Het is een veelgevraagde transfer om drie heel verschillende redenen: de stad zelf, de luchthaven die haar naam draagt en de kathedraaltrappen die een gestage stroom bezoekers trekken.',
        'De trein is snel tussen beide stadscentra, maar helpt u niet als u met bagage op El Prat begint, laat aankomt of ergens anders heen moet dan naar het station. Een privéauto neemt de overstappen aan beide kanten weg.',
        'Luchthaven Girona ligt nog eens 15 minuten voorbij de stad en vangt een groot deel van het charterverkeer naar de Costa Brava op. Reist u tussen El Prat en luchthaven Girona, geef ons dan beide vluchtnummers door, dan plannen wij een verstandige marge in.',
        'Deze route valt buiten de zone waar de AMB-taximeter geldt, dus wij bevestigen vooraf een vaste prijs. De voertuigen variëren van een standaardtaxi met vier zitplaatsen tot de V-Class met zeven zitplaatsen voor gezinnen en groepen.',
      ],
    },
    'lloret-de-mar': {
      place: 'Lloret de Mar',
      route: 'Barcelona naar Lloret de Mar',
      blurb: 'De drukste badplaats van de Costa Brava, zo’n 70 minuten van El Prat.',
      body: [
        'Lloret de Mar is de bekendste badplaats aan de Costa Brava en een van onze meest gevraagde ritten over langere afstand. Buiten de piekperiodes rijdt u er in ongeveer 70 minuten vanaf El Prat naartoe.',
        'In het seizoen rijden er touringcars naar Lloret, maar die houden een dienstregeling aan en stoppen op een centraal punt, wat lastig is als uw hotel op een van de heuvels boven de baai ligt. Een privétransfer eindigt bij de ingang.',
        'Voor groepen die samen aankomen is een minivan met zes of zeven zitplaatsen meestal gunstiger dan meerdere auto’s, en iedereen blijft op hetzelfde schema.',
        'De route valt buiten de AMB-taximeterzone, dus de prijs is vast en vooraf afgesproken in plaats van via de taximeter berekend.',
      ],
    },
    'tossa-de-mar': {
      place: 'Tossa de Mar',
      route: 'Barcelona naar Tossa de Mar',
      blurb: 'Ommuurde oude stad en rustiger stranden, op ongeveer 80 minuten rijden.',
      body: [
        'Tossa de Mar is de rustigere buur van Lloret, bekend om de ommuurde oude stad boven het strand. Het ligt op ongeveer 80 minuten van de luchthaven van Barcelona.',
        'De laatste kilometers langs de kustweg zijn schilderachtig maar langzaam, en met het openbaar vervoer moet u minstens één keer overstappen. De meeste gasten vinden een directe auto na een vlucht het waard.',
        'De oude stad is grotendeels autovrij, dus wij spreken bij het boeken met u het dichtstbijzijnde bereikbare afzetpunt af in plaats van bij aankomst te improviseren.',
        'De prijs voor deze route is vast en wordt voor vertrek bevestigd, omdat de route buiten het AMB-taximetergebied ligt.',
      ],
    },
    blanes: {
      place: 'Blanes',
      route: 'Barcelona naar Blanes',
      blurb: 'De zuidelijke toegangspoort tot de Costa Brava, ongeveer een uur rijden.',
      body: [
        'Blanes vormt het zuidelijke einde van de Costa Brava en is de dichtstbijzijnde van de grote badplaatsen bij Barcelona, op ongeveer een uur rijden.',
        'Het heeft een treinstation, waardoor het een van de beter bereikbare plaatsen aan de Costa Brava is, maar vanaf de luchthaven kost de verbinding nog steeds overstappen en aan het eind een stuk lopen.',
        'Wij halen u op in de aankomsthal of op elk adres in Barcelona en rijden rechtdoor, wat handig is voor gezinnen en voor wie met strandspullen reist.',
        'Net als bij de rest van de kust is het tarief een vaste, vooraf genoemde prijs en geen standaard van de taximeter.',
      ],
    },
    cadaques: {
      place: 'Cadaqués',
      route: 'Barcelona naar Cadaqués',
      blurb: 'Het hoge noorden voorbij Cap de Creus, ongeveer tweeënhalf uur rijden.',
      body: [
        'Cadaqués is het meest afgelegen dorp aan de Costa Brava en ligt voorbij de landtong van Cap de Creus, bereikbaar via een kronkelige bergweg. Reken op ongeveer tweeënhalf uur vanaf Barcelona.',
        'Er is helemaal geen treinverbinding en de busdienst is beperkt en traag. Voor de meeste bezoekers is een privétransfer de enige praktische manier om op een redelijk tijdstip aan te komen.',
        'De weg over de pas is smal en wordt het best gereden door iemand die hem kent, zeker na het donker. Onze chauffeurs rijden deze route regelmatig.',
        'Gezien de afstand is dit altijd een rit met een vooraf afgesproken vaste prijs. Vraag ons via WhatsApp om een offerte voor uw data.',
      ],
    },
    roses: {
      place: 'Roses',
      route: 'Barcelona naar Roses',
      blurb: 'Badplaats aan de Golf van Roses in het uiterste noorden van de Costa Brava.',
    },
    empuriabrava: {
      place: 'Empuriabrava',
      route: 'Barcelona naar Empuriabrava',
      blurb: 'De grachtenplaats aan de Golf van Roses.',
    },
    begur: {
      place: 'Begur',
      route: 'Barcelona naar Begur',
      blurb: 'Dorp op een heuvel en de baaitjes eronder.',
    },
    'calella-de-palafrugell': {
      place: 'Calella de Palafrugell',
      route: 'Barcelona naar Calella de Palafrugell',
      blurb: 'Wit gekalkt vissersdorp in het midden van de Costa Brava.',
    },
    sitges: {
      place: 'Sitges',
      route: 'Barcelona naar Sitges',
      blurb: 'De dichtstbijzijnde badplaats bij Barcelona, zo’n 25 minuten van El Prat.',
      body: [
        'Sitges is de kortste van onze ritten over langere afstand en de rit die het vaakst wordt geboekt. Vanaf El Prat is het ongeveer 25 minuten; vanuit het centrum van Barcelona eerder 40.',
        'De stad is een vaste waarde voor strandweekenden, congresgasten die buiten de stad logeren en de festivalkalender. Er rijdt een goede trein vanaf Barcelona Sants, maar niet vanaf de luchthaven, en daarom kiezen de meeste aankomende reizigers liever een directe auto.',
        'Het oude centrum heeft smalle eenrichtingsstraten en op sommige plekken beperkte toegang. Wij spreken bij het boeken een praktisch afzetpunt af, zodat er voor de deur niets meer geregeld hoeft te worden.',
        'Sitges ligt net buiten de AMB-taximeterzone, dus de rit wordt tegen een vaste prijs geoffreerd in plaats van via de taximeter berekend. Vraag het ons via WhatsApp en wij bevestigen het voordat u reist.',
      ],
    },
    tarragona: {
      place: 'Tarragona',
      route: 'Barcelona naar Tarragona',
      blurb: 'Romeinse stad en cruisehaven, ongeveer 75 minuten naar het zuiden.',
      body: [
        'Tarragona ligt zo’n 100 km ten zuiden van Barcelona, ongeveer 75 minuten over de snelweg. Het trekt bezoekers voor het Romeinse amfitheater en de oude stad, en steeds vaker ook als cruisehaven op zich.',
        'Cruisetransfers zijn de meest tijdgevoelige variant van deze rit. Gaat u aan boord van een schip, dan plannen wij een marge in en bevestigen wij de terminal, want een gemist vertrek is niet te herstellen.',
        'De stad is ook de toegangspoort tot de stranden van de Costa Dorada en veel gasten combineren beide: wij kunnen u onderweg afzetten bij een hotel aan de kust.',
        'Deze route ligt buiten het AMB-taximetergebied, dus wij geven vooraf een vaste prijs in plaats van de taximeter te laten lopen.',
      ],
    },
    salou: {
      place: 'Salou',
      route: 'Barcelona naar Salou',
      blurb: 'Badplaats aan de Costa Dorada naast PortAventura.',
    },
    portaventura: {
      place: 'PortAventura',
      route: 'Barcelona naar PortAventura',
      blurb: 'Directe transfer tot aan de poorten van het attractiepark.',
    },
    cambrils: {
      place: 'Cambrils',
      route: 'Barcelona naar Cambrils',
      blurb: 'Rustiger stadje aan de Costa Dorada, ten zuiden van Salou.',
    },
    peniscola: {
      place: 'Peñíscola',
      route: 'Barcelona naar Peñíscola',
      blurb: 'Kasteelstadje aan de Costa del Azahar.',
    },
    reus: {
      place: 'Reus',
      route: 'Barcelona naar Reus',
      blurb: 'Luchthaven en stad Reus, landinwaarts vanaf Salou.',
    },
    montserrat: {
      place: 'Montserrat',
      route: 'Barcelona naar Montserrat',
      blurb: 'Het bergklooster, ongeveer een uur van de stad.',
      body: [
        'Montserrat is de populairste dagtocht vanuit Barcelona: een benedictijner klooster in een gekarteld rotsmassief, ongeveer een uur landinwaarts.',
        'Met het openbaar vervoer neemt u eerst de trein en daarna een tandradbaan of een kabelbaan, elk met een eigen wachtrij. Een auto rijdt rechtstreeks naar de parkeerplaats bij het klooster, wat telt als u er wilt zijn voordat de touringcars arriveren.',
        'De meeste gasten boeken een retour met wachttijd, meestal drie tot vier uur bij het klooster, zodat dezelfde chauffeur hen terugbrengt. Laat ons weten hoe lang u wilt blijven en wij berekenen het als één rit.',
        'Montserrat ligt buiten de taximeterzone, dus de rit wordt tegen een vaste prijs inclusief wachttijd geoffreerd in plaats van via de taximeter berekend.',
      ],
    },
    andorra: {
      place: 'Andorra',
      route: 'Barcelona naar Andorra',
      blurb: 'Drie uur de Pyreneeën in, voor skiën of winkelen.',
      body: [
        'Andorra ligt op ongeveer drie uur van Barcelona, en de weg klimt gestaag de Pyreneeën in. In de winter is het een vaste rit naar de skioorden en het hele jaar door naar de belastingvrije winkels.',
        'De route steekt een landsgrens over. Neem paspoorten of identiteitskaarten mee voor iedereen die meereist: de controles zijn meestal snel, maar ze komen voor, en teruggestuurd worden is een dure manier om dat te leren.',
        'In de winter kan de laatste klim sneeuwkettingen of winterbanden vereisen. Wij wijzen een voertuig toe dat is uitgerust voor de omstandigheden en sturen in februari geen gewone stadsauto een berg op.',
        'Voor skigroepen biedt de V-Class plaats aan zeven personen met bagage, maar ski’s en snowboards moet u bij het boeken opgeven, zodat wij het juiste voertuig toewijzen. Dit is een route met een vaste prijs, voor vertrek geoffreerd.',
      ],
    },
    'la-molina': {
      place: 'La Molina',
      route: 'Barcelona naar La Molina',
      blurb: 'Skioord in de Pyreneeën, ongeveer twee uur rijden.',
    },
    'vall-de-nuria': {
      place: 'Vall de Núria',
      route: 'Barcelona naar Vall de Núria',
      blurb: 'Bergheiligdom dat u met een tandradtrein bereikt.',
    },
    'baqueira-beret': {
      place: 'Baqueira Beret',
      route: 'Barcelona naar Baqueira Beret',
      blurb: 'Het grootste skigebied van de Spaanse Pyreneeën.',
    },
    valencia: {
      place: 'Valencia',
      route: 'Barcelona naar Valencia',
      blurb: 'Drieënhalf uur langs de kust, van deur tot deur.',
      body: [
        'Valencia ligt ongeveer 350 km ten zuiden van Barcelona, zo’n drieënhalf uur over de snelweg. Het is een lange transfer, en voor de meeste reizigers is de AVE-trein de verstandige keuze.',
        'Een privéauto verdient zijn plek in specifieke situaties: een groep van zes of zeven personen voor wie losse treinkaartjes flink oplopen, een aankomst te laat voor de laatste trein, bagage of apparatuur die slecht met de trein reist, of de wens om aan beide kanten van deur tot deur te reizen.',
        'Wij rijden rechtstreeks door, met een pauze voor comfort, en kunnen u afzetten op elk adres in de stad, bij de haven voor een cruise of op luchthaven Valencia.',
        'Dit is altijd een rit met een vooraf geoffreerde vaste prijs. Stuur ons een bericht met uw data en groepsgrootte en wij bevestigen het.',
      ],
    },
    'la-roca-village': {
      place: 'La Roca Village',
      route: 'La Roca Village',
      blurb: 'Het outletdorp, ongeveer 40 minuten naar het noorden.',
      body: [
        'La Roca Village is een designer-outlet op ongeveer 40 minuten ten noorden van Barcelona en een van de meest gevraagde bestemmingen die niet de luchthaven zijn.',
        'De shuttlebus vanuit de stad werkt prima, maar bindt u aan een vast terugkeertijdstip, en dat is bij een winkeltrip juist de verkeerde beperking. Een privéauto wacht op u.',
        'De meeste boekingen zijn een retour met wachttijd, meestal drie tot vijf uur. Wij berekenen het als één rit inclusief het wachten, en er is ruimte voor de tassen op de terugweg.',
        'Het dorp ligt buiten de AMB-taximeterzone, dus de prijs is vast en wordt bevestigd voordat u reist.',
      ],
    },
    alicante: {
      place: 'Alicante',
      route: 'Barcelona naar Alicante',
      blurb: 'Costa Blanca, ongeveer vijf uur naar het zuiden.',
    },
    zaragoza: {
      place: 'Zaragoza',
      route: 'Barcelona naar Zaragoza',
      blurb: 'De hoofdstad van Aragón, ruwweg drie uur landinwaarts.',
    },
    madrid: {
      place: 'Madrid',
      route: 'Barcelona naar Madrid',
      blurb: 'Lange rit naar de hoofdstad.',
    },
    marbella: {
      place: 'Marbella',
      route: 'Barcelona naar Marbella',
      blurb: 'Costa del Sol, een reis van een hele dag.',
    },
    malaga: {
      place: 'Málaga',
      route: 'Barcelona naar Málaga',
      blurb: 'Andalusische kust, transfer over lange afstand.',
    },
  },
  groups: {
    'costa-brava': {
      title: 'Transfers naar de Costa Brava',
      intro:
        'Privétransfers van Barcelona naar Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués en de rest van de Costa Brava.',
    },
    'south-and-theme-parks': {
      title: 'Zuidkust van Barcelona en pretparken',
      intro:
        'Taxi- en minivantransfers naar Sitges, Tarragona, Salou, PortAventura, Cambrils en de kust ten zuiden van de stad.',
    },
    'mountains-and-ski': {
      title: 'Transfers naar bergen, natuur en skigebieden',
      intro:
        'Privéchauffeurs naar Montserrat, Andorra, de skioorden en bergdorpen, ook voor flexibele dagtochten.',
    },
    'long-distance': {
      title: 'Transfers over lange afstand',
      intro:
        'Directe privétaxi- en minivantransfers van Barcelona naar grote Spaanse steden.',
    },
  },
};
