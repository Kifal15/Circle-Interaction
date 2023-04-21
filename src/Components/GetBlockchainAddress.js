import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const BlockWalletAddresses = () => {
  const [walletId, setWalletId] = useState('');
  const [addresses, setAddresses] = useState([]);

  const handleInputChange = event => {
    setWalletId(event.target.value);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`https://api-sandbox.circle.com/v1/wallets/${walletId}/addresses`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
          }
        });
        setAddresses(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, [walletId]);

  return (
    <div>
      <h3>List of Addresses</h3>
      <form>
        <label>
          Wallet ID:
          <input type="text" value={walletId} onChange={handleInputChange} />
        </label>
      </form>
      <ListGroup>
        {addresses.map(address => (
          <ListGroupItem key={address.address}>
            {address.address} ({address.currency}, {address.chain})
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default BlockWalletAddresses;
