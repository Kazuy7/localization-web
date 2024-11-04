import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHt34RYLvKmd8EYOyiW2kpZVdFZOFvOUc",
  authDomain: "localization-v1.firebaseapp.com",
  databaseURL: "https://localization-v1-default-rtdb.firebaseio.com",
  projectId: "localization-v1",
  storageBucket: "localization-v1.firebasestorage.app",
  messagingSenderId: "605419845628",
  appId: "1:605419845628:web:a053e628a53c5ac5432479",
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Função para obter as coordenadas
export async function getCoordinates() {
  try {
    const coordinatesCol = collection(db, "coordinates");
    const coordinateSnapshot = await getDocs(coordinatesCol);
    const coordinateList = coordinateSnapshot.docs.map((doc) => doc.data());
    return coordinateList;
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return [];
  }
}

export { onSnapshot, collection, query };
