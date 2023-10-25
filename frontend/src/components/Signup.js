import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const sendRequest = async () => {
    const response = await axios
      .post("http://localhost:5000/api/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => {
        console.log(error);
      });
    const data = await response.data;
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();
    if (data.success) {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  return (
    <div>
      <Box
        marginLeft="auto"
        marginRight="auto"
        width={300}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        onSubmit={handleSubmit}
        component="form"
      >
        <Typography variant="h3">Signup</Typography>
        <TextField
          value={inputs.name}
          name="name"
          type="text"
          variant="outlined"
          placeholder="Name"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          value={inputs.email}
          type="email"
          margin="normal"
          name="email"
          variant="outlined"
          placeholder="email"
          onChange={handleChange}
        />
        <TextField
          value={inputs.password}
          type="password"
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          name="password"
          placeholder="password"
        />
        <Button variant="contained" type="submit">
          SignUp
        </Button>
      </Box>
    </div>
  );
};

export default Signup;
