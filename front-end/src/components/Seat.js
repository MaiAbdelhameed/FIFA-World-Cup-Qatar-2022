import React, {useState} from 'react'
import "./style/seating.css";


const Seat = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSelected, setSelected] = useState(false);

  const selectSeat = () => {
    setSelected((isSelected) => !isSelected);
  };

  return (
    <div>
      {props.val === 0 ? (
        <div
          class={isSelected && isLoggedIn ? "seat selected" : "seat"}
          onClick={selectSeat}
        ></div>
      ) : (
        <div class="seat sold"></div>
      )}
    </div>
  );
};

export default Seat;