import React from 'react';
import EESSList from "./EESSList";
import {BoxInput, LabelBox, LabelRadioButton, RadioButtons} from "./ComponentesAux"
import {Panel,Button} from 'react-bootstrap'
import { Grid,Row ,Col} from 'react-bootstrap'
import './CssComponents/ListaPosta.css'


const ListaPosta = ({eess,filtroResultado,valoresBox1,valoresBox2,valoresButton1,listarOnClick,
                        listaChange,listaMetricaChange,buscarPorChange,buscarPorClick,buscarTextChange,
                        OrdenChange,eessClick}) =>
<Grid>
    <Panel bsStyle="primary" className="panel_p">
        <Panel.Heading>Buscar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <BoxInput BoxChange={buscarPorChange}  TextChange={buscarTextChange} valoresBox={valoresBox1}/>
                <Button bsStyle="primary" onClick={buscarPorClick}>Buscar</Button>
            </Row>
        </Panel.Body>
    </Panel>
    <Panel bsStyle="primary" className="panel_p">
        <Panel.Heading>Listar Por : </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <LabelBox texto="Métricas" valoresBox={valoresBox2} onChangeBox={listaMetricaChange}/>
            </Row>
            <Row className="show-grid">
                <LabelRadioButton texto="Niveles" valoresButton={valoresButton1} changeRadio={listaChange}/>
                <Button bsStyle="primary" onClick={listarOnClick}>Listar</Button>
            </Row>
        </Panel.Body>
    </Panel>
    <Panel bsStyle="primary" className="panel_p">
        <Panel.Heading>RESULTADO </Panel.Heading>
        <Panel.Body>
            <Row className="show-grid">
                <Col mdOffset={2}>
                    <div className="RadioButtonResultado">
                        <RadioButtons valores={filtroResultado} radioChange={OrdenChange}/>
                    </div>
                </Col>
                <EESSList eess={eess} colores={valoresButton1} clickEess={eessClick}/>
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