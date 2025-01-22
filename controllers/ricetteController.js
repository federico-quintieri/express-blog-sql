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

  // Facciamo la query che seleziona un solo elemento in base all'id
  const sql = "INSERT INTO posts (title,content,image) VALUES (?,?,?)";

  // Invio la query tramite il metodo query e gestisco cosa succede con una callback interna al metodo
  connection.query(
    sql,
    [objApiJSON.title, objApiJSON.content, objApiJSON.image],
    (err, response) => {
      if (err) {
        return res.status(500).json({ message: "Errore interno al server" });
      } else if (response.length === 0) {
        return res.status(404).json({
          message: "Non riesco ad inserire post",
        });
      } else {
        return res
          .status(200)
          .json({ status: "success", data: "Ho inserito nuovo post" });
      }
    }
  );
};

// callback per update
const update = (req, res) => {
  // Prendiamo il param dall'url
  const idToUpdate = parseInt(req.params.id);

  // Mettiamo l'oggetto json preso dal request.body in una variabile di nome objJSON
  const objApiJSON = req.body;

  // Facciamo la query che seleziona un solo elemento in base all'id
  const sql = "UPDATE posts SET title= ?, content = ?, image = ? WHERE id = ?";

  // Invio la query tramite il metodo query e gestisco cosa succede con una callback interna al metodo
  connection.query(
    sql,
    [objApiJSON.title, objApiJSON.content, objApiJSON.image, idToUpdate],
    (err, response) => {
      if (err) {
        return res.status(500).json({ message: "Errore interno al server" });
      } else if (response.length === 0) {
        return res.status(404).json({
          message: "Non riesco ad inserire post",
        });
      } else {
        return res.status(200).json({
          status: "success",
          data: "Ho modificato il post numero " + idToUpdate,
        });
      }
    }
  );
};

// callback per modify
const modify = (req, res) => {
  // Prendiamo parametro da request
  const paramID = parseInt(req.params.id);

  // Prendiamo l'oggetto body dalla request
  const objApiJSON = req.body;
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
      return res.status(200).json({
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
