const mysql = require("mysql2");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // taking away password 
      database: "4537lab5",
    });

    // Establish the connection (optional for mysql2, but explicit is fine)
    this.connection.connect((err) => {
      if (err) throw err;
      console.log("Connected to Database");
    });
  }
}

module.exports = Database;
