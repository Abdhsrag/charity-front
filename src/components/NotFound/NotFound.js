import React from "react";
import './NotFound.css'
import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    return(
        <div>
      <img src="/notfound.png" alt="notfound" className="img1"/>
    <h1 className="fh">Page Not Found</h1>
    <p className="fp">The page you are looking for does not exist or has been moved.
        please check the URL or navigate back to the homepage
    </p>
    <button className="fbtn" onClick={()=>navigate("/home")}>Go To HomePage</button>
</div>
    )
}


export default NotFound;