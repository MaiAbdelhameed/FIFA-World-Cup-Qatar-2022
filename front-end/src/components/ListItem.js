import React from 'react'
import classes from './style/listItem.module.css'
import { useState } from 'react'

const ListItem = (props) => {
    return(
        <div className={classes.container}>
            <h2 className={classes.title}>{props.title}</h2>
            <button className={classes.btn1}>{props.btn1}</button>
            <button className={classes.btn2}>{props.btn2}</button>
        </div>
    )
}

export default ListItem