// Configuración API con key y base URL
const api = {
  key: "3c8eb41150a34b248de9d0dd9217b433",
  base: "https://api.openweathermap.org/data/2.5/"
};

// Ciudad por defecto para mostrar al cargar la página
const defaultCity = 'Santo Domingo';

// Cargar el clima al iniciar con la ciudad por defecto
fetchWeather(defaultCity);

/**
 * Función principal para obtener el clima desde la API.
 * Usa async/await para esperar la respuesta y capturar errores.
 * @param {string} city - Nombre de la ciudad para buscar clima
 */
async function fetchWeather(city) {
  try {
    const response = await fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`);
    if (!response.ok) {
      // Si la ciudad no existe, lanza error para capturarlo abajo
      throw new Error('City not found');
    }
    const data = await response.json();
    updateUI(data); // Actualiza la interfaz con datos recibidos
    changeBackground(Math.round(data.main.temp)); // Cambia fondo según temperatura
  } catch (error) {
    alert(error.message); // Muestra alerta si hubo error (ciudad no encontrada)
  }
}

/**
 * Actualiza la interfaz con los datos del clima recibidos
 * @param {object} data - Datos JSON del clima
 */
function updateUI(data) {
  // Mostrar ciudad y país
  document.getElementById('city').textContent = `${data.name}, ${data.sys.country}`;
  
  // Mostrar temperatura redondeada con °C
  document.getElementById('temp').innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
  
  // Mostrar descripción principal del clima
  document.getElementById('weather').textContent = data.weather[0].main;
  
  // Mostrar temperaturas mínimas y máximas
  document.getElementById('hi-low').textContent = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;

  // Construir y mostrar la fecha actual
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = `${days[today.getDay()]} ${today.getDate()} ${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`;
  document.getElementById('date').textContent = date;
}

// Selecciona el input de búsqueda
const searchbox = document.querySelector('.search-box');

// Escucha la tecla presionada en el input
searchbox.addEventListener('keydown', function(evt) {
  if (evt.key === 'Enter') {   // Si la tecla es Enter
    const query = searchbox.value.trim();  // Quita espacios al inicio y fin
    if (query) {
      fetchWeather(query);   // Busca el clima para la ciudad ingresada
      searchbox.value = '';  // Limpia el input para nueva búsqueda
    }
  }
});

/**
 * Cambia el fondo del body según la temperatura actual
 * @param {number} temp - Temperatura redondeada
 */
function changeBackground(temp) {
  const body = document.body;
  let gradient;

  if (temp < 0) {
    gradient = 'linear-gradient(135deg, #00bcd4, #e1f5fe)';
  } else if (temp < 15) {
    gradient = 'linear-gradient(135deg, #4caf50, #c8ebc9)';
  } else if (temp < 25) {
    gradient = 'linear-gradient(135deg, #ffeb3b, #fff59d)';
  } else {
    gradient = 'linear-gradient(135deg, #f44336, #ffebee)';
  }
  body.style.background = gradient;
}
