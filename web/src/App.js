import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./App.css";

// const options = [{ id: 1, label: "one" }, { id: 2, label: "too" }, { id: 3, label: "three" }];
const baseUrl = "http://localhost:3000";

const SelectAnimation = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function fetchConfig() {
      const resp = await axios.get(baseUrl);
      const respConfig = await resp.data;
      setConfig(respConfig);
    }
    fetchConfig();
  }, []);
  const handleChange = event => {
    console.log(event.target.value);
  };
  return (
    <Form.Select id="animation" aria-label="Animation selection" onChange={handleChange}>
      {Object.keys(config).map((k, i) => {
        if (k !== "current_animation") return <option key={k} value={k}>{k}</option>;
      })}
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
