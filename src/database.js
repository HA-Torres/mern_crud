const mongoose = require('mongoose');
const uri = 'mongodb://localhost/crud';

mongoose.connect(uri)
.then(db => console.log('conection success'))
.catch(err => console.log(err));

module.exports = mongoose;