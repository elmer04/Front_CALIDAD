import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {Tab, Tabs} from 'react-bootstrap'
import XLSX from 'xlsx'
import dataInitial from './initialState'
import axios from 'axios'
import SubirExcel from "./components/SubirExcel"
import ListaPosta from "./components/ListaPosta"
import RegistroMetricas from "./components/RegistroMetricas"
import DescripcionPosta from "./components/DescripcionPosta";


class App extends Component {
  constructor(...props){
      super(...props)
      this.state = {
          //view: 1,
          metricas:dataInitial.valoresMetricas,
          eess: dataInitial.eess,
          rawData: dataInitial.rawdataInitial,
          BoxBuscar: dataInitial.BoxBuscar,
          BoxNiveles:  dataInitial.BoxNiveles,
          filtroResultado:dataInitial.filtroResultado
      }

      this.parse = this.parse.bind(this);
      this.postMes = this.postMes.bind(this);
      this.wewewewe = this.wewewewe.bind(this);
  }

//CAMBIOS STEVE
    componentDidMount(){
      //RECUPERAR LAS METRICAS
        axios.get('http://localhost:8000/datosmetricas/metricas').then( res => {
            var valores=res.data.map(n => {return {
                key: n.idindicador,
                nombre: n.nombre
            }});
            this.setState( prevState => ({
                metricas: valores
            }))
        }).then(
            axios.get('http://localhost:8000/eess/api').then(res =>{
                this.setState(prevState => ({
                    eess: res.data,
                }))
            })
        )
    }

//CAMBIOS ALEJANDRO
  /*changeView = () => {
      if (this.state.view===2){
          this.setState(prevState => ({
              view:1
          }))
      }else{
          axios.get('http://localhost:8000/eess/api').then(res =>{
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
      //console.log(key);
      axios.post(`http://localhost:8000/datosmetricas/api/${key}`,this.state.rawData[key-1]).then(res =>
            console.log(res)
      )
  }

  wewewewe = (mimi,value) => {


      this.setState(prevState => {
          let xdData;
          xdData = prevState;

          xdData.rawData[value.key-1][0].months=mimi

          return xdData
          }
      );
      console.log(this.state.rawData);

  }

  parse = (XLSXObject, key) => {
      var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
      var months = []
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

      function handleFile(e) {
          var f = XLSXObject;
          var reader = new FileReader();
          reader.onload = function(e) {
              var data = e.target.result;
              if(!rABS) data = new Uint8Array(data);
              var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});



              var result = {};
              workbook.SheetNames.forEach(function(sheetName) {
                  var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
                  //
                  //
                  if(roa.length) result[sheetName] = roa;
              });

              //console.log(key.key);
                    switch (key.key){
                        case 1:
                        case 3:
                        case 4:
                        case 7:
                            for (var k=1;k<=12;k++) {
                                var xxd = result["ORIGINAL"].map((val, pos) => {
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
                        case 5:
                        case 6:
                            for (var k=1;k<=12;k++) {
                                var xxd = result["ORIGINAL"].map((val, pos) => {
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
                            for (var k=1;k<=12;k++) {
                                var xxd = result["Original"].map((val, pos) => {
                                    if (pos > 5 && val[0]) {
                                        return Object.assign({}, {
                                            id: pos - 5,
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
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <h1 className="App-title">MODULO de Administrador</h1>
              </header>
              <Tabs defaultActiveKey={4} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="Registro de métricas">
                    <RegistroMetricas texto={"Lista de Métricas"} valores={this.state.metricas}/>
                  </Tab>
                  <Tab eventKey={2} title="Subir Excel">
                    <SubirExcel rawData={this.state.rawData} metricas={this.state.metricas} postMes={this.postMes()} parse={(this.parse)}/>
                  </Tab>
                  <Tab eventKey={3} title="Lista de Postas">
                    <ListaPosta eess={this.state.eess} filtroResultado={this.state.filtroResultado} valoresBox1={this.state.BoxBuscar} valoresBox2={this.state.metricas} valoresButton1 ={this.state.BoxNiveles} />
                  </Tab>
                  <Tab eventKey={4} title="Descripcion de la Posta">
                    <DescripcionPosta texto={"Nombre de Posta"}/>
                  </Tab>
              </Tabs>
          </div>
      )
      /*
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
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">MODULO de Administrador</h1>
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
                      <div className="App">
                          <header className="App-header">
                              <img src={logo} className="App-logo" alt="logo" />
                              <h1 className="App-title">MODULO de DIRIS</h1>
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

export default App;
