import React from 'react';
import EESSList from "./EESSList";
import {BoxInput, LabelBox, LabelRadioButton, RadioButtons} from "./ComponentesAux"
import {Panel,Button} from 'react-bootstrap'
import { Grid,Row ,Col} from 'react-bootstrap'
import './CssComponents/ListaPosta.css'


const ListaPosta = ({eess,filtroResultado,valoresBox1,valoresBox2,valoresButton1,listarOnClick,
                        listaChange,...props}) =>
<Grid>
    <Panel bsStyle="primary">
        <Panel.Heading>Buscar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <BoxInput valoresBox={valoresBox1}/>
                <Button bsStyle="primary">Buscar</Button>
            </Row>
        </Panel.Body>
    </Panel>
    <Panel bsStyle="primary">
        <Panel.Heading>Listar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <LabelBox texto="Metricas" valoresBox={valoresBox2}/>
            </Row>
            <Row className="show-grid">
                <LabelRadioButton texto="Niveles" valoresButton={valoresButton1} changeRadio={listaChange}/>
                <Button bsStyle="primary" onClick={listarOnClick}>Listar</Button>
            </Row>
        </Panel.Body>
    </Panel>
    <Panel bsStyle="primary">
        <Panel.Heading>RESULTADO </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <Col mdOffset={2}>
                    <div className="RadioButtonResultado">
                        <RadioButtons valores={filtroResultado}/>
                    </div>
                </Col>
                <EESSList eess={eess} colores={valoresButton1}/>
            </Row>
        </Panel.Body>
    </Panel>
</Grid>

export default ListaPosta

/*<Row>
    <fieldset className="well the-fieldset" >
      <legend className="the-legend">holi</legend>
    </fieldset>
</Row>*/