// Importo oggetto/funzione express
const express = require("express");

// Creo un istanza di Ruoter
const router = express.Router();

// Importo il controller ricette
const controllerRicette = require("../controllers/ricetteController");

// index => get
router.get("/", controllerRicette.index); 

// show => get
router.get("/:id", controllerRicette.show);

// store => post
router.post("/", controllerRicette.store);

// update => put
router.put("/:id", controllerRicette.update);

// modify => patch
router.patch("/:id", controllerRicette.modify);

// destroy => delete
router.delete("/:id", controllerRicette.destroy);

// Esporto il router
module.exports = router;
