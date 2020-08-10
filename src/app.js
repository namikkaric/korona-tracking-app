const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fetch = require('node-fetch');
var cors = require('cors');
var countries = require("i18n-iso-countries");
var checkTemplate = "";

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    checkTemplate = 'index';
    res.render('index', {
        title: 'Covid19 Tracking App',
        name: 'Vaksa'
    }); 
});

app.get('/ba', (req, res) => {
    checkTemplate = 'indexBa';
    res.render('indexBa', {
        title: 'Covid19 Tracking App',
        name: 'Vaksa'
    })
});

app.get('/korona', async (req, res) =>{
    if (!req.query.address) {
        if(checkTemplate === 'index'){
        return res.send({
            error: 'You must provide a country!'
        })
        } else if(checkTemplate === 'indexBa') {
            return res.send({
                error: 'Morate upisati državu za pretragu!'
            })
        }
    }

    const args = req.query.address.split(' ');
    var country = "";
    var country2 = "";

    if(args.length > 1){
    for(var i = 0; i < args.length; i++){
        country = country + "%20" + args[i];
        country2 = country2 + " " + args[i];
    }

    country = country.substring(3);
    country2 = country2.substring(1);

    if(checkTemplate == 'indexBa'){
    var zemlja = countries.getAlpha2Code(country2, 'bs');
    module.exports.drzave = countries.getNames('ba');
    var zemlja2 = countries.getName(zemlja, 'en');

    if(typeof zemlja2 == 'undefined'){
        if(checkTemplate === 'index') {
            return res.send({
                error: 'Country does not exists. Check your spelling!'
            })
            } else if (checkTemplate === 'indexBa') {
                return res.send({
                    error: 'Država ne postoji. Pokušajte ponovo!'
                })
            }
    }
    var stringArray = zemlja2.split(/(\s+)/);
    var stringResult = "";
        for(var i = 0; i < stringArray.length; i++){
            if(i == 0 || i % 2 == 0){
                stringResult = stringResult + "%20" + stringArray[i];
            }
        }
    stringResult = stringResult.substring(3);
    }

    if(checkTemplate === 'index'){
        country = country;
    } else if(checkTemplate == 'indexBa') {
        if (stringResult == 'United%20States%20of%20America'){
            country = 'USA';
        } else if (stringResult == 'United%20Kingdom') {
            country = 'UK';
        } else {
        country = stringResult;
        }
    }

    } else {

     country = req.query.address;

     if(checkTemplate === 'indexBa') {

     var zemlja = countries.getAlpha2Code(country, 'bs');
     var zemlja2 = countries.getName(zemlja, 'en');

     if(typeof zemlja2 == 'undefined'){
        if(checkTemplate === 'index') {
            return res.send({
                error: 'Country does not exists. Check your spelling!'
            })
            } else if (checkTemplate === 'indexBa') {
                return res.send({
                    error: 'Država ne postoji. Pokušajte ponovo!'
                })
            }
    }
    if(checkTemplate === 'index'){
        country = country;
    } else {
        country = zemlja2;
    }
}
}

    const korona = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country="+country, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "04a5eb086cmshe96360c1022de3fp16ce0bjsnaec05fc5a075",
	    'Access-Control-Allow-Origin' : "*",
	    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE'
        }
    }).then(response => response.json().catch(err => {
        if(checkTemplate === 'index') {
        return res.send({
            error: 'Country does not exists. Check your spelling!'
        })
        } else if (checkTemplate === 'indexBa') {
            return res.send({
                error: 'Država ne postoji. Pokušajte ponovo!'
            })
        }
    }));

    if(korona.length === 0){
    } else {
    res.send(korona);
    }
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vaksa',
        errorMessage: 'Page not found'
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
});

