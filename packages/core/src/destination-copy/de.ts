import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "de" locale, keyed by destination slug and group
 * slug. Checked by the parity test in translation-parity.test.ts.
 */
export const DE_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: 'Costa Brava',
      route: 'Barcelona zur Costa Brava',
      blurb:
        'Transfers von El Prat bis vor die Tür Ihres Hotels an der Costa Brava, mit Platz für das Gepäck der ganzen Familie.',
      body: [
        'Die Costa Brava beginnt gut eine Autostunde nördlich von Barcelona und zieht sich bis zur französischen Grenze, und fast alle Gäste reisen über El Prat an. Die Küstenstraße ist unkompliziert, aber es ist eine echte Reise und kein Stadtsprung: Rechnen Sie mit rund 80 Minuten bis Lloret de Mar und eher zwei Stunden bis zu den Buchten im Norden.',
        'Ein privater Transfer lohnt sich hier mehr als auf einer Stadtfahrt. In die meisten Badeorte fährt kein direkter Zug, die Reisebusse halten nur in den größeren, und das letzte Stück zu einem Hotel am Hang oder einer Villa außerhalb des Ortes legt man mit Koffern kaum zu Fuß zurück. Ihr Fahrer bringt Sie bis vor die Tür.',
        'Wir holen Sie mit Namensschild in der Ankunftshalle ab und verfolgen Ihren Flug, sodass eine verspätete Landung Sie nicht den Wagen kostet. Für Gruppen fasst der Mercedes Vito oder die V-Class sechs beziehungsweise sieben Personen samt passendem Gepäck, was meist günstiger ist als zwei getrennte Fahrzeuge und deutlich einfacher.',
        'Da die Costa Brava außerhalb des Großraums Barcelona liegt, wird die Fahrt nicht nach dem Taxameter der AMB abgerechnet. Wir nennen Ihnen vor der Buchung einen Festpreis für die Strecke, schriftlich bestätigt, sodass am Ziel nichts weiter zu klären ist als das, was Sie vereinbart haben.',
      ],
    },
    girona: {
      place: 'Girona',
      route: 'Barcelona nach Girona',
      blurb:
        'Stadtzentrum, Flughafen Girona oder Altstadt: eine direkte Fahrt nach Norden ohne Umsteigen.',
      body: [
        'Girona liegt rund 100 km nördlich von Barcelona und ist auf der Straße in etwas mehr als einer Stunde erreicht. Es ist aus ganz unterschiedlichen Gründen ein häufiges Ziel: die Stadt selbst, der Flughafen, der ihren Namen trägt, und die Kathedralentreppe, die einen steten Strom von Besuchern anzieht.',
        'Der Zug ist zwischen den beiden Stadtzentren schnell, hilft Ihnen aber nicht, wenn Sie in El Prat mit Gepäck starten, spät ankommen oder nicht zum Bahnhof wollen. Ein privates Auto erspart das Umsteigen an beiden Enden.',
        'Der Flughafen Girona liegt weitere 15 Minuten hinter der Stadt und bedient einen großen Teil des Charterverkehrs an die Costa Brava. Wenn Sie zwischen El Prat und dem Flughafen Girona umsteigen, nennen Sie uns beide Flugnummern, dann planen wir einen sinnvollen Puffer ein.',
        'Diese Strecke liegt außerhalb der Taxameterzone der AMB, deshalb bestätigen wir vorab einen Festpreis. Die Fahrzeuge reichen vom normalen Viersitzer-Taxi bis zur siebensitzigen V-Class für Familien und Gruppen.',
      ],
    },
    'lloret-de-mar': {
      place: 'Lloret de Mar',
      route: 'Barcelona nach Lloret de Mar',
      blurb: 'Der belebteste Badeort der Costa Brava, rund 70 Minuten von El Prat entfernt.',
      body: [
        'Lloret de Mar ist der bekannteste Badeort der Costa Brava und eine unserer häufigsten Langstreckenfahrten. Außerhalb der Stoßzeiten dauert die Fahrt ab El Prat etwa 70 Minuten.',
        'Reisebusse fahren in der Saison nach Lloret, aber nach Fahrplan und bis zu einer zentralen Haltestelle, was lästig ist, wenn Ihr Hotel auf einem der Hügel über der Bucht liegt. Ein privater Transfer endet am Eingang.',
        'Für Gruppen, die gemeinsam ankommen, ist ein Minivan mit sechs oder sieben Sitzen meist die bessere Lösung als mehrere Autos und hält alle auf demselben Zeitplan.',
        'Die Strecke liegt außerhalb der Taxameterzone der AMB, daher ist der Preis fest und im Voraus vereinbart und wird nicht nach dem Taxameter berechnet.',
      ],
    },
    'tossa-de-mar': {
      place: 'Tossa de Mar',
      route: 'Barcelona nach Tossa de Mar',
      blurb: 'Ummauerte Altstadt und ruhigere Strände, rund 80 Minuten entfernt.',
      body: [
        'Tossa de Mar ist der ruhigere Nachbar von Lloret und bekannt für seine ummauerte Altstadt über dem Strand. Vom Flughafen Barcelona sind es rund 80 Minuten.',
        'Die letzte Etappe entlang der Küstenstraße ist landschaftlich schön, aber langsam, und mit öffentlichen Verkehrsmitteln müssen Sie mindestens einmal umsteigen. Die meisten Gäste finden ein direktes Auto nach einem Flug sein Geld wert.',
        'Die Altstadt selbst ist weitgehend Fußgängerzone, deshalb vereinbaren wir bei der Buchung mit Ihnen den nächstgelegenen erreichbaren Absetzpunkt, statt bei der Ankunft zu improvisieren.',
        'Der Preis ist auf dieser Strecke fest und wird vor der Reise bestätigt, da sie jenseits der Zone der AMB liegt.',
      ],
    },
    blanes: {
      place: 'Blanes',
      route: 'Barcelona nach Blanes',
      blurb: 'Das südliche Tor zur Costa Brava, rund eine Stunde entfernt.',
      body: [
        'Blanes bildet das südliche Ende der Costa Brava und ist der Barcelona am nächsten gelegene der größeren Badeorte, auf der Straße rund eine Stunde entfernt.',
        'Der Ort hat einen Bahnhof und ist damit eine der besser erreichbaren Städte der Costa Brava, doch die Verbindung vom Flughafen bedeutet weiterhin Umsteigen und am Ende einen Fußweg.',
        'Wir holen Sie in der Ankunftshalle oder an jeder Adresse in Barcelona ab und fahren direkt durch, was Familien und alle mit Strandgepäck entgegenkommt.',
        'Wie an der übrigen Küste ist der Fahrpreis ein genannter Festpreis und keine Taxameteranzeige.',
      ],
    },
    cadaques: {
      place: 'Cadaqués',
      route: 'Barcelona nach Cadaqués',
      blurb: 'Der hohe Norden hinter dem Cap de Creus, rund zweieinhalb Stunden Fahrt.',
      body: [
        'Cadaqués ist das abgelegenste Dorf der Costa Brava und wird über das Kap Cap de Creus auf einer kurvigen Bergstraße erreicht. Rechnen Sie mit rund zweieinhalb Stunden ab Barcelona.',
        'Es gibt keinerlei Bahnanbindung, und der Busverkehr ist eingeschränkt und langsam. Für die meisten Reisenden ist ein privater Transfer die einzige praktische Möglichkeit, zu einer vernünftigen Uhrzeit anzukommen.',
        'Die Straße über den Pass ist schmal und wird am besten von jemandem gefahren, der sie kennt, besonders nach Einbruch der Dunkelheit. Unsere Fahrer fahren diese Strecke regelmäßig.',
        'Bei dieser Entfernung ist es immer eine Fahrt zum Festpreis, der im Voraus vereinbart wird. Fragen Sie uns per WhatsApp nach einem Angebot für Ihre Reisedaten.',
      ],
    },
    roses: {
      place: 'Roses',
      route: 'Barcelona nach Roses',
      blurb: 'Ferienort an der Bucht von Roses im äußersten Norden der Costa Brava.',
    },
    empuriabrava: {
      place: 'Empuriabrava',
      route: 'Barcelona nach Empuriabrava',
      blurb: 'Die Kanalstadt am Golf von Roses.',
    },
    begur: {
      place: 'Begur',
      route: 'Barcelona nach Begur',
      blurb: 'Ein Dorf auf dem Hügel mit den Buchten darunter.',
    },
    'calella-de-palafrugell': {
      place: 'Calella de Palafrugell',
      route: 'Barcelona nach Calella de Palafrugell',
      blurb: 'Weiß getünchtes Fischerdorf an der mittleren Costa Brava.',
    },
    sitges: {
      place: 'Sitges',
      route: 'Barcelona nach Sitges',
      blurb: 'Der Barcelona nächstgelegene Badeort, etwa 25 Minuten von El Prat entfernt.',
      body: [
        'Sitges ist die kürzeste unserer Langstreckenfahrten und die am häufigsten gebuchte. Von El Prat sind es rund 25 Minuten, aus dem Zentrum von Barcelona eher 40.',
        'Der Ort ist ein fester Bestandteil von Strandwochenenden, von Konferenzgästen, die außerhalb der Stadt wohnen, und vom Festivalkalender. Er ist ab Barcelona Sants gut per Zug erreichbar, vom Flughafen aber nicht, weshalb die meisten Ankommenden ein direktes Auto vorziehen.',
        'Das Zentrum hat enge Einbahnstraßen und teils eingeschränkte Zufahrt. Wir vereinbaren bei der Buchung einen praktikablen Absetzpunkt, damit vor der Haustür nichts geklärt werden muss.',
        'Sitges liegt knapp außerhalb der Taxameterzone der AMB, daher wird die Fahrt zum Festpreis angeboten und nicht nach dem Taxameter berechnet. Fragen Sie per WhatsApp an, wir bestätigen vor Ihrer Reise.',
      ],
    },
    tarragona: {
      place: 'Tarragona',
      route: 'Barcelona nach Tarragona',
      blurb: 'Römerstadt und Kreuzfahrthafen, rund 75 Minuten südlich.',
      body: [
        'Tarragona liegt etwa 100 km südlich von Barcelona, auf der Autobahn rund 75 Minuten entfernt. Besucher kommen wegen des römischen Amphitheaters und der Altstadt, und zunehmend auch als Kreuzfahrthafen für sich.',
        'Kreuzfahrttransfers sind die zeitkritischste Variante dieser Fahrt. Wenn Sie zu einem Schiff fahren, planen wir einen Puffer ein und bestätigen das Terminal, denn eine verpasste Abfahrt ist nicht wiedergutzumachen.',
        'Die Stadt ist außerdem das Tor zu den Stränden der Costa Dorada, und viele Gäste verbinden beides: Wir können Sie auf dem Weg an einem Hotel an der Küste absetzen.',
        'Diese Strecke liegt jenseits der Taxameterzone der AMB, daher nennen wir im Voraus einen Festpreis, statt das Taxameter laufen zu lassen.',
      ],
    },
    salou: {
      place: 'Salou',
      route: 'Barcelona nach Salou',
      blurb: 'Ferienort an der Costa Dorada neben PortAventura.',
    },
    portaventura: {
      place: 'PortAventura',
      route: 'Barcelona nach PortAventura',
      blurb: 'Direkter Transfer bis zum Eingang des Freizeitparks.',
    },
    cambrils: {
      place: 'Cambrils',
      route: 'Barcelona nach Cambrils',
      blurb: 'Ruhigerer Ort an der Costa Dorada südlich von Salou.',
    },
    peniscola: {
      place: 'Peñíscola',
      route: 'Barcelona nach Peñíscola',
      blurb: 'Burgstadt an der Costa del Azahar.',
    },
    reus: {
      place: 'Reus',
      route: 'Barcelona nach Reus',
      blurb: 'Flughafen und Stadt Reus, im Landesinneren hinter Salou.',
    },
    montserrat: {
      place: 'Montserrat',
      route: 'Barcelona nach Montserrat',
      blurb: 'Das Bergkloster, rund eine Stunde von der Stadt entfernt.',
      body: [
        'Montserrat ist der beliebteste Tagesausflug ab Barcelona: ein Benediktinerkloster in einem zerklüfteten Felsmassiv, etwa eine Stunde im Landesinneren.',
        'Mit öffentlichen Verkehrsmitteln brauchen Sie einen Zug und dann entweder eine Zahnradbahn oder eine Seilbahn, jeweils mit eigener Warteschlange. Ein Auto fährt direkt zum Parkplatz des Klosters, was zählt, wenn Sie vor den Reisebussen dort sein wollen.',
        'Die meisten Gäste buchen die Fahrt als Hin- und Rückfahrt mit Wartezeit, typischerweise drei bis vier Stunden vor Ort, sodass derselbe Fahrer sie zurückbringt. Sagen Sie uns, wie lange Sie bleiben möchten, und wir berechnen es als eine Fahrt.',
        'Montserrat liegt außerhalb der Taxameterzone, daher wird die Fahrt zu einem Festpreis inklusive Wartezeit angeboten und nicht nach dem Taxameter berechnet.',
      ],
    },
    andorra: {
      place: 'Andorra',
      route: 'Barcelona nach Andorra',
      blurb: 'Drei Stunden bis in die Pyrenäen, zum Skifahren oder Einkaufen.',
      body: [
        'Andorra liegt etwa drei Stunden von Barcelona entfernt, die Straße steigt stetig in die Pyrenäen an. Im Winter ist es eine regelmäßige Fahrt zu den Skigebieten, das ganze Jahr über eine zum zollfreien Einkaufen.',
        'Die Strecke überquert eine Staatsgrenze. Nehmen Sie für alle Mitreisenden Reisepässe oder nationale Personalausweise mit: Die Kontrollen gehen meist schnell, kommen aber vor, und zurückgewiesen zu werden ist eine teure Art, das zu lernen.',
        'Im Winter kann für den letzten Anstieg eine Schneekettenpflicht oder Winterbereifung nötig sein. Wir teilen ein für die Bedingungen ausgerüstetes Fahrzeug zu, statt im Februar einen gewöhnlichen Stadtwagen den Berg hinaufzuschicken.',
        'Für Skigruppen nimmt die V-Class sieben Personen mit Gepäck auf; Skier und Snowboards müssen Sie bei der Buchung angeben, damit wir das passende Fahrzeug zuteilen. Diese Strecke hat einen Festpreis, der vor der Reise genannt wird.',
      ],
    },
    'la-molina': {
      place: 'La Molina',
      route: 'Barcelona nach La Molina',
      blurb: 'Skigebiet in den Pyrenäen, rund zwei Stunden entfernt.',
    },
    'vall-de-nuria': {
      place: 'Vall de Núria',
      route: 'Barcelona nach Vall de Núria',
      blurb: 'Bergheiligtum, das mit der Zahnradbahn erreicht wird.',
    },
    'baqueira-beret': {
      place: 'Baqueira Beret',
      route: 'Barcelona nach Baqueira Beret',
      blurb: 'Das größte Skigebiet der spanischen Pyrenäen.',
    },
    valencia: {
      place: 'Valencia',
      route: 'Barcelona nach Valencia',
      blurb: 'Dreieinhalb Stunden an der Küste entlang, von Tür zu Tür.',
      body: [
        'Valencia liegt etwa 350 km südlich von Barcelona, auf der Autobahn rund dreieinhalb Stunden entfernt. Es ist ein langer Transfer, und für die meisten Reisenden ist der Hochgeschwindigkeitszug AVE die vernünftige Wahl.',
        'Ein privates Auto lohnt sich in bestimmten Fällen: bei einer Gruppe von sechs oder sieben, bei der sich einzelne Zugtickets summieren, bei einer Ankunft nach dem letzten Zug, bei Gepäck oder Ausrüstung, die sich schlecht mit der Bahn transportieren lässt, oder wenn Sie an beiden Enden von Tür zu Tür fahren möchten.',
        'Wir fahren direkt durch, mit einer Pause zur Erholung, und setzen Sie an jeder Adresse in der Stadt ab, am Hafen für eine Kreuzfahrt oder am Flughafen Valencia.',
        'Es ist immer eine Fahrt zum Festpreis, der im Voraus genannt wird. Schreiben Sie uns Ihre Reisedaten und die Gruppengröße, dann bestätigen wir.',
      ],
    },
    'la-roca-village': {
      place: 'La Roca Village',
      route: 'La Roca Village',
      blurb: 'Das Outlet-Einkaufsdorf, rund 40 Minuten nördlich.',
      body: [
        'La Roca Village ist ein Designer-Outlet etwa 40 Minuten nördlich von Barcelona und eines der am häufigsten angefragten Ziele ohne Flughafen, die wir fahren.',
        'Der Shuttlebus ab der Stadt funktioniert recht gut, bindet Sie aber an eine feste Rückfahrzeit, und das ist bei einem Einkaufsausflug die falsche Einschränkung. Ein privates Auto wartet auf Sie.',
        'Die meisten Buchungen sind eine Hin- und Rückfahrt mit Wartezeit, häufig drei bis fünf Stunden. Wir berechnen sie als eine einzige Fahrt inklusive Wartezeit, und auf dem Rückweg ist Platz für die Einkaufstüten.',
        'Das Dorf liegt außerhalb der Taxameterzone der AMB, daher ist der Preis fest und wird vor Ihrer Reise bestätigt.',
      ],
    },
    alicante: {
      place: 'Alicante',
      route: 'Barcelona nach Alicante',
      blurb: 'Costa Blanca, rund fünf Stunden südlich.',
    },
    zaragoza: {
      place: 'Saragossa',
      route: 'Barcelona nach Saragossa',
      blurb: 'Hauptstadt Aragoniens, rund drei Stunden im Landesinneren.',
    },
    madrid: {
      place: 'Madrid',
      route: 'Barcelona nach Madrid',
      blurb: 'Langstreckenfahrt in die Hauptstadt.',
    },
    marbella: {
      place: 'Marbella',
      route: 'Barcelona nach Marbella',
      blurb: 'Costa del Sol, eine Reise über einen ganzen Tag.',
    },
    malaga: {
      place: 'Málaga',
      route: 'Barcelona nach Málaga',
      blurb: 'Andalusische Küste, Langstreckentransfer.',
    },
  },
  groups: {
    'costa-brava': {
      title: 'Transfers an die Costa Brava',
      intro:
        'Private Transfers von Barcelona nach Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués und in die übrigen Orte der Costa Brava.',
    },
    'south-and-theme-parks': {
      title: 'Südlich von Barcelona und Freizeitparks',
      intro:
        'Taxi- und Minivan-Transfers nach Sitges, Tarragona, Salou, PortAventura, Cambrils und an die Küste südlich der Stadt.',
    },
    'mountains-and-ski': {
      title: 'Berge, Natur und Skitransfers',
      intro:
        'Private Fahrer nach Montserrat, Andorra, in die Skigebiete und Bergdörfer, auch für flexible Tagesausflüge.',
    },
    'long-distance': {
      title: 'Langstreckentransfers',
      intro:
        'Direkte private Taxi- und Minivan-Transfers von Barcelona in die großen spanischen Städte.',
    },
  },
};
