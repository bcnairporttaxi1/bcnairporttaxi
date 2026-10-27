import type { LandingCopy } from '../landing-pages';

/** French long-form copy for the keyword landing pages. */
export const FR_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Aéroport Barcelone Centre-Ville | Réserver',
    description:
      "Réservez un taxi de l’aéroport de Barcelone vers le centre. Prix fixe tout compris, supplément El Prat inclus, chauffeur à l’arrivée.",
    h1: "Taxi de l'aéroport de Barcelone vers le centre",
    intro:
      "Un taxi depuis El Prat jusqu'au centre de Barcelone prend 25 à 35 minutes selon la circulation et le terminal d'arrivée. Réserver à l'avance signifie qu'un chauffeur vous attend déjà à l'atterrissage, pancarte à votre nom en salle d'arrivée, plutôt que la file d'attente à la station T1 ou T2.",
    sections: [
      {
        h2: "Combien coûte un transfert depuis l'aéroport de Barcelone",
        body: "Le prix est fixé par nous : ce n’est ni un relevé de compteur ni une estimation, et tous les suppléments officiels applicables au trajet sont déjà dedans. En pratique, un trajet de l’aéroport vers n’importe quel point de Barcelone coûte 50 EUR fixes en taxi standard, quelle que soit la distance et quelle que soit l’heure ; les week-ends et jours fériés ajoutent 7,5 %. Indiquez votre destination exacte ci-dessus pour voir votre prix.",
      },
      {
        h2: 'Où votre chauffeur vous attend',
        body: "Votre chauffeur patiente dans la salle d'arrivée de votre terminal avec une pancarte à votre nom et suit votre numéro de vol : un retard ne vous fait pas perdre la voiture. Le point de rencontre exact pour T1 et T2 figure dans votre e-mail de confirmation.",
      },
      {
        h2: 'Terminal 1 et Terminal 2',
        body: "Les deux terminaux disposent d'une station de taxis officielle et nos chauffeurs desservent les deux. Le T1 concentre le long-courrier et l'essentiel de Vueling ; le T2 accueille de nombreuses compagnies low-cost. L'écart de prix entre les deux reste faible, quelques kilomètres, même si le T1 est un peu plus éloigné de la ville.",
      },
      {
        h2: "Jusqu’où va le prix de 50 EUR",
        body: "Un seul prix couvre toute adresse située à moins de 16 km du terminal, mesurés en ligne droite et non le long de la route. Cela comprend tout le centre et presque tous les lieux où séjourne un visiteur : Ciutat Vella, l’Eixample, Gràcia, Sants, le front de mer jusqu’à la Barceloneta et Poblenou, et le Park Güell, au-dessus de Gràcia, à 14,3 km, au même prix qu’un hôtel du Passeig de Gràcia. La mesure en ligne droite joue en votre faveur, car la route vers la ville est nettement plus longue que la ligne directe : elle doit contourner le Llobregat et entrer par la Gran Via, si bien qu’une zone tracée le long de l’itinéraire laisserait le centre en dehors. La zone s’arrête dans les quartiers périphériques du nord et de l’est : La Sagrera à 16,4 km, le Fòrum à 17,4, Sant Andreu à 17,7 et Nou Barris à 17,9 sont au-delà, comme Sant Cugat à 19,4 et Badalona à 21,8, et tous paient le prix de la liste plus 1,50 EUR par kilomètre supplémentaire.",
      },
      {
        h2: "Taxi, Aerobús ou métro vers la ville",
        body: "L’Aerobús fait payer chaque personne et un taxi fait payer chaque voiture, ce qui règle déjà l’essentiel de la question. Seul avec un bagage à main, le bus est plus avantageux, et de loin ; à trois passagers l’écart se réduit, et à quatre il a généralement disparu. La ligne 9 Sud du métro est moins chère que les deux, mais elle impose une correspondance, ce qui est acceptable avec un bagage chacun et beaucoup moins avec deux. La règle honnête : comptez les personnes et comptez les bagages. Une ou deux personnes, un ou deux bagages, en plein jour : prenez le bus. Trois personnes ou plus, ou deux bagages chacun, ou une arrivée après l’arrêt des bus : prenez un taxi.",
      },
    ],
  },

  'city-to-airport': {
    title: "Taxi Barcelone vers l'Aéroport | Réserver en ligne",
    description:
      "Réservez un taxi depuis Barcelone vers l’aéroport El Prat. Heure de prise en charge fixe, prix fixe tout compris, chauffeurs expérimentés.",
    h1: "Taxi de Barcelone vers l'aéroport",
    intro:
      "C'est le trajet aller qui mérite vraiment d'être réservé. Un taxi commandé à l'avance se présente à votre hôtel ou appartement à une heure convenue, ce qui compte bien davantage quand vous avez un vol à prendre que lorsque vous arrivez.",
    sections: [
      {
        h2: 'Quand réserver votre taxi vers l’aéroport',
        body: "Pour un vol court-courrier européen, comptez deux heures entre votre arrivée à El Prat et le décollage ; trois pour un long-courrier. Ajoutez 30 à 40 minutes de trajet depuis le centre de Barcelone, davantage aux heures de pointe en semaine. Notre formulaire exige au minimum trois heures de préavis : réservez donc la veille au soir au plus tard.",
      },
      {
        h2: 'Dépose au bon terminal',
        body: "Indiquez votre compagnie et nous vous déposons à la bonne porte. Les départs du T1 forment une seule grande halle ; le T2 se divise en blocs A, B et C, et se tromper de bloc signifie une longue marche avec les bagages.",
      },
      {
        h2: 'Départs matinaux depuis El Prat',
        body: "La première vague de départs quitte El Prat avant 07:00, ce qui implique des prises en charge dès 04:30. Une prise en charge à 04:30 coûte le même prix que le même trajet à midi, car l’heure ne déplace pas un prix fixe, et nous confirmons le chauffeur la veille au soir pour qu’il n’y ait rien à régler à quatre heures du matin.",
      },
      {
        h2: "Vérifiez le terminal sur votre carte d’embarquement, pas sur la réservation",
        body: "Le T1 et le T2 ne se rejoignent pas à pied. Ils sont de part et d’autre des pistes, reliés par une navette gratuite qui met 10 à 15 minutes sans compter l’attente : prévoyez 25 minutes de porte à porte. Au départ, cela compte bien plus qu’à l’arrivée : être déposé au mauvais terminal, c’est le découvrir devant un comptoir d’enregistrement qui n’a pas votre vol. Les compagnies changent de terminal quand leurs contrats évoluent, et un partage de code suit le transporteur effectif et non la compagnie indiquée sur votre confirmation ; le terminal imprimé sur votre carte d’embarquement est donc la seule source fiable. S’il ne correspond pas à ce que vous nous avez indiqué, répondez à votre confirmation et nous le modifierons sans frais.",
      },
      {
        h2: "Si vos plans changent avant la prise en charge",
        body: "Vous pouvez modifier vous-même les détails dans les 30 minutes suivant la réservation, puis jusqu’au départ de votre chauffeur : répondez à votre confirmation ou écrivez-nous sur WhatsApp. Déplacer une heure de prise en charge, un terminal ou une adresse ne coûte rien, et un mauvais terminal est la correction la plus fréquente. Si le voyage tombe complètement à l’eau, annulez au moins 24 heures avant la prise en charge et la totalité du montant est remboursée sur la carte utilisée pour payer, normalement sous cinq à dix jours ouvrés. Dans ce délai de 24 heures, nous essaierons quand même de vous aider, mais le remboursement n’est plus automatique.",
      },
      {
        h2: "Choisir le véhicule quand on a beaucoup de bagages",
        body: "Comptez les valises avant de choisir. Un taxi de quatre places prend environ trois grandes valises, le Vito de six places en prend six et la V-Class de sept places en prend sept. Un départ avec beaucoup de bagages est le seul cas où un véhicule plus grand vaut les 20 à 25 EUR de plus, car l’alternative est d’arriver au terminal avec une valise sur les genoux.",
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aéroport El Prat | Transferts Agréés Barcelone',
    description:
      "Taxis agréés vers et depuis l’aéroport de Barcelone-El Prat (BCN). Réservez en ligne à un prix fixe tout compris, avec un chauffeur affecté à votre vol.",
    h1: 'Taxi aéroport El Prat',
    intro:
      "L'aéroport Josep Tarradellas Barcelone-El Prat, que presque tout le monde appelle encore simplement El Prat, se trouve à environ 15 km au sud-ouest de la ville. Deuxième aéroport d'Espagne par le trafic, il se rejoint le plus rapidement en taxi à presque toute heure — à condition qu'une voiture attende.",
    sections: [
      {
        h2: 'Réserver plutôt que faire la queue',
        body: "La station officielle d'El Prat est bien tenue et avance généralement vite. Elle sature à des moments prévisibles : les vagues d'arrivées en milieu de matinée, les dimanches soir, et lorsque plusieurs long-courriers atterrissent ensemble. Réserver supprime ce risque, fixe votre chauffeur à l’avance et fixe votre prix avant le départ.",
      },
      {
        h2: "Le supplément aéroport d'El Prat",
        body: "Le supplément aéroport officiel et tout autre frais applicable au trajet sont inclus dans le prix fixe que nous vous donnons. Aucun compteur ne tourne pendant votre course et il n’y a pas de second montant à la fin, donc rien ne peut vous surprendre.",
      },
      {
        h2: 'Passagers de croisière',
        body: "Pour une correspondance vers une croisière, le trajet entre El Prat et le terminal du Moll Adossat a son propre prix fixe, indiqué séparément du prix ville. Saisissez le terminal de croisière comme destination et l'estimation bascule automatiquement sur ce prix.",
      },
      {
        h2: "Quel véhicule pour vos bagages",
        body: "Choisissez en fonction des valises, pas du nombre de personnes. Un taxi de quatre places transporte quatre passagers mais seulement environ trois grandes valises : le coffre d’une Corolla ou d’une SEAT Toledo est la vraie limite, et celle que l’on juge le plus souvent mal en réservant de chez soi. Quatre adultes avec chacun une valise de taille standard ont besoin du Mercedes Vito de six places, qui prend six passagers et six bagages ; au-delà, la V-Class de sept places en transporte sept de chaque. Un objet hors format, comme un vélo, des skis ou une planche de surf, doit figurer dans les notes de réservation plutôt que de compter sur une voiture plus grande, car la bonne réponse est parfois un véhicule précis et pas simplement un véhicule plus spacieux.",
      },
      {
        h2: "Prise en charge au Terminal 1 et au Terminal 2",
        body: "Un transfert réservé n’utilise pas la station. Votre chauffeur attend dans la salle d’arrivée, côté public de la sortie de la livraison des bagages, avec une pancarte à votre nom : pas sur le trottoir et pas dans la file. Le T2 est divisé en blocs A, B et C le long de la façade ; indiquer votre bloc à la réservation fait la différence entre un chauffeur planté là où vous sortez et un chauffeur trois cents mètres plus loin sur la façade. Le chauffeur suit votre numéro de vol, si bien qu’un atterrissage tardif décale la prise en charge au lieu de la perdre, et le numéro de téléphone de votre confirmation le joint directement et non un bureau.",
      },
      {
        h2: "Arrivées tardives et vols retardés",
        body: "Une prise en charge réservée suit votre vol, pas l’horaire. Si vous atterrissez avec des heures de retard, le chauffeur est toujours là, il n’y a aucun frais d’attente pour un atterrissage retardé et rien à renégocier à votre arrivée. Si le vol est purement et simplement annulé, dites-le-nous et la totalité du montant est remboursée.",
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Prix Prix Taxi Aéroport Barcelone | Tarifs Fixes 2026',
    description:
      "Ce que coûte vraiment un taxi pour l’aéroport de Barcelone : nos prix fixes par véhicule, la portée du prix forfaitaire et ce qu’ajoutent week-end et hors zone.",
    h1: "Prix d'un taxi pour l'aéroport de Barcelone",
    intro:
      "Un transfert vers l’aéroport de Barcelone chez nous est un prix fixe, convenu avant la réservation et verrouillé dès que vous réservez. Pas de compteur, pas d’estimation de distance et rien à régler dans la voiture. Voici toute la liste et les trois éléments qui peuvent s’y ajouter.",
    sections: [
      {
        h2: 'Comment votre tarif est calculé',
        body: "Un transfert est un prix fixe, défini par véhicule et non par distance ni par heure. De l’aéroport vers n’importe quel point de Barcelone, c’est un montant ; de l’aéroport vers le terminal de croisière, un autre ; et le taxi standard, le minivan six places et le van sept places ont chacun le leur. Trois choses seulement peuvent s’y ajouter : une destination au-delà de la zone forfaitaire, un transfert au port de croisière, et le tarif week-end et jours fériés. Chacune apparaît comme une ligne distincte avant le paiement.",
      },
      {
        h2: "Existe-t-il un taxi pas cher depuis l'aéroport ?",
        body: "Comparez sur ce contre quoi le prix vous protège, pas seulement sur le montant affiché. Un prix fixe ne bouge plus une fois accepté : la circulation, un détour, un atterrissage tardif et l’heure de la journée sont notre problème, pas le vôtre, et rien n’est encaissé dans la voiture. Ce que vous pouvez contrôler, c’est le véhicule et le fait de voyager hors week-end. Méfiez-vous d’un prix anormalement bas : il signale en général un véhicule non agréé, ou un montant qui gonflera avant votre arrivée.",
      },
      {
        h2: 'Jusqu’où porte le prix fixe',
        body: "Le prix ville couvre tout ce qui se trouve dans un rayon de 16 km du terminal, c’est-à-dire tout Barcelone et les communes immédiates : un court trajet vers El Prat village et une traversée de la ville jusqu’au Park Güell coûtent la même chose. Au-delà de ce rayon, le prix fixe tient toujours et seuls les kilomètres qui dépassent s’ajoutent, à un tarif publié.",
      },
      {
        h2: 'Ce que votre prix comprend',
        body: "Vous réglez en ligne un prix unique tout compris au moment de la réservation. Il couvre le trajet au prix fixe, chaque supplément officiel applicable à votre itinéraire et notre service de réservation et de garantie du véhicule. Il n'y a pas de second montant : rien à payer dans le taxi.",
      },
      {
        h2: "Ce qui ne change jamais votre prix",
        body: "Pas l’heure de la journée : une prise en charge à 04:30 pour un départ matinal coûte exactement ce que coûte une course à deux heures de l’après-midi, car un prix fixe ne comporte pas de tarif de nuit. Ni la circulation, ni l’itinéraire de votre chauffeur, ni le terminal où vous atterrissez, ni le nombre de passagers dans la limite de la capacité du véhicule, ni la quantité de bagages dans cette même limite. Les week-ends et jours fériés sont la seule chose qui relève un prix de la liste, d’un pourcentage publié et non d’une majoration qui suit la demande. Tout le reste est notre risque et non le vôtre, ce qui est précisément ce qu’achète un prix fixé à l’avance.",
      },
      {
        h2: "Comment et quand vous payez",
        body: "Le prix total se règle en ligne, par carte ou par Bizum, au moment de la réservation, et un reçu du montant complet est envoyé avec votre confirmation. Rien n’est encaissé dans la voiture : pas d’espèces à trouver et pas de terminal de paiement dont il faudrait espérer qu’il fonctionne sur le trottoir.",
      },
    ],
  },

  'hotel-transfers': {
    title: "Transfert Hôtel Barcelone Aéroport | Porte à Porte",
    description:
      "Réservez un taxi de votre hôtel de Barcelone vers l’aéroport El Prat, ou de l’aéroport à votre porte. Porte à porte, agréé, à prix fixe.",
    h1: "Transferts hôtel-aéroport à Barcelone",
    intro:
      "La majorité de nos réservations sont des transferts d'hôtel, dans les deux sens. Un taxi porte à porte supprime la partie du trajet la plus sous-estimée : traîner les bagages du hall jusqu'à une station, ou trouver la bonne adresse après un long vol.",
    sections: [
      {
        h2: "Taxi de votre hôtel vers l'aéroport",
        body: "Donnez-nous le nom de l'hôtel, nous nous occupons du reste. Dans les ruelles du Quartier Gothique et d'El Born, où les voitures n'atteignent pas toujours l'entrée, nous convenons à l'avance du point accessible le plus proche plutôt que de laisser cela au hasard le jour même.",
      },
      {
        h2: "Transfert de l'aéroport vers votre hôtel",
        body: "Dans l'autre sens, votre chauffeur vous accueille en salle d'arrivée avec une pancarte et vous conduit directement à l'entrée de l'hôtel. Précieux avec des enfants, des bagages lourds ou un atterrissage tardif.",
      },
      {
        h2: 'Appartements et locations',
        body: "Il en va de même pour les appartements en location courte durée et les adresses Airbnb. Ajoutez le code de porte ou l'entrée précise dans les notes de réservation et votre chauffeur en disposera avant la prise en charge.",
      },
      {
        h2: "Les hôtels situés dans des rues inaccessibles aux voitures",
        body: "Certains quartiers de Barcelone ne sont pas accessibles en voiture jusqu’à la porte. Une grande partie du Barri Gòtic, les ruelles d’El Born et les rues étroites au-dessus de Gràcia sont piétonnes ou trop étroites pour qu’un taxi puisse y attendre, et une adresse d’hôtel dans l’une d’elles implique un point de rencontre à quelques pas de la réception. Indiquez-nous le nom de l’hôtel à la réservation : nous fixerons ce point et l’inscrirons dans votre confirmation, au lieu de laisser votre chauffeur tourner autour d’un pâté de maisons interdit pendant que vous attendez à l’intérieur. Pour un départ depuis l’une de ces adresses, prévoyez cinq minutes de plus que ne l’indique la durée du trajet.",
      },
      {
        h2: "Le check-out et la question des bagages",
        body: "Les départs d’hôtel se concentrent : la plupart des check-out tombent entre 10:00 et 12:00, au moment où la circulation de la ville est la moins prévisible. Si votre vol est en début d’après-midi, réservez la prise en charge au début de cette plage plutôt qu’à la fin. Si vous avez rendu la chambre mais que votre prise en charge est plus tard, la plupart des hôtels gardent les bagages, et mieux vaut le demander à la réception la veille au soir que le matin même. L’aide pour charger et décharger les bagages dans le coffre est comprise dans le prix et jamais facturée, tout comme une attente raisonnable pendant que vous réglez la note.",
      },
      {
        h2: "Factures pour un séjour professionnel",
        body: "Un reçu du montant total vous parvient avec l’e-mail de confirmation, ce que demande en général un outil de notes de frais, et vous n’avez pas à courir après des papiers à la réception au moment du départ. Si vous avez besoin d’une facture avec TVA portant les coordonnées de votre entreprise, envoyez-les-nous par e-mail et nous l’établirons avec la référence de la réservation. Pour un séjour comportant plusieurs transferts, demandez-le-nous et nous les facturerons ensemble plutôt qu’un par un.",
      },
    ],
  },

  'sants-station-to-airport': {
    title: "Taxi Gare de Sants vers l'Aéroport de Barcelone",
    description:
      "Réservez un taxi de la gare de Barcelone-Sants vers l’aéroport El Prat. Environ 15 minutes, un prix tout compris incluant le supplément gare de Sants.",
    h1: "Taxi de la gare de Sants vers l'aéroport",
    intro:
      "Sants est la principale gare de Barcelone et le point d'arrivée des AVE depuis Madrid, Valence et Séville. C'est aussi le grand pôle de transport le plus proche d'El Prat : environ 15 minutes en taxi hors heures de pointe.",
    sections: [
      {
        h2: 'Le supplément gare de Sants',
        body: "Les courses au départ ou à destination de Sants comportent un petit supplément fixe défini par l’AMB. Combiné au supplément aéroport, les deux sont déjà inclus dans le prix affiché avant la réservation : il n’y a rien à ajouter ensuite.",
      },
      {
        h2: 'Où retrouver votre chauffeur',
        body: "La station officielle se trouve côté plaça dels Països Catalans. Pour un transfert réservé, nous fixons un point de rencontre précis au moment de la réservation — utile à Sants, une grande gare à plusieurs sorties.",
      },
      {
        h2: 'Correspondance depuis un AVE',
        body: "Si vous arrivez en AVE, programmez la prise en charge une quinzaine de minutes après l'heure prévue pour disposer d'une marge entre le quai et la rue avec vos bagages.",
      },
      {
        h2: "Train ou taxi de Sants à El Prat",
        body: "Il existe un train Rodalies de Sants à l’aéroport, et pour une personne qui voyage léger c’est de loin le moyen le moins cher. Les conditions comptent : il dessert directement le T2, donc le T1 impose la navette à l’autre bout, et sa fréquence est confortable avec une heure d’avance et inconfortable sans. Un taxi se paie par voiture et non par personne, s’arrête à la porte de votre terminal et prend les bagages. Pour deux personnes avec des valises, ou pour quiconque arrive d’un AVE en retard avec un vol à prendre, c’est généralement le meilleur achat ; et pour un voyageur seul avec un sac à dos et du temps devant lui, honnêtement, ce n’est pas le cas.",
      },
      {
        h2: "Prévoir une correspondance qui prend du retard",
        body: "Un train longue distance en retard est la raison la plus courante pour laquelle un transfert depuis Sants tourne mal, et c’est la seule chose que nous ne pouvons pas suivre comme nous suivons un vol. Si votre correspondance est serrée, réservez la prise en charge à partir de l’heure d’arrivée prévue et non de l’heure de quai que vous espérez, et écrivez-nous sur WhatsApp dès que vous savez que le train est en retard : une prise en charge peut être décalée tant que le chauffeur est encore en route. Sants a plusieurs sorties sur des rues différentes ; le point de rencontre indiqué dans votre confirmation désigne donc une porte précise et non la gare, qui est un bâtiment qui en compte quatre.",
      },
      {
        h2: "À quel terminal nous vous déposons",
        body: "Indiquez-nous votre compagnie et la dépose se fait à la porte du bon terminal. C’est plus important depuis Sants que depuis un hôtel, car l’alternative en train dessert le T2 et un départ du T1 signifie la navette entre terminaux à l’autre bout, soit 25 minutes de porte à porte une fois l’attente comprise. Un taxi supprime complètement ce tronçon. Les départs du T1 forment une seule grande halle ; le T2 est divisé en blocs A, B et C le long de la façade, et se tromper de bloc, c’est une longue marche avec les valises.",
      },
    ],
  },

  'private-transfer': {
    title: 'Transfert Privé Aéroport Barcelone | Votre Taxi',
    description:
      "Un transfert privé depuis l'aéroport de Barcelone : votre taxi agréé rien que pour vous, sans partage ni attente d'autres passagers, au prix fixe.",
    h1: 'Transfert privé aéroport de Barcelone',
    intro:
      "Toutes les réservations ici sont des transferts privés. Le véhicule est le vôtre seul : pas de navette partagée, pas de détours pour récupérer d'autres passagers, pas d'horaire imposé. Vous allez directement de votre point de départ à votre destination.",
    sections: [
      {
        h2: 'Privé ou navette partagée',
        body: "Les navettes partagées coûtent moins cher par personne, mais elles collectent plusieurs groupes et les déposent en chaîne, ce qui peut ajouter une heure à un trajet de 30 minutes. À partir de deux voyageurs l'écart se resserre nettement, et pour une famille avec bagages le taxi privé est généralement à la fois plus rapide et plus simple.",
      },
      {
        h2: 'Choix du véhicule',
        body: "Taxi standard jusqu'à quatre passagers, Mercedes Vito pour six, V-Class pour sept avec les bagages correspondants. Chacun a son propre prix fixe de transfert, affiché avant la réservation, choisissez donc selon la capacité et le confort.",
      },
      {
        h2: 'Déplacements professionnels',
        body: "Pour les déplacements professionnels, nous pouvons affecter la V-Class premium. Un reçu du montant total vous est envoyé par e-mail avec votre confirmation, ce qui suffit en général pour une note de frais ; si vous souhaitez aussi la facture officielle de taxi pour la course elle-même, votre chauffeur peut vous la remettre dans la voiture.",
      },
      {
        h2: "Ce que signifie « privé » ici",
        body: "La voiture est à vous pour le trajet. Personne d’autre n’est pris en charge, il n’y a pas de partage avec un autre groupe qui va dans la même direction, et pas d’attente au terminal que le véhicule se remplisse : les trois choses qui rendent un transfert d’aéroport moins cher. C’est un taxi de Barcelone agréé, avec un chauffeur affecté à votre réservation à l’avance, qui va de votre point de départ à votre destination et nulle part ailleurs. Cela vaut la peine d’être payé pour une arrivée tardive avec des enfants, et nettement moins un après-midi calme de semaine quand on voyage seul ; nous préférons le dire plutôt que de laisser croire que chaque trajet l’exige.",
      },
      {
        h2: "Groupes trop nombreux pour une seule voiture",
        body: "Au-delà de sept passagers, il faut plus d’un véhicule, et ils peuvent être réservés ensemble plutôt que séparément. Choisissez plusieurs voitures dans une seule réservation : elles sont réservées comme un seul groupe, payées en un seul paiement et envoyées au même point de prise en charge, jusqu’à six voitures. Chacune est facturée au prix publié pour sa taille ; un groupe de dix, ce sont donc deux voitures au prix de la liste et non un devis sur mesure, et tout le groupe est affecté ensemble, ce qui compte davantage que l’arithmétique quand dix personnes attendent dans une salle d’arrivée à minuit.",
      },
      {
        h2: "Sièges enfant et tout ce qui sort de l’ordinaire",
        body: "Les sièges enfant ne sont pas installés en standard : si vous en avez besoin, précisez-le dans les notes de réservation et le bon véhicule sera affecté plutôt que le plus proche. Il en va de même pour tout ce qui change le véhicule à envoyer : un fauteuil roulant plié, un vélo, des skis, un instrument de musique ou un animal. Rien de tout cela n’est un problème avec un préavis, et tout cela en est un sur le trottoir, ce qui est tout l’argument pour le signaler à la réservation.",
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24h Aéroport Barcelone | Transferts de Nuit',
    description:
      "Taxi 24h/24 à l’aéroport de Barcelone. Réservez atterrissages de nuit et départs avant l’aube à un prix fixe tout compris, sans majoration nocturne.",
    h1: 'Taxi 24h à l’aéroport de Barcelone',
    intro:
      "El Prat fonctionne jour et nuit, et le service de taxi aussi. Les horaires qu'il vaut vraiment la peine de réserver sont les plus ingrats : les atterrissages après minuit et les départs qui exigent une prise en charge avant l'aube.",
    sections: [
      {
        h2: 'Le tarif de nuit',
        body: "Une prise en charge de nuit coûte le même prix que le même trajet à midi : l’heure ne déplace pas un prix fixe. Les week-ends et jours fériés, si : samedi et dimanche, Noël, le Nouvel An et le calendrier catalan ajoutent chacun 7,5 %, affiché comme une ligne distincte avant le paiement plutôt que découvert ensuite. Trois nuits comportent en plus un supplément réglementé : la veille de Noël, la Saint-Sylvestre et la Revetlla de Sant Joan, le 23 juin.",
      },
      {
        h2: 'Arrivées tardives',
        body: "Si votre vol atterrit à 01:00, la station d'El Prat fonctionne toujours, mais la couverture s'amenuise à mesure que la nuit avance. Une voiture réservée avec votre numéro de vol fait la différence entre sortir directement et patienter.",
      },
      {
        h2: "Départs avant l'aube",
        body: "Les prises en charge dès 04:00 sont pour nous une routine. Réservez la veille au soir au plus tard et nous vous confirmons le chauffeur par e-mail : plus rien à organiser à cette heure-là.",
      },
      {
        h2: "L’heure de la journée ne change pas le prix",
        body: "Une prise en charge à 03:00 coûte ce que coûte le même trajet à trois heures de l’après-midi. C’est assez inhabituel pour mériter d’être dit clairement : un prix fixe ne comporte pas de tarif de nuit, il n’y a donc pas de tranche franchie à 20:00 et pas de majoration qui apparaît à la fin d’un trajet effectué à une heure peu commode. Les week-ends et jours fériés ajoutent un pourcentage publié et rien d’autre ne le fait bouger. Trois nuits de l’année comportent un supplément réglementé additionnel : la veille de Noël, la Saint-Sylvestre et la nuit de la Sant Joan, le 23 juin ; ces nuits-là, un prix réservé qui inclut déjà le supplément vaut plus que d’habitude.",
      },
      {
        h2: "Le vide après le dernier bus",
        body: "Entre le dernier Aerobús et le premier métro du matin, les options publiques se réduisent à un mince réseau de bus de nuit et la station devient le choix par défaut. Une nuit ordinaire, la station du T1 est bien surveillée et avance vite. Cela se gâte quand trois vols retardés atterrissent dans cette fenêtre : la file fait alors quarante personnes et l’offre de taxis à 02:00 est maigre, car les chauffeurs n’attendent pas au terminal au cas où. C’est le scénario où arriver avec une voiture déjà affectée vaut nettement plus qu’elle ne coûte, et mieux vaut le décider avant de voler que dans le hall.",
      },
      {
        h2: "Réserver une prise en charge au milieu de la nuit",
        body: "Une prise en charge à 03:00 ou à 04:30 est confirmée comme n’importe quelle autre, et nous vous confirmons le chauffeur affecté la veille au soir, pour qu’il n’y ait aucune incertitude à l’heure où l’incertitude est la pire. Indiquez un numéro de mobile qui sera allumé et, pour une prise en charge à l’aéroport, le numéro de vol : une arrivée de nuit est celle qui risque le plus d’atterrir en retard, et c’est son suivi qui garde la voiture sur place.",
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: "Taxi Quartier Gothique vers l'Aéroport de Barcelone",
    description:
      "Réservez un taxi du Quartier Gothique vers l’aéroport de Barcelone. Nous convenons à l’avance d’un point de prise en charge accessible.",
    h1: "Taxi du Quartier Gothique vers l'aéroport",
    intro:
      "Le Barri Gòtic est le quartier de Barcelone où réserver à l'avance change réellement l'expérience. L'essentiel du quartier est piéton ou trop étroit pour une voiture : la question n'est donc pas quand votre taxi arrive, mais où il peut réellement vous rejoindre.",
    sections: [
      {
        h2: 'Des points de prise en charge praticables',
        body: "Nous convenons d'un point accessible précis lors de la réservation : le plus souvent Via Laietana, la place de la Cathédrale, le Passeig de Colom ou le côté Rambla, selon votre adresse. Votre chauffeur y patiente et vous aide avec les bagages depuis le coin de rue, plutôt que de tourner dans des ruelles interdites.",
      },
      {
        h2: 'Temps de trajet vers El Prat',
        body: "Du Quartier Gothique à l'aéroport, comptez 20 à 30 minutes hors heures de pointe, par la Ronda Litoral. Prévoyez davantage le matin en semaine et lors des rotations de croisière au port.",
      },
      {
        h2: 'Arriver dans le quartier',
        body: "Depuis l'aéroport, la contrainte est la même en sens inverse. Donnez-nous l'adresse exacte et nous vous déposerons aussi près que les véhicules le permettent, en vous indiquant les quelques mètres à pied jusqu'à la porte.",
      },
      {
        h2: "Les valises sur les pavés",
        body: "Le trajet à pied entre le véhicule et une adresse du Quartier Gothique se fait presque toujours sur des pavés, et souvent avec un escalier à la fin. C’est une courte marche mais pénible avec deux grandes valises, et c’est la chose qui mérite le plus d’être anticipée ici. Quand l’adresse le permet, nous fixons le point de rencontre sur la rue la plus proche où une voiture peut légalement s’arrêter plutôt que sur le point le plus proche sur une carte, car ce n’est pas la même chose dans le Barri Gòtic. L’aide pour les bagages jusqu’à la voiture et depuis celle-ci est comprise ; les escaliers à l’intérieur de l’immeuble, en revanche, aucun transfert ne peut les résoudre.",
      },
      {
        h2: "Quitter le quartier pour un vol matinal",
        body: "Pour un départ à l’aube, le quartier est calme, les rues sont vides et le trajet jusqu’à El Prat est à son plus rapide : 20 à 25 minutes au lieu des 30 à 35 qu’il faut à neuf heures du matin. Ce qui n’est pas facile à 04:30, c’est de trouver un taxi. En héler un dans une ruelle piétonne avant l’aube ne marche pas, et la station la plus proche est à une marche avec les bagages. C’est le cas le plus évident de tout le site pour réserver plutôt que d’improviser, et le prix est le même que pour le même trajet à midi.",
      },
      {
        h2: "Si votre ruelle est fermée aux voitures",
        body: "Certaines parties du Barri Gòtic sont piétonnes ou réservées à certaines heures aux véhicules des résidents, si bien qu’un chauffeur ne peut pas toujours s’arrêter à l’adresse même. Indiquez-nous la rue et la place la plus proche où vous pouvez aller à pied avec vos bagages : le point de rencontre est fixé sur la rue la plus proche où un taxi peut légalement attendre et inscrit dans votre confirmation. Pour un départ, prévoyez cinq minutes de plus pour la marche.",
      },
    ],
  },

  'neighborhoods/eixample': {
    title: "Taxi Eixample vers l'Aéroport de Barcelone",
    description:
      "Réservez un taxi depuis l'Eixample vers l'aéroport de Barcelone-El Prat. Prise en charge porte à porte sur le plan en damier, au prix fixe.",
    h1: "Taxi de l'Eixample vers l'aéroport de Barcelone",
    intro:
      "L'Eixample est le quartier le plus commode de Barcelone pour une prise en charge. Le damier de Cerdà rend presque chaque adresse accessible en voiture, avec la place nécessaire pour s'arrêter et charger les bagages — tout l'inverse de la vieille ville.",
    sections: [
      {
        h2: 'Prise en charge porte à porte',
        body: "Donnez-nous la rue et le numéro, votre chauffeur sera devant la porte. Les angles coupés des îlots de l'Eixample offrent des points de chargement commodes et sûrs si votre adresse tombe sur une portion chargée d'Aragó ou de Balmes.",
      },
      {
        h2: 'Temps de trajet',
        body: "De l'Eixample à El Prat, comptez généralement 25 à 35 minutes. Depuis la Dreta de l'Eixample et le secteur de la Sagrada Família, un peu plus ; depuis les îlots proches de Sants et de la place d'Espagne, un peu moins.",
      },
      {
        h2: 'Les hôtels du quartier',
        body: "L'Eixample concentre une large part des hôtels de Barcelone, dont presque tous ceux du Passeig de Gràcia. Saisissez le nom de l'hôtel plutôt que l'adresse, nous le retrouverons.",
      },
      {
        h2: "De quel coin de l’îlot partir",
        body: "Le damier de l’Eixample rend la prise en charge facile et le point de rencontre ambigu : un seul îlot a quatre coins, chacun sur une rue différente, et un numéro d’immeuble peut se trouver à cent mètres du carrefour où attend un chauffeur. Donnez l’adresse complète à la réservation plutôt que le carrefour, et votre chauffeur viendra à la porte. Quand le pan coupé est le seul endroit où l’on peut légalement s’arrêter, ce qui est souvent le cas aux carrefours plus fréquentés d’Aragó, de Balmes et de la Gran Via, la confirmation indique lequel.",
      },
      {
        h2: "La circulation à la sortie de l’Eixample selon l’heure",
        body: "Le trajet vers El Prat depuis l’Eixample dure 25 à 35 minutes la plupart de la journée, et nettement plus deux fois : les matins de semaine entre 08:00 et 09:30, quand la Gran Via et la Ronda absorbent la circulation pendulaire dans les deux sens, et les vendredis après-midi à partir d’environ 17:00. Du côté de la Sagrada Família, ajoutez cinq à dix minutes ; depuis les îlots proches de la place d’Espagne, retranchez à peu près autant. Un prix fixe absorbe tout cela, le montant ne bouge pas avec la circulation, mais votre heure de départ doit quand même en tenir compte.",
      },
      {
        h2: "Arriver de l’aéroport dans l’Eixample",
        body: "Depuis El Prat, le chauffeur prend le plus rapide des grands accès ce jour-là, et le prix n’en dépend pas. Ce qui change les derniers centaines de mètres, c’est le damier à sens unique : une prise en charge ou une dépose de l’autre côté d’un îlot peut obliger à en faire le tour ; donner le numéro de rue plutôt que le carrefour le plus proche fait gagner quelques minutes et évite une courte marche avec les bagages.",
      },
      {
        h2: "Appartements avec porte sur la rue",
        body: "Beaucoup d’adresses de l’Eixample sont des appartements et non des hôtels : une porte sur la rue avec interphone, pas de réception, et souvent personne pour garder vos bagages. Indiquez les modalités d’accès ou un numéro de contact de votre hôte dans les notes de réservation, et le chauffeur pourra sonner à son arrivée au lieu d’attendre dehors.",
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: "Taxi Centre de Barcelone vers l'Aéroport",
    description:
      "Réservez un taxi depuis le centre de Barcelone vers l’aéroport El Prat. Prise en charge à toute adresse centrale, à un prix fixe convenu.",
    h1: "Taxi du centre de Barcelone vers l'aéroport",
    intro:
      "Depuis n'importe quel point central — la Rambla, la place de Catalogne, El Born, le Raval ou le Passeig de Gràcia — El Prat est à 20 à 35 minutes de route. Réserver fixe l'heure et la voiture, ce qui compte surtout pour le trajet aller.",
    sections: [
      {
        h2: 'Points de prise en charge au centre',
        body: "Les larges artères centrales permettent une prise en charge directe devant la porte. Pour les adresses situées en zone piétonne, nous convenons du coin accessible le plus proche à la réservation, afin de ne rien improviser le jour même.",
      },
      {
        h2: 'Circulation et marges',
        body: "En semaine, de 08:00 à 09:30 et à partir de 18:00, les rondas ralentissent sensiblement. Notre estimation intègre un temps de trajet réaliste, mais pour un vol matinal prévoyez une marge sur l'heure de prise en charge.",
      },
      {
        h2: 'Ce que coûte le trajet',
        body: "Un prix fixe depuis n’importe quel point du centre jusqu’à El Prat, tous suppléments officiels déjà inclus et rien à payer dans le taxi. L’heure ne le change pas ; les week-ends et jours fériés ajoutent 7,5 %. Indiquez votre adresse pour voir votre prix exact avant de vous engager.",
      },
      {
        h2: "Ce qui compte comme centre pour le prix fixe",
        body: "Tout, et bien au-delà. Le prix de la liste couvre toute adresse située à moins de 16 km du terminal, mesurés en ligne droite ; la distinction entre le Quartier Gothique, l’Eixample, Gràcia, Sants, la Barceloneta et le Park Güell, à 14,3 km, n’existe donc pas pour le prix : c’est un seul montant. La zone s’arrête dans les quartiers périphériques du nord et de l’est : Sant Andreu, Nou Barris, La Sagrera et le Fòrum sont tous au-delà de 16 km et ajoutent le tarif au kilomètre. Ce qui diffère dans le centre, c’est la durée du trajet et la possibilité pour une voiture d’atteindre la porte, d’où l’importance de l’adresse même quand elle ne change pas le prix.",
      },
      {
        h2: "Où une voiture peut réellement s’arrêter",
        body: "Le centre contient les deux cas délicats de ce site : des rues entièrement piétonnes et des rues si étroites que s’y arrêter les bloque. Dans les deux cas, le point de rencontre est la rue la plus proche où un taxi peut légalement attendre, indiquée dans votre confirmation plutôt que laissée à deviner le jour même. À l’arrivée, cela signifie un chauffeur à un endroit connu avec une pancarte ; au départ, une courte marche avec les bagages et cinq minutes de plus que ne le suggère le seul temps de trajet.",
      },
      {
        h2: "Arriver dans le centre tard le soir",
        body: "Après 23:30 environ, le centre est la partie de la ville où il est le plus facile d’être conduit et le plus difficile de marcher avec des bagages : le métro ferme, les rues autour de la Rambla sont animées au point de ralentir une voiture, et les cent derniers mètres sur les pavés se font dans le noir. Une voiture réservée s’arrête au point le plus proche de votre porte plutôt qu’à une station, et le chauffeur a l’adresse avant votre atterrissage. Le prix est le même que pour le même trajet à midi.",
      },
    ],
  },

  'group-taxi': {
    title: "Taxi Groupe Aéroport Barcelone | 5, 6 ou 7 Places",
    description:
      "Taxi de groupe depuis l’aéroport de Barcelone : un van de six ou sept places, ou plusieurs voitures réservées ensemble. Un prix fixe tout compris.",
    h1: "Taxi de groupe depuis l’aéroport de Barcelone",
    intro:
      "Un taxi standard de Barcelone compte quatre places. Pour cinq, six ou sept personnes, il existe le Mercedes Vito de six places et la Mercedes V-Class de sept places, et pour un groupe plus nombreux on réserve deux voitures ou plus ensemble. Il n’existe pas de taxi unique de neuf places à Barcelone, et nous préférons vous le dire plutôt que de vous le faire découvrir sur le trottoir.",
    sections: [
      {
        h2: "Combien de personnes et de valises tiennent à bord",
        body: "La vraie limite est le coffre, pas les sièges. Un taxi standard de quatre places transporte quatre passagers et environ trois grandes valises ; certains modèles en prennent quatre. Le Mercedes Vito de six places transporte six passagers et six bagages, et la Mercedes V-Class de sept places sept passagers et sept bagages. Si vous voyagez avec un objet hors format, comme des skis, un vélo, une poussette ou un instrument de musique, indiquez-le dans les notes de réservation afin que le bon véhicule soit affecté plutôt que le plus proche.",
      },
      {
        h2: "Cinq, six ou sept personnes : un seul véhicule",
        body: "Jusqu’à sept personnes voyagent ensemble dans un seul véhicule, à un prix fixe tout compris. Le taxi de quatre places coûte 50 EUR entre l’aéroport et n’importe quel point de Barcelone, le Vito de six places 70 EUR et la V-Class de sept places 75 EUR. Les week-ends et jours fériés ajoutent 7,5 %. C’est tout le prix : le supplément aéroport, le supplément du véhicule plus grand et notre service sont déjà inclus, et rien n’est dû au chauffeur.",
      },
      {
        h2: "Huit, neuf ou dix personnes : réservez deux voitures ensemble",
        body: "Au-delà de sept, il n’existe pas de taxi unique ; la réponse consiste donc en deux véhicules ou plus qui voyagent comme un seul groupe. Choisissez plusieurs voitures dans une seule réservation : elles sont réservées ensemble, payées en un seul paiement et envoyées au même point de prise en charge, jusqu’à six voitures. Chacune est facturée au prix publié pour sa taille, sans devis sur mesure et sans surprise : huit personnes peuvent voyager dans deux taxis de quatre places pour 100 EUR en semaine, neuf dans un Vito de six places et un taxi de quatre places pour 120 EUR (70 EUR plus 50 EUR), et onze dans une V-Class de sept places et un taxi de quatre places pour 125 EUR.",
      },
      {
        h2: "Un seul paiement, un seul point de prise en charge, toutes les voitures ensemble",
        body: "Les voitures d’une réservation de groupe sont affectées ensemble et vous recevez par e-mail le nom et le numéro de chaque chauffeur. Ils attendent dans la salle d’arrivée de votre terminal avec une pancarte à votre nom et suivent le même numéro de vol : un atterrissage tardif décale tout le groupe au lieu de le séparer. C’est la différence concrète avec la file de la station à huit personnes, où l’on attend que les taxis arrivent un par un ou deux par deux.",
      },
      {
        h2: "Groupes de croisière, familles et mariages",
        body: "La même logique s’applique au terminal de croisière du Moll Adossat, où les prix fixes sont de 60 EUR, 80 EUR et 85 EUR pour les véhicules de quatre, six et sept places, ainsi qu’à une famille avec des grands-parents et une pile de bagages. Pour un mariage ou une délégation de congrès, indiquez-nous les heures d’arrivée et le nombre de valises à la réservation et nous vous dirons honnêtement si deux voitures suffisent ou si trois est le choix le plus sûr.",
      },
    ],
  },

  'book-online': {
    title: 'Réserver un Taxi Aéroport Barcelone en Ligne',
    description:
      "Réservez un taxi pour l’aéroport de Barcelone en quelques minutes. Prix fixe immédiat, paiement sécurisé et confirmation par e-mail.",
    h1: "Réserver un taxi pour l'aéroport de Barcelone en ligne",
    intro:
      "Réserver en ligne prend quelques minutes et vous garantit une voiture confirmée avec chauffeur affecté. Vous réglez un prix unique tout compris en ligne et ne devez rien dans le taxi.",
    sections: [
      {
        h2: 'Ce qu’il faut pour réserver',
        body: "Votre adresse de prise en charge, votre destination, la date et l'heure, et un numéro de téléphone. Pour une prise en charge à l'aéroport, ajoutez votre numéro de vol afin que le chauffeur suive l'atterrissage. Les réservations exigent trois heures de préavis minimum ; pour plus tôt, écrivez-nous sur WhatsApp.",
      },
      {
        h2: 'Après votre réservation',
        body: "Vous recevez immédiatement un e-mail de confirmation reprenant l'itinéraire, le véhicule, l'estimation et le reçu de ce que vous avez payé en ligne. Un chauffeur est ensuite affecté et ses coordonnées vous sont transmises avant le trajet.",
      },
      {
        h2: 'Modifications et annulations',
        body: "Les plans changent. Annulez au moins 24 heures avant la prise en charge et vous êtes intégralement remboursé. Pour décaler une réservation, répondez à l'e-mail de confirmation.",
      },
      {
        h2: "Ce qu’il faut avoir sous la main",
        body: "Une adresse complète plutôt qu’un quartier, le nombre de passagers et le nombre de valises que vous transportez réellement, ce dernier point comptant plus qu’on ne le croit, car une voiture de quatre places prend quatre passagers mais seulement environ trois valises. Si vous arrivez par avion, votre numéro de vol : il est facultatif, mais grâce à lui nous suivons l’atterrissage réel et décalons automatiquement la prise en charge, si bien qu’un retard ne vous coûte rien et que vous n’avez pas à deviner une heure sûre des semaines à l’avance. Un numéro de mobile joignable le jour même complète le tout, car c’est ainsi que votre chauffeur vous joint si la salle d’arrivée vous met tous deux en échec.",
      },
      {
        h2: "Pourquoi le formulaire exige trois heures de préavis",
        body: "Les réservations en ligne demandent au moins trois heures avant la prise en charge, et la raison tient à un chauffeur plus qu’à un système : affecter de façon fiable une voiture et une personne précises à une heure précise prend plus de temps que de les affecter en théorie. En deçà de trois heures, la réponse honnête est de nous écrire sur WhatsApp, où nous pouvons vérifier ce qui est réellement disponible et confirmer une voiture directement, ou vous dire tout de suite qu’il n’y en a pas. C’est une expérience moins bonne que le formulaire, et meilleure qu’une confirmation que nous ne pourrions pas tenir.",
      },
      {
        h2: "Comment vous payez, et ce que vous recevez",
        body: "La totalité du montant se règle en ligne à la réservation, par carte bancaire de crédit, de débit ou par Bizum. Il n’y a pas de partage acompte et solde, et rien n’est dû au chauffeur dans la voiture : ni course, ni supplément, ni pourboire attendu. Un reçu du montant complet est envoyé avec votre confirmation, si bien que les papiers pour une note de frais arrivent avant le trajet et non après. Si vous avez aussi besoin de la facture de taxi réglementaire pour la course elle-même, votre chauffeur peut l’établir sur demande.",
      },
    ],
  },
};
