import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.api_url;

export function updateBook(values, idBook) {
  return new Promise((resolve, reject) => {
    axios.patch(
      `${API_URL}/${idBook}`,
      values
    )
      .then((response) => {
        if (response.status != 200) {
          console.error("No se pudo realizar correctamente la petición updateBook():", response.data);
          reject(response);
        } else{
          resolve(response);
        }
      })
      .catch((error) => {
        console.error("Error en updateBook():", error);
        reject(error);
      });
  });
}