import React from 'react'
import Notes from './Notes'

const Home = () => {
  
  return (
    <div className='container my-3'>
        <h1>Add a note</h1>
        <form>
  <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1">Note Title</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Title"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Note Description</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter your description"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>   
<Notes/>   
    </div>
    
  
  )
}

export default Home
