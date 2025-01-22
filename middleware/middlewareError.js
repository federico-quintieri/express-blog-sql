// Facciamo la callback function per gestire l'errore della request

const checkRequestError = (err, req, res, next) => {
  console.log("gestione di errori interni al server");
  res.statusCode = 500;
  res.json({
    error: true,
    message: "errore interno del server",
  });
};

module.exports = checkRequestError;
