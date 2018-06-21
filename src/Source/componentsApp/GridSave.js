import React from 'react';
import ReactDataGrid from 'react-data-grid';
import "./CssComponents/Excel.css";

//rows=[{total: 100, sis: 75, pct: 75}],columns=[{key:'total', name:'Total'},
//     {key:'sis', name:'SIS'},
//     {key:'pct', name:'Porcentaje'}
// ],...props}

const GridSave = ({data}) =>
    <div>
        {
         //   console.log(data.eess)
        }
        <ReactDataGrid
            minHeight={600}
            rowGetter={(i) => data.eess[i]}
            rowsCount={data.eess.length}
            columns={Object.keys(data.eess[0]).map(val=>{
                return {key:val, name:val}
            })}
        />
    </div>

export default GridSave