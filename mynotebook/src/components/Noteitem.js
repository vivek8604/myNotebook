import React, { useContext} from 'react'

// import noteState from '../context/notes/noteContext'
// import Notes from './Notes'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote} = context;
    const { note,updateNote } = props
    return (
        <div className='col-md-3'>

            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex flex-row-reverse">
                        <i className="far fa-trash-alt mx-2" onClick={()=>deleteNote(note._id)}></i>
                        <i className="far fa-edit mx-2" onClick={()=>updateNote(note)}></i>
                    </div>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
