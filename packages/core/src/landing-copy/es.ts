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
      'Reserva un taxi del aeropuerto de Barcelona al centro. Tarifa oficial del taxímetro AMB, suplemento de El Prat incluido en la estimación y conductor esperando en llegadas.',
    h1: 'Taxi del aeropuerto de Barcelona al centro',
    intro:
      'Un taxi desde El Prat hasta el centro de Barcelona tarda entre 25 y 35 minutos según el tráfico y la terminal en la que aterrices. Reservar con antelación significa que ya hay un conductor asignado cuando llegas, con un cartel con tu nombre en la sala de llegadas, en lugar de hacer cola en la parada de T1 o T2.',
    sections: [
      {
        h2: 'Cuánto cuesta un traslado del aeropuerto de Barcelona',
        body: 'La tarifa la marca el taxímetro oficial del AMB. Desde El Prat pagas el importe del taxímetro más el suplemento fijo de aeropuerto, y existe una tarifa mínima para trayectos muy cortos con origen en el aeropuerto. En la práctica, un trayecto del aeropuerto al centro de Barcelona suele situarse entre treinta y tantos y cuarenta y pocos euros, más caro de noche y los fines de semana cuando se aplica la tarifa T-2. Introduce tu destino exacto arriba para ver una estimación precisa.',
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
      'Reserva un taxi desde Barcelona ciudad al aeropuerto de El Prat. Hora de recogida fija, tarifa oficial del taxímetro y conductores que conocen las puertas de cada terminal.',
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
        body: 'La primera oleada de salidas de El Prat despega antes de las 07:00, lo que implica recogidas desde las 04:30. Esos trayectos se facturan con la tarifa nocturna T-2, y confirmamos el conductor la tarde anterior para que no quede nada por resolver a las cuatro de la mañana.',
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aeropuerto El Prat | Traslados con Licencia',
    description:
      'Taxis con licencia hacia y desde el aeropuerto de Barcelona-El Prat (BCN). Reserva online con estimación según la tarifa oficial AMB y conductor asignado a tu vuelo.',
    h1: 'Taxi aeropuerto de El Prat',
    intro:
      'El aeropuerto Josep Tarradellas Barcelona-El Prat, que casi todo el mundo sigue llamando simplemente El Prat, está a unos 15 km al suroeste de la ciudad. Es el segundo aeropuerto más transitado de España y el taxi es la forma más rápida de llegar a Barcelona a casi cualquier hora, siempre que haya un coche esperando.',
    sections: [
      {
        h2: 'Reservar un taxi al aeropuerto de Barcelona o ir a la parada',
        body: 'La parada oficial de El Prat está bien organizada y suele avanzar rápido. Se colapsa en momentos previsibles: las oleadas de llegadas de media mañana, los domingos por la tarde y cuando aterrizan varios vuelos de largo radio a la vez. Reservar con antelación elimina ese riesgo por completo y fija tu conductor de antemano, con la misma tarifa de taxímetro.',
      },
      {
        h2: 'El suplemento de aeropuerto de El Prat',
        body: 'Todo trayecto en taxi que empiece o termine en El Prat lleva un suplemento fijo de aeropuerto establecido por el AMB, y los trayectos que salen del aeropuerto tienen una tarifa mínima. Ambos están incluidos en la estimación que ves antes de reservar, así que el taxímetro no da sorpresas.',
      },
      {
        h2: 'Pasajeros de crucero',
        body: 'Para quien enlaza con un crucero, el trayecto entre El Prat y la terminal de cruceros del Moll Adossat tiene su propio precio cerrado fijado por el AMB, en lugar de funcionar con taxímetro. Introduce la terminal de cruceros como destino y la estimación cambia automáticamente a ese precio fijo.',
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Precio Taxi Aeropuerto Barcelona | Tarifas AMB 2026',
    description:
      'Lo que cuesta realmente un taxi al aeropuerto de Barcelona: la tabla oficial de tarifas AMB, el suplemento de El Prat, la tarifa mínima de aeropuerto y cómo se calcula tu precio con todo incluido.',
    h1: 'Precio del taxi al aeropuerto de Barcelona',
    intro:
      'Los precios del taxi en Barcelona están regulados. Ningún taxi con licencia puede cobrar más ni menos que el taxímetro oficial del AMB, lo que significa que la respuesta honesta a "cuánto cuesta" es un cálculo, no una cifra comercial. Así funciona exactamente ese cálculo.',
    sections: [
      {
        h2: 'Cómo se calcula la tarifa de tu taxi al aeropuerto',
        body: 'Cada trayecto empieza con una bajada de bandera fija y después suma un precio por kilómetro. Qué precio se aplica depende de cuándo viajes: la T-1 es la tarifa diurna de lunes a viernes entre las 08:00 y las 20:00, y la T-2 es la tarifa más alta que cubre noches, todo el sábado y el domingo, y los festivos. Los suplementos por aeropuerto, puerto de cruceros, estación de Sants y Fira Gran Via se añaden encima, con un máximo por servicio.',
      },
      {
        h2: '¿Existe un taxi barato desde el aeropuerto de Barcelona?',
        body: 'No en el sentido de que un operador pueda rebajar a otro: el taxímetro del AMB es idéntico en todos los taxis con licencia, así que legalmente nadie puede ser más barato en la tarifa. Lo que sí puedes controlar es el horario y el vehículo. Viajar dentro de la franja diurna T-1 cuesta bastante menos por kilómetro que de noche o en fin de semana, y para un grupo de cuatro un solo coche sale mejor que cuatro billetes sueltos. Desconfía de quien anuncie tarifas muy por debajo del taxímetro; suele indicar un vehículo sin licencia.',
      },
      {
        h2: 'La tarifa mínima de aeropuerto',
        body: 'Los trayectos que empiezan en El Prat tienen una tarifa mínima. Si el importe del taxímetro para un trayecto corto queda por debajo de ese mínimo, pagas el mínimo. Esto afecta sobre todo a los viajes a El Prat pueblo o a hoteles cercanos, no a los trayectos hacia Barcelona.',
      },
      {
        h2: 'Qué incluye tu precio',
        body: 'Pagas un único precio con todo incluido al reservar online. Cubre el trayecto según la tarifa oficial del AMB, todos los suplementos oficiales que correspondan a tu ruta y nuestro servicio de reservar y garantizar el coche. No hay un segundo importe: en el taxi no se paga nada.',
      },
    ],
  },

  'hotel-transfers': {
    title: 'Traslado Hotel Barcelona al Aeropuerto | Puerta a Puerta',
    description:
      'Reserva un taxi desde tu hotel de Barcelona al aeropuerto de El Prat, o del aeropuerto a la puerta de tu hotel. Puerta a puerta, con licencia y tarifa oficial de taxímetro.',
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
      'Reserva un taxi desde la estación de Sants al aeropuerto de El Prat. Unos 15 minutos, tarifa oficial de taxímetro con el suplemento de estación incluido.',
    h1: 'Taxi de la estación de Sants al aeropuerto de Barcelona',
    intro:
      'Sants es la principal estación de tren de Barcelona y el punto de llegada de los AVE desde Madrid, Valencia y Sevilla. También es el gran nodo de transporte más cercano a El Prat: el trayecto en taxi ronda los 15 minutos fuera de hora punta.',
    sections: [
      {
        h2: 'El suplemento de la estación de Sants',
        body: 'Los trayectos que empiezan o terminan en la estación de Sants llevan un pequeño suplemento fijo establecido por el AMB, además de la tarifa del taxímetro. Junto con el suplemento de aeropuerto, ambos van incluidos en la estimación que ves antes de reservar, y el total de suplementos tiene un máximo por servicio.',
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
      'Un traslado privado desde el aeropuerto de Barcelona: taxi con licencia solo para ti, sin compartir ni esperar a otros pasajeros, con tarifa oficial del AMB.',
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
        body: 'Elige un taxi estándar para hasta cuatro pasajeros, una Mercedes Vito para seis o una V-Class para siete con equipaje acorde. La tarifa del taxímetro no cambia con el tamaño del vehículo, porque la fija el AMB, así que elige por capacidad y comodidad.',
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
        body: 'Entre las 20:00 y las 08:00, todo el fin de semana y en festivos se aplica la tarifa más alta T-2. La fija el AMB y rige por igual para todos los taxis con licencia de Barcelona: no es un recargo que añadamos nosotros. Tu estimación usa automáticamente la tarifa correcta según la hora real de recogida. Las noches de Nochebuena y Nochevieja llevan además un suplemento oficial.',
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
      'Reserva un taxi desde el Barrio Gótico al aeropuerto de Barcelona. Acordamos un punto de recogida accesible de antemano, porque la mayoría de calles del Barri Gòtic son demasiado estrechas.',
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
      'Reserva un taxi desde el Eixample al aeropuerto de Barcelona-El Prat. Recogida sencilla puerta a puerta en la cuadrícula, con tarifa oficial del AMB.',
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
      'Reserva un taxi desde el centro de Barcelona al aeropuerto de El Prat. Recogida en cualquier dirección céntrica, tarifa oficial de taxímetro y conductor confirmado de antemano.',
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
        body: 'La tarifa del taxímetro desde el centro hasta El Prat, más el suplemento fijo de aeropuerto. Las noches y los fines de semana se aplica la tarifa más alta T-2. Introduce tu dirección para una estimación exacta antes de decidir.',
      },
    ],
  },

  'book-online': {
    title: 'Reservar Taxi Aeropuerto Barcelona Online | Precio al Instante',
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
