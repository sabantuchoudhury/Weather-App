const key = '828K4O2eWtjWw62qhrrmTYMbRe2dh5Av'

const dataInput = document.querySelector('form')
const dataOutput = document.querySelector('currentWeather')
const results = document.querySelector('currentLocation')

const iconDiv = document.querySelector('#iconDiv')
const temperature = document.querySelector('#temperature')

const time = document.querySelector('#time')
const date = document.querySelector('#date')

const iconImage = document.querySelector('#iconImage')

// Uses location key to get weather info.
async function getWeather(id) {
    const response = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`)
    const data = await response.json()
    return (data)
}

// Gets location key.
async function getCity(city) {
    const response = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`)
    const data = await response.json()
    return (data[0])
}

// Ran when user enters city.
async function updateCity(city) {
    const cityInfo = await getCity(city)
    const weather = await getWeather(cityInfo.Key)

    return {
        cityInfo: cityInfo,
        weather: weather
    }
}

const getIcon = (number) => {
    return './icon/' + number + '.png'
}

const dataLayout = (data) => {
    console.log(data.weather[0])
    currentLocation.innerText = (data.cityInfo.EnglishName + ", " + data.cityInfo.Country.LocalizedName)
    currentWeather.innerText = (data.weather[0].WeatherText)
    temperature.innerText = (data.weather[0].Temperature.Metric.Value + "°C")
    iconImage.src = getIcon(data.weather[0].WeatherIcon)
}

// Default city.
updateCity('London')
.then(data => {
    dataLayout(data)
})
.catch(e => console.log(e))

// Input.
dataInput.addEventListener('submit', e => {
    e.preventDefault()
    cityInput = dataInput.userInput.value.trim()
    dataInput.reset()

    updateCity(cityInput)
    .then(data => {
        dataLayout(data)
    })
    .catch(e => console.log(e))
})

