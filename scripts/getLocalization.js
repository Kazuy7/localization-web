import { getCoordinates, db, collection, onSnapshot, query } from "./firebaseConfig.js";

function initializeMap(lat, lgt) {
  const map = L.map("map").setView([lat, lgt], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}

async function updateMapWithCoordinates(map) {
  const data = await getCoordinates();

  if (data.length > 0) {
    const { lat, lgt } = data[0];
    const initialLatitude = parseFloat(lat);
    const initialLongitude = parseFloat(lgt);

    map.setView([initialLatitude, initialLongitude], 13);

    // Remove existing markers if needed
    if (map.marker) {
      map.removeLayer(map.marker);
    }

    // Adiciona um novo marcador
    map.marker = L.marker([initialLatitude, initialLongitude])
      .addTo(map)
      .bindPopup(`Latitude: ${initialLatitude}, Longitude: ${initialLongitude}`)
      .openPopup();
  } else {
    console.error("Nenhuma coordenada encontrada no banco de dados.");
  }
}

async function fetchDataAndDisplayOnMap() {
  const initialData = await getCoordinates();
  const { lat, lgt } = initialData.length > 0 ? initialData[0] : { lat: 0, lgt: 0 };
  const initialLatitude = parseFloat(lat);
  const initialLongitude = parseFloat(lgt);

  const map = initializeMap(initialLatitude, initialLongitude);

  // Atualiza o mapa inicialmente
  await updateMapWithCoordinates(map);

  // Cria uma consulta para a coleção
  const coordinatesQuery = query(collection(db, "coordinates"));

  // Escuta mudanças no Firestore
  const unsubscribe = onSnapshot(coordinatesQuery, async (snapshot) => {
    // Você pode usar snapshot.docs para acessar os documentos na consulta
    await updateMapWithCoordinates(map);
  });

  // Opcional: Retornar a função unsubscribe para permitir parar de escutar
  return unsubscribe;
}

// Chama a função para buscar os dados e exibir o mapa com a coordenada centralizada
fetchDataAndDisplayOnMap();