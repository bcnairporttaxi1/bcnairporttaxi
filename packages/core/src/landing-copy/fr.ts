import type { LandingCopy } from '../landing-pages';

/** French long-form copy for the keyword landing pages. */
export const FR_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Aéroport Barcelone Centre-Ville | Réserver',
    description:
      "Réservez un taxi de l'aéroport de Barcelone vers le centre. Tarif officiel au compteur AMB, supplément El Prat inclus dans l'estimation, chauffeur en salle d'arrivée.",
    h1: "Taxi de l'aéroport de Barcelone vers le centre",
    intro:
      "Un taxi depuis El Prat jusqu'au centre de Barcelone prend 25 à 35 minutes selon la circulation et le terminal d'arrivée. Réserver à l'avance signifie qu'un chauffeur vous attend déjà à l'atterrissage, pancarte à votre nom en salle d'arrivée, plutôt que la file d'attente à la station T1 ou T2.",
    sections: [
      {
        h2: "Combien coûte un transfert depuis l'aéroport de Barcelone",
        body: "Le tarif est celui du compteur officiel de l'AMB. Depuis El Prat vous réglez le montant au compteur plus le supplément aéroport fixe, et un tarif minimum s'applique aux trajets très courts au départ de l'aéroport. En pratique, un trajet de l'aéroport vers le centre de Barcelone se situe généralement entre trente-cinq et quarante-cinq euros, davantage la nuit et le week-end lorsque le tarif T-2 s'applique. Indiquez votre destination exacte ci-dessus pour une estimation précise.",
      },
      {
        h2: 'Où votre chauffeur vous attend',
        body: "Votre chauffeur patiente dans la salle d'arrivée de votre terminal avec une pancarte à votre nom et suit votre numéro de vol : un retard ne vous fait pas perdre la voiture. Le point de rencontre exact pour T1 et T2 figure dans votre e-mail de confirmation.",
      },
      {
        h2: 'Terminal 1 et Terminal 2',
        body: "Les deux terminaux disposent d'une station de taxis officielle et nos chauffeurs desservent les deux. Le T1 concentre le long-courrier et l'essentiel de Vueling ; le T2 accueille de nombreuses compagnies low-cost. L'écart de prix entre les deux reste faible, quelques kilomètres, même si le T1 est un peu plus éloigné de la ville.",
      },
    ],
  },

  'city-to-airport': {
    title: "Taxi Barcelone vers l'Aéroport | Réserver en ligne",
    description:
      "Réservez un taxi depuis Barcelone vers l'aéroport El Prat. Heure de prise en charge fixe, tarif officiel au compteur, chauffeurs qui connaissent chaque porte de terminal.",
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
        body: "La première vague de départs quitte El Prat avant 07:00, ce qui implique des prises en charge dès 04:30. Ces trajets relèvent du tarif de nuit T-2, et nous confirmons le chauffeur la veille au soir pour qu'il ne reste rien à organiser à quatre heures du matin.",
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aéroport El Prat | Transferts Agréés Barcelone',
    description:
      "Taxis agréés vers et depuis l'aéroport de Barcelone-El Prat (BCN). Réservez en ligne avec une estimation au tarif officiel AMB et un chauffeur affecté à votre vol.",
    h1: 'Taxi aéroport El Prat',
    intro:
      "L'aéroport Josep Tarradellas Barcelone-El Prat, que presque tout le monde appelle encore simplement El Prat, se trouve à environ 15 km au sud-ouest de la ville. Deuxième aéroport d'Espagne par le trafic, il se rejoint le plus rapidement en taxi à presque toute heure — à condition qu'une voiture attende.",
    sections: [
      {
        h2: 'Réserver plutôt que faire la queue',
        body: "La station officielle d'El Prat est bien tenue et avance généralement vite. Elle sature à des moments prévisibles : les vagues d'arrivées en milieu de matinée, les dimanches soir, et lorsque plusieurs long-courriers atterrissent ensemble. Réserver supprime ce risque et fixe votre chauffeur à l'avance, au même tarif compteur.",
      },
      {
        h2: "Le supplément aéroport d'El Prat",
        body: "Tout trajet commençant ou finissant à El Prat comporte un supplément aéroport fixe défini par l'AMB, et les trajets au départ de l'aéroport ont un tarif minimum. Les deux sont intégrés à l'estimation affichée avant réservation : aucune surprise au compteur.",
      },
      {
        h2: 'Passagers de croisière',
        body: "Pour une correspondance vers une croisière, le trajet entre El Prat et le terminal du Moll Adossat relève d'un prix fixe officiel plutôt que du compteur. Saisissez le terminal de croisière comme destination et l'estimation bascule automatiquement sur ce prix.",
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Prix Taxi Aéroport Barcelone | Tarifs AMB 2026',
    description:
      "Ce que coûte réellement un taxi vers l'aéroport de Barcelone : grille officielle AMB, supplément El Prat, tarif minimum aéroport et nos frais de réservation.",
    h1: "Prix d'un taxi pour l'aéroport de Barcelone",
    intro:
      "Les prix des taxis à Barcelone sont réglementés. Aucun taxi agréé ne peut facturer plus ou moins que le compteur officiel de l'AMB, ce qui veut dire que la réponse honnête à « combien ça coûte » est un calcul, pas un argument commercial. Voici exactement comment ce calcul fonctionne.",
    sections: [
      {
        h2: 'Comment votre tarif est calculé',
        body: "Chaque course démarre par une prise en charge fixe, puis ajoute un prix au kilomètre. Le tarif applicable dépend du moment : T-1 en journée du lundi au vendredi entre 08:00 et 20:00, et T-2, plus élevé, la nuit, tout le samedi et le dimanche, ainsi que les jours fériés. Les suppléments aéroport, port de croisière, gare de Sants et Fira Gran Via s'ajoutent, dans la limite d'un plafond par course.",
      },
      {
        h2: "Existe-t-il un taxi pas cher depuis l'aéroport ?",
        body: "Pas au sens où un opérateur casserait les prix : le compteur de l'AMB est identique dans tous les taxis agréés, donc personne ne peut légalement être moins cher sur la course. Ce que vous maîtrisez, c'est l'horaire et le véhicule. Voyager dans la plage diurne T-1 coûte nettement moins par kilomètre que la nuit ou le week-end, et à quatre une seule voiture bat quatre billets séparés. Méfiez-vous des tarifs annoncés très en dessous du compteur : c'est souvent le signe d'un véhicule non agréé.",
      },
      {
        h2: 'Le tarif minimum aéroport',
        body: "Les courses au départ d'El Prat comportent un tarif minimum. Si le compteur affiche moins que ce minimum sur un trajet court, c'est le minimum qui s'applique. Cela concerne surtout les trajets vers El Prat village ou les hôtels voisins, pas les courses vers Barcelone.",
      },
      {
        h2: 'Ce que nous facturons',
        body: "Nos frais de réservation représentent un pourcentage de la course, réglé en ligne : 20% du lundi au vendredi, 25% le week-end, les jours fériés et les nuits spéciales. C'est une prestation de mise en relation, pas une majoration du tarif, et cela n'apparaît jamais au compteur. Vous le voyez sur une ligne distincte avant paiement et recevez un reçu séparé. Vous pouvez aussi prépayer l'intégralité à prix fixe : plus rien n'est dû dans le taxi.",
      },
    ],
  },

  'hotel-transfers': {
    title: "Transfert Hôtel Barcelone Aéroport | Porte à Porte",
    description:
      "Réservez un taxi depuis votre hôtel de Barcelone vers l'aéroport El Prat, ou de l'aéroport jusqu'à la porte de votre hôtel. Porte à porte, agréé, au tarif officiel.",
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
    ],
  },

  'sants-station-to-airport': {
    title: "Taxi Gare de Sants vers l'Aéroport de Barcelone",
    description:
      "Réservez un taxi depuis la gare de Barcelone-Sants vers l'aéroport El Prat. Environ 15 minutes, tarif officiel au compteur, supplément gare inclus.",
    h1: "Taxi de la gare de Sants vers l'aéroport",
    intro:
      "Sants est la principale gare de Barcelone et le point d'arrivée des AVE depuis Madrid, Valence et Séville. C'est aussi le grand pôle de transport le plus proche d'El Prat : environ 15 minutes en taxi hors heures de pointe.",
    sections: [
      {
        h2: 'Le supplément gare de Sants',
        body: "Les courses au départ ou à destination de Sants comportent un petit supplément fixe défini par l'AMB, en plus du tarif au compteur. Avec le supplément aéroport, les deux sont inclus dans l'estimation affichée avant réservation, et le total des suppléments est plafonné par course.",
      },
      {
        h2: 'Où retrouver votre chauffeur',
        body: "La station officielle se trouve côté plaça dels Països Catalans. Pour un transfert réservé, nous fixons un point de rencontre précis au moment de la réservation — utile à Sants, une grande gare à plusieurs sorties.",
      },
      {
        h2: 'Correspondance depuis un AVE',
        body: "Si vous arrivez en AVE, programmez la prise en charge une quinzaine de minutes après l'heure prévue pour disposer d'une marge entre le quai et la rue avec vos bagages.",
      },
    ],
  },

  'private-transfer': {
    title: 'Transfert Privé Aéroport Barcelone | Votre Taxi',
    description:
      "Un transfert privé depuis l'aéroport de Barcelone : votre taxi agréé rien que pour vous, sans partage ni attente d'autres passagers, au tarif officiel AMB.",
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
        body: "Taxi standard jusqu'à quatre passagers, Mercedes Vito pour six, V-Class pour sept avec les bagages correspondants. Le tarif au compteur ne varie pas selon la taille du véhicule — il est fixé par l'AMB — choisissez donc selon la capacité et le confort.",
      },
      {
        h2: 'Déplacements professionnels',
        body: "Pour les voyages d'affaires nous pouvons affecter la V-Class et fournir la facture du taxi pour vos notes de frais. Demandez la facture au compteur à votre chauffeur ; le reçu des frais de réservation vous parvient séparément par e-mail.",
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24h Aéroport Barcelone | Transferts de Nuit',
    description:
      "Service de taxi 24h/24 à l'aéroport de Barcelone. Réservez atterrissages nocturnes et départs avant l'aube au tarif de nuit officiel de l'AMB.",
    h1: 'Taxi 24h à l’aéroport de Barcelone',
    intro:
      "El Prat fonctionne jour et nuit, et le service de taxi aussi. Les horaires qu'il vaut vraiment la peine de réserver sont les plus ingrats : les atterrissages après minuit et les départs qui exigent une prise en charge avant l'aube.",
    sections: [
      {
        h2: 'Le tarif de nuit',
        body: "Entre 20:00 et 08:00, tout le week-end et les jours fériés, le tarif T-2, plus élevé, s'applique. Il est fixé par l'AMB et vaut identiquement pour tous les taxis agréés de Barcelone : ce n'est pas une majoration de notre fait. Votre estimation retient automatiquement le bon tarif selon l'heure réelle de prise en charge. Les nuits de Noël et du Nouvel An comportent en outre un supplément officiel.",
      },
      {
        h2: 'Arrivées tardives',
        body: "Si votre vol atterrit à 01:00, la station d'El Prat fonctionne toujours, mais la couverture s'amenuise à mesure que la nuit avance. Une voiture réservée avec votre numéro de vol fait la différence entre sortir directement et patienter.",
      },
      {
        h2: "Départs avant l'aube",
        body: "Les prises en charge dès 04:00 sont pour nous une routine. Réservez la veille au soir au plus tard et nous vous confirmons le chauffeur par e-mail : plus rien à organiser à cette heure-là.",
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: "Taxi Quartier Gothique vers l'Aéroport de Barcelone",
    description:
      "Réservez un taxi depuis le Quartier Gothique vers l'aéroport de Barcelone. Nous convenons à l'avance d'un point accessible : la plupart des ruelles du Barri Gòtic sont trop étroites.",
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
    ],
  },

  'neighborhoods/eixample': {
    title: "Taxi Eixample vers l'Aéroport de Barcelone",
    description:
      "Réservez un taxi depuis l'Eixample vers l'aéroport de Barcelone-El Prat. Prise en charge porte à porte sur le plan en damier, au tarif officiel de l'AMB.",
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
    ],
  },

  'neighborhoods/city-centre': {
    title: "Taxi Centre de Barcelone vers l'Aéroport",
    description:
      "Réservez un taxi depuis le centre de Barcelone vers l'aéroport El Prat. Prise en charge à toute adresse centrale, tarif officiel au compteur, chauffeur confirmé à l'avance.",
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
        body: "Le montant au compteur depuis le centre jusqu'à El Prat, plus le supplément aéroport fixe. La nuit et le week-end, le tarif T-2 s'applique. Saisissez votre adresse pour une estimation exacte avant de vous engager.",
      },
    ],
  },

  'book-online': {
    title: 'Réserver un Taxi Aéroport Barcelone en Ligne',
    description:
      "Réservez un taxi pour l'aéroport de Barcelone en quelques minutes. Estimation immédiate aux tarifs officiels AMB, paiement sécurisé, confirmation instantanée par e-mail.",
    h1: "Réserver un taxi pour l'aéroport de Barcelone en ligne",
    intro:
      "La réservation en ligne prend deux minutes et vous garantit une voiture confirmée avec chauffeur affecté. Payez seulement les frais de réservation maintenant et réglez le compteur à votre chauffeur, ou prépayez l'intégralité à prix fixe et ne devez plus rien dans le taxi.",
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
        body: "Les plans changent. Annulez au moins 24 heures avant la prise en charge et les frais de réservation sont intégralement remboursés. Pour décaler une réservation, répondez à l'e-mail de confirmation et nous la reprogrammons.",
      },
    ],
  },
};
