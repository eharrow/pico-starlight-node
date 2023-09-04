import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import "./App.css";

const options = [{ id: 1, label: "one" }, { id: 2, label: "too" }, { id: 3, label: "three" }];

async function getConfig() {
  const resp = await fetch("http://192.168.178.2:4000");
  const config = await resp.json();
  console.log(config);
}

const SelectAnimation = () => {
  const handleChange = event => {
    console.log(event.target.value);
  };
  return (
    <Form.Select id="animation" aria-label="Animation selection" onChange={handleChange}>
      <option>Choose animation</option>
      {options.map(({ id, label }, index) => <option key={id} value={id}>{label}</option>)}
    </Form.Select>
  );
};

const App = () => (
  <Container className="p-3">
    <Container>
      <h1>Starlight Settings</h1>
      <SelectAnimation></SelectAnimation>
    </Container>
  </Container>
);

export default App;
