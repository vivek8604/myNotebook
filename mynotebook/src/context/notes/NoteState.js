import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
   const notesInitial =[
    {
      "_id": "63c432a9d089308e2bf547031",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-15T17:06:49.006Z",
      "__v": 0
    },
    {
      "_id": "63c55f76059070edee86cb4d2",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    },
    {
      "_id": "63c55f8a059070edee86cb4f3",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title ",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-16T14:30:34.115Z",
      "__v": 0
    },
    {
      "_id": "63c55f76059070edee86cb4d4",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    },
    {
      "_id": "63c55f76059070edee86cb4d5",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    },
    {
      "_id": "63c55f76059070edee86cb4d6",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    },
    {
      "_id": "63c55f76059070edee86cb4d7",
      "user": "63c136a0301e9acfa354b58d",
      "title": "this is title",
      "description": "enter a valid description",
      "tag": "important",
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(notesInitial)
  // Adding a note function
  const addNote=(title,description,tag)=>{
    console.log("adding a new note")
    // TODO api calls
    const note = {
      "_id": "63c55f76059070edee86cb4d7ggg",
      "user": "63c136a0301e9acfa354b58d",
      "title": title,
      "description": description,
      "tag":tag,
      "date": "2023-01-16T14:30:14.558Z",
      "__v": 0
    };
    setNotes(notes.concat(note)) //.concat return a new array
  }
  // delete a note function
  const deleteNote=(id)=>{
    // API call todo
    // console.log("deleting the note with id"+ id);
    const newNote=notes.filter((note)=>{return note._id!==id}) //this logic means that if id!==note._id then it should be inside the notes state otherwise it will get replaced
    setNotes(newNote);
  }
  // edit a note function
  const editNote=()=>{
    
  }
   return (
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
        {props.children}
    </NoteContext.Provider>
   )
}
export default NoteState