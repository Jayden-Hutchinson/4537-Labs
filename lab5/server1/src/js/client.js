import { HTML, HTTP, SERVER_ROUTE, SQL } from "./util/constants.js";
import { MESSAGE } from "../lang/en/user.js";
import ElementFactory from "./ElementFactory.js";

const SQL_DATA = `INSERT INTO patient (name, dateOfBirth) VALUES
("Kratos", "2005-03-22"),
("Nathan Drake", "2007-10-13"),
("Cole MacGrath", "2009-11-01"),
("Ratchet", "2002-11-04")`


class Client {
  constructor() {
    // Select the root element
    this.element = document.getElementById(HTML.ID.ROOT);

    // Create the elementsError: ${err.message}

    this.sqlForm = ElementFactory.createSqlForm();
    this.dataButton = ElementFactory.createDataButton();
    this.message = ElementFactory.createMessage();

    // Append children to render elements
    this.element.appendChild(this.dataButton);
    this.element.appendChild(this.sqlForm);
    this.element.appendChild(this.message);

    // Button event to send predefined sql query to the server
    this.dataButton.addEventListener(HTML.EVENT.CLICK, async (event) => {
      event.preventDefault();
      this.insertSql(SQL_DATA);
    });

    // Form event to decide whether to send an SELECT or INSERT
    // query to the server then send the query to the server
    this.sqlForm.addEventListener(HTML.EVENT.SUBMIT, async (event) => {
      console.log("Sql Form Submit");
      event.preventDefault();

      // Get the text area contents
      const input = this.sqlForm.textArea.value.toUpperCase();
      console.log("Input:", input)

      // Check if it is a SELECT or INSERT query
      const isSelectQuery = input.includes(SQL.KEYWORD.SELECT)
      const isInsertQuery = input.includes(SQL.KEYWORD.INSERT)

      // If it is neither SELECT or INSERT query do not execute request
      if (!isInsertQuery && !isSelectQuery) {
        this.message.textContent = MESSAGE.INVALID_SQL_QUERY;
        return
      }

      // If INSERT query, send the request as a POST request
      if (isInsertQuery) {
        this.insertSql(input)
      }

      // If SELECT qeury, send the request as a GET request
      if (isSelectQuery) {
        this.selectSql(input)
      }

    });
  }

  /**
   * Send a POST request to the server with the given sql query 
   * 
   * @param {string} sql 
   */
  async insertSql(sql) {
    console.log("Inserting Sql")
    try {
      const res = await fetch(SERVER_ROUTE.INSERT);
      const result = await res.text();
      this.message.textContent = result;
    } catch (err) {
      console.error(err);
      this.message.textContent = err.message;
    }
  }

  /**
   * Send a GET request to the server with the given sql query 
   * 
   * @param {string} sql 
   */
  async selectSql(sql) {
    console.log("Reading Data")
    try {
      const res = await fetch(SERVER_ROUTE.SELECT);

      const result = await res.text();
      this.message.textContent = result;
    } catch (err) {
      console.error(err);
      this.message.textContent = err.message;
    }
  }

}


new Client();
