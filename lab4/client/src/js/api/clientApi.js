import { FULL_URL } from "./routes.js";
import POSTRequest from "./POSTRequest.js";

class ClientApi {
  static async search(word) {
    const url = `${FULL_URL}/?name=${encodeURIComponent(word)}`;

    console.log("Searching for:", word);
    console.log("URL:", url);

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }

  static async store(word, definition) {
    console.log("Storing:", { word, definition });

    const url = FULL_URL;
    try {
      const response = await fetch(url, new POSTRequest(word, definition));

      if (!response.ok) {
        const responseText = await response.text();
        return { success: false, message: responseText };
      }

      const result = await response.text();
      return { success: true, message: result };
    } catch (error) {
      console.error("Fetch Failed:", error);
      throw error;
    }
  }
}
export default ClientApi;
