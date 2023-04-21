import React, { useState, useEffect } from "react";

function Paymentss() {
  const [recipientId, setRecipientId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    createRecipient();
  }, );

  const createRecipient = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Request-Id": "fb7980ad-fd01-468b-98ff-2d9ecff67f86",
        Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotencyKey: "9352ec9e-5ee6-441f-ab42-186bc71fbdde",
        chain: "ETH",
        address: "0x65BFCf1a6289a0b77b4D3F7d12005a05949FD8C3",
        metadata: {
          email: "satoshi@circle.com",
          bns: "testbns",
          nickname: "test nickname desc",
        },
      }),
    };

    fetch(`${process.env.BASE_URL}/v1/addressBook/recipients`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setRecipientId(data.data.id);
        checkRecipientStatus(data.data.id);
      })
      .catch((error) => console.log(error));
  };

  const checkRecipientStatus = (recipientId) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Request-Id": "fb7980ad-fd01-468b-98ff-2d9ecff67f86",
        Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${process.env.BASE_URL}/v1/addressBook/recipients/${recipientId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.data.status);
        if (data.data.status === "active") {
          payoutRecipient(recipientId);
        } else {
          setTimeout(() => {
            checkRecipientStatus(recipientId);
          }, 5000);
        }
      })
      .catch((error) => console.log(error));
  };

  const payoutRecipient = (recipientId) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Request-Id": "fb7980ad-fd01-468b-98ff-2d9ecff67f86",
        Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotencyKey: "fb7980ad-fd01-468b-98ff-2d9ecff67f86",
        amount: "100.00",
        currency: "USD",
        recipient: recipientId,
      }),
    };

    fetch(`${process.env.BASE_URL}/v1/payouts`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p>Recipient ID: {recipientId}</p>
      <p>Status: {status}</p>
    </div>
  );
  }
  export default Paymentss;
