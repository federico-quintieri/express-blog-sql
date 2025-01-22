// Importo mysql2
const mysql = require("mysql2");

// Faccio una connessiona a DB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Sono connesso al DB");
});

module.exports = connection;