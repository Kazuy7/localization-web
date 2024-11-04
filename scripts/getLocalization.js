import { getCoordinates } from './firebaseConfig.js';

async function fetchDataAndDisplayOnMap() {
  const data = await getCoordinates();

  // Verifica se existem dados e usa o primeiro item como coordenada padrão
  if (data.length > 0) {
    const { lat, lgt } = data[0];
    const initialLatitude = parseFloat(lat);
    const initialLongitude = parseFloat(lgt);

    // Inicializa o mapa com a coordenada do primeiro item
    const map = L.map('map').setView([initialLatitude, initialLongitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Adiciona um marcador na coordenada inicial
    L.marker([initialLatitude, initialLongitude]).addTo(map)
      .bindPopup(`Latitude: ${initialLatitude}, Longitude: ${initialLongitude}`)
      .openPopup();
  } else {
    console.error("Nenhuma coordenada encontrada no banco de dados.");
  }
}

// Chama a função para buscar os dados e exibir o mapa com a coordenada centralizada
fetchDataAndDisplayOnMap();