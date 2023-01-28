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
   return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
   )
}
export default NoteState