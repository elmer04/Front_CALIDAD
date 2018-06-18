import React from 'react';

const EESSList = ({eess=[],colores,clickEess}) =>
    <div>
        {
            eess.map((val,key)=>{
            let color=colores.find(color => color.nombre ===val.color);
            let styles = {
                height: '70px',
                width: '200px',
                backgroundColor: color.color,
                padding: '15px',
                margin: '20px',
                borderStyle:'outset'
            };
            return <label style={styles} key={key} onClick={()=>clickEess(val.nombre)}>
                {val.nombre}
            </label>
            })
        }
    </div>;


export default EESSList