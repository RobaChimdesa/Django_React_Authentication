// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'



// export default function Home() {
//  const [username ,setUsername] = useState("")
//  const [isloggedIn,setIsloggedIn] = useState(false)

//  useEffect(()=>{
//    const checkloggedInUser = async () =>{
//     try{
//       const token = localStorage.getItem("accessToken")
//       if(token) {
//         const config = {
//           headers: {  
//             "Authorization": `Bearer ${token}` // Corrected this line  
//           }  
//         };
//         const response = await axios.get("http://127.0.0.1:8000/api/user/",config)
//         setIsloggedIn(true)
//         setUsername(response.data.username)
//         console.log(response.data.username)

//       }
//       else{
//         setIsloggedIn(false)
//         setUsername("")
//       }
//     }
//     catch(error){
//       setIsloggedIn(false)
//       setUsername("")

//     }
//    };
// checkloggedInUser()
//  },[])

//   return (
//     <div>
//        {isloggedIn ? (<h2>Hi,{username}.Thanks for login in!</h2>):
//        (<h2>please Login</h2>)}

//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';  
import axios from 'axios';  

export default function Home() {  
  const [username, setUsername] = useState("");  
  const [isloggedIn, setIsloggedIn] = useState(false);  

  useEffect(() => {  
    const checkloggedInUser = async () => {  
      try {  
        const token = localStorage.getItem("accessToken");  
        if (token) {  
          const config = {  
            headers: {  
              "Authorization": `Bearer ${token}`  
            }  
          };  
          const response = await axios.get("http://127.0.0.1:8000/api/user/", config);  
          console.log(response.data); // Log the full response  

          // Check if the structure of the response is as expected  
          setIsloggedIn(true);  

          // Adjust this depending on your response structure  
          setUsername(response.data.username); // Ensure this is correct  
          // If response structure is different, replace with:  
          // setUsername(response.data.user.username); // Example structure  
        } else {  
          setIsloggedIn(false);  
          setUsername("");  
        }  
      } catch (error) {  
        console.error('Error fetching user data:', error); // Log the error  
        setIsloggedIn(false);  
        setUsername("");  
      }  
    };  
    checkloggedInUser();  
  }, []);
  
  const handleLogout = async () =>{
    try{
      const refreshToken = localStorage.getItem("refreshToen");
      if(refreshToken){
        await axios.post("http://127.0.0.1:8000/api/logout/",{"refresh":refreshToken})
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToen");
        setIsloggedIn(false);
        setUsername("");
      }
    }
    catch(error){
      console.log("Failed to logout")
    }
  }
  


  return (  
    <div>  
      {isloggedIn ? (  
        <h2>Hi, {username}. Thanks for logging in!</h2>  
      ) : (  
        <h2>Please Login</h2>  
      )}  
      <button onClick={handleLogout}>Logout</button>
    </div>  
  );  
}