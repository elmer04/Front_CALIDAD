import React, { Component } from 'react'
import logo from './Imagenes/logo.svg'
import './AdministradorVentana.css'
import './componentsApp/CssComponents/ModalResponsive.css'
import {Tab, Tabs,Alert} from 'react-bootstrap'
import Modal from 'react-responsive-modal'
import XLSX from 'xlsx'
import dataInitial from './JsonInitial/initialState'
import api from './ComponentsSpecials/api'
import SubirExcel from "./componentsApp/SubirExcel"
import ListaPosta from "./componentsApp/ListaPosta"
import RegistroMetricas from "./componentsApp/RegistroMetricas"
import DescripcionPosta from "./componentsApp/DescripcionPosta"
import NotesPanel from './componentsApp/NotesPanel'


class AdministradorVentana extends Component {
  constructor(...props){
      super(...props)
      this.state = {
          //view: 1,
          metricas:dataInitial.valoresMetricas,
          eess: dataInitial.eess,
          rawData: dataInitial.rawdataInitial,
          BoxBuscar: dataInitial.BoxBuscar,
          BoxNiveles:  dataInitial.BoxNiveles,
          filtroResultado:dataInitial.filtroResultado,
          metricaEnable: false,
          buscarPor:dataInitial.BoxBuscar[0],
          buscarText:'',
          selectListar : '',
          selectMetricaListar : 1,
          posta : dataInitial.posta,
          niveles: dataInitial.Niveles,
          max_min : true,
          openModal : false,
          Autorizado:false
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
        }).then(
            api.get('eess/eessMetricaColor/1').then(res =>{
                this.setState({
                    eess: res.data
                })
            })
        )
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
        api.post(`datosmetricas/metricasUpdate`,this.state.metricas).then(
                this.setState(prevState=>({
                    metricaEnable: !prevState.metricaEnable
                }))
            )
    }

    buscarPorClick=()=>{
        switch(this.state.buscarPor){
            case dataInitial.BoxBuscar[0]:
                console.log(1)
                api.get(`eess/renaes/${this.state.buscarText}`).then(res =>
                    {
                        this.setState({posta:res.data,openModal:true})
                    }
                ).catch(
                        console.log("NO EXISTE CENTRO DE SALUD")
                )

                break;
            case dataInitial.BoxBuscar[1]:
                console.log(2)
                api.get(`eess/nombre/${this.state.buscarText}`).then(res =>
                    {
                        this.setState({posta:res.data,openModal:true})
                    }
                ).catch(
                        console.log("NO EXISTE CENTRO DE SALUD")
                )
        }
    }

    escogerNivel=()=>{
        if(this.state.selectListar=='total') {
            //console.log('estoy en lista 1');
            api.get(`eess/eessMetricaColor/${this.state.selectMetricaListar}`).then(res => {
                this.setState({eess: res.data})
            })
        }else {
            //console.log('estoy en listar 2');
            api.get(`eess/eessMetricaColor/${this.state.selectMetricaListar}/${this.state.selectListar}`).then(res => {
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
    }



//CAMBIOS ALEJANDRO
  /*changeView = () => {
      if (this.state.view===2){
          this.setState(prevState => ({
              view:1
          }))
      }else{
          api.get('eess/api').then(res =>{
              this.setState(prevState => ({
                  eess: res.data,
                  view: 2
              }))
          })


      }

  }
*/
  postMes = (key) => {
      //console.log("Estoy en postmes");
      console.log(key);
      api.post(`datosmetricas/api/${key}`,this.state.rawData[key-1]).then( res =>{

          api.get(`datosmetricas/ponerColor/${key}`).then(
              <Alert bsStyle="success">
                  <h1>Proceso Completado</h1>
              </Alert>
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

      return handleFile(XLSXObject)
  }

  render() {
      return (
          <div className="AdministradorVentana">
              <header className="AdministradorVentana-header">
                  <img src={logo} className="AdministradorVentana-logo" alt="logo"/>
                  <h1 className="AdministradorVentana-title">MODULO de Administrador</h1>
              </header>
              <Tabs defaultActiveKey={5} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Registro de métricas">
                    <RegistroMetricas texto={"Lista de Métricas"} valores={this.state.metricas}
                                      editable={this.state.metricaEnable} onClickEditar={this.enableRM}
                                        changeEditar={this.handleChangeRM} onClickGuardar={this.saveChanges}/>
                  </Tab>
                  <Tab eventKey={2} title="Subir Excel">
                    <SubirExcel rawData={this.state.rawData} metricas={this.state.metricas}
                                postMes={this.postMes} parse={(this.parse)}/>
                  </Tab>
                  <Tab eventKey={3} title="Lista de Postas">
                    <ListaPosta eess={this.state.eess} filtroResultado={this.state.filtroResultado}
                                valoresBox1={this.state.BoxBuscar} valoresBox2={this.state.metricas}
                                valoresButton1 ={this.state.BoxNiveles} listarOnClick={this.escogerNivel}
                                listaChange={this.handleColorChange} listaMetricaChange={this.handleMetricaChange}
                                buscarPorChange={this.handleBuscarChange} buscarPorClick={this.buscarPorClick}
                                buscarTextChange={this.handleBuscarTextChange} OrdenChange={this.handleOrdenChange}
                                />
                  </Tab>
                  <Tab eventKey={4} title="Notas prueba">
                      <NotesPanel/>
                  </Tab>

                  <Modal open={this.state.openModal} onClose={this.onCloseModal}
                         classNames={{ modal:'custom-modal'}}>
                    <DescripcionPosta posta={this.state.posta} fechaultima={["12","34","34"]}
                                      fechaproxima ={["12","34","34"]} colores={this.state.niveles}
                                      metricas={this.state.metricas} />

                  </Modal>
              </Tabs>
          </div>
      )
      /*

       <Tab eventKey={4} title="Descripcion de la Posta">
      </Tab>
      if (this.state.view===1){
    return (
        <div>
        <Grid>
            <Col xs={3} md={2}>
                <Button bsStyle="primary" type="submit" onClick={this.changeView}>HOli</Button>
            </Col>
            <Col xs={3} md={2}>
                <Button bsStyle="primary" type="submit" onClick={this.changeView}>CAMBIAR VISTA</Button>
            </Col>
            <Col xs={12} md={8}>
                <div className="AdministradorVentana">
                    <header className="AdministradorVentana-header">
                        <img src={logo} className="AdministradorVentana-logo" alt="logo" />
                        <h1 className="AdministradorVentana-title">MODULO de Administrador</h1>
                    </header>
                    <MetricTabs data={this.state.rawData} metrics={this.state.metricas} onClick={this.postMes} parse={this.parse}/>
                </div>
            </Col>
            <Col xs={3} md={2}>
            </Col>

        </Grid>
        </div>
    )}else {
          return(
              <Grid>
                  <Col xs={3} md={2}>
                      <Button bsStyle="primary" type="submit" onClick={this.changeView}>CAMBIAR VISTA</Button>
                  </Col>
                  <Col xs={12} md={8}>
                      <div className="AdministradorVentana">
                          <header className="AdministradorVentana-header">
                              <img src={logo} className="AdministradorVentana-logo" alt="logo" />
                              <h1 className="AdministradorVentana-title">MODULO de DIRIS</h1>
                          </header>
                          <Row>
                            <EESSList eess={this.state.eess}/>
                          </Row>
                      </div>
                  </Col>
                  <Col xs={3} md={2}>
                  </Col>

              </Grid>

          )
      }*/
  }
}

export default AdministradorVentana;
