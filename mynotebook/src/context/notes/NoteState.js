import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Get all notes
  const getNote = async() => {
    console.log("adding a new note")
    //  api calls
    const response = await fetch(`${host}api/note/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTM2YTAzMDFlOWFjZmEzNTRiNThkIn0sImlhdCI6MTY3MzgwMTkxNX0.1sVXWSAdWNNdzXxrGzuKxKqZ6KQYkp4BqFlXVLNO8AY'
      },
      // body:JSON.stringify()
    });
    const json =await response.json();
    console.log(json)
    setNotes(json)
  }
  // Adding a note function
  const addNote = async(title, description, tag) => {
    console.log("adding a new note")
    // TODO api calls
    const response = await fetch(`${host}api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTM2YTAzMDFlOWFjZmEzNTRiNThkIn0sImlhdCI6MTY3MzgwMTkxNX0.1sVXWSAdWNNdzXxrGzuKxKqZ6KQYkp4BqFlXVLNO8AY'
      },
      body:JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    const note = {
      "_id": "63c55f76059070edee86cb4d7ggg",
      "user": "63c136a0301e9acfa354b58d",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    };
    setNotes(notes.concat(note)) //.concat return a new array
  }
  // delete a note function
  const deleteNote = (id) => {
    // API call todo
    // console.log("deleting the note with id"+ id);
    const newNote = notes.filter((note) => { return note._id !== id }) //this logic means that if id!==note._id then it should be inside the notes state otherwise it will get replaced
    setNotes(newNote);
  }
  // edit a note function
  const editNote = async (id, title, description, tag) => {
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      // API Calls
      // Default options are marked with *
      const response = await fetch(`${host}api/note/updatenote/63c4322951fc12e1a4576f9a`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTM2YTAzMDFlOWFjZmEzNTRiNThkIn0sImlhdCI6MTY3MzgwMTkxNX0.1sVXWSAdWNNdzXxrGzuKxKqZ6KQYkp4BqFlXVLNO8AY'
        }
      });
      const json = await response.json({title,description,tag});
      // Logic to edit in client
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState