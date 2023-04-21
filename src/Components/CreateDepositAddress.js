import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function CreateDepositAddress() {
  const [idempotencyKey, setIdempotencyKey] = useState('');
  const [currency, setCurrency] = useState('');
  const [chain, setChain] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_BASE_URL}/v1/businessAccount/wallets/addresses/deposit`;
    const apiKey = process.env.REACT_APP_CIRCLE_API_KEY;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        idempotencyKey: uuidv4(),
        currency,
        chain,
      }),
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Deposit Address</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="idempotencyKey">
          <Form.Label>Idempotency Key</Form.Label>
          <Form.Control
            type="text"
            value={idempotencyKey}
            onChange={(event) => setIdempotencyKey(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="currency">
          <Form.Label>Currency</Form.Label>
          <Form.Control
            type="text"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="chain">
          <Form.Label>Chain</Form.Label>
          <Form.Control
            type="text"
            value={chain}
            onChange={(event) => setChain(event.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default CreateDepositAddress;
