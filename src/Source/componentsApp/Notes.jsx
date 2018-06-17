import React, { Component } from 'react';
import ReactStickies from 'react-stickies';

const Notes=({notes=[],onChangeNotes=(notes=>this.setState(notes))})=>
    <ReactStickies
        notes={notes}
        onChange={onChangeNotes}
    />

export default Notes