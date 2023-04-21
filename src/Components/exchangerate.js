import { useState, useEffect } from "react";

function ExchangeRate() {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const apiUrl = "https://v6.exchangerate-api.com/v6/e073668ca64175396f6e226d/latest/USD";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRates(data.conversion_rates);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Exchange Rates for USD</h2>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(exchangeRates).map((currency) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{exchangeRates[currency]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangeRate;
