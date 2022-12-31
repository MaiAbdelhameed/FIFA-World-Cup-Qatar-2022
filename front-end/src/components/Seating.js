import React, { useState, useEffect } from "react";
import "./style/seating.css";
import matches from "../matches";
import Seat from "./Seat";


function Seating(props) {
  const [numSelected, setnumSelected] = useState(0);
  const [isSelected, setSelected] = useState(false);
  const [logged,setLogged]=useState("");


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

  const drawGrid = props.area.map((row) => {
    return (
      <div className="row">
        {row.map((i) => (
          <Seat val={i} />
        ))}
      </div>
    );
  });

  return (
    <div>
      <body className="bigcont">
        <div className="match-container">
          <label>
            {" "}
            Match {props.id}: {props.name}. Date: {props.date}
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

        <div className="container">
          <div className="screen"></div>

          <div>{drawGrid}</div>
        </div>
      </body>
    </div>
  );
}

export default Seating;