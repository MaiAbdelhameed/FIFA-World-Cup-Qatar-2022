import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./style/creditcard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const CreditCard = () => {
  const [num, setNum] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setNum(randomNumberInRange(1000000, 2000000));
  };
  const handleClose = () => setOpen(false);

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <form class="credit-card">
        <div class="form-header">
          <h4 class="title">Credit card detail</h4>
        </div>

        <div class="form-body">
          <input type="text" class="card-number" placeholder="Card Number" />

          <div class="date-field">
            <div class="month">
              <select name="Month">
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
            <div class="year">
              <select name="Year">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
                <option value="2031">2031</option>
              </select>
            </div>
          </div>

          <div class="card-verification">
            <div class="cvv-input">
              <input type="text" placeholder="CVV" />
            </div>
          </div>
          <div class="cvv-details">
            <p>3 or 4 digits usually found on the signature strip</p>
          </div>
          <button onClick={handleOpen} type="submit" class="proceed-btn">
            <a href="#">Proceed</a>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Thanks for your purchase!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Your ticket number is: {num}
              </Typography>
            </Box>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default CreditCard;
