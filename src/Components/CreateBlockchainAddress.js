import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_CIRCLE_API_KEY;

function CreateAddress() {
  const [walletId, setWalletId] = useState('');
  const [currency, setCurrency] = useState('');
  const [chain, setChain] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const idempotencyKey = uuidv4();
    const url = `https://api-sandbox.circle.com/v1/wallets/${walletId}/addresses`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
     
    };
    const data = {
      idempotencyKey,
      currency,
      chain
    };

    try {
      const response = await axios.post(url, data, { headers });
      setAddress(response.data.address);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Create a new blockchain address</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="walletId">Wallet ID</label>
          <input
            type="text"
            className="form-control"
            id="walletId"
            value={walletId}
            onChange={(event) => setWalletId(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            className="form-control"
            id="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="chain">Chain</label>
          <input
            type="text"
            className="form-control"
            id="chain"
            value={chain}
            onChange={(event) => setChain(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Generate Address</button>
      </form>
      {address && (
        <div className="mt-4">
          <h2>Generated Address:</h2>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}

export default CreateAddress ;
