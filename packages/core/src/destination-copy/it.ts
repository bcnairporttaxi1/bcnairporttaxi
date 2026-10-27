import type { LocaleDestinationCopy } from '../destination-copy';

/**
 * Destination copy for the "it" locale. Filled in per destination slug and
 * group slug; anything missing falls back to the English original, which the
 * parity test in destination-copy.test.ts forbids for every page that has one.
 */
export const IT_DESTINATION_COPY: LocaleDestinationCopy = {
  destinations: {
    'costa-brava': {
      place: 'Costa Brava',
      route: 'Barcellona alla Costa Brava',
      blurb:
        'Transfer porta a porta da El Prat ai centri della Costa Brava, con spazio per i bagagli di tutta la famiglia.',
      body: [
        `La Costa Brava inizia a circa un'ora a nord di Barcellona e arriva fino al confine francese, e quasi tutti i visitatori vi giungono passando da El Prat. La strada costiera è semplice, ma è un vero viaggio e non un breve spostamento in città: preveda circa 80 minuti fino a Lloret de Mar e quasi due ore per le calette più a nord.`,
        `Qui un transfer privato conta più che in una corsa urbana. Per la maggior parte delle località non c'è un treno diretto, gli autobus fermano solo nei centri più grandi e l'ultimo tratto fino a un hotel in collina o a una villa fuori paese raramente si fa a piedi con le valigie. Il suo autista la porta fino alla porta.`,
        `La aspettiamo in sala arrivi con un cartello con il suo nome e seguiamo il suo volo, così un atterraggio in ritardo non le fa perdere l'auto. Per i gruppi, la Mercedes Vito o la V-Class trasportano sei o sette passeggeri con i relativi bagagli, di solito a un costo inferiore a due auto separate e in modo molto più semplice.`,
        `Poiché la Costa Brava si trova fuori dall'area metropolitana di Barcellona, il viaggio non rientra nel prezzo urbano. Le comunichiamo un prezzo fisso per il percorso prima che confermi, per iscritto, così a destinazione non resta nulla da saldare oltre a quanto concordato.`,
      ],
    },
    girona: {
      place: 'Girona',
      route: 'Barcellona a Girona',
      blurb:
        'Centro città, aeroporto di Girona o centro storico: una corsa diretta verso nord, senza cambi.',
      body: [
        `Girona si trova a circa 100 km a nord di Barcellona e si raggiunge in poco più di un'ora di strada. È un transfer richiesto per tre motivi piuttosto diversi: la città stessa, l'aeroporto che porta il suo nome e la scalinata della cattedrale, che attira un flusso costante di visitatori.`,
        `Il treno è veloce tra i due centri città, ma non aiuta se parte da El Prat con i bagagli, se arriva tardi o se deve andare altrove rispetto alla stazione. Un'auto privata elimina i cambi a entrambe le estremità.`,
        `L'aeroporto di Girona si trova 15 minuti oltre la città e serve una buona parte dei voli charter diretti alla Costa Brava. Se deve collegare El Prat e l'aeroporto di Girona, ci indichi entrambi i numeri di volo e prevederemo un margine adeguato.`,
        `Questo percorso è fuori dall'area metropolitana di Barcellona, quindi confermiamo in anticipo un prezzo fisso. I veicoli vanno dal normale taxi a quattro posti alla V-Class a sette posti per famiglie e gruppi.`,
      ],
    },
    'lloret-de-mar': {
      place: 'Lloret de Mar',
      route: 'Barcellona a Lloret de Mar',
      blurb: 'La località più frequentata della Costa Brava, a circa 70 minuti da El Prat.',
      body: [
        `Lloret de Mar è la località più nota della Costa Brava e una delle nostre tratte a lunga distanza più frequenti. Il viaggio dura circa 70 minuti da El Prat fuori dai periodi di punta.`,
        `In stagione gli autobus raggiungono Lloret, ma seguono un orario e si fermano in un punto centrale, scomodo se il suo hotel si trova su una delle colline sopra la baia. Un transfer privato termina all'ingresso.`,
        `Per i gruppi che arrivano insieme, un minivan a sei o sette posti conviene di solito più di più auto e mantiene tutti sullo stesso orario.`,
        `Il percorso è fuori dall'area metropolitana di Barcellona, quindi il prezzo è fisso e concordato in anticipo.`,
      ],
    },
    'tossa-de-mar': {
      place: 'Tossa de Mar',
      route: 'Barcellona a Tossa de Mar',
      blurb: 'Centro storico fortificato e spiagge più tranquille, a circa 80 minuti.',
      body: [
        `Tossa de Mar è la vicina più tranquilla di Lloret, nota per il centro storico fortificato che domina la spiaggia. Dista circa 80 minuti dall'aeroporto di Barcellona.`,
        `L'ultimo tratto lungo la strada costiera è panoramico ma lento, e con i mezzi pubblici serve almeno un cambio. Dopo un volo, la maggior parte degli ospiti ritiene che un'auto diretta valga la pena.`,
        `Il centro storico è in gran parte pedonale, quindi concordiamo con Lei, al momento della prenotazione, il punto di discesa raggiungibile più vicino, invece di improvvisare all'arrivo.`,
        `Il prezzo è fisso per questa tratta e confermato prima del viaggio, perché si trova oltre l'area metropolitana di Barcellona.`,
      ],
    },
    blanes: {
      place: 'Blanes',
      route: 'Barcellona a Blanes',
      blurb: "La porta meridionale della Costa Brava, a circa un'ora di distanza.",
      body: [
        `Blanes segna il limite sud della Costa Brava ed è la principale località più vicina a Barcellona, a circa un'ora di strada.`,
        `Ha una stazione ferroviaria, il che la rende una delle località più accessibili della Costa Brava, ma il collegamento dall'aeroporto comporta comunque dei cambi e un tratto a piedi all'arrivo.`,
        `La prendiamo in sala arrivi o da qualsiasi indirizzo di Barcellona e proseguiamo senza soste, ideale per le famiglie e per chi viaggia con l'attrezzatura da spiaggia.`,
        `Come per il resto della costa, la tariffa è un prezzo fisso comunicato in anticipo.`,
      ],
    },
    cadaques: {
      place: 'Cadaqués',
      route: 'Barcellona a Cadaqués',
      blurb: "L'estremo nord, oltre Cap de Creus: circa due ore e mezza di viaggio.",
      body: [
        `Cadaqués è il villaggio più isolato della Costa Brava, raggiunto oltrepassando il promontorio di Cap de Creus lungo una strada di montagna tortuosa. Preveda circa due ore e mezza da Barcellona.`,
        `Non c'è alcun collegamento ferroviario e il servizio di autobus è limitato e lento. Per la maggior parte dei visitatori un transfer privato è l'unico modo pratico per arrivare a un orario ragionevole.`,
        `La strada del passo è stretta e conviene che la percorra chi la conosce, soprattutto dopo il tramonto. I nostri autisti fanno questa tratta regolarmente.`,
        `Data la distanza, è sempre un viaggio a prezzo fisso concordato in anticipo. Ci scriva su WhatsApp per un preventivo con le sue date.`,
      ],
    },
    roses: {
      place: 'Roses',
      route: 'Barcellona a Roses',
      blurb: "Località sul golfo di Roses, all'estremo nord della Costa Brava.",
    },
    empuriabrava: {
      place: 'Empuriabrava',
      route: 'Barcellona a Empuriabrava',
      blurb: 'La città dei canali sul golfo di Roses.',
    },
    begur: {
      place: 'Begur',
      route: 'Barcellona a Begur',
      blurb: 'Villaggio in collina e le calette sottostanti.',
    },
    'calella-de-palafrugell': {
      place: 'Calella de Palafrugell',
      route: 'Barcellona a Calella de Palafrugell',
      blurb: 'Villaggio di pescatori dalle case bianche, sulla Costa Brava centrale.',
    },
    sitges: {
      place: 'Sitges',
      route: 'Barcellona a Sitges',
      blurb: 'La località più vicina a Barcellona: circa 25 minuti da El Prat.',
      body: [
        `Sitges è la più breve delle nostre tratte a lunga distanza e la più prenotata. Da El Prat sono circa 25 minuti; dal centro di Barcellona quasi 40.`,
        `La città è una meta fissa per i weekend al mare, per gli ospiti di congressi che alloggiano fuori Barcellona e per il calendario dei festival. È ben collegata in treno da Barcelona Sants, ma non dall'aeroporto, ed è per questo che la maggior parte degli arrivi preferisce un'auto diretta.`,
        `Il centro storico ha vie strette a senso unico e accessi limitati in alcune zone. Concordiamo un punto di discesa pratico al momento della prenotazione, così non c'è nulla da risolvere davanti al portone.`,
        `Sitges si trova appena fuori dall'area metropolitana di Barcellona, quindi il viaggio ha un prezzo fisso. Ci scriva su WhatsApp e glielo confermeremo prima della partenza.`,
      ],
    },
    tarragona: {
      place: 'Tarragona',
      route: 'Barcellona a Tarragona',
      blurb: 'Città romana e porto crocieristico, a circa 75 minuti a sud.',
      body: [
        `Tarragona si trova a circa 100 km a sud di Barcellona, a circa 75 minuti di autostrada. Attira visitatori per l'anfiteatro romano e il centro storico, e sempre più come porto crocieristico a sé.`,
        `I transfer per le crociere sono la versione più sensibile ai tempi di questo viaggio. Se deve imbarcarsi, prevediamo un margine e confermiamo il terminal, perché una partenza persa non si recupera.`,
        `La città è anche la porta d'accesso alle spiagge della Costa Dorada, e molti ospiti uniscono le due cose: possiamo lasciarla in un hotel lungo la costa durante il percorso.`,
        `Questa tratta è oltre l'area metropolitana di Barcellona, quindi comunichiamo un prezzo fisso in anticipo.`,
      ],
    },
    salou: {
      place: 'Salou',
      route: 'Barcellona a Salou',
      blurb: 'Località della Costa Dorada accanto a PortAventura.',
    },
    portaventura: {
      place: 'PortAventura',
      route: 'Barcellona a PortAventura',
      blurb: "Transfer diretto fino all'ingresso del parco divertimenti.",
    },
    cambrils: {
      place: 'Cambrils',
      route: 'Barcellona a Cambrils',
      blurb: 'Cittadina più tranquilla della Costa Dorada, a sud di Salou.',
    },
    peniscola: {
      place: 'Peñíscola',
      route: 'Barcellona a Peñíscola',
      blurb: 'Città con castello sulla Costa del Azahar.',
    },
    reus: {
      place: 'Reus',
      route: 'Barcellona a Reus',
      blurb: "Aeroporto e città di Reus, nell'entroterra di Salou.",
    },
    montserrat: {
      place: 'Montserrat',
      route: 'Barcellona a Montserrat',
      blurb: "Il monastero di montagna, a circa un'ora dalla città.",
      body: [
        `Montserrat è la gita in giornata più popolare da Barcellona: un monastero benedettino immerso in un massiccio roccioso frastagliato, a circa un'ora nell'entroterra.`,
        `Raggiungerlo con i mezzi pubblici significa prendere un treno e poi una cremagliera o una funivia, ciascuna con la propria coda. Un'auto arriva direttamente al parcheggio del monastero, un vantaggio se vuole essere lì prima dei pullman.`,
        `La maggior parte degli ospiti lo prenota come andata e ritorno con attesa, di solito tre o quattro ore sul posto, così lo stesso autista li riporta indietro. Ci dica quanto tempo desidera e lo calcoleremo come un unico viaggio.`,
        `Montserrat è fuori dall'area metropolitana di Barcellona, quindi la gita ha un prezzo fisso comprensivo dell'attesa.`,
      ],
    },
    andorra: {
      place: 'Andorra',
      route: 'Barcellona a Andorra',
      blurb: 'Tre ore verso i Pirenei, per sciare o per fare shopping.',
      body: [
        `Andorra dista circa tre ore da Barcellona, con una salita costante verso i Pirenei. È una meta abituale in inverno per le stazioni sciistiche e tutto l'anno per lo shopping duty-free.`,
        `Il percorso attraversa una frontiera internazionale. Porti il passaporto o la carta d'identità nazionale per tutti i viaggiatori: i controlli sono di solito rapidi, ma ci sono, e farsi respingere è un modo costoso di scoprirlo.`,
        `In inverno l'ultima salita può richiedere catene o pneumatici invernali. Assegniamo un veicolo attrezzato per le condizioni, invece di mandare una normale auto cittadina su una montagna a febbraio.`,
        `Per i gruppi di sciatori la V-Class trasporta sette persone con i bagagli, ma sci e snowboard vanno dichiarati al momento della prenotazione, così assegniamo il veicolo giusto. È una tratta a prezzo fisso, comunicato prima del viaggio.`,
      ],
    },
    'la-molina': {
      place: 'La Molina',
      route: 'Barcellona a La Molina',
      blurb: 'Stazione sciistica dei Pirenei, a circa due ore di distanza.',
    },
    'vall-de-nuria': {
      place: 'Vall de Núria',
      route: 'Barcellona a Vall de Núria',
      blurb: 'Santuario di montagna raggiungibile in cremagliera.',
    },
    'baqueira-beret': {
      place: 'Baqueira Beret',
      route: 'Barcellona a Baqueira Beret',
      blurb: 'Il più grande comprensorio sciistico dei Pirenei spagnoli.',
    },
    valencia: {
      place: 'Valencia',
      route: 'Barcellona a Valencia',
      blurb: 'Tre ore e mezza lungo la costa, porta a porta.',
      body: [
        `Valencia dista circa 350 km da Barcellona, circa tre ore e mezza di autostrada. È un transfer lungo e, per la maggior parte dei viaggiatori, il treno AVE è la scelta sensata.`,
        `Un'auto privata ha senso in situazioni precise: un gruppo di sei o sette persone per cui i singoli biglietti del treno si sommano, un arrivo troppo tardi per l'ultimo treno, bagagli o attrezzature che viaggiano male in treno, oppure la necessità di andare porta a porta a entrambe le estremità.`,
        `La portiamo direttamente con una sosta di riposo e possiamo lasciarla a qualsiasi indirizzo della città, al porto per una crociera o all'aeroporto di Valencia.`,
        `È sempre un viaggio a prezzo fisso comunicato in anticipo. Ci scriva con le sue date e il numero di persone e glielo confermeremo.`,
      ],
    },
    'la-roca-village': {
      place: 'La Roca Village',
      route: 'La Roca Village',
      blurb: 'Il villaggio degli outlet, a circa 40 minuti a nord.',
      body: [
        `La Roca Village è un outlet di marchi di design a circa 40 minuti a nord di Barcellona e una delle destinazioni non aeroportuali più richieste che serviamo.`,
        `La navetta dalla città funziona abbastanza bene, ma la vincola a un orario di ritorno fisso, il vincolo sbagliato per una giornata di shopping. Un'auto privata la aspetta.`,
        `La maggior parte delle prenotazioni è un andata e ritorno con attesa, di solito da tre a cinque ore. Lo calcoliamo come un unico viaggio comprensivo dell'attesa, e al ritorno c'è spazio per le borse.`,
        `Il villaggio è fuori dall'area metropolitana di Barcellona, quindi il prezzo è fisso e confermato prima del viaggio.`,
      ],
    },
    alicante: {
      place: 'Alicante',
      route: 'Barcellona a Alicante',
      blurb: 'Costa Blanca, a circa cinque ore verso sud.',
    },
    zaragoza: {
      place: 'Saragozza',
      route: 'Barcellona a Saragozza',
      blurb: "Capoluogo dell'Aragona, a circa tre ore nell'entroterra.",
    },
    madrid: {
      place: 'Madrid',
      route: 'Barcellona a Madrid',
      blurb: 'Tratta a lunga distanza fino alla capitale.',
    },
    marbella: {
      place: 'Marbella',
      route: 'Barcellona a Marbella',
      blurb: "Costa del Sol, un viaggio di un'intera giornata.",
    },
    malaga: {
      place: 'Malaga',
      route: 'Barcellona a Malaga',
      blurb: 'Costa andalusa, transfer a lunga distanza.',
    },
  },
  groups: {
    'costa-brava': {
      title: 'Transfer sulla Costa Brava',
      intro:
        'Transfer privati da Barcellona a Girona, Lloret de Mar, Tossa de Mar, Blanes, Cadaqués e al resto della Costa Brava.',
    },
    'south-and-theme-parks': {
      title: 'A sud di Barcellona e parchi divertimenti',
      intro:
        'Transfer in taxi e minivan per Sitges, Tarragona, Salou, PortAventura, Cambrils e la costa a sud della città.',
    },
    'mountains-and-ski': {
      title: 'Transfer per montagna, natura e sci',
      intro:
        'Autisti privati per Montserrat, Andorra, le stazioni sciistiche e i villaggi di montagna, comprese le gite in giornata flessibili.',
    },
    'long-distance': {
      title: 'Transfer a lunga distanza',
      intro:
        'Transfer privati diretti in taxi e minivan da Barcellona alle principali città spagnole.',
    },
  },
};
