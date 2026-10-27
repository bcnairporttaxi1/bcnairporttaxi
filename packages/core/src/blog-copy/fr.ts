import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "fr" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const FR_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: 'Combien coûte un taxi depuis l’aéroport de Barcelone ?',
    description:
      'Prix du taxi depuis l’aéroport de Barcelone : nos tarifs fixes tout compris vers la ville, en quoi le compteur de la station diffère, et les suppléments.',
    h1: 'Combien coûte un taxi depuis l’aéroport de Barcelone ?',
    excerpt:
      'Un transfert réservé entre El Prat et Barcelone coûte 50 € pour une voiture de 4 places, à prix fixe et payé en ligne. La station devant les arrivées fonctionne autrement, au compteur réglementé. Voici ce que coûte réellement chacune des deux formules, et pourquoi les deux montants ne sont pas les mêmes.',
    sections: [
      {
        h2: 'La réponse courte',
        body: [
          'Un transfert réservé entre El Prat et n’importe quelle adresse de Barcelone coûte 50 € dans une voiture de 4 places, 70 € dans un Mercedes Vito de 6 places et 75 € dans une Mercedes Classe V de 7 places. C’est le prix total. Il est annoncé avant le voyage, payé en ligne à la réservation, et vous ne devez rien au chauffeur dans la voiture.',
          'Le terminal de croisières du Moll Adossat est une liaison à part : 60 €, 80 € et 85 € pour les trois mêmes tailles de véhicule.',
          'Ces montants ne varient pas selon l’heure. Une prise en charge à 04:30 pour un vol matinal coûte autant qu’une à 14 h. Seuls les week-ends et les jours fériés les majorent de 7,5 %, si bien qu’un transfert en berline le samedi revient à 53,75 € au lieu de 50 €.',
          'Si vous prenez plutôt un taxi à la station devant les arrivées, vous n’achetez pas du tout un prix fixe : vous achetez une course au compteur, et le montant final dépend de la circulation, de l’heure et du trajet. La suite de cette page explique les deux formules, car celle qui revient le moins cher dépend vraiment du moment où vous voyagez.',
        ],
      },
      {
        h2: 'Pourquoi un prix unique plutôt qu’un compteur',
        body: [
          'Les tarifs des taxis de Barcelone sont réglementés par l’Àrea Metropolitana de Barcelona, et tous les taxis agréés de la ville utilisent le même compteur aux mêmes tarifs. C’est une vraie protection du consommateur et nous ne la contestons pas. Ce qu’un compteur réglementé ne fait pas, c’est vous donner le prix à l’avance.',
          'Sur un trajet de 15 kilomètres vers l’Eixample, le montant du compteur varie d’environ dix euros selon que vous trouvez la Ronda de Dalt fluide ou à l’arrêt, et de vingt-cinq pour cent de plus selon que c’est un mardi midi ou un samedi soir. Les deux montants sont corrects. Aucun n’est connaissable quand vous êtes dans le hall des arrivées et devez décider quoi faire.',
          'Un prix fixe nous fait porter cette variation. Nous annonçons 50 €, nous réglons le chauffeur selon ce que le trajet coûte réellement, et l’écart est pour nous dans les deux cas. Un mardi où la circulation est fluide, c’est moins avantageux pour vous que la station. Dans les embouteillages du vendredi soir, c’est mieux. Dans tous les cas, c’est connu d’avance.',
          'C’est aussi la seule façon honnête de vendre un transfert à quelqu’un qui n’est pas encore à Barcelone. Personne qui réserve depuis Manchester en mars ne peut chiffrer le compteur d’un jeudi après-midi de juillet ; un devis qui n’est en réalité qu’une estimation peut donc être faux, et il l’est toujours dans le sens de la hausse.',
        ],
      },
      {
        h2: 'La zone de 16 kilomètres, mesurée à vol d’oiseau',
        body: [
          'Le prix de notre liste couvre toute adresse située à moins de 16 kilomètres du terminal, mesurés en ligne droite. Cela comprend tout le centre et presque tous les quartiers où logent les visiteurs : la place de Catalogne à 12,3 km, la Barceloneta à 12,8, la Sagrada Família à 14,0, le Park Güell sur la colline derrière Gràcia à 14,3 et Poblenou à 15,5 paient tous les mêmes 50 € qu’un hôtel du passeig de Gràcia. Ce n’est pas toute la commune, et il vaut la peine de savoir quelle partie est exclue : les quartiers périphériques du nord et de l’est sont hors zone, avec La Sagrera à 16,4 km, le Fòrum à 17,4, Sant Andreu à 17,7, Nou Barris à 17,9 et Torre Baró à 19,3, et ces adresses paient le tarif de dépassement décrit ci-dessous.',
          'La mesure en ligne droite est voulue, et elle joue en votre faveur. La place de Catalogne est à 12,3 kilomètres du terminal à vol d’oiseau et à 19,6 kilomètres par la route, car la route doit contourner le Llobregat puis remonter par la Gran Via. Une zone mesurée sur la route à 16 kilomètres laisserait le cœur même de Barcelone en dehors, et ferait facturer des kilomètres supplémentaires sur le trajet le plus courant que ce prix est censé couvrir. La zone est donc tracée sur la carte, pas sur l’itinéraire.',
          'Hors de la zone, le prix est celui de la liste plus 1,50 € par kilomètre supplémentaire. Badalona se trouve à 21,8 kilomètres et Sant Cugat del Vallès à 19,5 ; les deux paient donc le prix de la ville plus la différence. Ce sont des cas limites : l’essentiel de l’aire métropolitaine est à l’intérieur.',
          'Ce 1,50 € est un chiffre unique et publié, et non le tarif de l’heure, ce qui importe plus qu’il n’y paraît. Le tarif officiel de nuit est de 1,66 € du kilomètre, contre 1,35 € le jour. Appliquer celui qui correspond réintroduirait l’heure dans une liste de prix dont tout l’intérêt est que l’heure ne la fasse pas bouger, et quelqu’un à qui l’on a dit « cinquante euros plus un euro cinquante du kilomètre » se verrait facturer davantage sans prévenir. Un seul chiffre, toute la journée.',
        ],
      },
      {
        h2: 'Ce que facture la station de taxis à la place',
        body: [
          'Si vous allez à la station, trois éléments se combinent dans le montant du compteur : une prise en charge dès que le compteur démarre, un tarif au kilomètre et les suppléments applicables.',
          'La prise en charge (la bajada de bandera) est de 2,80 €. Le tarif au kilomètre est de 1,35 € en tarif T-1, applicable du lundi au vendredi de 08:00 à 20:00, et de 1,66 € en tarif T-2 à tout autre moment : soirs, nuits, samedis et dimanches entiers, et jours fériés. L’écart est d’environ 23 %, ce qui explique qu’un trajet identique coûte réellement plus cher à 22 h qu’à 14 h.',
          'Il existe aussi un tarif d’attente de 27,75 € de l’heure, que le compteur décompte quand vous êtes à l’arrêt. En pratique, c’est ce qui rend imprévisibles les arrivées aux heures de pointe : le compteur ne s’arrête pas quand la circulation s’arrête.',
          'Les tarifs actuels sont valables du 19 janvier 2026 au 17 janvier 2027. L’AMB les révise chaque mois de janvier, et quiconque vous annonce un tarif de taxi barcelonais à partir d’un ancien panneau cite la mauvaise année. Les nôtres sont vérifiés d’après le panneau tarifaire imprimé, et non copiés d’un autre site.',
        ],
      },
      {
        h2: 'Les suppléments, et le plafond que vous n’atteindrez probablement pas',
        body: [
          'Au montant du compteur s’ajoutent des suppléments fixes pour certains lieux et certaines situations. Le supplément de l’aéroport d’El Prat est de 4,60 € et s’applique à tout trajet commençant ou finissant à l’aéroport. Le terminal de croisières du Moll Adossat porte le même supplément de 4,60 €. La gare de Sants est à 2,55 € et le parc des expositions Fira Gran Via à 3,30 €.',
          'Un véhicule transportant cinq passagers ou plus ajoute 4,60 €. C’est un supplément de la grille tarifaire pour le grand véhicule lui-même et non un tarif par personne, et c’est l’une des raisons pour lesquelles le Vito six places coûte plus cher qu’une berline sur le même trajet.',
          'Trois nuits dans l’année portent un supplément de 4,60 € : la nuit de Noël, la nuit du Nouvel An et la Revetlla de Sant Joan dans la nuit du 23 juin. Si vous arrivez l’une de ces nuits-là, la station coûtera plus que d’habitude et le prix réservé, non.',
          'Un plafond de 17,10 € s’applique au total des suppléments facturables pour une même course ; il existe pour les cas extrêmes, par exemple un grand véhicule quittant le terminal de croisières le soir du Nouvel An. Sur un trajet d’aéroport ordinaire, vous payez un seul supplément de 4,60 €, très loin du plafond.',
          'Tout cela est compris dans notre prix fixe. Les 50 € ne sont pas un tarif auquel des suppléments viendront s’ajouter : c’est le total, avec le supplément aéroport, le véhicule, le tarif et nos propres frais de service déjà inclus. La plainte la plus courante au sujet des transferts aéroportuaires, partout, est un prix qui grossit entre le devis et le trottoir, et la manière de l’éviter est d’annoncer le montant que l’on va réellement facturer.',
        ],
      },
      {
        h2: 'La course minimale depuis El Prat',
        body: [
          'Toute course au compteur commençant à l’aéroport est facturée au minimum 21,00 €. Si le compteur avait indiqué moins, le minimum est ce que vous payez.',
          'Il existe parce qu’un taxi qui attend quarante minutes à la station du terminal pour un saut de quatre euros jusqu’à un hôtel de l’aéroport a perdu de l’argent sur son service, et que sans plancher personne ne prendrait les courses courtes. Il ne joue que sur les trajets vraiment courts : vers la ville d’El Prat, ou vers l’un des hôtels le long de la route de l’aéroport.',
          'Pour tout trajet vers Barcelone même, le compteur dépasse largement 21 € à lui seul, et le minimum n’entre donc jamais dans le calcul. Si l’on vous annonce un prix de taxi pour l’aéroport de Barcelone « à partir de 21 € », c’est le plancher d’un trajet de deux kilomètres que l’on présente comme un tarif de ville.',
        ],
      },
      {
        h2: 'Le terminal de croisières est un cas à part',
        body: [
          'La liaison entre El Prat et le Moll Adossat a un prix fermé officiel de 46,00 € en tarif T-4, fixé par l’AMB et non par nous. Elle ne passe pas du tout par le compteur.',
          'C’est inhabituel, et pour une bonne raison : les croisiéristes voyagent avec une heure limite d’embarquement, souvent dans la pire circulation portuaire de la semaine, et un tarif au compteur dans cette situation est un pari que personne ne veut faire. Un prix fermé supprime le risque lié à la circulation sur un trajet où le retard n’est pas un désagrément mais un bateau manqué.',
          'Notre prix réservé pour la même liaison est de 60 € en berline, au-dessus du prix fermé officiel, car il comprend une garantie précise que la station n’offre pas : un chauffeur désigné à l’avance, qui vous attend avec une pancarte à votre nom et garde le créneau que le navire accoste à l’heure ou non. Pour une famille avec des bagages et une heure d’appareillage, c’est généralement ce qui vaut la peine d’être payé. Pour un voyageur seul avec un sac à dos et un après-midi tranquille, la station à 46 € est le meilleur achat, et nous préférons le dire plutôt que de prétendre le contraire.',
          'Un transfert entre le terminal de croisières et la ville, plutôt que l’aéroport, coûte le prix de la ville plus 10 € de supplément portuaire, ce qui donne les mêmes 60 €. La symétrie est voulue.',
        ],
      },
      {
        h2: 'Au-delà de l’aire métropolitaine : Sitges, Gérone, Tarragone',
        body: [
          'Dès que l’une des extrémités du trajet est hors de l’aire métropolitaine, les tarifs de Barcelone cessent de s’appliquer et le trajet est facturé selon les tarifs interurbains fixés par la Generalitat de Catalunya. Ce sont le T-6, du lundi au vendredi de 08:00 à 20:00, et le T-7 à tout autre moment, y compris les samedis et dimanches entiers.',
          'Le compteur interurbain a une particularité qui surprend presque tout le monde : il facture le trajet retour. Un taxi pris de Barcelone à Sitges est, selon le tarif, un aller-retour — le circuit fermé — car le chauffeur doit rentrer et ne peut pas prendre de client en chemin. Un kilomètre parcouru vers le sud coûte donc deux kilomètres au compteur. Au tarif T-6 de 0,82 € du kilomètre, cela fait 1,64 € par kilomètre réellement parcouru, et non 0,82 €.',
          'C’est pourquoi un long transfert coûte ce qu’il coûte, et pourquoi un chiffre qui ressemble à un tarif au kilomètre sur un comparateur vaut souvent la moitié du vrai. Tout compris, notre service inclus, cela donne environ 2,16 € par kilomètre parcouru en semaine (T-6) et entre 2,38 € et 2,48 € la nuit et le week-end (T-7), plus une prise en charge. Sitges, à 38 kilomètres, coûte 90,78 € au total. Rien n’est doublé deux fois.',
          'Concrètement : Sitges, Tarragone, Gérone, Reus et la Costa Brava sont facturés au kilomètre et chiffrés avant la réservation, comme tout le reste. Ils ne sont pas couverts par la liste fixe de la ville, et aucune liste fixe honnête ne pourrait les couvrir : les distances varient d’un facteur cinq.',
        ],
      },
      {
        h2: 'Week-ends, jours fériés et ce qui change vraiment',
        body: [
          'Un prix fixe augmente de 7,5 % les week-ends et les jours fériés. Sur une berline à 50 €, cela représente 3,75 €. Cette majoration existe parce que la couverture des week-ends et jours fériés coûte plus cher à assurer ; c’est un taux unique et publié, et non un coefficient de pointe qui varie avec la demande : le prix annoncé un samedi de février est le même qu’un samedi d’août.',
          'Elle s’applique uniquement aux prix fixes de la ville et du port. Une course interurbaine passe déjà du T-6 au T-7 le week-end, avec son propre tarif plus élevé ; y ajouter la majoration ferait payer deux fois la même prime.',
          'Ce qui ne change pas : l’heure, le terminal, la circulation, l’itinéraire du chauffeur, le nombre de passagers dans la limite de capacité du véhicule, ni la quantité de bagages dans cette même limite. Une voiture de 4 places avec trois valises à 06:00 et une voiture de 4 places avec un seul sac à 18:00 coûtent toutes deux 50 € en semaine.',
        ],
      },
      {
        h2: 'Quel budget prévoir ?',
        body: [
          'Pour un transfert réservé vers Barcelone : 50 € en semaine dans une voiture de 4 places, 53,75 € le week-end. 70 € ou 75 € si vous avez besoin d’un véhicule de 6 ou 7 places, ce qui, pour quatre adultes avec quatre grandes valises, est généralement la réponse honnête plutôt qu’une vente forcée : trois valises est la limite réaliste dans une Corolla ou une Toledo.',
          'Pour la station, un trajet de jour en semaine vers le centre : le compteur plus le supplément de 4,60 €, pour un total qui se situe généralement dans les quarante euros, et plus le soir, le week-end ou dans une circulation dense. Prévoyez que le terminal de paiement par carte puisse ne pas fonctionner, ce qui arrive.',
          'Pour le terminal de croisières : 46 € au prix fermé officiel, ou 60 € réservés avec un chauffeur qui garde votre créneau.',
          'Il faut dire clairement que la station et une voiture réservée ne sont pas le même produit à un prix différent. L’un est une course réglementée au compteur que l’on achète à l’arrivée. L’autre est un montant fixe, un chauffeur nommé et une voiture déjà attribuée à l’atterrissage de votre vol. Le meilleur rapport qualité-prix dépend entièrement de ce que vaut l’incertitude pour vous ce jour-là, et pour beaucoup de trajets la réponse est « pas grand-chose » — auquel cas la station est juste là.',
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: 'Taxi ou Aerobús depuis l’aéroport de Barcelone ?',
    description:
      'Taxi, Aerobús ou métro depuis Barcelone El Prat : coût réel par groupe, durées porte à porte honnêtes, et cas de bagages ou de nuit où chacun l’emporte.',
    h1: 'Taxi ou Aerobús depuis l’aéroport de Barcelone ?',
    excerpt:
      'L’Aerobús est moins cher par personne et le métro l’est encore moins. Aucun n’est automatiquement meilleur une fois comptés la taille du groupe, les bagages et la marche à l’arrivée — et pour une ou deux personnes qui voyagent léger, le taxi est le mauvais choix et nous le dirons.',
    sections: [
      {
        h2: 'Le calcul, avec les vrais chiffres',
        body: [
          'L’Aerobús fait payer par personne. Un taxi fait payer par voiture. Cette seule différence tranche la plupart de ces débats avant même que les autres facteurs n’entrent en jeu.',
          'Un transfert réservé en voiture de 4 places vers Barcelone coûte 50 € forfaitaires. Partagé à deux, cela fait 25 € chacun, soit plusieurs fois le prix d’une place d’Aerobús. Partagé à quatre, 12,50 € chacun, et l’écart se réduit à un niveau dont la plupart des gens cessent de se soucier — avant même de compter que le taxi vous dépose à votre porte et que le bus s’arrête place de Catalogne.',
          'Le point de bascule se situe généralement à trois passagers, et à quatre il a normalement disparu. Un groupe de six dans un Vito à 70 € revient à moins de 12 € par personne, porte à porte, avec les bagages dans le coffre plutôt que sur les genoux.',
          'La version honnête de la comparaison est la suivante : seul, le bus est plus avantageux, et de loin. En famille de quatre avec des valises, le taxi est généralement moins cher au total et nettement plus facile. Tout ce qui se situe entre les deux dépend des bagages.',
        ],
      },
      {
        h2: 'La durée porte à porte, pas la durée affichée',
        body: [
          'L’Aerobús annonce environ 35 minutes jusqu’à la place de Catalogne, et c’est exact — d’arrêt à arrêt. La durée que vous vivez réellement est plus longue, car le trajet ne commence pas à l’emplacement du bus ni ne finit sur la place.',
          'Ajoutez la marche entre les arrivées et l’arrêt, de quelques minutes avec un chariot au T1. Ajoutez l’attente, courte aux heures de pointe, qui peut atteindre quinze minutes en fin de soirée. Puis ajoutez le trajet depuis la place de Catalogne ou Sants jusqu’à votre logement — en métro avec des valises, dans un second taxi, ou à pied sur les pavés du quartier gothique.',
          'Un taxi d’El Prat au centre de Barcelone met de 25 à 35 minutes selon la circulation et la destination en ville, et il s’arrête à l’adresse que vous avez indiquée. Pour l’Eixample ou Sant Antoni, la différence de durée totale porte à porte est peut-être de vingt minutes. Pour un endroit en hauteur à Gràcia, ou un appartement avec entrée sur rue dans El Born, elle est souvent plus proche de quarante-cinq.',
          'La variabilité compte autant que la moyenne. Le bus est fiable et le taxi est plus rapide ; dans une circulation dense, ils se rejoignent, car le bus est dans les mêmes embouteillages et s’arrête davantage.',
        ],
      },
      {
        h2: 'Le métro est moins cher que les deux, sous conditions',
        body: [
          'La ligne 9 Sud dessert les deux terminaux et c’est de loin le moyen le moins cher de rejoindre la ville. C’est une très bonne option, et les visiteurs l’utilisent trop peu.',
          'Les conditions sont toutefois réelles. Elle ne va pas directement au centre : il faut changer, généralement à Collblanc ou Torrassa, pour une autre ligne, et les stations de l’aéroport demandent un titre de transport aéroport spécifique plutôt qu’un billet simple ordinaire. Les stations ont des ascenseurs, mais les correspondances impliquent des couloirs, et les faire avec deux grandes valises et un enfant fatigué paraît très bien au moment de réserver et beaucoup moins à 23:00.',
          'Si vous voyagez léger, logez près d’une correspondance de la ligne 9 et n’êtes pas pressé, le métro est la bonne réponse et coûte une fraction du reste. Si l’une de ces trois conditions n’est pas remplie, il cesse assez vite d’être la bonne réponse.',
        ],
      },
      {
        h2: 'Les bagages sont le vrai facteur décisif',
        body: [
          'Plus que le prix et plus que la durée, ce sont les bagages qui décident vraiment, et c’est ce que l’on sous-estime en réservant de chez soi.',
          'Un taxi barcelonais de 4 places — une Corolla, une SEAT Toledo — prend quatre passagers et environ 3 grandes valises. Quatre adultes avec chacun une grande valise ne tiennent pas, et la solution est un Vito de 6 places, qui prend six passagers et 6 valises, ou un véhicule de 7 places, la Classe V. Le savoir à l’avance fait la différence entre un transfert et un problème sur le trottoir.',
          'Dans l’Aerobús, les bagages vont dans une soute sous le bus et il y a un porte-bagages près de la porte, ce qui fonctionne bien. Dans le métro, ils vont là où vous pouvez les tenir, c’est-à-dire, aux heures de pointe, sur vous.',
          'La règle pratique qui tient : un bagage chacun, et vous avez un vrai choix entre les trois. Deux bagages chacun, et le taxi est le seul qui soit vraiment agréable, quoi qu’en dise l’arithmétique.',
        ],
      },
      {
        h2: 'Quand le taxi l’emporte clairement',
        body: [
          'Arriver après minuit. L’Aerobús ne circule plus au petit matin et le métro ferme, avec entre les deux un réseau limité de bus de nuit qui n’est pas une option réaliste avec des bagages et sans parler catalan.',
          'Voyager avec des enfants, une poussette ou un siège auto. Le bus est gérable avec un enfant et pénible avec deux, et personne n’aime la correspondance du métro avec une poussette et une valise.',
          'Prendre un vol tôt le matin. Une prise en charge à 04:30 pour un départ à 06:30 n’a aucun équivalent en transports publics, et une voiture réservée à prix fixe est la seule version qui vous laisse dormir jusqu’au réveil.',
          'Loger à un endroit dont le dernier tronçon est vraiment compliqué : le quartier gothique, où les véhicules ne peuvent pas atteindre beaucoup d’adresses mais s’en approchent bien plus qu’un arrêt de bus ; Gràcia et Sarrià, en hauteur par rapport à toutes les lignes de bus ; tout endroit où vous finiriez sinon par un second taxi, ce qui rend l’option « moins chère » plus coûteuse.',
          'Les groupes de quatre personnes ou plus. À ce stade, le prix par voiture a déjà gagné sur le plan financier, et la commodité est donc gratuite.',
        ],
      },
      {
        h2: 'Quand ce n’est pas le cas, et nous le dirons',
        body: [
          'Une ou deux personnes, bagages légers, logées près de la place de Catalogne ou sur une ligne de métro directe, arrivant en pleine journée. Dans cette situation, l’Aerobús est le choix raisonnable, le métro est le choix économique, et un taxi à 50 € revient à payer une commodité dont vous n’avez pas particulièrement besoin.',
          'Nous préférons l’écrire plutôt que de prétendre que le taxi a toujours raison. Un transfert aéroportuaire est un service qui a une forme précise — prix fixe, chauffeur désigné, porte à porte, bagages pris en charge — et cette forme vaut quelque chose pour une famille de quatre à minuit et très peu pour un voyageur seul avec un sac à dos à 14 h.',
          'La même logique vaut pour la station. Un taxi au compteur pris à la station un après-midi calme de semaine reviendra souvent moins cher qu’un prix fixe réservé, car le prix fixe inclut le fait d’absorber un risque de circulation qui ne s’est pas produit ce jour-là. C’est ainsi que fonctionnent les prix fixes, dans les deux sens.',
        ],
      },
      {
        h2: 'Le creux de la nuit dont personne ne parle',
        body: [
          'Il existe une plage, grosso modo du dernier Aerobús au premier métro du matin, où les transports publics se réduisent à un bus de nuit et où la station devient le choix par défaut. Une nuit normale, la station du T1 est bien surveillée et avance vite.',
          'Cela se passe mal quand un vol retardé atterrit dans cette plage en même temps que deux autres vols retardés. La file compte alors quarante personnes et l’offre de taxis à 02:00 est maigre, car les chauffeurs ne restent pas au terminal au cas où. C’est le seul scénario où arriver avec une voiture déjà attribuée vaut nettement plus que ce qu’elle coûte.',
          'Si votre vol doit atterrir après 23:30 environ, il vaut mieux décider cela avant de partir plutôt que dans le hall des arrivées.',
        ],
      },
      {
        h2: 'Le retour vers l’aéroport est un autre problème',
        body: [
          'Presque tout le monde planifie l’arrivée et improvise le départ, et le départ est la moitié la plus difficile.',
          'À l’arrivée, vous avez des options parce que vous êtes dans un aéroport, le seul endroit de la région où il y a forcément des taxis. Au départ, vous êtes dans une rue de Gràcia à 05:00 avec un vol à 07:30, et tout ce qui rendait le bus et le métro attrayants a cessé de circuler.',
          'L’Aerobús n’aide pas pour les départs matinaux, et héler un taxi dans une rue résidentielle avant l’aube est aléatoire d’une manière qui ne l’est pas sur la Gran Via. Barcelone a beaucoup de taxis ; elle n’a pas beaucoup de taxis à votre coin de rue à cinq heures du matin.',
          'Pour un départ de jour depuis une adresse centrale, les trois options fonctionnent à l’envers exactement comme à l’arrivée, et le même calcul s’applique. Pour tout ce qui précède 07:00 environ, ou depuis une adresse hors du quadrillage principal, une prise en charge réservée est moins une commodité que la seule version qui a lieu de façon fiable. Le prix fixe est le même dans les deux sens : 50 € vers la ville et 50 € au départ de celle-ci, en semaine, en voiture de 4 places.',
        ],
      },
      {
        h2: 'Comment décider en dix secondes',
        body: [
          'Comptez les personnes et comptez les bagages. Une ou deux personnes avec un bagage chacune, arrivant de jour, logées au centre : prenez l’Aerobús, ou le métro si vous surveillez chaque euro.',
          'Trois personnes ou plus, ou deux bagages ou plus chacune, ou une arrivée après l’arrêt des bus, ou une adresse en haut d’une colline ou au fond d’une ruelle : prenez un taxi, et décidez séparément si vous voulez la station ou une voiture réservée à l’avance.',
          'Station ou réservation se résume à une question : à quel point une file de quarante minutes ou un montant final inconnu affecterait-il votre soirée ? Si la réponse est « pas beaucoup », la station est juste devant les arrivées et coûte moins. Si vous voyagez avec des personnes qui ne le supporteraient pas, ou avec une heure limite, réservez.',
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: 'Aéroport de Barcelone : les terminaux T1 et T2 expliqués',
    description:
      'Quel terminal utilise votre compagnie à Barcelone El Prat, comment marche la navette T1-T2, où sont les taxis et où un chauffeur réservé vous attend.',
    h1: 'Aéroport de Barcelone : les terminaux T1 et T2',
    excerpt:
      'Se tromper de terminal coûte une navette et vingt minutes, et au départ, cela peut coûter le vol. Voici lequel est lequel, où se trouvent réellement les taxis dans chacun, et la seule chose à vérifier la veille de votre vol.',
    sections: [
      {
        h2: 'Deux terminaux, à plusieurs kilomètres l’un de l’autre',
        body: [
          'Barcelone El Prat compte deux terminaux de passagers, T1 et T2, et la chose la plus importante à savoir est qu’on ne peut pas aller à pied de l’un à l’autre. Ils se trouvent de part et d’autre des pistes, à quelques kilomètres, reliés par une navette gratuite.',
          'Cela surprend parce que, dans beaucoup d’aéroports, « terminal » désigne une autre aile du même bâtiment. Ici, c’est un autre bâtiment avec un trajet en bus entre les deux, et le trajet dure de 10 à 15 minutes, sans compter l’attente.',
          'Le T1 est le plus récent et de loin le plus grand des deux, ouvert en 2009 ; il accueille l’essentiel du trafic long-courrier ainsi que la majorité de Vueling et des compagnies traditionnelles. Le T2 est le terminal d’origine, plus ancien et aux plafonds plus bas, divisé en trois blocs et desservant plusieurs compagnies à bas prix.',
          'Les deux sont entièrement équipés : enregistrement, sécurité, boutiques, restauration, location de voitures, stations de taxis. Aucun n’est un avant-poste isolé. La seule vraie pénalité à aller au mauvais est le temps.',
        ],
      },
      {
        h2: 'Quelles compagnies utilisent quel terminal',
        body: [
          'Le T1 accueille la plupart des vols en provenance de hors d’Europe, ainsi que Vueling, qui est la compagnie dominante de l’aéroport, et la plupart des compagnies nationales traditionnelles.',
          'Le T2 dessert un ensemble de compagnies à bas prix, dont Ryanair est l’une des plus importantes, ainsi qu’une partie du trafic charter et saisonnier.',
          'La réserve utile : ce n’est pas stable. Les compagnies changent de terminal quand leurs contrats changent, parfois avec quelques semaines de préavis, et les programmes saisonniers brouillent encore les cartes. Un guide qui vous dit avec assurance quel terminal utilise votre compagnie vous dit quel terminal elle utilisait quand le guide a été écrit.',
          'Les partages de code aggravent la situation. Si vous avez réservé auprès d’une compagnie et volez sur l’avion d’une autre, le terminal suit la compagnie qui opère le vol, et non celle de votre confirmation de réservation. Le terminal imprimé sur votre carte d’embarquement est celui qui compte, et c’est la seule source digne de confiance.',
        ],
      },
      {
        h2: 'Passer du T1 au T2',
        body: [
          'La navette entre les terminaux est gratuite, fréquente et circule toute la nuit, quoique moins souvent au petit matin. Elle s’arrête devant les arrivées du T1 et à chaque bloc du T2.',
          'Prévoyez 25 minutes porte à porte plutôt que les 10 à 15 du trajet lui-même : vous attendrez le bus, chargerez les bagages et marcherez à l’arrivée. Aux heures chargées, avec un bus plein et des places debout, c’est plus long et nettement moins agréable avec des valises.',
          'La ligne 9 Sud du métro relie aussi les deux terminaux, avec une station dans chacun, ce qui est parfois plus rapide que d’attendre le bus si vous êtes déjà en sous-sol. Elle n’est pas gratuite et demande le titre de transport aéroport.',
          'Si vous avez une correspondance entre un vol arrivant au T2 et un vol partant du T1 sur des billets séparés, considérez le transfert comme une vraie étape du voyage et prévoyez une heure. Des gens ratent leur vol à cause de cela.',
        ],
      },
      {
        h2: 'Le T2 compte trois blocs, et le bloc compte',
        body: [
          'Le T2 est divisé en blocs A, B et C, alignés en ligne le long de la façade du bâtiment. Ils communiquent à l’intérieur, on peut donc marcher de l’un à l’autre, mais aller d’un bout à l’autre prend plusieurs minutes.',
          'Votre compagnie utilise un bloc précis, et les comptoirs d’enregistrement, la sécurité et la station de taxis en dépendent. Être déposé au bloc C alors qu’il vous faut le bloc A n’est pas un drame, mais c’est une marche non prévue avec des bagages.',
          'Quand vous réservez un transfert avec prise en charge ou dépose au T2, il vaut la peine d’indiquer le bloc. C’est la différence entre un chauffeur qui se tient là où vous sortez et un chauffeur qui est trois cents mètres plus loin sur la façade.',
        ],
      },
      {
        h2: 'Où se trouvent les stations de taxis',
        body: [
          'Les deux terminaux ont des stations de taxis officielles juste devant les arrivées, bien signalées, surveillées et généralement très fréquentées. Au T1, la station est directement devant le hall des arrivées. Au T2, il y a des stations desservant chacun des blocs.',
          'Les taxis de ces stations sont des taxis barcelonais agréés, à la livrée noire et jaune habituelle, tous équipés du même compteur réglementé. Il n’y a ni négociation ni choix : vous prenez la voiture qui est en tête. C’est le système qui fonctionne comme prévu, et cela signifie qu’on ne peut pas vous facturer plus que le tarif.',
          'Toute course commençant à l’aéroport comporte un supplément de 4,60 € et est facturée au minimum 21 €, deux éléments du tarif officiel et non des ajouts du chauffeur.',
          'Ce que la station ne peut pas faire, c’est vous donner le prix avant le départ, ni garantir qu’il y aura une voiture à votre atterrissage. Un après-midi normal, les deux sont corrects. Après une série d’arrivées tardives retardées, la file d’attente est tout ce qui compte.',
        ],
      },
      {
        h2: 'Où un chauffeur réservé vous attend à la place',
        body: [
          'Un transfert réservé n’utilise pas la station, et c’est la partie que l’on se trompe le plus souvent à l’arrivée.',
          'Votre chauffeur vous attend à l’intérieur du hall des arrivées, du côté public de la sortie de la livraison des bagages, avec une pancarte à votre nom. Il n’est ni sur le trottoir ni dans la file de la station. Vous sortez de la livraison des bagages et il est là, ce qui est tout l’intérêt de réserver.',
          'Le point de rendez-vous exact est confirmé par e-mail avant votre voyage, car il diffère selon le terminal et, au T2, selon le bloc. Lisez cet e-mail dans l’avion plutôt que dans le hall.',
          'Le chauffeur suit votre numéro de vol : un retard déplace donc la prise en charge au lieu de la faire perdre. C’est la différence pratique entre une voiture réservée et une station : un atterrissage avec une heure de retard à 01:00 signifie un chauffeur toujours présent, au lieu d’une station qui s’est clairsemée.',
          'Si vous ne parvenez pas à vous trouver, le numéro de téléphone figurant dans la confirmation joint directement le chauffeur, et non un centre d’appels. Les halls d’arrivée sont vastes et les pancartes se baissent ; un appel règle la question.',
        ],
      },
      {
        h2: 'Le terminal change-t-il le tarif ?',
        body: [
          'Peu, et pour un transfert réservé, pas du tout.',
          'Le T1 est un peu plus éloigné de la ville que le T2, de quelques kilomètres. Sur un trajet de 15 kilomètres vers le centre de Barcelone, cette différence est faible, et le supplément aéroport de 4,60 € est identique depuis l’un ou l’autre terminal. Au compteur, vous pourriez voir un ou deux euros d’écart.',
          'Un prix fixe réservé ne fait aucune distinction entre eux : 50 € vers la ville dans une voiture de 4 places depuis le T1 ou le T2, en semaine, supplément déjà compris dans le montant. Il en va de même dans l’autre sens pour les départs.',
          'Ce que le terminal change, c’est le risque lié à la navette. Si l’on vous dépose au mauvais, le coût est de 25 minutes et un bus, ce qui à l’arrivée est agaçant et au départ peut être le vol.',
        ],
      },
      {
        h2: 'Les départs : là où l’erreur fait vraiment mal',
        body: [
          'À l’arrivée, le mauvais terminal vous coûte du temps. Au départ, il peut vous coûter le voyage, car vous découvrez l’erreur devant un comptoir d’enregistrement qui n’a pas votre vol, avec une navette qui prend 25 minutes que vous n’avez pas.',
          'Indiquez le terminal en réservant un transfert au départ, et vérifiez-le d’après la carte d’embarquement plutôt que d’après votre souvenir du vol aller. Les compagnies utilisent régulièrement des terminaux différents dans chaque sens, et un retour en partage de code peut très bien se faire d’un autre terminal que l’aller.',
          'Pour un départ matinal, partir de Barcelone pour être à El Prat pour un vol à 06:30 signifie une prise en charge vers 04:30 en ville, plus tôt si vous êtes plus loin. Une voiture réservée à prix fixe est la seule version qui n’implique pas d’attendre dans la rue à l’aube en espérant.',
        ],
      },
      {
        h2: 'Combien de temps vous mettrez réellement à sortir',
        body: [
          'Ce qui compte pour une prise en charge n’est pas l’heure d’atterrissage de l’appareil, mais celle où vous sortez de la livraison des bagages, et l’écart entre les deux est plus grand que la plupart des gens ne le prévoient.',
          'Pour une arrivée Schengen avec seulement un bagage à main, dix à quinze minutes entre l’atterrissage et le hall des arrivées est réaliste. Pour une arrivée hors Schengen, avec contrôle des passeports et un bagage en soute, une demi-heure est normale et une heure arrive — en particulier au T1 en milieu de matinée, quand plusieurs vols long-courriers atterrissent ensemble et que la file au contrôle est le goulot d’étranglement plutôt que le tapis à bagages.',
          'C’est pourquoi un transfert réservé est lié à votre numéro de vol plutôt qu’à une heure saisie. Le chauffeur suit l’atterrissage réel et tient compte du hall, ce qui vous évite la devinette que vous auriez à faire en réservant de chez vous des semaines à l’avance.',
          'Cela signifie aussi qu’il ne sert à rien de majorer votre propre estimation. Réserver une prise en charge une heure après l’atterrissage « par précaution » n’aide pas, car le suivi s’en charge déjà, et vous attendriez une voiture volontairement en retard.',
          'La seule chose à faire vous-même : si vous sortez de la livraison des bagages exceptionnellement vite et que votre chauffeur n’est pas encore en place, le numéro de téléphone de la confirmation le joint directement. Une voiture à huit minutes est une conséquence normale d’une sortie rapide, pas un problème.',
        ],
      },
      {
        h2: 'Vérifiez la veille',
        body: [
          'Une habitude supprime presque tout cela : la veille de votre vol, ouvrez la carte d’embarquement et lisez le terminal. Pas la confirmation de réservation, pas le guide lu en mars, pas la page générale des lignes de la compagnie : la carte d’embarquement du vol que vous prenez.',
          'S’il ne correspond pas à ce que vous nous avez indiqué, répondez à l’e-mail de confirmation et nous le modifierons. Changer un terminal sur une réservation ne coûte rien et prend une minute. Le découvrir à 05:00 coûte la navette, le stress et parfois le vol.',
        ],
      },
    ],
  },
};
