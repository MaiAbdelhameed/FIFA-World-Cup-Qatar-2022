import React, {useState, useEffect} from 'react'
import "./style/seating.css";


const Seat = (props) => {
  const [isSelected, setSelected] = useState(false);
  const [logged,setLogged]=useState("");


  useEffect(() => {
      setLogged(sessionStorage.getItem("ID"))
  });

  const selectSeat = () => {
    setSelected((isSelected) => !isSelected);
    props.seats[props.i] = 2;
    console.log(props.i)
  };

  return (
    <div>
      {props.val === 0 ? (
        <div
          class={isSelected && logged ? "seat selected" : "seat"}
          onClick={selectSeat}
        ></div>
      ) : (
        <div class="seat sold"></div>
      )}
    </div>
  );
};

export default Seat;