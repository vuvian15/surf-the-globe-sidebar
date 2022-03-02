const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios')
const port = process.env.PORT || 3000 // saving port to be used in server into variable


app.set('view engine', 'ejs') // sets engine for ejs formatting 

// tells express to search for static files in views directory, static files are html files
app.use(express.static(path.join(__dirname + '/views'))) 
//app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true })) // parses requests in JSON format
app.use(express.json()) // similar to above, ensures we use JSON format for data from api's

 
// similar to above, tells express to search for static files in public directory
// in this case, static files are css and javascript
app.use(express.static(path.join(__dirname + '/public')))

// both of below statements are meant to incorporate three.js library for 3-d functionality
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));


let newsStories = [] // this will be array of objects to store news stories
let newsCollected = true 
let countryCode // will store country code returned from geoapify api
let countryName // will store country name returned from geoapify api

// "get" route that targets our home/landing page, no matter the result fo the if statement, 
// we render the index file in views directory
app.get('/', (req, res) => {
    // if (newsStories.length > 0)
    // {
    //     newsCollected = true
    //     res.render('index', { newsCollected })
    //     //res.send
    //     //res.redirect
    // }
    // else
    // {
    //     newsCollected = false
    //     res.render('index', { newsCollected })
    // }
    res.render('index') // landing page
})

app.get('/news', (req, res) => {
    res.render('news-globe') // news globe page aka informational page
})

// "post" route that handles most of our logic
// pulls latitude/longitude and serves it into axios "get" request to geoapify
// that returns country code that is served into subsequent axios "get" request to newsapi
// that returns our news stories that will be "pushed" or appended into array
// finally we redirect into results route

app.post('/search', async (req, res) => { // post request to route search
    const { latitude, longitude } = req.body // destructuring or unpacking object
    //console.log(latitude + " " + longitude)
    // console.log(req.body)
    await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=6650f1fc646f45b9ac9f90d91eec2078`) // 
        .then( (response) => {
            //console.log(response.data.features[0].properties.country_code)
            countryCode = response.data.features[0].properties.country_code;
            countryName = response.data.features[0].properties.country;
        })
        .catch( (error) => {
            // handle error
            console.log(error);
        })
    await axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=fb4e52ef50da4fe1ba96b5b92562f13b`)
        .then( (response) => {
            newsStories = []
            for (let i = 0; i < 10; i++)
            {
                //console.log(response.data.articles[i])
                newsStories.push(response.data.articles[i])
                //console.log(newsStories[i])
            }
        })
        .catch( (error) => {
            // handle error
            console.log(error);
        })
    //res.send('worked')
    res.redirect('/results') // redirects to results route, which will display results to user
})


// "get" route that targets our results page, and will render results file from views directory
app.get('/results', (req, res) => {
    //res.render('results')
    res.render('results', { newsStories, countryName }) // renders results, { newsStories, countryName } this will pass the newsStories array and country name variable into the file using the ejs package, which is for templating and sending data into files
})
 

// starts server, console.log is to ensure things worked properly
app.listen(port, () =>
console.log(`App listening at http://localhost:${port}`)
);