const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://newsortDB:sony2001@cluster0.moic54x.mongodb.net/?retryWrites=true&w=majority');

// mongoose.connect('mongodb://0.0.0.0:27017/urlshortjan');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection problem'));

db.on('open', function(){
    console.log("Connected to MongoDB Successfully");
})

module.exports = db;