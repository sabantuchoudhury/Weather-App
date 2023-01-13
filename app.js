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

const toTwoDigits = (time) => {
    timeString = time.toString().length
    if (timeString < 2) {
        newTime = '0' + time
    } else {
        newTime = time
    }
    console.log(newTime)
    return newTime
}

const getTime = (data) => {
    const time = new Date(data)
    
    const hours = time.getHours()
    const minutes = time.getMinutes()

    return toTwoDigits(hours) + ':' + toTwoDigits(minutes)
}

const getDate = (data) => {
    const date = new Date(data)
    
    const dayOTW = date.getDay()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    switch(dayOTW) {
        case 1:
            dayOfTheWeek = 'Monday'
            break;
        case 2:
            dayOfTheWeek = 'Tuesday'
            break;
        case 3:
            dayOfTheWeek = 'Wednesday'
            break;
        case 4:
            dayOfTheWeek = 'Thursday'
            break;
        case 5:
            dayOfTheWeek = 'Friday'
            break;
        case 6:
            dayOfTheWeek = 'Saturday'
            break;
        case 7:
            dayOfTheWeek = 'Sunday'
            break;
    }

    return dayOfTheWeek + ', ' + toTwoDigits(day) + '/' + toTwoDigits(month) + '/' + year
}

const dataLayout = (data) => {
    console.log(data.weather[0])
    currentLocation.innerText = (data.cityInfo.EnglishName + ", " + data.cityInfo.Country.LocalizedName)
    currentWeather.innerText = (data.weather[0].WeatherText)
    temperature.innerText = (data.weather[0].Temperature.Metric.Value + "°C")
    time.innerText = (getTime(data.weather[0].LocalObservationDateTime))
    date.innerText = (getDate(data.weather[0].LocalObservationDateTime))
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

