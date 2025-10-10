import { BASE_URL } from "./routes.js";
import { PARAM } from "../util/constants.js";

class ClientApi {
  static async search(word) {
    const url = `${BASE_URL}/items/?name=${encodeURIComponent(word)}`;

    console.log('Searching for:', word);
    console.log('URL:', url);

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  static async store(word, definition) {
    const url = `${BASE_URL}/items`;

    console.log('Storing:', { word, definition });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `word=${encodeURIComponent(word)}&definition=${encodeURIComponent(definition)}`
      });

      const responseText = await response.text();

      if (response.ok) {
        return { success: true, message: responseText };
      } else {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
    } catch (error) {
      console.error('Store error:', error);
      throw error;
    }
  }
}
export default ClientApi;
