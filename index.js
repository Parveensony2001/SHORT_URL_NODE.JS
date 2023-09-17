const express = require('express');
const app = express();
const port = 8080;

const db = require('./config/mongoose')

const ShortUrl = require('./models/shortUrl');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static('./assets'));


app.get('/', async (req, res) => {
    const ShortUrlsList = await ShortUrl.find({})
    return res.render('index',{shortUrls: ShortUrlsList})
})

app.post('/shortUrls', async (req, res) => {      // simple page
    const cout = await ShortUrl.countDocuments()+1;
    await ShortUrl.create({
        count : cout,
        full: req.body.fullURL  //fullurl means please enter your url
    })
    return res.redirect('/') //we ive our side url
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrlData = await ShortUrl.findOne({ short: req.params.shortUrl})
    if(shortUrlData == null){          //parems is help to get deta 
        return res.render('notfound');   //if any error then redirct to not found ejs file
    }
    shortUrlData.clicks++;    //use clicks function so wen we use the always cout clicking 
    shortUrlData.save();
    return res.redirect(shortUrlData.full)    //internal acces for API
})

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Successfully running on port : ${port}`)
})