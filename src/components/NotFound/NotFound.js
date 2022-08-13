import { Divider } from "antd";
import React from "react";
import "./NotFound.css"


function NotFound() {
  return (
    <div className="wrapper row2">
      <div id="container" className="clear">
        <section id="fof" className="clear">
            
          <div className="hgroup">
            <h1>Something Just Went Wrong !</h1>
            <Divider><h2>404 Error</h2></Divider>
              
          </div>
          <p>For Some Reason The Page You Requested Could Not Be Found On Our Server</p>
          {/* <Link to="/">Home</Link> */}
            
        </section>
          
      </div>
    </div>
  );
}
  
export default NotFound;