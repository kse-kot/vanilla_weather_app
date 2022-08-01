function formatDate(timestamp) {
	let date = new Date(timestamp)
	let hours = date.getHours()
	let minutes = date.getMinutes()
	let day = date.getDay()
	if (minutes < 10) {
		minutes = `0${minutes}`
	}
	if (hours < 10) {
		hours = `0${hours}`
	}
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Sunday',
	]
	return `${days[day]} ${hours}:${minutes}`
}

function displayForecast(response) {
	console.log(response.data.daily)
	let forecast_elem = document.querySelector('#forecast')

	let forecast_html = `<div class="row">`
	let days = ['Thu', 'Fri', 'Sat', 'Sun']
	days.forEach(function (day) {
		forecast_html += `
			<div class="col-2">
				<div class="weather-forecast-date">${day}</div>
				<img
					src="http://openweathermap.org/img/wn/04n@2x.png"
					alt=""
					width="56px"
				/>
				<div class="weather-forecast-temperatures">
					<span
						class="weather-forecast-temperature-max"
					>
						18&deg;
					</span>
					<span
						class="weather-forecast-temperature-min"
					>
						12&deg;
					</span>
				</div>
			</div>
			`
	})
	forecast_html += `</div>`
	forecast_elem.innerHTML = forecast_html
}

function getForecast(coordinates) {
	let api_key = '63608bc5eef30d17258d77a3cb58927f'
	let one_call_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api_key}&unit=metric`
	axios.get(one_call_url).then(displayForecast)
}

function displayTemperature(response) {
	let temperature_elem = document.querySelector('#temperature')
	let city_elem = document.querySelector('#city')
	let description_elem = document.querySelector('#description')
	let humidity_elem = document.querySelector('#humidity')
	let wind_elem = document.querySelector('#wind')
	let date_elem = document.querySelector('#date')
	let icon_elem = document.querySelector('#icon')

	celciusTemperature = response.data.main.temp

	temperature_elem.innerHTML = Math.round(celciusTemperature)
	city_elem.innerHTML = response.data.name
	description_elem.innerHTML = response.data.weather[0].description
	humidity_elem.innerHTML = response.data.main.humidity
	wind_elem.innerHTML = Math.round(response.data.wind.speed)
	date_elem.innerHTML = formatDate(response.data.dt * 1000)
	icon_elem.setAttribute(
		'src',
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	)
	icon_elem.setAttribute('alt', response.data.weather[0].description)

	getForecast(response.data.coord)
}

function search(city) {
	let api_key = '63608bc5eef30d17258d77a3cb58927f'
	let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`

	axios.get(api_url).then(displayTemperature)
}

function handleSubmit(event) {
	event.preventDefault()
	let city_input_elem = document.querySelector('#city-input')
	search(city_input_elem.value)
}

function displayFahrenheitTemperature(event) {
	event.preventDefault()
	celcius_link.classList.remove('active')
	fahrenheit_link.classList.add('active')
	let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32
	let temperature_elem = document.querySelector('#temperature')
	temperature_elem.innerHTML = Math.round(fahrenheitTemperature)
}

function displayCelciusTemperature(event) {
	event.preventDefault()
	fahrenheit_link.classList.remove('active')
	celcius_link.classList.add('active')
	let temperature_elem = document.querySelector('#temperature')
	temperature_elem.innerHTML = Math.round(celciusTemperature)
}

let celciusTemperature = null

let form = document.querySelector('#search-form')
form.addEventListener('submit', handleSubmit)

let fahrenheit_link = document.querySelector('#fahrenheit-link')
fahrenheit_link.addEventListener('click', displayFahrenheitTemperature)

let celcius_link = document.querySelector('#celcius-link')
celcius_link.addEventListener('click', displayCelciusTemperature)

search('New York')
displayForecast()
