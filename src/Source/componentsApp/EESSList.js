import React from 'react';

const EESSList = ({eess=[],colores,clickEess}) =>
    <div>
        {
            eess.map((val,key)=>{
            let color=colores.find(color => (color.nombre.toLowerCase())===val.color);
            let styles = {
                height: '70px',
                width: '200px',
                padding: '15px',
                margin: '20px',
                borderStyle:'outset',
                backgroundColor:(typeof color==='undefined')? '#ffffff' :color.color,
            };
            return <label style={styles} key={key} onClick={()=>clickEess(val.nombre)}>
                {val.nombre}
            </label>
            })
        }
    </div>;


export default EESSList