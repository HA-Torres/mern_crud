//imports react libraries
import React, { Component } from 'react';
import { render } from 'react-dom';
//import de la vista App.js
import App from './App';

/*En este metodo estamos indicando que se mostrara una etiqueta llamada app en el elemento con el id = root*/
render(<App/>, document.getElementById('root'));