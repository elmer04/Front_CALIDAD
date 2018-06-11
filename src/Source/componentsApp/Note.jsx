import React from 'react';
import './CssComponents/Note.css'

const Note = ({noteContent}) =>
    <section className="notes" >
        <button onClick={f=>f}>X</button>
        <div className='notes'>
            {noteContent}
        </div>
    </section>

export default Note;