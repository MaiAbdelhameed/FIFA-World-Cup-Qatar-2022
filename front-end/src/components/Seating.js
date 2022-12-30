import React, { useState } from "react";
import "./style/seating.css";
import matches from "../matches";
import Seat from "./Seat";


function Seating(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [numSelected, setnumSelected] = useState(0);
  const [isSelected, setSelected] = useState(false);

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
        <div class="match-container">
          <label>
            {" "}
            Match {props.id}: {props.name}. Date: {props.date}
          </label>
        </div>
        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div class={isLoggedIn ? "seat selected" : "disappear"}></div>
            <small class={isLoggedIn ? "" : "disappear"}>Selected</small>
          </li>
          <li>
            <div class="seat sold"></div>
            <small>Sold</small>
          </li>
        </ul>

        <div class="container">
          <div class="screen"></div>

          <div>{drawGrid}</div>
        </div>
      </body>
    </div>
  );
}

export default Seating;