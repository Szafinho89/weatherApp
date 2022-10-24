const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const windspeed = document.querySelector('.windspeed')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=54e3c6cec698ca7d4bdb6970f2677689'
const API_UNITS = '&units=metric'

const getWeather = () => {
    warning.textContent= ''
    const city = input.value || 'Toronto' // NOWOŚĆ UWAGA - jesli nie ma wartosci no to bedzie LONDON

    const URL = API_LINK + city + API_KEY + API_UNITS


    axios.get(URL).then(res => {
        const id = res.data.weather[0].id
        // const id = 741
        // console.log(id);
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = res.data.weather[0]
        const wind = res.data.wind.speed
        console.log(res.data.weather[0].id);

        // ewentualnie mozemy dostac sie do statusu za pomoca rest operatora
        // const status = Object.assign({}, ...res.data.weather)
        // majek skorzystal ze rest operatora "..." żeby pokazac jak rozsmaworal obiekt i wrzucil go do nowego obiektu - osiagnal to samo co osiagnelismy robiac to tak: res.data.weather[0].main - myslale ze rest operator rozsmarowuje i zwraca nową tablicę a tutaj jednak zwrocil OBIEKT :/

        cityName.textContent= res.data.name
        temperature.textContent= temp.toFixed() + ' st C'
        humidity.textContent= hum + '%'
        windspeed.textContent= wind + ' km/h'
        weather.textContent= status.main

        let atmosphere
        if (id === 741) {
            atmosphere = 'fog'
        } else if (id >= 801 && id <= 804) {
            atmosphere = 'cloud'
        } else if (id >= 200 && id < 300) {
            atmosphere = 'thunderstorm'
        } else if (id >= 300 && id < 400) {
            atmosphere = 'drizzle'
        } else if (id >= 500 && id < 600) {
            atmosphere = 'rain'
        } else if (id >= 600 && id < 700) {
            atmosphere = 'ice'
        } else if (id === 800) {
            atmosphere = 'sun'
        } else {
            atmosphere = 'unknown'
        }
        photo.setAttribute('src', '/img/'+ atmosphere +'.png')

    }).catch(() => warning.textContent= 'Wpisz poprawną nazwę miasta.')
}

const checkEnter = (e) => {     //tworzymy funkcje, żeby móc Enterem uruchamiac
    if (e.key === 'Enter') {    // getWeather
        getWeather()
    }
}

input.addEventListener('keyup', checkEnter) //a tu nasluchiwacz Entera
button.addEventListener('click', getWeather)