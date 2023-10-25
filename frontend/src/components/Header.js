import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/index";

const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const sendLogoutReq = async () => {
    try {
      const response = await axios.post(
        "http://localhost:/api/auth/logout",
        null,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">YlmgrbzApp</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, value) => setValue(value)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="SignUp" />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
