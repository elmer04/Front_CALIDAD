import React from 'react';
import {form, FormGroup, ControlLabel, FormControl,Radio} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
export const BoxInput = ({valoresBox,valorinicial=""}) =>
    <div className="separated">
        <FormGroup>
            <Col md={4}>
                <FormControl componentClass="select" placeholder="select">
                    {
                        valoresBox.map( ( valor )=>{
                            return <option value={valor}>{valor}</option>
                        })
                    }
                </FormControl>
            </Col>
            <Col  md={4}>
                <FormControl type="text" placeholder="Ingrese Texto"/>
            </Col>
        </FormGroup>
    </div>



export const LabelBox = ({texto,valoresBox}) =>
    <div className="separated">
        <FormGroup>
            <ControlLabel>{texto}</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
                {
                    valoresBox.map( ( valor )=>{
                        return <option value={valor}>{valor}</option>
                    })
                }
            </FormControl>
        </FormGroup>
    </div>

export const LabelRadioButton= ({texto,valoresButton}) =>
    <div className="separated">
        <FormGroup>
            <ControlLabel>{texto}</ControlLabel>
            <FormGroup componentClass="" placeholder="select">
                {
                    valoresButton.map((valor)=>{
                        return <Radio name="radioGroup">{valor}</Radio>
                    })
                }
            </FormGroup>
        </FormGroup>
    </div>