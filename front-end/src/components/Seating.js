import React, { useState, useEffect } from "react";
import "./style/seating.css";
import Seat from "./Seat";


function Seating(props) {
  console.log(props.stadiums)
  const [numSelected, setnumSelected] = useState(0);
  const [isSelected, setSelected] = useState(false);
  const [rows, setRows] = useState(Number(props.stadiums[Number(props.venue)].numRows));
  console.log(rows)
  const [initialSeats, setInitial] = useState(props.seats);
  const [logged,setLogged]=useState("");

  // let rows = 5;

  function formatDate(date)
  {
    return(date?date.slice(0,10):null)
  }
  
  const bookticket =()=>{
    //For preparing the tickets to the backend
    // for(let i=0; i<props.seats.length; i++)
    // {
    //     if(props.seats[i] == 2)
    //     props.seats[i]=1;
    // }
    //Send the array of numbers to the backend 
    let diff =0;

    for(let i=0; i<props.seats.length; i++){
      if(initialSeats[i] != props.seats[i]){
        diff++; 
      }
    }
    console.log(diff)
  }

  useEffect(() => {
      setLogged(sessionStorage.getItem("ID"))
  }); 

  const selectSeat = (event) => {
    setSelected((isSelected) => !isSelected);
    if (isSelected) {
      setnumSelected((numSelected) => numSelected++);
      console.log(numSelected);
    } else {
      setnumSelected((numSelected) => numSelected--);
      console.log(numSelected);
    }
  };

  const drawGrid = props.seats.map((row, index) => {
    return (
      <div className="row">
        <Seat val={row} seats={props.seats} i={index} />
      </div>
    );
  });


  return (
    <div>
      <body className="bigcont">
        <div className="match-container">
          <label className="title">
            {" "}
           {props.team1} vs {props.team2} . Date: {formatDate(props.date)} at {props.time}
          </label>
        </div>
        <ul class="showcase">
          <li>
            <div className="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div className={logged ? "seat selected" : "disappear"}></div>
            <small className={logged ? "" : "disappear"}>Selected</small>
          </li>
          <li>
            <div className="seat sold"></div>
            <small>Sold</small>
          </li>
        </ul>

        <div className="container" style={{maxWidth:(90*rows)}}>
          <div className="screen"></div>

          <div className="stadium"  >{drawGrid}</div>
          <button  className="btn" onClick={bookticket}>Reserve</button>
        </div>
      </body>
    </div>
  );
}

export default Seating;