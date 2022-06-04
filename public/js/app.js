console.log('Cosile')


fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


// messageOne.textContent = 'Form  Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent =  data.error
                // console.log()
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})

