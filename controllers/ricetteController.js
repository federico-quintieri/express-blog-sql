const connection = require("../db");

// callback per index
const index = (req, res) => {
  // Creo query da mandare al Database
  const sql = "SELECT * FROM posts";

  // Invio la query tramite il metodo query e gestisco cosa succede con una callback interna al metodo
  connection.query(sql, (err, response) => {
    if (err) {
      return res.status(500).json({ message: "Errore interno al server" });
    } else if (response.length === 0) {
      return res.status(404).json({
        message: "Post non trovato",
      });
    } else {
      return res.status(200).json({ status: "success", data: response });
    }
  });
};

// callback per show
const show = (req, res) => {
  // Converte l'id in numero intero
  const url_ID = parseInt(req.params.id);

  // Facciamo la query che seleziona un solo elemento in base all'id
  const sql = "SELECT  * FROM posts WHERE id = ?";

  // Invio la query tramite il metodo query e gestisco cosa succede con una callback interna al metodo
  connection.query(sql, [url_ID], (err, response) => {
    if (err) {
      return res.status(500).json({ message: "Errore interno al server" });
    } else if (response.length === 0) {
      return res.status(404).json({
        message: "Post non trovato",
      });
    } else {
      return res.status(200).json({ status: "success", data: response[0] });
    }
  });
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
  // Converte l'id in numero intero
  const url_ID = parseInt(req.params.id);

  // Facciamo la query che seleziona un solo elemento in base all'id
  const sql = "DELETE FROM posts WHERE id = ?";

  // Invio la query tramite il metodo query e gestisco cosa succede con una callback interna al metodo
  connection.query(sql, [url_ID], (err, response) => {
    if (err) {
      return res.status(500).json({ message: "Errore interno al server" });
    } else if (response.length === 0) {
      return res.status(404).json({
        message: "Post non trovato",
      });
    } else {
      return res
        .status(200)
        .json({
          status: "success",
          data: `Post con id: ${url_ID} cancellato da database`,
        });
    }
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
