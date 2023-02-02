import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) // this means take the existing note and overwrite it when there is onChange event
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({ title: "", description: "", tag: "" });
    }
    return (
        <div className='container my-3'>
            <h1>Add a note</h1>
            <form>
                <div className="form-group my-3">
                    <label htmlFor="title">Note Title</label>
                    <input minLength={5} required type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" placeholder="Enter Your Title" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Note Description</label>
                    <input minLength={5} required type="text" className="form-control" value={note.description} id="description" name='description' placeholder="Enter your description" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Note Tag</label>
                    <input type="text" className="form-control" value={note.tag} id="tag" name='tag' placeholder="" onChange={onChange} />
                </div>

                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
