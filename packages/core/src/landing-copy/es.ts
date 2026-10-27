import type { LandingCopy } from '../landing-pages';

/**
 * Spanish long-form copy for the keyword landing pages.
 *
 * Written for Spanish readers rather than translated word for word — the
 * English text uses British phrasing and comparisons that do not carry over.
 * Headings keep the target keyword in the form Spanish speakers actually
 * search ("taxi aeropuerto Barcelona", not "taxi de aeropuerto de Barcelona").
 */
export const ES_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Aeropuerto Barcelona al Centro | Reserva Online',
    description:
      'Reserva un taxi del aeropuerto de Barcelona al centro. Precio fijo todo incluido, con el suplemento de El Prat ya dentro y conductor esperando en llegadas.',
    h1: 'Taxi del aeropuerto de Barcelona al centro',
    intro:
      'Un taxi desde El Prat hasta el centro de Barcelona tarda entre 25 y 35 minutos según el tráfico y la terminal en la que aterrices. Reservar con antelación significa que ya hay un conductor asignado cuando llegas, con un cartel con tu nombre en la sala de llegadas, en lugar de hacer cola en la parada de T1 o T2.',
    sections: [
      {
        h2: 'Cuánto cuesta un traslado del aeropuerto de Barcelona',
        body: 'El precio lo fijamos nosotros, de nuestra propia lista: no es una lectura del taxímetro ni una estimación. Todos los suplementos oficiales que correspondan a la ruta ya están dentro de la cifra. En la práctica, un trayecto del aeropuerto a cualquier punto de Barcelona son 50 € fijos en taxi estándar, sea cual sea la distancia y la hora; los fines de semana y festivos añaden un 7,5 %. Introduce tu destino exacto arriba para ver tu precio.',
      },
      {
        h2: 'Dónde te espera el conductor en llegadas',
        body: 'Tu conductor espera dentro de la sala de llegadas de tu terminal con un cartel con tu nombre y sigue el número de vuelo, de modo que un retraso no te deja sin coche. El punto de encuentro exacto para T1 y T2 va incluido en el correo de confirmación.',
      },
      {
        h2: 'Terminal 1 y Terminal 2',
        body: 'Ambas terminales tienen parada oficial de taxis y nuestros conductores atienden las dos. La T1 concentra los vuelos de largo radio y buena parte de Vueling; la T2 sirve a muchas compañías de bajo coste. La diferencia de precio entre ellas es pequeña, un par de kilómetros, aunque la T1 queda algo más lejos de la ciudad.',
      },
      {
        h2: 'Hasta dónde llegan los 50 €',
        body: 'Un único precio cubre cualquier dirección situada a menos de 16 km de la terminal, medidos en línea recta y no por carretera. Eso incluye todo el centro y casi todos los sitios donde se aloja un visitante: Ciutat Vella, el Eixample, Gràcia, Sants, el frente marítimo hasta la Barceloneta y el Poblenou, y el Park Güell, tras Gràcia, a 14,3 km. Todos al mismo precio que un hotel del paseo de Gracia. Medir en línea recta juega a tu favor, porque la carretera hacia la ciudad es bastante más larga que la recta: tiene que rodear el Llobregat y entrar por la Gran Via, de modo que una zona trazada a lo largo del recorrido dejaría el centro fuera. La zona acaba en los distritos exteriores del norte y del este: La Sagrera, a 16,4 km, el Fòrum, a 17,4, Sant Andreu, a 17,7, y Nou Barris, a 17,9, quedan más allá, igual que Sant Cugat, a 19,4, y Badalona, a 21,8. En todos ellos se paga el precio de lista más 1,50 € por cada kilómetro adicional.',
      },
      {
        h2: 'Taxi, Aerobús o metro hasta la ciudad',
        body: 'El Aerobús cobra por persona y el taxi cobra por coche, y eso resuelve buena parte de la duda antes de empezar. Si viajas solo y con equipaje de mano, el autobús sale más a cuenta y no hay color; con tres pasajeros la diferencia se ha reducido mucho, y con cuatro suele haber desaparecido. La línea 9 Sud del metro es más barata que las dos opciones, pero obliga a hacer un transbordo, algo que va bien con una maleta por persona y bastante peor con dos. La regla sincera: cuenta las personas y cuenta las maletas. Una o dos de cada, de día: el autobús. Tres o más personas, dos maletas cada una o una llegada cuando ya no hay autobuses: taxi.',
      },
    ],
  },

  'city-to-airport': {
    title: 'Taxi de Barcelona al Aeropuerto | Reserva Online',
    description:
      'Reserva un taxi desde Barcelona al aeropuerto de El Prat. Hora de recogida fija, precio fijo todo incluido y conductores expertos.',
    h1: 'Taxi de Barcelona al aeropuerto',
    intro:
      'El trayecto de ida al aeropuerto es el que realmente conviene reservar. Un taxi previamente contratado llega a tu hotel o apartamento a una hora fijada, algo que importa mucho más cuando tienes un vuelo que coger que cuando estás llegando.',
    sections: [
      {
        h2: 'Cuándo reservar tu taxi de Barcelona al aeropuerto',
        body: 'Para un vuelo europeo de corto radio, calcula dos horas entre llegar a El Prat y la salida; para largo radio, tres. Añade entre 30 y 40 minutos de trayecto desde el centro de Barcelona, y algo más en hora punta entre semana. Nuestro formulario exige un mínimo de tres horas de antelación, así que reserva como muy tarde la noche anterior.',
      },
      {
        h2: 'A qué terminal te dejamos',
        body: 'Dinos tu compañía aérea y te dejamos en la puerta correcta. Salidas de la T1 es una única sala grande; la T2 se divide en los bloques A, B y C, y bajarse en el bloque equivocado significa una caminata larga con maletas.',
      },
      {
        h2: 'Vuelos de primera hora desde El Prat',
        body: 'La primera oleada de salidas de El Prat despega antes de las 07:00, lo que implica recogidas desde las 04:30. Una recogida a las 04:30 cuesta lo mismo que el mismo trayecto a mediodía, porque la hora no mueve un precio fijo, y confirmamos el conductor la tarde anterior para que no quede nada por resolver a las cuatro de la mañana.',
      },
      {
        h2: 'Mira la terminal en tu tarjeta de embarque, no en la reserva',
        body: 'La T1 y la T2 no se pueden recorrer a pie de una a otra. Están en lados opuestos de las pistas y las une un autobús gratuito que tarda de 10 a 15 minutos sin contar la espera: calcula 25 minutos de puerta a puerta. En una salida eso importa mucho más que en una llegada, porque si te dejan en la terminal equivocada lo descubres en un mostrador de facturación que no tiene tu vuelo. Las aerolíneas cambian de terminal cuando se renuevan los contratos, y un vuelo en código compartido sigue a la compañía que lo opera y no a la que figura en tu confirmación, así que la terminal impresa en tu tarjeta de embarque es la única fuente fiable. Si no coincide con lo que nos dijiste, responde a tu confirmación y lo cambiamos sin coste.',
      },
      {
        h2: 'Si tus planes cambian antes de la recogida',
        body: 'Puedes cambiar los datos tú mismo durante los primeros 30 minutos tras reservar y, después, hasta que tu conductor salga hacia ti: responde a tu confirmación o escríbenos por WhatsApp. Cambiar la hora de recogida, la terminal o la dirección no cuesta nada, y una terminal equivocada es la corrección más habitual que hacemos. Si el viaje se cae del todo, cancela al menos 24 horas antes de la recogida y se te devuelve el importe íntegro a la tarjeta con la que pagaste, normalmente en un plazo de cinco a diez días laborables. Dentro de esas 24 horas seguiremos intentando ayudarte, pero el reembolso ya no es automático.',
      },
      {
        h2: 'Elegir vehículo cuando llevas mucho equipaje',
        body: 'Cuenta las maletas antes de elegir. Un taxi de cuatro plazas admite unas tres maletas grandes, la Vito de seis plazas admite seis y la V-Class de siete plazas admite siete. Una salida con mucho equipaje es el único caso en que merece la pena pagar de 20 a 25 € más por un vehículo mayor, porque la alternativa es llegar a la terminal con una maleta sobre las rodillas.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aeropuerto El Prat | Traslados con Licencia',
    description:
      'Taxis con licencia hacia y desde el aeropuerto de Barcelona-El Prat (BCN). Reserva online con precio fijo y conductor asignado a tu vuelo.',
    h1: 'Taxi aeropuerto de El Prat',
    intro:
      'El aeropuerto Josep Tarradellas Barcelona-El Prat, que casi todo el mundo sigue llamando simplemente El Prat, está a unos 15 km al suroeste de la ciudad. Es el segundo aeropuerto más transitado de España y el taxi es la forma más rápida de llegar a Barcelona a casi cualquier hora, siempre que haya un coche esperando.',
    sections: [
      {
        h2: 'Reservar un taxi al aeropuerto de Barcelona o ir a la parada',
        body: 'La parada oficial de El Prat está bien organizada y suele avanzar rápido. Se colapsa en momentos previsibles: las oleadas de llegadas de media mañana, los domingos por la tarde y cuando aterrizan varios vuelos de largo radio a la vez. Reservar con antelación elimina ese riesgo por completo, fija tu conductor de antemano y fija tu precio antes de viajar.',
      },
      {
        h2: 'El suplemento de aeropuerto de El Prat',
        body: 'El suplemento oficial de aeropuerto y cualquier otro cargo que corresponda a la ruta están dentro del precio fijo que te damos. No hay taxímetro en marcha ni una segunda cifra al final, así que no hay sorpresas.',
      },
      {
        h2: 'Pasajeros de crucero',
        body: 'Para quien enlaza con un crucero, el trayecto entre El Prat y la terminal de cruceros del Moll Adossat tiene su propio precio fijo, listado aparte del precio de ciudad. Introduce la terminal de cruceros como destino y el precio cambia automáticamente a ese.',
      },
      {
        h2: 'Qué vehículo necesitas según tu equipaje',
        body: 'Elige por maletas y no por número de personas. Un taxi de cuatro plazas lleva a cuatro pasajeros pero solo unas tres maletas grandes: el maletero de un Corolla o de un SEAT Toledo es el límite real, y el que más se calcula mal al reservar desde casa. Cuatro adultos con una maleta grande cada uno necesitan la Mercedes Vito de seis plazas, que admite seis pasajeros y seis maletas; por encima de eso, la V-Class de siete plazas lleva siete de cada. Si llevas algo de gran tamaño, como una bicicleta, esquís o una tabla de surf, anótalo en las notas de la reserva en lugar de confiar en que un coche más grande servirá, porque la respuesta a veces es un vehículo concreto y no simplemente uno más espacioso.',
      },
      {
        h2: 'Recogida en la Terminal 1 y la Terminal 2',
        body: 'Un traslado reservado no usa la parada. Tu conductor espera dentro de la sala de llegadas, en la zona pública a la salida de la recogida de equipajes, con un cartel con tu nombre: no en la acera ni en la cola. La T2 se divide en los bloques A, B y C a lo largo de la fachada, así que indicar tu bloque al reservar marca la diferencia entre un conductor que está justo donde sales y otro trescientos metros más allá. El conductor sigue el número de tu vuelo, de modo que un aterrizaje con retraso desplaza la recogida en vez de perderla, y el teléfono de tu confirmación llega directamente a él y no a una oficina.',
      },
      {
        h2: 'Llegadas tardías y vuelos con retraso',
        body: 'Una recogida reservada sigue a tu vuelo y no al horario. Si aterrizas con horas de retraso, el conductor sigue allí, no se cobra ninguna espera por un aterrizaje con retraso y no hay nada que renegociar cuando llegas. Si el vuelo se cancela del todo, avísanos y se te devuelve el importe íntegro.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Precio Taxi Aeropuerto Barcelona | Tarifa Fija 2026',
    description:
      'Lo que cuesta de verdad un taxi al aeropuerto de Barcelona: nuestros precios fijos por vehículo y qué añade la tarifa de fin de semana.',
    h1: 'Precio del taxi al aeropuerto de Barcelona',
    intro:
      'Un traslado con nosotros es un precio fijo, acordado antes de reservar y fijado al reservar. Sin taxímetro, sin cálculos de distancia y sin nada que pagar en el coche. Esta es la lista completa y las tres cosas que pueden añadirse.',
    sections: [
      {
        h2: 'Cómo se calcula el precio de tu taxi al aeropuerto',
        body: 'Un traslado es un precio fijo, definido por ruta y vehículo, no por distancia ni por hora. Del aeropuerto a cualquier punto de Barcelona es una cifra; del aeropuerto a la terminal de cruceros, otra; y el taxi estándar, el minivan de seis plazas y la van de siete tienen cada uno la suya. Solo tres cosas pueden añadirse: un destino más allá de la zona plana, un traslado al puerto de cruceros y la tarifa de fin de semana y festivos. Cada una aparece como una línea propia antes de pagar.',
      },
      {
        h2: '¿Existe un taxi barato desde el aeropuerto de Barcelona?',
        body: 'Compara por lo que el precio te protege, no solo por la cifra. Un precio fijo no se mueve una vez acordado: el tráfico, un desvío, un aterrizaje con retraso y la hora del día son nuestro problema, no tuyo, y en el coche no se cobra nada. Lo que sí puedes controlar es el vehículo y viajar fuera del fin de semana. Desconfía de un precio inusualmente bajo: suele indicar un vehículo sin licencia, o una cifra que crecerá antes de que llegues.',
      },
      {
        h2: 'Hasta dónde llega el precio fijo',
        body: 'El precio de ciudad cubre todo lo que esté en un radio de 16 km desde la terminal, es decir, toda Barcelona y los municipios inmediatos: un trayecto corto a El Prat pueblo y una carrera al Park Güell cuestan lo mismo. Más allá de ese radio el precio fijo sigue valiendo y solo se añaden los kilómetros que sobresalen, a un precio publicado.',
      },
      {
        h2: 'Qué incluye tu precio',
        body: 'Pagas un único precio con todo incluido al reservar online. Cubre el trayecto, todos los suplementos oficiales que correspondan a tu ruta y nuestro servicio de reservar y garantizar el coche. No hay un segundo importe: en el taxi no se paga nada, y recibes por correo un recibo por el precio completo.',
      },
      {
        h2: 'Qué nunca cambia tu precio',
        body: 'No lo cambia la hora del día: una recogida a las 04:30 para una salida temprana cuesta exactamente lo mismo que una carrera a las dos de la tarde, porque un precio fijo no lleva tarifa nocturna. Tampoco el tráfico, la ruta que elija tu conductor, la terminal en la que aterrices, el número de pasajeros hasta la capacidad del vehículo ni la cantidad de equipaje que quepa en él. Los fines de semana y festivos son lo único que sube un precio de lista, con un porcentaje publicado y no con un recargo que se mueva según la demanda. Todo lo demás es riesgo nuestro y no tuyo, que es justo lo que se compra al fijar un precio de antemano.',
      },
      {
        h2: 'Cómo y cuándo se paga',
        body: 'El precio completo se paga online con tarjeta o Bizum al reservar, y el recibo por el importe total te llega por correo junto con la confirmación. No se cobra nada en el coche, así que no tienes que buscar efectivo ni confiar en que funcione el datáfono en la acera.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Traslado Hotel Barcelona al Aeropuerto | Puerta a Puerta',
    description:
      'Reserva un taxi desde tu hotel de Barcelona al aeropuerto de El Prat, o a la puerta de tu hotel. Puerta a puerta, con licencia, a precio fijo.',
    h1: 'Traslados de hotel al aeropuerto de Barcelona',
    intro:
      'La mayoría de nuestras reservas son traslados de hotel, en ambos sentidos. Un taxi puerta a puerta elimina la parte del viaje que más se subestima: llevar las maletas desde el vestíbulo del hotel hasta una parada, o encontrar la dirección correcta después de un vuelo largo.',
    sections: [
      {
        h2: 'Taxi desde el hotel al aeropuerto de Barcelona',
        body: 'Danos el nombre del hotel y nos encargamos del resto. En las calles estrechas del Barrio Gótico y El Born, donde los coches no siempre llegan a la entrada, acordamos contigo de antemano el punto de recogida accesible más cercano en lugar de dejarlo al azar el mismo día.',
      },
      {
        h2: 'Traslado del aeropuerto de Barcelona al hotel',
        body: 'En sentido contrario, tu conductor te espera dentro de llegadas con un cartel con tu nombre y te lleva directamente a la entrada del hotel. Muy útil con niños, equipaje pesado o un aterrizaje de madrugada.',
      },
      {
        h2: 'Apartamentos y alojamientos turísticos',
        body: 'Lo mismo vale para apartamentos de alquiler temporal y direcciones de Airbnb. Añade el código de la puerta o la entrada concreta en las notas de la reserva y tu conductor lo tendrá antes de la recogida.',
      },
      {
        h2: 'Hoteles en calles a las que no llega un coche',
        body: 'Hay zonas de Barcelona a las que no se puede llegar en coche hasta la puerta. Buena parte del Barrio Gótico, las callejuelas de El Born y las calles estrechas por encima de Gràcia son peatonales o demasiado angostas para que un taxi espere, y un hotel en una de ellas implica un punto de encuentro a pocos pasos y no en recepción. Dinos el nombre del hotel al reservar y fijaremos ese punto y lo incluiremos en tu confirmación, en lugar de dejar a tu conductor dando vueltas junto a una manzana restringida mientras tú esperas dentro. En una salida desde una de estas direcciones, calcula cinco minutos más de lo que sugiere la duración del trayecto.',
      },
      {
        h2: 'Al hacer el check-out: adónde va el equipaje',
        body: 'Las salidas de hotel se concentran: la mayoría de los check-out caen entre las 10:00 y las 12:00, que es también cuando el tráfico de la ciudad es más imprevisible. Si tu vuelo es a primera hora de la tarde, reserva la recogida para el principio de esa franja y no para el final. Si ya has hecho el check-out pero tu recogida es más tarde, la mayoría de los hoteles guardan el equipaje, y conviene pedirlo en recepción la noche anterior y no por la mañana. La ayuda con las maletas al subir y bajar del maletero va incluida en el precio y nunca se cobra aparte, igual que una espera razonable mientras pagas la cuenta.',
      },
      {
        h2: 'Facturas para una estancia de trabajo',
        body: 'Con la confirmación te llega por correo un recibo por el importe completo, que es lo que suele pedir un sistema de gastos y te evita perseguir papeles en la recepción del hotel al hacer el check-out. Si necesitas una factura con IVA y los datos de tu empresa, envíanoslos por correo y la emitiremos con el número de tu reserva. Si en la estancia tienes varios traslados, pídelo y los facturamos juntos en lugar de uno a uno.',
      },
    ],
  },

  'sants-station-to-airport': {
    title: 'Taxi Estación de Sants al Aeropuerto de Barcelona',
    description:
      'Reserva un taxi desde la estación de Sants al aeropuerto de El Prat. Unos 15 minutos, precio fijo con el suplemento de estación ya incluido.',
    h1: 'Taxi de la estación de Sants al aeropuerto de Barcelona',
    intro:
      'Sants es la principal estación de tren de Barcelona y el punto de llegada de los AVE desde Madrid, Valencia y Sevilla. También es el gran nodo de transporte más cercano a El Prat: el trayecto en taxi ronda los 15 minutos fuera de hora punta.',
    sections: [
      {
        h2: 'El suplemento de la estación de Sants',
        body: 'Los trayectos que empiezan o terminan en la estación de Sants llevan un pequeño suplemento fijo establecido por el AMB. Junto con el de aeropuerto, ambos ya están dentro del precio fijo que ves antes de reservar, así que no se suman al final.',
      },
      {
        h2: 'Dónde encontrar a tu conductor en Sants',
        body: 'La parada oficial de taxis está en el lado de la plaza dels Països Catalans. Para un traslado reservado acordamos un punto de encuentro concreto al hacer la reserva, algo que en Sants merece la pena: es una estación grande con varias salidas.',
      },
      {
        h2: 'Enlaces con el AVE',
        body: 'Si enlazas desde un AVE, reserva la recogida unos 15 minutos después de la hora prevista de llegada para tener margen desde el andén hasta la calle con equipaje.',
      },
      {
        h2: 'Tren o taxi de Sants a El Prat',
        body: 'Hay un tren de Rodalies de Sants al aeropuerto y, para una persona que viaja ligera, es con diferencia la forma más barata de llegar. Pero tiene condiciones: llega directamente a la T2, de modo que para la T1 hay que tomar el autobús de enlace al final, y su frecuencia es cómoda si vas con una hora de margen e incómoda si no. El taxi se paga por coche y no por persona, te deja en la puerta de tu terminal y se lleva el equipaje. Para dos personas con maletas, o para quien enlaza desde un AVE con retraso y tiene un vuelo que coger, suele ser la mejor compra; y para un viajero con mochila y tiempo de sobra, sinceramente no lo es.',
      },
      {
        h2: 'Si tu enlace va con retraso',
        body: 'Un tren de larga distancia que llega tarde es el motivo más común por el que falla un traslado desde Sants, y es lo único que no podemos seguir como seguimos un vuelo. Si tu enlace va justo, reserva la recogida desde la hora de llegada prevista y no desde la que esperas que marque el andén, y escríbenos por WhatsApp en cuanto sepas que el tren se retrasa: una recogida se puede mover mientras el conductor aún va de camino. Sants tiene varias salidas a calles distintas, por eso el punto de encuentro de tu confirmación indica una puerta concreta y no la estación, que es un edificio con cuatro.',
      },
      {
        h2: 'En qué terminal te dejamos',
        body: 'Dinos tu compañía aérea y te dejamos en la puerta correcta de la terminal. Eso importa más desde Sants que desde un hotel, porque el tren llega a la T2 y una salida desde la T1 supone el autobús entre terminales al final: 25 minutos de puerta a puerta una vez que lo has esperado. El taxi elimina ese tramo por completo. Salidas de la T1 es una sala grande; la T2 son los bloques A, B y C a lo largo de la fachada, y el bloque equivocado es una caminata larga con maletas.',
      },
    ],
  },

  'private-transfer': {
    title: 'Taxi Privado Barcelona | Traslado desde el Aeropuerto',
    description:
      'Taxi privado en Barcelona y desde el aeropuerto de El Prat: coche con licencia solo para ti, sin compartir ni esperar, con precio fijo todo incluido.',
    h1: 'Taxi privado en Barcelona y traslado desde el aeropuerto',
    intro:
      'Todas las reservas aquí son traslados privados. El vehículo es solo tuyo: sin lanzadera compartida, sin desvíos para recoger a otros pasajeros y sin horario fijo de salida. Viajas directo desde tu punto de recogida hasta tu destino.',
    sections: [
      {
        h2: 'Por qué reservar un taxi privado desde el aeropuerto de Barcelona',
        body: 'Las lanzaderas compartidas salen más baratas por persona, pero recogen a varios grupos y los dejan en cadena, lo que puede añadir una hora a un trayecto de 30 minutos. A partir de dos viajeros la diferencia de precio se estrecha mucho, y para una familia con equipaje un taxi privado suele ser a la vez más rápido y más sencillo.',
      },
      {
        h2: 'Elegir vehículo',
        body: 'Elige un taxi estándar para hasta cuatro pasajeros, una Mercedes Vito para seis o una V-Class para siete con equipaje acorde. Cada uno tiene su propio precio fijo de traslado, visible uno al lado del otro antes de reservar, así que puedes elegir sopesando capacidad y comodidad frente a la cifra.',
      },
      {
        h2: 'Viajes de empresa y facturas',
        body: 'Para viajes de trabajo podemos asignar la V-Class premium. Te enviamos por correo el recibo del importe completo con la confirmación; si además necesitas la factura oficial del taxímetro, pídesela a tu conductor en el coche.',
      },
      {
        h2: 'Qué significa aquí «privado»',
        body: 'El coche es tuyo durante todo el viaje. No se recoge a nadie más, no se comparte con otro grupo que vaya en la misma dirección y no se espera en la terminal a que se llene un vehículo: las tres cosas que hacen más barato un traslado de aeropuerto más barato. Es un taxi de Barcelona con licencia y con un conductor asignado a tu reserva de antemano, que va de tu punto de recogida a tu destino y a ningún otro sitio. Eso merece la pena en una llegada tardía con niños y bastante menos una tarde tranquila entre semana si viajas solo, y preferimos decirlo antes que dar a entender que todo viaje lo necesita.',
      },
      {
        h2: 'Grupos demasiado grandes para un coche',
        body: 'Con más de siete pasajeros necesitas más de un vehículo, y se pueden reservar juntos en lugar de por separado. Elige varios coches en una sola reserva y se reservan como un único grupo, se pagan en un solo pago y se envían al mismo punto de recogida, hasta seis coches. Cada uno se cobra al precio publicado para su tamaño, así que un grupo de diez son dos coches a precio de lista y no un presupuesto a medida; además, todo el grupo se asigna a la vez, algo que importa más que la aritmética cuando diez personas esperan en una sala de llegadas a medianoche.',
      },
      {
        h2: 'Sillas infantiles y cualquier cosa fuera de lo normal',
        body: 'Las sillas infantiles no vienen instaladas de serie, así que, si necesitas una, indícalo en las notas de la reserva y se asigna el coche adecuado y no el más cercano. Lo mismo vale para cualquier cosa que cambie el vehículo que debe acudir: una silla de ruedas plegada, una bicicleta, esquís, un instrumento o una mascota. Con aviso ninguna de ellas es un problema, y todas lo son en la acera, y ese es todo el argumento para mencionarlas al reservar.',
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24 Horas Aeropuerto Barcelona | Traslados Nocturnos',
    description:
      'Servicio de taxi 24 horas en el aeropuerto de Barcelona. Reserva aterrizajes nocturnos y salidas de madrugada con un precio fijo, a cualquier hora.',
    h1: 'Taxi 24 horas en el aeropuerto de Barcelona',
    intro:
      'El Prat funciona las veinticuatro horas, y el servicio de taxi también. Las horas que de verdad conviene reservar son las incómodas: aterrizajes pasada la medianoche y salidas que exigen recogida antes del amanecer.',
    sections: [
      {
        h2: 'Taxi al aeropuerto de Barcelona las 24 horas',
        body: 'Una recogida de noche cuesta lo mismo que el mismo trayecto a mediodía: la hora no mueve un precio fijo. Los fines de semana y festivos sí: sábados y domingos, Navidad, Año Nuevo y el calendario catalán añaden un 7,5 %, que aparece como una línea propia antes de pagar y no se descubre después. Tres noches llevan además un suplemento regulado: Nochebuena, Nochevieja y la noche de San Juan, el 23 de junio.',
      },
      {
        h2: 'Llegadas de madrugada',
        body: 'Si tu vuelo aterriza a la 01:00, la parada de El Prat sigue operativa, pero la cobertura se reduce a medida que avanza la noche. Un coche reservado con tu número de vuelo asociado es la diferencia entre salir directamente y quedarte esperando.',
      },
      {
        h2: 'Salidas antes del amanecer',
        body: 'Las recogidas desde las 04:00 son rutina para nosotros. Reserva como muy tarde la tarde anterior y te confirmamos el conductor por correo, para que a esa hora no quede nada por organizar.',
      },
      {
        h2: 'La hora del día no cambia el precio',
        body: 'Una recogida a las 03:00 cuesta lo mismo que el mismo trayecto a las tres de la tarde. Es tan poco habitual que conviene decirlo claramente: un precio fijo no lleva tarifa nocturna, así que no hay una franja que se cruce a las 20:00 ni un recargo que aparezca al final de un viaje hecho a una hora incómoda. Los fines de semana y festivos añaden un porcentaje publicado y nada más lo mueve. Tres noches al año sí llevan un suplemento regulado adicional (Nochebuena, Nochevieja y la noche de San Juan, el 23 de junio), y en esas noches un precio reservado con el suplemento ya incluido vale más que de costumbre.',
      },
      {
        h2: 'El hueco cuando dejan de circular los autobuses',
        body: 'Entre el último Aerobús y el primer metro de la mañana, las opciones públicas se reducen a una red de autobuses nocturnos escasa y la parada de taxis pasa a ser la opción por defecto. En una noche normal, la parada de la T1 está bien supervisada y avanza rápido. Falla cuando tres vuelos con retraso aterrizan a la vez en esa franja: la cola es entonces de cuarenta personas y los taxis a las 02:00 escasean, porque los conductores no esperan en una terminal por si acaso. Es el caso en que llegar con un coche ya asignado vale claramente más de lo que cuesta, y conviene decidirlo antes de volar y no en la sala de llegadas.',
      },
      {
        h2: 'Reservar una recogida en plena noche',
        body: 'Una recogida a las 03:00 o a las 04:30 se confirma igual que cualquier otra, y confirmamos el conductor asignado la tarde anterior para que no haya incertidumbre a la hora del día en que la incertidumbre es peor. Indica un móvil que esté encendido y, si es una recogida en el aeropuerto, el número de vuelo: una llegada nocturna es la que más probablemente se retrasa, y seguirla es lo que mantiene el coche esperando.',
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: 'Taxi Barrio Gótico al Aeropuerto de Barcelona',
    description:
      'Reserva un taxi desde el Barrio Gótico al aeropuerto de Barcelona. Acordamos antes un punto de recogida accesible para un coche.',
    h1: 'Taxi del Barrio Gótico al aeropuerto de Barcelona',
    intro:
      'El Barri Gòtic es la zona de Barcelona donde reservar con antelación cambia de verdad la experiencia. Buena parte del barrio es peatonal o demasiado estrecha para un coche, así que la pregunta no es cuándo llega tu taxi, sino dónde puede llegar realmente a recogerte.',
    sections: [
      {
        h2: 'Puntos de recogida que funcionan en el Barri Gòtic',
        body: 'Acordamos un punto accesible concreto al reservar: normalmente Via Laietana, la plaza de la Catedral, el paseo de Colón o el lado de la Rambla, según tu dirección. Tu conductor espera allí y te ayuda con el equipaje desde la esquina, en lugar de dar vueltas por calles en las que no puede entrar.',
      },
      {
        h2: 'Tiempo de trayecto del Barrio Gótico a El Prat',
        body: 'Del Barrio Gótico al aeropuerto son unos 20 a 30 minutos fuera de hora punta, por la Ronda Litoral. Calcula más tiempo las mañanas entre semana y cuando hay cambio de crucero en el puerto.',
      },
      {
        h2: 'Llegar al barrio desde el aeropuerto',
        body: 'Viniendo del aeropuerto la limitación es la misma a la inversa. Danos la dirección exacta y te dejaremos lo más cerca que permitan los vehículos, indicándote el breve paseo hasta la puerta.',
      },
      {
        h2: 'Las maletas sobre los adoquines',
        body: 'El paseo desde el vehículo hasta una dirección del Barrio Gótico casi siempre es sobre adoquines, y a menudo con un tramo de escaleras al final. Es un paseo corto pero incómodo con dos maletas grandes, y es lo que más conviene planificar aquí. Cuando la dirección lo permite, fijamos el punto de encuentro en la calle más próxima donde un coche puede parar legalmente y no en el punto más cercano del mapa, porque en el Barri Gòtic no son lo mismo. La ayuda con las maletas hasta el coche y desde él va incluida; las escaleras dentro del edificio no las puede resolver ningún traslado.',
      },
      {
        h2: 'Salir del barrio para un vuelo a primera hora',
        body: 'Para una salida al amanecer el barrio está tranquilo, las calles vacías y el trayecto a El Prat es lo más rápido que puede ser: de 20 a 25 minutos, frente a los 30 a 35 que lleva a las nueve de la mañana. Lo que no es fácil a las 04:30 es encontrar un taxi. Parar uno en una calle peatonal antes del amanecer no funciona, y la parada más cercana queda a un paseo con maletas. Es el caso más claro de toda la web para reservar en lugar de improvisar, y el precio es el mismo que el del mismo trayecto al mediodía.',
      },
      {
        h2: 'Si tu calle está cerrada a los coches',
        body: 'Partes del Barri Gòtic son peatonales o están restringidas a vehículos de residentes a ciertas horas, así que un conductor no siempre puede parar en la propia dirección. Dinos la calle y la plaza más cercana a la que puedes llegar a pie con tu equipaje, y el punto de encuentro se fija en la calle más próxima donde un taxi puede esperar legalmente y queda escrito en tu confirmación. En una salida, calcula cinco minutos más para el paseo.',
      },
    ],
  },

  'neighborhoods/eixample': {
    title: 'Taxi Eixample al Aeropuerto de Barcelona | Puerta a Puerta',
    description:
      'Reserva un taxi desde el Eixample al aeropuerto de Barcelona-El Prat. Recogida sencilla puerta a puerta en la cuadrícula, a un precio fijo.',
    h1: 'Taxi del Eixample al aeropuerto de Barcelona',
    intro:
      'El Eixample es el distrito más cómodo de Barcelona para recoger un taxi. La cuadrícula de Cerdà hace que casi cualquier dirección sea accesible en coche, con espacio para parar y cargar el equipaje: justo lo contrario que el casco antiguo.',
    sections: [
      {
        h2: 'Recogida puerta a puerta en la cuadrícula del Eixample',
        body: 'Danos la calle y el número y tu conductor estará en la puerta. Los chaflanes de las manzanas del Eixample son puntos de carga cómodos y seguros si tu dirección cae en un tramo con mucho tráfico de Aragó o Balmes.',
      },
      {
        h2: 'Tiempo de trayecto del Eixample a El Prat',
        body: 'Del Eixample a El Prat suelen ser de 25 a 35 minutos. Desde la Dreta de l’Eixample y la zona de la Sagrada Família, algo más; desde las manzanas cercanas a Sants y plaza de España, algo menos.',
      },
      {
        h2: 'Hoteles del paseo de Gracia',
        body: 'El Eixample concentra buena parte de los hoteles de Barcelona, incluidos casi todos los del paseo de Gracia. Escribe el nombre del hotel en lugar de la dirección y lo localizamos.',
      },
      {
        h2: 'En qué esquina de la manzana esperar',
        body: 'La cuadrícula del Eixample hace fácil la recogida y ambiguo el punto de encuentro: una manzana tiene cuatro esquinas, cada una en una calle distinta, y un número de portal puede estar a cien metros del cruce donde espera un conductor. Indica la dirección completa al reservar y no el cruce, y tu conductor irá a la puerta. Cuando el chaflán es el único sitio donde se puede parar legalmente, como suele pasar en los cruces más transitados de Aragó, Balmes y la Gran Via, la confirmación indica cuál.',
      },
      {
        h2: 'El tráfico desde el Eixample, según la hora',
        body: 'El trayecto a El Prat desde el Eixample dura de 25 a 35 minutos casi todo el día y es notablemente peor dos veces: las mañanas entre semana de 08:00 a 09:30, cuando la Gran Via y la Ronda llevan tráfico de entrada y salida, y los viernes por la tarde desde las 17:00 más o menos. Desde la zona de la Sagrada Família suma de cinco a diez minutos; desde las manzanas cercanas a plaza de España resta más o menos lo mismo. Un precio fijo absorbe todo eso, porque la cifra no se mueve con el tráfico, pero tu hora de salida sí tiene que tenerlo en cuenta.',
      },
      {
        h2: 'Llegar al Eixample desde el aeropuerto',
        body: 'Desde El Prat el conductor toma el más rápido de los accesos principales ese día, y el precio no depende de cuál sea. Lo que cambia los últimos cientos de metros es la cuadrícula de calles de sentido único: una recogida o una bajada al otro lado de una manzana puede suponer dar la vuelta entera, de modo que indicar el número de portal y no el cruce más cercano ahorra unos minutos y un paseo corto con maletas.',
      },
      {
        h2: 'Apartamentos con puerta a la calle',
        body: 'Muchas direcciones del Eixample son apartamentos y no hoteles: una puerta a la calle con portero automático, sin recepción y a menudo sin nadie que te guarde las maletas. Indica en las notas de la reserva cómo se entra o un teléfono de contacto de tu anfitrión, y el conductor podrá llamar al llegar en lugar de esperar en la puerta.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Centro de Barcelona al Aeropuerto',
    description:
      'Reserva un taxi desde el centro de Barcelona al aeropuerto de El Prat. Recogida en cualquier dirección céntrica, precio fijo y conductor confirmado de antemano.',
    h1: 'Taxi del centro de Barcelona al aeropuerto',
    intro:
      'Desde cualquier punto céntrico —la Rambla, plaza de Cataluña, El Born, el Raval o el paseo de Gracia— El Prat queda a 20 o 35 minutos en coche. Reservar con antelación fija la hora de recogida y el vehículo, algo que importa sobre todo en el trayecto de ida.',
    sections: [
      {
        h2: 'Puntos de recogida en el centro',
        body: 'Las calles céntricas anchas permiten recogida directa en la puerta. Para direcciones dentro de zonas peatonales acordamos la esquina accesible más cercana al reservar, de modo que no haya que improvisar el mismo día.',
      },
      {
        h2: 'Tráfico y márgenes de tiempo',
        body: 'Las mañanas entre semana de 08:00 a 09:30 y las tardes a partir de las 18:00 ralentizan notablemente las rondas. Nuestra estimación incluye un tiempo de trayecto realista, pero para un vuelo temprano reserva la recogida con margen.',
      },
      {
        h2: 'Cuánto cuesta un taxi del centro al aeropuerto',
        body: 'Un precio fijo desde cualquier punto del centro hasta El Prat, con todos los suplementos oficiales ya dentro y sin nada que pagar en el taxi. La hora no lo cambia; los fines de semana y festivos añaden un 7,5 %. Introduce tu dirección para ver tu precio exacto antes de decidir.',
      },
      {
        h2: 'Qué cuenta como centro para el precio fijo',
        body: 'Todo, y bastante más. El precio de lista cubre cualquier dirección a menos de 16 km de la terminal medidos en línea recta, así que la distinción entre el Barrio Gótico, el Eixample, Gràcia, Sants, la Barceloneta y el Park Güell, a 14,3 km, no existe en lo que respecta al precio: son una sola cifra. La zona se acaba en los distritos exteriores del norte y del este: Sant Andreu, Nou Barris, La Sagrera y el Fòrum quedan a más de 16 km y suman la tarifa por kilómetro. Lo que cambia dentro del centro es el tiempo de trayecto y si un coche puede llegar a la puerta, y por eso importa la dirección aunque el precio no cambie.',
      },
      {
        h2: 'Dónde puede parar realmente un coche',
        body: 'El centro contiene los dos casos incómodos de esta web: calles totalmente peatonales y calles tan estrechas que parar en ellas las bloquea. En ambos, el punto de encuentro es la calle más próxima donde un taxi puede esperar legalmente, indicada en tu confirmación y no dejada para averiguarla el mismo día. En una llegada eso significa un conductor en un lugar conocido con un cartel; en una salida, un paseo corto con las maletas y cinco minutos más de lo que sugiere el trayecto por sí solo.',
      },
      {
        h2: 'Llegar al centro a última hora de la noche',
        body: 'Pasadas las 23:30 el centro es la parte de la ciudad más fácil de recorrer en coche y más difícil de cruzar a pie con equipaje: el metro está cerrando, las calles alrededor de la Rambla están concurridas de un modo que frena a un coche y los últimos cien metros sobre adoquines se hacen a oscuras. Un coche reservado termina en el punto más cercano a tu puerta y no en una parada, y el conductor tiene la dirección antes de que aterrices. El precio es la misma cifra que el del mismo trayecto al mediodía.',
      },
    ],
  },

  'group-taxi': {
    title: 'Taxi 5, 6 o 7 Plazas Aeropuerto Barcelona | Grupos',
    description:
      'Taxi para grupos desde el aeropuerto de Barcelona: furgoneta de seis o siete plazas, o varios coches en una sola reserva. Precio fijo todo incluido.',
    h1: 'Taxi para grupos del aeropuerto de Barcelona',
    intro:
      'Un taxi estándar de Barcelona tiene cuatro plazas. Para cinco, seis o siete personas hay una Mercedes Vito de seis plazas y una Mercedes V-Class de siete, y para un grupo mayor se reservan dos o más coches juntos. En Barcelona no existe un taxi único de nueve plazas, y preferimos decírtelo antes de que lo descubras en la acera.',
    sections: [
      {
        h2: 'Cuántas personas y cuántas maletas caben',
        body: 'El límite real es el maletero, no los asientos. Un taxi estándar de cuatro plazas lleva a cuatro pasajeros y unas tres maletas grandes; algunos modelos admiten cuatro. La Mercedes Vito de seis plazas lleva seis pasajeros y seis maletas, y la Mercedes V-Class de siete plazas lleva siete pasajeros y siete maletas. Si viajas con algo de gran tamaño, como esquís, una bicicleta, un carrito o un instrumento, anótalo en las notas de la reserva para que se asigne el vehículo adecuado y no el más cercano.',
      },
      {
        h2: 'Cinco, seis o siete personas: un solo vehículo',
        body: 'Hasta siete personas viajan juntas en un solo vehículo, a un precio fijo todo incluido. El taxi de cuatro plazas cuesta 50 € entre el aeropuerto y cualquier punto de Barcelona, la Vito de seis plazas cuesta 70 € y la V-Class de siete plazas cuesta 75 €. Los fines de semana y festivos añaden un 7,5 %. Ese es el precio completo: el suplemento de aeropuerto, el del vehículo mayor y nuestro servicio ya están dentro, y no se debe nada al conductor.',
      },
      {
        h2: 'Ocho, nueve o diez personas: reserva dos coches juntos',
        body: 'Por encima de siete no hay un taxi único, así que la respuesta son dos o más vehículos que viajan como un solo grupo. Elige varios coches en una sola reserva y se reservan juntos, se pagan en un solo pago y se envían al mismo punto de recogida, hasta seis coches. Cada uno se cobra al precio publicado para su tamaño, de modo que no hay presupuesto a medida ni sorpresas: ocho personas pueden viajar en dos taxis de cuatro plazas por 100 € entre semana, nueve en una Vito de seis plazas y un taxi de cuatro por 120 € (70 € más 50 €), y once en una V-Class de siete plazas y un taxi de cuatro por 125 €.',
      },
      {
        h2: 'Un solo pago, un punto de recogida, todos los coches juntos',
        body: 'Los coches de una reserva de grupo se asignan a la vez y recibes por correo el nombre y el número de cada conductor. Esperan en la sala de llegadas de tu terminal con un cartel con tu nombre y siguen el mismo número de vuelo, así que un aterrizaje con retraso desplaza a todo el grupo en lugar de dividirlo. Esa es la diferencia práctica con hacer cola en la parada con ocho personas y esperar a que vayan apareciendo los taxis de uno en uno o de dos en dos.',
      },
      {
        h2: 'Grupos de crucero, familias y bodas',
        body: 'La misma lógica vale para la terminal de cruceros del Moll Adossat, donde los precios fijos son 60 €, 80 € y 85 € para los vehículos de cuatro, seis y siete plazas, y para una familia con abuelos y un montón de equipaje. Para un grupo de boda o una delegación de un congreso, dinos las horas de llegada y el número de maletas al reservar y te diremos con franqueza si bastan dos coches o si tres es lo más seguro.',
      },
    ],
  },

  'book-online': {
    title: 'Reservar Taxi Aeropuerto Barcelona | Online',
    description:
      'Reserva un taxi al aeropuerto de Barcelona online en minutos. Precio fijo todo incluido al instante, pago seguro y confirmación inmediata por correo.',
    h1: 'Reservar un taxi al aeropuerto de Barcelona online',
    intro:
      'Reservar online lleva un par de minutos y te deja un coche confirmado con conductor asignado. Pagas un único precio con todo incluido y no debes nada en el taxi.',
    sections: [
      {
        h2: 'Qué necesitas para reservar un taxi al aeropuerto de Barcelona',
        body: 'Tu dirección de recogida, el destino, la fecha y la hora, y un teléfono de contacto. Para recogidas en el aeropuerto añade el número de vuelo para que tu conductor pueda seguir el aterrizaje. Las reservas requieren un mínimo de tres horas de antelación; para algo antes, escríbenos por WhatsApp.',
      },
      {
        h2: 'Qué pasa después de reservar',
        body: 'Recibes un correo de confirmación inmediato con tu ruta, el vehículo, el precio que has pagado y el recibo. Después se asigna un conductor y te enviamos sus datos antes del viaje.',
      },
      {
        h2: 'Cambios y cancelaciones',
        body: 'Los planes cambian. Cancela con al menos 24 horas de antelación y te devolvemos el importe íntegro. Para mover una reserva, responde al correo de confirmación y la reprogramamos.',
      },
      {
        h2: 'Qué conviene tener a mano',
        body: 'Una dirección completa y no solo un barrio, el número de pasajeros y cuántas maletas llevas de verdad, lo último importa más de lo que la gente espera, porque un coche de cuatro plazas admite cuatro pasajeros pero solo unas tres maletas. Si llegas en avión, tu número de vuelo: es opcional, pero con él seguimos el aterrizaje real y movemos la recogida automáticamente, de modo que un retraso no te cuesta nada y no tienes que adivinar con semanas de antelación una hora segura. Completa el conjunto un móvil localizable ese día, porque es como te encuentra tu conductor si la sala de llegadas os desorienta a los dos.',
      },
      {
        h2: 'Por qué el formulario pide tres horas de antelación',
        body: 'Las reservas online necesitan al menos tres horas antes de la recogida, y el motivo es un conductor y no un sistema: asignar de forma fiable un coche y una persona concretos a una hora concreta lleva más tiempo que asignarlos en abstracto. Con menos de tres horas, lo honesto es escribirnos por WhatsApp, donde podemos comprobar qué hay disponible de verdad y confirmarte un coche directamente, o decirte enseguida que no lo hay. Es una experiencia peor que la del formulario y mejor que una confirmación que no podemos cumplir.',
      },
      {
        h2: 'Cómo se paga y qué recibes',
        body: 'El importe completo se paga online al reservar, con tarjeta de crédito, de débito o Bizum. No hay un pago dividido entre depósito y resto y no se debe nada al conductor en el coche: ni tarifa, ni suplemento, ni se espera propina. Con la confirmación te llega por correo un recibo por el importe completo, de modo que el papeleo para un informe de gastos llega antes del viaje y no después. Si además necesitas la factura regulada del taxi por el propio trayecto, tu conductor puede emitirla si se la pides.',
      },
    ],
  },
};
