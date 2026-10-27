import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "es" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const ES_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: '¿Cuánto cuesta un taxi desde el aeropuerto de Barcelona?',
    description:
      'Precio del taxi del aeropuerto de Barcelona: nuestras tarifas cerradas, en qué se diferencia el taxímetro de la parada y qué suman los suplementos.',
    h1: '¿Cuánto cuesta un taxi desde el aeropuerto de Barcelona?',
    excerpt:
      'Un traslado reservado desde El Prat hasta Barcelona cuesta 50 € en un coche de cuatro plazas, con precio cerrado y pago online. La parada de taxis de llegadas funciona de otra forma, con taxímetro regulado. Aquí tienes lo que cuesta cada opción y por qué las dos cifras no coinciden.',
    sections: [
      {
        h2: 'La respuesta corta',
        body: [
          'Un traslado reservado entre El Prat y cualquier punto de Barcelona cuesta 50 € en un coche de cuatro plazas, 70 € en un Mercedes Vito de seis plazas y 75 € en una Clase V de siete plazas. Ese es el precio total. Se te comunica antes de viajar, se paga online al reservar y no le debes nada al conductor en el coche.',
          'La terminal de cruceros de Moll Adossat es una ruta aparte: 60 €, 80 € y 85 € para los mismos tres tamaños de vehículo.',
          'Estas cifras no cambian según la hora del día. Una recogida a las 04:30 para un vuelo temprano cuesta lo mismo que una a las dos de la tarde. Lo único que las sube es un fin de semana o un festivo, que suma un 7,5 %, así que un traslado en berlina en sábado cuesta 53,75 € en lugar de 50 €.',
          'Si en cambio coges un taxi en la parada de la salida de llegadas, no compras un precio fijo: compras un trayecto con taxímetro, y la cifra final depende del tráfico, de la hora y de la ruta. El resto de esta página explica las dos opciones, porque cuál sale más barata depende de verdad de cuándo viajes.',
        ],
      },
      {
        h2: 'Por qué un precio cerrado y no la lectura del taxímetro',
        body: [
          'Las tarifas de los taxis de Barcelona las regula el Área Metropolitana de Barcelona, y todos los taxis con licencia de la ciudad usan el mismo taxímetro con las mismas tarifas. Es una protección real para el consumidor y no la discutimos. Lo que un taxímetro regulado no hace es decirte el precio de antemano.',
          'En un trayecto de 15 kilómetros hasta el Eixample, la lectura del taxímetro oscila unos diez euros según pilles la Ronda de Dalt fluida o retenida, y otro veinticinco por ciento según sea un martes a la hora de comer o un sábado por la noche. Las dos cifras son correctas. Ninguna se puede saber cuando estás en la sala de llegadas decidiendo qué hacer.',
          'Un precio cerrado traslada esa variación a nuestro lado. Te damos 50 €, liquidamos con el conductor según lo que acabe costando realmente el trayecto, y la diferencia es nuestra en ambos sentidos. Un martes con tráfico fluido, eso es peor trato para ti que la parada. Con el tráfico de un viernes por la tarde, es mejor. Lo que siempre es, es conocido.',
          'Es también la única forma honesta de vender un traslado a alguien que todavía no está en Barcelona. Nadie que reserve desde Mánchester en marzo puede calcular la lectura del taxímetro de un jueves por la tarde en julio, así que un presupuesto que en realidad es una estimación puede resultar erróneo, y siempre se equivoca en el sentido de que la cifra sube.',
        ],
      },
      {
        h2: 'La zona de 16 kilómetros y por qué se mide en línea recta',
        body: [
          'El precio de la lista cubre cualquier dirección situada a menos de 16 kilómetros de la terminal, medidos en línea recta. Eso incluye todo el centro y casi todos los sitios donde se alojan los visitantes: la plaza de Cataluña a 12,3 km, la Barceloneta a 12,8, la Sagrada Familia a 14,0, el Park Güell, en la colina detrás de Gràcia, a 14,3 y el Poblenou a 15,5 pagan los mismos 50 € que un hotel del paseo de Gracia. No es todo el municipio, y conviene saber qué parte queda fuera: los distritos exteriores del norte y del este, con La Sagrera a 16,4 km, el Fòrum a 17,4, Sant Andreu a 17,7, Nou Barris a 17,9 y Torre Baró a 19,3, que pagan la tarifa por exceso que se explica a continuación.',
          'La medición en línea recta es deliberada, y conviene entenderla porque juega a tu favor. La plaza de Cataluña está a 12,3 kilómetros de la terminal en línea recta y a 19,6 kilómetros por carretera, porque la ruta tiene que rodear el Llobregat y entrar por la Gran Via. Una zona medida por carretera a 16 kilómetros dejaría el mismo centro de Barcelona fuera, y empezaría a cobrar kilómetros extra en el trayecto más habitual que este precio existe para cubrir. Por eso la zona se traza sobre el mapa, no sobre la ruta.',
          'Fuera de la zona, el precio es el de la lista más 1,50 € por cada kilómetro adicional. Badalona está a 21,8 kilómetros y Sant Cugat del Vallès a 19,5, así que ambos pagan el precio de la ciudad más la diferencia. Son los casos que se quedan cerca; la mayor parte del área metropolitana está dentro.',
          'Esos 1,50 € son una cifra única publicada y no la tarifa de cada franja horaria, y eso importa más de lo que parece. La tarifa nocturna oficial es de 1,66 € por kilómetro frente a 1,35 € de día. Cobrar la que correspondiera devolvería la hora del día a una lista de precios cuyo único propósito es que la hora no los mueva, y quien oyera «cincuenta euros más un euro cincuenta por kilómetro» acabaría pagando más sin previo aviso. Un solo número, todo el día.',
        ],
      },
      {
        h2: 'Lo que cobra la parada de taxis',
        body: [
          'Si sales a la parada, tres elementos se combinan en la cifra del taxímetro: una bajada de bandera en cuanto arranca el taxímetro, una tarifa por kilómetro y los suplementos que correspondan.',
          'La bajada de bandera es de 2,80 €. La tarifa por kilómetro es de 1,35 € con la tarifa T-1, que se aplica de lunes a viernes entre las 08:00 y las 20:00, y de 1,66 € con la T-2 en cualquier otro momento: tardes, noches, todo el sábado y el domingo, y festivos. La diferencia es de un 23 % aproximadamente, y por eso un mismo trayecto cuesta de verdad más a las 22:00 que a las 14:00.',
          'Hay además una tarifa de espera de 27,75 € la hora, que el taxímetro cuenta mientras estás parado. En la práctica, esto es lo que hace impredecibles las llegadas en hora punta: el taxímetro no se detiene cuando se detiene el tráfico.',
          'Las tarifas actuales rigen del 19 de enero de 2026 al 17 de enero de 2027. El AMB las revisa cada enero, y quien te dé una tarifa del taxi de Barcelona a partir de un cartel antiguo te está dando la del año equivocado. Las nuestras se contrastan con el cartel de tarifas impreso y no se copian de otra web.',
        ],
      },
      {
        h2: 'Los suplementos y el tope que probablemente no alcanzarás',
        body: [
          'Sobre la tarifa del taxímetro se añaden suplementos fijos para lugares y situaciones concretas. El suplemento del aeropuerto de El Prat es de 4,60 € y se aplica a cualquier trayecto que empiece o termine en el aeropuerto. La terminal de cruceros de Moll Adossat lleva los mismos 4,60 €. La estación de Sants son 2,55 € y el recinto ferial de Fira Gran Via, 3,30 €.',
          'Un vehículo con cinco o más pasajeros añade 4,60 €. Es un suplemento de la tarifa por el propio vehículo grande y no un cargo por persona, y es una de las razones por las que la Vito de seis plazas cuesta más que un turismo en el mismo trayecto.',
          'Tres noches del año llevan 4,60 € adicionales: Nochebuena hacia la mañana de Navidad, Nochevieja hacia el día de Año Nuevo y la Revetlla de Sant Joan, la noche del 23 de junio. Si llegas en avión una de esas noches, la parada costará más que su tarifa habitual y el precio reservado no.',
          'Hay un tope de 17,10 € para el total de suplementos cobrables en un solo servicio, pensado para casos límite, como un vehículo grande que sale de la terminal de cruceros en Nochevieja. En un trayecto normal del aeropuerto pagas un único suplemento de 4,60 €, muy lejos del techo.',
          'Todo esto está dentro de nuestro precio cerrado. Los 50 € no son una tarifa a la que se añadirán suplementos: son el total, con el suplemento del aeropuerto, el vehículo, la tarifa y nuestro propio cargo por servicio ya incluidos. La queja más habitual en los traslados al aeropuerto de cualquier lugar es un precio que crece entre el presupuesto y la acera, y la manera de no hacerlo es dar el número que de verdad vas a cobrar.',
        ],
      },
      {
        h2: 'La tarifa mínima desde El Prat',
        body: [
          'Cualquier trayecto con taxímetro que empiece en el aeropuerto factura al menos 21,00 €. Si el taxímetro hubiera marcado menos, se paga el mínimo.',
          'Existe porque un taxi que hace cuarenta minutos de cola en la parada de la terminal para un salto de cuatro euros a un hotel del aeropuerto ha perdido dinero en el turno, y sin un suelo nadie querría los trayectos cortos. Solo se nota en trayectos realmente cortos: hasta el pueblo de El Prat o hasta alguno de los hoteles de la carretera del aeropuerto.',
          'Para cualquier trayecto hasta Barcelona propiamente dicha, el taxímetro supera de sobra los 21 € por sí solo, así que el mínimo nunca entra en el cálculo. Si te anuncian un taxi del aeropuerto de Barcelona «desde 21 €», ese es el suelo de un trayecto de dos kilómetros presentado como tarifa de ciudad.',
        ],
      },
      {
        h2: 'La terminal de cruceros es un caso aparte',
        body: [
          'El trayecto entre El Prat y Moll Adossat tiene un precio oficial cerrado de 46,00 € con la tarifa T-4, fijado por el AMB y no por nosotros. No funciona con taxímetro en absoluto.',
          'Es poco habitual y tiene una buena razón: los pasajeros de cruceros viajan con una hora límite de embarque, a menudo en el peor tráfico del puerto de la semana, y una tarifa con taxímetro en esa situación es una apuesta que nadie quiere hacer. Un precio cerrado elimina el riesgo del tráfico en un trayecto en el que llegar tarde no es una molestia, sino perder el barco.',
          'Nuestro precio reservado para la misma ruta es de 60 € en berlina, por encima del precio oficial cerrado porque incluye una garantía concreta que la parada no ofrece: un conductor asignado de antemano, que te recibe con un cartel con tu nombre y que mantiene tu hueco aunque el barco no atraque a su hora. Para una familia con equipaje y una hora de zarpada, suele ser lo que merece la pena pagar. Para un viajero solo con una mochila y una tarde tranquila, la parada a 46 € es la mejor compra y preferimos decirlo antes que aparentar lo contrario.',
          'Un traslado entre la terminal de cruceros y la ciudad, en lugar del aeropuerto, es el precio de la ciudad más un recargo portuario de 10 €, lo que da los mismos 60 €. La simetría es intencionada.',
        ],
      },
      {
        h2: 'Fuera del área metropolitana: Sitges, Girona, Tarragona',
        body: [
          'Cuando uno de los extremos del trayecto queda fuera del área metropolitana, las tarifas de Barcelona dejan de aplicarse por completo y el trayecto se factura con las tarifas interurbanas que fija la Generalitat de Catalunya. Son la T-6, de lunes a viernes de 08:00 a 20:00, y la T-7 en cualquier otro momento, incluidos todo el sábado y el domingo.',
          'El taxímetro interurbano tiene una característica que sorprende a casi todo el mundo: cobra el trayecto de vuelta. Un taxi de Barcelona a Sitges es, según la tarifa, un viaje de ida y vuelta —el circuito cerrado— porque el conductor tiene que volver a casa y no puede recoger a nadie por el camino. Así que un kilómetro recorrido hacia el sur cuenta como dos en el taxímetro. Con la tarifa T-6 de 0,82 € por kilómetro, son 1,64 € por cada kilómetro realmente recorrido y no 0,82 €.',
          'Por eso un traslado largo cuesta lo que cuesta, y por eso una cifra que parece una tarifa por kilómetro en un comparador suele ser la mitad de la real. Con todo incluido, también nuestro servicio, resulta en unos 2,16 € por kilómetro recorrido en día laborable (T-6) y entre 2,38 € y 2,48 € de noche y en fin de semana (T-7), más una cuota de salida. Sitges, a 38 kilómetros, cuesta 90,78 € en total. No se duplica nada dos veces.',
          'En la práctica: Sitges, Tarragona, Girona, Reus y la Costa Brava se calculan por kilómetro y se presupuestan antes de reservar, como todo lo demás. No están cubiertos por la lista fija de la ciudad, y ninguna lista fija honesta podría cubrirlos: las distancias difieren en un factor de cinco.',
        ],
      },
      {
        h2: 'Fines de semana, festivos y qué cambia realmente',
        body: [
          'Un precio cerrado sube un 7,5 % los fines de semana y festivos. En una berlina de 50 € son 3,75 €. El incremento existe porque cubrir el servicio en fines de semana y festivos cuesta más, y es una única tarifa publicada y no un multiplicador que se mueve con la demanda: el precio que te damos un sábado de febrero es el mismo que te damos un sábado de agosto.',
          'Se aplica solo a los precios cerrados de ciudad y puerto. Un trayecto interurbano ya pasa de la T-6 a la T-7 el fin de semana, con su propia tarifa más alta, así que añadir el incremento encima cobraría dos veces el mismo recargo.',
          'Lo que no cambia: la hora del día, la terminal, el tráfico, la ruta que siga el conductor, el número de pasajeros dentro de la capacidad del vehículo ni la cantidad de equipaje dentro de ella. Un coche de cuatro plazas con tres maletas a las 06:00 y un coche de cuatro plazas con una bolsa a las 18:00 cuestan los dos 50 € entre semana.',
        ],
      },
      {
        h2: 'Entonces, ¿cuánto presupuestar?',
        body: [
          'Para un traslado reservado hasta Barcelona: 50 € entre semana en un coche de cuatro plazas, 53,75 € en fin de semana. 70 € o 75 € si necesitas uno de seis o siete plazas, lo que para cuatro adultos con cuatro maletas grandes suele ser la respuesta honesta y no una venta de más: tres maletas es el límite realista en un Corolla o un Toledo.',
          'Para la parada, en un trayecto diurno entre semana hasta el centro: el taxímetro más el suplemento de 4,60 €, que suele quedar en torno a los cuarenta y pico euros, y más por la tarde, en fin de semana o con mucho tráfico. Cuenta con la posibilidad de que el datáfono no funcione, que pasa.',
          'Para la terminal de cruceros: 46 € con el precio oficial cerrado, o 60 € reservando, con un conductor que mantiene tu hueco.',
          'Lo único que merece decirse con claridad es que la parada y un coche reservado no son el mismo producto a distinto precio. Uno es un trayecto con taxímetro regulado que compras al llegar. El otro es una cifra fija, un conductor con nombre y un coche ya asignado cuando aterriza tu vuelo. Cuál es mejor depende por completo de cuánto te valga la incertidumbre ese día, y para muchos trayectos la respuesta es «no mucho», en cuyo caso la parada está ahí mismo.',
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: 'Taxi o Aerobús desde el aeropuerto de Barcelona',
    description:
      'Taxi, Aerobús o metro desde El Prat: lo que cuesta de verdad por grupo, los tiempos reales de puerta a puerta y cuándo gana cada uno según equipaje y hora.',
    h1: 'Taxi o Aerobús desde el aeropuerto de Barcelona',
    excerpt:
      'El Aerobús es más barato por persona y el metro todavía más. Ninguno es automáticamente mejor si cuentas el tamaño del grupo, el equipaje y el paseo al final del trayecto, y para una o dos personas con poco equipaje el taxi no es la mejor elección y te lo decimos.',
    sections: [
      {
        h2: 'La aritmética, con los números reales',
        body: [
          'El Aerobús cobra por persona. Un taxi cobra por coche. Esa única diferencia decide la mayoría de estas discusiones antes de que importe ningún otro factor.',
          'Un traslado reservado en coche de cuatro plazas hasta Barcelona cuesta 50 € fijos. Repartidos entre dos personas son 25 € cada una, varias veces lo que vale un asiento de Aerobús. Entre cuatro son 12,50 € cada uno, y la diferencia se reduce a algo que a la mayoría deja de importarle, sin contar que el taxi te deja en la puerta y el autobús termina en la plaza de Cataluña.',
          'El punto de cambio suele estar en tres pasajeros, y con cuatro normalmente ya ha pasado. Un grupo de seis en una Vito a 70 € sale por menos de 12 € por cabeza, de puerta a puerta, con el equipaje en el maletero y no en las rodillas.',
          'La versión honesta de la comparación es esta: si viajas solo, el autobús es mejor opción y no hay color. Si viajas en familia de cuatro con maletas, el taxi suele ser más barato en total y bastante más cómodo. Todo lo que hay en medio depende del equipaje.',
        ],
      },
      {
        h2: 'Tiempo de puerta a puerta, no el tiempo del cartel',
        body: [
          'El Aerobús se anuncia con unos 35 minutos hasta la plaza de Cataluña, y es cierto, de parada a parada. El tiempo que vives de verdad es mayor, porque el viaje no empieza en el andén del autobús ni termina en la plaza.',
          'Suma el paseo desde llegadas hasta la parada, que en la T1 son unos minutos con carrito. Suma la espera, que es corta en hora punta y puede ser de quince minutos por la tarde-noche. Y suma el tramo desde la plaza de Cataluña o Sants hasta donde te alojas: en metro con maletas, en un segundo taxi o a pie sobre adoquines en el Barrio Gótico.',
          'Un taxi desde El Prat al centro de Barcelona tarda de 25 a 35 minutos según el tráfico y el punto de la ciudad al que vayas, y termina en la dirección que escribiste. Para el Eixample o Sant Antoni, la diferencia en el tiempo total de puerta a puerta es de unos veinte minutos. Para algo en Gràcia, o un apartamento con entrada a pie de calle en el Born, suele acercarse a los cuarenta y cinco.',
          'La variación importa tanto como la media. El autobús es fiable y el taxi es más rápido; con mucho tráfico se igualan, porque el autobús está en el mismo tráfico y para más.',
        ],
      },
      {
        h2: 'El metro es más barato que ambos, con condiciones',
        body: [
          'La línea 9 Sud da servicio a las dos terminales y es la forma más barata de llegar a la ciudad, con diferencia. Es una opción realmente buena y los visitantes la usan poco.',
          'Pero las condiciones son reales. No llega directamente al centro: hay que hacer trasbordo, normalmente en Collblanc o Torrassa, a otra línea, y las estaciones del aeropuerto requieren un billete específico del aeropuerto y no un sencillo normal. Las estaciones tienen ascensores, pero los trasbordos implican pasillos, y hacerlos con dos maletas grandes y un niño cansado es de esas cosas que suenan bien cuando reservas y no lo parecen a las 23:00.',
          'Si viajas con poco equipaje, te alojas cerca de un trasbordo de la línea 9 y no tienes prisa, el metro es la respuesta correcta y cuesta una fracción de todo lo demás. Si alguna de esas tres condiciones no se cumple, deja de ser la respuesta correcta bastante rápido.',
        ],
      },
      {
        h2: 'El equipaje es el verdadero factor decisivo',
        body: [
          'Más que el precio y más que el tiempo, el equipaje es lo que decide de verdad, y es lo que la gente subestima al reservar desde casa.',
          'Un taxi de Barcelona de cuatro plazas —un Corolla, un SEAT Toledo— admite cuatro pasajeros y unas tres maletas. Cuatro adultos con una maleta grande cada uno no caben, y la solución es una Vito de seis plazas, que admite seis pasajeros y seis maletas, o una Clase V de siete plazas. Saberlo de antemano es la diferencia entre un traslado y un problema en la acera.',
          'En el Aerobús, el equipaje va en una bodega bajo el autobús y hay un portaequipajes junto a la puerta, lo que funciona bien. En el metro va donde puedas sujetarlo, que en hora punta es encima de ti.',
          'La regla práctica que se sostiene: una maleta por persona y tienes una elección real entre las tres opciones. Dos maletas por persona y el taxi es el único que resulta realmente agradable, diga lo que diga la aritmética.',
        ],
      },
      {
        h2: 'Cuándo gana claramente el taxi',
        body: [
          'Llegar pasada la medianoche. El Aerobús deja de circular de madrugada y el metro cierra, con una red limitada de autobuses nocturnos entre medias que no es una opción realista con equipaje y sin hablar catalán.',
          'Viajar con niños, un cochecito o una silla infantil. El autobús es manejable con un niño y incómodo con dos, y a nadie le gusta el trasbordo del metro con un cochecito y una maleta.',
          'Coger un vuelo temprano. Una recogida a las 04:30 para un vuelo a las 06:30 no tiene equivalente en transporte público, y un coche reservado a precio fijo es la única versión que te deja dormir hasta que suene la alarma.',
          'Alojarse donde el último tramo es realmente incómodo: el Barrio Gótico, donde los vehículos no llegan a muchas direcciones pero sí mucho más cerca que una parada de autobús; Gràcia y Sarrià, cuesta arriba desde cualquiera de las rutas de autobús; cualquier sitio en el que acabarías con un segundo taxi, lo que hace que la opción «barata» salga más cara.',
          'Grupos de cuatro o más. En ese punto el precio por coche ya ha ganado en dinero, así que la comodidad sale gratis.',
        ],
      },
      {
        h2: 'Cuándo no, y te lo decimos',
        body: [
          'Una o dos personas, poco equipaje, alojadas cerca de la plaza de Cataluña o en una línea de metro directa, llegando a mediodía. En esa situación el Aerobús es la elección sensata, el metro es la barata, y un taxi de 50 € es pagar por una comodidad que no necesitas especialmente.',
          'Preferimos escribirlo antes que aparentar que el taxi siempre es lo correcto. Un traslado al aeropuerto es un servicio con una forma concreta —precio fijo, conductor asignado, de puerta a puerta, con el equipaje resuelto— y esa forma vale mucho para una familia de cuatro a medianoche y muy poco para un viajero solo con una mochila a las dos de la tarde.',
          'La misma lógica se aplica a la parada. Un taxi con taxímetro desde la parada una tarde tranquila entre semana saldrá a menudo por debajo de un precio fijo reservado, porque el precio fijo incluye asumir un riesgo de tráfico que ese día no se materializó. Así funcionan los precios fijos, en ambos sentidos.',
        ],
      },
      {
        h2: 'El hueco nocturno del que nadie habla',
        body: [
          'Hay una franja, aproximadamente desde el último Aerobús hasta el primer metro de la mañana, en la que las opciones de transporte público se reducen a un autobús nocturno y la parada de taxis pasa a ser la opción por defecto. En una noche normal, la parada de la T1 está bien supervisada y avanza rápido.',
          'Donde falla es cuando un vuelo retrasado aterriza en esa franja a la vez que otros dos vuelos retrasados. La cola es entonces de cuarenta personas y la oferta de taxis a las 02:00 es escasa, porque los conductores no esperan en una terminal por si acaso. Es el único escenario en el que llegar con un coche ya asignado vale claramente más de lo que cuesta.',
          'Si tu vuelo tiene previsto aterrizar pasadas las 23:30 aproximadamente, conviene decidirlo antes de volar y no en la sala de llegadas.',
        ],
      },
      {
        h2: 'Volver al aeropuerto es un problema distinto',
        body: [
          'Casi todo el mundo planifica la llegada e improvisa la salida, y la salida es la mitad más difícil.',
          'A la llegada tienes opciones porque estás en un aeropuerto, el único lugar de la región donde seguro hay taxis. A la salida estás en una calle de Gràcia a las 05:00 con un vuelo a las 07:30, y lo que hacía atractivos al autobús y al metro ha dejado de circular.',
          'El Aerobús no sirve para salidas tempranas, y parar un taxi en una calle residencial antes del amanecer no es fiable de un modo en que sí lo es hacerlo en la Gran Via. Barcelona tiene muchos taxis; no tiene muchos taxis en tu esquina a las cinco de la mañana.',
          'Para una salida de día desde una dirección céntrica, las tres opciones funcionan a la inversa igual que a la ida, y se aplica la misma aritmética. Para cualquier cosa antes de las 07:00 aproximadamente, o desde una dirección fuera de la cuadrícula principal, una recogida reservada es menos una comodidad que la única versión que se cumple de forma fiable. El precio fijo es el mismo en ambos sentidos: 50 € hacia la ciudad y 50 € desde ella, entre semana, en un coche de cuatro plazas.',
        ],
      },
      {
        h2: 'Cómo decidir en diez segundos',
        body: [
          'Cuenta a las personas y cuenta las maletas. Una o dos personas con una maleta cada una, llegando de día y alojadas en el centro: coge el Aerobús, o el metro si miras cada euro.',
          'Tres o más personas, o dos o más maletas cada una, o una llegada después de que dejen de circular los autobuses, o una dirección cuesta arriba o al fondo de un callejón: coge un taxi, y decide aparte si quieres la parada o un coche reservado con antelación.',
          'Parada o reservado se reduce a una pregunta: ¿cuánto te afectaría esta noche una cola de cuarenta minutos o una cifra final desconocida? Si la respuesta es «no mucho», la parada está justo a la salida de llegadas y cuesta menos. Si viajas con gente que no lo llevaría bien, o con una hora límite, reserva.',
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: 'Terminales T1 y T2 del aeropuerto de Barcelona',
    description:
      'Qué terminal usa tu aerolínea en El Prat, cómo funciona el autobús entre la T1 y la T2, dónde están los taxis y dónde te espera un conductor reservado.',
    h1: 'Terminales T1 y T2 del aeropuerto de Barcelona',
    excerpt:
      'Equivocarte de terminal te cuesta un trayecto en lanzadera y veinte minutos, y en una salida puede costarte el vuelo. Aquí tienes cuál es cuál, dónde están realmente los taxis en cada una y lo único que debes comprobar el día antes de volar.',
    sections: [
      {
        h2: 'Dos terminales a varios kilómetros de distancia',
        body: [
          'El Prat de Barcelona tiene dos terminales de pasajeros, la T1 y la T2, y lo más importante que hay que saber es que no se puede ir andando de una a otra. Están en lados opuestos de las pistas, a unos kilómetros, conectadas por un autobús lanzadera gratuito.',
          'Esto pilla a la gente porque en muchos aeropuertos «terminal» significa otra ala del mismo edificio. Aquí significa otro edificio con un trayecto en autobús entre medias, y el trayecto dura de 10 a 15 minutos sin contar la espera.',
          'La T1 es la más nueva y mucho más grande de las dos, se inauguró en 2009 y gestiona la mayor parte del tráfico de largo radio junto con la mayoría de Vueling y las aerolíneas tradicionales. La T2 es la terminal original, más antigua y de techos más bajos, dividida en tres bloques y con varias aerolíneas de bajo coste.',
          'Ambas están plenamente equipadas: facturación, seguridad, tiendas, restaurantes, alquiler de coches y paradas de taxi. Ninguna es un puesto remoto. La única penalización real por ir a la equivocada es el tiempo.',
        ],
      },
      {
        h2: 'Qué aerolíneas usan cada una',
        body: [
          'La T1 recibe la mayor parte de lo que llega de fuera de Europa, además de Vueling, que es la aerolínea dominante en el aeropuerto, y la mayoría de las aerolíneas de bandera tradicionales.',
          'La T2 da servicio a un grupo de aerolíneas de bajo coste, entre ellas Ryanair, una de las mayores, junto con algo de tráfico chárter y de temporada.',
          'La salvedad útil: esto no es estable. Las aerolíneas cambian de terminal cuando cambian sus contratos, a veces con pocas semanas de aviso, y los horarios de temporada lo mezclan más. Una guía que te dice con seguridad qué terminal usa tu aerolínea te está diciendo qué terminal usaba cuando se escribió la guía.',
          'Los códigos compartidos lo empeoran. Si reservaste con una aerolínea y vuelas en el avión de otra, la terminal depende de la aerolínea que opera el vuelo, no de la que figura en tu confirmación de reserva. La terminal que aparece impresa en tu tarjeta de embarque es la que cuenta, y es la única fuente en la que fiarse.',
        ],
      },
      {
        h2: 'Cómo ir de la T1 a la T2',
        body: [
          'El autobús lanzadera entre las terminales es gratuito, pasa con frecuencia y funciona toda la noche, aunque con menos frecuencia de madrugada. Para frente a llegadas en la T1 y en cada bloque de la T2.',
          'Calcula 25 minutos de puerta a puerta y no los 10 a 15 que dura el trayecto en sí: esperarás al autobús, cargarás el equipaje y caminarás al final. En horas de mucha afluencia, con el autobús lleno y solo sitio de pie, tarda más y es bastante menos agradable con maletas.',
          'La línea 9 Sud del metro también conecta las dos terminales, con una estación en cada una, lo que a veces es más rápido que esperar al autobús si ya estás bajo tierra. No es gratuita y requiere el billete del aeropuerto.',
          'Si haces conexión entre un vuelo que llega a la T2 y otro que sale de la T1 con billetes separados, trata el traslado como un tramo real del viaje y dale una hora. Hay gente que pierde vuelos por esto.',
        ],
      },
      {
        h2: 'La T2 son tres bloques, y el bloque importa',
        body: [
          'La T2 se divide en los bloques A, B y C, dispuestos en línea a lo largo de la fachada del edificio. Están conectados por dentro, así que puedes caminar entre ellos, pero el paseo de un extremo al otro son varios minutos.',
          'Tu aerolínea usa un bloque concreto, y los mostradores de facturación, la seguridad y la parada de taxis dependen de él. Que te dejen en el bloque C cuando necesitas el A no es un desastre, pero es un paseo con equipaje que no habías planificado.',
          'Cuando reserves un traslado con recogida o destino en la T2, conviene indicar el bloque. Es la diferencia entre un conductor que está esperando donde sales y uno que está trescientos metros más allá en la fachada.',
        ],
      },
      {
        h2: 'Dónde están las paradas de taxi',
        body: [
          'Ambas terminales tienen paradas de taxi oficiales justo a la salida de llegadas, bien señalizadas, supervisadas y normalmente concurridas. En la T1 la parada está directamente frente a la sala de llegadas. En la T2 hay paradas que dan servicio a cada uno de los bloques.',
          'Los taxis de estas paradas son taxis de Barcelona con licencia, con la librea habitual negra y amarilla, todos con el mismo taxímetro regulado. No hay negociación ni elección: coges el coche que está el primero. Es el sistema funcionando como se diseñó, y significa que no pueden cobrarte de más respecto a la tarifa.',
          'Cualquier trayecto que empiece en el aeropuerto lleva un suplemento de 4,60 € y factura al menos la tarifa mínima de 21 €, ambas parte de la tarifa oficial y no algo que haya añadido el conductor.',
          'Lo que la parada no puede hacer es decirte el precio antes de salir, ni garantizar que haya un coche cuando aterrices. En una tarde normal, ambas cosas están bien. Tras un grupo de llegadas tardías retrasadas, la cola lo es todo.',
        ],
      },
      {
        h2: 'Dónde te recibe en cambio un conductor reservado',
        body: [
          'Un traslado reservado no usa la parada, y esta es la parte que más gente hace mal al llegar.',
          'Tu conductor espera dentro de la sala de llegadas, en la zona pública a la salida de la recogida de equipajes, con un cartel con tu nombre. No está en la acera ni en la cola de la parada. Sales de la recogida de equipajes y está ahí de pie, que es precisamente el sentido de reservar.',
          'El punto de encuentro exacto se confirma por correo electrónico antes de viajar, porque varía según la terminal y, en la T2, según el bloque. Lee ese correo en el avión y no en la sala.',
          'El conductor sigue tu número de vuelo, así que un retraso mueve la recogida en lugar de perderla. Esta es la diferencia práctica entre un coche reservado y la parada: un aterrizaje con una hora de retraso a la 01:00 significa un conductor que sigue allí, en lugar de una parada que se ha ido vaciando.',
          'Si no os encontráis, el número de teléfono de la confirmación llega directamente al conductor, no a un centro de llamadas. Las salas de llegadas son grandes y los carteles se bajan; una llamada lo resuelve.',
        ],
      },
      {
        h2: '¿Cambia la tarifa según la terminal?',
        body: [
          'Apenas, y en un traslado reservado, nada.',
          'La T1 está un par de kilómetros más lejos de la ciudad que la T2. En un trayecto de 15 kilómetros hasta el centro de Barcelona esa diferencia es pequeña, y el suplemento del aeropuerto de 4,60 € es idéntico desde cualquiera de las dos. En el taxímetro puedes ver uno o dos euros de diferencia entre ellas.',
          'Un precio fijo reservado no distingue entre ellas en absoluto: 50 € hasta la ciudad en un coche de cuatro plazas desde la T1 o la T2, entre semana, con el suplemento ya incluido en la cifra. Lo mismo se aplica a la inversa en las salidas.',
          'Lo que sí cambia la terminal es el riesgo de la lanzadera. Si te dejan en la equivocada, el coste son 25 minutos y un autobús, que en una llegada es molesto y en una salida puede ser el vuelo.',
        ],
      },
      {
        h2: 'Salidas: donde equivocarse duele de verdad',
        body: [
          'A la llegada, la terminal equivocada te cuesta tiempo. A la salida puede costarte el viaje, porque descubres el error en un mostrador de facturación que no tiene tu vuelo y con una lanzadera que tarda 25 minutos que no tienes.',
          'Indica la terminal al reservar un traslado de salida, y compruébala con la tarjeta de embarque y no con el recuerdo del vuelo de ida. Las aerolíneas usan con frecuencia terminales distintas en cada sentido, y un vuelo de vuelta en código compartido puede ser perfectamente de otra terminal que el de ida.',
          'Para una salida temprana, salir de Barcelona para estar en El Prat para un vuelo a las 06:30 significa una recogida hacia las 04:30 en la ciudad, antes si estás más lejos. Un coche reservado a precio fijo es la única versión de eso que no consiste en quedarte en la calle al amanecer esperando.',
        ],
      },
      {
        h2: 'Cuánto tardarás de verdad en salir',
        body: [
          'El tiempo que importa para una recogida no es cuando aterriza el avión, sino cuando sales de la recogida de equipajes, y la diferencia entre las dos es mayor de lo que casi todo el mundo prevé.',
          'Desde una llegada Schengen con solo equipaje de mano, de diez a quince minutos desde el aterrizaje hasta la sala de llegadas es realista. Desde fuera de Schengen, con control de pasaportes y una maleta facturada, media hora es normal y una hora ocurre, sobre todo en la T1 a media mañana, cuando aterrizan varios vuelos de largo radio a la vez y el cuello de botella es la cola del control y no la cinta.',
          'Por eso un traslado reservado se vincula a tu número de vuelo y no a una hora que escribiste. El conductor sigue el aterrizaje real y cuenta con la sala, lo que elimina la conjetura que tendrías que hacer al reservar desde casa semanas antes.',
          'También significa que no hay ventaja en alargar tu propia estimación. Reservar una recogida una hora después del aterrizaje «por si acaso» no ayuda, porque el seguimiento ya lo gestiona, y te deja esperando a un coche que llega tarde a propósito.',
          'Lo único que debes hacer tú: si sales de la recogida de equipajes inusualmente rápido y tu conductor aún no está en su sitio, el número de teléfono de la confirmación llega directamente a él. Un coche a ocho minutos es un resultado normal de una salida rápida, no un problema.',
        ],
      },
      {
        h2: 'Compruébalo el día antes',
        body: [
          'Un hábito elimina casi todo esto: la noche antes de volar, abre la tarjeta de embarque y lee la terminal. No la confirmación de la reserva, no la guía que leíste en marzo, no la página general de rutas de la aerolínea: la tarjeta de embarque del vuelo que vas a coger.',
          'Si no coincide con lo que nos dijiste, responde al correo de confirmación y lo cambiaremos. Cambiar la terminal de una reserva no cuesta nada y lleva un minuto. Descubrirlo a las 05:00 cuesta la lanzadera, el estrés y a veces el vuelo.',
        ],
      },
    ],
  },
};
