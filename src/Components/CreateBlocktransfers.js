import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";

function CreateBlockTransfer() {
  const [walletId, setWalletId] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [idempotencyKey, setIdempotencyKey] = useState(uuidv4());
  const [sourceType, setSourceType] = useState("");
  const [destinationType, setDestinationType] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        `https://api-sandbox.circle.com/v1/transfers`,
        {
          idempotencyKey: idempotencyKey,
          source: {
            type: sourceType,
            id: walletId,
          },
          destination: {
            type: destinationType,
            address: destinationAddress,
            chain: 'ETH', // add chain parameter for blockchain transfers
          },
          amount: {
            amount: amount,
            currency: 'USD',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="container mt-4">
      <h1>Transfer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="sourceType">
          <Form.Label>Source Type</Form.Label>
          <Form.Control
            as="select"
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            required
          >
            <option value="">Select source type</option>
            <option value="wallet">Wallet</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="destinationType">
          <Form.Label>Destination Type</Form.Label>
          <Form.Control
            as="select"
            value={destinationType}
            onChange={(e) => setDestinationType(e.target.value)}
            required
          >
            <option value="">Select destination type</option>
            <option value="blockchain">Blockchain</option>
            <option value="wallet">Wallet</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="walletId">
          <Form.Label>Wallet ID</Form.Label>
          <Form.Control
            type="text"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="destinationAddress">
          <Form.Label>Destination Address</Form.Label>
          <Form.Control
            type="text"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
   
    </div>
  );
}

export default CreateBlockTransfer;
