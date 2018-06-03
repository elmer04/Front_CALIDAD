import React from 'react';
import EESSList from "./EESSList";
import {BoxInput, LabelBox, LabelCuadritos, LabelLabels, LabelRadioButton, LabelText} from "./ComponentesAux"
import {Panel, form,Button,Label} from 'react-bootstrap'
import { Grid,Row,Col } from 'react-bootstrap'

import './CssComponents/DescripcionPosta.css'

const DescripcionPosta = ({texto,...props}) =>
    <Grid>
        <Row>
            <h1>{texto}</h1>
        </Row>
        <Row>
            <Col md={6} id="Paneles">
                <Panel bsStyle="primary"  >
                    <Panel.Heading>Descripcion de Visitas</Panel.Heading>
                    <Panel.Body>
                        <LabelCuadritos texto={"Fecha ultima"} valoresCuadritos={["12","34","34"]}/>
                        <LabelCuadritos texto={"Fecha proxima"} valoresCuadritos={["12","34","34"]}/>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Descripcion General</Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <LabelText texto={"Tipo"} />
                        </Row>
                        <br></br>
                        <Row>
                            <LabelText texto={"Jefe"} />
                        </Row>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Ubicación</Panel.Heading>
                    <Panel.Body>

                    </Panel.Body>
                </Panel>
            </Col>
            <Col md={6}>
                <Panel bsStyle="primary">
                    <Panel.Heading>Métricas</Panel.Heading>
                    <Panel.Body>
                        <LabelLabels texto="metrica1" valoresLabels={["3","4","5"]}/>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary">
                    <Panel.Heading>Promedio Métrica</Panel.Heading>
                    <Panel.Body>

                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
        <Row>
            <Col>
                <Panel bsStyle="primary">
                    <Panel.Heading>Diagrama de Pareto</Panel.Heading>
                    <Panel.Body>

                    </Panel.Body>
                </Panel>
            </Col>
        </Row>
    </Grid>

export default DescripcionPosta