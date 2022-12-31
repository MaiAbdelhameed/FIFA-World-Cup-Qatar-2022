import React from 'react'
import axios from 'axios';
import classes from './style/predictionpage.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import Seating from '../components/Seating';
import matches from '../matches';
import CreditCard from "../components/CreditCard";
import UpdateInfo from "../components/UpdateInfo";


import Loader from '../components/Loader';

function createSeating(matches) {
  return (
    <Seating
      key={matches.id}
      id={matches.id}
      name={matches.name}
      rows={matches.rows}
      seats={matches.seats}
      date={matches.date}
      area={matches.area}
      row1={matches.row1}
    />
  );
}

const Reservation = () => {
  const[spinner,setSpinner] = useState(true);
  const [logged,setLogged]=useState("");


  useEffect(() => {
      setLogged(sessionStorage.getItem("ID"))
  });
  
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
      
      <div class={logged ? "" : "disappear"}>
        <UpdateInfo />
      </div>
      <div>{matches.map(createSeating)}</div>
      <div class={logged ? "" : "disappear"}>
        <CreditCard />
      </div>
    </div>
      }
    </>
  )
}
export default Reservation 