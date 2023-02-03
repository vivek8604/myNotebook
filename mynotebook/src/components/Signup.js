import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",password:""})
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value }) 
  }
  const handleClick=async(e)=>{
      e.preventDefault()
      
      const {name,email,password}=credentials
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success===true){
          localStorage.setItem("auth-token",json.authtoken)
          navigate("/");
          props.showAlert("you had successfully signup","success")
        }
        else{
          props.showAlert("invalid details",'danger')
        }
       

  }
  return (
    <div>
      <form onSubmit={handleClick}>
      <div className="form-group">
    <label htmlfor="name">Name</label>
    <input type="text" className="form-control" id="name"onChange={onChange} name='name' aria-describedby="emailHelp" placeholder="Enter Your name"/>
  </div>
  <div className="form-group">
    <label htmlfor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email"onChange={onChange} name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlfor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" required minLength={5} id="password" onChange={onChange}name='password' placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlfor="exampleInputPassword1">confirm  password</label>
    <input type="password" className="form-control" required minLength={5} id="cpassword"onChange={onChange} name='cpassword' placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
