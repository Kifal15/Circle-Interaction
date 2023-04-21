import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function CreateWallet() {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");

  const handleCreateWallet = async () => {
    try {
      const idempotencyKey = uuidv4();
      const baseUrl = "https://api-sandbox.circle.com";
      const url = `${baseUrl}/v1/wallets`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        },
      };

      const data = {
        idempotencyKey,
        description,
      };

      const result = await axios.post(url, data, config);
      setResponse(JSON.stringify(result.data));
    } catch (error) {
      console.error(error);
      setResponse("Error creating wallet");
    }
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "lightblue",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.2s ease-in-out",
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Create a Circle Wallet</h1>
      <label style={{ marginBottom: "10px", display: "block" }}>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
      </label>
      <button onClick={handleCreateWallet} style={buttonStyle}>
        Create Wallet
      </button>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>{response}</div>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
  <p>Wallet ID: {response.walletId}</p>
  <p>Entity ID: {response.entityId}</p>
  <p>Type: {response.type}</p>
  <p>Description: {response.description}</p>
  <p>Balances: {JSON.stringify(response.balances)}</p>
</div>

    </div>
  );
}

export default CreateWallet;
