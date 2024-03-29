const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ""
messageTwo.textContent = ""
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchPath = '/weather'+
        '?address='+search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch(searchPath).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})