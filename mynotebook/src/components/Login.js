import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const navigate = useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""})
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }) 
    }
    const handleClick=async(e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            //   'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjMTM2YTAzMDFlOWFjZmEzNTRiNThkIn0sImlhdCI6MTY3MzgwMTkxNX0.1sVXWSAdWNNdzXxrGzuKxKqZ6KQYkp4BqFlXVLNO8AY'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success===true){
            localStorage.setItem("auth-token",json.authtoken)
            props.showAlert("You had successfully login","success")
            navigate("/");
          }
          else{
            props.showAlert("Invalid Credientials","danger")
          }
       

    }
  return (
    <div>
        <form onSubmit={handleClick}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control"onChange={onChange} id="email" name='email'value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control"onChange={onChange} id="password" name='password'value={credentials.password} placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login

