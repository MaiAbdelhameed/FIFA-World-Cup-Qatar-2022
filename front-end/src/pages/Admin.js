import React, {useState} from 'react'
import classes from './style/manager.module.css'
import UsersList from '../components/UsersList'
import axios from 'axios'

//import products from './dummyData'
const Admin = () => {

  const [usersData,setUsersData ] = React.useState([]);

  async function getData() {
    console.log("requesting")

    var config = {
      method: 'get',
      headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
    };
    let response = '';
    try {

      response = await axios.get("https://http-fifaqatarworldcup-com.onrender.com/users/all-users",config).then((res) => res.data);
      return (response);
    } catch (error) {
      if (error.response) {
        return (error.response);
      }
    }
    return (response);
  }

  React.useEffect(() => {
    (async () => {
      const resp = await getData();
      setUsersData(resp);
    })();
  }, []);
  

  return (
    <div className={classes.body}>
    <div className={classes.title}>Admin</div>
    <UsersList list={usersData}/>
    </div>
  )
}

export default Admin