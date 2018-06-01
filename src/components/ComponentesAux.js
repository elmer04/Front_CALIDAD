import React from 'react';
import {form, FormGroup, ControlLabel, FormControl,Radio} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import './CssComponents/LabelBox.css'

import a from './CssComponents/LabelBox.css'
export const BoxInput = ({valoresBox}) =>
    <div className="separated">
        <FormGroup controlId="formBoxInput">
            <Col md={2} mdOffset={2}>
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
        <FormGroup controlId="formLabelBox">
            <Col md={2} mdOffset={2}>
                <ControlLabel >{texto}</ControlLabel>
            </Col>
            <Col md={4}>
                <FormControl componentClass="select" placeholder="select">
                    {
                        valoresBox.map( ( valor )=>{
                            return <option value={valor.key}>{valor.nombre}</option>
                        })
                    }
                </FormControl>
            </Col>
        </FormGroup>
    </div>

export const LabelRadioButton= ({texto,valoresButton}) =>
    <div className="separated">
        <FormGroup controlId="formLabelRadioButton">
            <Col md={2} mdOffset={2}>
                <ControlLabel>{texto}</ControlLabel>
            </Col>
            <Col md={4}>
                <FormGroup>
                    {
                        valoresButton.map((valor)=>{{
                            return <Radio name="radioGroup" className="radios" value={valor.color} >{valor.nombre}</Radio>
                        }})
                    }
                </FormGroup>
            </Col>
        </FormGroup>
    </div>

export const LabelTextArea = ({texto,value,disable=false})=>
    <div>
        <FormGroup controlId="formLabelRadioButton">
            <Col md={2} mdOffset={2} >
                <ControlLabel>{texto}</ControlLabel>
            </Col>
            <Col md={5}>
                <FormControl componentClass="textarea"  disabled={disable} value={value} />
            </Col>
        </FormGroup>
    </div>