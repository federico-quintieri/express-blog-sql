const express = require("express");
const routing = require("./routes/post");
const cors = require("cors");

const app = express();
const port = 3000;

// Restringere a domini specifici accesso ai miei endpoint
const corsOption = {
  origin: "http://localhost:5173", // Consenti richieste solo da questo dominio  (porta front-end)
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"], // Consenti solo questi metodi
  allowedHeaders: ["Content-Type", "Authorization"], // Intestazioni consentite
};

// Utilizzo il middleware cors configurato poco fa
app.use(cors(corsOption));

// Importo la callback per gestire errore request (ritorna callback function)
const middlewareHandleError = require("./middleware/middlewareError.js");
// console.log(middlewareHandleError);

// Use JSON parser middleware
app.use(express.json());

// Apply routes
app.use("/Ricette", routing);

// Default endpoint
app.get("/", (req, res) => res.send("Hello World!"));

// Forzo errore per vedere se il middleware è gestito correttamente
app.get("/force-error", (req, res, next) => {
  const error = new Error("Errore interno simulato");
  error.status = 500;
  next(error); // Passa l'errore al middleware
});

// Utilizzo la callback middleware error per gestire errore risposta server
// Si mette dopo che sono stati specificati i vari endpoint
app.use(middlewareHandleError);

// Start server
app.listen(port, () =>
  console.log(`Esempio server in ascolto a porta:${port}!`)
);
