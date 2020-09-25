const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/codeial_development`);
// mongoose.connect(`mongodb+srv://mongodb_user:descode@cluster0.qdl0w.mongodb.net/descodeDB?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;