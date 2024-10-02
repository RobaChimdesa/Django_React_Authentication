// import  from "react" { useState } from "react"
import React,{useState} from 'react'
import axios from 'axios'
export default function Login() {

    const[formdata,setformdata] = useState({
        
        email:"",
        password:"",
        
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
    const response = await axios.post("http://127.0.0.1:8000/api/login/",formdata)
    console.log("success",response.data)
    setSuccessMessage("Login Successful")
  }
  catch(error){
    console.log("error during Login!", error.response?.data);
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
            <label>Email:</label><br/>
            <input type='email' name='email' value={formdata.email} onChange={handlechange}></input><br/><br/>
            <label >password:</label><br/>
            <input type='password' name='password' value={formdata.password1} onChange={handlechange}></input><br/><br/>
            <button type='submit' disabled={isloading} onClick={handleSubmit}>Login</button>


         </form>
    </div>
         
  )
}
