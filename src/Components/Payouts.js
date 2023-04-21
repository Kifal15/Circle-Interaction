import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function Payout() {
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());
  const [destination, setDestination] = useState({ type: '', id: '' });
  const [amount, setAmount] = useState({ amount: '', currency: '' });
  const [metadata, setMetadata] = useState({ beneficiaryEmail: '' });
  const [source, setSource] = useState({ type: '', id: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const url = 'https://api-sandbox.circle.com/v1/payouts';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
      },
    };

    const payload = {
      idempotencyKey: idempotencyKey,
      destination: destination,
      amount: amount,
      metadata: metadata,
      source: source,
    };

    try {
      const response = await axios.post(url, payload, options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
           <h1 style={{ marginBottom: "1rem", fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>Make A Circle Payout</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Idempotency Key</label>
          <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={idempotencyKey} onChange={(event) => setIdempotencyKey(event.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Destination Type</label>
          <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={destination.type} onChange={(event) => setDestination({ ...destination, type: event.target.value })} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Destination ID</label>
          <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }}
type="text" value={destination.id} onChange={(event) => setDestination({ ...destination, id: event.target.value })} />
</div>    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Amount</label>
      <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={amount.amount} onChange={(event) => setAmount({ ...amount, amount: event.target.value })} />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Currency</label>
      <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={amount.currency} onChange={(event) => setAmount({ ...amount, currency: event.target.value })} />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Beneficiary Email</label>
      <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={metadata.beneficiaryEmail} onChange={(event) => setMetadata({ ...metadata, beneficiaryEmail: event.target.value })} />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Source Type</label>
      <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={source.type} onChange={(event) => setSource({ ...source, type: event.target.value })} />
    </div>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Source ID</label>
      <input style={{ border: '1px solid #9CA3AF', borderRadius: '0.375rem', padding: '0.5rem 0.75rem' }} type="text" value={source.id} onChange={(event) => setSource({ ...source, id: event.target.value })} />
    </div>

    <button type="submit" style={{ backgroundColor: '#4F46E5', color: '#ffffff', fontWeight: '600', borderRadius: '0.375rem', padding: '0.75rem 1rem', marginTop: '1rem', border: 'none' }}>
      {isLoading ? 'Loading...' : 'Submit'}
    </button>
  </form>
</div>
);
}

export default Payout;