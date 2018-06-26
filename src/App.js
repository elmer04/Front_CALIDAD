import React, { Component } from 'react';
import {Label} from 'react-bootstrap';
import Login from "./Source/Login";
import AdministradorVentana from "./Source/AdministradorVentana";
import api from "./Source/ComponentsSpecials/api";
import dataLogin from "./Source/JsonInitial/LoginState";
import UsuarioVentana from "./Source/UsuarioVentana";
import swal from 'sweetalert2';
import './Source/cssExternal/animate.css';
import './App.css';

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

class App extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            idUsuario: "",
            Autorizado: false,
            tipo_usuario: ""
        };
    }

    UsuarioClick=(user)=>{
        api.post('usuario/login',user).then(res=>{
                this.setState(res.data)
                if(!res.data.Autorizado)
                    swal({
                        title: 'USUARIO Y/O CONTRASEÑA INVALIDO',
                        animation: false,
                        showConfirmButton: false,
                        customClass: 'animated tada',
                        timer: 1500,
                        type:'error',
                        position: "top"
                    });
            }
        )

    }

    render(){
        if(!this.state.Autorizado)
            return <Login buttonClick={this.UsuarioClick}/>
        toast({
            type: 'success',
            title: 'BIENVENIDO'
        })
        switch (this.state.tipo_usuario) {
            case dataLogin.tipo_usuario[0]:
                return <UsuarioVentana idUsuario={this.state.idUsuario}/>;
            case dataLogin.tipo_usuario[1]:
                return <AdministradorVentana idUsuario={this.state.idUsuario} />;
            default:
                return <div><Label>NO SE ENCUENTRA TIPO DE USUARIO</Label></div>
        }
    }

}

export default App;
