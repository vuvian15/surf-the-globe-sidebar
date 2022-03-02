let lat = document.getElementById("latitude") // grabs html tag with id of latitude
let long = document.getElementById("longitude") // grabs html tag with id of longitude
let formSubmit = document.getElementById("formSubmit") // grabs html tag with id of formSubmit
let darkModeButton = document.getElementById("darkMode") // grabs html tag with id of darkMode
let body = document.body // grabs entire body of html page, not necessary but makes it easier to just type body
let obj;



  
// connects our form so that when submit button is clicked 
// it tells express to send the post route, which begins all of the backend data retrieval
formSubmit.addEventListener('submit', () => {
    fetch("/search")
        .then(response => response.json())
        .then(result => obj = result)
        .catch(error => console.log('error', error));
})


// similar event listener to above
// only for activating dark mode
// unnecessary, but could transfer over to final product
darkModeButton.addEventListener('click', () => {
    if (body.style.backgroundColor == "white")
    {
        console.log("Clicked to Dark Mode")
        body.style.backgroundColor = "#121212" // as an example, body is the variable described above, style is property, in this case that property is basically the css functionality, and background color is a further property within style
        body.style.color = "white"
        darkModeButton.innerText = "Light Mode"
    } 
    else
    {
        console.log("Clicked to Light Mode")
        body.style.backgroundColor = "white"
        body.style.color = "black"
        darkModeButton.innerText = "Dark Mode"
    }
    
})


