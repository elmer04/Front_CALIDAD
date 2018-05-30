import React from 'react';
import EESSList from "./EESSList";
import {BoxInput, LabelBox,LabelRadioButton} from "./ComponentesAux";
import {Panel, form,Button} from 'react-bootstrap'
import { Grid,Row ,Col } from 'react-bootstrap'


const ListaPosta = ({eess,...props}) =>
<Grid>
    <Panel bsStyle="primary">
        <Panel.Heading>Buscar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <BoxInput valoresBox={[1,3]}/>
                <Button bsStyle="primary">Buscar</Button>
            </Row>
        </Panel.Body>
    </Panel>
    <Panel bsStyle="primary">
        <Panel.Heading>Listar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <LabelBox texto="Metricas" valoresBox={[1,3]}/>
            </Row>
            <Row className="show-grid">
                <LabelRadioButton texto="Metricas" valoresButton={[1,3]}/>
            </Row>
        </Panel.Body>
    </Panel>
    <Panel bsStyle="primary">
        <Panel.Heading>Listar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <EESSList eess={eess}/>
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