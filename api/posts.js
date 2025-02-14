import axios from 'axios';
import Constants from "expo-constants";
const API_URL = Constants.expoConfig.extra.api_url;

export function postBook(product) {
  console.log("[ejecución] postBook()",product)
  return new Promise((resolve, reject) => {
    axios.post(API_URL, product)
   .then((response) => {
        resolve(response); 
      })
      .catch((error) => {
        console.error("Error en postBook():", error);
        reject(error); 
      });
      
  });
}