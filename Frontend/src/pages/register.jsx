// import  from "react" { useState } from "react"
import React,{useState} from 'react'
import axios from 'axios'
export default function Register() {

    const[formdata,setformdata] = useState({
        username:"",
        email:"",
        password1:"",
        password2:"",
    });
    
    const handlechange = (e) =>{
      setformdata({
        ...formdata,[e.target.name]:e.target.value
      })
  
     }

     const[isloading,setIsloading] = useState(false)
     const[successMessage,setSuccessMessage] = useState(null)
     const[error,setError] = useState(null)
     const handleSubmit = async(e)=>{
  e.preventDefault()
  if (isloading){
    return
  }
  setIsloading(true)

  try{
    const response = await axios.post("http://127.0.0.1:8000/api/register/",formdata)
    console.log("success",response.data)
    setSuccessMessage("Registration Successful")
  }
  catch(error){
    console.log("error during registration!", error.response?.data);
     if(error.response && error.response.data){
      Object.keys(error.response.data).forEach(field => {
          const errorMessage = error.response.data[field];
          if(errorMessage && errorMessage.length > 0){
            setError(errorMessage[0]);
          }
        }
      )
     }
  }

  finally{
    setIsloading(false)
  }

 }

  return (
    <div>
      {error && <p style={{color:"red"}}> {error}</p>}
      {successMessage && <p style={{color:"green"}}>{successMessage}</p>}
      {/* {error && <p style={{color:"red"}}>{errorMessage}</p>} */}
      <form>
            <label>Username:</label><br/>
            <input type='text' name='username' value={formdata.username} onChange={handlechange}></input><br/><br/>
            <label>Email:</label><br/>
            <input type='email' name='email' value={formdata.email} onChange={handlechange}></input><br/><br/>
            <label >password:</label><br/>
            <input type='password' name='password1' value={formdata.password1} onChange={handlechange}></input><br/><br/>
            <label >Confirm Password:</label><br/>
            <input type='password' name='password2' value={formdata.password2} onChange={handlechange}></input><br/><br/>
            <button type='submit' disabled={isloading} onClick={handleSubmit}>Register</button>


         </form>
    </div>
         
  )
}
