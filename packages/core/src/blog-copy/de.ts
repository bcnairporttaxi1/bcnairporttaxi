import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "de" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const DE_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: 'Was kostet ein Taxi vom Flughafen Barcelona?',
    description:
      'Taxipreise ab Flughafen Barcelona erklärt: unsere Festpreise in die Stadt, worin sich das Taxameter am Standplatz unterscheidet und was die Zuschläge ausmachen.',
    h1: 'Was kostet ein Taxi vom Flughafen Barcelona?',
    excerpt:
      'Ein gebuchter Transfer von El Prat nach Barcelona kostet 50 € für ein Fahrzeug mit vier Sitzen, zum Festpreis und online bezahlt. Der Standplatz vor der Ankunftshalle funktioniert anders, nämlich mit einem regulierten Taxameter. Hier steht, was beides tatsächlich kostet und warum die beiden Beträge nicht dieselben sind.',
    sections: [
      {
        h2: 'Die kurze Antwort',
        body: [
          'Ein gebuchter Transfer zwischen El Prat und jedem Ziel in Barcelona kostet 50 € im Fahrzeug mit vier Sitzen, 70 € im Mercedes Vito mit sechs Sitzen und 75 € in der V-Klasse mit sieben Sitzen. Das ist der gesamte Preis. Er wird vor der Reise genannt, beim Buchen online bezahlt, und im Fahrzeug schulden Sie dem Fahrer nichts.',
          'Das Kreuzfahrtterminal am Moll Adossat ist eine eigene Strecke: 60 €, 80 € und 85 € für dieselben drei Fahrzeuggrößen.',
          'Diese Beträge ändern sich nicht mit der Tageszeit. Eine Abholung um 04:30 Uhr für einen frühen Flug kostet genauso viel wie eine um zwei Uhr nachmittags. Nur ein Wochenende oder ein Feiertag erhöht den Preis, und zwar um 7,5 Prozent; ein Transfer im Fahrzeug mit vier Sitzen kostet am Samstag also 53,75 € statt 50 €.',
          'Wenn Sie stattdessen ein Taxi am Standplatz vor der Ankunftshalle nehmen, kaufen Sie gar keinen Festpreis, sondern eine Fahrt nach Taxameter, und der Betrag am Ende hängt vom Verkehr, von der Uhrzeit und von der Route ab. Der Rest dieser Seite erklärt beides, denn welche Variante günstiger ist, hängt tatsächlich davon ab, wann Sie reisen.',
        ],
      },
      {
        h2: 'Warum ein fester Preis statt einer Taxameteranzeige',
        body: [
          'Die Taxitarife in Barcelona werden von der Àrea Metropolitana de Barcelona geregelt, und jedes zugelassene Taxi der Stadt fährt mit demselben Taxameter zu denselben Sätzen. Das ist ein echter Verbraucherschutz, und wir stellen ihn nicht in Frage. Was ein reguliertes Taxameter jedoch nicht leistet, ist, den Preis im Voraus zu nennen.',
          'Auf einer Fahrt von 15 Kilometern ins Eixample schwankt die Anzeige um grob zehn Euro, je nachdem, ob Sie auf der Ronda de Dalt im Fließverkehr oder im Stau stehen, und um weitere fünfundzwanzig Prozent, je nachdem, ob es ein Dienstagmittag oder ein Samstagabend ist. Beide Beträge sind korrekt. Keiner ist bekannt, wenn Sie in der Ankunftshalle stehen und sich entscheiden müssen.',
          'Ein Festpreis verlagert diese Schwankung auf uns. Wir nennen 50 €, wir rechnen mit dem Fahrer nach den tatsächlichen Kosten der Fahrt ab, und die Differenz geht in jedem Fall zu unseren Lasten. An einem Dienstag mit freier Fahrt ist das für Sie ein schlechteres Geschäft als der Standplatz. Im Verkehr am Freitagabend ist es ein besseres. Was es immer ist: im Voraus bekannt.',
          'Es ist außerdem die einzig ehrliche Art, einen Transfer an jemanden zu verkaufen, der noch nicht in Barcelona ist. Wer im März von Manchester aus bucht, kann die Taxameteranzeige eines Donnerstagnachmittags im Juli nicht vorhersagen; ein Angebot, das in Wahrheit eine Schätzung ist, kann also falsch sein, und zwar immer in die Richtung, dass der Betrag steigt.',
        ],
      },
      {
        h2: 'Die 16-Kilometer-Zone und warum sie in Luftlinie gemessen wird',
        body: [
          'Der Listenpreis gilt für jede Adresse im Umkreis von 16 Kilometern um das Terminal, in gerader Linie gemessen. Das ist das gesamte Zentrum und fast alles, wo Besucher wohnen: Plaça de Catalunya in 12,3 km, die Barceloneta in 12,8, die Sagrada Família in 14,0, der Park Güell oben am Hang hinter Gràcia in 14,3 und Poblenou in 15,5 zahlen alle denselben Preis von 50 € wie ein Hotel am Passeig de Gràcia. Es ist nicht das gesamte Stadtgebiet, und man sollte wissen, welcher Teil nicht dazugehört: Die äußeren nördlichen und östlichen Stadtteile liegen außerhalb, nämlich La Sagrera in 16,4 km, das Fòrum in 17,4, Sant Andreu in 17,7, Nou Barris in 17,9 und Torre Baró in 19,3, und für diese Adressen gilt der unten genannte Mehrpreis.',
          'Die Messung in Luftlinie ist Absicht, und es lohnt sich, sie zu verstehen, denn sie arbeitet zu Ihren Gunsten. Die Plaça de Catalunya liegt Luftlinie 12,3 Kilometer vom Terminal entfernt und auf der Straße 19,6 Kilometer, weil die Straße um den Llobregat herum und über die Gran Via hineinführen muss. Eine Zone, die mit 16 Kilometern entlang der Straße gemessen würde, ließe das Herz von Barcelona außerhalb liegen und würde auf der häufigsten Fahrt, für die der Preis gedacht ist, Zusatzkilometer berechnen. Die Zone ist also auf der Karte gezogen, nicht auf der Route.',
          'Außerhalb der Zone gilt der Listenpreis plus 1,50 € für jeden zusätzlichen Kilometer. Badalona liegt bei 21,8 Kilometern und Sant Cugat del Vallès bei 19,5, beide zahlen also den Stadtpreis plus die Differenz. Das sind die knappen Fälle; der größte Teil des Ballungsraums liegt innerhalb.',
          'Diese 1,50 € sind ein einziger veröffentlichter Betrag und nicht der Satz der jeweiligen Tageszeit, was mehr ausmacht, als man meint. Der offizielle Nachttarif beträgt 1,66 € pro Kilometer gegenüber 1,35 € am Tag. Würden wir den jeweils geltenden berechnen, käme die Uhrzeit wieder in eine Preisliste, deren ganzer Zweck es ist, dass die Uhrzeit den Preis nicht verändert, und wer „fünfzig Euro plus anderthalb Euro pro Kilometer“ gehört hat, würde ohne Vorwarnung mehr berechnet bekommen. Eine Zahl, den ganzen Tag.',
        ],
      },
      {
        h2: 'Was der Standplatz stattdessen berechnet',
        body: [
          'Wenn Sie zum Standplatz gehen, setzt sich der Betrag auf dem Taxameter aus drei Teilen zusammen: einem Grundpreis, sobald das Taxameter läuft, einem Kilometersatz und den jeweils geltenden Zuschlägen.',
          'Der Grundpreis, die bajada de bandera, beträgt 2,80 €. Der Kilometersatz beträgt 1,35 € nach Tarif T-1, der von Montag bis Freitag zwischen 08:00 und 20:00 Uhr gilt, und 1,66 € nach Tarif T-2 zu allen anderen Zeiten: abends, nachts, den ganzen Samstag und Sonntag und an Feiertagen. Der Unterschied beträgt etwa 23 Prozent, weshalb dieselbe Fahrt um 22:00 Uhr tatsächlich mehr kostet als um 14:00 Uhr.',
          'Hinzu kommt ein Wartetarif von 27,75 € pro Stunde, den das Taxameter zählt, solange das Fahrzeug steht. In der Praxis macht gerade das Ankünfte zur Hauptverkehrszeit unberechenbar: Das Taxameter hält nicht an, wenn der Verkehr anhält.',
          'Die aktuellen Sätze gelten vom 19. Januar 2026 bis zum 17. Januar 2027. Die AMB überarbeitet sie jeden Januar, und wer Ihnen einen Taxipreis für Barcelona von einer älteren Tafel nennt, nennt den Preis des falschen Jahres. Unsere Angaben werden anhand der gedruckten Tariftafel geprüft und nicht von einer anderen Website abgeschrieben.',
        ],
      },
      {
        h2: 'Die Zuschläge und die Obergrenze, die Sie wohl nicht erreichen',
        body: [
          'Zusätzlich zum Taxameterpreis gibt es feste Zuschläge für bestimmte Orte und Situationen. Der Zuschlag für den Flughafen El Prat beträgt 4,60 € und gilt für jede Fahrt, die am Flughafen beginnt oder endet. Das Kreuzfahrtterminal Moll Adossat hat denselben Zuschlag von 4,60 €. Der Bahnhof Sants kostet 2,55 € und das Messegelände Fira Gran Via 3,30 €.',
          'Ein Fahrzeug mit fünf oder mehr Fahrgästen kostet 4,60 € zusätzlich. Das ist ein Tarifzuschlag für das größere Fahrzeug selbst und keine Gebühr pro Person, und es ist einer der Gründe, warum der sechssitzige Vito auf derselben Strecke mehr kostet als eine Limousine.',
          'Drei Nächte im Jahr bringen einen weiteren Zuschlag von 4,60 €: Heiligabend bis zum Morgen des ersten Weihnachtstags, Silvester bis Neujahr und die Revetlla de Sant Joan in der Nacht zum 23. Juni. Wenn Sie in einer dieser Nächte ankommen, kostet der Standplatz mehr als sonst, und der gebuchte Preis nicht.',
          'Für die Summe der Zuschläge, die bei einer einzelnen Fahrt berechnet werden dürfen, gibt es eine Obergrenze von 17,10 €, die für Grenzfälle gedacht ist, etwa ein großes Fahrzeug, das an Silvester das Kreuzfahrtterminal verlässt. Bei einer gewöhnlichen Flughafenfahrt zahlen Sie einen einzigen Zuschlag von 4,60 € und sind weit von der Obergrenze entfernt.',
          'All das ist in unserem Festpreis enthalten. Die 50 € sind kein Fahrpreis, zu dem noch Zuschläge kommen, sondern der Gesamtbetrag, in dem der Flughafenzuschlag, das Fahrzeug, der Tarif und unsere eigene Servicegebühr bereits enthalten sind. Die häufigste Beschwerde über Flughafentransfers überhaupt ist ein Preis, der zwischen Angebot und Bordstein wächst, und der Weg, das zu vermeiden, ist, genau den Betrag zu nennen, den man auch berechnet.',
        ],
      },
      {
        h2: 'Der Mindestpreis ab El Prat',
        body: [
          'Jede Taxameterfahrt, die am Flughafen beginnt, wird mit mindestens 21,00 € berechnet. Hätte das Taxameter weniger ergeben, zahlen Sie den Mindestpreis.',
          'Es gibt ihn, weil ein Taxi, das vierzig Minuten am Standplatz des Terminals ansteht und dann für vier Euro zu einem Flughafenhotel fährt, mit der Schicht Verlust gemacht hat, und ohne Untergrenze würde niemand die kurzen Fahrten übernehmen. Er greift nur bei wirklich kurzen Fahrten: in den Ort El Prat oder zu einem der Hotels an der Flughafenstraße.',
          'Für alles, was nach Barcelona selbst führt, liegt das Taxameter von allein deutlich über 21 €, sodass der Mindestpreis nie in die Rechnung eingeht. Wird Ihnen ein Taxipreis ab dem Flughafen Barcelona „ab 21 €“ genannt, dann ist das die Untergrenze für eine Fahrt von zwei Kilometern, die als Stadtpreis dargestellt wird.',
        ],
      },
      {
        h2: 'Das Kreuzfahrtterminal ist ein Sonderfall',
        body: [
          'Die Strecke zwischen El Prat und Moll Adossat hat einen offiziellen geschlossenen Festpreis von 46,00 € nach Tarif T-4, den die AMB festlegt und nicht wir. Sie läuft überhaupt nicht über das Taxameter.',
          'Das ist ungewöhnlich und hat einen guten Grund: Kreuzfahrtgäste reisen gegen eine Einschiffungsfrist, oft im schlimmsten Hafenverkehr der Woche, und ein Taxameterpreis ist in dieser Lage eine Wette, die niemand eingehen möchte. Ein geschlossener Preis nimmt das Verkehrsrisiko aus einer Fahrt, bei der Verspätung keine Unannehmlichkeit ist, sondern ein verpasstes Schiff.',
          'Unser gebuchter Preis für dieselbe Strecke beträgt 60 € in der Limousine und liegt damit über dem offiziellen geschlossenen Preis, weil er eine Zusage enthält, die der Standplatz nicht bietet: einen im Voraus zugeteilten Fahrer, der Sie mit einem Namensschild empfängt und den Termin hält, ob das Schiff pünktlich anlegt oder nicht. Für eine Familie mit Gepäck und einer festen Abfahrtszeit ist das meist das, wofür es sich zu zahlen lohnt. Für eine einzelne Person mit Rucksack und einem entspannten Nachmittag ist der Standplatz mit 46 € der bessere Kauf, und das sagen wir lieber, als etwas anderes vorzugeben.',
          'Ein Transfer zwischen dem Kreuzfahrtterminal und der Stadt, statt dem Flughafen, kostet den Stadtpreis plus 10 € Hafenzuschlag und landet damit bei denselben 60 €. Die Symmetrie ist Absicht.',
        ],
      },
      {
        h2: 'Außerhalb des Ballungsraums: Sitges, Girona, Tarragona',
        body: [
          'Sobald ein Ende der Fahrt außerhalb des Ballungsraums liegt, gelten die Tarife von Barcelona überhaupt nicht mehr, und die Fahrt wird nach den Überlandtarifen der Generalitat de Catalunya abgerechnet. Das sind T-6, Montag bis Freitag von 08:00 bis 20:00 Uhr, und T-7 zu allen anderen Zeiten, einschließlich des gesamten Samstags und Sonntags.',
          'Das Überlandtaxameter hat eine Eigenheit, die fast alle überrascht: Es berechnet die Rückfahrt mit. Ein Taxi von Barcelona nach Sitges ist nach dem Tarif eine Hin- und Rückfahrt, die sogenannte geschlossene Runde, weil der Fahrer nach Hause zurückmuss und unterwegs keinen Fahrgast aufnehmen kann. Ein Kilometer nach Süden kostet also zwei Kilometer auf dem Taxameter. Beim T-6-Satz von 0,82 € pro Kilometer sind das 1,64 € pro tatsächlich gefahrenem Kilometer und nicht 0,82 €.',
          'Darum kostet eine lange Fahrt, was sie kostet, und darum ist eine Zahl, die auf einem Vergleichsportal wie ein Kilometerpreis aussieht, oft nur halb so hoch wie der echte. Alles inklusive, auch unser Service, ergibt das etwa 2,16 € pro gefahrenem Kilometer werktags (T-6) und 2,38 bis 2,48 € nachts und am Wochenende (T-7), zuzüglich einer Grundgebühr. Sitges, 38 Kilometer entfernt, kostet insgesamt 90,78 €. Nichts wird doppelt gezählt.',
          'Praktisch heißt das: Sitges, Tarragona, Girona, Reus und die Costa Brava werden pro Kilometer berechnet und vor der Buchung genannt, wie alles andere auch. Sie gehören nicht zur festen Stadtliste, und keine ehrliche Festliste könnte sie abdecken, denn die Entfernungen unterscheiden sich um den Faktor fünf.',
        ],
      },
      {
        h2: 'Wochenenden, Feiertage und was sich wirklich ändert',
        body: [
          'Ein Festpreis steigt am Wochenende und an Feiertagen um 7,5 Prozent. Bei einer Limousine für 50 € sind das 3,75 €. Der Aufschlag besteht, weil die Besetzung an Wochenenden und Feiertagen mehr kostet, und er ist ein einziger veröffentlichter Satz und kein Spitzenfaktor, der mit der Nachfrage wandert: Der Preis, der Ihnen an einem Samstag im Februar genannt wird, ist derselbe wie an einem Samstag im August.',
          'Er gilt nur für die festen Preise für Stadt und Hafen. Eine Überlandfahrt wechselt am Wochenende ohnehin von T-6 auf T-7 mit einem eigenen höheren Satz, sodass ein zusätzlicher Aufschlag denselben Zuschlag zweimal berechnen würde.',
          'Was sich nicht ändert: die Tageszeit, das Terminal, der Verkehr, die Route des Fahrers, die Zahl der Fahrgäste innerhalb der Kapazität des Fahrzeugs oder die Menge an Gepäck darin. Ein Fahrzeug mit vier Sitzen und drei Koffern um 06:00 Uhr und ein Fahrzeug mit vier Sitzen und einer Tasche um 18:00 Uhr kosten werktags beide 50 €.',
        ],
      },
      {
        h2: 'Wie viel sollten Sie also einplanen?',
        body: [
          'Für einen gebuchten Transfer nach Barcelona: 50 € werktags im Fahrzeug mit vier Sitzen, 53,75 € am Wochenende. 70 € oder 75 €, wenn Sie ein Fahrzeug mit sechs oder sieben Sitzen brauchen, was für vier Erwachsene mit vier großen Koffern meist die ehrliche Antwort ist und kein Verkaufstrick: Drei Koffer sind in einem Corolla oder einem Toledo die realistische Grenze.',
          'Für den Standplatz, auf einer Fahrt ins Zentrum werktags tagsüber: das Taxameter plus der Zuschlag von 4,60 €, was typischerweise irgendwo in den Vierzigern landet, und höher am Abend, am Wochenende oder bei dichtem Verkehr. Rechnen Sie damit, dass das Kartenlesegerät nicht funktioniert, was vorkommt.',
          'Für das Kreuzfahrtterminal: 46 € zum offiziellen geschlossenen Preis oder 60 € gebucht mit einem Fahrer, der Ihren Termin hält.',
          'Eines muss man deutlich sagen: Der Standplatz und ein gebuchtes Fahrzeug sind nicht dasselbe Produkt zu einem anderen Preis. Das eine ist eine regulierte Fahrt nach Taxameter, die Sie bei der Ankunft kaufen. Das andere ist ein fester Betrag, ein benannter Fahrer und ein Fahrzeug, das bereits zugeteilt ist, wenn Ihr Flug landet. Was das bessere Angebot ist, hängt ganz davon ab, wie viel Ihnen die Gewissheit an diesem Tag wert ist, und bei vielen Fahrten lautet die Antwort „nicht viel“, und dann ist der Standplatz gleich da.',
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: 'Taxi oder Aerobús vom Flughafen Barcelona?',
    description:
      'Taxi, Aerobús oder Metro ab El Prat: was die Fahrt für die Gruppe kostet, wie lange sie von Tür zu Tür dauert und wann Gepäck und späte Ankunft entscheiden.',
    h1: 'Taxi oder Aerobús vom Flughafen Barcelona?',
    excerpt:
      'Der Aerobús ist pro Person günstiger, die Metro noch günstiger. Keines von beiden ist automatisch besser, wenn man Gruppengröße, Gepäck und den Fußweg am Ende mitzählt, und für eine oder zwei Personen mit leichtem Gepäck ist das Taxi die falsche Wahl, und das sagen wir auch.',
    sections: [
      {
        h2: 'Die Rechnung mit den tatsächlichen Zahlen',
        body: [
          'Der Aerobús berechnet pro Kopf. Ein Taxi berechnet pro Fahrzeug. Dieser eine Unterschied entscheidet die meisten dieser Streitfragen, bevor die anderen Faktoren eine Rolle spielen.',
          'Ein gebuchter Transfer im Fahrzeug mit vier Sitzen nach Barcelona kostet pauschal 50 €. Auf zwei Personen verteilt sind das 25 € pro Person, also ein Mehrfaches eines Aerobús-Platzes. Auf vier verteilt sind es 12,50 € pro Person, und der Abstand schrumpft auf einen Betrag, der den meisten egal ist, noch bevor man bedenkt, dass das Taxi an Ihrer Tür endet und der Bus an der Plaça de Catalunya.',
          'Der Wendepunkt liegt meist bei drei Fahrgästen, und bei vieren ist er in der Regel schon überschritten. Eine Gruppe von sechs in einem Vito für 70 € zahlt unter 12 € pro Kopf, von Tür zu Tür, mit dem Gepäck im Kofferraum statt auf dem Schoß.',
          'Der ehrliche Vergleich lautet so: Wer allein reist, fährt mit dem Bus deutlich günstiger. Wer als Familie zu viert mit Koffern reist, fährt mit dem Taxi meist insgesamt günstiger und wesentlich bequemer. Alles dazwischen hängt vom Gepäck ab.',
        ],
      },
      {
        h2: 'Zeit von Tür zu Tür, nicht die Zeit auf dem Papier',
        body: [
          'Der Aerobús wird mit etwa 35 Minuten bis zur Plaça de Catalunya beworben, und das stimmt, von Haltestelle zu Haltestelle. Die Zeit, die Sie tatsächlich erleben, ist länger, weil die Reise nicht an der Haltebucht des Busses beginnt und nicht am Platz endet.',
          'Rechnen Sie den Weg von der Ankunftshalle zur Haltestelle dazu, der am T1 mit einem Gepäckwagen ein paar Minuten dauert. Rechnen Sie die Wartezeit dazu, die zu Stoßzeiten kurz ist und am späten Abend fünfzehn Minuten betragen kann. Und dann den Weg von der Plaça de Catalunya oder von Sants bis dorthin, wo Sie wohnen: mit der Metro samt Koffern, in einem zweiten Taxi oder zu Fuß über das Kopfsteinpflaster im Gotischen Viertel.',
          'Ein Taxi von El Prat ins Zentrum von Barcelona braucht 25 bis 35 Minuten, je nach Verkehr und Ziel in der Stadt, und endet an der Adresse, die Sie eingegeben haben. Für das Eixample oder Sant Antoni beträgt der Unterschied in der gesamten Zeit von Tür zu Tür vielleicht zwanzig Minuten. Für ein Ziel oben in Gràcia oder eine Wohnung mit Straßeneingang im El Born liegt er oft eher bei fünfundvierzig.',
          'Die Schwankung zählt so viel wie der Durchschnitt. Der Bus ist zuverlässig und das Taxi schneller; bei dichtem Verkehr nähern sie sich an, denn der Bus steht im selben Verkehr und hält öfter.',
        ],
      },
      {
        h2: 'Die Metro ist günstiger als beides, unter Bedingungen',
        body: [
          'Die Linie 9 Sud bedient beide Terminals und ist der mit Abstand günstigste Weg in die Stadt. Sie ist eine wirklich gute Möglichkeit und wird von Besuchern zu wenig genutzt.',
          'Die Bedingungen sind aber real. Sie fährt nicht direkt ins Zentrum, Sie steigen um, meist bei Collblanc oder Torrassa, in eine andere Linie, und für die Flughafenstationen braucht man einen eigenen Flughafentarif statt eines normalen Einzelfahrscheins. Die Stationen haben Aufzüge, aber die Umstiege führen durch Gänge, und das mit zwei großen Koffern und einem müden Kind zu tun, klingt beim Buchen gut und fühlt sich um 23:00 Uhr nicht gut an.',
          'Wer leicht reist, in der Nähe eines Umstiegs der Linie 9 wohnt und es nicht eilig hat, für den ist die Metro die richtige Antwort und kostet einen Bruchteil von allem anderen. Trifft eines dieser drei Dinge nicht zu, ist sie schnell nicht mehr die richtige Antwort.',
        ],
      },
      {
        h2: 'Das Gepäck entscheidet wirklich',
        body: [
          'Mehr als der Preis und mehr als die Zeit entscheidet das Gepäck, und es ist das, was man beim Buchen von zu Hause aus unterschätzt.',
          'Ein Taxi in Barcelona mit vier Sitzen, ein Corolla oder ein SEAT Toledo, nimmt vier Fahrgäste und etwa drei Koffer auf. Vier Erwachsene mit je einem großen Koffer passen nicht hinein, und die Antwort ist ein Vito mit sechs Sitzen, der sechs Fahrgäste und sechs Koffer aufnimmt, oder eine V-Klasse mit sieben Sitzen. Das vorher zu wissen, ist der Unterschied zwischen einem Transfer und einem Problem am Bordstein.',
          'Im Aerobús kommt das Gepäck in ein Fach unter dem Bus, und an der Tür gibt es ein Gestell, was gut funktioniert. In der Metro kommt es dorthin, wo Sie es festhalten können, und das ist zur Hauptverkehrszeit auf Ihnen.',
          'Die Faustregel, die sich bewährt: ein Gepäckstück pro Person, und Sie haben echte Wahl zwischen allen dreien. Zwei Stücke pro Person, und das Taxi ist das einzige, das wirklich angenehm ist, was auch immer die Rechnung sagt.',
        ],
      },
      {
        h2: 'Wann das Taxi klar gewinnt',
        body: [
          'Bei Ankunft nach Mitternacht. Der Aerobús fährt in den frühen Morgenstunden nicht mehr und die Metro schließt, dazwischen gibt es ein begrenztes Nachtbusnetz, das mit Gepäck und ohne Katalanisch keine realistische Option ist.',
          'Bei Reisen mit Kindern, Kinderwagen oder Kindersitz. Der Bus ist mit einem Kind zu schaffen und mit zweien mühsam, und niemand mag den Umstieg in der Metro mit Kinderwagen und Koffer.',
          'Bei einem frühen Flug. Eine Abholung um 04:30 Uhr für einen Abflug um 06:30 Uhr hat im öffentlichen Verkehr keine Entsprechung, und ein gebuchtes Fahrzeug zum Festpreis ist die einzige Variante, bei der Sie bis zum Wecker schlafen können.',
          'Bei einer Unterkunft, deren letztes Stück wirklich umständlich ist: das Gotische Viertel, wo Fahrzeuge viele Adressen nicht erreichen, aber viel näher herankommen als bis zu einer Bushaltestelle; Gràcia und Sarrià, den Hang hinauf von jeder Buslinie aus; überall dort, wo Sie sonst mit einem zweiten Taxi enden würden, wodurch die „günstigere“ Variante mehr kostet.',
          'Bei Gruppen ab vier Personen. Dann hat der Preis pro Fahrzeug schon beim Geld gewonnen, der Komfort kostet also nichts extra.',
        ],
      },
      {
        h2: 'Wann nicht, und das sagen wir ehrlich',
        body: [
          'Eine oder zwei Personen, leichtes Gepäck, Unterkunft in der Nähe der Plaça de Catalunya oder an einer direkten Metrolinie, Ankunft mitten am Tag. In dieser Lage ist der Aerobús die vernünftige Wahl, die Metro die günstige, und ein Taxi für 50 € bedeutet, dass Sie für Komfort zahlen, den Sie nicht besonders brauchen.',
          'Das schreiben wir lieber auf, als so zu tun, als wäre das Taxi immer richtig. Ein Flughafentransfer ist eine Dienstleistung mit einer bestimmten Form, nämlich fester Preis, zugeteilter Fahrer, von Tür zu Tür, Gepäck wird abgenommen, und diese Form ist für eine Familie zu viert um Mitternacht etwas wert und für eine einzelne Person mit Rucksack um zwei Uhr nachmittags sehr wenig.',
          'Dieselbe Logik gilt für den Standplatz. Ein Taxi nach Taxameter vom Standplatz an einem ruhigen Werktagnachmittag kommt oft unter einem gebuchten Festpreis heraus, weil der Festpreis ein Verkehrsrisiko abdeckt, das an diesem Tag nicht eingetreten ist. So funktionieren Festpreise, in beide Richtungen.',
        ],
      },
      {
        h2: 'Die Lücke in der Nacht, die niemand erwähnt',
        body: [
          'Es gibt ein Zeitfenster, ungefähr vom letzten Aerobús bis zur ersten Metro am Morgen, in dem sich die öffentlichen Verkehrsmittel auf einen Nachtbus reduzieren und der Standplatz zur Regel wird. In einer normalen Nacht ist der Standplatz am T1 gut beaufsichtigt und kommt schnell voran.',
          'Schiefgehen kann es, wenn ein verspäteter Flug genau in dieses Fenster fällt und zugleich zwei andere verspätete Flüge landen. Dann ist die Schlange vierzig Personen lang, und das Angebot an Taxis um 02:00 Uhr ist dünn, weil Fahrer nicht auf gut Glück an einem Terminal sitzen. Das ist das eine Szenario, in dem es klar mehr wert ist, mit einem bereits zugeteilten Fahrzeug anzukommen, als es kostet.',
          'Wenn Ihr Flug planmäßig nach etwa 23:30 Uhr landet, sollten Sie das vor dem Flug entscheiden und nicht in der Ankunftshalle.',
        ],
      },
      {
        h2: 'Zurück zum Flughafen ist ein anderes Problem',
        body: [
          'Fast alle planen die Ankunft und improvisieren die Abreise, und die Abreise ist die schwierigere Hälfte.',
          'Auf dem Hinweg haben Sie Optionen, weil Sie an einem Flughafen stehen, dem einzigen Ort der Region, an dem es garantiert Taxis gibt. Auf dem Rückweg stehen Sie um 05:00 Uhr auf einer Straße in Gràcia mit einem Flug um 07:30 Uhr, und alles, was Bus und Metro attraktiv gemacht hat, fährt nicht mehr.',
          'Der Aerobús hilft bei frühen Abflügen nicht, und ein Taxi vor Morgengrauen in einer Wohnstraße anzuhalten, ist unzuverlässig, anders als auf der Gran Via. Barcelona hat reichlich Taxis; es hat nicht reichlich Taxis an Ihrer Ecke um fünf Uhr morgens.',
          'Bei einer Abreise tagsüber von einer zentralen Adresse funktionieren alle drei Möglichkeiten in umgekehrter Richtung genauso wie bei der Ankunft, und es gilt dieselbe Rechnung. Bei allem vor etwa 07:00 Uhr oder von einer Adresse abseits des Hauptnetzes ist eine gebuchte Abholung weniger eine Bequemlichkeit als die einzige Variante, die zuverlässig klappt. Der Festpreis ist in beide Richtungen derselbe: 50 € in die Stadt und 50 € hinaus, werktags, Fahrzeug mit vier Sitzen.',
        ],
      },
      {
        h2: 'So entscheiden Sie in zehn Sekunden',
        body: [
          'Zählen Sie die Personen und zählen Sie die Taschen. Eine oder zwei Personen mit je einer Tasche, Ankunft bei Tageslicht, zentrale Unterkunft: nehmen Sie den Aerobús, oder die Metro, wenn Sie jeden Euro umdrehen.',
          'Drei oder mehr Personen, oder mehr als zwei Taschen pro Person, oder eine Ankunft, nachdem die Busse nicht mehr fahren, oder eine Adresse am Hang oder in einer Gasse: nehmen Sie ein Taxi und entscheiden Sie getrennt davon, ob Sie den Standplatz wollen oder ein im Voraus gebuchtes Fahrzeug.',
          'Standplatz oder gebucht läuft auf eine Frage hinaus: Wie sehr würde eine Schlange von vierzig Minuten oder ein unbekannter Endbetrag Ihren Abend beeinträchtigen? Lautet die Antwort „nicht sehr“, dann ist der Standplatz direkt vor der Ankunftshalle und kostet weniger. Reisen Sie mit Menschen, die damit nicht zurechtkommen, oder gegen eine Frist, dann buchen Sie.',
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: 'Flughafen Barcelona: Terminal 1 und 2 erklärt',
    description:
      'Welches Terminal Ihre Airline in El Prat nutzt, wie der Shuttle von T1 zu T2 fährt, wo die Taxistände sind und wo ein gebuchter Fahrer Sie stattdessen erwartet.',
    h1: 'Flughafen Barcelona: Terminal 1 und Terminal 2',
    excerpt:
      'Das falsche Terminal kostet eine Shuttlefahrt und zwanzig Minuten, und beim Abflug kann es den Flug kosten. Hier steht, welches welches ist, wo an jedem die Taxis tatsächlich stehen und was Sie am Tag vorher prüfen sollten.',
    sections: [
      {
        h2: 'Zwei Terminals, mehrere Kilometer voneinander entfernt',
        body: [
          'Barcelona El Prat hat zwei Passagierterminals, T1 und T2, und das Wichtigste, was man über sie wissen muss, ist, dass man nicht zu Fuß von einem zum anderen kommt. Sie liegen auf gegenüberliegenden Seiten der Start- und Landebahnen, ein paar Kilometer auseinander, verbunden durch einen kostenlosen Shuttlebus.',
          'Das überrascht, weil „Terminal“ an vielen Flughäfen ein anderer Flügel desselben Gebäudes ist. Hier ist es ein anderes Gebäude mit einer Busfahrt dazwischen, und die Fahrt dauert 10 bis 15 Minuten, ohne die Wartezeit auf den Bus.',
          'T1 ist das neuere und viel größere der beiden, 2009 eröffnet, und es wickelt den größten Teil des Langstreckenverkehrs ab, dazu den Großteil von Vueling und die traditionellen Fluggesellschaften. T2 ist das ursprüngliche Terminal, älter und mit niedrigeren Decken, in drei Blöcke gegliedert und für einige Billigfluggesellschaften zuständig.',
          'Beide sind vollständig ausgestattet: Check-in, Sicherheitskontrolle, Geschäfte, Essen, Autovermietung, Taxistände. Keines ist ein abgelegener Außenposten. Die einzige echte Strafe für das falsche ist die Zeit.',
        ],
      },
      {
        h2: 'Welche Fluggesellschaft wo',
        body: [
          'T1 bedient das meiste, was von außerhalb Europas ankommt, dazu Vueling, die dominierende Fluggesellschaft am Flughafen, und die meisten der traditionellen nationalen Fluggesellschaften.',
          'T2 bedient eine Reihe von Billigfluggesellschaften, darunter Ryanair als eine der größten, dazu etwas Charter- und Saisonverkehr.',
          'Der nützliche Vorbehalt: Das ist nicht stabil. Fluggesellschaften wechseln das Terminal, wenn sich ihre Verträge ändern, manchmal mit wenigen Wochen Vorlauf, und Saisonflugpläne mischen es weiter durch. Ein Ratgeber, der Ihnen mit Gewissheit sagt, welches Terminal Ihre Fluggesellschaft nutzt, sagt Ihnen, welches sie nutzte, als der Ratgeber geschrieben wurde.',
          'Codeshare-Flüge machen es schlimmer. Wenn Sie bei einer Fluggesellschaft gebucht haben und mit dem Flugzeug einer anderen fliegen, richtet sich das Terminal nach der durchführenden Gesellschaft und nicht nach der auf Ihrer Buchungsbestätigung. Maßgeblich ist das Terminal auf Ihrer Bordkarte, und sie ist die einzige Quelle, der man trauen sollte.',
        ],
      },
      {
        h2: 'Zwischen T1 und T2 wechseln',
        body: [
          'Der Shuttlebus zwischen den Terminals ist kostenlos, fährt häufig und auch nachts, in den frühen Morgenstunden allerdings seltener. Er hält vor der Ankunftshalle von T1 und an jedem Block von T2.',
          'Planen Sie 25 Minuten von Tür zu Tür ein und nicht die 10 bis 15, die die Fahrt selbst dauert: Sie warten auf den Bus, laden Gepäck ein und gehen am anderen Ende noch zu Fuß. Zu Stoßzeiten, bei vollem Bus und nur Stehplätzen, dauert es länger und ist mit Koffern deutlich unangenehmer.',
          'Auch die Linie 9 Sud der Metro verbindet die beiden Terminals, mit je einer Station, was manchmal schneller ist, als auf den Bus zu warten, wenn man ohnehin schon unten ist. Sie ist nicht kostenlos und verlangt den Flughafentarif.',
          'Wenn Sie zwischen einem Flug nach T2 und einem Anschlussflug ab T1 auf getrennten Tickets umsteigen, behandeln Sie den Wechsel als echten Abschnitt der Reise und geben Sie ihm eine Stunde. Daran verpassen Leute Flüge.',
        ],
      },
      {
        h2: 'T2 besteht aus drei Blöcken, und der Block ist wichtig',
        body: [
          'T2 ist in die Blöcke A, B und C gegliedert, die in einer Reihe an der Vorderseite des Gebäudes liegen. Innen sind sie verbunden, man kann also von einem zum anderen gehen, aber der Weg von einem Ende zum anderen dauert mehrere Minuten.',
          'Ihre Fluggesellschaft nutzt einen bestimmten Block, und Check-in-Schalter, Sicherheitskontrolle und Taxistand sind an ihn gebunden. Wenn Sie an Block C abgesetzt werden und Block A brauchen, ist das keine Katastrophe, aber ein Fußweg mit Gepäck, den Sie nicht geplant hatten.',
          'Wenn Sie einen Transfer mit Abholung oder Absetzen an T2 buchen, sollten Sie den Block angeben. Das ist der Unterschied zwischen einem Fahrer, der dort steht, wo Sie herauskommen, und einem, der dreihundert Meter weiter an der Front wartet.',
        ],
      },
      {
        h2: 'Wo die Taxistände sind',
        body: [
          'Beide Terminals haben offizielle Taxistände unmittelbar vor der Ankunftshalle, deutlich beschildert, beaufsichtigt und meist gut besucht. Am T1 liegt der Taxistand direkt vor der Ankunftshalle. Am T2 gibt es Taxistände für jeden der Blöcke.',
          'Die Taxis an diesen Ständen sind zugelassene Taxis von Barcelona in der üblichen schwarz-gelben Lackierung, alle mit demselben regulierten Taxameter. Es gibt kein Verhandeln und keine Auswahl, Sie nehmen das Fahrzeug an der Spitze. So ist das System gedacht, und es heißt, dass man gegenüber dem Tarif nicht zu viel berechnet bekommen kann.',
          'Jede Fahrt, die am Flughafen beginnt, trägt einen Zuschlag von 4,60 € und wird mit mindestens 21 € Mindestpreis berechnet; beides gehört zum offiziellen Tarif und wurde nicht vom Fahrer aufgeschlagen.',
          'Was der Standplatz nicht kann: Ihnen den Preis vor der Abfahrt nennen oder garantieren, dass bei Ihrer Landung ein Fahrzeug da ist. An einem normalen Nachmittag ist beides in Ordnung. Nach einer Häufung verspäteter später Ankünfte ist die Schlange die ganze Geschichte.',
        ],
      },
      {
        h2: 'Wo Sie stattdessen Ihr gebuchter Fahrer trifft',
        body: [
          'Ein vorab gebuchter Transfer nutzt den Taxistand nicht, und das ist der Punkt, den die Leute bei der Ankunft am häufigsten falsch machen.',
          'Ihr Fahrer wartet in der Ankunftshalle, auf der öffentlichen Seite des Ausgangs von der Gepäckausgabe, und hält ein Schild mit Ihrem Namen. Er steht nicht am Bordstein und nicht in der Warteschlange am Taxistand. Sie kommen aus der Gepäckausgabe, und er steht da, und genau darum bucht man.',
          'Der genaue Treffpunkt wird vor der Reise per E-Mail bestätigt, denn er unterscheidet sich je nach Terminal und am T2 je nach Block. Lesen Sie diese E-Mail im Flugzeug und nicht in der Halle.',
          'Der Fahrer verfolgt Ihre Flugnummer, sodass sich bei einer Verspätung die Abholung verschiebt, statt zu entfallen. Das ist der praktische Unterschied zwischen einem gebuchten Fahrzeug und dem Taxistand: Bei einer Landung eine Stunde zu spät um 01:00 Uhr ist der Fahrer noch da, statt eines Taxistands, der sich ausgedünnt hat.',
          'Wenn Sie sich nicht finden, erreicht die Telefonnummer in der Bestätigung den Fahrer direkt und kein Callcenter. Ankunftshallen sind groß, und Schilder werden gesenkt; ein Anruf löst es.',
        ],
      },
      {
        h2: 'Ändert das Terminal den Preis?',
        body: [
          'Kaum, und bei einem gebuchten Transfer überhaupt nicht.',
          'T1 liegt ein paar Kilometer weiter von der Stadt entfernt als T2. Auf einer Fahrt von 15 Kilometern ins Zentrum von Barcelona ist der Unterschied klein, und der Flughafenzuschlag von 4,60 € ist von beiden Terminals gleich. Auf dem Taxameter sehen Sie vielleicht ein oder zwei Euro Unterschied.',
          'Ein gebuchter Festpreis unterscheidet überhaupt nicht zwischen beiden: 50 € in die Stadt im Fahrzeug mit vier Sitzen von T1 oder T2, werktags, mit dem bereits im Betrag enthaltenen Zuschlag. Dasselbe gilt umgekehrt für Abflüge.',
          'Was das Terminal ändert, ist das Shuttle-Risiko. Wenn Sie am falschen abgesetzt werden, kostet es 25 Minuten und einen Bus, was bei einer Ankunft ärgerlich ist und bei einem Abflug der Flug sein kann.',
        ],
      },
      {
        h2: 'Abflug: wo ein Fehler wirklich wehtut',
        body: [
          'Bei der Ankunft kostet das falsche Terminal Zeit. Beim Abflug kann es die Reise kosten, denn Sie merken den Fehler an einem Check-in-Schalter, der Ihren Flug nicht hat, und an einem Shuttle, das 25 Minuten braucht, die Sie nicht haben.',
          'Nennen Sie das Terminal, wenn Sie einen Transfer zum Abflug buchen, und prüfen Sie es anhand der Bordkarte und nicht aus der Erinnerung an den Hinflug. Fluggesellschaften nutzen routinemäßig in jede Richtung andere Terminals, und ein Rückflug mit Codeshare kann leicht ein anderes Terminal haben als der Hinflug.',
          'Wer für einen Flug um 06:30 Uhr in El Prat sein muss, braucht bei früher Abreise eine Abholung in der Stadt gegen 04:30 Uhr, früher, wenn Sie weiter draußen wohnen. Ein gebuchtes Fahrzeug zum Festpreis ist die einzige Variante, bei der man nicht im Morgengrauen auf der Straße steht und hofft.',
        ],
      },
      {
        h2: 'Wie lange Sie wirklich brauchen, um herauszukommen',
        body: [
          'Die Zeit, die für eine Abholung zählt, ist nicht die der Landung, sondern die, zu der Sie aus der Gepäckausgabe kommen, und der Abstand zwischen beiden ist größer, als die meisten einplanen.',
          'Bei einer Ankunft aus dem Schengen-Raum nur mit Handgepäck sind zehn bis fünfzehn Minuten vom Aufsetzen bis zur Ankunftshalle realistisch. Von außerhalb des Schengen-Raums, mit Passkontrolle und aufgegebenem Gepäck, ist eine halbe Stunde normal und eine Stunde kommt vor, besonders am T1 am Vormittag, wenn mehrere Langstreckenflüge zusammen landen und die Schlange an der Kontrolle der Engpass ist und nicht das Gepäckband.',
          'Deshalb ist ein gebuchter Transfer an Ihre Flugnummer gekoppelt und nicht an eine Uhrzeit, die Sie eingetippt haben. Der Fahrer beobachtet die tatsächliche Landung und berücksichtigt die Halle, wodurch die Schätzung entfällt, die Sie sonst beim Buchen von zu Hause Wochen vorher treffen müssten.',
          'Es heißt auch, dass es nichts nützt, die eigene Schätzung aufzupolstern. Eine Abholung eine Stunde nach der Landung „zur Sicherheit“ zu buchen, hilft nicht, denn die Verfolgung übernimmt das bereits, und Sie warten dann auf ein Fahrzeug, das absichtlich spät ist.',
          'Das Einzige, was Sie selbst tun sollten: Wenn Sie ungewöhnlich schnell durch die Gepäckausgabe kommen und Ihr Fahrer noch nicht an seiner Position ist, erreicht ihn die Telefonnummer in der Bestätigung direkt. Ein Fahrzeug, das noch acht Minuten entfernt ist, ist das normale Ergebnis eines schnellen Ausgangs und kein Problem.',
        ],
      },
      {
        h2: 'Am Tag vorher prüfen',
        body: [
          'Eine Gewohnheit beseitigt fast alles davon: Öffnen Sie am Abend vor dem Flug die Bordkarte und lesen Sie das Terminal ab. Nicht die Buchungsbestätigung, nicht den Ratgeber, den Sie im März gelesen haben, nicht die allgemeine Streckenseite der Fluggesellschaft, sondern die Bordkarte für den Flug, den Sie antreten.',
          'Wenn es nicht zu dem passt, was Sie uns genannt haben, antworten Sie auf die Bestätigungs-E-Mail, dann ändern wir es. Das Terminal in einer Buchung zu ändern, kostet nichts und dauert eine Minute. Es um 05:00 Uhr zu entdecken, kostet das Shuttle, den Stress und manchmal den Flug.',
        ],
      },
    ],
  },
};
