import React from 'react'
import classes from './style/listItem.module.css'
import  MatchListItem from './MatchListItem'
import { useState } from 'react'



const MatchList = (props) => {

    const drawList = props.list.map((item) => {
        return(
          <div className={classes.container}>
          <MatchListItem team1={item.team1} 
           team2={item.team2}
           date={item.date}
           key={item.id}/> 
          </div>
        );
      });
      
    return(
        <div className={classes.container}>
            {drawList}
        </div>
    )
}

export default MatchList