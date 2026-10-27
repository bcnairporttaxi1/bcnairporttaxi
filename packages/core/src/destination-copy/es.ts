import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "es" locale. Filled in per destination slug and
 * group slug; anything missing falls back to the English original, which the
 * parity test in destination-copy.test.ts forbids for every page that has one.
 */
export const ES_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: 'la Costa Brava',
      route: 'Barcelona a la Costa Brava',
      blurb:
        'Traslados puerta a puerta desde El Prat hasta los pueblos de la Costa Brava, con sitio para el equipaje de toda la familia.',
      body: [
        'La Costa Brava empieza más o menos a una hora al norte de Barcelona y llega hasta la frontera francesa, y casi todos los visitantes llegan por El Prat. La carretera de la costa es sencilla, pero es un viaje de verdad y no un salto por la ciudad: calcula unos 80 minutos hasta Lloret de Mar y cerca de dos horas para las calas del norte.',
        'Un traslado privado importa más aquí que en un trayecto urbano. A la mayoría de los pueblos no llega un tren directo, los autocares solo paran en los más grandes y el último tramo hasta un hotel en la colina o una villa a las afueras casi nunca se hace a pie con maletas. Tu conductor te lleva hasta la puerta.',
        'Te recogemos en llegadas con un cartel con tu nombre y seguimos tu vuelo, así que un aterrizaje con retraso no te deja sin coche. Para grupos, la Mercedes Vito o la V-Class llevan a seis o siete pasajeros con su equipaje, lo que suele salir más barato que dos coches por separado y es bastante más cómodo.',
        'Como la Costa Brava queda fuera del área metropolitana de Barcelona, te damos un precio cerrado para la ruta antes de que te comprometas, confirmado por escrito, de modo que al llegar no hay nada que pagar aparte de lo acordado.',
      ],
    },
    girona: {
      place: 'Girona',
      route: 'Barcelona a Girona',
      blurb:
        'Centro, aeropuerto de Girona o casco antiguo: un trayecto directo hacia el norte, sin transbordos.',
      body: [
        'Girona está a unos 100 km al norte de Barcelona y se tarda algo más de una hora por carretera. Es un traslado habitual por tres motivos muy distintos: la propia ciudad, el aeropuerto que lleva su nombre y las escaleras de la catedral, que atraen a un flujo constante de visitantes.',
        'El tren es rápido entre los dos centros urbanos, pero no te sirve si sales de El Prat con maletas, si llegas tarde o si vas a un sitio que no es la estación. Un coche privado te ahorra los transbordos en ambos extremos.',
        'El aeropuerto de Girona está 15 minutos más allá de la ciudad y recibe buena parte de los vuelos chárter de la Costa Brava. Si enlazas entre El Prat y el aeropuerto de Girona, dinos los dos números de vuelo y dejaremos un margen razonable.',
        'Esta ruta queda fuera del área metropolitana, así que te confirmamos un precio cerrado de antemano. Hay vehículos desde el taxi estándar de cuatro plazas hasta la V-Class de siete plazas para familias y grupos.',
      ],
    },
    'lloret-de-mar': {
      place: 'Lloret de Mar',
      route: 'Barcelona a Lloret de Mar',
      blurb: 'El destino más concurrido de la Costa Brava, a unos 70 minutos de El Prat.',
      body: [
        'Lloret de Mar es el destino turístico más conocido de la Costa Brava y uno de nuestros trayectos largos más frecuentes. El viaje dura unos 70 minutos desde El Prat fuera de los periodos de más tráfico.',
        'En temporada hay autocares a Lloret, pero siguen un horario y paran en un punto céntrico, lo que es incómodo si tu hotel está en una de las colinas sobre la bahía. Un traslado privado termina en la entrada.',
        'Si llegáis juntos varias personas, una furgoneta de seis o siete plazas suele salir mejor que varios coches y mantiene a todo el grupo con el mismo horario.',
        'La ruta queda fuera del área metropolitana, así que el precio es cerrado y se acuerda de antemano.',
      ],
    },
    'tossa-de-mar': {
      place: 'Tossa de Mar',
      route: 'Barcelona a Tossa de Mar',
      blurb: 'Casco antiguo amurallado y playas más tranquilas, a unos 80 minutos.',
      body: [
        'Tossa de Mar es la vecina tranquila de Lloret, conocida por su casco antiguo amurallado sobre la playa. Está a unos 80 minutos del aeropuerto de Barcelona.',
        'El último tramo por la carretera de la costa es pintoresco pero lento, y en transporte público hay que hacer al menos un transbordo. A la mayoría de los viajeros les compensa un coche directo después del vuelo.',
        'El casco antiguo es en gran parte peatonal, así que acordamos contigo al reservar el punto de bajada más cercano al que se puede llegar, en lugar de improvisar a la llegada.',
        'El precio de esta ruta es cerrado y se confirma antes del viaje, porque queda fuera del área metropolitana.',
      ],
    },
    blanes: {
      place: 'Blanes',
      route: 'Barcelona a Blanes',
      blurb: 'La puerta sur de la Costa Brava, a más o menos una hora.',
      body: [
        'Blanes marca el extremo sur de la Costa Brava y es el más cercano a Barcelona de los destinos principales, a más o menos una hora por carretera.',
        'Tiene estación de tren, lo que lo convierte en uno de los pueblos más accesibles de la Costa Brava, pero desde el aeropuerto el trayecto sigue exigiendo transbordos y un paseo al final.',
        'Te recogemos en llegadas o en cualquier dirección de Barcelona y vamos directos, algo que viene bien a las familias y a quien viaja con equipo de playa.',
        'Como en el resto de la costa, el precio es cerrado y se te da de antemano.',
      ],
    },
    cadaques: {
      place: 'Cadaqués',
      route: 'Barcelona a Cadaqués',
      blurb: 'El extremo norte, pasado el cabo de Creus: unas dos horas y media.',
      body: [
        'Cadaqués es el más remoto de los pueblos de la Costa Brava, al que se llega por el cabo de Creus en una carretera de montaña con muchas curvas. Calcula unas dos horas y media desde Barcelona.',
        'No hay tren y el autobús es escaso y lento. Para la mayoría de los viajeros, un traslado privado es la única forma práctica de llegar a una hora razonable.',
        'La carretera del puerto es estrecha y conviene que la conduzca alguien que la conozca, sobre todo de noche. Nuestros conductores hacen esta ruta con regularidad.',
        'Por la distancia, este es siempre un viaje a precio cerrado y acordado de antemano. Escríbenos por WhatsApp para pedir presupuesto con tus fechas.',
      ],
    },
    roses: {
      place: 'Roses',
      route: 'Barcelona a Roses',
      blurb: 'Localidad turística del golfo de Roses, en el extremo norte de la Costa Brava.',
    },
    empuriabrava: {
      place: 'Empuriabrava',
      route: 'Barcelona a Empuriabrava',
      blurb: 'El pueblo de canales del golfo de Roses.',
    },
    begur: {
      place: 'Begur',
      route: 'Barcelona a Begur',
      blurb: 'Pueblo en lo alto y las calas que tiene a sus pies.',
    },
    'calella-de-palafrugell': {
      place: 'Calella de Palafrugell',
      route: 'Barcelona a Calella de Palafrugell',
      blurb: 'Pueblo de pescadores encalado en el centro de la Costa Brava.',
    },
    sitges: {
      place: 'Sitges',
      route: 'Barcelona a Sitges',
      blurb: 'El pueblo de costa más cercano a Barcelona, a unos 25 minutos de El Prat.',
      body: [
        'Sitges es el más corto de nuestros trayectos largos y el que más se reserva. Desde El Prat son unos 25 minutos; desde el centro de Barcelona, cerca de 40.',
        'El pueblo es un clásico para fines de semana de playa, para asistentes a congresos que se alojan fuera de la ciudad y para el calendario de festivales. Tiene buen tren desde Barcelona Sants, pero no desde el aeropuerto, y por eso la mayoría prefiere un coche directo.',
        'El casco antiguo tiene calles estrechas de sentido único y acceso restringido en algunas zonas. Acordamos al reservar un punto de bajada práctico para que no haya que resolver nada en la puerta.',
        'Sitges queda justo fuera del área metropolitana, así que el trayecto se te da a precio cerrado. Pregúntanos por WhatsApp y te lo confirmamos antes de viajar.',
      ],
    },
    tarragona: {
      place: 'Tarragona',
      route: 'Barcelona a Tarragona',
      blurb: 'Ciudad romana y puerto de cruceros, a unos 75 minutos al sur.',
      body: [
        'Tarragona está a unos 100 km al sur de Barcelona, a unos 75 minutos por autopista. Atrae visitantes por su anfiteatro romano y su casco antiguo, y cada vez más como puerto de cruceros por derecho propio.',
        'Los traslados de crucero son la versión más sensible al tiempo de este viaje. Si vas a embarcar, dejamos un margen y confirmamos la terminal, porque un barco perdido no tiene arreglo.',
        'La ciudad es también la puerta de las playas de la Costa Dorada, y muchos viajeros combinan las dos cosas: podemos dejarte en un hotel de la costa de camino.',
        'Esta ruta queda fuera del área metropolitana, así que te damos un precio cerrado de antemano.',
      ],
    },
    salou: {
      place: 'Salou',
      route: 'Barcelona a Salou',
      blurb: 'Destino de la Costa Dorada junto a PortAventura.',
    },
    portaventura: {
      place: 'PortAventura',
      route: 'Barcelona a PortAventura',
      blurb: 'Traslado directo hasta la entrada del parque temático.',
    },
    cambrils: {
      place: 'Cambrils',
      route: 'Barcelona a Cambrils',
      blurb: 'Pueblo más tranquilo de la Costa Dorada, al sur de Salou.',
    },
    peniscola: {
      place: 'Peñíscola',
      route: 'Barcelona a Peñíscola',
      blurb: 'Pueblo con castillo en la Costa del Azahar.',
    },
    reus: {
      place: 'Reus',
      route: 'Barcelona a Reus',
      blurb: 'Aeropuerto y ciudad de Reus, tierra adentro desde Salou.',
    },
    montserrat: {
      place: 'Montserrat',
      route: 'Barcelona a Montserrat',
      blurb: 'El monasterio de la montaña, a una hora de la ciudad.',
      body: [
        'Montserrat es la excursión de un día más popular desde Barcelona: un monasterio benedictino en un macizo de roca aserrada, a una hora tierra adentro.',
        'Llegar en transporte público supone un tren y después un cremallera o un teleférico, cada uno con su cola. Un coche va directo al aparcamiento del monasterio, lo que importa si quieres estar allí antes de que lleguen los autocares.',
        'La mayoría reserva ida y vuelta con tiempo de espera, normalmente de tres a cuatro horas en el monasterio, para que el mismo conductor los lleve de regreso. Dinos cuánto tiempo quieres y lo presupuestamos como un solo viaje.',
        'Montserrat está fuera del área metropolitana, así que el viaje se te da a precio cerrado, con la espera incluida.',
      ],
    },
    andorra: {
      place: 'Andorra',
      route: 'Barcelona a Andorra',
      blurb: 'Tres horas hasta los Pirineos, para esquiar o ir de compras.',
      body: [
        'Andorra está a unas tres horas de Barcelona, subiendo poco a poco hacia los Pirineos. Es un trayecto habitual en invierno por las estaciones de esquí y durante todo el año por las compras libres de impuestos.',
        'La ruta cruza una frontera internacional. Lleva pasaportes o documentos nacionales de identidad de todos los que viajéis: los controles suelen ser rápidos, pero se hacen, y que te den la vuelta es una forma muy cara de enterarte.',
        'En invierno, el último tramo de subida puede exigir cadenas o neumáticos de invierno. Asignamos un vehículo preparado para las condiciones, en lugar de mandar un coche de ciudad normal a la montaña en febrero.',
        'Para grupos de esquí, la V-Class lleva a siete con equipaje, pero hay que avisar al reservar de los esquís y las tablas para asignar el vehículo adecuado. Es una ruta a precio cerrado, que se te da antes de viajar.',
      ],
    },
    'la-molina': {
      place: 'La Molina',
      route: 'Barcelona a La Molina',
      blurb: 'Estación de esquí del Pirineo, a unas dos horas.',
    },
    'vall-de-nuria': {
      place: 'Vall de Núria',
      route: 'Barcelona a Vall de Núria',
      blurb: 'Santuario de montaña al que se llega en tren cremallera.',
    },
    'baqueira-beret': {
      place: 'Baqueira Beret',
      route: 'Barcelona a Baqueira Beret',
      blurb: 'La mayor zona esquiable del Pirineo español.',
    },
    valencia: {
      place: 'Valencia',
      route: 'Barcelona a Valencia',
      blurb: 'Tres horas y media por la costa, de puerta a puerta.',
      body: [
        'Valencia está a unos 350 km al sur de Barcelona, a unas tres horas y media por autopista. Es un traslado largo y, para la mayoría de los viajeros, el AVE es la opción sensata.',
        'Un coche privado se justifica en situaciones concretas: un grupo de seis o siete en el que los billetes de tren individuales acaban sumando, una llegada demasiado tarde para el último tren, equipaje o material que no viaja bien en tren, o la necesidad de ir de puerta a puerta en los dos extremos.',
        'Hacemos el trayecto directo con una parada para descansar, y podemos dejarte en cualquier dirección de la ciudad, en el puerto si vas a un crucero o en el aeropuerto de Valencia.',
        'Es siempre un viaje a precio cerrado, que se te da de antemano. Escríbenos con tus fechas y el número de personas y te lo confirmamos.',
      ],
    },
    'la-roca-village': {
      place: 'La Roca Village',
      route: 'La Roca Village',
      blurb: 'El pueblo de outlets, a unos 40 minutos al norte.',
      body: [
        'La Roca Village es un outlet de marcas de diseño a unos 40 minutos al norte de Barcelona y uno de los destinos fuera del aeropuerto que más nos piden.',
        'El autobús lanzadera desde la ciudad funciona bien, pero te ata a una hora de vuelta fija, que es justo la limitación que no quieres en una jornada de compras. Un coche privado te espera.',
        'La mayoría de las reservas son de ida y vuelta con tiempo de espera, normalmente de tres a cinco horas. Lo presupuestamos como un solo viaje que incluye la espera, y hay sitio para las bolsas en el regreso.',
        'El pueblo queda fuera del área metropolitana, así que el precio es cerrado y se confirma antes de viajar.',
      ],
    },
    alicante: {
      place: 'Alicante',
      route: 'Barcelona a Alicante',
      blurb: 'Costa Blanca, a unas cinco horas al sur.',
    },
    zaragoza: {
      place: 'Zaragoza',
      route: 'Barcelona a Zaragoza',
      blurb: 'La capital de Aragón, a unas tres horas tierra adentro.',
    },
    madrid: {
      place: 'Madrid',
      route: 'Barcelona a Madrid',
      blurb: 'Trayecto de larga distancia hasta la capital.',
    },
    marbella: {
      place: 'Marbella',
      route: 'Barcelona a Marbella',
      blurb: 'Costa del Sol, un viaje de un día entero.',
    },
    malaga: {
      place: 'Málaga',
      route: 'Barcelona a Málaga',
      blurb: 'Costa andaluza, traslado de larga distancia.',
    },
  },
  groups: {
    'costa-brava': {
      title: 'Traslados a la Costa Brava',
      intro:
        'Traslados privados desde Barcelona a Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués y el resto de la Costa Brava.',
    },
    'south-and-theme-parks': {
      title: 'Sur de Barcelona y parques temáticos',
      intro:
        'Traslados en taxi y en furgoneta a Sitges, Tarragona, Salou, PortAventura, Cambrils y la costa al sur de la ciudad.',
    },
    'mountains-and-ski': {
      title: 'Montaña, naturaleza y esquí',
      intro:
        'Conductores privados a Montserrat, Andorra, las estaciones de esquí y los pueblos de montaña, también para excursiones de un día con horario flexible.',
    },
    'long-distance': {
      title: 'Traslados de larga distancia',
      intro:
        'Traslados directos en taxi y en furgoneta privados desde Barcelona a las grandes ciudades españolas.',
    },
  },
};
