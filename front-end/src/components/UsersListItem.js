import React from 'react'
import classes from './style/listItem.module.css'
import axios from 'axios'



const UsersListItem = (props) => {

    const handleApprove = () =>{
        (async () => {
            var config = {
                method: 'put',
                headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
              };
            let response = '';
            try {
                console.log( sessionStorage.getItem("tokenValue"))

    
                response = await axios.put("https://http-fifaqatarworldcup-com.onrender.com/auth/sign-up-approve/" + props.id, '',{ headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenValue")}` } }).then((res) => {
                    console.log(res)
                })
                return (response);
              } catch (error) {
                if (error.response) {
                  return (error.response);
                }
              }
              return (response);
    
        })();
    }

    
    const handleRemove = () =>{
        (async () => {
            var config = {
                method: 'delete',
                headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
              };
            let response = '';
            try {

                response = await axios.delete("https://http-fifaqatarworldcup-com.onrender.com/auth/sign-up-disapprove/" + props.id ,config).then((res) => res.data);
        
                return (response);
              } catch (error) { 
                if (error.response) {
                  return (error.response);
                }
              }
              return (response);
    
        })();
    }

    return(
        <div className={classes.container}>
            <div className={classes.cont1}>
                <h2 className={classes.title}>{props.username}</h2>
                <h3>{props.email}</h3>
            </div>
            <div className={classes.cont1}>
                {props.exist ? 
                <button className={classes.btn2} onClick={handleRemove}>Remove</button>
                :
                <button className={classes.btn1} onClick={handleApprove}>approve</button>} 
            </div>
        </div>
    )
}

export default UsersListItem