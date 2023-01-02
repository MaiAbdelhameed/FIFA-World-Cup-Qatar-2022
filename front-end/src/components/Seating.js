import React, { useState, useEffect } from "react";
import "./style/seating.css";
import Seat from "./Seat";


function Seating(props) {
  const [numSelected, setnumSelected] = useState(0);
  const [isSelected, setSelected] = useState(false);
  const [arrSeats, setSeats] = useState(props.seats);
  const [logged,setLogged]=useState("");

  let rows = 4;


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
        {/* {row.map((i) => (
        ))} */}
        <Seat val={row} seats={props.seats} i={index} />

      </div>
    );
  });


  return (
    <div>
      <body className="bigcont">
        <div className="match-container">
          <label>
            {" "}
           {props.team1} vs {props.team2} . Date: {props.date}
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
        </div>
      </body>
    </div>
  );
}

export default Seating;