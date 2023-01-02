import React from 'react'
import axios from 'axios';
import classes from './style/predictionpage.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import Seating from '../components/Seating';
import CreditCard from "../components/CreditCard";
import UpdateInfo from "../components/UpdateInfo";


import Loader from '../components/Loader';
import { initial } from 'lodash';

const Reservation = () => {
  const[spinner,setSpinner] = useState(true);
  const [logged,setLogged]=useState("");
  const [matchData,setMatchData ] = React.useState([]);
  const [stadiumData,setStadiumData ] = React.useState([]);
  const [initialArr, setInitial] = useState([]);




  useEffect(() => {
      setLogged(sessionStorage.getItem("ID"))
  });


  const createSeating = matchData.map((matches) => {
    return(
      <Seating
      key={matches.id}
      id={matches.id}
      team1={matches.firstTeam}
      team2={matches.secondTeam}
      date={matches.date}
      time={matches.time}
      seats={matches.seating}
      venue={matches.venue}
      stadiums={stadiumData}
    />
    );
  });

  async function getData() {
    console.log("requesting")

    var config = {
      method: 'get',
      headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
    };
    let response = '';
    try {

      response = await axios.get("https://http-fifaqatarworldcup-com.onrender.com/matches/all-matches",config).then((res) => res.data);
      return (response);
    } catch (error) {
      if (error.response) {
        return (error.response);
      }
    }
    return (response);
  }
  async function getSData() {    
    var config = {
      method: 'get',
      headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
    };
    let response = '';
    try {

      response = await axios.get("https://http-fifaqatarworldcup-com.onrender.com/stadiums/all-stadiums",config).then((res) => res.data);
      return (response);
    } catch (error) {
      if (error.response) {
        return (error.response);
      }
    }
    return (response);
  }

  React.useEffect(() => {
    (async () => {
      const resp = await getData();
      const resp1 = await getSData();
      setMatchData(resp);
      setStadiumData(resp1);

    })();
  }, []);


  
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
      <div>{createSeating}</div>
      <div class={logged ? "" : "disappear"}>
        <CreditCard />
      </div>
    </div>
      }
    </>
  )
}
export default Reservation 