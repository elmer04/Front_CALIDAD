import React from 'react';
import './Note.css'

const Note = ({noteContent,...props}) =>
    <section className="notes" >
        <button onClick={f=>f}>X</button>
        <div className='notes'>
            {noteContent}
        </div>
    </section>

export default Note;