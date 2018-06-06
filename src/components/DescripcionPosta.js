import React from 'react';
//import EESSList from "./EESSList";
import { LabelCuadritos, LabelLabels, LabelText} from "./ComponentesAux"
import {Panel} from 'react-bootstrap'
import { Grid,Row,Col } from 'react-bootstrap'
import ParetoDiagram from './ParetoDiagram'
import Map from './Map'
import './CssComponents/DescripcionPosta.css'

const DescripcionPosta = ({posta,fechaultima,fechaproxima,metricas,colores,...props}) =>
    <Grid>
        <Row>
            <h1>{posta.nombre}</h1>
        </Row>
        <Row>
            <Col md={6} id="Paneles">
                <Panel bsStyle="primary"  >
                    <Panel.Heading>Descripcion de Visitas</Panel.Heading>
                    <Panel.Body>
                        <LabelCuadritos texto={"Fecha ultima"} valoresCuadritos={fechaultima}/>
                        <LabelCuadritos texto={"Fecha proxima"} valoresCuadritos={fechaproxima}/>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Descripcion General</Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <LabelText texto={"Tipo"} value={posta.tipo} disable={true} />
                        </Row>
                        <br></br>
                        <Row>
                            <LabelText texto={"Jefe"} value={posta.gerente} disable={true} />
                        </Row>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Ubicación</Panel.Heading>
                    <Panel.Body>
                    <Map isMarkerShown />
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
                        <ParetoDiagram data={[5,10,1,3]} size={[400,400]} />
                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    </Grid>

export default DescripcionPosta
