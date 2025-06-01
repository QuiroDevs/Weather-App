const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Función de búsqueda
const buscarCiudad = () => {
    const APIkey = '72f0268127e5fa062a0d0e366936d20d';
    const city = searchInput.value.trim(); // Usamos .trim() para eliminar espacios al inicio y al final

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city) return;

            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active'); // Mostrar el contenedor
            weatherBox.classList.add('active'); // Mostrar la caja del clima
            weatherDetails.classList.add('active'); // Mostrar los detalles
            error404.classList.remove('active'); // Ocultar error 404

            // Actualizar la imagen de acuerdo con el clima
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = 'images/cloud.png';
            }

            // Actualizar los valores de temperatura, descripción, humedad y viento
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        }).catch((error) => {
            console.log("Error fetching weather data:", error);
            error404.classList.add('active');
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
        });
};

// Evento de clic en el botón de búsqueda
searchButton.addEventListener('click', buscarCiudad);

// Evento para detectar la tecla "Enter" en el campo de búsqueda
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        buscarCiudad(); // Ejecutar la búsqueda si se presiona "Enter"
    }
});
