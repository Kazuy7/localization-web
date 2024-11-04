import { getCoordinates } from './firebaseConfig.js';

// Função para buscar e exibir os dados
async function fetchData() {
  const data = await getCoordinates();
  displayData(data);
}

// Função para exibir os dados na página
function displayData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = "";
  data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = JSON.stringify(item);
    container.appendChild(itemDiv);
  });
}

// Chama a função fetchData ao carregar a página
fetchData();