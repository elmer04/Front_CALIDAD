import React, { Component } from 'react'
import logo from './Imagenes/LOGO.jpg'
import './UsuarioVentana.css'
import './componentsApp/CssComponents/ModalResponsive.css'
import './componentsApp/CssComponents/Excel.css'
import {Button} from 'react-bootstrap'
import {Row,Grid} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import dataInitial from './JsonInitial/initialState'
import api from './ComponentsSpecials/api'
import ListaPosta from "./componentsApp/ListaPosta"
import DescripcionPosta from "./componentsApp/DescripcionPosta"
import App from "../App.js"
import swal from 'sweetalert2';

const toast = swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1500
});

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
            BoxMetricas:dataInitial.valoresMetricas,
            //metricaEnable: false,
            buscarPor:dataInitial.BoxBuscar[0],
            buscarText:'',
            selectListar : '',
            selectMetricaListar : 1,
            posta : dataInitial.posta,
            niveles: dataInitial.Niveles,
            notas:[],
            fechas:[],
            eessList:dataInitial.eessList,
            max_min : true,
            openModal : false,
            sesion:true,
            cambioModal:false,
        }
    }

//CAMBIOS STEVE
    //async
    componentDidMount(){
        //RECUPERAR LAS METRICAS
        api.get('datosmetricas/metricas').then( resMetrica => {
            let metricas=resMetrica.data.slice();
            metricas.push({
                        idindicador:0,
                        diminutivo:"Promedio",
                    }
                )
            this.setState({metricas: resMetrica.data,BoxMetricas:metricas})
        })
        api.get(`usuario/getUser/${this.state.idUsuario}`).then( resUser => {
            this.setState({user: resUser.data})
            api.get(`eess/api/${resUser.data.diris.iddiris}`).then(resEess =>{
                this.setState({
                    eessList: resEess.data,
                    eess:resEess.data
                })
            })
        })
        api.get('datosmetricas/fechas').then(res=>{
            this.setState({fechas:res.data})
        })

    }

//FUNCIONE STEVE

    buscarPorRenaes=(renaes)=>{
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
                this.setState({posta:res1.data,openModal:true})
            }
        )
    }
    buscarPorNombre=(nombre)=>{
        api.get(`eess/nombre/${this.state.user.diris.iddiris}/${nombre}`).then(res1 =>
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
                this.setState({posta:res1.data,openModal:true})
            }
        )
    }

    buscarPorClick=()=>{

        switch(this.state.buscarPor){
            case dataInitial.BoxBuscar[0]:
                //this.buscarPorRenaes(this.state.buscarText)
                this.setState(prevState=>({
                    eess : prevState.eessList.filter(obj=>(obj.renaes).toString().includes(this.state.buscarText))
                }))
                break;
            case dataInitial.BoxBuscar[1]:
                //this.buscarPorNombre(this.state.buscarText)
                this.setState(prevState=>({
                    eess : prevState.eessList.filter(obj=>obj.nombre.includes(this.state.buscarText.toUpperCase()))
                }))
        }
    }

    escogerNivel=()=>{
        if(this.state.selectMetricaListar!=0)
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
        else{
            if(this.state.selectListar=='total') {
                //console.log('estoy en lista 1');
                console.log("estoy en promedi ocolor")
                api.get(`eess/eessPromedioColor/${this.state.user.diris.iddiris}`).then(res => {
                    console.log(res.data)
                    this.setState({eess: res.data})
                })
            }else {
                api.get(`eess/eessPromedioColor/${this.state.user.diris.iddiris}/${this.state.selectListar}`).then(res => {
                    this.setState({eess: res.data})
                })
            }
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

    eessClick = (nombre) =>{
        this.buscarPorNombre(nombre)
    }

    cerrarSesion=()=>{
        this.setState({sesion:false})
    }

    changeMesYear=(idfecha)=>{
        this.setState({cambioModal:true})
        api.get(`eess/eessMetricaColorFecha/${this.state.posta.idEESS}/${idfecha}`).then(res => {
            api.get(`eess/eessFechaColor/${this.state.posta.idEESS}/${idfecha}`).then(res2 =>{
                this.setState(prevDefault=>({
                    posta:{...prevDefault.posta,metricas:res.data,color:res2.data.color
                        ,porcentaje:res2.data.porcentaje},
                    cambioModal:false
                }))
            })
        })
        api.get(`eess/notas/${this.state.posta.idEESS}/${idfecha}`).then(res2=> {
                let notitas=res2.data.map(dato=>
                    JSON.parse(dato.contenido))
                notitas.map(nota=>
                    delete nota.editorState
                )
                this.setState({notas: notitas})
            }
        )
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
                        <Button className="btn_cerrar_sesion" bsStyle="primary" type="submit" onClick={this.cerrarSesion} >Cerrar Sesión</Button>
                    </Row>
                    <ListaPosta eess={this.state.eess} filtroResultado={this.state.filtroResultado}
                                valoresBox1={this.state.BoxBuscar} valoresBox2={this.state.BoxMetricas}
                                valoresButton1 ={this.state.BoxNiveles} listarOnClick={this.escogerNivel}
                                listaChange={this.handleColorChange} listaMetricaChange={this.handleMetricaChange}
                                buscarPorChange={this.handleBuscarChange} buscarPorClick={this.buscarPorClick}
                                buscarTextChange={this.handleBuscarTextChange} OrdenChange={this.handleOrdenChange}
                                eessClick={this.eessClick}/>
                    <Modal open={this.state.openModal} onClose={this.onCloseModal}
                           classNames={{ modal:'custom-modal'}}>
                        <DescripcionPosta posta={this.state.posta} colores={this.state.niveles}
                                          metricas={this.state.metricas} notas={this.state.notas}
                                          fechas={this.state.fechas}
                                          onChangeNotas={this.onChangeNotas} onChangeFecha={this.changeMesYear}
                                          paretoCambio={this.state.cambioModal} notasCambio={this.state.cambioModal}/>

                    </Modal>
                </Grid>
            </div>
        )
        else
            return (<App/>)
    }
}

export default UsuarioVentana;
