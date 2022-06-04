const request = require('request')


const forecast = (lat,lon,callback) => {
	const url='http://api.weatherstack.com/current?access_key=d61e546ba0d9a52c78d737bfeae6033e&query='+lat+','+lon+'$units=f' 
	request({url, json:true}, (error, {body}) => {
		if(error) {
		callback('Unable to connect to weather service!',undefined)
		} else if (body.error) {
			callback('Unable to find location', undefined)
		} else {
			const weather_descp = body.current.weather_descriptions[0]
			const temp = body.current.temperature
			const feelslike = body.current.feelslike
			callback(undefined, weather_descp+'. It is currently ' +temp+' degress out.It feels like '+feelslike+' degress out.')
		}
	})

}

module.exports = forecast