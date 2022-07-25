function displayTemperature(response) {
	console.log(response)
	let temperature_elem = document.querySelector('#temperature')
	let city_elem = document.querySelector('#city')
	let description_elem = document.querySelector('#description')
	let humidity_elem = document.querySelector('#humidity')
	let wind_elem = document.querySelector('#wind')
	temperature_elem.innerHTML = Math.round(response.data.main.temp)
	city_elem.innerHTML = response.data.name
	description_elem.innerHTML = response.data.weather[0].description
	humidity_elem.innerHTML = response.data.main.humidity
	wind_elem.innerHTML = Math.round(response.data.wind.speed)
}

let api_key = '63608bc5eef30d17258d77a3cb58927f'
let api_url = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${api_key}`

axios.get(api_url).then(displayTemperature)
