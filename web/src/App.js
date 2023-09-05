import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./App.css";

const baseUrl = "/"; // "http://localhost:3000/";

const SelectAnimation = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    async function fetchConfig() {
      const resp = await axios.get(`${baseUrl}config.json`);
      const respConfig = await resp.data;
      setConfig(respConfig);
      console.log(`loaded current_animation as ${respConfig["current_animation"]}`);
    }
    fetchConfig();
  }, []);

  async function changeAnimation() {
    const resp = await axios.post(`${baseUrl}config.json`, config);
    console.log(resp);
  }

  const isSelected = (config, val) => config["current_animation"] === val;

  const handleChange = event => {
    console.log(`changing to ${event.target.value}`);
    config["current_animation"] = event.target.value;
    console.log(config);
    changeAnimation();
  };
  return (
    <Form.Select id="animation" aria-label="Animation selection" onChange={handleChange}>
      {Object.keys(config).map((k, i) => {
        if (k !== "current_animation") {
          return isSelected(config, k)
            ? <option key={k} value={k} selected>{k}</option>
            : <option key={k} value={k}>{k}</option>;
        }
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
