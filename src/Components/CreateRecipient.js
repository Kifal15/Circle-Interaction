import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateRecipient() {
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4()); // Generate UUID as idempotency key
  const [chain, setChain] = useState('ETH'); // Set chain to Ethereum as an example
  const [address, setAddress] = useState('');
  const [addressTag, setAddressTag] = useState('');
  const [metadata, setMetadata] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/v1/addressBook/recipients`, {
      idempotencyKey,
      chain,
      address,
      addressTag,
      metadata
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data); // Handle successful response
    })
    .catch((error) => {
      console.error(error); // Handle error
    });
  };

  return (
    <div className="container">
    <h1>Create Recipient</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="chain" className="form-label">Chain</label>
        <input type="text" className="form-control" id="chain" value={chain} onChange={(event) => setChain(event.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" value={address} onChange={(event) => setAddress(event.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="addressTag" className="form-label">Address Tag</label>
        <input type="text" className="form-control" id="addressTag" value={addressTag} onChange={(event) => setAddressTag(event.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="metadata" className="form-label">Metadata (Nickname, Email, BNS)</label>
        <input type="text" className="form-control" id="metadata" value={metadata} onChange={(event) => setMetadata(event.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Create Recipient</button>
    </form>
  </div>
  
  );
}

export default CreateRecipient;
