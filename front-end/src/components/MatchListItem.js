import React from 'react'
import classes from './style/listItem.module.css'

function handleUpdate() {
    //TODO
}

function handleDelete() {
    //TODO
}
const MatchListItem = (props) => {
    return(
        <div className={classes.container}>
            <h2 className={classes.title}>{props.team1} vs {props.team2}</h2>
            <h3 className={classes.date}>{props.date}</h3>
            <button className={classes.btn1}onClick={handleUpdate}>update</button>
            <button className={classes.btn2} onClick={handleDelete}>delete</button>
        </div>
    )
}

export default MatchListItem