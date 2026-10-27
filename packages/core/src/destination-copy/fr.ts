import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "fr" locale. Filled in per destination slug and
 * group slug; anything missing falls back to the English original, which the
 * parity test in destination-copy.test.ts forbids for every page that has one.
 */
export const FR_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: 'Costa Brava',
      route: 'Barcelone à la Costa Brava',
      blurb:
        'Transferts de porte à porte depuis El Prat vers les stations de la Costa Brava, avec de la place pour les bagages de toute la famille.',
      body: [
        'La Costa Brava commence environ une heure au nord de Barcelone et s’étend jusqu’à la frontière française, et presque tous les visiteurs arrivent par El Prat. La route côtière est simple, mais c’est un vrai voyage et non un trajet urbain : comptez environ 80 minutes jusqu’à Lloret de Mar et près de deux heures pour les criques du nord.',
        'Un transfert privé compte davantage ici que pour une course en ville. Il n’existe pas de train direct vers la plupart des stations, les autocars ne desservent que les plus grandes, et le dernier tronçon jusqu’à un hôtel perché ou une villa à l’écart du village se fait rarement à pied avec des valises. Votre chauffeur vous dépose devant la porte.',
        'Nous vous accueillons dans le hall des arrivées avec une pancarte à votre nom et nous suivons votre vol : un atterrissage retardé ne vous fait donc pas perdre votre voiture. Pour les groupes, le Mercedes Vito ou la V-Class transporte six ou sept passagers avec leurs bagages, ce qui revient généralement moins cher que deux voitures séparées et se révèle bien plus simple.',
        'La Costa Brava se trouve en dehors de l’aire métropolitaine de Barcelone ; le trajet n’est donc pas facturé selon le tarif AMB. Nous vous indiquons avant la réservation un prix fixe pour le trajet, confirmé par écrit, de sorte qu’il n’y a rien à régler à l’arrivée en dehors de ce dont vous êtes convenu.',
      ],
    },
    girona: {
      place: 'Gérone',
      route: 'Barcelone à Gérone',
      blurb:
        'Centre-ville, aéroport de Gérone ou vieille ville : un trajet direct vers le nord, sans changement.',
      body: [
        'Gérone se trouve à environ 100 km au nord de Barcelone, à un peu plus d’une heure de route. C’est un transfert courant pour trois raisons bien différentes : la ville elle-même, l’aéroport qui porte son nom, et les marches de la cathédrale qui attirent un flot constant de visiteurs.',
        'Le train est rapide entre les deux centres-villes, mais il ne vous aide pas si vous partez d’El Prat avec des bagages, si vous arrivez tard ou si vous allez ailleurs qu’à la gare. Une voiture privée supprime les correspondances aux deux bouts du trajet.',
        'L’aéroport de Gérone se trouve 15 minutes plus loin que la ville et accueille une grande partie des vols charter vers la Costa Brava. Si vous faites la liaison entre El Prat et l’aéroport de Gérone, indiquez-nous les deux numéros de vol et nous prévoirons une marge raisonnable.',
        'Ce trajet se situe en dehors de la zone AMB ; nous confirmons donc un prix fixe à l’avance. Les véhicules vont du taxi standard de quatre places à la V-Class de sept places pour les familles et les groupes.',
      ],
    },
    'lloret-de-mar': {
      place: 'Lloret de Mar',
      route: 'Barcelone à Lloret de Mar',
      blurb: 'La station la plus fréquentée de la Costa Brava, à environ 70 minutes d’El Prat.',
      body: [
        'Lloret de Mar est la station la plus connue de la Costa Brava et l’un de nos trajets longue distance les plus fréquents. Le trajet dure environ 70 minutes depuis El Prat en dehors des périodes de pointe.',
        'Des autocars desservent Lloret en saison, mais ils suivent un horaire et s’arrêtent en un point central, ce qui est peu pratique si votre hôtel se trouve sur l’une des collines qui dominent la baie. Un transfert privé s’arrête à l’entrée.',
        'Pour les groupes qui arrivent ensemble, un monospace de six ou sept places revient généralement mieux que plusieurs voitures et garde tout le monde sur le même programme.',
        'Le trajet se situe en dehors de la zone AMB : le prix est donc fixe et convenu à l’avance, sans compteur.',
      ],
    },
    'tossa-de-mar': {
      place: 'Tossa de Mar',
      route: 'Barcelone à Tossa de Mar',
      blurb: 'Vieille ville fortifiée et plages plus tranquilles, à environ 80 minutes.',
      body: [
        'Tossa de Mar est la voisine plus calme de Lloret, connue pour sa vieille ville fortifiée qui domine la plage. Elle se trouve à environ 80 minutes de l’aéroport de Barcelone.',
        'La dernière partie du trajet le long de la route côtière est pittoresque mais lente, et les transports en commun imposent au moins un changement. La plupart des voyageurs estiment qu’une voiture directe vaut la peine après un vol.',
        'La vieille ville est en grande partie piétonne ; nous convenons donc avec vous, lors de la réservation, du point de dépose accessible le plus proche, plutôt que d’improviser à l’arrivée.',
        'Le prix est fixe pour ce trajet et confirmé avant le départ, car il se situe au-delà de la zone AMB.',
      ],
    },
    blanes: {
      place: 'Blanes',
      route: 'Barcelone à Blanes',
      blurb: 'La porte sud de la Costa Brava, à environ une heure de route.',
      body: [
        'Blanes marque l’extrémité sud de la Costa Brava et c’est la plus proche de Barcelone parmi les grandes stations, à environ une heure de route.',
        'Elle a une gare, ce qui en fait l’une des villes de la Costa Brava les plus accessibles, mais la liaison depuis l’aéroport comporte encore des changements et un trajet à pied à l’arrivée.',
        'Nous vous prenons à l’arrivée de l’aéroport ou à n’importe quelle adresse de Barcelone et roulons directement, ce qui convient aux familles et à ceux qui voyagent avec du matériel de plage.',
        'Comme pour le reste de la côte, le tarif est un prix fixe communiqué à l’avance, et non un montant relevé au compteur.',
      ],
    },
    cadaques: {
      place: 'Cadaqués',
      route: 'Barcelone à Cadaqués',
      blurb: 'L’extrême nord, après le cap de Creus : environ deux heures et demie de route.',
      body: [
        'Cadaqués est le plus isolé des villages de la Costa Brava ; on y accède par le cap de Creus, sur une route de montagne sinueuse. Comptez environ deux heures et demie depuis Barcelone.',
        'Il n’existe aucune liaison ferroviaire, et le service d’autocars est limité et lent. Pour la plupart des visiteurs, un transfert privé est le seul moyen pratique d’arriver à une heure raisonnable.',
        'La route du col est étroite et mieux vaut la parcourir avec quelqu’un qui la connaît, surtout la nuit. Nos chauffeurs font régulièrement ce trajet.',
        'Compte tenu de la distance, il s’agit toujours d’un trajet à prix fixe convenu à l’avance. Demandez-nous un devis sur WhatsApp en indiquant vos dates.',
      ],
    },
    roses: {
      place: 'Roses',
      route: 'Barcelone à Roses',
      blurb: 'Station balnéaire de la baie de Roses, à l’extrême nord de la Costa Brava.',
    },
    empuriabrava: {
      place: 'Empuriabrava',
      route: 'Barcelone à Empuriabrava',
      blurb: 'La ville des canaux sur le golfe de Roses.',
    },
    begur: {
      place: 'Begur',
      route: 'Barcelone à Begur',
      blurb: 'Village perché et criques en contrebas.',
    },
    'calella-de-palafrugell': {
      place: 'Calella de Palafrugell',
      route: 'Barcelone à Calella de Palafrugell',
      blurb: 'Village de pêcheurs aux maisons blanchies à la chaux, au centre de la Costa Brava.',
    },
    sitges: {
      place: 'Sitges',
      route: 'Barcelone à Sitges',
      blurb: 'La station la plus proche de Barcelone, à environ 25 minutes d’El Prat.',
      body: [
        'Sitges est le plus court de nos trajets longue distance, et le plus souvent réservé. Depuis El Prat, comptez environ 25 minutes ; depuis le centre de Barcelone, plutôt 40.',
        'La ville est une valeur sûre pour les week-ends à la plage, les participants à des congrès logés hors de la ville et le calendrier des festivals. Elle est bien desservie en train depuis Barcelone Sants, mais pas depuis l’aéroport, ce qui explique que la plupart des voyageurs préfèrent une voiture directe.',
        'Le centre ancien compte des rues étroites à sens unique et des accès restreints par endroits. Nous convenons d’un point de dépose pratique lors de la réservation, afin que rien n’ait à se régler sur le pas de la porte.',
        'Sitges se trouve juste en dehors de la zone AMB ; le trajet est donc proposé à un prix fixe, sans compteur. Écrivez-nous sur WhatsApp et nous le confirmerons avant votre départ.',
      ],
    },
    tarragona: {
      place: 'Tarragone',
      route: 'Barcelone à Tarragone',
      blurb: 'Ville romaine et port de croisière, à environ 75 minutes au sud.',
      body: [
        'Tarragone se trouve à environ 100 km au sud de Barcelone, soit environ 75 minutes d’autoroute. Elle attire les visiteurs pour son amphithéâtre romain et sa vieille ville, et de plus en plus comme port de croisière à part entière.',
        'Les transferts de croisière sont la version la plus sensible au temps de ce trajet. Si vous rejoignez un navire, nous prévoyons une marge et confirmons le terminal, car un départ manqué ne se rattrape pas.',
        'La ville est aussi la porte d’entrée des plages de la Costa Dorada, et beaucoup de voyageurs combinent les deux : nous pouvons vous déposer dans un hôtel le long de la côte en passant.',
        'Ce trajet se situe au-delà de la zone AMB ; nous indiquons donc un prix fixe à l’avance, sans compteur.',
      ],
    },
    salou: {
      place: 'Salou',
      route: 'Barcelone à Salou',
      blurb: 'Station de la Costa Dorada, à côté de PortAventura.',
    },
    portaventura: {
      place: 'PortAventura',
      route: 'Barcelone à PortAventura',
      blurb: 'Transfert direct jusqu’aux portes du parc d’attractions.',
    },
    cambrils: {
      place: 'Cambrils',
      route: 'Barcelone à Cambrils',
      blurb: 'Ville plus tranquille de la Costa Dorada, au sud de Salou.',
    },
    peniscola: {
      place: 'Peñíscola',
      route: 'Barcelone à Peñíscola',
      blurb: 'Ville au château, sur la Costa del Azahar.',
    },
    reus: {
      place: 'Reus',
      route: 'Barcelone à Reus',
      blurb: 'Aéroport et ville de Reus, à l’intérieur des terres derrière Salou.',
    },
    montserrat: {
      place: 'Montserrat',
      route: 'Barcelone à Montserrat',
      blurb: 'Le monastère de montagne, à environ une heure de la ville.',
      body: [
        'Montserrat est l’excursion à la journée la plus prisée depuis Barcelone : un monastère bénédictin niché dans un massif rocheux dentelé, à environ une heure à l’intérieur des terres.',
        'Y aller en transports en commun suppose un train, puis un train à crémaillère ou un téléphérique, chacun avec sa file d’attente. Une voiture va directement au parking du monastère, ce qui compte si vous voulez y être avant l’arrivée des autocars.',
        'La plupart des voyageurs le réservent en aller-retour avec temps d’attente, en général trois à quatre heures sur place, pour que le même chauffeur les ramène. Dites-nous combien de temps vous souhaitez et nous le tarifons comme un seul trajet.',
        'Montserrat est en dehors de la zone AMB ; l’excursion est donc proposée à un prix fixe, attente comprise, sans compteur.',
      ],
    },
    andorra: {
      place: 'Andorre',
      route: 'Barcelone à Andorre',
      blurb: 'Trois heures de route jusqu’aux Pyrénées, pour le ski ou le shopping.',
      body: [
        'Andorre se trouve à environ trois heures de Barcelone, par une route qui monte régulièrement dans les Pyrénées. C’est un trajet habituel en hiver pour les stations de ski et toute l’année pour les achats en duty free.',
        'Le trajet franchit une frontière internationale. Munissez-vous des passeports ou des cartes nationales d’identité de tous les voyageurs : les contrôles sont généralement rapides, mais ils existent, et se voir refuser le passage est une façon coûteuse de l’apprendre.',
        'En hiver, la dernière montée peut exiger des chaînes ou des pneus neige. Nous affectons un véhicule équipé pour les conditions, au lieu d’envoyer une voiture de ville classique en montagne au mois de février.',
        'Pour les groupes de skieurs, la V-Class transporte sept personnes avec leurs bagages ; les skis et snowboards doivent toutefois être signalés à la réservation afin que nous attribuions le bon véhicule. C’est un trajet à prix fixe, communiqué avant le départ.',
      ],
    },
    'la-molina': {
      place: 'La Molina',
      route: 'Barcelone à La Molina',
      blurb: 'Station de ski des Pyrénées, à environ deux heures de route.',
    },
    'vall-de-nuria': {
      place: 'Vall de Núria',
      route: 'Barcelone à Vall de Núria',
      blurb: 'Sanctuaire de montagne accessible par train à crémaillère.',
    },
    'baqueira-beret': {
      place: 'Baqueira Beret',
      route: 'Barcelone à Baqueira Beret',
      blurb: 'Le plus grand domaine skiable des Pyrénées espagnoles.',
    },
    valencia: {
      place: 'Valence',
      route: 'Barcelone à Valence',
      blurb: 'Trois heures et demie le long de la côte, de porte à porte.',
      body: [
        'Valence se trouve à environ 350 km au sud de Barcelone, soit environ trois heures et demie d’autoroute. C’est un long transfert, et pour la plupart des voyageurs le train AVE est le choix raisonnable.',
        'Une voiture privée a sa place dans des situations précises : un groupe de six ou sept personnes pour lequel les billets de train individuels s’additionnent, une arrivée trop tardive pour le dernier train, des bagages ou du matériel qui voyagent mal en train, ou le besoin d’un service de porte à porte aux deux extrémités.',
        'Nous roulons en direct avec une pause de confort, et pouvons vous déposer à n’importe quelle adresse de la ville, au port pour une croisière ou à l’aéroport de Valence.',
        'C’est toujours un trajet à prix fixe communiqué à l’avance. Écrivez-nous en indiquant vos dates et la taille de votre groupe, et nous vous le confirmerons.',
      ],
    },
    'la-roca-village': {
      place: 'La Roca Village',
      route: 'La Roca Village',
      blurb: 'Le village de magasins d’usine, à environ 40 minutes au nord.',
      body: [
        'La Roca Village est un centre de marques à prix réduits situé à environ 40 minutes au nord de Barcelone, et l’une des destinations hors aéroport les plus demandées que nous desservons.',
        'La navette depuis la ville fonctionne assez bien, mais elle vous impose une heure de retour fixe, ce qui est la mauvaise contrainte pour une journée shopping. Une voiture privée vous attend.',
        'La plupart des réservations sont des allers-retours avec temps d’attente, souvent de trois à cinq heures. Nous les tarifons comme un seul trajet, attente comprise, et il y a de la place pour les sacs au retour.',
        'Le village se trouve en dehors de la zone AMB ; le prix est donc fixe et confirmé avant votre départ.',
      ],
    },
    alicante: {
      place: 'Alicante',
      route: 'Barcelone à Alicante',
      blurb: 'Costa Blanca, à environ cinq heures de route vers le sud.',
    },
    zaragoza: {
      place: 'Saragosse',
      route: 'Barcelone à Saragosse',
      blurb: 'La capitale de l’Aragon, à environ trois heures à l’intérieur des terres.',
    },
    madrid: {
      place: 'Madrid',
      route: 'Barcelone à Madrid',
      blurb: 'Trajet longue distance jusqu’à la capitale.',
    },
    marbella: {
      place: 'Marbella',
      route: 'Barcelone à Marbella',
      blurb: 'Costa del Sol, un voyage d’une journée entière.',
    },
    malaga: {
      place: 'Malaga',
      route: 'Barcelone à Malaga',
      blurb: 'Côte andalouse, transfert longue distance.',
    },
  },
  groups: {
    'costa-brava': {
      title: 'Transferts vers la Costa Brava',
      intro:
        'Transferts privés de Barcelone à Gérone, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués et le reste de la Costa Brava.',
    },
    'south-and-theme-parks': {
      title: 'Sud de Barcelone et parcs d’attractions',
      intro:
        'Transferts en taxi et en monospace vers Sitges, Tarragone, Salou, PortAventura, Cambrils et la côte au sud de la ville.',
    },
    'mountains-and-ski': {
      title: 'Montagne, nature et transferts ski',
      intro:
        'Chauffeurs privés pour Montserrat, Andorre, les stations de ski et les villages de montagne, y compris des excursions à la journée flexibles.',
    },
    'long-distance': {
      title: 'Transferts longue distance',
      intro:
        'Transferts privés directs en taxi et en monospace de Barcelone vers les grandes villes espagnoles.',
    },
  },
};
