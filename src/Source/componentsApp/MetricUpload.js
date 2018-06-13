import React from 'react';
import GridSave from './GridSave';
import FilePickerNLabel from "./FilePickerNLabel";
import {Button} from 'react-bootstrap';
import "./CssComponents/Button_excel.css";

const MetricUpload = ({data,me,onClick,...props}) =>
    <div>
        <FilePickerNLabel me={me}{...props}/>
        <Button className="btn_subir" bsStyle="primary" type="submit" onClick={()=>onClick(me.idindicador)}>SUBIR A LA BASE DE DATOS</Button>

        {data.months.map((n,i)=>{
            //{console.log(n);}
            return <GridSave key={i} data={n} {...props}/>
        })}

    </div>

export default MetricUpload