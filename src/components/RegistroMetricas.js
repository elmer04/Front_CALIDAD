import React from 'react';
import {Button} from 'react-bootstrap'
import { Grid ,Row,Col} from 'react-bootstrap'
import {LabelTextArea} from "./ComponentesAux";
import  "./CssComponents/RegistroMetricas.css";



const RegistroMetricas = ({texto,valores,editable,onClickEditar,onClickGuardar,changeEditar,...props}) =>
    <Grid>
        <Row>
            <h1>{texto}</h1>
        </Row>
        {

            valores.map((valor,index)=>{
                return  <Row>
                            <LabelTextArea onChangeEditar={changeEditar} index={index}
                                           texto={"Metrica "+(index+1)} value={valor.nombre}  disable={!editable}/>
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

    </Grid>

export default RegistroMetricas