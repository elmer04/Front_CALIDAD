import React from 'react';
import Note from './Note';

const NotesList = ({notes=[]}) =>
    <div className='notes-list'>
        {
            (notes.length>0) ? 
            notes.map((note,key)=><Note key={key} noteContent={note}/>):
            "No hay notas"
        }
    </div>

export default NotesList;