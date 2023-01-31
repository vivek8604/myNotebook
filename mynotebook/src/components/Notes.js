import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'
const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNote } = context
    const [note, setNote] = useState({etitle: "", edescription: "", etag: ""})
    useEffect(() => {
        getNote()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const updateNote = (currentNote) => {
        // `current` points to the mounted text input element
        ref.current.click();
         setNote({etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) // this means take the existing note and overwrite it when there is onChange event
    }
    const handleClick = (e) => {
        e.preventDefault();
        console.log("updating the note ", note)
    }
    return (
        <>

            <Addnote />

            <div className='my-4'>
                <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group my-3">
                                        <label htmlFor="etitle">Note Title</label>
                                        <input value={note.etitle} type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" placeholder="Enter Your Title" onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Note Description</label>
                                        <input type="text" value={note.edescription}  className="form-control" id="edescription" name='edescription' placeholder="Enter your description" onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tag">Note Tag</label>
                                        <input type="text" value={note.etag}  className="form-control" id="etag" name='etag' placeholder="" onChange={onChange} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={handleClick} className="btn btn-primary">Edit </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Your Notes</h3>
                <div className="row my-2">
                    {/* // all added notes will be here */}
                    {notes.map((note) => {
                        return <Noteitem key={note._id} note={note} updateNote={updateNote} />
                        // here sending a prop to noteitem component
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
