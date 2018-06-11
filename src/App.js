import React, { Component } from 'react'
import Login from "./Source/Login";
import AdministradorVentana from "./Source/AdministradorVentana";
import api from "./Source/ComponentsSpecials/api";


class App extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            idUsuario: "",
            Autorizado: false
        };
    }

    UsuarioClick=(user)=>{
        api.post('usuario/login',user).then(res=>{
                this.setState(res.data)
            }
        )

    }

    render(){
        if(!this.state.Autorizado)
            return <Login buttonClick={this.UsuarioClick}/>
        return <AdministradorVentana/>
    }

}

export default App;
