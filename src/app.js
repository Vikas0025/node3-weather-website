const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Vikas'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vikas'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help text',
        name: 'Vikas'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address',
        })
    }
    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error,
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error,
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address,
            })
          })
    })


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Vikas'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Vikas'
    })
})

app.listen(3000, ()=> {
    console.log('Server up  and running on port 3000')
})