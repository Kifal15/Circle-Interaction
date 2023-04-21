import React, { useState, useEffect } from 'react';

function PayoutsList() {
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await fetch('https://api-sandbox.circle.com/v1/payouts', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPayouts(data.data);
        } else {
          console.error('Failed to fetch payouts');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPayouts();
  }, []);

  return (
    <div>
      <h1>List of Payouts Made Thru Circle</h1>
      <div style={{ height: '500px', overflowY: 'scroll' }}>
        <ul>
          {payouts.map(payout => (
            <li key={payout.id}>
              <p>Source Wallet ID: {payout.sourceWalletId}</p>
              <p>Destination ID: {payout.destination.id}</p>
              <p>Destination Name: {payout.destination.name}</p>
              <p>Destination Type: {payout.destination.type}</p>
              <p>Amount: {payout.amount.amount} {payout.amount.currency}</p>
              <p>Fees: {payout.fees.amount} {payout.fees.currency}</p>
              <p>Status: {payout.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PayoutsList;
