import React from 'react'
import classes from './style/listItem.module.css'

function handleApprove() {
    //TODO
}

function handleDisapprove() {
    //TODO
}
const UsersListItem = (props) => {
    return(
        <div className={classes.container}>
            <div className={classes.cont1}>
                <h2 className={classes.title}>{props.username}</h2>
                <h3>{props.email}</h3>
            </div>
            <div className={classes.cont1}>
                <button className={classes.btn1}onClick={handleApprove}>approve</button>
                <button className={classes.btn2} onClick={handleDisapprove}>disapprove</button>
            </div>
        </div>
    )
}

export default UsersListItem