import React from 'react'
import {FormGroup, ControlLabel, FormControl,Radio,Label} from 'react-bootstrap'
import {Col,Row} from 'react-bootstrap'
import './CssComponents/LabelRadioButton.css'
import './CssComponents/LabelCuadritos.css'
import './CssComponents/LabelLabels.css'
//import labelLabels from  './CssComponents/LabelLabels.css'
//import ejemplo from './CssComponents/ejemplo'
//import a from './CssComponents/LabelRadioButton.css'
export const BoxInput = ({valoresBox,BoxChange,TextChange}) =>{
    let handleOptionChange = (changeEvent) => {
        let value = changeEvent.target.value
        BoxChange(value)
    };

    let handleTextChange = (changeEvent) => {
        let value = changeEvent.target.value
        TextChange(value)
    };

    return (<FormGroup controlId="formBoxInput">
        <Col md={2} mdOffset={2}>
            <FormControl componentClass="select" placeholder="select" onChange={handleOptionChange}>
                {
                    valoresBox.map( ( valor , key)=>{
                        return <option value={valor} key={key}>{valor}</option>
                    })
                }
            </FormControl>
        </Col>
        <Col  md={4}>
            <FormControl type="text" placeholder="Ingrese valor" onChange={handleTextChange}/>
        </Col>
    </FormGroup>)
}


export const LabelBox = ({texto,valoresBox=[],onChangeBox,mdTexto=2,mdTextoOffset=2,
                             mdBox=4,mdBoxOffset=0}) => {

    let handleOptionChange = (changeEvent) => {
        let valorRadio = changeEvent.target.value
        onChangeBox(valorRadio)
    };
   return ( <FormGroup controlId="formLabelBox">
        <Col md={mdTexto} mdOffset={mdTextoOffset}>
            <ControlLabel>{texto}</ControlLabel>
        </Col>
        <Col md={mdBox} mdOffset={mdBoxOffset}>
            <FormControl componentClass="select" placeholder="select" onChange={handleOptionChange}>
                {
                    valoresBox.map((valor,key) => {
                        return <option value={valor.idindicador} key={key}>{valor.nombre}</option>
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

    return (
            <FormGroup controlId="formLabelRadioButton">
                <Col md={2} mdOffset={2}>
                    <ControlLabel>{texto}</ControlLabel>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        {
                            valoresButton.map((valor,key) => {
                                return <Radio name="radioGroup1" onChange={handleOptionChange}
                                                  className="radios" value={valor.nombre} key={key}>{valor.nombre}</Radio>

                            })
                        }
                    </FormGroup>
                </Col>
            </FormGroup>
    )
}


export const LabelTextArea = ({texto,value,index,onChangeEditar,disable=false})=> {
    let handleChange= (event) => {

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

export const RadioButtons = ({valores,radioChange}) => {
    let handleRadioChange = (changeEvent) => {
        let valorRadio = changeEvent.target.value
        radioChange(valorRadio)
    };

   return ( <FormGroup controlId="formRadioButtons">
                {
                    valores.map((valor,key) => {
                        return <Radio name="radioGroup2" key={key} value={valor.key}
                                      onChange={handleRadioChange}inline>{valor.nombre}</Radio>
                    })
                }
            </FormGroup>
   )
}

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

export const LabelText = ({texto,value,disable=false})=>
    <FormGroup controlId="formLabelText">
        <Col md={2} mdOffset={2} >
            <ControlLabel>{texto}</ControlLabel>
        </Col>
        <Col md={5} mdOffset={2}>
            <FormControl  type="text"  disabled={disable} value={value} />
        </Col>
    </FormGroup>

export const LabelLabels = ({texto,color,valoresLabels})=>{
    const md=12/valoresLabels.length;

    return ( <FormGroup  controlId="formLabelCuadritos">
        <Row>
            <Col md={4}>
                <Label className="div_label" >{texto}</Label>
            </Col>
            <Col md={8} >
                {
                    valoresLabels.map((valor,key)=>{

                        if(valor.nombre===color) {
                            return <Col className="labelLabelsdiv" md={md} key={key}>
                                <Label className="div_labels" style={{backgroundColor: valor.color}}
                                       >{valor.nombre}</Label>
                            </Col>
                        }else
                        return  <Col className="labelLabelsdiv" md={md} key={key}>
                                    <Label className="div_labels" >{valor.nombre}</Label>
                                </Col>
                    })
                }
            </Col>
        </Row>
    </FormGroup>)
}
