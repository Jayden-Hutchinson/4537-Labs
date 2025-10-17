export const HTML = {
  TAG: {
    TEXT_AREA: "textarea",
    BUTTON: "button",
    FORM: "form",
    DIV: "div",
  },

  EVENT: {
    SUBMIT: "submit",
    CLICK: "click",
  },

  TYPE: {
    SUBMIT: "submit",
  },

  ID: {
    ROOT: "root",
  },

  CLASS_NAME: {
    SQL_FORM: "sql-form",
    DATA_BUTTON: "data-button",
    MESSAGE: "message",
  },
};

export const SQL = {
  KEYWORD: {
    INSERT: "INSERT",
    SELECT: "SELECT"
  }
}

export const HTTP = {
  REQUEST_TYPE: {
    GET: "GET",
    POST: "POST",
  }
}

const BASE_URL = "http://localhost:3000/api/db"
export const SERVER_ROUTE = {
  SELECT: `${BASE_URL}/select`,
  INSERT: `${BASE_URL}/insert`,
}