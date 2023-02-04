import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote'
import Noteitem from './Noteitem'
const Notes = (props) => {
    let navigate=useNavigate()
    const context = useContext(noteContext)
    const { notes, getNote,editNote } = context
    const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})
    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            getNote()
        }
        else{
            navigate('/login')
        }
       
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        // `current` points to the mounted text input element
        ref.current.click();
         setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
        
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) // this means take the existing note and overwrite it when there is onChange event
    }
    const handleClick = (e) => {
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        // console.log("updating the note ", note)
        props.showAlert("updated successfully","success")
    }
    return (
        <>

            <Addnote showAlert ={props.showAlert} />

            <div className='my-4'>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
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
                                        <input  minLength={5} required value={note.etitle} type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" placeholder="Enter Your Title" onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Note Description</label>
                                        <input minLength={5} required type="text" value={note.edescription}  className="form-control" id="edescription" name='edescription' placeholder="Enter your description" onChange={onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tag">Note Tag</label>
                                        <input type="text" value={note.etag}  className="form-control" id="etag" name='etag' placeholder="" onChange={onChange} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button"disabled={note.etitle.length<5||note.edescription.length<5}  onClick={handleClick} className="btn btn-primary">Edit </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">

                <h3>Your Notes</h3>
                </div>
                <div className="row my-2">
                    {/* // all added notes will be here */}
                    <div class='container'>
                    <p>{notes.length===0 &&"NO notes to Display"}</p>
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                        // here sending a prop to noteitem component
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
