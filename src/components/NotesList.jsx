import React from 'react';
import Note from './Note';

const NotesList = ({notes=[],...props}) =>
    <div className='notes-list'>
        {
            (notes.length>0) ? 
            notes.map(note=><Note noteContent={note}/>):
            "No hay notas"
        }
    </div>

export default NotesList;