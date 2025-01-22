
// callback per index
const index = (req, res) => {
  // Prendiamo la query string dall'URL
  const queryObject = req.query;
  const chiaveTags = queryObject.tags?.toLowerCase(); // Usa l'optional chaining per evitare errori se `tags` è undefined

  // Inizializziamo le ricette da inviare con tutte le ricette
  let ricetteDaInviare = arrayRicette;

  // Applichiamo il filtro solo se `tags` è presente
  if (chiaveTags) {
    ricetteDaInviare = arrayRicette.filter(
      (curRicetta) => curRicetta.tags.toLowerCase() === chiaveTags
    );
  }

  // Mostriamo tutto l'array di ricette (filtrate o meno)
  res.json(ricetteDaInviare);
};

// callback per show
const show = (req, res) => {
  // Converte l'id in numero intero
  const ricettaID = parseInt(req.params.id);

  const elemento = arrayRicette.find((currItem) => currItem.id === ricettaID);

  res.json(elemento);
};

// callback per store
const store = (req, res) => {
  // Prendo oggetto da api json
  const objApiJSON = req.body;

  // Prendo ultimo indice dell'array
  const lastElemIndex = arrayRicette.length - 1;

  // Prendo ultimo oggetto dall'array
  const lastObject = arrayRicette[lastElemIndex];

  // Prendo id di questo ultimo oggetto
  const lastObjectid = lastObject.id;

  // Aggiungo proprietà id a oggetto preso da api
  objApiJSON.id = lastObjectid + 1;

  // Pusho questo nuovo oggetto nell'array iniziale
  arrayRicette.push(objApiJSON);

  // La risposta JSON sarà l'array con il nuovo oggetto
  res.json(arrayRicette);
};

// callback per update
const update = (req, res) => {
  // Prendiamo il param dall'url
  const newRicettaID = parseInt(req.params.id);

  // Mettiamo l'oggetto json preso dal request.body in una variabile di nome objJSON
  const objJSON = req.body;

  // Aggiunngiamo un id a questo nuovo oggetto
  objJSON.id = newRicettaID;

  // Troviamo l'index dell'array che ha lo stesso id preso dal param
  const indexToModify = arrayRicette.findIndex(
    (currObj) => currObj.id === newRicettaID
  );
  // console.log(indexToModify);

  // Modifichiamo l'elemento a questo index dell'array con il nuovo oggetto
  arrayRicette[indexToModify] = objJSON;

  // La risposta JSON sarà l'array con il nuovo oggetto
  res.status(200).json(arrayRicette);
};

// callback per modify
const modify = (req, res) => {
  // Prendiamo parametro da request
  const paramID = parseInt(req.params.id);

  // Prendiamo l'oggetto body dalla request
  const objApiJSON = req.body;

  // console.log(paramID, objApiJSON);

  // Dobbiamo trovare l'oggetto con lo stesso id di paramID
  const indexOfObject = arrayRicette.findIndex(
    (currObject) => currObject.id === paramID
  );

  // Prendiamo l'oggetto da modificare dall'array
  const objToModify = arrayRicette[indexOfObject];

  // res.json(objToModify);

  // Facciamo un ciclo for in per ciclare le proprietà dell'oggetto principale

  for (chiave1 in objToModify) {
    // vediamo se ci prende le chiave dell'oggetto una per una
    // console.log(chiave1);
    // Mostriamo il valore di ciascuna chiave una per una
    // console.log(objToModify[chiave1]);

    // Per ogni chiave cicliamo tutte le chiavi dell'oggetto ottenuto tramite api
    for (chiave2 in objApiJSON) {
      // console.log(chiave2);
      // console.log(objApiJSON[chiave2]);
      if (chiave1 === chiave2) {
        // console.log(chiave1, chiave2);
        // console.log("Ho trovato la chiave da aggiornare");
        objToModify[chiave1] = objApiJSON[chiave2];
      }
    }
  }
  res.json(arrayRicette);
};

// callback per destroy
const destroy = (req, res) => {
  // Convertiamo la stringa in numero
  const ricettaID = parseInt(req.params.id, 10);

  // Settiamo variabile appoggio
  let indexToDelete = -1;

  // A noi serve indice array dell'oggetto da cancellare
  arrayRicette.forEach((currObject, currIndex) => {
    if (currObject.id === ricettaID) indexToDelete = currIndex;
  });

  // Cancello un determinato elemento dall'array di oggetti
  arrayRicette.splice(indexToDelete, 1);

  // Mostriamo l'array dopo aver rimosso un elemento
  res.send(arrayRicette);
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
