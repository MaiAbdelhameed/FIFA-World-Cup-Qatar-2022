import React from 'react'
import axios from 'axios';
import classes from './style/predictionpage.module.css'
import { useEffect } from 'react'
import { useState } from 'react'


import Loader from '../components/Loader';

const Reservation = () => {

  const[spinner,setSpinner] = useState(true);
  
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
    
      async function fix() {
        await delay(1200);
        setSpinner(false)
        
      }
      useEffect(()=>{
       
        fix()
     
    })
  

  
 
  return (
    <>
      {spinner?<Loader />:
    <div className={classes.body}>
      
      <h2 className={classes.title}> Reservations Here</h2>


      {/* TODO: implement conditionally rendered button  */}
      {/* {me?<div className={classes.btn}><button onClick={checkResp}>Submit</button></div>:null} */} 
      

    </div>
      }
    </>
  )
}
export default Reservation 