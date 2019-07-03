//import de las librerias react
import React, { Component } from 'react';
import { render } from 'react-dom';

//clase donde se construira nuestra app
class App extends Component{
    //constructor de la applicacion donde se declara la variable state para almacenar valores en la base de datos
    constructor(){
        super();
        this.state = {
            name : '',
            apellido : '',
            personas: [],
        };

        //se declaran las funciones que utilizaremos
        this.add_persona = this.add_persona.bind(this);
        this.inp_cambio = this.inp_cambio.bind(this);
    }

    /*
    *este metodo se dirije a nuestra api declarada en el archivo ./routes/crud_routes, al metodo post
    */
    add_persona(e){

        fetch('/api/all_data',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then((data)=>{
                M.toast({
                    html: data.msj
                });
                this.setState({name: '', apellido:''});
                this.get_personas();
            })
            .catch(err => console.error(err));

        e.preventDefault();
    }
/*
* esta funcion revisa si hay algun cambio en alguno de los inputs y pone el valor a la variable state
* */
    inp_cambio(e){
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }
componentDidMount() {
        this.get_personas();
}

    get_personas(){
        fetch('/api/all_data')
            .then(resp => resp.json())
            .then(data => {
                this.setState({personas: data.response});
            });
    }

    update_persona(id_persona){
        fetch('/api/all_data' + id_persona,{
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then((data)=>{
                M.toast({
                    html: data.msj
                });
                this.setState({name: '', apellido:''});
                this.get_personas();
            })
    }

    delete_persona(id_persona){
        fetch('/api/all_data/' + id_persona,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then((data)=>{
                M.toast({
                    html: data.msj
                });
                this.get_personas();
            })
            .catch(err => console.error(err));
    }

    /*
    * El metodo render() es propio de react el cual nos ayuda a renderizar un solo componente q a su vez puede tener mas componentes dentro*/
    render() {
        return(
            <div>
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a className='brand-logo' href="/">M E R N</a>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>
                                <div className='card-content'>
                                    <form onSubmit={this.add_persona}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='name' type="text" placeholder='Nombre' value={this.state.name} onChange={this.inp_cambio}/>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='apellido' type="text" placeholder='Apellido' value={this.state.apellido} onChange={this.inp_cambio}/>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn light-blue darken-4'>Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Acction</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.state.personas.map(persona =>{

                                    return(
                                        <tr key={persona._id}>
                                            <td>{persona.name}</td>
                                            <td>{persona.apellido}</td>
                                            <td>
                                                <button className='btn light-blue darken-4' style={{margin:'4px'}} onClick={()=>{this.update_persona(persona._id)}}>
                                                    <i className='material-icons'>edit</i>
                                                </button>
                                                <button className='btn red darken-4' onClick={()=> { this.delete_persona(persona._id) }}>
                                                    <i className='material-icons'>delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*
* Exportamos la clase completa para poder usarla en otros archivos*/
export default App;