import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import classes from './style/leaderboard.module.css'
import MatchCard from '../components/matchCard';
import StadiumCard from '../components/StadiumCard';


const Manager = () => {
  
  return (
    <div className={classes.body}>
      <div className={classes.title}>Manager</div>
      <MatchCard />
      <StadiumCard />
    </div>
  )

}

export default Manager