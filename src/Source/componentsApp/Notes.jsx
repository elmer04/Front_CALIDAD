import React, { Component } from 'react';
import ReactStickies from 'react-stickies';
import api from "../ComponentsSpecials/api";

class Notes extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        notes: [],
        id_eess: props.ideess
      }
      this.onChange = this.onChange.bind(this)
      this.onSave = this.onSave.bind(this)
    }

    onSave = () => {
      const notes = this.state.notes;
      notes.map(note => {
        delete note.editorState;
      })
      /*
        api.post(`/notas/${id_eess}`,notes)
        )*/
    }

    onChange = (notes) => {
      this.setState({ // Update the notes state
        notes
      })
      this.onSave()
    }

    componentWillMount(){/*
        api.get(`/notas/${id_eess}`).then(res=>
        this.setState({notes:res.data})
        )*/
    }

    render() {
        return (
        <ReactStickies
            notes={this.state.notes}
            onChange={this.onChange}
        />
        )
    }
}

export default Notes