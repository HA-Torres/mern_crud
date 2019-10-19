const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

//settings
app.set('port', process.env.PORT);

//middlewares
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri,{
    useNewUrlParser: true, useCreateIndex: true
})
    .then(db => console.log('conection mongo success'))
    .catch(err => console.log(err));

//routes
const user_routes = require('./apis/api_users');
app.use('/users', user_routes);

//server
app.listen(app.get('port'), ()=>{
    console.log('server inicializado on port ' + app.get('port'));
});