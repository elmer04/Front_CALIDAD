import React from 'react';
import ReactStickies from 'react-stickies';

const Notes=({notes,onChangeNotes})=> {
    //console.log(notes)
    return <ReactStickies
        notes={notes}
        onChange={onChangeNotes}
    />
}

export default Notes