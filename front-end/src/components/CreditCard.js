import * as React from "react";
import "./style/creditcard.css";

const CreditCard = () => {
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
          <button type="submit" class="proceed-btn">
            <a href="#">Proceed</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreditCard;
