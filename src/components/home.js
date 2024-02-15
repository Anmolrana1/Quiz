
import React from 'react';
import { Button } from 'primereact/button'; 
import { Link } from 'react-router-dom';

export default function Home() {  
    return(
        <div className='container'>
            <h1>Quest<span style={{color: "darkorange", marginLeft: "7px"}}>Masters</span></h1>
            <dotlottie-player src="https://lottie.host/0b0d04a0-a062-41bf-9984-fb9597356ec3/DvAmP73ZEh.json" background="transparent" speed="1" style={{height: "400px", width: "400px"}} loop autoplay></dotlottie-player>
            <div className="button">
                <Link to='/signup'><Button style={{margin: "10px"}} label="Sign Up" /></Link>
                <Link to='/login'><Button style={{margin: "10px"}} label='Log In' /></Link>
            </div>
        </div>
    )
}  