import { Button } from 'primereact/button';
import React from 'react'; 
import Navbar from './navbar';  
import { Link } from 'react-router-dom';

function dashboard() {
  return (
    <>
   
    <Navbar/>
    <div className='container'>
        <h1>Unlock Knowledge, <span style={{color: "darkorange", marginLeft: "7px"}}>Ignite Minds !</span></h1>
        <dotlottie-player src="https://lottie.host/05a20177-4777-4f16-ae18-4e4b78ad909b/HW79ptbRTI.json" background="transparent" speed="1" style={{width: "400px", height: "400px"}} loop autoplay></dotlottie-player>
        <div className="button">
        <Link to="/creator"><Button style={{margin: "10px"}} label="CREATE QUIZ" /></Link>
        <Link to={'/takequiz'}>  <Button style={{margin: "10px"}} label='TAKE QUIZ' /> </Link>
        </div>
    </div>
    </>

  )
}

export default dashboard