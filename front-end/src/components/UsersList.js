import React from 'react'
import classes from './style/list.module.css'
import { useState } from 'react'
import UsersListItem from './UsersListItem'



const UsersList = (props) => {

    const drawList = props.list.map((item) => {
        return(
          <div className={classes.container1}>
          <UsersListItem username={item.username} 
           email={item.email}
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

export default UsersList