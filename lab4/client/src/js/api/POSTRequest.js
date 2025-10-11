class POSTRequest {
  constructor(word, definition) {
    this.method = "POST";
    this.headers = { "Content-Type": "application/x-www-form-urlencoded" };

    const encodedWord = encodeURIComponent(word);
    const encodedDef = encodeURIComponent(definition);
    this.body = `word=${encodedWord}&definition=${encodedDef}`;
  }
}

export default POSTRequest;
