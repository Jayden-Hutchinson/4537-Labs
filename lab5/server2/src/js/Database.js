const mysql = require("mysql2");
const CONNECTION = {
  host: "localhost",
  user: "jhutchin_root",
  password: "4537lab5",
  database: "jhutchin_4537lab5",
  port: 3306,
};

class Database {
  constructor() {
    this.connection = mysql.createConnection(CONNECTION);

    this.connection.connect((err) => {
      console.log("Connecting to Database...");
      if (err) {
        console.log("Connecting Failed.");
        console.log(err);
        return;
      }
      console.log("Connected to Database.");
    });
  }
}

module.exports = Database;
