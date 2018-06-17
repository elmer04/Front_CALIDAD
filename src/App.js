import React, { Component } from 'react'
import Login from "./Source/Login";
import AdministradorVentana from "./Source/AdministradorVentana";
import api from "./Source/ComponentsSpecials/api";
import dataLogin from "./Source/JsonInitial/LoginState";
import UsuarioVentana from "./Source/UsuarioVentana";


class App extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            idUsuario: "",
            Autorizado: true,
            tipo_usuario: "usuario"
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
        switch (this.state.tipo_usuario) {
            case dataLogin.tipo_usuario[0]:
                return <UsuarioVentana idUsuario={this.state.idUsuario}/>;
            case dataLogin.tipo_usuario[1]:
                return <AdministradorVentana idUsuario={this.state.idUsuario} />;

        }
    }

}

export default App;
