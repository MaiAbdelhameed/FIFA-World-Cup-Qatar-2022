import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import classes from './style/manager.module.css'
import MatchCard from '../components/matchCard';
import StadiumCard from '../components/StadiumCard';
import MatchList from '../components/MatchList';
import listData from '../listData'


const Manager = () => {
  
  return (
    <div className={classes.body}>
      <div className={classes.title}>Manager</div>
      <MatchCard />
      <StadiumCard />
      <MatchList list={listData}/>
    </div>
  )

}

export default Manager