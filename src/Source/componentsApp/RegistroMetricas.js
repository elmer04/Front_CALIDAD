import React from 'react';
import {Panel,Button} from 'react-bootstrap'
import { Grid ,Row,Col} from 'react-bootstrap'
import {LabelTextArea} from "./ComponentesAux";
import "./CssComponents/RegistroMetricas.css";
import "./CssComponents/Panel.css";


const RegistroMetricas = ({texto,valores,editable,onClickEditar,onClickGuardar,changeEditar}) =>
    <Grid>
        <Panel bsStyle="primary" className="panel_p">
            <Panel.Heading>{texto} </Panel.Heading>
            <Panel.Body>
                {

                    valores.map((valor,index)=>{
                        return  <Row key={index}className="row_p">
                                    <LabelTextArea onChangeEditar={changeEditar} index={index}
                                                   texto={"Métrica "+(index+1)} value={valor.nombre}  disable={!editable}/>
                                </Row>

                        }
                    )
                }

                <Row>
                    <div className="buttons">
                        <Col md={3} mdOffset={3} >
                            <Button bsStyle="primary" onClick={onClickEditar} block>{!editable?'Editar':'Cancelar'}</Button>
                        </Col>
                        <Col md={3} >
                            <Button bsStyle="primary" onClick={onClickGuardar} disabled={!editable} block>Guardar</Button>
                        </Col>
                    </div>
                </Row>
            </Panel.Body>
        </Panel>
    </Grid>

export default RegistroMetricas