import React, { useState } from "react";
import "./style/seating.css";
import matches from "../matches";
import Seat from "./Seat";



var isSold = true;

function Seating(props) {
  var manyRows = props.rows;
  var manySeats = props.seats;

  

  const drawGrid =    
  matches[1].area.map(row => {
    return (
      <div className="row">
        { 
          row.map((i) => <Seat  val={i}/> 
          ) 
        }
      </div>
    ) 
  });



  return (
    <div>
      <body className="bigcont">
        <div class="match-container">
          <label>
            {" "}
            Match {matches[0].id}: {matches[0].name}. Date: {matches[0].date}
          </label>
        </div>

        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
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
