//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

import request from "postman-request"

export const forecast= function(latitude, longitude, callback) {
    const url = 'http://api.weatherstack.com/current'+
    '?access_key=156dba799d8421537678af95836c7655'+
    '&query='+latitude+','+longitude+
    '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weatherStack service.", undefined)
        } else if (body.error) {
            callback("Invalid weather stack query:"+body.error, undefined)
        } else {
            let currentWeather = body.current
            let desc = currentWeather.weather_descriptions[0]
            let currentTemperature = currentWeather.temperature
            let feelsLike = currentWeather.feelslike
            let humidity = currentWeather.humidity
            callback(undefined, desc + 
                ". It is currently " + currentTemperature + "°C out. " +
                "It feels like "+feelsLike+"°C. " + 
                "The humidity is " + humidity + "%.")
        }
    })
}