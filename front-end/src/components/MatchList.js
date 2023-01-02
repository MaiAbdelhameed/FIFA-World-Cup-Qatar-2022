import React from 'react'
import classes from './style/list.module.css'
import  MatchListItem from './MatchListItem'
import { useState } from 'react'




const MatchList = (props) => {

    const drawList = props.list.map((item) => {
        return(
          <div className={classes.container}>
          <MatchListItem team1={item.firstTeam} 
           team2={item.secondTeam}
           date={item.date}
           id = {item._id}
           key={item._id}/> 
          </div>
        );
      });
      
    return(
        <div className={classes.container}>
        <h1> Matches List</h1>
          <div>
          {drawList}
          </div>
        </div>
    )
}

export default MatchList