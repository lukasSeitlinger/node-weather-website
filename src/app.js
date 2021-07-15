import path from 'path'
import express from "express"
import hbs from 'hbs'

import {geocode} from "./utils/geocode.js"
import {forecast} from "./utils/forecast.js"
import { fileURLToPath } from 'url'

const app = express()

const port = process.env.PORT || 3000

//View config for HandleBars
const viewsPath = fileURLToPath(new URL('../templates/views', import.meta.url))
console.log(viewsPath)
app.set("views", viewsPath)
app.set("view engine", "hbs")

const partialsPath = fileURLToPath(new URL("../templates/partials", import.meta.url))
hbs.registerPartials(partialsPath)

//Static directory setup
const staticResourcePath = fileURLToPath(new URL('../public', import.meta.url))
app.use(express.static(staticResourcePath))

app.get("", (req,res) => {
    res.render("index", {
        title: 'Weather App',
        name: "Andrew Mead"
    })
})

app.get("/about", (req,res)=>{
    res.render("about", {
        title: "About Me",
        name: "Andrew Mead"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "An address must be provided."
        })
    }

    geocode(req.query.address, (err, {lat, lon, name} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(lat, lon, (error, weatherString) => {
            if (error) {
                return res.send({
                    error: "Weather API failed: " + error
                })
            }
            res.send({
                location: name,
                forecast: weatherString,
                address: req.query.address
            })
        })

    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({        
        products: []
    })
    
})

app.get('/help', (req, res) => {
    res.render("help", {
        message: "There is no HELP!",
        title:"Help",
        name:"Andrew Mead"
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Error",
        message: "Help article not found.",
        name:"Andrew Mead"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404 Error",
        message: "Page not found.",
        name:"Andrew Mead"
    })
})

// app.com

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})