import React, { useState } from "react";
import axios from "axios";

function GetWallet() {
  const [walletId, setWalletId] = useState("");
  const [response, setResponse] = useState("");

  const handleGetWallet = async () => {
    try {
      const baseUrl = "https://api-sandbox.circle.com";
      const url = `${baseUrl}/v1/wallets/${walletId}`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
        },
      };

      const result = await axios.get(url, config);
      setResponse(result.data);
    } catch (error) {
      console.error(error);
      setResponse("Error getting wallet");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ marginBottom: "1rem", fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>Get Wallet</h1>
      <label style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
        Circle Wallet ID:
        <input style={{ marginLeft: "0.5rem", border: "1px solid #9CA3AF", borderRadius: "0.375rem", padding: "0.5rem 0.75rem" }}
          type="text"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
        />
      </label>
      <button style={{ fontSize: "1.25rem", fontWeight: "600", backgroundColor: "#2563EB", color: "#FFFFFF", borderRadius: "0.375rem", padding: "0.5rem 1rem", cursor: "pointer" }} onClick={handleGetWallet}>Get Wallet</button>
      <div style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>{JSON.stringify(response)}</div>
    </div>
  );
}

export default GetWallet;
