import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Get all notes
  const getNote = async() => {
    // console.log("adding a new note")
    //  api calls
    const response = await fetch(`${host}api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
    });
    const json =await response.json();
    // console.log(json)
    setNotes(json)
  }
  // Adding a note function
  const addNote = async(title, description, tag) => {
    // console.log("adding a new note")
    // TODO api calls
    const response = await fetch(`${host}api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note)) //.concat return a new array
  }
  // Delete a note function
  const deleteNote = async(id) => {
    // API call todo
    const response = await fetch(`${host}api/note/deletenote/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    });
    const json =await response.json();
    // console.log(json)
    // console.log("deleting the note with id"+ id);
    const newNote = notes.filter((note) => { return note._id !== id }) //this logic means that if id!==note._id then it should be inside the notes state otherwise it will get replaced
    setNotes(newNote);
  }
  // edit a note function
  const editNote = async (id, title, description, tag) => {
  
      // API Calls
      // Default options are marked with *
      const response = await fetch(`${host}api/note/updatenote/${id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
    // console.log(json)
    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
      newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState