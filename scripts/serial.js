function processData(data) {
  console.log("Dados recebidos brutos:", data); // Para debug

  const regex = /Latitude: ([-\d.]+), Longitude: ([-\d.]+)/;
  const match = data.match(regex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Enviar ao Firestore
    addCoordinate(latitude, longitude);
  } else {
    console.error("Formato de dados inválido:", data);
  }
}
