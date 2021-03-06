const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set engine and views location for handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Andrew Mead'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Andrew'
	})
})


app.get('/help',(req, res) => {
	res.render('help', {
		title: 'Ask Anything!',
		name: 'Andrew'
	})
})

app.get('/weather',(req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'Please provide address'
		})
	}
	
	geocode(req.query.address, (error, {lat, lon, location} = {}) => {
		if(error){
			return res.send({ error })
		}
		forecast(lat, lon, (error, forecastData) => {
			if(error) {
				return res.send({ error })
			}
			res.send({
				forecast: forecastData,
				location,
				address:req.query.address
			})
		})
	})
})

app.get('/products', (req, res) => {
	if(!res.query.search){
		return res.send({
			error: 'You must provide a search term'
		})
	}
	res.send({
		products:[]
	})
})

app.get('/help/*', (req, res) => {
	res.render('error_404', {
		title: '404',
		errorMsg: 'Help Article not found',
		name: 'Andrew'
	})
})
app.get('*', (req, res) => {
	res.render('error_404', {
		title:'404',
		errorMsg:'Page Not found',
		name: 'Andrew'
	})
})


app.listen(port ,() => {
	console.log('Server is up to port ' +port)
})