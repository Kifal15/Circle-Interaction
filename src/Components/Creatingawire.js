import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';

const WireBankAccountForm = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [district, setDistrict] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCity, setBankCity] = useState("");
  const [bankAddressLine1, setBankAddressLine1] = useState("");
  const [bankAddressLine2, setBankAddressLine2] = useState("");
  const [bankDistrict, setBankDistrict] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      idempotencyKey: uuidv4(),
      accountNumber,
      routingNumber,
      billingDetails: {
        name,
        city,
        country,
        line1: addressLine1,
        postalCode,
        line2: addressLine2,
        district,
      },
      bankAddress: {
        country: bankCountry,
        bankName,
        city: bankCity,
        line1: bankAddressLine1,
        line2: bankAddressLine2,
        district: bankDistrict,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/v1/banks/wires`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        alert("Wire bank account created successfully!");
      } else {
        alert("Error creating wire bank account");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating wire bank account");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="accountNumber">Account Number:</label>
        <input
          type="text"
          className="form-control"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="routingNumber">Routing Number:</label>
        <input
          type="text"
          className="form-control"
          id="routingNumber"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          className="form-control"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
<div className="form-group">
<label htmlFor="country">Country:</label>
<input
type="text"
className="form-control"
id="country"
value={country}
onChange={(e) => setCountry(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="addressLine1">Address Line 1:</label>
<input
type="text"
className="form-control"
id="addressLine1"
value={addressLine1}
onChange={(e) => setAddressLine1(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="postalCode">Postal Code:</label>
<input
type="text"
className="form-control"
id="postalCode"
value={postalCode}
onChange={(e) => setPostalCode(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="addressLine2">Address Line 2:</label>
<input
type="text"
className="form-control"
id="addressLine2"
value={addressLine2}
onChange={(e) => setAddressLine2(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="district">District:</label>
<input
type="text"
className="form-control"
id="district"
value={district}
onChange={(e) => setDistrict(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="bankCountry">Bank Country:</label>
<input
type="text"
className="form-control"
id="bankCountry"
value={bankCountry}
onChange={(e) => setBankCountry(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="bankName">Bank Name:</label>
<input
type="text"
className="form-control"
id="bankName"
value={bankName}
onChange={(e) => setBankName(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="bankCity">Bank City:</label>
<input
type="text"
className="form-control"
id="bankCity"
value={bankCity}
onChange={(e) => setBankCity(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="bankAddressLine1">Bank Address Line 1:</label>
<input
type="text"
className="form-control"
id="bankAddressLine1"
value={bankAddressLine1}
onChange={(e) => setBankAddressLine1(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="bankAddressLine2">Bank Address Line 2:</label>
<input
type="text"
className="form-control"
id="bankAddressLine2"
value={bankAddressLine2}
onChange={(e) => setBankAddressLine2(e.target.value)}
/>
</div>
<div className="form-group">
<label htmlFor="bankDistrict">Bank District:</label>
<input
type="text"
className="form-control"
id="bankDistrict"
value={bankDistrict}
onChange={(e) => setBankDistrict(e.target.value)}
/>
</div>
<button type="submit" className="btn btn-primary">
Create Wire Bank Account
</button>
</form>
);
};

export default WireBankAccountForm;


