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

function displayTemperature(response) {
	let temperature_elem = document.querySelector('#temperature')
	let city_elem = document.querySelector('#city')
	let description_elem = document.querySelector('#description')
	let humidity_elem = document.querySelector('#humidity')
	let wind_elem = document.querySelector('#wind')
	let date_elem = document.querySelector('#date')
	let icon_elem = document.querySelector('#icon')

	temperature_elem.innerHTML = Math.round(response.data.main.temp)
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
}

let api_key = '63608bc5eef30d17258d77a3cb58927f'
let city = 'New York'
let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`

axios.get(api_url).then(displayTemperature)
