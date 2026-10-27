import type { LandingCopy } from '../landing-pages';

/** German long-form copy for the keyword landing pages. */
export const DE_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Flughafen Barcelona Zentrum | Online buchen',
    description:
      'Buchen Sie ein Taxi vom Flughafen Barcelona ins Zentrum. Fester Komplettpreis, El-Prat-Zuschlag bereits enthalten, Fahrer wartet in der Ankunftshalle.',
    h1: 'Taxi vom Flughafen Barcelona ins Zentrum',
    intro:
      'Ein Taxi von El Prat ins Zentrum von Barcelona braucht je nach Verkehr und Terminal 25 bis 35 Minuten. Wer vorab bucht, hat bei der Landung bereits einen zugeteilten Fahrer mit Namensschild in der Ankunftshalle — statt sich am Taxistand von T1 oder T2 anzustellen.',
    sections: [
      {
        h2: 'Was ein Transfer vom Flughafen Barcelona kostet',
        body: 'Ihr Preis ist ein fester Betrag aus unserer eigenen Preisliste, kein Taxameterstand und keine Schätzung — jeder offizielle Zuschlag der Strecke ist bereits darin enthalten. Eine Fahrt vom Flughafen an jeden Ort in Barcelona kostet im Standardtaxi feste 50 EUR, unabhängig von Entfernung und Uhrzeit; an Wochenenden und Feiertagen kommen 7,5 % hinzu. Geben Sie oben Ihr genaues Ziel ein, um Ihren Komplettpreis zu sehen.',
      },
      {
        h2: 'Wo Ihr Fahrer auf Sie wartet',
        body: 'Ihr Fahrer wartet in der Ankunftshalle Ihres Terminals mit einem Namensschild und verfolgt Ihre Flugnummer — eine Verspätung kostet Sie also nicht den Wagen. Der genaue Treffpunkt für T1 und T2 steht in Ihrer Bestätigungsmail.',
      },
      {
        h2: 'Terminal 1 und Terminal 2',
        body: 'Beide Terminals haben offizielle Taxistände, und unsere Fahrer bedienen beide. T1 wickelt den Großteil des Langstreckenverkehrs und von Vueling ab; T2 bedient viele Billigfluggesellschaften. Der Unterschied zwischen beiden ist gering — ein paar Kilometer —, aber T1 liegt etwas weiter von der Stadt entfernt.',
      },
      {
        h2: 'Wie weit die 50 EUR reichen',
        body: 'Ein Preis gilt für jede Adresse im Umkreis von 16 km um das Terminal, in der Luftlinie gemessen und nicht entlang der Straße. Damit ist das ganze Zentrum abgedeckt und fast jeder Ort, an dem Besucher übernachten — Ciutat Vella, der Eixample, Gràcia, Sants, die Uferzone bis Barceloneta und Poblenou und der Park Güell hinter Gràcia mit 14,3 km —, alles zum selben Preis wie ein Hotel am Passeig de Gràcia. Die Luftlinie arbeitet zu Ihren Gunsten, denn die Straße in die Stadt ist deutlich länger als die direkte Linie: Sie muss um den Llobregat herum und über die Gran Via hineinführen, eine entlang der Route gezogene Zone würde das Zentrum ausschließen. Die äußeren nördlichen und östlichen Stadtteile sind dort, wo die Zone endet: La Sagrera mit 16,4 km, das Fòrum mit 17,4, Sant Andreu mit 17,7 und Nou Barris mit 17,9 liegen jenseits davon, ebenso Sant Cugat mit 19,4 und Badalona mit 21,8, und für alle gilt der Listenpreis plus 1,50 EUR für jeden weiteren Kilometer.',
      },
      {
        h2: 'Taxi, Aerobús oder Metro in die Stadt',
        body: 'Der Aerobús kostet pro Person, ein Taxi pro Wagen, und damit ist das meiste schon entschieden. Allein mit Handgepäck ist der Bus günstiger, und zwar deutlich; bei drei Fahrgästen ist der Abstand geschrumpft, bei vier meist verschwunden. Die Linie L9 Sud der Metro ist billiger als beides, verlangt aber einen Umstieg, was mit einer Tasche pro Kopf in Ordnung ist und mit zwei deutlich weniger. Die ehrliche Regel: Zählen Sie Personen und Gepäck. Ein bis zwei von jedem bei Tageslicht, nehmen Sie den Bus. Drei oder mehr Personen, zwei Gepäckstücke pro Kopf oder eine Ankunft nach dem letzten Bus — nehmen Sie ein Taxi.',
      },
    ],
  },

  'city-to-airport': {
    title: 'Taxi Barcelona zum Flughafen | Online buchen',
    description:
      'Buchen Sie ein Taxi von Barcelona zum Flughafen El Prat. Feste Abholzeit, fester Komplettpreis und Fahrer, die die Terminaleinfahrten kennen.',
    h1: 'Taxi von Barcelona zum Flughafen',
    intro:
      'Die Hinfahrt ist die Fahrt, die sich wirklich zu buchen lohnt. Ein vorbestelltes Taxi steht zur vereinbarten Zeit vor Ihrem Hotel oder Apartment — das zählt deutlich mehr, wenn Sie einen Flug erreichen müssen, als bei der Ankunft.',
    sections: [
      {
        h2: 'Wann Sie Ihre Abholung buchen sollten',
        body: 'Für einen europäischen Kurzstreckenflug rechnen Sie zwei Stunden zwischen Ankunft in El Prat und Abflug, bei Langstrecke drei. Rechnen Sie 30 bis 40 Minuten Fahrt aus dem Zentrum dazu, in der werktäglichen Rushhour mehr. Unser Formular verlangt mindestens drei Stunden Vorlauf — buchen Sie also spätestens am Vorabend.',
      },
      {
        h2: 'Absetzen am richtigen Terminal',
        body: 'Nennen Sie uns Ihre Airline, dann setzen wir Sie an der richtigen Tür ab. Die Abflugebene in T1 ist eine einzige große Halle; T2 gliedert sich in die Blöcke A, B und C, und der falsche Block bedeutet einen langen Weg mit Gepäck.',
      },
      {
        h2: 'Frühe Abflüge ab El Prat',
        body: 'Die erste Abflugwelle verlässt El Prat vor 07:00, was Abholungen ab 04:30 bedeutet. Eine Abholung um 04:30 kostet genauso viel wie dieselbe Fahrt mittags, denn die Uhrzeit bewegt einen Festpreis nicht, und wir bestätigen den Fahrer am Vorabend, damit um vier Uhr morgens nichts offen ist.',
      },
      {
        h2: 'Prüfen Sie das Terminal auf der Bordkarte, nicht in der Buchung',
        body: 'T1 und T2 sind nicht zu Fuß voneinander erreichbar. Sie liegen auf gegenüberliegenden Seiten der Start- und Landebahnen, verbunden durch einen kostenlosen Shuttle, der 10 bis 15 Minuten braucht, noch ohne die Wartezeit darauf — rechnen Sie 25 Minuten von Tür zu Tür. Bei einem Abflug zählt das weit mehr als bei einer Ankunft: Wer am falschen Terminal abgesetzt wird, merkt es an einem Check-in-Schalter, der Ihren Flug gar nicht hat. Airlines wechseln das Terminal, wenn sich Verträge ändern, und ein Codeshare folgt der ausführenden Gesellschaft und nicht der Airline auf Ihrer Bestätigung. Deshalb ist das auf Ihrer Bordkarte aufgedruckte Terminal die einzige Quelle, der man trauen sollte. Stimmt es nicht mit dem überein, was Sie uns genannt haben, antworten Sie auf Ihre Bestätigung, und wir ändern es kostenlos.',
      },
      {
        h2: 'Wenn sich Ihre Pläne vor der Abholung ändern',
        body: 'Sie können die Angaben innerhalb von 30 Minuten nach der Buchung selbst ändern und danach bis zur Abfahrt Ihres Fahrers — antworten Sie auf Ihre Bestätigung oder schreiben Sie uns per WhatsApp. Eine andere Abholzeit, ein anderes Terminal oder eine andere Adresse kostet nichts, und ein falsches Terminal ist die häufigste Korrektur, die wir vornehmen. Fällt die Reise ganz aus, stornieren Sie mindestens 24 Stunden vor der Abholung, und der gesamte Betrag wird auf die verwendete Karte zurückerstattet, normalerweise innerhalb von fünf bis zehn Werktagen. Innerhalb dieser 24 Stunden versuchen wir weiterhin zu helfen, aber eine Erstattung erfolgt dann nicht mehr automatisch.',
      },
      {
        h2: 'Das Fahrzeug bei viel Gepäck wählen',
        body: 'Zählen Sie die Koffer, bevor Sie wählen. Ein Viersitzer-Taxi nimmt etwa drei große Koffer auf, der sechssitzige Vito sechs und die siebensitzige V-Class sieben. Bei einem Abflug mit schwerem Gepäck lohnen sich die 20 bis 25 EUR Aufpreis für ein größeres Fahrzeug, denn die Alternative ist, mit einem Koffer auf dem Schoß am Terminal anzukommen.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Flughafen El Prat | Lizenzierte Transfers',
    description:
      'Lizenzierte Taxis von und zum Flughafen Barcelona-El Prat (BCN). Online buchen zum Festpreis, mit einem Ihrem Flug zugeteilten Fahrer.',
    h1: 'Taxi Flughafen El Prat',
    intro:
      'Der Flughafen Josep Tarradellas Barcelona-El Prat, den fast alle weiterhin schlicht El Prat nennen, liegt rund 15 km südwestlich der Stadt. Er ist der zweitgrößte Flughafen Spaniens, und das Taxi ist zu fast jeder Stunde der schnellste Weg nach Barcelona — sofern ein Wagen bereitsteht.',
    sections: [
      {
        h2: 'Taxi zum Flughafen Barcelona vorab buchen statt am Stand',
        body: 'Der offizielle Stand in El Prat ist gut organisiert und bewegt sich meist zügig. Er staut sich zu vorhersehbaren Zeiten: bei den Ankunftswellen am späten Vormittag, sonntagabends und wenn mehrere Langstreckenflüge gleichzeitig landen. Eine Vorabbuchung nimmt dieses Risiko vollständig heraus, legt Ihren Fahrer im Voraus fest und legt Ihren Preis fest, bevor Sie reisen.',
      },
      {
        h2: 'Der Flughafenzuschlag in El Prat',
        body: 'Der offizielle Flughafenzuschlag und jede andere für die Strecke geltende Gebühr sind in dem Festpreis enthalten, den wir Ihnen nennen. Auf Ihrer Fahrt läuft kein Taxameter und am Ende steht kein zweiter Betrag, also kann nichts überraschen.',
      },
      {
        h2: 'Kreuzfahrtgäste und der Hafen',
        body: 'Für Gäste mit Anschluss an eine Kreuzfahrt hat die Fahrt zwischen El Prat und dem Kreuzfahrtterminal Moll Adossat einen eigenen Festpreis, getrennt vom Stadtpreis ausgewiesen. Geben Sie das Kreuzfahrtterminal als Ziel ein, und die Schätzung wechselt automatisch auf diesen Preis.',
      },
      {
        h2: 'Welches Fahrzeug Sie für Ihr Gepäck brauchen',
        body: 'Wählen Sie nach Koffern, nicht nach Köpfen. Ein Viersitzer-Taxi befördert vier Personen, aber nur etwa drei große Koffer — der Kofferraum eines Corolla oder eines SEAT Toledo ist die eigentliche Grenze, und sie wird bei der Buchung von zu Hause aus am häufigsten falsch eingeschätzt. Vier Erwachsene mit je einem großen Koffer brauchen den sechssitzigen Mercedes Vito, der sechs Personen und sechs Gepäckstücke aufnimmt; darüber nimmt die siebensitzige V-Class sieben von beidem mit. Etwas Sperriges — ein Fahrrad, Skier, ein Surfbrett — gehört in die Buchungsnotizen statt in die Hoffnung, ein größeres Auto werde schon reichen, denn die richtige Antwort ist manchmal ein bestimmtes Fahrzeug und nicht einfach ein geräumigeres.',
      },
      {
        h2: 'Abholung an Terminal 1 und Terminal 2',
        body: 'Ein gebuchter Transfer nutzt den Taxistand nicht. Ihr Fahrer wartet in der Ankunftshalle, auf der öffentlichen Seite des Ausgangs der Gepäckausgabe, mit einem Schild mit Ihrem Namen — nicht am Bordstein und nicht in der Schlange. T2 gliedert sich entlang der Gebäudefront in die Blöcke A, B und C; wenn Sie Ihren Block bei der Buchung angeben, steht Ihr Fahrer dort, wo Sie herauskommen, und nicht dreihundert Meter weiter an der Fassade. Der Fahrer verfolgt Ihre Flugnummer, sodass eine späte Landung die Abholung verschiebt, statt sie zu verlieren, und die Telefonnummer in Ihrer Bestätigung erreicht ihn direkt statt eines Büros.',
      },
      {
        h2: 'Späte Ankünfte und verspätete Flüge',
        body: 'Eine gebuchte Abholung folgt Ihrem Flug, nicht dem Fahrplan. Landen Sie Stunden zu spät, ist der Fahrer trotzdem da, für eine verspätete Landung fällt keine Wartegebühr an, und bei Ihrer Ankunft muss nichts neu verhandelt werden. Wird der Flug ganz gestrichen, sagen Sie uns Bescheid, und der gesamte Betrag wird erstattet.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Taxipreis Flughafen Barcelona | Festpreise 2026',
    description:
      'Was ein Taxi zum Flughafen Barcelona wirklich kostet: unsere Festpreise je Fahrzeug und was Wochenend- und Außerzonen-Tarif hinzufügen.',
    h1: 'Taxipreis zum Flughafen Barcelona',
    intro:
      'Ein Flughafentransfer in Barcelona kostet bei uns einen Festpreis, der vor der Buchung feststeht und mit ihr gesichert wird. Kein Taxameter, kein Rätselraten über die Entfernung und nichts, was im Wagen abzurechnen wäre. Hier die ganze Liste und die drei Dinge, die sie erhöhen können.',
    sections: [
      {
        h2: 'Wie Ihr Fahrpreis zustande kommt',
        body: 'Ein Transfer ist ein Festpreis, bestimmt durch Strecke und Fahrzeug, nicht durch Entfernung oder Uhrzeit. Vom Flughafen an jeden Ort in Barcelona ist es ein Betrag, vom Flughafen zum Kreuzfahrtterminal ein anderer, und Standardtaxi, Sechssitzer und Siebensitzer haben jeweils ihren eigenen. Nur drei Dinge können hinzukommen: ein Ziel jenseits der Pauschalzone, ein Transfer zum Kreuzfahrthafen und der Wochenend- und Feiertagstarif. Jedes erscheint vor der Zahlung als eigene Zeile.',
      },
      {
        h2: 'Gibt es ein günstiges Taxi ab dem Flughafen?',
        body: 'Vergleichen Sie danach, wovor der Preis Sie schützt, nicht nur nach der Zahl. Ein Festpreis bewegt sich nach der Zusage nicht mehr: Verkehr, ein Umweg, eine verspätete Landung und die Tageszeit sind unser Problem, nicht Ihres, und im Auto wird nichts eingesammelt. Steuern können Sie das Fahrzeug und die Reise außerhalb des Wochenendfensters. Seien Sie bei einem auffällig niedrigen Preis misstrauisch — meist steht dahinter ein nicht lizenziertes Fahrzeug oder ein Betrag, der bis zu Ihrer Ankunft wächst.',
      },
      {
        h2: 'Wie weit der Festpreis reicht',
        body: 'Der Stadtpreis deckt alles im Umkreis von 16 km um das Terminal ab, also ganz Barcelona und die unmittelbaren Nachbargemeinden: eine kurze Fahrt nach El Prat Ort und eine Querung der Stadt bis zum Park Güell kosten dasselbe. Jenseits dieses Umkreises gilt der Festpreis weiter, und nur die darüber hinausgehenden Kilometer kommen hinzu, zu einem veröffentlichten Satz.',
      },
      {
        h2: 'Was Ihr Preis enthält',
        body: 'Sie zahlen bei der Reservierung online einen einzigen Komplettpreis. Er deckt die Fahrt ab, jeden offiziellen Zuschlag, der für Ihre Route gilt, und unseren Service für Organisation und Zusage des Wagens. Es gibt keinen zweiten Betrag: Im Taxi ist nichts zu zahlen, und die Quittung über den vollen Preis erhalten Sie per E-Mail.',
      },
      {
        h2: 'Was Ihren Preis nie verändert',
        body: 'Nicht die Tageszeit: Eine Abholung um 04:30 für einen frühen Abflug kostet genau so viel wie eine Fahrt um 14 Uhr, denn ein Festpreis kennt keinen Nachttarif. Nicht der Verkehr, nicht die Route, die Ihr Fahrer wählt, nicht das Terminal, an dem Sie landen, nicht die Zahl der Fahrgäste bis zur Kapazität des Fahrzeugs und nicht die Menge des Gepäcks darin. Wochenenden und Feiertage sind das Einzige, was einen Listenpreis anhebt, um einen veröffentlichten Prozentsatz statt eines Aufschlags, der mit der Nachfrage schwankt. Alles andere ist unser Risiko und nicht Ihres, und genau das kauft man mit einem im Voraus festgelegten Preis.',
      },
      {
        h2: 'Wie und wann Sie zahlen',
        body: 'Der gesamte Preis wird bei der Buchung online per Karte oder Bizum bezahlt, und eine Quittung über den vollen Betrag kommt mit Ihrer Bestätigung per E-Mail. Im Wagen wird nichts kassiert, also müssen Sie weder Bargeld suchen noch hoffen, dass das Kartenlesegerät am Bordstein funktioniert.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcelona Flughafen | Tür zu Tür',
    description:
      'Buchen Sie ein Taxi von Ihrem Hotel in Barcelona zum Flughafen El Prat oder zurück an die Hoteltür. Tür zu Tür, lizenziert, zum Festpreis.',
    h1: 'Hotel-Flughafen-Transfers in Barcelona',
    intro:
      'Die meisten unserer Buchungen sind Hoteltransfers, in beide Richtungen. Ein Tür-zu-Tür-Taxi nimmt den Teil der Reise heraus, den man am meisten unterschätzt: das Gepäck von der Lobby bis zu einem Taxistand zu schleppen — oder nach einem langen Flug die richtige Adresse zu finden.',
    sections: [
      {
        h2: 'Taxi vom Hotel zum Flughafen Barcelona',
        body: 'Nennen Sie uns den Hotelnamen, um den Rest kümmern wir uns. In den engen Gassen des Gotischen Viertels und von El Born, wo Autos nicht immer bis zum Eingang kommen, vereinbaren wir den nächstgelegenen erreichbaren Abholpunkt vorab, statt es am Tag selbst dem Zufall zu überlassen.',
      },
      {
        h2: 'Flughafentransfer zum Hotel bei der Ankunft',
        body: 'In der Gegenrichtung empfängt Sie Ihr Fahrer in der Ankunftshalle mit Namensschild und bringt Sie direkt bis zum Hoteleingang. Wertvoll mit Kindern, schwerem Gepäck oder bei einer späten Landung.',
      },
      {
        h2: 'Apartments und Ferienwohnungen',
        body: 'Dasselbe gilt für Kurzzeitapartments und Airbnb-Adressen. Tragen Sie den Türcode oder den genauen Eingang in die Buchungsnotizen ein, dann liegt Ihrem Fahrer das vor der Abholung vor.',
      },
      {
        h2: 'Hotels in Straßen, die ein Auto nicht erreicht',
        body: 'Teile Barcelonas sind nicht bis zur Tür befahrbar. Ein großer Teil des Barri Gòtic, die Gassen von El Born und die engen Straßen oberhalb von Gràcia sind Fußgängerzone oder zu eng, als dass ein Taxi dort warten könnte, und eine Hoteladresse in einer davon bedeutet einen Treffpunkt in kurzer Gehentfernung statt an der Rezeption. Nennen Sie uns bei der Buchung den Hotelnamen, dann legen wir diesen Punkt fest und tragen ihn in Ihre Bestätigung ein, statt Ihren Fahrer um einen gesperrten Block kreisen zu lassen, während Sie drinnen warten. Rechnen Sie bei einer Abfahrt von einer solchen Adresse fünf Minuten mehr ein, als die Fahrzeit vermuten lässt.',
      },
      {
        h2: 'Auschecken und wohin mit dem Gepäck',
        body: 'Hotelabreisen ballen sich: Die meisten Check-outs fallen zwischen 10:00 und 12:00 Uhr, genau dann, wenn der Verkehr der Stadt am schwersten vorherzusagen ist. Geht Ihr Flug am frühen Nachmittag, buchen Sie die Abholung zu Beginn dieses Fensters und nicht an seinem Ende. Haben Sie ausgecheckt, die Abholung aber erst später, bewahren die meisten Hotels Gepäck auf, und es lohnt sich, am Vorabend an der Rezeption zu fragen statt am Morgen. Hilfe mit den Taschen in den und aus dem Kofferraum ist im Preis enthalten und wird nie berechnet, ebenso eine angemessene Wartezeit, während Sie die Rechnung begleichen.',
      },
      {
        h2: 'Preis und Zahlung beim Hoteltransfer',
        body: 'Der Preis ist ein fester Komplettpreis aus unserer eigenen Liste, den Sie bei der Buchung online per Karte oder Bizum bezahlen. Im Wagen schulden Sie dem Fahrer nichts. Wer mit der Familie oder einer größeren Gruppe reist, kann bis zu sechs Wagen in einem Checkout gemeinsam buchen.',
      },
      {
        h2: 'Rechnungen für einen Geschäftsaufenthalt',
        body: 'Eine Quittung über den vollen Betrag erreicht Sie mit der Bestätigungsmail, was meist genau das ist, was ein Spesensystem verlangt, und Sie müssen beim Check-out keine Unterlagen an der Hotelrezeption hinterherjagen. Brauchen Sie eine Rechnung mit Mehrwertsteuer und Firmendaten, schicken Sie uns diese per E-Mail, und wir stellen sie unter Ihrer Buchungsnummer aus. Bei einem Aufenthalt mit mehreren Transfers fragen Sie uns, dann stellen wir sie gesammelt in Rechnung statt einzeln.',
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Taxi Bahnhof Sants zum Flughafen Barcelona',
    description:
      'Buchen Sie ein Taxi vom Bahnhof Barcelona-Sants zum Flughafen El Prat. Rund 15 Minuten, fester Komplettpreis inklusive Bahnhofszuschlag.',
    h1: 'Taxi vom Bahnhof Sants zum Flughafen',
    intro:
      'Sants ist der Hauptbahnhof Barcelonas und Ankunftspunkt der AVE-Züge aus Madrid, Valencia und Sevilla. Er ist zugleich der dem Flughafen nächstgelegene große Verkehrsknoten: Die Taxifahrt dauert außerhalb der Stoßzeiten etwa 15 Minuten.',
    sections: [
      {
        h2: 'Der Zuschlag für den Bahnhof Sants',
        body: 'Fahrten, die am Bahnhof Sants beginnen oder enden, enthalten zusätzlich einen kleinen festen Zuschlag, den die AMB festlegt. Zusammen mit dem Flughafenzuschlag sind beide bereits in dem Preis enthalten, den Sie vor der Buchung sehen — danach kommt nichts mehr hinzu.',
      },
      {
        h2: 'Wo Sie Ihren Fahrer in Sants treffen',
        body: 'Der offizielle Taxistand liegt auf der Seite der Plaça dels Països Catalans. Bei einem vorgebuchten Transfer legen wir bei der Buchung einen genauen Treffpunkt fest — in Sants durchaus sinnvoll, denn der Bahnhof ist groß und hat mehrere Ausgänge.',
      },
      {
        h2: 'Anschluss vom AVE',
        body: 'Wenn Sie mit dem AVE ankommen, legen Sie die Abholung etwa 15 Minuten nach der planmäßigen Ankunft, damit Sie mit Gepäck vom Bahnsteig auf die Straße kommen.',
      },
      {
        h2: 'Zug oder Taxi von Sants nach El Prat',
        body: 'Es gibt einen Rodalies-Zug von Sants zum Flughafen, und für eine Person mit leichtem Gepäck ist er mit weitem Abstand die günstigste Möglichkeit. Die Bedingungen zählen: Er fährt direkt zu T2, bei T1 kommt also am anderen Ende der Shuttle dazu, und er verkehrt in einem Takt, der mit einer Stunde Reserve bequem ist und ohne sie unbequem. Ein Taxi kostet pro Wagen statt pro Kopf, endet an der Tür Ihres Terminals und nimmt das Gepäck mit. Für zwei Personen mit Koffern oder alle, die mit einem verspäteten AVE zu einem Flug umsteigen, ist es meist der bessere Kauf — und für eine einzelne Person mit Rucksack und Zeit ist es ehrlich gesagt keiner.',
      },
      {
        h2: 'Wenn der Anschlusszug Verspätung hat',
        body: 'Ein verspäteter Fernzug ist der häufigste Grund, warum ein Transfer ab Sants schiefgeht, und es ist das Einzige, was wir nicht so verfolgen können wie einen Flug. Ist Ihr Anschluss knapp, buchen Sie die Abholung ab der planmäßigen Ankunft und nicht ab der Bahnsteigzeit, auf die Sie hoffen, und schreiben Sie uns per WhatsApp, sobald Sie wissen, dass der Zug Verspätung hat — eine Abholung lässt sich verschieben, solange der Fahrer noch unterwegs ist. Sants hat mehrere Ausgänge zu verschiedenen Straßen, deshalb nennt der Treffpunkt in Ihrer Bestätigung eine bestimmte Tür und nicht den Bahnhof, der davon vier hat.',
      },
      {
        h2: 'An welchem Terminal wir Sie absetzen',
        body: 'Nennen Sie uns Ihre Airline, dann erfolgt das Absetzen an der richtigen Terminaltür. Das zählt von Sants aus mehr als von einem Hotel, denn die Zugalternative fährt zu T2, und ein Abflug von T1 bedeutet am anderen Ende den Shuttle zwischen den Terminals — 25 Minuten von Tür zu Tür, wenn man darauf gewartet hat. Ein Taxi erspart diese Etappe vollständig. T1 hat eine große Abflughalle; T2 besteht aus den Blöcken A, B und C entlang der Fassade, und der falsche Block ist ein langer Weg mit Koffern.',
      },
    ],
  },

  'private-transfer': {
    title: 'Privattransfer Flughafen Barcelona | Ihr eigenes Taxi',
    description:
      'Ein privater Transfer ab dem Flughafen Barcelona: Ihr lizenziertes Taxi allein für Sie, ohne Teilen und ohne Warten, zum Festpreis.',
    h1: 'Privattransfer Flughafen Barcelona',
    intro:
      'Jede Buchung hier ist ein Privattransfer. Das Fahrzeug gehört Ihnen allein: kein Sammelshuttle, keine Umwege zu weiteren Fahrgästen, keine feste Abfahrtszeit. Sie fahren direkt vom Abholpunkt zum Ziel.',
    sections: [
      {
        h2: 'Warum ein privates Taxi vom Flughafen Barcelona',
        body: 'Sammelshuttles sind pro Kopf günstiger, sammeln aber mehrere Parteien ein und setzen sie nacheinander ab, was einer 30-Minuten-Fahrt gut eine Stunde hinzufügen kann. Ab zwei Reisenden schrumpft der Preisabstand deutlich, und für eine Familie mit Gepäck ist ein Privattaxi meist zugleich schneller und einfacher.',
      },
      {
        h2: 'Fahrzeugwahl',
        body: 'Standardtaxi für bis zu vier Personen, Mercedes Vito für sechs, V-Class für sieben mit entsprechendem Gepäck. Jedes hat seinen eigenen Transfer-Festpreis, vor der Buchung nebeneinander sichtbar, sodass Sie Kapazität und Komfort gegen den Betrag abwägen können.',
      },
      {
        h2: 'Geschäftsreisen und Rechnungen',
        body: 'Für Geschäftsreisen können wir die V-Class Premium zuweisen. Die Quittung über den vollen Betrag erhalten Sie per E-Mail mit Ihrer Bestätigung, was Spesen normalerweise brauchen; möchten Sie zusätzlich die offizielle Taxirechnung für die Fahrt selbst, kann Ihr Fahrer sie im Wagen ausstellen.',
      },
      {
        h2: 'Was „privat“ hier bedeutet',
        body: 'Das Auto gehört Ihnen für die Fahrt. Niemand sonst wird mitgenommen, es gibt kein Zusammenlegen mit einer anderen Partei in dieselbe Richtung und kein Warten am Terminal, bis sich ein Fahrzeug füllt — die drei Dinge, die einen billigeren Flughafentransfer billiger machen. Es ist ein lizenziertes Taxi aus Barcelona mit einem im Voraus Ihrer Buchung zugeteilten Fahrer, von Ihrem Abholpunkt zu Ihrem Ziel und nirgendwohin sonst. Das lohnt sich bei einer späten Ankunft mit Kindern und etwas weniger an einem ruhigen Werktagnachmittag allein, und das sagen wir lieber, als zu behaupten, jede Fahrt brauche es.',
      },
      {
        h2: 'Gruppen, die für ein Auto zu groß sind',
        body: 'Über sieben Fahrgäste hinaus brauchen Sie mehr als ein Fahrzeug, und diese lassen sich gemeinsam statt getrennt buchen. Wählen Sie mehrere Wagen in einer einzigen Buchung, werden sie als eine Gruppe reserviert, in einem Checkout bezahlt und zum selben Abholpunkt geschickt, bis zu sechs Wagen. Jeder wird zum veröffentlichten Preis seiner Größe berechnet, eine Gruppe von zehn sind also zwei Wagen zum Listenpreis und kein individuelles Angebot — und die ganze Gruppe wird gemeinsam zugeteilt, was mehr zählt als die Rechnung, wenn zehn Leute um Mitternacht in einer Ankunftshalle stehen.',
      },
      {
        h2: 'Kindersitze und alles Ungewöhnliche',
        body: 'Kindersitze sind nicht serienmäßig eingebaut. Brauchen Sie einen, geben Sie das in den Buchungsnotizen an, dann wird der passende Wagen zugeteilt statt des nächstbesten. Dasselbe gilt für alles, was ändert, welches Fahrzeug kommen sollte: ein zusammengeklappter Rollstuhl, ein Fahrrad, Skier, ein Instrument oder ein Haustier. Mit Vorankündigung ist nichts davon ein Problem, und am Bordstein ist alles davon eins, was das ganze Argument dafür ist, es bei der Buchung zu erwähnen.',
      },
      {
        h2: 'Preis und Zahlung beim Privattransfer',
        body: 'Ein Privattransfer kostet bei uns nicht mehr als jede andere Buchung: Sie zahlen einen festen Komplettpreis aus unserer eigenen Liste, je nach Fahrzeug, online per Karte oder Bizum und schon bei der Buchung. Im Wagen ist nichts zu zahlen, und eine Stornierung mindestens 24 Stunden vor der Abholung wird vollständig erstattet. Die Fahrer warten in der Ankunftshalle mit Namensschild und verfolgen Ihre Flugnummer.',
      },
    ],
  },

  '24-hour-taxi': {
    title: '24-Stunden-Taxi Flughafen Barcelona | Nachttransfers',
    description:
      'Rund-um-die-Uhr-Taxiservice am Flughafen Barcelona. Buchen Sie nächtliche Landungen und Abfahrten vor Sonnenaufgang zum selben Festpreis wie am Tag.',
    h1: '24-Stunden-Taxi am Flughafen Barcelona',
    intro:
      'El Prat arbeitet rund um die Uhr, der Taxiservice ebenso. Die Zeiten, die sich wirklich zu buchen lohnen, sind die unbequemen: Landungen nach Mitternacht und Abflüge, die eine Abholung vor Tagesanbruch verlangen.',
    sections: [
      {
        h2: 'Taxi Flughafen Barcelona rund um die Uhr',
        body: 'Eine Abholung nachts kostet dasselbe wie dieselbe Fahrt mittags: die Uhrzeit bewegt einen Festpreis nicht. Wochenenden und Feiertage schon — Samstag und Sonntag, Weihnachten, Neujahr und der katalanische Kalender fügen jeweils 7,5 % hinzu, vor der Zahlung als eigene Zeile ausgewiesen statt hinterher entdeckt. Drei Nächte tragen darüber hinaus einen zusätzlichen regulierten Zuschlag: Heiligabend, Silvester und die Revetlla de Sant Joan am 23. Juni.',
      },
      {
        h2: 'Späte Ankünfte',
        body: 'Landet Ihr Flug um 01:00 Uhr, ist der Stand in El Prat weiterhin besetzt, doch die Abdeckung dünnt im Lauf der Nacht aus. Ein gebuchter Wagen mit hinterlegter Flugnummer ist der Unterschied zwischen direkt hinausgehen und warten.',
      },
      {
        h2: 'Abfahrten vor Tagesanbruch',
        body: 'Abholungen ab 04:00 Uhr sind für uns Routine. Buchen Sie spätestens am Vorabend, dann bestätigen wir Ihnen den Fahrer per E-Mail — zu dieser Uhrzeit bleibt nichts mehr zu regeln.',
      },
      {
        h2: 'Die Uhrzeit ändert den Preis nicht',
        body: 'Eine Abholung um 03:00 Uhr kostet so viel wie dieselbe Fahrt um drei Uhr nachmittags. Das ist ungewöhnlich genug, um es klar zu sagen: Ein Festpreis kennt keinen Nachttarif, es gibt also kein Zeitband, das Sie um 20:00 Uhr überschreiten, und keinen Aufschlag, der am Ende einer Fahrt zu unbequemer Zeit auftaucht. Wochenenden und Feiertage fügen einen veröffentlichten Prozentsatz hinzu, und sonst bewegt nichts den Preis. Drei Nächte im Jahr tragen einen zusätzlichen regulierten Zuschlag — Heiligabend, Silvester und die Nacht von Sant Joan am 23. Juni —, und in diesen Nächten ist ein gebuchter Preis, in dem der Zuschlag schon enthalten ist, mehr wert als sonst.',
      },
      {
        h2: 'Die Lücke, nachdem die Busse aufhören',
        body: 'Zwischen dem letzten Aerobús und der ersten Metro am Morgen schrumpfen die öffentlichen Möglichkeiten auf ein dünnes Nachtbusnetz, und der Taxistand wird zur Standardlösung. In einer gewöhnlichen Nacht ist der Stand an T1 gut beaufsichtigt und bewegt sich schnell. Es geht schief, wenn drei verspätete Flüge zusammen in dieses Zeitfenster landen: Dann ist die Schlange vierzig Personen lang, und das Angebot an Taxis um 02:00 Uhr ist dünn, weil Fahrer nicht auf gut Glück an einem Terminal warten. Das ist das Szenario, in dem es sich klar mehr lohnt, mit einem bereits zugeteilten Wagen anzukommen, als es kostet, und es sollte vor dem Abflug entschieden werden und nicht in der Halle.',
      },
      {
        h2: 'Eine Abholung mitten in der Nacht buchen',
        body: 'Eine Abholung um 03:00 oder 04:30 Uhr wird wie jede andere bestätigt, und wir bestätigen den zugeteilten Fahrer am Vorabend, damit zu der Tageszeit, in der Ungewissheit am schlimmsten ist, keine bleibt. Geben Sie eine Mobilnummer an, die eingeschaltet ist, und bei einer Abholung am Flughafen die Flugnummer — eine Ankunft in der Nacht landet am ehesten verspätet, und sie zu verfolgen hält den Wagen bereit.',
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Taxi Gotisches Viertel zum Flughafen Barcelona',
    description:
      'Buchen Sie ein Taxi vom Gotischen Viertel zum Flughafen Barcelona. Wir vereinbaren vorab einen Abholpunkt, den ein Auto erreichen kann.',
    h1: 'Taxi vom Gotischen Viertel zum Flughafen',
    intro:
      'Das Barri Gòtic ist der Teil Barcelonas, in dem eine Vorabbuchung den Unterschied wirklich ausmacht. Der Großteil des Viertels ist Fußgängerzone oder für ein Auto zu eng — die Frage ist deshalb nicht, wann Ihr Taxi kommt, sondern wo es Sie überhaupt erreichen kann.',
    sections: [
      {
        h2: 'Abholpunkte, die funktionieren',
        body: 'Wir legen bei der Buchung einen konkreten erreichbaren Punkt fest: meist Via Laietana, Plaça de la Catedral, Passeig de Colom oder die Rambla-Seite, je nach Adresse. Ihr Fahrer wartet dort und hilft ab der Ecke mit dem Gepäck, statt durch Gassen zu kreisen, in die er nicht einfahren darf.',
      },
      {
        h2: 'Fahrzeit nach El Prat',
        body: 'Vom Gotischen Viertel zum Flughafen sind es außerhalb der Stoßzeiten etwa 20 bis 30 Minuten über die Ronda Litoral. Planen Sie an Werktagvormittagen und bei Kreuzfahrtwechseln im Hafen mehr ein.',
      },
      {
        h2: 'Ankunft im Viertel',
        body: 'Vom Flughafen aus gilt dieselbe Einschränkung umgekehrt. Nennen Sie uns die genaue Adresse, wir bringen Sie so nah heran, wie Fahrzeuge dürfen, und weisen Ihnen die letzten Meter zu Fuß.',
      },
      {
        h2: 'Gepäck über das Kopfsteinpflaster',
        body: 'Der Weg vom Fahrzeug zu einer Adresse im Gotischen Viertel führt fast immer über Steinpflaster und am Ende oft eine Treppe hinauf. Es ist ein kurzer Weg und mit zwei großen Koffern ein unangenehmer, und genau dafür lohnt sich hier die Planung am meisten. Wo die Adresse es zulässt, legen wir den Treffpunkt auf die nächstgelegene Straße, in der ein Auto legal halten darf, und nicht auf den nächsten Punkt auf der Karte, denn das ist im Barri Gòtic nicht dasselbe. Hilfe mit den Taschen zum und vom Auto ist inbegriffen; die Treppen im Gebäude kann kein Transfer lösen.',
      },
      {
        h2: 'Das Viertel für einen frühen Flug verlassen',
        body: 'Bei einem Abflug im Morgengrauen ist das Viertel ruhig, die Straßen sind leer und die Fahrt nach El Prat so schnell wie sonst nie — 20 bis 25 Minuten statt der 30 bis 35, die sie um neun Uhr morgens braucht. Schwierig ist um 04:30 Uhr, ein Taxi zu finden. Eines in einer Fußgängergasse vor Tagesanbruch anzuhalten funktioniert nicht, und der nächste Stand ist ein Fußweg mit Gepäck. Das ist der klarste Fall auf der ganzen Seite, zu buchen statt zu improvisieren, und der Preis ist derselbe wie für dieselbe Fahrt mittags. Er ist ein Festpreis, online bezahlt, und im Wagen schulden Sie nichts.',
      },
      {
        h2: 'Wenn Ihre Gasse für Autos gesperrt ist',
        body: 'Teile des Barri Gòtic sind Fußgängerzone oder zu bestimmten Zeiten Fahrzeugen vorbehalten, die Anwohnern zugeordnet sind, deshalb kann ein Fahrer nicht immer an der Adresse selbst halten. Nennen Sie uns die Straße und den nächsten Platz, den Sie mit Gepäck zu Fuß erreichen können, dann wird der Treffpunkt auf der nächstgelegenen Straße festgelegt, in der ein Taxi legal warten darf, und in Ihre Bestätigung geschrieben. Rechnen Sie bei einer Abfahrt fünf Minuten mehr für den Fußweg ein. Der Preis bleibt dabei ein Festpreis, den Sie online bezahlen.',
      },
    ],
  },

  'neighborhoods/eixample': {
    title: 'Taxi Eixample zum Flughafen Barcelona | Tür zu Tür',
    description:
      'Buchen Sie ein Taxi vom Eixample zum Flughafen Barcelona-El Prat. Unkomplizierte Tür-zu-Tür-Abholung im Raster, zum festen Komplettpreis.',
    h1: 'Taxi vom Eixample zum Flughafen Barcelona',
    intro:
      'Der Eixample ist der bequemste Stadtteil Barcelonas für eine Taxiabholung. Cerdàs Raster macht fast jede Adresse mit dem Auto erreichbar, mit Platz zum Halten und Einladen — das genaue Gegenteil der Altstadt.',
    sections: [
      {
        h2: 'Tür-zu-Tür-Abholung im Raster',
        body: 'Nennen Sie uns Straße und Hausnummer, dann steht Ihr Fahrer vor der Tür. Die abgeschrägten Ecken der Eixample-Blöcke sind bequeme und sichere Ladepunkte, falls Ihre Adresse auf einem stark befahrenen Abschnitt von Aragó oder Balmes liegt.',
      },
      {
        h2: 'Fahrzeit',
        body: 'Vom Eixample nach El Prat sind es typischerweise 25 bis 35 Minuten. Aus der Dreta de l\'Eixample und der Gegend der Sagrada Família etwas mehr, aus den Blöcken nahe Sants und Plaça d\'Espanya etwas weniger.',
      },
      {
        h2: 'Hotels am Passeig de Gràcia',
        body: 'Im Eixample liegt ein großer Teil der Hotels Barcelonas, darunter fast alle am Passeig de Gràcia. Geben Sie statt der Adresse den Hotelnamen ein, wir finden ihn.',
      },
      {
        h2: 'Auf welcher Ecke des Blocks Sie stehen sollten',
        body: 'Das Eixample-Raster macht eine Abholung leicht und einen Treffpunkt mehrdeutig: Ein einziger Block hat vier Ecken an vier verschiedenen Straßen, und eine Hausnummer kann hundert Meter von der Kreuzung entfernt liegen, an der ein Fahrer wartet. Geben Sie bei der Buchung die vollständige Adresse statt der Kreuzung an, dann kommt Ihr Fahrer bis zur Tür. Wo die abgeschrägte Ecke die einzige Stelle ist, an der man legal halten darf — an den belebteren Kreuzungen von Aragó, Balmes und Gran Via ist das oft der Fall —, nennt die Bestätigung, welche.',
      },
      {
        h2: 'Verkehr aus dem Eixample, je nach Tageszeit',
        body: 'Die Fahrt vom Eixample nach El Prat dauert den größten Teil des Tages 25 bis 35 Minuten und ist zweimal merklich schlechter: werktags morgens zwischen 08:00 und 09:30 Uhr, wenn die Gran Via und die Ronda Pendlerverkehr in beide Richtungen führen, und freitags nachmittags ab etwa 17:00 Uhr. Vom Ende des Viertels bei der Sagrada Família kommen fünf bis zehn Minuten dazu, von den Blöcken nahe der Plaça d\'Espanya ungefähr so viel weniger. Ein Festpreis fängt das alles auf — der Betrag bewegt sich nicht mit dem Verkehr —, aber Ihre Abfahrtszeit muss es trotzdem berücksichtigen.',
      },
      {
        h2: 'Ankunft vom Flughafen im Eixample',
        body: 'Ab El Prat nimmt der Fahrer am Tag die schnellste der Hauptzufahrten, und der Preis hängt nicht davon ab, welche. Was die letzten paar hundert Meter verändert, ist das Einbahnraster: Eine Abholung oder ein Absetzen auf der anderen Seite eines Blocks kann eine Runde um ihn bedeuten, daher spart die Angabe der Hausnummer statt der nächsten Kreuzung ein paar Minuten und einen kurzen Fußweg mit Gepäck.',
      },
      {
        h2: 'Apartments mit Haustür zur Straße',
        body: 'Viele Adressen im Eixample sind Apartments und keine Hotels: eine Haustür mit Gegensprechanlage, keine Rezeption und oft niemand, der Ihr Gepäck aufbewahrt. Tragen Sie die Zugangsregelung oder eine Kontaktnummer Ihres Gastgebers in die Buchungsnotizen ein, dann kann der Fahrer bei der Ankunft klingeln, statt draußen zu warten. Der Preis ist ein Festpreis, den Sie online bezahlen.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Stadtzentrum Barcelona zum Flughafen',
    description:
      'Buchen Sie ein Taxi vom Stadtzentrum Barcelonas zum Flughafen El Prat. Abholung an jeder zentralen Adresse, fester Komplettpreis, Fahrer vorab bestätigt.',
    h1: 'Taxi vom Zentrum Barcelonas zum Flughafen',
    intro:
      'Von jedem zentralen Punkt — der Rambla, Plaça de Catalunya, El Born, dem Raval oder dem Passeig de Gràcia — sind es 20 bis 35 Minuten Fahrt nach El Prat. Eine Vorabbuchung legt Abholzeit und Wagen fest, was vor allem auf der Hinfahrt zählt.',
    sections: [
      {
        h2: 'Zentrale Abholpunkte',
        body: 'Breite zentrale Straßen erlauben die Abholung direkt vor der Tür. Für Adressen in Fußgängerzonen vereinbaren wir bei der Buchung die nächste erreichbare Ecke, damit am Tag selbst nichts improvisiert werden muss.',
      },
      {
        h2: 'Verkehr und Zeitpuffer',
        body: 'Werktags zwischen 08:00 und 09:30 Uhr sowie ab 18:00 Uhr verlangsamen sich die Ronda-Strecken merklich. Unsere Schätzung enthält eine realistische Fahrzeit, doch planen Sie für einen frühen Flug Puffer bei der Abholzeit ein.',
      },
      {
        h2: 'Was ein Taxi vom Zentrum zum Flughafen kostet',
        body: 'Ein Festpreis von jedem Punkt im Zentrum bis El Prat, mit allen offiziellen Zuschlägen bereits darin und nichts im Taxi zu zahlen. Die Uhrzeit ändert ihn nicht; an Wochenenden und Feiertagen kommen 7,5 % hinzu. Geben Sie Ihre Adresse ein, um vor der Buchung Ihren genauen Preis zu sehen.',
      },
      {
        h2: 'Was für den Festpreis als Zentrum gilt',
        body: 'Alles davon, und einiges darüber hinaus. Der Listenpreis gilt für jede Adresse im Umkreis von 16 km um das Terminal, in der Luftlinie gemessen, sodass die Unterscheidung zwischen Gotischem Viertel, Eixample, Gràcia, Sants, Barceloneta und Park Güell mit 14,3 km für den Preis nicht existiert: Es ist ein Betrag. Die Zone endet in den äußeren nördlichen und östlichen Stadtteilen — Sant Andreu, Nou Barris, La Sagrera und das Fòrum liegen alle jenseits von 16 km und fügen den Kilometersatz hinzu. Im Zentrum unterscheiden sich die Fahrzeit und die Frage, ob ein Auto bis zur Tür kommt, weshalb die Adresse auch dort zählt, wo der Preis es nicht tut.',
      },
      {
        h2: 'Wo ein Auto tatsächlich halten kann',
        body: 'Im Zentrum liegen die beiden schwierigen Fälle dieser Seite: Straßen, die ganz Fußgängerzone sind, und Straßen, die so eng sind, dass ein haltendes Auto sie blockiert. In beiden ist der Treffpunkt die nächstgelegene Straße, in der ein Taxi legal warten darf, in Ihrer Bestätigung genannt und nicht erst am Tag selbst herauszufinden. Bei einer Ankunft bedeutet das einen Fahrer mit Schild an einem bekannten Ort; bei einer Abfahrt einen kurzen Fußweg mit den Taschen und fünf Minuten mehr, als die Fahrzeit allein vermuten lässt.',
      },
      {
        h2: 'Spät in der Nacht ins Zentrum fahren',
        body: 'Nach etwa 23:30 Uhr ist das Zentrum der Teil der Stadt, in den man am leichtesten hineingefahren wird und den man mit Gepäck am schwersten zu Fuß durchquert: Die Metro schließt, die Straßen rund um die Rambla sind auf eine Weise belebt, die ein Auto bremst, und die letzten hundert Meter über Pflaster legt man im Dunkeln zurück. Ein gebuchter Wagen endet am nächsten Punkt vor Ihrer Tür statt an einem Stand, und der Fahrer hat die Adresse, bevor Sie landen. Der Preis ist derselbe Betrag wie für dieselbe Fahrt mittags.',
      },
    ],
  },

  'group-taxi': {
    title: 'Gruppentaxi Flughafen Barcelona | 5, 6 oder 7 Sitze',
    description:
      'Taxi für Gruppen ab dem Flughafen Barcelona: ein Van mit sechs oder sieben Sitzen oder mehrere Wagen in einem Checkout. Ein fester Komplettpreis.',
    h1: 'Gruppentaxi ab dem Flughafen Barcelona',
    intro:
      'Ein normales Taxi in Barcelona hat vier Sitze. Für fünf, sechs oder sieben Personen gibt es den sechssitzigen Mercedes Vito und die siebensitzige Mercedes V-Class, und für eine größere Gruppe buchen Sie zwei oder mehr Wagen gemeinsam. Ein einzelnes Taxi mit neun Sitzen gibt es in Barcelona nicht, und wir sagen das lieber, als dass Sie es am Bordstein erfahren.',
    sections: [
      {
        h2: 'Wie viele Personen und wie viele Koffer hineinpassen',
        body: 'Die ehrliche Grenze ist der Kofferraum, nicht die Sitze. Ein normales Viersitzer-Taxi befördert vier Fahrgäste und etwa drei große Koffer; manche Modelle nehmen vier. Der sechssitzige Mercedes Vito nimmt sechs Fahrgäste und sechs Gepäckstücke mit, die siebensitzige Mercedes V-Class sieben Fahrgäste und sieben Gepäckstücke. Reisen Sie mit etwas Sperrigem — Skiern, einem Fahrrad, einem Kinderwagen, einem Instrument —, tragen Sie es in die Buchungsnotizen ein, damit das richtige Fahrzeug zugeteilt wird und nicht das nächstbeste.',
      },
      {
        h2: 'Fünf, sechs oder sieben Personen: ein Fahrzeug',
        body: 'Bis zu sieben Personen fahren gemeinsam in einem einzigen Fahrzeug zu einem festen Komplettpreis. Das Viersitzer-Taxi kostet 50 EUR zwischen dem Flughafen und jedem Ort in Barcelona, der sechssitzige Vito 70 EUR und die siebensitzige V-Class 75 EUR. Wochenenden und Feiertage fügen 7,5 % hinzu. Das ist der ganze Preis: Der Flughafenzuschlag, der Zuschlag für das größere Fahrzeug und unser Service sind bereits darin enthalten, und dem Fahrer ist nichts zu zahlen.',
      },
      {
        h2: 'Acht, neun oder zehn Personen: zwei Wagen gemeinsam buchen',
        body: 'Über sieben gibt es kein einzelnes Taxi, die Antwort sind also zwei oder mehr Fahrzeuge, die als eine Gruppe fahren. Wählen Sie mehrere Wagen in einer Buchung, werden sie gemeinsam reserviert, in einem Checkout bezahlt und zum selben Abholpunkt geschickt, bis zu sechs Wagen. Jeder wird zum veröffentlichten Preis seiner Größe berechnet, es gibt also kein individuelles Angebot und keine Überraschung: Acht Personen können in zwei Viersitzer-Taxis werktags für 100 EUR fahren, neun in einem sechssitzigen Vito und einem Viersitzer-Taxi für 120 EUR (70 EUR plus 50 EUR), und elf in einer siebensitzigen V-Class und einem Viersitzer-Taxi für 125 EUR.',
      },
      {
        h2: 'Ein Checkout, ein Abholpunkt, alle Wagen zusammen',
        body: 'Die Wagen einer Gruppenbuchung werden gemeinsam zugeteilt, und Sie erhalten Name und Nummer jedes Fahrers per E-Mail. Sie warten in der Ankunftshalle Ihres Terminals mit einem Namensschild und verfolgen dieselbe Flugnummer, sodass eine späte Landung die ganze Gruppe verschiebt, statt sie zu trennen. Das ist der praktische Unterschied zum Anstehen am Taxistand mit acht Personen, wenn man darauf wartet, dass die Taxis einzeln und zu zweit auftauchen.',
      },
      {
        h2: 'Kreuzfahrtgruppen, Familien und Hochzeitsgesellschaften',
        body: 'Dieselbe Logik gilt für das Kreuzfahrtterminal Moll Adossat, wo die Festpreise 60 EUR, 80 EUR und 85 EUR für die vier-, sechs- und siebensitzigen Fahrzeuge betragen, und für eine Familie mit Großeltern und einem Berg Gepäck. Nennen Sie uns bei einer Hochzeitsgesellschaft oder einer Konferenzdelegation bei der Buchung die Ankunftszeiten und die Zahl der Koffer, dann sagen wir Ihnen ehrlich, ob zwei Wagen genügen oder drei die sicherere Wahl sind.',
      },
    ],
  },

  'book-online': {
    title: 'Taxi Flughafen Barcelona online buchen | Sofortpreis',
    description:
      'Buchen Sie in Minuten ein Taxi zum Flughafen Barcelona. Sofortiger Festpreis, sichere Zahlung und eine Bestätigung per E-Mail.',
    h1: 'Taxi zum Flughafen Barcelona online buchen',
    intro:
      'Die Onlinebuchung dauert ein paar Minuten und sichert Ihnen einen bestätigten Wagen mit zugeteiltem Fahrer. Sie zahlen einen Komplettpreis online und schulden im Taxi nichts.',
    sections: [
      {
        h2: 'Was Sie für die Buchung brauchen',
        body: 'Ihre Abholadresse, das Ziel, Datum und Uhrzeit sowie eine Telefonnummer. Für Abholungen am Flughafen geben Sie Ihre Flugnummer an, damit Ihr Fahrer die Landung verfolgen kann. Buchungen brauchen mindestens drei Stunden Vorlauf; für alles Kurzfristigere schreiben Sie uns auf WhatsApp.',
      },
      {
        h2: 'Nach der Buchung',
        body: 'Sie erhalten sofort eine Bestätigungsmail mit Route, Fahrzeug, dem gezahlten Preis und der Quittung dafür. Anschließend wird ein Fahrer zugeteilt, dessen Daten Sie vor der Fahrt bekommen.',
      },
      {
        h2: 'Änderungen und Stornierungen',
        body: 'Pläne ändern sich. Stornieren Sie mindestens 24 Stunden vor der Abholung, und Sie erhalten den vollen Betrag zurück. Zum Verschieben antworten Sie einfach auf die Bestätigungsmail.',
      },
      {
        h2: 'Was Sie bereithalten sollten',
        body: 'Eine vollständige Adresse statt eines Stadtteils, die Zahl der Fahrgäste und wie viele Koffer Sie tatsächlich dabeihaben — Letzteres zählt mehr, als man erwartet, denn ein Viersitzer nimmt vier Fahrgäste, aber nur etwa drei Koffer. Bei Ankunft per Flugzeug Ihre Flugnummer: Sie ist optional, doch mit ihr verfolgen wir die tatsächliche Landung und verschieben die Abholung automatisch, sodass eine Verspätung Sie nichts kostet und Sie nicht wochenlang im Voraus eine sichere Uhrzeit raten müssen. Eine am Tag erreichbare Mobilnummer rundet das Ganze ab, denn darüber erreicht Sie Ihr Fahrer, falls die Ankunftshalle Sie beide überfordert.',
      },
      {
        h2: 'Warum das Formular drei Stunden Vorlauf verlangt',
        body: 'Onlinebuchungen brauchen mindestens drei Stunden vor der Abholung, und der Grund ist ein Fahrer und kein System: Einen bestimmten Wagen und eine bestimmte Person verlässlich für eine bestimmte Zeit zuzuteilen dauert länger, als es abstrakt zu tun. Innerhalb von drei Stunden ist die ehrliche Antwort, uns per WhatsApp zu schreiben, wo wir prüfen können, was tatsächlich verfügbar ist, und einen Wagen direkt bestätigen oder Ihnen sofort sagen, dass keiner da ist. Das ist eine schlechtere Erfahrung als das Formular und eine bessere als eine Bestätigung, die wir nicht einhalten können.',
      },
      {
        h2: 'Wie Sie zahlen und was Sie zurückbekommen',
        body: 'Der gesamte Betrag wird bei der Buchung online bezahlt, per Kreditkarte, Debitkarte oder Bizum. Es gibt keine Aufteilung in Anzahlung und Restbetrag, und dem Fahrer im Wagen ist überhaupt nichts zu zahlen — kein Fahrpreis, kein Zuschlag, kein erwartetes Trinkgeld. Eine Quittung über den vollen Betrag kommt mit Ihrer Bestätigung per E-Mail, sodass die Unterlagen für eine Spesenabrechnung vor der Fahrt eintreffen und nicht danach. Brauchen Sie zusätzlich die regulierte Taxirechnung für die Fahrt selbst, kann Ihr Fahrer sie auf Wunsch ausstellen.',
      },
      {
        h2: 'Der Ablauf in drei Schritten',
        body: 'Geben Sie Abholort, Ziel, Datum und Uhrzeit ein, wählen Sie das Fahrzeug und sehen Sie sofort Ihren Festpreis. Dann zahlen Sie den vollen Betrag online per Karte oder Bizum. Danach kommt die Bestätigung mit Quittung per E-Mail, und wir teilen Ihnen einen Fahrer zu. Brauchen Sie mehr als ein Fahrzeug, lassen sich bis zu sechs Wagen in einem Checkout gemeinsam reservieren. Im Taxi selbst ist nichts mehr zu zahlen.',
      },
    ],
  },
};
