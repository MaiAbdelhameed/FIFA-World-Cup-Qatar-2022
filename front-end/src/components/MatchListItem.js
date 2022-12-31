import React from 'react'
import classes from './style/listItem.module.css'
import axios from 'axios';

function handleUpdate(data) {
    //TODO
}


const MatchListItem = (props) => {

    const handleDelete = () =>  { 
        (async () => {
            var config = {
                method: 'delete',
                headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
              };
            let response = '';
            try {
                console.log(props.id)

                response = await axios.delete("https://http-fifaqatarworldcup-com.onrender.com/matches/delete/" + props.id ,config).then((res) => res.data);
    
        
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
            <h2 className={classes.title}>{props.team1} vs {props.team2}</h2>
            <h3 className={classes.date}>{props.date}</h3>
            <button className={classes.btn1} onClick={handleUpdate}>update</button>
            <button className={classes.btn2} onClick={handleDelete}>delete</button>
        </div>
    )
}

export default MatchListItem