import React from "react";
import { Button } from "antd";
import  { useState } from 'react';
import Axios from "axios";
function Buttons() {

  //Login Functionality
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const submitForm = () => {

    setUserName("abc@gmail.com");
    setPassword("abc@123")

    if(username===0 || password===0){
        alert("Enter Username and password")
    }else{
      Axios.get("http://localhost:8070/api/login", {
        params: {
            username: username,
            password:password
        },
    })
    .then((res) => {
        console.log(res.data);
        
      })
      .catch((err) => {
          setUserName({});
          setPassword({});
      });

      alert("Welcome!")
    }

   }

  return (
    <div className="App">
      <header className="App-header">
        <Button  type="submit" onClick={submitForm}>Login</Button>
      </header>
    </div>
  );
}
  
export default Buttons;