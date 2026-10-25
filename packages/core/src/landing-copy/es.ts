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
        body: 'El precio lo fijamos nosotros: no es una lectura del taxímetro ni una estimación. Todos los suplementos oficiales que correspondan a la ruta ya están dentro de la cifra. En la práctica, un trayecto del aeropuerto a cualquier punto de Barcelona son 50 EUR fijos en taxi estándar, sea cual sea la distancia y la hora; los fines de semana y festivos añaden un 7,5 %. Introduce tu destino exacto arriba para ver tu precio.',
      },
      {
        h2: 'Dónde te espera el conductor en llegadas',
        body: 'Tu conductor espera dentro de la sala de llegadas de tu terminal con un cartel con tu nombre y sigue el número de vuelo, de modo que un retraso no te deja sin coche. El punto de encuentro exacto para T1 y T2 va incluido en el correo de confirmación.',
      },
      {
        h2: 'Terminal 1 y Terminal 2',
        body: 'Ambas terminales tienen parada oficial de taxis y nuestros conductores atienden las dos. La T1 concentra los vuelos de largo radio y buena parte de Vueling; la T2 sirve a muchas compañías de bajo coste. La diferencia de precio entre ellas es pequeña, un par de kilómetros, aunque la T1 queda algo más lejos de la ciudad.',
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
        body: 'La parada oficial de El Prat está bien organizada y suele avanzar rápido. Se colapsa en momentos previsibles: las oleadas de llegadas de media mañana, los domingos por la tarde y cuando aterrizan varios vuelos de largo radio a la vez. Reservar con antelación elimina ese riesgo por completo y fija tu conductor de antemano, al mismo precio.',
      },
      {
        h2: 'El suplemento de aeropuerto de El Prat',
        body: 'El suplemento oficial de aeropuerto y cualquier otro cargo que corresponda a la ruta están dentro del precio fijo que te damos. No hay taxímetro en marcha ni una segunda cifra al final, así que no hay sorpresas.',
      },
      {
        h2: 'Pasajeros de crucero',
        body: 'Para quien enlaza con un crucero, el trayecto entre El Prat y la terminal de cruceros del Moll Adossat tiene su propio precio fijo, listado aparte del precio de ciudad. Introduce la terminal de cruceros como destino y el precio cambia automáticamente a ese.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Precio Taxi Aeropuerto Barcelona | Tarifas AMB 2026',
    description:
      'Lo que cuesta de verdad un taxi al aeropuerto de Barcelona: nuestros precios fijos por vehículo y qué añade la tarifa de fin de semana.',
    h1: 'Precio del taxi al aeropuerto de Barcelona',
    intro:
      'Un traslado con nosotros es un precio fijo, acordado antes de reservar y bloqueado al reservar. Sin taxímetro, sin cálculos de distancia y sin nada que pagar en el coche. Esta es la lista completa y las tres cosas que pueden añadirse.',
    sections: [
      {
        h2: 'Cómo se calcula la tarifa de tu taxi al aeropuerto',
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
        body: 'Pagas un único precio con todo incluido al reservar online. Cubre el trayecto, todos los suplementos oficiales que correspondan a tu ruta y nuestro servicio de reservar y garantizar el coche. No hay un segundo importe: en el taxi no se paga nada.',
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
        body: 'Los trayectos que empiezan o terminan en la estación de Sants llevan un pequeño suplemento oficial de estación. Junto con el de aeropuerto, ambos ya están dentro del precio fijo que ves antes de reservar, así que no se suman al final.',
      },
      {
        h2: 'Dónde encontrar a tu conductor en Sants',
        body: 'La parada oficial de taxis está en el lado de la plaza dels Països Catalans. Para un traslado reservado acordamos un punto de encuentro concreto al hacer la reserva, algo que en Sants merece la pena: es una estación grande con varias salidas.',
      },
      {
        h2: 'Enlaces con el AVE',
        body: 'Si enlazas desde un AVE, reserva la recogida unos 15 minutos después de la hora prevista de llegada para tener margen desde el andén hasta la calle con equipaje.',
      },
    ],
  },

  'private-transfer': {
    title: 'Traslado Privado Aeropuerto Barcelona | Taxi Exclusivo',
    description:
      'Un traslado privado desde el aeropuerto de Barcelona: taxi con licencia solo para ti, sin compartir ni esperar, a un precio fijo.',
    h1: 'Traslado privado del aeropuerto de Barcelona',
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
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24 Horas Aeropuerto Barcelona | Traslados Nocturnos',
    description:
      'Servicio de taxi 24 horas en el aeropuerto de Barcelona. Reserva aterrizajes nocturnos y salidas de madrugada con la tarifa nocturna oficial del AMB.',
    h1: 'Taxi 24 horas en el aeropuerto de Barcelona',
    intro:
      'El Prat funciona las veinticuatro horas, y el servicio de taxi también. Las horas que de verdad conviene reservar son las incómodas: aterrizajes pasada la medianoche y salidas que exigen recogida antes del amanecer.',
    sections: [
      {
        h2: 'Taxi al aeropuerto de Barcelona las 24 horas',
        body: 'Una recogida de noche cuesta lo mismo que el mismo trayecto a mediodía: la hora no mueve un precio fijo. Los fines de semana y festivos sí: sábados y domingos, Navidad, Nochevieja y el calendario catalán añaden un 7,5 %, que aparece como una línea propia antes de pagar y no se descubre después. Las noches de Nochebuena y Nochevieja llevan además un suplemento oficial.',
      },
      {
        h2: 'Llegadas de madrugada',
        body: 'Si tu vuelo aterriza a la 01:00, la parada de El Prat sigue operativa, pero la cobertura se reduce a medida que avanza la noche. Un coche reservado con tu número de vuelo asociado es la diferencia entre salir directamente y quedarte esperando.',
      },
      {
        h2: 'Salidas antes del amanecer',
        body: 'Las recogidas desde las 04:00 son rutina para nosotros. Reserva como muy tarde la tarde anterior y te confirmamos el conductor por correo, para que a esa hora no quede nada por organizar.',
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
        body: 'Acordamos un punto accesible concreto al reservar: normalmente Via Laietana, la plaza de la Catedral, el Passeig de Colom o el lado de la Rambla, según tu dirección. Tu conductor espera allí y te ayuda con el equipaje desde la esquina, en lugar de dar vueltas por calles en las que no puede entrar.',
      },
      {
        h2: 'Tiempo de trayecto del Barrio Gótico a El Prat',
        body: 'Del Barrio Gótico al aeropuerto son unos 20 a 30 minutos fuera de hora punta, por la Ronda Litoral. Calcula más tiempo las mañanas entre semana y cuando hay cambio de crucero en el puerto.',
      },
      {
        h2: 'Llegar al barrio desde el aeropuerto',
        body: 'Viniendo del aeropuerto la limitación es la misma a la inversa. Danos la dirección exacta y te dejaremos lo más cerca que permitan los vehículos, indicándote el breve paseo hasta la puerta.',
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
        body: 'Del Eixample a El Prat suelen ser de 25 a 35 minutos. Desde la Dreta de l\'Eixample y la zona de la Sagrada Família, algo más; desde las manzanas cercanas a Sants y plaza de España, algo menos.',
      },
      {
        h2: 'Hoteles del distrito',
        body: 'El Eixample concentra buena parte de los hoteles de Barcelona, incluidos casi todos los del Passeig de Gràcia. Escribe el nombre del hotel en lugar de la dirección y lo localizamos.',
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: 'Taxi Centro de Barcelona al Aeropuerto',
    description:
      'Reserva un taxi desde el centro de Barcelona al aeropuerto de El Prat. Recogida en cualquier dirección céntrica, precio fijo y conductor confirmado de antemano.',
    h1: 'Taxi del centro de Barcelona al aeropuerto',
    intro:
      'Desde cualquier punto céntrico —la Rambla, plaza de Catalunya, El Born, el Raval o el Passeig de Gràcia— El Prat queda a 20 o 35 minutos en coche. Reservar con antelación fija la hora de recogida y el vehículo, algo que importa sobre todo en el trayecto de ida.',
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
        h2: 'Cuánto cuesta del centro al aeropuerto',
        body: 'Un precio fijo desde cualquier punto del centro hasta El Prat, con todos los suplementos oficiales ya dentro y sin nada que pagar en el taxi. La hora no lo cambia; los fines de semana y festivos añaden un 7,5 %. Introduce tu dirección para una estimación exacta antes de decidir.',
      },
    ],
  },

  'book-online': {
    title: 'Reservar Taxi Aeropuerto Barcelona | Online',
    description:
      'Reserva un taxi al aeropuerto de Barcelona online en minutos. Estimación inmediata con tarifas oficiales AMB, pago seguro y confirmación instantánea por correo.',
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
        body: 'Recibes un correo de confirmación inmediato con tu ruta, el vehículo, la estimación de tarifa y el recibo de lo pagado online. Después se asigna un conductor y te enviamos sus datos antes del viaje.',
      },
      {
        h2: 'Cambios y cancelaciones',
        body: 'Los planes cambian. Cancela con al menos 24 horas de antelación y te devolvemos el importe íntegro. Para mover una reserva, responde al correo de confirmación y la reprogramamos.',
      },
    ],
  },
};
