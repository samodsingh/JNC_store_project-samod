import React from "react";
import { Button } from "antd";
import  { useState } from 'react';
import Axios from "axios";
function Buttons() {

//Login Functionality
const [username, setUserName] = useState();
const [password, setPassword] = useState();
const [loginMessage, setloginMessage] = useState();
const submitForm = () => {

  setUserName("test1234@user.com");
  setPassword("Test@123")

  if(username==="" || password===""){
      alert("Enter Username and password")
  }else{

      Axios.get("http://localhost:8070/api/login", {
        params: {
            username: username,
            password:password
        },
    })
    .then((res) => {
        setloginMessage(res.data)
      })
      .catch((err) => {
          setUserName({});
          setPassword({});
      });
      if(loginMessage==="true"){
          alert("Welcome")
      }else{
       alert("Check the user")
      }
  

  }

 }

return (
  <div className="App">
    <header className="App-header">
      <Button type="primary">Test Button</Button>
      <Button  type="submit" onClick={submitForm}>Login</Button>
    </header>
  </div>
);
}
  
export default Buttons;