import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipientsList = () => {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const fetchRecipients = async () => {
      const response = await axios.get('https://api-sandbox.circle.com/v1/addressBook/recipients', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
              }
      });
      setRecipients(response.data.data);
    };

    fetchRecipients();
  }, []);

  return (
    <div style={{ overflowY: 'scroll', height: '500px' }}>
      <h2>Address Book Recipients</h2>
      <ul>
        {recipients.map((recipient) => (
          <li key={recipient.id}>
            <p>ID: {recipient.id}</p>
            <p>Chain: {recipient.chain}</p>
            <p>Address: {recipient.address}</p>
            <p>Address Tag: {recipient.addressTag}</p>
            <p>Nickname: {recipient.metadata.nickname}</p>
            <p>Email: {recipient.metadata.email}</p>
            <p>BNS: {recipient.metadata.bns}</p>
            <p>Status: {recipient.status}</p>
            <p>Created Date: {recipient.createDate}</p>
            <p>Updated Date: {recipient.updateDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipientsList;
