import React from 'react';
import { form ,Button} from 'react-bootstrap'
import { Grid ,Row,Col} from 'react-bootstrap'
import {LabelTextArea} from "./ComponentesAux";
import  "./CssComponents/RegistroMetricas.css";

const RegistroMetricas = ({texto,valores,...props}) =>
    <Grid>
        <Row>
            <h1>{texto}</h1>
        </Row>
        {
            valores.map((valor,index)=>{
                return  <Row>
                            <LabelTextArea texto={"Metrica "+(index+1)} value={valor.nombre} disable={true}/>
                        </Row>
                }
            )
        }

        <Row>
            <div className="buttons">
                <Col md={3} mdOffset={3} >
                    <Button bsStyle="primary"  block>Editar</Button>
                </Col>
                <Col md={3} >
                    <Button bsStyle="primary" block>Guardar</Button>
                </Col>
            </div>
        </Row>

    </Grid>

export default RegistroMetricas