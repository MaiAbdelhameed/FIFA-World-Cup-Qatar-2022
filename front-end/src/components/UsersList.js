import React from 'react'
import classes from './style/list.module.css'
import { useState } from 'react'
import UsersListItem from './UsersListItem'



const UsersList = (props) => {

    const drawList = props.list.map((item) => {
            if(!item.approved){
                return(          
                <div className={classes.container1}>
                    <UsersListItem username={item.username} 
                    email={item.email}
                    id={item._id}
                    exist = {0}
                    key={item.id}/> 
                </div>)
            }else{
                return(          
                    <div className={classes.container2}>
                        <UsersListItem username={item.username} 
                        email={item.email}
                        id={item._id}
                        exist = {1}
                        key={item.id}/> 
                    </div>)
            }
        })
      
    return(
        <div className={classes.container}>
            {drawList}
        </div>
    )
}

export default UsersList