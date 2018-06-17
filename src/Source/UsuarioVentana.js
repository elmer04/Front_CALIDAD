import React, { Component } from 'react'
import logo from './Imagenes/LOGO.jpg'
import './UsuarioVentana.css'
import './componentsApp/CssComponents/ModalResponsive.css'
import {Button,Tab, Tabs,Alert} from 'react-bootstrap'
import {Row,Grid} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import dataInitial from './JsonInitial/initialState'
import api from './ComponentsSpecials/api'
import ListaPosta from "./componentsApp/ListaPosta"
import DescripcionPosta from "./componentsApp/DescripcionPosta"
import App from "../App.js"
import Login from "./Login";
import GridSave from "./componentsApp/GridSave";
import Notes from "./componentsApp/Notes";


class UsuarioVentana extends Component {
    constructor(...props){
        super(...props)
        this.state = {
            //view: 1,
            idUsuario:(typeof this.props.idUsuario==='undefined' || this.props.idUsuario==='' )?1:this.props.idUsuario,
            user:dataInitial.user,
            metricas:dataInitial.valoresMetricas,
            eess: dataInitial.eess,
            //rawData: dataInitial.rawdataInitial,
            BoxBuscar: dataInitial.BoxBuscar,
            BoxNiveles:  dataInitial.BoxNiveles,
            filtroResultado:dataInitial.filtroResultado,
            //metricaEnable: false,
            buscarPor:dataInitial.BoxBuscar[0],
            buscarText:'',
            selectListar : '',
            selectMetricaListar : 1,
            posta : dataInitial.posta,
            niveles: dataInitial.Niveles,
            notas:[],
            max_min : true,
            openModal : false,
            sesion:true,

        }
    }

//CAMBIOS STEVE
    //async
    componentDidMount(){
        //RECUPERAR LAS METRICAS
        api.get('datosmetricas/metricas').then( resMetrica => {
            console.log( this.props.idUsuario);
            this.setState({metricas: resMetrica.data})
        })
        api.get(`usuario/getUser/${this.state.idUsuario}`).then( resUser => {
            this.setState({user: resUser.data})
            api.get(`eess/eessMetricaColor/${this.state.user.diris.iddiris}/1`).then(resEess =>{
                this.setState({
                    eess: resEess.data
                })
            })
        })
    }

//FUNCIONE STEVE


    buscarPorClick=()=>{
        switch(this.state.buscarPor){
            case dataInitial.BoxBuscar[0]:
                api.get(`eess/renaes/${this.state.user.diris.iddiris}/${this.state.buscarText}`).then(res =>
                    {

                        this.setState({posta:res.data,openModal:true})
                    }
                )

                break;
            case dataInitial.BoxBuscar[1]:
                api.get(`eess/nombre/${this.state.user.diris.iddiris}/${this.state.buscarText}`).then(res =>
                    {

                        this.setState({posta:res.data,openModal:true})
                    }
                )
        }
    }

    escogerNivel=()=>{
        if(this.state.selectListar=='total') {
            //console.log('estoy en lista 1');
            api.get(`eess/eessMetricaColor/${this.state.user.diris.iddiris}/${this.state.selectMetricaListar}`).then(res => {
                this.setState({eess: res.data})
            })
        }else {
            //console.log('estoy en listar 2');
            api.get(`eess/eessMetricaColor/${this.state.user.diris.iddiris}/${this.state.selectMetricaListar}/${this.state.selectListar}`).then(res => {
                this.setState({eess: res.data})
            })
        }
    }

    handleBuscarChange=(buscarPor) => {
        this.setState({buscarPor:buscarPor})
    }

    handleBuscarTextChange=(buscarText) => {
        this.setState({buscarText:buscarText})
    }

    handleColorChange = (color) => {
        this.setState({selectListar : color})
    }
    handleMetricaChange = (metrica) => {
        this.setState({selectMetricaListar : metrica})
    }

    handleOrdenChange= (tipo) => {
        switch(tipo){
            case this.state.filtroResultado[0].key:
                this.setState(prevState=>({
                    eess : prevState.eess.sort((e1,e2)=> e1.porcentaje-e2.porcentaje)
                }))
                break;
            case this.state.filtroResultado[1].key:
                this.setState(prevState=>({
                    eess : prevState.eess.sort((e1,e2)=> e2.porcentaje-e1.porcentaje)
                }))

        }
    }

    onCloseModal = () =>{
        this.setState({openModal:false})
        let fecha=this.state.posta.metricas[0].idfecha
        let valores=[]
        let anotacionDisable=false;
        this.state.notas.map(note => {
            delete note.editorState;
        });
        this.state.notas.map(nota=>{
                anotacionDisable=((typeof nota.text === 'undefined') || (nota.text==''))
                //console.log(anotacionDisable)
                if(!anotacionDisable)
                    valores.push({titulo:nota.title,
                                    anotacion:nota.text,
                                    contenido:nota})
            }
        )
        //console.log(valores)
        api.post(`eess/notas/${this.state.posta.idEESS}/${fecha}`,valores)
    }

    onChangeNotas = (notas) =>{
        this.setState({notas})
    }

    eessClick = (renaes) =>{
        api.get(`eess/renaes/${this.state.user.diris.iddiris}/${renaes}`).then(res1 =>
            {
                let fecha=res1.data.metricas[0].idfecha
                api.get(`eess/notas/${res1.data.idEESS}/${fecha}`).then(res2=> {
                        let notitas=res2.data.map(dato=>
                            JSON.parse(dato.contenido))
                        notitas.map(nota=>
                            delete nota.editorState
                        )
                        this.setState({posta:res1.data,notas: notitas,openModal:true})
                    }
                )
            }
        )
    }

    cerrarSesion=()=>{
        this.setState({sesion:false})
    }

    render() {
        if(this.state.sesion)
        return (
            <div className="UsuarioVentana">
                <header className="UsuarioVentana-header">
                    <img src={logo} className="UsuarioVentana-logo" alt="logo"/>
                </header>
                <Grid>
                    <Row className="row_boton_cerrar_sesion">
                        <Button bsStyle="primary" type="submit" onClick={this.cerrarSesion} >Cerrar Sesion</Button>
                    </Row>
                    <ListaPosta eess={this.state.eess} filtroResultado={this.state.filtroResultado}
                                valoresBox1={this.state.BoxBuscar} valoresBox2={this.state.metricas}
                                valoresButton1 ={this.state.BoxNiveles} listarOnClick={this.escogerNivel}
                                listaChange={this.handleColorChange} listaMetricaChange={this.handleMetricaChange}
                                buscarPorChange={this.handleBuscarChange} buscarPorClick={this.buscarPorClick}
                                buscarTextChange={this.handleBuscarTextChange} OrdenChange={this.handleOrdenChange}
                                eessClick={this.eessClick}/>
                    <Modal open={this.state.openModal} onClose={this.onCloseModal}
                           classNames={{ modal:'custom-modal'}}>
                        <DescripcionPosta posta={this.state.posta} colores={this.state.niveles}
                                          metricas={this.state.metricas} notas={this.state.notas}
                                          onChangeNotas={this.onChangeNotas}/>

                    </Modal>
                </Grid>
            </div>
        )
        else
            return (<App/>)
    }
}

export default UsuarioVentana;
