import React, { Component } from 'react'
import logo from './Imagenes/LOGO.jpg'
import './AdministradorVentana.css'
import {Tab, Tabs,Alert,Button} from 'react-bootstrap'
import {Grid,Row} from 'react-bootstrap'
import XLSX from 'xlsx'
import dataInitial from './JsonInitial/initialState'
import api from './ComponentsSpecials/api'
import App from "../App.js"
import swal from "sweetalert2"
import SubirExcel from "./componentsApp/SubirExcel"
import RegistroMetricas from "./componentsApp/RegistroMetricas"
import './cssExternal/animate.css'

const toastSesion=swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1500,
    type : 'success',
    title :'SESIÓN CERRADA CON ÉXITO'
});


const guardarMetricas=swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1500,
    type : 'success',
    title :'MÉTRICAS GUARDADAS CON ÉXITO'
});

/*
swal({
    title: 'EXCEL SUBIDO CON EXITO',
    showConfirmButton: false,
    animation:false,
    timer: 1500,
    type:'success',
    customClass: 'animated bounceIn',
})
*/

class AdministradorVentana extends Component {
  constructor(...props){
      super(...props)
      this.state = {
          metricas:dataInitial.valoresMetricas,
          rawData: dataInitial.rawdataInitial,
          metricaEnable: false,
          sesion:true,
      }

      this.parse = this.parse.bind(this);
      this.postMes = this.postMes.bind(this);
      this.wewewewe = this.wewewewe.bind(this);
  }

//CAMBIOS STEVE
    componentDidMount(){
      //RECUPERAR LAS METRICAS
        api.get('datosmetricas/metricas').then( res => {
            this.setState({
                metricas: res.data
            })
        })
    }

//FUNCIONE STEVE
    //LISTA METRICA
    enableRM = () =>{
      if(this.state.metricaEnable){
          api.get('datosmetricas/metricas').then(res => {
              this.setState(prevState=> ({
                  metricas: res.data,
                  metricaEnable: !prevState.metricaEnable
              }))}
          )
      }else
            this.setState(prevState=>({
                metricaEnable: !prevState.metricaEnable
            }))
    }

    handleChangeRM= (texto,index) => {
        this.setState(prevState =>{
            console.log(texto);
            let valor=prevState.metricas;
            valor[index].nombre=texto;
            return { metricas : valor}
        })
    }

    saveChanges=()=>{
        api.post(`datosmetricas/metricasUpdate`,this.state.metricas).then(res=>{
                this.setState(prevState=>({
                    metricaEnable: !prevState.metricaEnable
                }));
                guardarMetricas({});
            })
    }



//CAMBIOS ALEJANDRO
  postMes = (key) => {
      console.log(key);
      api.post(`datosmetricas/api/${key}`,this.state.rawData[key-1]).then( res =>{
          api.get(`datosmetricas/ponerColor/${key}`).then(
          )
          }
      )
  }

  wewewewe = (mimi,value) => {


      this.setState(prevState => {
          let xdData;
          xdData = prevState;
          //console.log(value)
          xdData.rawData[value.idindicador-1][0].months=mimi

          return xdData
          }
      );
      //console.log(this.state.rawData);

  }

  parse = (XLSXObject, key) => {
      let rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
      let months = []
      months.push(
          {
              month:1,
              eess:[]
          },{
              month:2,
              eess:[]
          },{
              month:3,
              eess:[]
          },{
              month:4,
              eess:[]
          },{
              month:5,
              eess:[]
          },{
              month:6,
              eess:[]
          },{
              month:7,
              eess:[]
          },{
              month:8,
              eess:[]
          },{
              month:9,
              eess:[]
          },{
              month:10,
              eess:[]
          },{
              month:11,
              eess:[]
          },{
              month:12,
              eess:[]
          }
          )

      let kek = (months,key) => this.wewewewe(months,key);

      function handleFile() {
          let f = XLSXObject;
          let reader = new FileReader();
          reader.onload = function(e) {
              let data = e.target.result;
              if(!rABS) data = new Uint8Array(data);
              let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});



              let result = {};
              workbook.SheetNames.forEach(function(sheetName) {
                  let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
                  if(roa.length) result[sheetName] = roa;
              });
              //KEY INDICADOR = KEY.
              console.log(key.idindicador);
                    switch (key.idindicador){
                        case 1:
                        case 3:
                        case 4:
                        case 7:
                            for (let k=1;k<=12;k++) {
                                let xxd = result["ORIGINAL"].map((val, pos) => {
                                    if (pos > 5 && val[1]) {
                                        return Object.assign({}, {
                                            id: pos - 5,
                                            renaes: val[0],
                                            nombre: val[1],
                                            total: parseInt(val[k*3-1]),
                                            sis: parseInt(val[k*3]),
                                            pct: parseFloat(val[1+k*3])
                                        })
                                    }
                                }).filter(item => item);
                                months[k-1].eess = xxd


                            }
                                break;
                        case 5: // CAMBIAR ALGORITMO
                            for (var k=1;k<=12;k++) {
                                var xxd = result["Original"].map((val, pos) => {
                                    if (pos > 5 && val[0]) {
                                        return Object.assign({}, {
                                            id: pos - 5,
                                            renaes: "",
                                            nombre: val[1],
                                            meta: parseInt(val[k*3-1]),
                                            mes: parseInt(val[k*3]),
                                            pct: parseFloat(val[1+k*3])
                                        })
                                    }
                                }).filter(item => item);
                                months[k-1].eess = xxd


                            }
                            break;
                        case 6:
                            for (let k=1;k<=12;k++) {
                                let xxd = result["original"].map((val, pos) => {
                                    if (pos > 5 && val[0]) {
                                        return Object.assign({}, {
                                            id: pos - 5,
                                            renaes: "",
                                            nombre: val[1],
                                            meta: parseInt(val[k*3-1]),
                                            mes: parseInt(val[k*3]),
                                            pct: parseFloat(val[1+k*3])
                                        })
                                    }
                                }).filter(item => item);
                                months[k-1].eess = xxd
                            }
                            break;
                        case 2:
                            for (let k=1;k<=12;k++) {
                                let xxd = result["Original"].map((val, pos) => {
                                    if (pos > 5 && val[0]) {
                                        return Object.assign({}, {
                                            id: pos - 9,
                                            nombre: val[1],
                                            meta: parseInt(val[k*3-1]),
                                            pp: parseInt(val[k*3]),
                                            pct: parseFloat(val[1+k*3])
                                        })
                                    }
                                }).filter(item => item);
                                months[k-1].eess = xxd


                            }
                            break;
                    }





              kek(months,key)
          };
          if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);



      }
      handleFile(XLSXObject)

  }

  cerrarSesion=()=>{
      this.setState({sesion:false});
      toastSesion({});
  }


  render() {
      if(this.state.sesion)
      return (
          <div className="AdministradorVentana">
              <Grid>
                  <Row>
                      <header className="AdministradorVentana-header">
                          <img src={logo} className="AdministradorVentana-logo" alt="logo"/>
                      </header>
                  </Row>
                  <Row className="row_boton_cerrar_sesion">
                      <Button bsStyle="primary" type="submit" onClick={this.cerrarSesion} >Cerrar Sesion</Button>
                  </Row>
                  <Row>
                      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                          <Tab eventKey={1} title="Registro de métricas">
                            <RegistroMetricas texto={"Lista de Métricas"} valores={this.state.metricas}
                                              editable={this.state.metricaEnable} onClickEditar={this.enableRM}
                                                changeEditar={this.handleChangeRM} onClickGuardar={this.saveChanges}/>
                          </Tab>
                          <Tab eventKey={2} title="Subir Excel">
                            <SubirExcel rawData={this.state.rawData} metricas={this.state.metricas}
                                        postMes={this.postMes} parse={(this.parse)}/>
                          </Tab>
                      </Tabs>
                  </Row>
              </Grid>
          </div>
      )
      else
          return <App/>
  }
}

export default AdministradorVentana;
