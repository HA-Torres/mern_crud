const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database');

const path = require('path')
const d_public = path.join(__dirname, 'public');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/all_data',require('./routes/crud_routes'));

//static files
app.use(express.static(d_public));

//server
app.listen(app.get('port'), ()=>{
    console.log('server inicializado on port ' + app.get('port'));
});