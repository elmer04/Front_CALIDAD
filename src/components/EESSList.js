import React from 'react';

const EESSList = ({eess=[],colores,...props}) =>
    <div>
        {
            eess.map((val)=>{
            let color=colores.find(color => color.nombre ===val.color);
            var styles = {
                height: '70px',
                width: '200px',
                backgroundColor: color.color,
                padding: '15px',
                margin: '20px'
            };
            return <label style={styles}>
                {val.nombre}
            </label>
            })
        }
    </div>


export default EESSList