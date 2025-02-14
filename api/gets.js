
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.api_url;

export function getBooks() {
  return new Promise((resolve, reject) => {
    axios.get(API_URL)
      .then((response) => {
        const data = response.data;
        if (response.status != 200) {
          console.error("No se pudo realizar correctamente la petición getBooks():", data.error);
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        } else if (data.length === 0) {
          console.info("🛈 No se encontraron elementos para getBooks():");
          resolve([]); 
        } else if (data) {
          resolve(JSON.parse(JSON.stringify(data))); // Resuelve la promesa y hace una copia profunda
        }
      })
      .catch((error) => {
        console.error("Error en getBooks():", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}