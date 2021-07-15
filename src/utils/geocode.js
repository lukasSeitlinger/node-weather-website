import request from "postman-request"

export const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+
    encodeURIComponent(address)+".json"+
    "?access_token=pk.eyJ1IjoibHVrYXMtc2VpdGxpbmdlciIsImEiOiJja3F4cm15OGQxMTRpMndvMWpzMjkxeGFwIn0.OmR96JcGvg8qL0ybtMiJpA"+
    "&limit=1"

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geo-location service", undefined)
        } else if (body.features.length==0) {
            callback("Invalid location request", undefined)
        } else {
            let r = body.features[0]
            let lon = r.center[0]
            let lat = r.center[1]
            let name = r.place_name
            callback(undefined, {lat, lon, name})
        }
    })
}