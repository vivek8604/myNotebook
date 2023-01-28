import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, setNotes } = context
    return (
        <>
            <div className='my-4'>
                <h3>Your Notes</h3>
                <div className="row my-2">
                    {/* // all added notes will be here */}
                    {notes.map((note) => {
                        return <Noteitem key ={note._id} note={note} />
                        // here sending a prop to noteitem component
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
