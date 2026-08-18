import type { LandingCopy } from '../landing-pages';

/** Italian long-form copy for the keyword landing pages. */
export const IT_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Aeroporto Barcellona Centro | Prenota Online',
    description:
      "Prenota un taxi dall'aeroporto di Barcellona al centro. Tariffa ufficiale del tassametro AMB, supplemento El Prat incluso nella stima, autista in sala arrivi.",
    h1: "Taxi dall'aeroporto di Barcellona al centro",
    intro:
      "Un taxi da El Prat al centro di Barcellona impiega dai 25 ai 35 minuti a seconda del traffico e del terminal di arrivo. Prenotare in anticipo significa avere già un autista assegnato all'atterraggio, con il cartello con il tuo nome in sala arrivi, invece di mettersi in coda al posteggio del T1 o del T2.",
    sections: [
      {
        h2: "Quanto costa un transfer dall'aeroporto di Barcellona",
        body: "La tariffa è quella del tassametro ufficiale dell'AMB. Da El Prat paghi l'importo del tassametro più il supplemento fisso aeroportuale, e per le corse molto brevi in partenza dall'aeroporto vale una tariffa minima. In pratica una corsa dall'aeroporto al centro di Barcellona si aggira di solito tra i trentacinque e i quarantacinque euro, di più di notte e nei fine settimana quando si applica la tariffa T-2. Inserisci sopra la destinazione esatta per una stima precisa.",
      },
      {
        h2: 'Dove ti aspetta il tuo autista',
        body: "Il tuo autista attende all'interno della sala arrivi del tuo terminal con un cartello con il tuo nome e segue il numero del volo: un ritardo non ti fa perdere l'auto. Il punto d'incontro esatto per T1 e T2 è indicato nell'email di conferma.",
      },
      {
        h2: 'Terminal 1 e Terminal 2',
        body: "Entrambi i terminal hanno un posteggio taxi ufficiale e i nostri autisti servono entrambi. Il T1 concentra i voli a lungo raggio e gran parte di Vueling; il T2 serve molte compagnie low cost. La differenza di prezzo è modesta, un paio di chilometri, anche se il T1 è leggermente più lontano dalla città.",
      },
    ],
  },

  'city-to-airport': {
    title: "Taxi da Barcellona all'Aeroporto | Prenota Online",
    description:
      "Prenota un taxi da Barcellona città all'aeroporto di El Prat. Orario di ritiro fisso, tariffa ufficiale del tassametro e autisti che conoscono gli ingressi dei terminal.",
    h1: "Taxi da Barcellona all'aeroporto",
    intro:
      "È la corsa di andata quella che conviene davvero prenotare. Un taxi prenotato in anticipo arriva al tuo hotel o appartamento a un orario fissato, cosa che conta molto di più quando devi prendere un volo che non quando stai arrivando.",
    sections: [
      {
        h2: 'Quando prenotare il ritiro',
        body: "Per un volo europeo a corto raggio calcola due ore tra l'arrivo a El Prat e la partenza; per il lungo raggio tre. Aggiungi 30-40 minuti di percorso dal centro di Barcellona, di più nelle ore di punta infrasettimanali. Il nostro modulo richiede almeno tre ore di preavviso: prenota quindi al più tardi la sera prima.",
      },
      {
        h2: 'Discesa al terminal giusto',
        body: "Dicci la compagnia aerea e ti lasciamo alla porta corretta. Le partenze del T1 sono un'unica grande sala; il T2 è diviso nei blocchi A, B e C, e scendere al blocco sbagliato significa una lunga camminata con i bagagli.",
      },
      {
        h2: 'Partenze di primo mattino',
        body: "La prima ondata di partenze lascia El Prat prima delle 07:00, il che comporta ritiri dalle 04:30. Queste corse rientrano nella tariffa notturna T-2, e confermiamo l'autista la sera prima perché alle quattro del mattino non resti nulla da organizzare.",
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aeroporto El Prat | Transfer Autorizzati',
    description:
      "Taxi autorizzati da e per l'aeroporto di Barcellona-El Prat (BCN). Prenota online con stima secondo la tariffa ufficiale AMB e autista assegnato al tuo volo.",
    h1: 'Taxi aeroporto El Prat',
    intro:
      "L'aeroporto Josep Tarradellas Barcellona-El Prat, che quasi tutti continuano a chiamare semplicemente El Prat, si trova a circa 15 km a sud-ovest della città. È il secondo scalo spagnolo per traffico, e il taxi è il modo più rapido per raggiungere Barcellona a quasi qualsiasi ora, a patto che un'auto sia già lì ad aspettare.",
    sections: [
      {
        h2: 'Prenotare invece di fare la coda',
        body: "Il posteggio ufficiale di El Prat è ben gestito e di solito scorre veloce. Si intasa in momenti prevedibili: le ondate di arrivi di metà mattina, le domeniche sera e quando atterrano più voli intercontinentali insieme. Prenotare elimina del tutto questo rischio e fissa il tuo autista in anticipo, alla stessa tariffa del tassametro.",
      },
      {
        h2: 'Il supplemento aeroportuale',
        body: "Ogni corsa che inizia o termina a El Prat prevede un supplemento aeroportuale fisso stabilito dall'AMB, e le corse in partenza dall'aeroporto hanno una tariffa minima. Entrambi sono già inclusi nella stima che vedi prima di prenotare: nessuna sorpresa al tassametro.",
      },
      {
        h2: 'Passeggeri delle crociere',
        body: "Per chi si collega a una crociera, il tragitto tra El Prat e il terminal crociere del Moll Adossat ha un proprio prezzo chiuso ufficiale, invece del tassametro. Inserisci il terminal crociere come destinazione e la stima passa automaticamente a quel prezzo fisso.",
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Prezzo Taxi Aeroporto Barcellona | Tariffe AMB 2026',
    description:
      "Quanto costa davvero un taxi per l'aeroporto di Barcellona: tabella ufficiale AMB, supplemento El Prat, tariffa minima aeroportuale e la nostra commissione.",
    h1: "Prezzo del taxi per l'aeroporto di Barcellona",
    intro:
      "I prezzi dei taxi a Barcellona sono regolamentati. Nessun taxi autorizzato può chiedere più o meno del tassametro ufficiale dell'AMB, il che significa che la risposta onesta a «quanto costa» è un calcolo, non una cifra commerciale. Ecco come funziona esattamente quel calcolo.",
    sections: [
      {
        h2: 'Come si calcola la tua tariffa',
        body: "Ogni corsa parte da uno scatto iniziale fisso e poi somma un prezzo al chilometro. Quale tariffa si applica dipende da quando viaggi: la T-1 è la tariffa diurna dal lunedì al venerdì tra le 08:00 e le 20:00, mentre la T-2, più alta, copre le notti, tutto il sabato e la domenica e i giorni festivi. I supplementi per aeroporto, porto crociere, stazione di Sants e Fira Gran Via si aggiungono, entro un massimo per servizio.",
      },
      {
        h2: "Esiste un taxi economico dall'aeroporto?",
        body: "Non nel senso che un operatore possa costare meno di un altro: il tassametro dell'AMB è identico su ogni taxi autorizzato, quindi nessuno può legalmente essere più economico sulla corsa. Quello che puoi controllare sono orario e veicolo. Viaggiare nella fascia diurna T-1 costa sensibilmente meno al chilometro che di notte o nel fine settimana, e in quattro una sola auto batte quattro biglietti separati. Diffida di chi pubblicizza tariffe molto sotto il tassametro: di solito segnala un veicolo non autorizzato.",
      },
      {
        h2: 'La tariffa minima aeroportuale',
        body: "Le corse che partono da El Prat hanno una tariffa minima. Se su un tragitto breve il tassametro segna meno di quel minimo, paghi il minimo. Riguarda soprattutto gli spostamenti verso El Prat paese o gli hotel vicini, non le corse verso Barcellona.",
      },
      {
        h2: 'Quello che addebitiamo noi',
        body: "La nostra commissione di prenotazione è una percentuale della corsa, pagata online al momento della prenotazione: 20% dal lunedì al venerdì e 25% nei fine settimana, nei festivi e nelle notti speciali. È un corrispettivo per il servizio di organizzare il viaggio, non una maggiorazione della tariffa, e non compare mai sul tassametro. La vedi come voce separata prima di pagare e ne ricevi ricevuta a parte. Puoi anche prepagare l'intero viaggio a prezzo chiuso: in quel caso in taxi non resta nulla da pagare.",
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcellona Aeroporto | Porta a Porta',
    description:
      "Prenota un taxi dal tuo hotel di Barcellona all'aeroporto di El Prat, o dall'aeroporto fino alla porta del tuo hotel. Porta a porta, autorizzato, a tariffa ufficiale.",
    h1: 'Transfer hotel-aeroporto a Barcellona',
    intro:
      "La maggior parte delle nostre prenotazioni sono transfer da hotel, in entrambe le direzioni. Un taxi porta a porta elimina la parte del viaggio che si sottovaluta di più: portare i bagagli dalla hall fino a un posteggio, o trovare l'indirizzo giusto dopo un volo lungo.",
    sections: [
      {
        h2: "Taxi dall'hotel all'aeroporto",
        body: "Dacci il nome dell'hotel e pensiamo a tutto noi. Nelle vie strette del Quartiere Gotico e del Born, dove le auto non sempre arrivano all'ingresso, concordiamo in anticipo il punto di ritiro accessibile più vicino invece di lasciarlo al caso il giorno stesso.",
      },
      {
        h2: "Transfer dall'aeroporto all'hotel",
        body: "Nella direzione opposta il tuo autista ti accoglie in sala arrivi con il cartello e ti porta direttamente all'ingresso dell'hotel. Prezioso con bambini, bagagli pesanti o un atterraggio a tarda notte.",
      },
      {
        h2: 'Appartamenti e case vacanza',
        body: "Lo stesso vale per gli appartamenti in affitto breve e gli indirizzi Airbnb. Aggiungi il codice del portone o l'ingresso preciso nelle note della prenotazione e il tuo autista lo avrà prima del ritiro.",
      },
    ],
  },

  'sants-station-to-airport': {
    title: "Taxi Stazione di Sants all'Aeroporto di Barcellona",
    description:
      "Prenota un taxi dalla stazione di Barcellona-Sants all'aeroporto di El Prat. Circa 15 minuti, tariffa ufficiale con supplemento stazione incluso.",
    h1: "Taxi dalla stazione di Sants all'aeroporto",
    intro:
      "Sants è la principale stazione ferroviaria di Barcellona e il punto d'arrivo degli AVE da Madrid, Valencia e Siviglia. È anche il grande nodo di trasporto più vicino a El Prat: la corsa in taxi dura circa 15 minuti fuori dalle ore di punta.",
    sections: [
      {
        h2: 'Il supplemento della stazione di Sants',
        body: "Le corse che iniziano o terminano alla stazione di Sants prevedono un piccolo supplemento fisso stabilito dall'AMB, oltre alla tariffa del tassametro. Insieme al supplemento aeroportuale, entrambi sono inclusi nella stima che vedi prima di prenotare, e il totale dei supplementi ha un tetto per servizio.",
      },
      {
        h2: 'Dove trovare il tuo autista',
        body: "Il posteggio ufficiale si trova sul lato di plaça dels Països Catalans. Per un transfer prenotato fissiamo un punto d'incontro preciso al momento della prenotazione, cosa che a Sants conviene: è una stazione grande con diverse uscite.",
      },
      {
        h2: "Coincidenze dall'AVE",
        body: "Se arrivi con un AVE, fissa il ritiro una quindicina di minuti dopo l'orario previsto, così da avere margine dal binario alla strada con i bagagli.",
      },
    ],
  },

  'private-transfer': {
    title: 'Transfer Privato Aeroporto Barcellona | Taxi Esclusivo',
    description:
      "Un transfer privato dall'aeroporto di Barcellona: il tuo taxi autorizzato solo per te, senza condivisioni né attese di altri passeggeri, a tariffa ufficiale AMB.",
    h1: 'Transfer privato aeroporto di Barcellona',
    intro:
      "Tutte le prenotazioni qui sono transfer privati. Il veicolo è solo tuo: nessuna navetta condivisa, nessuna deviazione per raccogliere altri passeggeri, nessun orario imposto. Vai diretto dal punto di ritiro alla destinazione.",
    sections: [
      {
        h2: 'Privato o navetta condivisa',
        body: "Le navette condivise costano meno a persona, ma raccolgono più gruppi e li lasciano in sequenza, il che può aggiungere un'ora a un tragitto di 30 minuti. Da due viaggiatori in su la differenza di prezzo si assottiglia molto, e per una famiglia con bagagli il taxi privato è di solito insieme più rapido e più semplice.",
      },
      {
        h2: 'Scelta del veicolo',
        body: "Taxi standard fino a quattro passeggeri, Mercedes Vito per sei, V-Class per sette con bagagli adeguati. La tariffa del tassametro non cambia con la dimensione del veicolo, perché la fissa l'AMB: scegli quindi in base a capienza e comfort.",
      },
      {
        h2: 'Viaggi di lavoro',
        body: "Per le trasferte possiamo assegnare la V-Class e fornire la fattura del taxi per la nota spese. Chiedi la fattura del tassametro al tuo autista in auto; la ricevuta della commissione di prenotazione ti arriva separatamente via email.",
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24 Ore Aeroporto Barcellona | Transfer Notturni',
    description:
      "Servizio taxi 24 ore su 24 all'aeroporto di Barcellona. Prenota atterraggi notturni e partenze prima dell'alba alla tariffa notturna ufficiale dell'AMB.",
    h1: "Taxi 24 ore all'aeroporto di Barcellona",
    intro:
      "El Prat funziona ventiquattro ore su ventiquattro, e così il servizio taxi. Le ore che vale davvero la pena prenotare sono le più scomode: gli atterraggi dopo mezzanotte e le partenze che richiedono un ritiro prima dell'alba.",
    sections: [
      {
        h2: 'La tariffa notturna',
        body: "Tra le 20:00 e le 08:00, per tutto il fine settimana e nei festivi si applica la tariffa più alta T-2. La stabilisce l'AMB e vale allo stesso modo per ogni taxi autorizzato di Barcellona: non è una maggiorazione nostra. La tua stima usa automaticamente la tariffa corretta in base all'orario reale di ritiro. Le notti di Natale e di Capodanno prevedono inoltre un supplemento ufficiale.",
      },
      {
        h2: 'Arrivi in tarda notte',
        body: "Se il tuo volo atterra all'una, il posteggio di El Prat è ancora attivo, ma la copertura si assottiglia con l'avanzare della notte. Un'auto prenotata con il numero del volo associato è la differenza tra uscire subito e restare ad aspettare.",
      },
      {
        h2: "Partenze prima dell'alba",
        body: "I ritiri dalle 04:00 sono routine per noi. Prenota al più tardi la sera prima e ti confermiamo l'autista via email, così a quell'ora non resta nulla da organizzare.",
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: "Taxi Quartiere Gotico all'Aeroporto di Barcellona",
    description:
      "Prenota un taxi dal Quartiere Gotico all'aeroporto di Barcellona. Concordiamo in anticipo un punto accessibile: quasi tutte le vie del Barri Gòtic sono troppo strette.",
    h1: "Taxi dal Quartiere Gotico all'aeroporto",
    intro:
      "Il Barri Gòtic è la zona di Barcellona in cui prenotare in anticipo cambia davvero l'esperienza. Gran parte del quartiere è pedonale o troppo stretta per un'auto: la domanda quindi non è quando arriva il taxi, ma dove può effettivamente raggiungerti.",
    sections: [
      {
        h2: 'Punti di ritiro praticabili',
        body: "Concordiamo un punto accessibile preciso al momento della prenotazione: di solito Via Laietana, plaça de la Catedral, il Passeig de Colom o il lato Rambla, a seconda dell'indirizzo. Il tuo autista aspetta lì e ti aiuta con i bagagli dall'angolo, invece di girare in vicoli in cui non può entrare.",
      },
      {
        h2: 'Tempi di percorrenza verso El Prat',
        body: "Dal Quartiere Gotico all'aeroporto sono circa 20-30 minuti fuori dalle ore di punta, lungo la Ronda Litoral. Metti in conto più tempo nelle mattine infrasettimanali e durante i cambi crociera in porto.",
      },
      {
        h2: 'Arrivare nel quartiere',
        body: "Dall'aeroporto vale lo stesso vincolo al contrario. Dacci l'indirizzo esatto e ti lasceremo il più vicino possibile a quanto consentito, indicandoti i pochi metri a piedi fino al portone.",
      },
    ],
  },

  'neighborhoods/eixample': {
    title: "Taxi Eixample all'Aeroporto di Barcellona",
    description:
      "Prenota un taxi dall'Eixample all'aeroporto di Barcellona-El Prat. Ritiro porta a porta sulla scacchiera, a tariffa ufficiale dell'AMB.",
    h1: "Taxi dall'Eixample all'aeroporto di Barcellona",
    intro:
      "L'Eixample è il quartiere più comodo di Barcellona per un ritiro in taxi. La scacchiera di Cerdà rende quasi ogni indirizzo raggiungibile in auto, con lo spazio per fermarsi e caricare i bagagli: esattamente il contrario della città vecchia.",
    sections: [
      {
        h2: 'Ritiro porta a porta',
        body: "Dacci via e numero civico e il tuo autista sarà davanti al portone. Gli angoli smussati degli isolati dell'Eixample sono punti di carico comodi e sicuri se il tuo indirizzo cade su un tratto trafficato di Aragó o Balmes.",
      },
      {
        h2: 'Tempi di percorrenza',
        body: "Dall'Eixample a El Prat sono di norma 25-35 minuti. Dalla Dreta de l'Eixample e dalla zona della Sagrada Família un po' di più; dagli isolati vicini a Sants e plaça d'Espanya un po' di meno.",
      },
      {
        h2: 'Gli hotel del quartiere',
        body: "L'Eixample concentra buona parte degli hotel di Barcellona, compresi quasi tutti quelli del Passeig de Gràcia. Scrivi il nome dell'hotel invece dell'indirizzo e lo troviamo noi.",
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: "Taxi Centro di Barcellona all'Aeroporto",
    description:
      "Prenota un taxi dal centro di Barcellona all'aeroporto di El Prat. Ritiro a qualsiasi indirizzo centrale, tariffa ufficiale e autista confermato in anticipo.",
    h1: "Taxi dal centro di Barcellona all'aeroporto",
    intro:
      "Da qualsiasi punto centrale — la Rambla, plaça de Catalunya, il Born, il Raval o il Passeig de Gràcia — El Prat dista 20-35 minuti d'auto. Prenotare fissa l'orario di ritiro e il veicolo, cosa che conta soprattutto sulla corsa di andata.",
    sections: [
      {
        h2: 'Punti di ritiro in centro',
        body: "Le ampie vie centrali consentono il ritiro direttamente davanti al portone. Per gli indirizzi dentro le zone pedonali concordiamo l'angolo accessibile più vicino al momento della prenotazione, così il giorno stesso non si improvvisa nulla.",
      },
      {
        h2: 'Traffico e margini',
        body: "Nei giorni feriali tra le 08:00 e le 09:30 e dalle 18:00 in poi le ronde rallentano sensibilmente. La nostra stima include un tempo di percorrenza realistico, ma per un volo mattutino prenota il ritiro con un margine.",
      },
      {
        h2: 'Quanto costa la corsa',
        body: "L'importo del tassametro dal centro fino a El Prat, più il supplemento aeroportuale fisso. Di notte e nei fine settimana vale la tariffa più alta T-2. Inserisci il tuo indirizzo per una stima esatta prima di decidere.",
      },
    ],
  },

  'book-online': {
    title: 'Prenota Taxi Aeroporto Barcellona Online | Prezzo Subito',
    description:
      "Prenota in pochi minuti un taxi per l'aeroporto di Barcellona. Stima immediata con tariffe ufficiali AMB, pagamento sicuro e conferma istantanea via email.",
    h1: "Prenotare un taxi per l'aeroporto di Barcellona online",
    intro:
      "Prenotare online richiede un paio di minuti e ti garantisce un'auto confermata con autista assegnato. Paga adesso solo la commissione di prenotazione e salda il tassametro con l'autista, oppure prepaga l'intero viaggio a prezzo chiuso e in taxi non dovrai nulla.",
    sections: [
      {
        h2: 'Cosa serve per prenotare',
        body: "L'indirizzo di ritiro, la destinazione, data e ora e un numero di telefono. Per i ritiri in aeroporto aggiungi il numero del volo così che l'autista possa seguire l'atterraggio. Le prenotazioni richiedono almeno tre ore di preavviso; per qualcosa di più ravvicinato scrivici su WhatsApp.",
      },
      {
        h2: 'Cosa succede dopo',
        body: "Ricevi subito un'email di conferma con percorso, veicolo, stima della tariffa e ricevuta di quanto hai pagato online. Successivamente viene assegnato un autista e ti inviamo i suoi dati prima del viaggio.",
      },
      {
        h2: 'Modifiche e cancellazioni',
        body: "I piani cambiano. Cancella con almeno 24 ore di anticipo e la commissione di prenotazione viene rimborsata per intero. Per spostare una prenotazione rispondi all'email di conferma e la riprogrammiamo.",
      },
    ],
  },
};
