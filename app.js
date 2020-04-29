const express = require('express');
const app = express();
const https = require('https');

app.set('view engine', 'ejs');
app.get('/', (req,res) => {
    res.render('index',{
        'result' : false,
        'error' : false,
        'joke' : ''
    });
})
app.post('/', (req,res) => {
    https.get('https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist&format=xml&type=twopart', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.render('index',{
                'result' : true,
                'error' : false,
                'joke' : data
            })
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.render('index',{
            'result' : false,
            'error' : true,
            'joke' : ''
        })
    });
})
app.listen(8001);