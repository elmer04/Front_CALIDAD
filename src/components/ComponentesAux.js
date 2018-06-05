import React from 'react'
import {form, FormGroup, ControlLabel, FormControl,Radio,Label,Button} from 'react-bootstrap'
import {Col,Row} from 'react-bootstrap'
import './CssComponents/LabelRadioButton.css'
import './CssComponents/LabelCuadritos.css'
import './CssComponents/LabelLabels.css'
import labelLabels from  './CssComponents/LabelLabels.css'
import ejemplo from './CssComponents/ejemplo'
import a from './CssComponents/LabelRadioButton.css'
export const BoxInput = ({valoresBox,BoxChange}) =>{
    let handleOptionChange = (changeEvent) => {
        let value = changeEvent.target.value
        BoxChange(value)
    };

    return (<FormGroup controlId="formBoxInput">
        <Col md={2} mdOffset={2}>
            <FormControl componentClass="select" placeholder="select" onChange={handleOptionChange}>
                {
                    valoresBox.map( ( valor )=>{
                        return <option value={valor}>{valor}</option>
                    })
                }
            </FormControl>
        </Col>
        <Col  md={4}>
            <FormControl type="text" placeholder="Ingrese valor"/>
        </Col>
    </FormGroup>)
}


export const LabelBox = ({texto,valoresBox,onChangeBox}) => {

    let handleOptionChange = (changeEvent) => {
        let valorRadio = changeEvent.target.value
        onChangeBox(valorRadio)
    };
   return ( <FormGroup controlId="formLabelBox">
        <Col md={2} mdOffset={2}>
            <ControlLabel>{texto}</ControlLabel>
        </Col>
        <Col md={4}>
            <FormControl componentClass="select" placeholder="select" onChange={handleOptionChange}>
                {
                    valoresBox.map((valor) => {
                        return <option value={valor.idindicador} >{valor.nombre}</option>
                    })
                }
            </FormControl>
        </Col>
    </FormGroup>)
}
export const LabelRadioButton= ({texto,valoresButton,changeRadio}) => {
    let handleOptionChange = (changeEvent) => {
        let valorRadio = changeEvent.target.value
        changeRadio(valorRadio)
    };

    return (<FormGroup controlId="formLabelRadioButton">
        <Col md={2} mdOffset={2}>
            <ControlLabel>{texto}</ControlLabel>
        </Col>
        <Col md={4}>
            <FormGroup>
                {
                    valoresButton.map((valor) => {
                        {
                            return <Radio name="radioGroup" onChange={handleOptionChange}
                                          className="radios" value={valor.nombre}>{valor.nombre}</Radio>
                        }
                    })
                }
            </FormGroup>
        </Col>
    </FormGroup>)
}


export const LabelTextArea = ({texto,value,index,onChangeEditar,disable=false})=> {
    const handleChange= (event) => {

        console.log(event.target.value)
        onChangeEditar(event.target.value,index);
    }

    return (
        <FormGroup controlId="formLabelTextArea">
            <Col md={2} mdOffset={2}>
                <ControlLabel>{texto}</ControlLabel>
            </Col>
            <Col md={5}>
                <FormControl componentClass="textarea" disabled={disable} value={value} onChange={handleChange} />
            </Col>
        </FormGroup>
    );
};

export const RadioButtons = ({valores}) =>
    <FormGroup  controlId="formRadioButtons">
        {
            valores.map((valor)=>{
                return <Radio name="radioGroup" value={valor.key} inline>{valor.nombre}</Radio>
            })
        }
    </FormGroup>

export const LabelCuadritos = ({texto,valoresCuadritos})=>
    <FormGroup  controlId="formLabelCuadritos">
        <Row>
            <Col md={4} mdOffset={2} className="texto">
                <ControlLabel >{texto}</ControlLabel>
            </Col>
            <Col md={6}>
            {
                valoresCuadritos.map((valor,index)=>{
                    return  <div className="label_Cuadritos_div_2">
                                <FormControl type="text" value={valor} className="label_Cuadritos_div_2_cuadrito"/>

                        {
                            (()=>{
                                if(valoresCuadritos.length!==(index+1))
                                    return <FormControl.Static className="label_Cuadritos_div_2_separador">-</FormControl.Static>

                            })()
                        }
                            </div>

                })
            }
            </Col>
        </Row>
    </FormGroup>

export const LabelText = ({texto,value="",disable=false})=>
    <FormGroup controlId="formLabelTextArea">
        <Col md={2} mdOffset={2} >
            <ControlLabel>{texto}</ControlLabel>
        </Col>
        <Col md={5} mdOffset={2}>
            <FormControl  componentClass="text"  disabled={disable} value={value} />
        </Col>
    </FormGroup>

export const LabelLabels = ({texto,valoresLabels})=>
    <FormGroup  controlId="formLabelCuadritos">
        <Row>
            <Col md={4}>
                <Label className="div_label" >{texto}</Label>
            </Col>
            <Col md={8} >
                {
                    valoresLabels.map((valor)=>{
                        var md=12/valoresLabels.length
                        return  <Col className="labelLabelsdiv" md={md}>
                                    <Label className="div_labels" inline>{valor}</Label>
                                </Col>
                    })
                }
            </Col>
        </Row>
    </FormGroup>
