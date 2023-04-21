import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function TransferFunds() {
  const [masterWalletId, setMasterWalletId] = useState('');
  const [newWalletId, setNewWalletId] = useState('');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransfer = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    const requestBody = {
      idempotencyKey: uuidv4(),
      source: {
        type: 'wallet',
        id: masterWalletId,
      },
      destination: {
        type: 'wallet',
        id: newWalletId,
      },
      amount: {
        amount: amount,
        currency: 'USD',
      },
    };
    try {
      const response = await axios.post(
        'https://api-sandbox.circle.com/v1/transfers',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
          },
        }
      );
      console.log(response.data);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div style={{margin: '20px'}}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold'}}>Transfer Funds To a Circle ID</h1>
      <Form>
        <Form.Group controlId="formMasterWalletId">
          <Form.Label style={{fontSize: '18px'}}>Master Wallet ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Master Wallet ID"
            value={masterWalletId}
            onChange={(e) => setMasterWalletId(e.target.value)}
            style={{fontSize: '16px', marginBottom: '10px'}}
          />
        </Form.Group>

        <Form.Group controlId="formNewWalletId">
          <Form.Label style={{fontSize: '18px'}}>New Wallet ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter New Wallet ID"
            value={newWalletId}
            onChange={(e) => setNewWalletId(e.target.value)}
            style={{fontSize: '16px', marginBottom: '10px'}}
          />
        </Form.Group>

        <Form.Group controlId="formAmount">
          <Form.Label style={{fontSize: '18px'}}>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{fontSize: '16px', marginBottom: '10px'}}
          />
        </Form.Group>

        <Button 
          variant="primary" 
          onClick={handleTransfer} 
          disabled={isLoading}
          style={{fontSize: '18px', fontWeight: 'bold'}}
        >
          {isLoading ? 'Loading...' : 'Transfer Funds'}
        </Button>
      </Form>

      {isSuccess && <p style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>Transfer successful!</p>}
    </div>
  );
}

export default TransferFunds;
