import React from 'react';
//import EESSList from "./EESSList";
import { LabelCuadritos, LabelLabels, LabelText} from "./ComponentesAux"
import {Panel,ControlLabel} from 'react-bootstrap'
import { Grid,Row,Col } from 'react-bootstrap'
import ParetoDiagram from './ParetoDiagram'
import Map from './Map'
import './CssComponents/DescripcionPosta.css'

let convertir_data=(data)=>{
      let data2=[];
      data.map((valor)=>{
          data2.push({
              mini:'indicador '+valor.idindicador,
              def:valor.porcentaje,
              nombre:valor.nombre
          })
      })
      return data2;
};



const DescripcionPosta = ({posta,fechaultima,fechaproxima,metricas,colores}) =>
    <Grid>
        <Row>
            <h1 className="titulo">{posta.nombre}</h1>
        </Row>
        <Row>
            <Col md={6} id="Paneles">
                <Panel bsStyle="primary">
                    <Panel.Heading>Descripcion General</Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <LabelText texto={"Tipo"} value={posta.tipo} disable={true} />
                        </Row>
                        <br/>
                        <Row>
                            <LabelText texto={"Jefe"} value={posta.gerente} disable={true} />
                        </Row>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Ubicación</Panel.Heading>
                    <Panel.Body>
                        {
                            (()=>{
                                if(posta.latitud!=null && posta.longitud!=null) {
                                    return <Map isMarkerShown lat={posta.latitud} lng={posta.longitud}
                                            nombre={posta.nombre}/>
                                }else
                                    return  <Col componentClass={ControlLabel} md={6} mdOffset={3} >
                                               POSICION DESCONOCIDA
                                            </Col>
                            })()
                        }
                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={6}>
                <Panel bsStyle="primary">
                    <Panel.Heading>Métricas</Panel.Heading>
                    <Panel.Body>
                        {
                            metricas.map((metrica)=> {
                                let tipocolor=posta.metricas.find(metrica1 => metrica1.idindicador===metrica.idindicador)

                                let color=(typeof tipocolor === 'undefined') ? '':tipocolor.color
                                return <LabelLabels texto={metrica.nombre} color={color}
                                                    valoresLabels={colores}/>
                            })
                        }
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Promedio Métrica</Panel.Heading>
                    <Panel.Body>
                        <LabelLabels texto="Promedio" valoresLabels={colores}/>
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
        <Row>
            <Col>
                <Panel bsStyle="primary">
                    <Panel.Heading>Diagrama de Pareto</Panel.Heading>
                    <Panel.Body>
                        <ParetoDiagram data={convertir_data(posta.metricas)} size={[400,400]} />
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    </Grid>

export default DescripcionPosta
