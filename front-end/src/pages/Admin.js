import React, {useState} from 'react'
import classes from './style/manager.module.css'
import UsersList from '../components/UsersList'
import usersData from '../usersData'

//import products from './dummyData'
const Admin = () => {

  return (
    <div className={classes.body}>
    <div className={classes.title}>Admin</div>
    <UsersList list={usersData}/>
    </div>
  )
}

export default Admin