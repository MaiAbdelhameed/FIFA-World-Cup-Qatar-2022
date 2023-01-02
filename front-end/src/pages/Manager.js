import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import classes from './style/manager.module.css'
import MatchCard from '../components/matchCard';
import StadiumCard from '../components/StadiumCard';
import MatchList from '../components/MatchList';



const Manager = () => {

  const [matchData,setMatchData ] = React.useState([]);

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

  React.useEffect(() => {
    (async () => {
      const resp = await getData();
      setMatchData(resp);
    })();
  }, []);


  
  
  
  return (
    <div className={classes.body} >
      <div className={classes.title}>Manager</div>
      <MatchCard />
      <StadiumCard />
      <MatchList list={matchData}/>
    </div>
  )

}

export default Manager