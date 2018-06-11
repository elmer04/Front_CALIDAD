import React from 'react';
import NotesList from './NotesList';

const notes = ["Tengo que comprar pan","Tengo que cambiar mi foco","Tengo que preparar la cena"]

const NotesPanel = () =>
    <div>
        <NotesList notes={notes}/>
    </div>

export default NotesPanel;