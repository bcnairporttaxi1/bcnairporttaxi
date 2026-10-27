import type { BlogLocaleCopy } from '../blog-copy';

/**
 * The guides in the "it" locale, keyed by post slug. A post missing here is
 * served as English, which blog-copy.test.ts forbids.
 */
export const IT_BLOG_COPY: Record<string, BlogLocaleCopy> = {
  'how-much-is-a-taxi-from-barcelona-airport': {
    title: `Quanto costa un taxi dall'aeroporto di Barcellona?`,
    description: `Prezzi dei taxi dall'aeroporto di Barcellona: le nostre tariffe fisse tutto incluso per la città, come cambia il tassametro e cosa aggiungono i supplementi.`,
    h1: `Quanto costa un taxi dall'aeroporto di Barcellona?`,
    excerpt: `Un transfer prenotato da El Prat a Barcellona costa 50 € per un'auto a quattro posti, a prezzo fisso e pagato online. La fila dei taxi fuori dagli arrivi funziona in modo diverso, con un tassametro regolamentato. Ecco quanto costa davvero ciascuna delle due soluzioni e perché le due cifre non coincidono.`,
    sections: [
      {
        h2: `La risposta breve`,
        body: [
          `Un transfer prenotato tra El Prat e qualsiasi punto di Barcellona costa 50 € in un'auto a quattro posti, 70 € in un Mercedes Vito a sei posti e 75 € in una V-Class a sette posti. È il prezzo totale. Viene comunicato prima del viaggio, si paga online al momento della prenotazione e all'autista in auto non si deve nulla.`,
          `Il terminal crociere di Moll Adossat è una tratta a parte: 60 €, 80 € e 85 € per le stesse tre dimensioni di veicolo.`,
          `Queste cifre non cambiano con l'ora del giorno. Un ritiro alle 04:30 per un volo mattutino costa come uno alle due del pomeriggio. L'unica cosa che le aumenta è il fine settimana o un giorno festivo, che aggiunge il 7,5 per cento: un transfer in berlina il sabato costa quindi 53,75 € invece di 50 €.`,
          `Se invece prende un taxi dalla fila fuori dagli arrivi, non acquista affatto un prezzo fisso: acquista una corsa a tassametro, e la cifra finale dipende dal traffico, dall'orario e dal percorso. Il resto di questa pagina spiega entrambe le soluzioni, perché quale sia la più conveniente dipende davvero da quando viaggia.`,
        ],
      },
      {
        h2: `Perché un prezzo unico invece della lettura del tassametro`,
        body: [
          `Le tariffe dei taxi di Barcellona sono regolate dall'Àrea Metropolitana de Barcelona (AMB), e ogni taxi autorizzato della città usa lo stesso tassametro con le stesse tariffe. È una tutela reale per il consumatore e non la mettiamo in discussione. Ma un tassametro regolamentato non Le dice il prezzo in anticipo.`,
          `Su un tragitto di 15 chilometri verso l'Eixample la lettura del tassametro oscilla di circa dieci euro a seconda che sulla Ronda de Dalt si scorra o si sia fermi, e di un altro venticinque per cento a seconda che sia un martedì all'ora di pranzo o un sabato sera. Entrambe le cifre sono corrette. Nessuna delle due è conoscibile mentre si è nella sala arrivi a decidere cosa fare.`,
          `Un prezzo fisso sposta questa variabilità su di noi. Le comunichiamo 50 €, regoliamo con l'autista in base a quanto costa davvero il viaggio, e la differenza resta a noi in ogni caso. In un martedì senza traffico è un affare peggiore per Lei rispetto alla fila dei taxi. Nel traffico del venerdì sera è migliore. Ma è sempre una cifra nota.`,
          `È anche l'unico modo onesto di vendere un transfer a chi non è ancora a Barcellona. Nessuno che prenoti da Manchester a marzo può prevedere la lettura del tassametro di un giovedì pomeriggio di luglio, quindi un preventivo che in realtà è una stima può rivelarsi sbagliato, e sbaglia sempre nella direzione in cui la cifra sale.`,
        ],
      },
      {
        h2: `La zona di 16 chilometri, misurata in linea d'aria`,
        body: [
          `Il prezzo di listino copre qualsiasi indirizzo entro 16 chilometri dal terminal, misurati in linea retta. Comprende tutto il centro e quasi ovunque soggiorni un visitatore: plaza de Cataluña a 12,3 km, la Barceloneta a 12,8, la Sagrada Família a 14,0, il Park Güell sulla collina dietro Gràcia a 14,3 e Poblenou a 15,5 pagano tutti lo stesso 50 € di un hotel sul paseo de Gracia. Non è l'intero comune, ed è utile sapere quale parte resta fuori: i quartieri esterni a nord e a est sono oltre il limite, con La Sagrera a 16,4 km, il Fòrum a 17,4, Sant Andreu a 17,7, Nou Barris a 17,9 e Torre Baró a 19,3, e questi indirizzi pagano la tariffa supplementare indicata sotto.`,
          `La misura in linea retta è voluta, e vale la pena capirla perché gioca a Suo favore. Plaza de Cataluña dista 12,3 chilometri dal terminal in linea d'aria e 19,6 chilometri su strada, perché la strada deve aggirare il Llobregat ed entrare lungo la Gran Via. Una zona misurata sulla strada a 16 chilometri lascerebbe fuori il pieno centro di Barcellona e farebbe pagare chilometri extra sul tragitto più frequente di tutti, proprio quello per cui esiste il prezzo. Perciò la zona è tracciata sulla mappa, non sul percorso.`,
          `Fuori dalla zona il prezzo è quello di listino più 1,50 € per ogni chilometro in più. Badalona si trova a 21,8 chilometri e Sant Cugat del Vallès a 19,5, quindi entrambe pagano il prezzo della città più la differenza. Sono i casi appena fuori limite; la maggior parte dell'area metropolitana è all'interno.`,
          `Quell'1,50 € è una cifra unica e pubblicata, non la tariffa dell'ora, e conta più di quanto sembri. La tariffa notturna ufficiale è di 1,66 € al chilometro contro 1,35 € di giorno. Applicare quella in vigore reintrodurrebbe l'ora del giorno in un listino il cui scopo è proprio che l'ora non lo muova, e chi si sentisse dire «cinquanta euro più un euro e cinquanta al chilometro» si ritroverebbe a pagare più di così senza preavviso. Un solo numero, tutto il giorno.`,
        ],
      },
      {
        h2: `Cosa chiede invece la fila dei taxi`,
        body: [
          `Se esce alla fila dei taxi, la cifra sul tassametro nasce da tre elementi: una quota di partenza non appena il tassametro si avvia, una tariffa al chilometro ed eventuali supplementi.`,
          `La quota di partenza — la «bajada de bandera» — è di 2,80 €. La tariffa al chilometro è di 1,35 € con la tariffa T-1, valida dal lunedì al venerdì dalle 08:00 alle 20:00, e di 1,66 € con la T-2 in tutti gli altri momenti: sere, notti, tutto il sabato e la domenica, e i giorni festivi. La differenza è di circa il 23 per cento, ed è per questo che lo stesso identico tragitto costa davvero di più alle 22:00 che alle 14:00.`,
          `C'è anche una tariffa di attesa di 27,75 € all'ora, che il tassametro conteggia mentre si è fermi. In pratica è questo a rendere imprevedibili gli arrivi nell'ora di punta: il tassametro non si ferma quando si ferma il traffico.`,
          `Le tariffe attuali valgono dal 19 gennaio 2026 al 17 gennaio 2027. L'AMB le rivede ogni gennaio, e chi Le indica la tariffa di un taxi di Barcellona leggendola da un cartello più vecchio Le sta dando quella dell'anno sbagliato. Le nostre sono verificate sul cartello tariffario stampato e non copiate da un altro sito.`,
        ],
      },
      {
        h2: `I supplementi e il tetto che probabilmente non raggiungerà`,
        body: [
          `Alla tariffa a tassametro si aggiungono supplementi fissi per luoghi e situazioni specifiche. Il supplemento aeroporto di El Prat è di 4,60 € e si applica a qualsiasi corsa che inizi o finisca in aeroporto. Il terminal crociere di Moll Adossat ha lo stesso 4,60 €. La stazione di Sants costa 2,55 € e il polo fieristico Fira Gran Via 3,30 €.`,
          'Un veicolo con cinque o più passeggeri aggiunge 4,60 €. È un supplemento di tariffa per il veicolo più grande in sé e non un costo per persona, ed è uno dei motivi per cui il Vito da sei posti costa più di una berlina sulla stessa tratta.',
          `Tre notti all'anno comportano un ulteriore supplemento di 4,60 €: la vigilia di Natale fino al mattino di Natale, la notte di San Silvestro fino al giorno di Capodanno e la Revetlla de Sant Joan, la notte del 23 giugno. Se arriva in volo in una di queste notti, la fila dei taxi costerà più del solito e il prezzo prenotato no.`,
          `Esiste un tetto di 17,10 € al totale dei supplementi applicabili a un singolo servizio, pensato per i casi limite — un veicolo grande in partenza dal terminal crociere la notte di San Silvestro, per esempio. In una normale corsa dall'aeroporto si paga un solo supplemento da 4,60 € e si è lontanissimi dal massimale.`,
          `Tutto questo è compreso nel nostro prezzo fisso. I 50 € non sono una tariffa con supplementi da aggiungere: sono il totale, con il supplemento aeroporto, il veicolo, la tariffa e il nostro costo di servizio già inclusi. La lamentela più comune sui transfer aeroportuali, ovunque, è un prezzo che cresce tra il preventivo e il marciapiede, e il modo per non farlo è comunicare la cifra che si farà davvero pagare.`,
        ],
      },
      {
        h2: `La tariffa minima da El Prat`,
        body: [
          `Qualsiasi corsa a tassametro che parta dall'aeroporto costa almeno 21,00 €. Se il tassametro ne avesse segnato meno, si paga il minimo.`,
          `Esiste perché un taxi che resta quaranta minuti in coda alla fila del terminal per un salto di quattro euro fino a un hotel dell'aeroporto ci rimette sul turno, e senza una soglia nessuno accetterebbe le corse brevi. Incide solo sui tragitti davvero corti: verso il paese di El Prat o verso uno degli hotel lungo la strada dell'aeroporto.`,
          `Per qualsiasi destinazione nella Barcellona vera e propria il tassametro supera comodamente i 21 € da solo, quindi il minimo non entra mai nel calcolo. Se Le propongono un taxi dall'aeroporto di Barcellona «da 21 €», quella è la soglia di una corsa di due chilometri presentata come tariffa per la città.`,
        ],
      },
      {
        h2: `Il terminal crociere è un caso a sé`,
        body: [
          `La tratta tra El Prat e Moll Adossat ha un prezzo chiuso fisso ufficiale di 46,00 € con la tariffa T-4, stabilito dall'AMB e non da noi. Non utilizza affatto il tassametro.`,
          `È una soluzione insolita e c'è una buona ragione: i passeggeri delle crociere viaggiano contro un orario di imbarco, spesso nel traffico peggiore della settimana al porto, e una tariffa a tassametro in quella situazione è una scommessa che nessuno vuole fare. Un prezzo chiuso elimina il rischio traffico da un viaggio in cui il ritardo non è un fastidio ma una nave persa.`,
          `Il nostro prezzo prenotato per la stessa tratta è di 60 € in berlina, più alto del prezzo chiuso ufficiale perché include una garanzia specifica che la fila non offre: un autista assegnato in anticipo, che La attende con un cartello con il Suo nome e tiene il servizio a prescindere dall'orario di attracco della nave. Per una famiglia con i bagagli e un orario di partenza, di solito è proprio ciò per cui vale la pena pagare. Per chi viaggia da solo con uno zaino e un pomeriggio tranquillo, la fila a 46 € è l'acquisto migliore, e preferiamo dirlo piuttosto che far finta del contrario.`,
          `Un transfer tra il terminal crociere e la città — anziché l'aeroporto — costa il prezzo della città più un supplemento portuale di 10 €, e arriva allo stesso 60 €. La simmetria è voluta.`,
        ],
      },
      {
        h2: `Oltre l'area metropolitana: Sitges, Girona, Tarragona`,
        body: [
          `Quando uno dei due estremi del viaggio è fuori dall'area metropolitana, le tariffe di Barcellona non si applicano più e la corsa viene calcolata con le tariffe interurbane stabilite dalla Generalitat de Catalunya. Sono la T-6, dal lunedì al venerdì dalle 08:00 alle 20:00, e la T-7 in tutti gli altri momenti, compresi tutto il sabato e la domenica.`,
          `Il tassametro interurbano ha una particolarità che sorprende quasi tutti: addebita anche il viaggio di ritorno. Un taxi preso da Barcellona a Sitges è, secondo la tariffa, un viaggio di andata e ritorno — il circuito chiuso — perché l'autista deve tornare a casa e non può caricare clienti lungo la strada. Quindi un chilometro percorso verso sud ne costa due sul tassametro. Con la tariffa T-6 di 0,82 € al chilometro sono 1,64 € per ogni chilometro effettivamente percorso, non 0,82 €.`,
          'Per questo un trasferimento lungo costa quello che costa, e per questo una cifra che su un comparatore sembra una tariffa al chilometro è spesso la metà di quella reale. Tutto compreso, anche il nostro servizio, si arriva a circa 2,16 € per chilometro percorso nei giorni feriali (T-6) e tra 2,38 € e 2,48 € di notte e nel fine settimana (T-7), più una quota di partenza. Sitges, a 38 chilometri, costa 90,78 € in totale. Niente viene raddoppiato due volte.',
          `In pratica: Sitges, Tarragona, Girona, Reus e la Costa Brava sono calcolate al chilometro e comunicate prima della prenotazione, come tutto il resto. Non rientrano nel listino fisso della città, e nessun listino fisso onesto potrebbe coprirle: le distanze differiscono di un fattore cinque.`,
        ],
      },
      {
        h2: `Fine settimana, festivi e cosa cambia davvero`,
        body: [
          `Un prezzo fisso sale del 7,5 per cento nei fine settimana e nei giorni festivi. Su una berlina da 50 € sono 3,75 €. Il rincaro c'è perché garantire il servizio nei fine settimana e nei festivi costa di più in termini di personale, ed è una percentuale unica e pubblicata, non un moltiplicatore che cambia con la domanda: il prezzo che Le comunichiamo un sabato di febbraio è lo stesso di un sabato di agosto.`,
          `Si applica solo ai prezzi fissi di città e porto. Una corsa interurbana passa già dalla T-6 alla T-7 nel fine settimana, con una tariffa più alta, quindi aggiungere il rincaro addebiterebbe due volte lo stesso supplemento.`,
          `Ciò che non cambia: l'ora del giorno, il terminal, il traffico, il percorso scelto dall'autista, il numero di passeggeri entro la capienza del veicolo, o la quantità di bagaglio entro la stessa capienza. Un'auto a quattro posti con tre valigie alle 06:00 e un'auto a quattro posti con una borsa alle 18:00 costano entrambe 50 € in un giorno feriale.`,
        ],
      },
      {
        h2: `Quindi quanto conviene mettere in budget?`,
        body: [
          `Per un transfer prenotato verso Barcellona: 50 € in un giorno feriale in un'auto a quattro posti, 53,75 € nel fine settimana. 70 € o 75 € se serve un mezzo a sei o sette posti, che per quattro adulti con quattro valigie grandi è di solito la risposta onesta e non un tentativo di venderLe di più — tre valigie sono il limite realistico in una Corolla o in una Toledo.`,
          `Per la fila dei taxi, in una corsa diurna feriale verso il centro: il tassametro più il supplemento di 4,60 €, di solito intorno ai quaranta euro, e di più la sera, nel fine settimana o con molto traffico. Tenga conto che il POS può non funzionare, e succede.`,
          `Per il terminal crociere: 46 € al prezzo chiuso ufficiale, oppure 60 € prenotando con un autista che tiene il Suo servizio.`,
          `Una cosa va detta con chiarezza: la fila dei taxi e un'auto prenotata non sono lo stesso prodotto a un prezzo diverso. Una è una corsa regolamentata a tassametro che si acquista all'arrivo. L'altra è una cifra fissa, un autista con nome e un'auto già assegnata quando atterra il Suo volo. Quale convenga di più dipende interamente da quanto vale per Lei l'incertezza quel giorno, e per molti viaggi la risposta è «non molto» — nel qual caso la fila dei taxi è lì a due passi.`,
        ],
      },
    ],
  },
  'taxi-or-aerobus-from-barcelona-airport': {
    title: `Taxi o Aerobús dall'aeroporto di Barcellona?`,
    description: `Taxi, Aerobús o metropolitana da El Prat: il costo reale per gruppo, i tempi onesti porta a porta e i casi di bagagli e notte in cui conviene ciascuno.`,
    h1: `Taxi o Aerobús dall'aeroporto di Barcellona?`,
    excerpt: `L'Aerobús costa meno a persona e la metropolitana ancora meno. Nessuno dei due è automaticamente migliore se si contano gruppo, bagagli e la camminata finale — e per una o due persone con poco bagaglio il taxi è la scelta sbagliata, e lo diciamo.`,
    sections: [
      {
        h2: `Il conto, con i numeri reali`,
        body: [
          `L'Aerobús fa pagare a testa. Un taxi fa pagare a vettura. Questa sola differenza decide gran parte di queste discussioni prima ancora che contino gli altri fattori.`,
          `Un transfer prenotato in un'auto a quattro posti verso Barcellona costa 50 € fissi. Divisi tra due persone sono 25 € a testa, parecchie volte il prezzo di un posto sull'Aerobús. Divisi tra quattro sono 12,50 € a testa, e il divario si riduce a qualcosa che i più smettono di considerare — senza contare che il taxi finisce alla Sua porta e l'autobus a plaza de Cataluña.`,
          `Il punto di svolta di solito sono tre passeggeri, e con quattro è quasi sempre superato. Un gruppo di sei in un Vito a 70 € paga meno di 12 € a testa, porta a porta, con i bagagli nel bagagliaio e non sulle ginocchia.`,
          `La versione onesta del confronto è questa: da soli, l'autobus conviene di più e non c'è paragone. In quattro, in famiglia e con le valigie, il taxi di solito costa meno in totale ed è molto più comodo. Tutto ciò che sta in mezzo dipende dai bagagli.`,
        ],
      },
      {
        h2: `Tempo porta a porta, non tempo da cartellone`,
        body: [
          `L'Aerobús è pubblicizzato con circa 35 minuti fino a plaza de Cataluña, ed è esatto — da fermata a fermata. Il tempo che si vive davvero è più lungo, perché il viaggio non comincia alla banchina dell'autobus né finisce in piazza.`,
          `Aggiunga la camminata dagli arrivi alla fermata, che al T1 sono alcuni minuti con il carrello. Aggiunga l'attesa, breve nelle ore di punta e che alla sera può arrivare a quindici minuti. Poi aggiunga il tratto da plaza de Cataluña o da Sants fino a dove alloggia — in metropolitana con le valigie, in un secondo taxi o a piedi sui ciottoli del Barrio Gótico.`,
          `Un taxi da El Prat al centro di Barcellona impiega da 25 a 35 minuti a seconda del traffico e di dove va in città, e finisce all'indirizzo che ha indicato. Per l'Eixample o Sant Antoni la differenza nel tempo totale porta a porta è di forse venti minuti. Per un posto in alto a Gràcia, o un appartamento con ingresso dalla strada a El Born, è spesso più vicina a quarantacinque.`,
          `La variabilità conta quanto la media. L'autobus è affidabile e il taxi è più veloce; nel traffico intenso i tempi si avvicinano, perché l'autobus è nello stesso traffico e fa più fermate.`,
        ],
      },
      {
        h2: `La metropolitana costa meno di entrambi, a certe condizioni`,
        body: [
          `La linea 9 Sud serve entrambi i terminal ed è il modo più economico per entrare in città, con un margine netto. È un'opzione davvero valida e viene sottoutilizzata dai visitatori.`,
          `Le condizioni però sono reali. Non va direttamente in centro — si cambia, di solito a Collblanc o Torrassa, su un'altra linea, e le stazioni dell'aeroporto richiedono una tariffa aeroportuale specifica e non un biglietto semplice. Le stazioni hanno ascensori, ma gli interscambi comportano corridoi, e farli con due valigie grandi e un bambino stanco è il genere di cosa che sembra fattibile quando si prenota e non lo è più alle 23:00.`,
          `Se viaggia leggero, alloggia vicino a un interscambio della linea 9 e non ha fretta, la metropolitana è la risposta giusta e costa una frazione di tutto il resto. Se una di queste tre condizioni non è vera, smette di esserlo molto in fretta.`,
        ],
      },
      {
        h2: `I bagagli sono il vero fattore decisivo`,
        body: [
          `Più del prezzo e più del tempo, sono i bagagli a decidere davvero, ed è la cosa che si sottovaluta di più quando si prenota da casa.`,
          `Un taxi di Barcellona a quattro posti — una Corolla, una SEAT Toledo — porta quattro passeggeri e circa tre valigie. Quattro adulti con una valigia grande ciascuno non ci stanno, e la soluzione è un Vito a sei posti, che porta sei passeggeri e sei valigie, oppure una V-Class a sette posti. Saperlo in anticipo fa la differenza tra un transfer e un problema sul marciapiede.`,
          `Sull'Aerobús i bagagli vanno nella stiva sotto l'autobus e c'è un ripiano vicino alla porta, e funziona bene. In metropolitana vanno dove riesce a tenerli, che nell'ora di punta è addosso a Lei.`,
          `La regola pratica che regge: una valigia a testa e ha una scelta reale tra tutti e tre. Due valigie a testa e il taxi è l'unico davvero piacevole, qualunque cosa dica il conto.`,
        ],
      },
      {
        h2: `Quando il taxi vince nettamente`,
        body: [
          `Arrivo dopo mezzanotte. L'Aerobús smette di circolare nelle ore piccole e la metropolitana chiude, con in mezzo una rete limitata di autobus notturni che non è una proposta realistica con i bagagli e senza parlare catalano.`,
          `Viaggio con bambini, un passeggino o un seggiolino. L'autobus è gestibile con un bambino e scomodo con due, e a nessuno piace l'interscambio in metropolitana con passeggino e valigia.`,
          `Un volo mattutino. Un ritiro alle 04:30 per una partenza alle 06:30 non ha equivalente nei mezzi pubblici, e un'auto prenotata a prezzo fisso è l'unica versione che permette di dormire fino alla sveglia.`,
          `Alloggio con un ultimo tratto davvero scomodo: il Barrio Gótico, dove i veicoli non arrivano a molti indirizzi ma si avvicinano molto più di una fermata dell'autobus; Gràcia e Sarrià, in salita rispetto a qualsiasi linea d'autobus; ovunque si finirebbe con un secondo taxi, che rende più cara l'opzione «economica».`,
          `Gruppi di quattro o più persone. A quel punto il prezzo a vettura ha già vinto sul piano economico, quindi la comodità è gratis.`,
        ],
      },
      {
        h2: `Quando non vince, e lo diciamo`,
        body: [
          `Una o due persone, poco bagaglio, alloggio vicino a plaza de Cataluña o su una linea di metropolitana diretta, arrivo a metà giornata. In questa situazione l'Aerobús è la scelta sensata, la metropolitana è quella economica, e un taxi da 50 € significa pagare una comodità di cui non ha particolare bisogno.`,
          `Preferiamo scriverlo piuttosto che far finta che il taxi sia sempre la scelta giusta. Un transfer aeroportuale è un servizio con una forma precisa — prezzo fisso, autista assegnato, porta a porta, bagagli gestiti — e quella forma vale qualcosa per una famiglia di quattro persone a mezzanotte e molto poco per chi viaggia da solo con lo zaino alle due del pomeriggio.`,
          `Lo stesso ragionamento vale per la fila dei taxi. Un taxi a tassametro dalla fila in un pomeriggio feriale tranquillo costerà spesso meno di un prezzo fisso prenotato, perché il prezzo fisso include l'assorbimento di un rischio traffico che quel giorno non si è presentato. È così che funzionano i prezzi fissi, in entrambe le direzioni.`,
        ],
      },
      {
        h2: `Il vuoto notturno di cui nessuno parla`,
        body: [
          `C'è una finestra, grosso modo dall'ultimo Aerobús alla prima metropolitana del mattino, in cui le opzioni di trasporto pubblico si riducono a un autobus notturno e la fila dei taxi diventa la scelta predefinita. In una notte normale la fila al T1 è ben sorvegliata e scorre in fretta.`,
          `Dove le cose vanno male è quando un volo in ritardo atterra in quella finestra insieme ad altri due voli in ritardo. La fila è allora di quaranta persone e l'offerta di taxi alle 02:00 è scarsa, perché gli autisti non stanno fermi a un terminal nella speranza che arrivi qualcuno. È l'unico scenario in cui arrivare con un'auto già assegnata vale chiaramente più di quanto costa.`,
          `Se il Suo volo è previsto in atterraggio dopo le 23:30 circa, conviene decidere prima di partire e non nella sala arrivi.`,
        ],
      },
      {
        h2: `Il ritorno all'aeroporto è un problema diverso`,
        body: [
          `Quasi tutti pianificano l'arrivo e improvvisano la partenza, e la partenza è la metà più difficile.`,
          `All'arrivo ha delle opzioni perché si trova in un aeroporto, l'unico posto della regione in cui i taxi sono garantiti. Alla partenza si trova invece su una strada di Gràcia alle 05:00 con un volo alle 07:30, e tutto ciò che rendeva attraenti l'autobus e la metropolitana ha smesso di funzionare.`,
          `L'Aerobús non aiuta per le partenze molto presto, e fermare un taxi al volo in una strada residenziale prima dell'alba è poco affidabile in un modo in cui non lo è sulla Gran Via. Barcellona ha molti taxi; non ne ha molti sul Suo angolo alle cinque del mattino.`,
          `Per una partenza di giorno da un indirizzo centrale, tutte e tre le opzioni funzionano al contrario esattamente come all'arrivo, e vale lo stesso conto. Per qualsiasi cosa prima delle 07:00 circa, o da un indirizzo fuori dalla rete principale, un ritiro prenotato è meno una comodità che l'unica versione che accade in modo affidabile. Il prezzo fisso è lo stesso nelle due direzioni — 50 € verso la città e 50 € in uscita, nei giorni feriali, in un'auto a quattro posti.`,
        ],
      },
      {
        h2: `Come decidere in dieci secondi`,
        body: [
          `Conti le persone e conti le borse. Una o due persone con una borsa ciascuna, in arrivo di giorno, con alloggio in centro: prenda l'Aerobús, o la metropolitana se conta ogni euro.`,
          `Tre o più persone, o due o più borse a testa, o un arrivo dopo l'ultimo autobus, o un indirizzo in cima a una collina o in fondo a un vicolo: prenda un taxi, e decida separatamente se vuole la fila o un'auto prenotata in anticipo.`,
          `La scelta tra fila e prenotazione si riduce a una domanda: quanto Le peserebbe una coda di quaranta minuti o una cifra finale sconosciuta sulla Sua serata? Se la risposta è «non molto», la fila è proprio fuori dagli arrivi e costa meno. Se viaggia con persone che non la sopporterebbero, o contro una scadenza, prenoti.`,
        ],
      },
    ],
  },
  'barcelona-airport-terminals-t1-t2-guide': {
    title: `Terminal dell'aeroporto di Barcellona: T1 e T2`,
    description: `Quale terminal usa la Sua compagnia a Barcellona El Prat, come funziona la navetta T1-T2, dove sono le file dei taxi e dove La attende un autista prenotato.`,
    h1: `Terminal dell'aeroporto di Barcellona: T1 e T2`,
    excerpt: `Sbagliare terminal costa una corsa in navetta e venti minuti, e in partenza può costare il volo. Ecco qual è quale, dove sono davvero i taxi in ciascuno e l'unica cosa da controllare il giorno prima di volare.`,
    sections: [
      {
        h2: `Due terminal, a diversi chilometri di distanza`,
        body: [
          `Barcellona El Prat ha due terminal passeggeri, T1 e T2, e la cosa più importante da sapere è che non si raggiungono a piedi l'uno dall'altro. Si trovano ai lati opposti delle piste, a qualche chilometro di distanza, collegati da una navetta gratuita.`,
          `Sorprende perché in molti aeroporti «terminal» significa un'ala diversa dello stesso edificio. Qui significa un edificio diverso con un viaggio in autobus in mezzo, e il viaggio dura da 10 a 15 minuti senza contare l'attesa.`,
          `Il T1 è il più nuovo e molto più grande dei due, aperto nel 2009, e gestisce la maggior parte del traffico a lungo raggio insieme alla gran parte di Vueling e delle compagnie tradizionali. Il T2 è il terminal originario, più vecchio e con i soffitti più bassi, suddiviso in tre blocchi, e serve diverse compagnie low cost.`,
          `Entrambi sono completamente attrezzati — check-in, controlli di sicurezza, negozi, ristorazione, noleggio auto, file dei taxi. Nessuno dei due è un avamposto isolato. L'unica vera penalizzazione per aver scelto quello sbagliato è il tempo.`,
        ],
      },
      {
        h2: `Quali compagnie usano quale`,
        body: [
          `Il T1 accoglie la maggior parte dei voli in arrivo da fuori Europa, oltre a Vueling, la compagnia dominante dell'aeroporto, e la maggior parte delle compagnie di bandiera tradizionali.`,
          `Il T2 serve un gruppo di compagnie low cost, tra cui Ryanair è una delle più grandi, oltre a un po' di traffico charter e stagionale.`,
          `L'avvertenza utile: la situazione non è stabile. Le compagnie cambiano terminal quando cambiano i contratti, a volte con poche settimane di preavviso, e gli orari stagionali rimescolano ancora le cose. Una guida che Le dice con sicurezza quale terminal usa la Sua compagnia Le sta dicendo quale usava quando la guida è stata scritta.`,
          `I codeshare peggiorano le cose. Se ha prenotato con una compagnia e vola sull'aereo di un'altra, il terminal segue il vettore operativo e non quello indicato nella conferma di prenotazione. Conta il terminal stampato sulla carta d'imbarco, ed è l'unica fonte di cui fidarsi.`,
        ],
      },
      {
        h2: `Spostarsi tra T1 e T2`,
        body: [
          `La navetta tra i terminal è gratuita, passa con frequenza e funziona anche di notte, anche se meno spesso nelle ore piccole. Ferma davanti agli arrivi del T1 e a ciascun blocco del T2.`,
          `Preveda 25 minuti porta a porta e non i 10-15 del viaggio in sé — dovrà aspettare l'autobus, caricare i bagagli e camminare all'arrivo. Nei momenti di punta, con l'autobus pieno e solo posti in piedi, ci vuole di più ed è molto meno piacevole con le valigie.`,
          `Anche la linea 9 Sud della metropolitana collega i due terminal, con una stazione in ciascuno, e a volte è più rapida che aspettare l'autobus se si è già sottoterra. Non è gratuita e richiede la tariffa aeroportuale.`,
          `Se ha una coincidenza tra un volo in arrivo al T2 e un volo in partenza dal T1 con biglietti separati, consideri il trasferimento come una vera tappa del viaggio e si dia un'ora. C'è chi perde il volo per questo.`,
        ],
      },
      {
        h2: `Il T2 è fatto di tre blocchi, e il blocco conta`,
        body: [
          `Il T2 è suddiviso nei blocchi A, B e C, disposti in linea lungo la facciata dell'edificio. Sono collegati all'interno, quindi si può passare a piedi dall'uno all'altro, ma la camminata da un'estremità all'altra richiede diversi minuti.`,
          `La Sua compagnia usa un blocco specifico, e i banchi del check-in, i controlli di sicurezza e la fila dei taxi dipendono tutti da esso. Essere lasciati al blocco C quando serve il blocco A non è un disastro, ma è una camminata con i bagagli che non aveva previsto.`,
          `Quando prenota un transfer con ritiro o arrivo al T2, conviene indicare il blocco. Fa la differenza tra un autista che si trova dove esce Lei e un autista che è trecento metri più in là lungo la facciata.`,
        ],
      },
      {
        h2: `Dove sono le file dei taxi`,
        body: [
          `Entrambi i terminal hanno file di taxi ufficiali subito fuori dagli arrivi, ben segnalate, sorvegliate e di solito affollate. Al T1 la fila è direttamente davanti alla sala arrivi. Al T2 ci sono file al servizio di ciascun blocco.`,
          `I taxi di queste file sono taxi autorizzati di Barcellona con la tipica livrea nera e gialla, tutti con lo stesso tassametro regolamentato. Non c'è trattativa né scelta — si sale sull'auto in testa alla fila. È il sistema che funziona come previsto, e fa sì che non si possa essere sovrapagati rispetto alla tariffa.`,
          `Qualsiasi corsa che parta dall'aeroporto comporta un supplemento di 4,60 € e si paga almeno la tariffa minima di 21 €, due voci che fanno parte della tariffa ufficiale e non sono aggiunte dall'autista.`,
          `Ciò che la fila non può fare è dirLe il prezzo prima di partire, né garantire che ci sia un'auto quando atterra. In un pomeriggio normale entrambe le cose vanno bene. Dopo un gruppo di arrivi tardivi in ritardo, la coda è tutta la storia.`,
        ],
      },
      {
        h2: `Dove La incontra invece un autista prenotato`,
        body: [
          `Un transfer prenotato non usa la fila, ed è la parte che più spesso si sbaglia all'arrivo.`,
          `Il Suo autista attende all'interno della sala arrivi, sul lato pubblico dell'uscita dal ritiro bagagli, con un cartello con il Suo nome. Non è sul marciapiede né nella coda dei taxi. Esce dal ritiro bagagli e lo trova lì, ed è questo il senso di prenotare.`,
          `Il punto d'incontro esatto Le viene confermato via e-mail prima del viaggio, perché cambia a seconda del terminal e, al T2, del blocco. Legga quella e-mail in aereo e non nella sala.`,
          `L'autista segue il numero del Suo volo, quindi un ritardo sposta il ritiro invece di annullarlo. È la differenza pratica tra un'auto prenotata e la fila: un atterraggio con un'ora di ritardo all'01:00 significa un autista ancora lì, invece di una fila ormai sfoltita.`,
          `Se non riuscite a trovarvi, il numero di telefono nella conferma raggiunge direttamente l'autista, non un call center. Le sale arrivi sono grandi e i cartelli si abbassano; una telefonata risolve tutto.`,
        ],
      },
      {
        h2: `Il terminal cambia la tariffa?`,
        body: [
          `Poco, e per un transfer prenotato per niente.`,
          `Il T1 si trova un paio di chilometri più lontano dalla città rispetto al T2. Su una corsa di 15 chilometri verso il centro di Barcellona quella differenza è piccola, e il supplemento aeroporto di 4,60 € è identico da entrambi i terminal. Sul tassametro potrebbe vedere un euro o due di differenza.`,
          `Un prezzo fisso prenotato non distingue affatto tra i due: 50 € verso la città in un'auto a quattro posti dal T1 o dal T2, in un giorno feriale, con il supplemento già incluso nella cifra. Lo stesso vale al contrario per le partenze.`,
          `Ciò che il terminal cambia è il rischio della navetta. Se viene lasciato a quello sbagliato, il costo è di 25 minuti e un autobus, che all'arrivo è fastidioso e alla partenza può essere il volo.`,
        ],
      },
      {
        h2: `Partenze: dove sbagliare fa davvero male`,
        body: [
          `All'arrivo il terminal sbagliato Le costa tempo. In partenza può costarLe il viaggio, perché scopre l'errore a un banco del check-in che non ha il Suo volo e con una navetta che richiede 25 minuti che non ha.`,
          `Indichi il terminal quando prenota un transfer di partenza, e lo verifichi sulla carta d'imbarco e non sul ricordo del volo di andata. Le compagnie usano di routine terminal diversi nelle due direzioni, e un ritorno in codeshare può facilmente essere un terminal diverso da quello dell'andata.`,
          `Per una partenza mattutina, essere a El Prat per un volo delle 06:30 partendo da Barcellona significa un ritiro intorno alle 04:30 per la città, prima se è più lontano. Un'auto prenotata a prezzo fisso è l'unica versione che non comporta restare in strada all'alba sperando.`,
        ],
      },
      {
        h2: `Quanto ci metterà davvero a uscire`,
        body: [
          `Il tempo che conta per un ritiro non è quando atterra l'aereo, ma quando esce dal ritiro bagagli, e la distanza tra i due momenti è maggiore di quanto la maggior parte delle persone preveda.`,
          `Da un arrivo Schengen con solo bagaglio a mano, da dieci a quindici minuti dall'atterraggio alla sala arrivi è realistico. Da fuori Schengen, con controllo passaporti e un bagaglio in stiva, mezz'ora è normale e un'ora capita — in particolare al T1 a metà mattina, quando atterrano insieme diversi voli a lungo raggio e il collo di bottiglia è la coda al controllo e non il nastro.`,
          `Per questo un transfer prenotato è legato al numero del Suo volo e non a un orario che ha inserito. L'autista segue l'atterraggio effettivo e tiene conto della sala, e Le toglie la stima che altrimenti dovrebbe fare prenotando da casa settimane prima.`,
          `Significa anche che non c'è alcun vantaggio nel dilatare la Sua stima. Prenotare un ritiro un'ora dopo l'atterraggio «per sicurezza» non aiuta, perché il monitoraggio se ne occupa già, e La lascia ad aspettare un'auto volutamente in ritardo.`,
          `L'unica cosa da fare da solo: se esce dal ritiro bagagli insolitamente in fretta e l'autista non è ancora in posizione, il numero di telefono nella conferma lo raggiunge direttamente. Un'auto a otto minuti è un esito normale di un'uscita veloce, non un problema.`,
        ],
      },
      {
        h2: `Controlli il giorno prima`,
        body: [
          `Un'abitudine elimina quasi tutto questo: la sera prima di volare, apra la carta d'imbarco e legga il terminal. Non la conferma di prenotazione, non la guida letta a marzo, non la pagina generica delle rotte della compagnia — la carta d'imbarco del volo che prenderà.`,
          `Se non corrisponde a quanto ci ha indicato, risponda all'e-mail di conferma e lo sposteremo. Cambiare il terminal in una prenotazione non costa nulla e richiede un minuto. Scoprirlo alle 05:00 costa la navetta, lo stress e a volte il volo.`,
        ],
      },
    ],
  },
};
