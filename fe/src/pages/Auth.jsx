import React from "react";
import PropTypes from "prop-types";

import { LoginForm, RegisterForm } from "@containers";
import { TabPanel } from "@components";
import { COMMON } from "@utils";

import { Box, Container, Paper, Tabs, Tab } from "@mui/material";

function Auth(props) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="auth tabs"
            centered
          >
            <Tab label="Đăng nhập" {...COMMON.a11yProps("auth", 0)} />
            <Tab label="Đăng ký" {...COMMON.a11yProps("auth", 1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <RegisterForm />
        </TabPanel>
      </Paper>
    </Container>
  );
}

Auth.propTypes = {};

export default Auth;
