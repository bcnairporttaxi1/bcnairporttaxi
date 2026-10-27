import type { LandingCopy } from '../landing-pages';

/** Italian long-form copy for the keyword landing pages. */
export const IT_LANDING_COPY: Record<string, LandingCopy> = {
  'airport-to-city': {
    title: 'Taxi Aeroporto Barcellona Centro | Prenoti Online',
    description:
      "Prenoti un taxi dall'aeroporto di Barcellona al centro. Prezzo fisso tutto incluso, supplemento El Prat già compreso, autista in sala arrivi.",
    h1: "Taxi dall'aeroporto di Barcellona al centro",
    intro:
      "Un taxi da El Prat al centro di Barcellona impiega dai 25 ai 35 minuti a seconda del traffico e del terminal di arrivo. Prenotare in anticipo significa avere già un autista assegnato all'atterraggio, con il cartello con il suo nome in sala arrivi, invece di mettersi in coda al posteggio del T1 o del T2.",
    sections: [
      {
        h2: "Quanto costa un transfer dall'aeroporto di Barcellona",
        body: "Il suo prezzo è una cifra fissa del nostro listino, non una lettura del tassametro e non una stima: ogni supplemento previsto per il percorso è già compreso. Una corsa dall'aeroporto a qualsiasi punto di Barcellona costa 50 € fissi in taxi standard, qualunque sia la distanza e qualunque sia l'ora; nei fine settimana e nei festivi si aggiunge il 7,5 %. Inserisca qui sopra la destinazione esatta per vedere il suo prezzo tutto incluso.",
      },
      {
        h2: 'Dove la aspetta il suo autista in sala arrivi',
        body: "Il suo autista attende all'interno della sala arrivi del suo terminal con un cartello con il suo nome e segue il numero del volo: un atterraggio in ritardo non le fa perdere l'auto. Il punto d'incontro esatto per T1 e T2 è indicato nell'email di conferma.",
      },
      {
        h2: 'Terminal 1 e Terminal 2',
        body: "Entrambi i terminal hanno un posteggio taxi e i nostri autisti servono entrambi. Il T1 concentra i voli a lungo raggio e gran parte di Vueling; il T2 serve molte compagnie low cost. La differenza di prezzo è modesta, un paio di chilometri, anche se il T1 è leggermente più lontano dalla città.",
      },
      {
        h2: 'Fin dove arriva il prezzo di 50 €',
        body: "Un solo prezzo copre qualsiasi indirizzo entro 16 km dal terminal, misurati in linea retta e non lungo la strada. Comprende tutto il centro e quasi ogni zona in cui alloggia un visitatore: Ciutat Vella, l'Eixample, Gràcia, Sants, il lungomare fino a Barceloneta e Poblenou, e il Park Güell sopra Gràcia, a 14,3 km, tutto allo stesso prezzo di un hotel sul Passeig de Gràcia. La misura in linea retta lavora a suo favore, perché la strada verso la città è decisamente più lunga della linea diretta: deve aggirare il Llobregat ed entrare lungo la Gran Via, quindi una zona tracciata sul percorso lascerebbe il centro fuori. Le periferie nord ed est sono dove la zona finisce: La Sagrera a 16,4 km, il Fòrum a 17,4, Sant Andreu a 17,7 e Nou Barris a 17,9 ne restano fuori, come Sant Cugat a 19,4 e Badalona a 21,8, e tutte pagano il prezzo di listino più 1,50 € per ogni chilometro in più.",
      },
      {
        h2: 'Taxi, Aerobús o metro per entrare in città',
        body: "L'Aerobús si paga a persona e il taxi a auto, e questo risolve gran parte della questione prima di ogni altra cosa. Se viaggia da solo con il solo bagaglio a mano, l'autobus conviene di più e di molto; con tre passeggeri il divario si è ridotto, con quattro di solito è sparito. La linea 9 Sud della metropolitana costa meno di entrambi, ma richiede un cambio, accettabile con una valigia a testa e molto meno con due. La regola onesta: conti le persone e conti i bagagli. Una o due persone e altrettanti bagagli, di giorno, prenda l'autobus. Tre o più persone, oppure due valigie a testa, oppure un arrivo dopo l'ultima corsa degli autobus: prenda un taxi.",
      },
    ],
  },

  'city-to-airport': {
    title: "Taxi da Barcellona all'Aeroporto | Prenoti Online",
    description:
      "Prenoti un taxi da Barcellona all'aeroporto di El Prat. Orario di ritiro fisso, un prezzo fisso tutto incluso e un autista esperto dei terminal.",
    h1: "Taxi da Barcellona all'aeroporto",
    intro:
      "È la corsa di andata quella che conviene davvero prenotare. Un taxi prenotato in anticipo arriva al suo hotel o appartamento a un orario fissato, cosa che conta molto di più quando deve prendere un volo che non quando sta arrivando.",
    sections: [
      {
        h2: 'Quando prenotare il taxi da Barcellona all’aeroporto',
        body: "Per un volo europeo a corto raggio calcoli due ore tra l'arrivo a El Prat e la partenza; per il lungo raggio tre. Aggiunga 30-40 minuti di percorso dal centro di Barcellona, di più nelle ore di punta infrasettimanali. Il nostro modulo richiede almeno tre ore di preavviso: prenoti quindi al più tardi la sera prima.",
      },
      {
        h2: 'Punti di discesa al terminal dell’aeroporto',
        body: "Ci dica la compagnia aerea e la lasciamo alla porta corretta. Le partenze del T1 sono un'unica grande sala; il T2 è diviso nei blocchi A, B e C, e scendere al blocco sbagliato significa una lunga camminata con i bagagli.",
      },
      {
        h2: 'Taxi di primo mattino da Barcellona a El Prat',
        body: "La prima ondata di partenze lascia El Prat prima delle 07:00, il che comporta ritiri dalle 04:30. Un ritiro alle 04:30 costa esattamente come la stessa corsa a mezzogiorno, perché l'ora non muove un prezzo fisso, e confermiamo l'autista la sera prima così alle quattro del mattino non resta nessuna incertezza.",
      },
      {
        h2: 'Controlli il terminal sulla carta d’imbarco, non sulla prenotazione',
        body: "T1 e T2 non sono collegati a piedi. Si trovano ai lati opposti delle piste, uniti da una navetta gratuita che impiega da 10 a 15 minuti senza contare l'attesa: calcoli 25 minuti porta a porta. In partenza è molto più importante che in arrivo: farsi lasciare al terminal sbagliato significa accorgersene a un banco check-in che non ha il suo volo. Le compagnie cambiano terminal quando cambiano i contratti, e un codeshare segue il vettore operativo e non la compagnia indicata nella conferma, quindi il terminal stampato sulla carta d'imbarco è l'unica fonte di cui fidarsi. Se non corrisponde a quanto ci ha indicato, risponda alla conferma e lo modificheremo gratuitamente.",
      },
      {
        h2: 'Se i suoi piani cambiano prima del ritiro',
        body: "Può modificare i dati da solo entro 30 minuti dalla prenotazione, e dopo fino a quando il suo autista non è partito: risponda alla conferma o ci scriva su WhatsApp. Spostare un orario, un terminal o un indirizzo non costa nulla, e un terminal sbagliato è la correzione più frequente. Se il viaggio salta del tutto, annulli almeno 24 ore prima del ritiro e l'intero importo viene rimborsato sulla carta con cui ha pagato, di norma entro cinque-dieci giorni lavorativi. Entro quelle 24 ore cercheremo comunque di aiutarla, ma il rimborso non è più automatico.",
      },
      {
        h2: 'Scegliere il veicolo con molti bagagli',
        body: "Conti le valigie prima di scegliere. Un taxi a quattro posti porta circa tre valigie grandi, la Vito a sei posti ne porta sei e la V-Class a sette posti ne porta sette. Una partenza con molti bagagli è l'unico caso in cui un veicolo più grande vale i 20-25 € in più, perché l'alternativa è arrivare al terminal con una valigia sulle ginocchia.",
      },
    ],
  },

  'el-prat-airport-taxi': {
    title: 'Taxi Aeroporto El Prat | Transfer Autorizzati',
    description:
      "Taxi autorizzati da e per l'aeroporto di Barcellona-El Prat (BCN). Prenoti online a un prezzo fisso tutto incluso, con un autista assegnato al suo volo.",
    h1: 'Taxi aeroporto El Prat',
    intro:
      "L'aeroporto Josep Tarradellas Barcellona-El Prat, che quasi tutti continuano a chiamare semplicemente El Prat, si trova a circa 15 km a sud-ovest della città. È il secondo scalo spagnolo per traffico, e il taxi è il modo più rapido per raggiungere Barcellona a quasi qualsiasi ora, a patto che un'auto sia già lì ad aspettare.",
    sections: [
      {
        h2: 'Prenotare un taxi per l’aeroporto di Barcellona invece del posteggio',
        body: "Il posteggio di El Prat è ben gestito e di solito scorre veloce. Si intasa in momenti prevedibili: le ondate di arrivi di metà mattina, le domeniche sera e quando atterrano più voli intercontinentali insieme. Prenotare elimina del tutto questo rischio, fissa il suo autista in anticipo e fissa il prezzo prima del viaggio.",
      },
      {
        h2: 'Il supplemento aeroportuale di El Prat',
        body: "Il supplemento aeroportuale e ogni altro onere previsto per il percorso sono dentro il prezzo fisso che le indichiamo. Non c'è nessun tassametro in moto durante la corsa né una seconda cifra alla fine, quindi non ci sono sorprese.",
      },
      {
        h2: 'Passeggeri delle crociere e il porto',
        body: "Per chi si collega a una crociera, il tragitto tra El Prat e il terminal crociere del Moll Adossat ha un proprio prezzo fisso, indicato separatamente dal prezzo città. Inserisca il terminal crociere come destinazione e il preventivo passa automaticamente a quel prezzo.",
      },
      {
        h2: 'Quale veicolo serve per i suoi bagagli',
        body: "Scelga in base alle valigie, non al numero di persone. Un taxi a quattro posti porta quattro passeggeri ma solo circa tre valigie grandi: il bagagliaio di una Corolla o di una SEAT Toledo è il vero limite, ed è quello che si valuta più spesso male prenotando da casa. Quattro adulti con una valigia grande a testa hanno bisogno della Mercedes Vito a sei posti, che porta sei passeggeri e sei bagagli; oltre, la V-Class a sette posti ne porta sette di entrambi. Qualcosa di voluminoso, come una bicicletta, degli sci o una tavola da surf, va indicato nelle note della prenotazione e non lasciato alla speranza che basti un'auto più grande, perché a volte la risposta è un veicolo preciso e non semplicemente uno più spazioso.",
      },
      {
        h2: 'Ritiro al Terminal 1 e al Terminal 2',
        body: "Un transfer prenotato non usa il posteggio. Il suo autista attende all'interno della sala arrivi, sul lato pubblico dell'uscita dal ritiro bagagli, con un cartello con il suo nome: non sul marciapiede e non in coda. Il T2 è diviso nei blocchi A, B e C lungo la facciata dell'edificio, quindi indicare il suo blocco al momento della prenotazione fa la differenza tra un autista che si trova dove esce e uno trecento metri più avanti. L'autista segue il numero del volo, quindi un atterraggio in ritardo sposta il ritiro invece di farlo perdere, e il numero di telefono nella conferma raggiunge direttamente lui e non un ufficio.",
      },
      {
        h2: 'Arrivi in ritardo e voli ritardati',
        body: "Un ritiro prenotato segue il suo volo, non l'orario previsto. Se atterra con ore di ritardo l'autista è comunque lì, e non c'è alcun costo di attesa per un atterraggio in ritardo né nulla da rinegoziare all'arrivo. Se il volo viene cancellato del tutto, ce lo comunichi e l'intero importo viene rimborsato.",
      },
    ],
  },

  'barcelona-airport-taxi-price': {
    title: 'Prezzo Taxi Aeroporto Barcellona | Prezzi Fissi 2026',
    description:
      "Quanto costa davvero un taxi per l'aeroporto di Barcellona: i nostri prezzi fissi per veicolo, la zona a prezzo unico e le aggiunte di weekend.",
    h1: "Prezzo del taxi per l'aeroporto di Barcellona",
    intro:
      "Un transfer dall'aeroporto di Barcellona con noi è un prezzo fisso, concordato prima di prenotare e bloccato al momento della prenotazione. Nessun tassametro, nessun calcolo di distanza e nulla da saldare in auto. Questo è il listino completo e le tre cose che possono aggiungersi.",
    sections: [
      {
        h2: "Come si calcola il prezzo del taxi per l'aeroporto di Barcellona",
        body: "Un transfer è un unico prezzo fisso, definito dal veicolo e non dalla distanza o dall'orologio. Dall'aeroporto a qualsiasi punto di Barcellona è una cifra; dall'aeroporto al terminal crociere un'altra; e taxi standard, minivan a sei posti e van a sette posti hanno ciascuno la propria. Solo tre cose possono aggiungersi: una destinazione oltre la zona a prezzo unico, un transfer da o verso il molo crociere e la tariffa di fine settimana e festivi. Ognuna compare come riga a sé prima del pagamento.",
      },
      {
        h2: "Esiste un taxi economico dall'aeroporto di Barcellona?",
        body: "Confronti su ciò da cui il prezzo la protegge, non solo sulla cifra. Un prezzo fisso non si muove una volta concordato: il traffico, un percorso più lungo, un atterraggio in ritardo e l'ora del giorno sono un problema nostro, non suo, e in auto non si incassa nulla. Quello che può scegliere è il veicolo e viaggiare fuori dal fine settimana. Diffidi di un prezzo insolitamente basso: di solito indica un veicolo non autorizzato, o una cifra destinata a crescere prima del suo arrivo.",
      },
      {
        h2: 'Fin dove arriva il prezzo fisso',
        body: "Il prezzo città copre tutto ciò che si trova entro un raggio di 16 km dal terminal, cioè tutta Barcellona e i comuni immediatamente vicini: un breve tragitto a El Prat paese e una traversata della città fino al Park Güell costano lo stesso. Oltre quel raggio il prezzo fisso resta valido e si aggiungono solo i chilometri che sporgono, a una tariffa pubblicata.",
      },
      {
        h2: 'Cosa si aggiunge al prezzo',
        body: "Paga online un unico prezzo tutto incluso al momento della prenotazione. Copre il tragitto, ogni supplemento previsto per il suo percorso e il nostro servizio di prenotazione e garanzia dell'auto. Non c'è un secondo importo: in taxi non si paga nulla e riceve per email la ricevuta dell'intero prezzo.",
      },
      {
        h2: 'Cosa non cambia mai il suo prezzo',
        body: "Non l'ora del giorno: un ritiro alle 04:30 per una partenza all'alba costa esattamente come una corsa alle due del pomeriggio, perché un prezzo fisso non ha tariffa notturna. Non il traffico, il percorso scelto dall'autista, il terminal in cui atterra, il numero di passeggeri entro la capienza del veicolo né la quantità di bagagli entro i suoi limiti. Weekend e festivi sono l'unica cosa che alza un prezzo di listino, di una percentuale pubblicata e non di una maggiorazione che segue la domanda. Tutto il resto è un rischio nostro e non suo, ed è proprio ciò che si ottiene fissando il prezzo in anticipo.",
      },
      {
        h2: 'Come e quando si paga',
        body: "L'intero prezzo si paga online con carta o Bizum al momento della prenotazione, e la ricevuta dell'importo completo arriva per email con la conferma. In auto non si incassa nulla, quindi non c'è contante da cercare né un POS che speriamo funzioni sul marciapiede.",
      },
    ],
  },

  'hotel-transfers': {
    title: 'Transfer Hotel Barcellona Aeroporto | Porta a Porta',
    description:
      "Prenoti un taxi dal suo hotel di Barcellona all'aeroporto di El Prat, o dall'aeroporto alla porta dell'hotel. Porta a porta, a prezzo fisso pagato online.",
    h1: 'Transfer hotel-aeroporto a Barcellona',
    intro:
      "La maggior parte delle nostre prenotazioni sono transfer da hotel, in entrambe le direzioni. Un taxi porta a porta elimina la parte del viaggio che si sottovaluta di più: portare i bagagli dalla hall fino a un posteggio, o trovare l'indirizzo giusto dopo un volo lungo.",
    sections: [
      {
        h2: "Taxi dall'hotel all'aeroporto di Barcellona",
        body: "Ci dia il nome dell'hotel e pensiamo a tutto noi. Nelle vie strette del Quartiere Gotico e del Born, dove le auto non sempre arrivano all'ingresso, concordiamo con Lei in anticipo il punto di ritiro accessibile più vicino invece di lasciarlo al caso il giorno stesso.",
      },
      {
        h2: "Transfer dall'aeroporto all'hotel, all'arrivo",
        body: "Nella direzione opposta il suo autista la accoglie in sala arrivi con il cartello e la porta direttamente all'ingresso dell'hotel. Prezioso con bambini, bagagli pesanti o un atterraggio a tarda notte.",
      },
      {
        h2: 'Taxi dall’hotel all’aeroporto per appartamenti e case vacanza',
        body: "Lo stesso vale per gli appartamenti in affitto breve e gli indirizzi Airbnb. Aggiunga il codice del portone o l'ingresso preciso nelle note della prenotazione e il suo autista lo avrà prima del ritiro.",
      },
      {
        h2: 'Hotel in strade che un’auto non raggiunge',
        body: "Parti di Barcellona non sono percorribili fino alla porta. Gran parte del Barri Gòtic, i vicoli del Born e le strade strette sopra Gràcia sono pedonali o troppo anguste perché un taxi possa sostare, e un hotel in una di queste zone significa un punto d'incontro a pochi passi e non alla reception. Ci indichi l'hotel per nome al momento della prenotazione e fisseremo quel punto e lo inseriremo nella conferma, invece di lasciare il suo autista a girare intorno a un isolato vietato mentre Lei aspetta dentro. Per una partenza da uno di questi indirizzi preveda cinque minuti in più rispetto alla durata del viaggio.",
      },
      {
        h2: 'Il check-out e dove vanno i bagagli',
        body: "Le partenze dagli hotel si concentrano: la maggior parte dei check-out cade tra le 10:00 e le 12:00, ed è anche il momento in cui il traffico della città è meno prevedibile. Se il suo volo è nel primo pomeriggio, prenoti il ritiro all'inizio di quella fascia e non alla fine. Se ha fatto il check-out ma il ritiro è più tardi, la maggior parte degli hotel custodisce i bagagli, ed è meglio chiederlo alla reception la sera prima e non la mattina stessa. L'aiuto con le valigie in e fuori dal bagagliaio è compreso nel prezzo e non si paga mai a parte, come un'attesa ragionevole mentre salda il conto.",
      },
      {
        h2: 'Fatture per un soggiorno di lavoro',
        body: "Una ricevuta dell'importo completo le arriva con l'email di conferma, che di solito è ciò che serve a un sistema di rimborso spese e le evita di rincorrere documenti alla reception al check-out. Se ha bisogno di una fattura con IVA e i dati dell'azienda, ce li invii per email e la emetteremo con il riferimento della prenotazione. Per un soggiorno con più transfer, ce lo chieda e li fattureremo insieme invece che uno alla volta.",
      },
    ],
  },

  'sants-station-to-airport': {
    title: "Taxi Stazione di Sants all'Aeroporto di Barcellona",
    description:
      "Prenoti un taxi dalla stazione di Sants all'aeroporto di El Prat. Circa 15 minuti, un prezzo fisso tutto incluso con il supplemento della stazione.",
    h1: "Taxi dalla stazione di Sants all'aeroporto",
    intro:
      "Sants è la principale stazione ferroviaria di Barcellona e il punto d'arrivo degli AVE da Madrid, Valencia e Siviglia. È anche il grande nodo di trasporto più vicino a El Prat: la corsa in taxi dura circa 15 minuti fuori dalle ore di punta.",
    sections: [
      {
        h2: 'Il supplemento della stazione di Sants',
        body: "Le corse che iniziano o terminano alla stazione di Sants prevedono un piccolo supplemento fisso stabilito dall'AMB. Insieme al supplemento aeroportuale, entrambi sono già compresi nel prezzo che vede prima di prenotare: non c'è nulla da aggiungere dopo.",
      },
      {
        h2: 'Dove incontrare il suo autista a Sants',
        body: "Il posteggio dei taxi si trova sul lato di plaça dels Països Catalans. Per un transfer prenotato fissiamo un punto d'incontro preciso al momento della prenotazione, cosa che a Sants conviene: è una stazione grande con diverse uscite.",
      },
      {
        h2: "Coincidenze dall'AVE",
        body: "Se arriva con un AVE, fissi il ritiro una quindicina di minuti dopo l'orario previsto, così da avere margine dal binario alla strada con i bagagli.",
      },
      {
        h2: 'Treno o taxi da Sants a El Prat',
        body: "C'è un treno Rodalies da Sants all'aeroporto e, per una persona che viaggia leggera, è di gran lunga il modo più economico. Le condizioni contano: serve direttamente il T2, quindi per il T1 occorre la navetta all'arrivo, e passa con una frequenza comoda con un'ora di margine e scomoda senza. Il taxi si paga a auto e non a persona, termina alla porta del suo terminal e porta i bagagli. Per due persone con le valigie, o per chi arriva da un AVE in ritardo con un volo da prendere, di solito è l'acquisto migliore; per un viaggiatore solo con uno zaino e tempo da vendere, onestamente non lo è.",
      },
      {
        h2: 'Prevedere una coincidenza in ritardo',
        body: "Un treno a lunga percorrenza in ritardo è il motivo più comune per cui un transfer da Sants va male, ed è l'unica cosa che non possiamo seguire come seguiamo un volo. Se la sua coincidenza è stretta, prenoti il ritiro dall'arrivo previsto e non dall'orario in banchina che spera, e ci scriva su WhatsApp appena sa che il treno è in ritardo: un ritiro si può spostare mentre l'autista è ancora in strada. Sants ha diverse uscite su strade diverse, quindi il punto d'incontro nella conferma indica una porta precisa e non la stazione, che è un edificio con quattro uscite.",
      },
      {
        h2: 'A quale terminal la lasciamo',
        body: "Ci dica la compagnia aerea e la discesa è alla porta giusta del terminal. Da Sants conta più che da un hotel, perché l'alternativa in treno serve il T2 e una partenza dal T1 significa la navetta tra i terminal all'arrivo: 25 minuti porta a porta dopo l'attesa. Il taxi elimina del tutto questo tratto. Le partenze del T1 sono un'unica grande sala; il T2 è formato dai blocchi A, B e C lungo la facciata, e il blocco sbagliato è una lunga camminata con le valigie.",
      },
    ],
  },

  'private-transfer': {
    title: 'Transfer Privato Aeroporto Barcellona | Taxi Esclusivo',
    description:
      "Transfer privato dall'aeroporto di Barcellona: il suo taxi autorizzato solo per Lei, senza condivisioni né attese, a un prezzo fisso concordato prima.",
    h1: 'Transfer privato aeroporto di Barcellona',
    intro:
      "Tutte le prenotazioni qui sono transfer privati. Il veicolo è solo suo: nessuna navetta condivisa, nessuna deviazione per raccogliere altri passeggeri, nessun orario imposto. Va diretto dal punto di ritiro alla destinazione.",
    sections: [
      {
        h2: "Perché prenotare un taxi privato dall'aeroporto di Barcellona",
        body: "Le navette condivise costano meno a persona, ma raccolgono più gruppi e li lasciano in sequenza, il che può aggiungere un'ora a un tragitto di 30 minuti. Da due viaggiatori in su la differenza di prezzo si assottiglia molto, e per una famiglia con bagagli il taxi privato è di solito insieme più rapido e più semplice.",
      },
      {
        h2: 'Scelta del veicolo',
        body: "Scelga un taxi standard fino a quattro passeggeri, un minivan Mercedes Vito per sei o una V-Class per sette con bagagli adeguati. Ciascuno ha il proprio prezzo fisso, mostrato affiancato prima di prenotare, così può valutare capienza e comfort rispetto alla cifra.",
      },
      {
        h2: 'Viaggi di lavoro e fatture',
        body: "Per le trasferte possiamo assegnare la V-Class premium. La ricevuta dell'importo completo le arriva via email con la conferma, che di solito è ciò che serve per i rimborsi spese; se desidera anche la fattura ufficiale del taxi per la corsa stessa, può chiederla all'autista in auto.",
      },
      {
        h2: 'Cosa significa «privato» qui',
        body: "L'auto è sua per tutto il viaggio. Nessun altro viene preso a bordo, non c'è condivisione con un altro gruppo diretto nella stessa zona e non si aspetta al terminal che il veicolo si riempia: le tre cose che rendono più economico un transfer aeroportuale. È un taxi di Barcellona con licenza e con un autista assegnato in anticipo alla sua prenotazione, che va dal suo ritiro alla sua destinazione e da nessun'altra parte. Vale la pena in un arrivo notturno con bambini e un po' meno in un pomeriggio feriale tranquillo, da soli, e preferiamo dirlo piuttosto che far credere che ogni viaggio ne abbia bisogno.",
      },
      {
        h2: 'Gruppi troppo numerosi per una sola auto',
        body: "Oltre sette passeggeri serve più di un veicolo, e si possono prenotare insieme e non separatamente. Scelga più auto in un'unica prenotazione e vengono riservate come un solo gruppo, pagate in un unico checkout e inviate allo stesso punto di ritiro, fino a sei auto. Ciascuna è addebitata al prezzo pubblicato per la sua dimensione, quindi un gruppo di dieci sono due auto a prezzo di listino e non un preventivo su misura; e l'intero gruppo viene assegnato insieme, cosa che conta più dell'aritmetica quando dieci persone sono in una sala arrivi a mezzanotte.",
      },
      {
        h2: 'Seggiolini per bambini e richieste insolite',
        body: "I seggiolini per bambini non sono montati di serie, quindi se ne ha bisogno lo indichi nelle note della prenotazione e verrà assegnata l'auto giusta e non quella più vicina. Lo stesso vale per tutto ciò che cambia il veicolo da inviare: una sedia a rotelle ripiegata, una bicicletta, degli sci, uno strumento musicale o un animale. Con un po' di preavviso nessuno di questi è un problema, mentre sul marciapiede lo sono tutti, ed è l'intero motivo per segnalarli al momento della prenotazione.",
      },
    ],
  },

  '24-hour-taxi': {
    title: 'Taxi 24 Ore Aeroporto Barcellona | Transfer Notturni',
    description:
      "Servizio taxi 24 ore su 24 all'aeroporto di Barcellona. Prenoti in anticipo atterraggi notturni e partenze prima dell'alba, a prezzo fisso tutto incluso.",
    h1: "Taxi 24 ore all'aeroporto di Barcellona",
    intro:
      "El Prat funziona ventiquattro ore su ventiquattro, e così il servizio taxi. Le ore che vale davvero la pena prenotare in anticipo sono le più scomode: gli atterraggi dopo mezzanotte e le partenze che richiedono un ritiro prima dell'alba.",
    sections: [
      {
        h2: "Taxi per l'aeroporto di Barcellona 24 ore su 24",
        body: "Un ritiro di notte costa come la stessa corsa a mezzogiorno: l'ora non muove un prezzo fisso. I fine settimana e i festivi sì: sabato e domenica, Natale, Capodanno e il calendario catalano aggiungono il 7,5 %, indicato come riga a sé prima del pagamento invece di essere scoperto dopo. Tre notti prevedono inoltre un ulteriore supplemento regolamentato: la vigilia di Natale, la notte di San Silvestro e la Revetlla de Sant Joan del 23 giugno.",
      },
      {
        h2: 'Arrivi in tarda notte',
        body: "Se il suo volo atterra all'una, il posteggio di El Prat è ancora attivo, ma la copertura si assottiglia con l'avanzare della notte. Un'auto prenotata con il numero del volo associato è la differenza tra uscire subito e restare ad aspettare.",
      },
      {
        h2: "Partenze prima dell'alba",
        body: "I ritiri dalle 04:00 sono routine per noi. Prenoti al più tardi la sera prima e le confermiamo l'autista via email, così a quell'ora non resta nulla da organizzare.",
      },
      {
        h2: "L'ora del giorno non cambia il prezzo",
        body: "Un ritiro alle 03:00 costa come la stessa corsa alle tre del pomeriggio. È insolito al punto da meritare di essere detto chiaramente: un prezzo fisso non ha tariffa notturna, quindi non c'è una fascia che si supera alle 20:00 né una maggiorazione che compare a fine corsa per un viaggio fatto in un orario scomodo. Weekend e festivi aggiungono una percentuale pubblicata e nient'altro lo muove. Tre notti all'anno prevedono un ulteriore supplemento regolamentato — la vigilia di Natale, San Silvestro e la notte di Sant Joan del 23 giugno — e in quelle notti un prezzo prenotato con il supplemento già dentro vale più del solito.",
      },
      {
        h2: 'Il vuoto dopo l’ultimo autobus',
        body: "Tra l'ultimo Aerobús e la prima metropolitana del mattino, le opzioni pubbliche si riducono a una rete di autobus notturni molto rada, e il posteggio diventa la scelta obbligata. In una notte normale il posteggio del T1 è ben sorvegliato e scorre veloce. Va male quando tre voli in ritardo atterrano insieme in quella fascia: la coda è allora di quaranta persone e i taxi alle 02:00 sono pochi, perché gli autisti non aspettano al terminal sperando in un cliente. È lo scenario in cui arrivare con un'auto già assegnata vale chiaramente più di quanto costa, e conviene deciderlo prima di volare e non nella sala arrivi.",
      },
      {
        h2: 'Prenotare un ritiro nel cuore della notte',
        body: "Un ritiro alle 03:00 o alle 04:30 si conferma come qualsiasi altro, e confermiamo l'autista assegnato la sera prima, così non c'è incertezza nell'ora in cui l'incertezza pesa di più. Indichi un numero di cellulare acceso e, per un ritiro in aeroporto, il numero del volo: un arrivo notturno è quello che più facilmente atterra in ritardo, e seguirlo è ciò che mantiene l'auto lì.",
      },
    ],
  },

  'neighborhoods/gothic-quarter': {
    title: "Taxi Quartiere Gotico all'Aeroporto di Barcellona",
    description:
      "Prenoti un taxi dal Quartiere Gotico all'aeroporto di Barcellona. Concordiamo prima un punto di ritiro raggiungibile: le vie sono troppo strette.",
    h1: "Taxi dal Quartiere Gotico all'aeroporto di Barcellona",
    intro:
      "Il Barri Gòtic è la zona di Barcellona in cui prenotare in anticipo cambia davvero l'esperienza. Gran parte del quartiere è pedonale o troppo stretta per un'auto: la domanda quindi non è quando arriva il taxi, ma dove può effettivamente raggiungerla.",
    sections: [
      {
        h2: 'Punti di ritiro che funzionano nel Barri Gòtic',
        body: "Concordiamo un punto accessibile preciso al momento della prenotazione: di solito Via Laietana, plaça de la Catedral, il Passeig de Colom o il lato Rambla, a seconda del suo indirizzo. Il suo autista aspetta lì e la aiuta con i bagagli dall'angolo, invece di girare in vicoli in cui non può entrare.",
      },
      {
        h2: 'Tempo di percorrenza dal Quartiere Gotico a El Prat',
        body: "Dal Quartiere Gotico all'aeroporto sono circa 20-30 minuti fuori dalle ore di punta, lungo la Ronda Litoral. Metta in conto più tempo nelle mattine infrasettimanali e durante i cambi crociera in porto.",
      },
      {
        h2: 'Arrivare nel quartiere dall’aeroporto',
        body: "Dall'aeroporto vale lo stesso vincolo al contrario. Ci dia l'indirizzo esatto e la lasceremo il più vicino possibile a quanto consentito ai veicoli, indicandole i pochi metri a piedi fino al portone.",
      },
      {
        h2: 'I bagagli sul selciato',
        body: "Il tratto a piedi dal veicolo a un indirizzo del Quartiere Gotico è quasi sempre su sampietrini, e spesso con una rampa di scale all'arrivo. È breve ma scomodo con due valigie grandi, ed è la cosa più importante da prevedere qui. Dove l'indirizzo lo permette fissiamo il punto d'incontro sulla strada più vicina in cui un'auto può fermarsi legalmente e non sul punto più vicino della mappa, perché nel Barri Gòtic non coincidono. L'aiuto con i bagagli da e verso l'auto è compreso nel prezzo e non si paga mai a parte, anche se il tragitto a piedi è lungo; le scale dentro l'edificio non le risolve nessun transfer.",
      },
      {
        h2: 'Uscire dal quartiere per un volo all’alba',
        body: "Per una partenza all'alba il quartiere è tranquillo, le strade vuote e il viaggio fino a El Prat è al massimo della velocità: 20-25 minuti e non i 30-35 delle nove del mattino. Quello che non è facile alle 04:30 è trovare un taxi. Fermarne uno al volo in un vicolo pedonale prima dell'alba non funziona, e il posteggio più vicino è una camminata con i bagagli. È il caso più chiaro dell'intero sito per prenotare invece di improvvisare, e il prezzo è lo stesso della stessa corsa a mezzogiorno.",
      },
      {
        h2: 'Se la sua via è chiusa alle auto',
        body: "Parti del Barri Gòtic sono pedonali o riservate in certi orari ai residenti, quindi un autista non sempre può fermarsi all'indirizzo stesso. Ci indichi la via e la piazza più vicina che può raggiungere a piedi con i bagagli, e il punto d'incontro viene fissato sulla strada più vicina in cui un taxi può attendere legalmente e scritto nella conferma. In partenza, preveda cinque minuti in più per la camminata.",
      },
    ],
  },

  'neighborhoods/eixample': {
    title: "Taxi Eixample all'Aeroporto di Barcellona | Porta a Porta",
    description:
      "Prenoti un taxi dall'Eixample all'aeroporto di Barcellona-El Prat. Ritiro porta a porta sulla scacchiera, a un prezzo fisso.",
    h1: "Taxi dall'Eixample all'aeroporto di Barcellona",
    intro:
      "L'Eixample è il quartiere più comodo di Barcellona per un ritiro in taxi. La scacchiera di Cerdà rende quasi ogni indirizzo raggiungibile in auto, con lo spazio per fermarsi e caricare i bagagli: esattamente il contrario della città vecchia.",
    sections: [
      {
        h2: "Ritiro porta a porta sulla scacchiera dell'Eixample",
        body: "Ci dia via e numero civico e il suo autista sarà davanti al portone. Gli angoli smussati degli isolati dell'Eixample sono punti di carico comodi e sicuri se il suo indirizzo cade su un tratto trafficato di Aragó o Balmes.",
      },
      {
        h2: "Tempo di percorrenza dall'Eixample a El Prat",
        body: "Dall'Eixample a El Prat sono di norma 25-35 minuti. Dalla Dreta de l'Eixample e dalla zona della Sagrada Família un po' di più; dagli isolati vicini a Sants e plaça d'Espanya un po' di meno.",
      },
      {
        h2: 'Hotel sul Passeig de Gràcia',
        body: "L'Eixample concentra buona parte degli hotel di Barcellona, compresi quasi tutti quelli del Passeig de Gràcia. Scriva il nome dell'hotel invece dell'indirizzo e lo troviamo noi.",
      },
      {
        h2: "A quale angolo dell'isolato aspettare",
        body: "La scacchiera dell'Eixample rende facile il ritiro e ambiguo il punto d'incontro: un isolato ha quattro angoli, ciascuno su una strada diversa, e un numero civico può trovarsi a cento metri dall'incrocio in cui l'autista aspetta. Ci dia l'indirizzo completo al momento della prenotazione e non l'incrocio, e il suo autista arriverà alla porta. Dove l'angolo smussato è l'unico posto in cui è lecito fermarsi — sugli incroci più trafficati di Aragó, Balmes e Gran Via spesso lo è — la conferma indica quale.",
      },
      {
        h2: 'Il traffico in uscita dall’Eixample, secondo l’orario',
        body: "La corsa fino a El Prat dall'Eixample dura 25-35 minuti per quasi tutta la giornata e va decisamente peggio in due momenti: le mattine feriali tra le 08:00 e le 09:30, quando la Gran Via e la Ronda hanno traffico pendolare nei due sensi, e i venerdì pomeriggio dalle 17:00 circa. Dal lato della Sagrada Família aggiunga da cinque a dieci minuti; dagli isolati vicini a plaça d'Espanya ne tolga altrettanti. Un prezzo fisso assorbe tutto questo — la cifra non si muove con il traffico — ma l'orario di partenza deve comunque tenerne conto.",
      },
      {
        h2: "Arrivare dall'aeroporto nell'Eixample",
        body: "Da El Prat l'autista sceglie il più rapido tra gli accessi principali del giorno, e il prezzo non dipende da quale. Ciò che cambia negli ultimi centinaia di metri è la scacchiera a senso unico: un ritiro o una discesa sul lato opposto di un isolato può significare un giro intorno ad esso, quindi indicare il numero civico e non l'incrocio più vicino fa risparmiare qualche minuto e una breve camminata con i bagagli.",
      },
      {
        h2: 'Appartamenti con portone sulla strada',
        body: "Molti indirizzi dell'Eixample sono appartamenti e non hotel: un portone con citofono, nessuna reception e spesso nessuno che custodisca i bagagli. Indichi nelle note della prenotazione le modalità di accesso o un recapito del suo ospite, così l'autista può suonare all'arrivo invece di aspettare fuori.",
      },
    ],
  },

  'neighborhoods/city-centre': {
    title: "Taxi Centro di Barcellona all'Aeroporto",
    description:
      "Prenoti un taxi dal centro di Barcellona all'aeroporto di El Prat. Ritiro a qualsiasi indirizzo centrale, prezzo tutto incluso e autista confermato prima.",
    h1: "Taxi dal centro di Barcellona all'aeroporto",
    intro:
      "Da qualsiasi punto centrale — la Rambla, plaça de Catalunya, il Born, il Raval o il Passeig de Gràcia — El Prat dista 20-35 minuti d'auto. Prenotare fissa l'orario di ritiro e il veicolo, cosa che conta soprattutto sulla corsa di andata.",
    sections: [
      {
        h2: 'Punti di ritiro in centro',
        body: "Le ampie vie centrali consentono il ritiro direttamente davanti al portone. Per gli indirizzi dentro le zone pedonali concordiamo l'angolo accessibile più vicino al momento della prenotazione, così il giorno stesso non si improvvisa nulla.",
      },
      {
        h2: 'Traffico e tempi dal centro',
        body: "Nei giorni feriali tra le 08:00 e le 09:30 e dalle 18:00 in poi le ronde rallentano sensibilmente. La nostra stima include un tempo di percorrenza realistico, ma per un volo mattutino prenoti il ritiro con un margine.",
      },
      {
        h2: "Quanto costa un taxi dal centro all'aeroporto",
        body: "Un solo prezzo fisso da qualsiasi punto del centro fino a El Prat, con ogni supplemento già dentro e nulla da pagare in taxi. L'ora non lo cambia; nei fine settimana e nei festivi si aggiunge il 7,5 %. Inserisca il suo indirizzo per vedere il prezzo esatto prima di decidere.",
      },
      {
        h2: 'Cosa conta come centro per il prezzo fisso',
        body: "Tutto, e molto di più. Il prezzo di listino copre qualsiasi indirizzo entro 16 km dal terminal misurati in linea retta, quindi la distinzione tra il Quartiere Gotico, l'Eixample, Gràcia, Sants, la Barceloneta e il Park Güell a 14,3 km per il prezzo non esiste: sono un'unica cifra. La zona si esaurisce nelle periferie nord ed est — Sant Andreu, Nou Barris, La Sagrera e il Fòrum sono tutti oltre i 16 km e aggiungono la tariffa al chilometro. Ciò che cambia nel centro è il tempo di viaggio e se un'auto può arrivare alla porta, ed è per questo che l'indirizzo conta anche dove il prezzo non cambia.",
      },
      {
        h2: 'Dove un’auto può davvero fermarsi',
        body: "Il centro contiene i due casi scomodi di questo sito: le strade pedonali a tutti gli effetti e quelle così strette che fermarsi le blocca. In entrambi il punto d'incontro è la strada più vicina in cui un taxi può attendere legalmente, indicata nella conferma e non lasciata da scoprire il giorno stesso. In arrivo significa un autista in un luogo noto con un cartello; in partenza significa una breve camminata con i bagagli e cinque minuti in più rispetto al solo tempo di viaggio.",
      },
      {
        h2: 'Arrivare in centro a tarda notte',
        body: "Dopo le 23:30 circa il centro è la parte della città più facile da raggiungere in auto e più difficile da attraversare a piedi con i bagagli: la metropolitana chiude, le strade intorno alla Rambla sono affollate in un modo che rallenta un'auto e gli ultimi cento metri sul selciato si fanno al buio. Un'auto prenotata termina nel punto più vicino alla sua porta e non a un posteggio, e l'autista ha l'indirizzo prima che atterri. Il prezzo è la stessa cifra della stessa corsa a mezzogiorno.",
      },
    ],
  },

  'group-taxi': {
    title: 'Taxi di Gruppo Aeroporto Barcellona | 5, 6 o 7 Posti',
    description:
      "Taxi per gruppi dall'aeroporto di Barcellona: un van a sei o sette posti, oppure più auto prenotate insieme in un unico checkout. Un prezzo fisso tutto incluso.",
    h1: "Taxi di gruppo dall'aeroporto di Barcellona",
    intro:
      "Un normale taxi di Barcellona ha quattro posti. Per cinque, sei o sette persone c'è la Mercedes Vito a sei posti e la Mercedes V-Class a sette posti, e per un gruppo più numeroso si prenotano insieme due o più auto. A Barcellona non esiste un taxi singolo a nove posti, e preferiamo dirlo piuttosto che lasciarle scoprirlo sul marciapiede.",
    sections: [
      {
        h2: 'Quante persone e quante valigie entrano',
        body: "Il limite onesto è il bagagliaio, non i sedili. Un normale taxi a quattro posti porta quattro passeggeri e circa tre valigie grandi; alcuni modelli ne portano quattro. La Mercedes Vito a sei posti porta sei passeggeri e sei bagagli, e la Mercedes V-Class a sette posti porta sette passeggeri e sette bagagli. Se viaggia con qualcosa di voluminoso — sci, una bicicletta, un passeggino, uno strumento musicale — lo indichi nelle note della prenotazione, così viene assegnato il veicolo giusto e non quello più vicino.",
      },
      {
        h2: 'Cinque, sei o sette persone: un solo veicolo',
        body: "Fino a sette persone viaggiano insieme in un unico veicolo, a un prezzo fisso tutto incluso. Il taxi a quattro posti costa 50 € tra l'aeroporto e qualsiasi punto di Barcellona, la Vito a sei posti 70 € e la V-Class a sette posti 75 €. Nei fine settimana e nei festivi si aggiunge il 7,5 %. È tutto il prezzo: il supplemento aeroportuale, il supplemento per il veicolo più grande e il nostro servizio sono già dentro, e all'autista non si deve nulla.",
      },
      {
        h2: 'Otto, nove o dieci persone: prenotare due auto insieme',
        body: "Oltre sette non esiste un taxi singolo, quindi la risposta sono due o più veicoli che viaggiano come un solo gruppo. Scelga più auto in un'unica prenotazione e vengono riservate insieme, pagate in un unico checkout e inviate allo stesso punto di ritiro, fino a sei auto. Ciascuna è addebitata al prezzo pubblicato per la sua dimensione, quindi non c'è un preventivo su misura né sorprese: otto persone possono viaggiare in due taxi a quattro posti per 100 € in un giorno feriale, nove in una Vito a sei posti e un taxi a quattro posti per 120 € (70 € più 50 €), e undici in una V-Class a sette posti e un taxi a quattro posti per 125 €.",
      },
      {
        h2: 'Un checkout, un punto di ritiro, tutte le auto insieme',
        body: "Le auto di una prenotazione di gruppo vengono assegnate insieme e Lei riceve per email il nome e il numero di ogni autista. Attendono nella sala arrivi del suo terminal con un cartello con il suo nome e seguono lo stesso numero di volo, quindi un atterraggio in ritardo sposta l'intero gruppo invece di dividerlo. È la differenza pratica rispetto a fare la coda al posteggio con otto persone aspettando che i taxi arrivino uno o due alla volta.",
      },
      {
        h2: 'Gruppi di crociera, famiglie e matrimoni',
        body: "Lo stesso ragionamento vale per il terminal crociere del Moll Adossat, dove i prezzi fissi sono 60 €, 80 € e 85 € per i veicoli a quattro, sei e sette posti, e per una famiglia con i nonni e una montagna di bagagli. Per un gruppo di nozze o una delegazione di un congresso, ci indichi gli orari di arrivo e il numero di valigie al momento della prenotazione e Le diremo onestamente se due auto bastano o se tre è la scelta più sicura.",
      },
    ],
  },

  'book-online': {
    title: 'Prenoti Taxi Aeroporto Barcellona Online | Prezzo Subito',
    description:
      "Prenoti in pochi minuti un taxi per l'aeroporto di Barcellona. Prezzo fisso tutto incluso immediato, pagamento sicuro e conferma istantanea via email.",
    h1: "Prenotare un taxi per l'aeroporto di Barcellona online",
    intro:
      "Prenotare online richiede un paio di minuti e le garantisce un'auto confermata con autista assegnato. Paga online un unico prezzo tutto incluso e non deve nulla in taxi.",
    sections: [
      {
        h2: "Cosa serve per prenotare un taxi per l'aeroporto di Barcellona",
        body: "L'indirizzo di ritiro, la destinazione, data e ora e un numero di telefono. Per i ritiri in aeroporto aggiunga il numero del volo così che l'autista possa seguire l'atterraggio. Le prenotazioni richiedono almeno tre ore di preavviso; per qualcosa di più ravvicinato ci scriva su WhatsApp.",
      },
      {
        h2: 'Dopo la prenotazione del taxi per l’aeroporto di Barcellona',
        body: "Riceve subito un'email di conferma con percorso, veicolo, il prezzo pagato e la relativa ricevuta. Successivamente viene assegnato un autista e le inviamo i suoi dati prima del viaggio.",
      },
      {
        h2: 'Modifiche e cancellazioni',
        body: "I piani cambiano. Annulli con almeno 24 ore di anticipo e la rimborsiamo per intero. Per spostare una prenotazione risponda all'email di conferma e la riprogrammiamo.",
      },
      {
        h2: 'Cosa tenere sottomano',
        body: "Un indirizzo completo e non un quartiere, il numero di passeggeri e quante valigie porta davvero — quest'ultimo conta più di quanto si pensi, perché un'auto a quattro posti porta quattro passeggeri ma solo circa tre valigie. Se arriva in aereo, ci indichi il numero del volo: è facoltativo, ma con quello seguiamo l'atterraggio reale e spostiamo il ritiro in automatico, così un ritardo non le costa nulla e non deve indovinare con settimane di anticipo un orario sicuro. Un numero di cellulare raggiungibile il giorno stesso completa il quadro, anche perché la sala arrivi di un grande aeroporto può essere affollata e rumorosa, perché è il modo in cui il suo autista la raggiunge se la sala arrivi mette in difficoltà entrambi.",
      },
      {
        h2: 'Perché il modulo chiede tre ore di preavviso',
        body: "Le prenotazioni online richiedono almeno tre ore prima del ritiro, e il motivo è un autista e non un sistema: assegnare con affidabilità un'auto e una persona precise a un orario preciso richiede più tempo che assegnarne una in astratto. Entro le tre ore la risposta onesta è scriverci su WhatsApp, dove possiamo verificare cosa è davvero disponibile e confermare un'auto direttamente, oppure dirle subito che non ce n'è una. È un'esperienza peggiore del modulo e migliore di una conferma che non possiamo mantenere.",
      },
      {
        h2: 'Come si paga e cosa si riceve',
        body: "L'intero importo si paga online al momento della prenotazione, con carta di credito, carta di debito o Bizum. Non c'è una divisione tra acconto e saldo e all'autista in auto non si deve nulla: né tariffa, né supplemento, né mancia attesa. La ricevuta dell'importo completo arriva per email con la conferma, così i documenti per una nota spese arrivano prima del viaggio e non dopo. Se le serve anche la fattura del taxi per la corsa stessa, l'autista può rilasciarla su richiesta direttamente in auto, senza costi aggiuntivi.",
      },
    ],
  },
};
