const mysql = require("mysql2");

export class Database {
  constructor() {
    this.connection = mysql
      .createConnection({
        host: "localhost",
        user: "root",
        password: "4537",
        database: "4537lab5",
      })
      .connect((err) => {
        if (err) throw err;
        console.log("Connected to Database");
      });
  }
}

module.exports = Database;
