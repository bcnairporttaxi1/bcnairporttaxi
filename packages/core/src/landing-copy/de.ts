import type { LandingCopy } from '../landing-pages';

/** German long-form copy for the keyword landing pages. */
export const DE_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Flughafen Barcelona Zentrum | Online buchen',
    description:
      'Buchen Sie ein Taxi vom Flughafen Barcelona ins Zentrum. Offizieller AMB-Taxameterpreis, El-Prat-Zuschlag in der Schätzung enthalten, Fahrer wartet in der Ankunftshalle.',
    h1: 'Taxi vom Flughafen Barcelona ins Zentrum',
    intro:
      'Ein Taxi von El Prat ins Zentrum von Barcelona braucht je nach Verkehr und Terminal 25 bis 35 Minuten. Wer vorab bucht, hat bei der Landung bereits einen zugeteilten Fahrer mit Namensschild in der Ankunftshalle — statt sich am Taxistand von T1 oder T2 anzustellen.',
    sections: [
      {
        h2: 'Was ein Transfer vom Flughafen Barcelona kostet',
        body: 'Der Preis richtet sich nach dem offiziellen AMB-Taxameter. Ab El Prat zahlen Sie den Taxameterbetrag plus den festen Flughafenzuschlag, und für sehr kurze Fahrten ab dem Flughafen gilt ein Mindestpreis. In der Praxis liegt eine Fahrt vom Flughafen ins Zentrum meist zwischen fünfunddreißig und fünfundvierzig Euro, nachts und am Wochenende höher, wenn der Tarif T-2 greift. Geben Sie oben Ihr genaues Ziel ein für eine präzise Schätzung.',
      },
      {
        h2: 'Wo Ihr Fahrer auf Sie wartet',
        body: 'Ihr Fahrer wartet in der Ankunftshalle Ihres Terminals mit einem Namensschild und verfolgt Ihre Flugnummer — eine Verspätung kostet Sie also nicht den Wagen. Der genaue Treffpunkt für T1 und T2 steht in Ihrer Bestätigungsmail.',
      },
      {
        h2: 'Terminal 1 und Terminal 2',
        body: 'Beide Terminals haben offizielle Taxistände, und unsere Fahrer bedienen beide. T1 wickelt den Großteil des Langstreckenverkehrs und von Vueling ab; T2 bedient viele Billigfluggesellschaften. Der Preisunterschied ist gering — ein paar Kilometer —, wobei T1 etwas weiter von der Stadt entfernt liegt.',
      },
    ],
  },

  'city-to-airport': {
    title: 'Taxi Barcelona zum Flughafen | Online buchen',
    description:
      'Buchen Sie ein Taxi von Barcelona zum Flughafen El Prat. Feste Abholzeit, offizieller Taxameterpreis und Fahrer, die die Terminaleinfahrten kennen.',
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
        body: 'Die erste Abflugwelle verlässt El Prat vor 07:00 Uhr, was Abholungen ab 04:30 Uhr bedeutet. Diese Fahrten laufen über den Nachttarif T-2, und wir bestätigen den Fahrer am Vorabend, damit um vier Uhr früh nichts mehr zu klären ist.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Flughafen El Prat | Lizenzierte Transfers',
    description:
      'Lizenzierte Taxis von und zum Flughafen Barcelona-El Prat (BCN). Online buchen mit Schätzung nach offiziellem AMB-Tarif und einem Ihrem Flug zugeteilten Fahrer.',
    h1: 'Taxi Flughafen El Prat',
    intro:
      'Der Flughafen Josep Tarradellas Barcelona-El Prat, den fast alle weiterhin schlicht El Prat nennen, liegt rund 15 km südwestlich der Stadt. Er ist der zweitgrößte Flughafen Spaniens, und das Taxi ist zu fast jeder Stunde der schnellste Weg nach Barcelona — sofern ein Wagen bereitsteht.',
    sections: [
      {
        h2: 'Vorab buchen statt anstehen',
        body: 'Der offizielle Stand in El Prat ist gut organisiert und bewegt sich meist zügig. Er staut sich zu vorhersehbaren Zeiten: bei den Ankunftswellen am späten Vormittag, sonntagabends und wenn mehrere Langstreckenflüge gleichzeitig landen. Eine Vorabbuchung nimmt dieses Risiko vollständig heraus und legt Ihren Fahrer fest — zum selben Taxameterpreis.',
      },
      {
        h2: 'Der Flughafenzuschlag',
        body: 'Jede Fahrt, die in El Prat beginnt oder endet, enthält einen festen, von der AMB festgelegten Flughafenzuschlag, und für Fahrten ab dem Flughafen gilt ein Mindestpreis. Beides ist in der Schätzung vor der Buchung enthalten — am Taxameter gibt es also keine Überraschung.',
      },
      {
        h2: 'Kreuzfahrtgäste',
        body: 'Für Anschlüsse zu einer Kreuzfahrt gilt zwischen El Prat und dem Kreuzfahrtterminal Moll Adossat ein eigener, offiziell festgelegter Festpreis statt des Taxameters. Geben Sie das Kreuzfahrtterminal als Ziel ein, und die Schätzung wechselt automatisch auf diesen Festpreis.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Taxipreis Flughafen Barcelona | AMB-Tarife 2026',
    description:
      'Was ein Taxi zum Flughafen Barcelona wirklich kostet: die offizielle AMB-Tariftabelle, der El-Prat-Zuschlag, der Mindestpreis ab Flughafen und unsere Buchungsgebühr.',
    h1: 'Taxipreis zum Flughafen Barcelona',
    intro:
      'Taxipreise in Barcelona sind reguliert. Kein lizenziertes Taxi darf mehr oder weniger verlangen als das offizielle AMB-Taxameter. Die ehrliche Antwort auf „Was kostet das?" ist deshalb eine Rechnung, keine Verkaufszahl. So funktioniert diese Rechnung genau.',
    sections: [
      {
        h2: 'Wie Ihr Fahrpreis zustande kommt',
        body: 'Jede Fahrt beginnt mit einem festen Grundpreis und addiert dann einen Kilometerpreis. Welcher Satz gilt, hängt vom Zeitpunkt ab: T-1 ist der Tagestarif Montag bis Freitag zwischen 08:00 und 20:00 Uhr, T-2 der höhere Satz für Nächte, den gesamten Samstag und Sonntag sowie Feiertage. Zuschläge für Flughafen, Kreuzfahrthafen, Bahnhof Sants und Fira Gran Via kommen hinzu, begrenzt durch einen Höchstbetrag je Fahrt.',
      },
      {
        h2: 'Gibt es ein günstiges Taxi ab dem Flughafen?',
        body: 'Nicht in dem Sinne, dass ein Anbieter den anderen unterbietet: Das AMB-Taxameter ist in jedem lizenzierten Taxi identisch, niemand kann beim Fahrpreis legal billiger sein. Beeinflussen können Sie Zeitpunkt und Fahrzeug. Eine Fahrt im Tagesfenster T-1 kostet spürbar weniger pro Kilometer als nachts oder am Wochenende, und für vier Personen schlägt ein Wagen vier Einzeltickets. Seien Sie misstrauisch bei Preisen deutlich unter dem Taxameter — das deutet meist auf ein nicht lizenziertes Fahrzeug hin.',
      },
      {
        h2: 'Der Mindestpreis ab Flughafen',
        body: 'Für Fahrten, die in El Prat beginnen, gilt ein Mindestpreis. Liegt der Taxameterbetrag bei einer kurzen Fahrt darunter, zahlen Sie den Mindestpreis. Das betrifft vor allem Fahrten nach El Prat Ort oder zu nahegelegenen Hotels, nicht Fahrten nach Barcelona.',
      },
      {
        h2: 'Was wir berechnen',
        body: 'Unsere Buchungsgebühr ist ein Prozentsatz des Fahrpreises, online bei der Reservierung fällig: 20% von Montag bis Freitag, 25% an Wochenenden, Feiertagen und in besonderen Nächten. Sie ist ein Serviceentgelt für die Vermittlung, kein Aufschlag auf den Fahrpreis, und erscheint nie auf dem Taxameter. Sie sehen sie vor der Zahlung als eigene Position und erhalten dafür eine separate Quittung. Alternativ zahlen Sie die gesamte Fahrt zum Festpreis im Voraus — dann ist im Taxi nichts mehr offen.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcelona Flughafen | Tür zu Tür',
    description:
      'Buchen Sie ein Taxi von Ihrem Hotel in Barcelona zum Flughafen El Prat oder vom Flughafen bis vor Ihre Hoteltür. Tür zu Tür, lizenziert, zum offiziellen Taxameterpreis.',
    h1: 'Hotel-Flughafen-Transfers in Barcelona',
    intro:
      'Die meisten unserer Buchungen sind Hoteltransfers, in beide Richtungen. Ein Tür-zu-Tür-Taxi nimmt den Teil der Reise heraus, den man am meisten unterschätzt: das Gepäck von der Lobby bis zu einem Taxistand zu schleppen — oder nach einem langen Flug die richtige Adresse zu finden.',
    sections: [
      {
        h2: 'Taxi vom Hotel zum Flughafen',
        body: 'Nennen Sie uns den Hotelnamen, um den Rest kümmern wir uns. In den engen Gassen des Gotischen Viertels und von El Born, wo Autos nicht immer bis zum Eingang kommen, vereinbaren wir den nächstgelegenen erreichbaren Abholpunkt vorab, statt es am Tag selbst dem Zufall zu überlassen.',
      },
      {
        h2: 'Transfer vom Flughafen zum Hotel',
        body: 'In der Gegenrichtung empfängt Sie Ihr Fahrer in der Ankunftshalle mit Namensschild und bringt Sie direkt bis zum Hoteleingang. Wertvoll mit Kindern, schwerem Gepäck oder bei einer späten Landung.',
      },
      {
        h2: 'Apartments und Ferienwohnungen',
        body: 'Dasselbe gilt für Kurzzeitapartments und Airbnb-Adressen. Tragen Sie den Türcode oder den genauen Eingang in die Buchungsnotizen ein, dann liegt Ihrem Fahrer das vor der Abholung vor.',
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Taxi Bahnhof Sants zum Flughafen Barcelona',
    description:
      'Buchen Sie ein Taxi vom Bahnhof Barcelona-Sants zum Flughafen El Prat. Rund 15 Minuten, offizieller Taxameterpreis inklusive Bahnhofszuschlag.',
    h1: 'Taxi vom Bahnhof Sants zum Flughafen',
    intro:
      'Sants ist der Hauptbahnhof Barcelonas und Ankunftspunkt der AVE-Züge aus Madrid, Valencia und Sevilla. Er ist zugleich der dem Flughafen nächstgelegene große Verkehrsknoten: Die Taxifahrt dauert außerhalb der Stoßzeiten etwa 15 Minuten.',
    sections: [
      {
        h2: 'Der Zuschlag für den Bahnhof Sants',
        body: 'Fahrten, die am Bahnhof Sants beginnen oder enden, enthalten zusätzlich zum Taxameterpreis einen kleinen festen Zuschlag der AMB. Zusammen mit dem Flughafenzuschlag sind beide in der Schätzung vor der Buchung enthalten, und die Summe der Zuschläge ist je Fahrt gedeckelt.',
      },
      {
        h2: 'Wo Sie Ihren Fahrer treffen',
        body: 'Der offizielle Taxistand liegt auf der Seite der Plaça dels Països Catalans. Bei einem vorgebuchten Transfer legen wir bei der Buchung einen genauen Treffpunkt fest — in Sants durchaus sinnvoll, denn der Bahnhof ist groß und hat mehrere Ausgänge.',
      },
      {
        h2: 'Anschluss vom AVE',
        body: 'Wenn Sie mit dem AVE ankommen, legen Sie die Abholung etwa 15 Minuten nach der planmäßigen Ankunft, damit Sie mit Gepäck vom Bahnsteig auf die Straße kommen.',
      },
    ],
  },

  'private-transfer': {
    title: 'Privattransfer Flughafen Barcelona | Ihr eigenes Taxi',
    description:
      'Ein privater Transfer ab dem Flughafen Barcelona: Ihr lizenziertes Taxi allein für Sie, ohne Teilen und ohne Warten auf andere Fahrgäste, zum offiziellen AMB-Tarif.',
    h1: 'Privattransfer Flughafen Barcelona',
    intro:
      'Jede Buchung hier ist ein Privattransfer. Das Fahrzeug gehört Ihnen allein: kein Sammelshuttle, keine Umwege zu weiteren Fahrgästen, keine feste Abfahrtszeit. Sie fahren direkt vom Abholpunkt zum Ziel.',
    sections: [
      {
        h2: 'Privat oder Sammelshuttle',
        body: 'Sammelshuttles sind pro Kopf günstiger, sammeln aber mehrere Parteien ein und setzen sie nacheinander ab, was einer 30-Minuten-Fahrt gut eine Stunde hinzufügen kann. Ab zwei Reisenden schrumpft der Preisabstand deutlich, und für eine Familie mit Gepäck ist ein Privattaxi meist zugleich schneller und einfacher.',
      },
      {
        h2: 'Fahrzeugwahl',
        body: 'Standardtaxi für bis zu vier Personen, Mercedes Vito für sechs, V-Class für sieben mit entsprechendem Gepäck. Der Taxameterpreis ändert sich nicht mit der Fahrzeuggröße — der AMB-Tarif ist derselbe —, wählen Sie also nach Kapazität und Komfort.',
      },
      {
        h2: 'Geschäftsreisen',
        body: 'Für Geschäftsreisen können wir die V-Class einsetzen und die Taxirechnung für Ihre Spesenabrechnung bereitstellen. Bitten Sie Ihren Fahrer im Wagen um die Taxameterrechnung; die Quittung für die Buchungsgebühr senden wir separat per E-Mail.',
      },
    ],
  },

  '24-hour-taxi': {
    title: '24-Stunden-Taxi Flughafen Barcelona | Nachttransfers',
    description:
      'Rund-um-die-Uhr-Taxiservice am Flughafen Barcelona. Buchen Sie nächtliche Landungen und Abfahrten vor Sonnenaufgang zum offiziellen AMB-Nachttarif.',
    h1: '24-Stunden-Taxi am Flughafen Barcelona',
    intro:
      'El Prat arbeitet rund um die Uhr, der Taxiservice ebenso. Die Zeiten, die sich wirklich zu buchen lohnen, sind die unbequemen: Landungen nach Mitternacht und Abflüge, die eine Abholung vor Tagesanbruch verlangen.',
    sections: [
      {
        h2: 'Der Nachttarif',
        body: 'Zwischen 20:00 und 08:00 Uhr, am gesamten Wochenende und an Feiertagen gilt der höhere Tarif T-2. Er wird von der AMB festgelegt und gilt für jedes lizenzierte Taxi in Barcelona gleichermaßen — es ist kein Aufschlag von uns. Ihre Schätzung verwendet automatisch den richtigen Tarif für Ihre tatsächliche Abholzeit. Für Heiligabend und Silvester kommt zusätzlich ein offizieller Zuschlag hinzu.',
      },
      {
        h2: 'Späte Ankünfte',
        body: 'Landet Ihr Flug um 01:00 Uhr, ist der Stand in El Prat weiterhin besetzt, doch die Abdeckung dünnt im Lauf der Nacht aus. Ein gebuchter Wagen mit hinterlegter Flugnummer ist der Unterschied zwischen direkt hinausgehen und warten.',
      },
      {
        h2: 'Abfahrten vor Tagesanbruch',
        body: 'Abholungen ab 04:00 Uhr sind für uns Routine. Buchen Sie spätestens am Vorabend, dann bestätigen wir Ihnen den Fahrer per E-Mail — zu dieser Uhrzeit bleibt nichts mehr zu regeln.',
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Taxi Gotisches Viertel zum Flughafen Barcelona',
    description:
      'Buchen Sie ein Taxi vom Gotischen Viertel zum Flughafen Barcelona. Wir vereinbaren vorab einen erreichbaren Abholpunkt, denn die meisten Gassen im Barri Gòtic sind zu eng.',
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
    ],
  },

  'neighborhoods/eixample': {
    title: 'Taxi Eixample zum Flughafen Barcelona | Tür zu Tür',
    description:
      'Buchen Sie ein Taxi vom Eixample zum Flughafen Barcelona-El Prat. Unkomplizierte Tür-zu-Tür-Abholung im Raster, zum offiziellen AMB-Tarif.',
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
        h2: 'Hotels im Viertel',
        body: 'Im Eixample liegt ein großer Teil der Hotels Barcelonas, darunter fast alle am Passeig de Gràcia. Geben Sie statt der Adresse den Hotelnamen ein, wir finden ihn.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Stadtzentrum Barcelona zum Flughafen',
    description:
      'Buchen Sie ein Taxi vom Stadtzentrum Barcelonas zum Flughafen El Prat. Abholung an jeder zentralen Adresse, offizieller Taxameterpreis, Fahrer vorab bestätigt.',
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
        h2: 'Was die Fahrt kostet',
        body: 'Der Taxameterbetrag vom Zentrum bis El Prat plus den festen Flughafenzuschlag. Nachts und am Wochenende gilt der höhere Tarif T-2. Geben Sie Ihre Adresse ein für eine genaue Schätzung, bevor Sie sich festlegen.',
      },
    ],
  },

  'book-online': {
    title: 'Taxi Flughafen Barcelona online buchen | Sofortpreis',
    description:
      'Buchen Sie in Minuten ein Taxi zum Flughafen Barcelona. Sofortige Schätzung nach offiziellen AMB-Tarifen, sichere Zahlung, sofortige Bestätigung per E-Mail.',
    h1: 'Taxi zum Flughafen Barcelona online buchen',
    intro:
      'Die Onlinebuchung dauert zwei Minuten und sichert Ihnen einen bestätigten Wagen mit zugeteiltem Fahrer. Zahlen Sie jetzt nur die Buchungsgebühr und den Taxameterbetrag beim Fahrer — oder zahlen Sie die ganze Fahrt zum Festpreis vorab und schulden im Taxi nichts mehr.',
    sections: [
      {
        h2: 'Was Sie für die Buchung brauchen',
        body: 'Ihre Abholadresse, das Ziel, Datum und Uhrzeit sowie eine Telefonnummer. Für Abholungen am Flughafen geben Sie Ihre Flugnummer an, damit Ihr Fahrer die Landung verfolgen kann. Buchungen brauchen mindestens drei Stunden Vorlauf; für alles Kurzfristigere schreiben Sie uns auf WhatsApp.',
      },
      {
        h2: 'Nach der Buchung',
        body: 'Sie erhalten sofort eine Bestätigungsmail mit Route, Fahrzeug, Preisschätzung und der Quittung für den online gezahlten Betrag. Anschließend wird ein Fahrer zugeteilt, dessen Daten Sie vor der Fahrt bekommen.',
      },
      {
        h2: 'Änderungen und Stornierungen',
        body: 'Pläne ändern sich. Stornieren Sie mindestens 24 Stunden vor der Abholung, und die Buchungsgebühr wird vollständig erstattet. Zum Verschieben antworten Sie einfach auf die Bestätigungsmail, dann legen wir den Termin neu.',
      },
    ],
  },
};
