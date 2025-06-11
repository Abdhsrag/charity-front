import React from "react";
import './NotFound.css'

function NotFound(){
    return(
        <div>
      <img src="/notfound.png" alt="notfound" className="img1"/>
    <h1 className="fh">Page Not Found</h1>
    <p className="fp">The page you are looking for does not exist or has been moved.
        please check the URL or navigate back to the homepage
    </p>
    <button className="fbtn">Go To HomePage</button>
</div>
    )
}


export default NotFound;