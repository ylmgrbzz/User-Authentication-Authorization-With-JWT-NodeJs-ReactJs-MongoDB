import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">YlmgrbzApp</Typography>
          <Box sx={{ marginLeft: "auto"}}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, value) => setValue(value)}
              value={1}
              textColor="inherit"
            >
              <Tab label="Login" />
              <Tab label="SignUp" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
