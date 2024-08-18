import React from "react";
import AppLayout from "../components/styles/layout/AppLayout";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import TouchAppSharpIcon from "@mui/icons-material/TouchAppSharp";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";

import { Link } from "react-router-dom";
import { darkBlue } from "../constants/color";

const home = () => {
  return (
    <>
      <Box
        maxWidth={"32rem"}
        margin={"2rem"}
        padding={"0.5rem"}
        borderRadius={"10px"}
        bgcolor={"#B2BAF8"}
        position={"relative"}
        justifyContent={"center"}
      >
        <Typography
          variant="h4"
          color={"black"}
          overflow={"hidden"}
          sx={{
            fontFamily: "monospace",
            letterSpacing: 2.5,
            position: "relative",
            textAlign: "center",
          }}
        >
          Dashboard
        </Typography>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography
            variant="h6"
            color={"#7A7018"}
            overflow={"hidden"}
            sx={{
              padding: "1rem",
              fontFamily: "monospace",
              letterSpacing: 2.5,
              position: "relative",
              right: "0",
            }}
          >
            QUICK CONVERSATIONS
            <br /> INSTANT CONNECTIONS​
          </Typography>
          <Avatar
            alt="Chat Sharp"
            src="/src/assets/images/nobgchat.png"
            sx={{
              display: "flex",
              position: "relative",
              margin: "1rem",
              height: "10rem",
              width: "10rem",
            }}
          />
        </Box>
        <Link to={"/chat/:chatId"}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1rem"}
          >
            {" "}
            <Typography
              color={darkBlue}
              overflow={"hidden"}
              sx={{
                padding: "1rem",
                fontFamily: "monospace",
                letterSpacing: 2.5,
                position: "relative",
                left: "10px",
                cursor: "pointer",
              }}
            >
              Click here to Start
            </Typography>
            <IconButton
              color={darkBlue}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchAppSharpIcon />
            </IconButton>
          </Box>
        </Link>
      </Box>
      <Box
        maxWidth={"22rem"}
        margin={"2rem"}
        padding={"0.5rem"}
        borderRadius={"10px"}
        bgcolor={"#B2BAF8"}
        position={"relative"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {" "}
          <Typography
            color={"#7A7018"}
            overflow={"hidden"}
            sx={{
              letterSpacing: 1.5,
              fontFamily: "sans-serif",
            }}
          >
            {" "}
            Whether you need a friendly chat or a bit of motivation, our chatbot
            is here to help you feel better and remind you that you're not
            alone.
          </Typography>
          <Avatar
            alt="Chat Sharp"
            src="/src/assets/images/bot.png"
            sx={{
              position: "relative",
              margin: "1rem",
              height: "10rem",
              width: "10rem",
            }}
          />
        </Box>
        <Link to={"/aibot"}>
          <Box
            maxWidth={"10rem"}
            padding={"0.5rem"}
            border={"1px solid #B2BAF8"}
            color={darkBlue}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1rem"}
            left={"10rem"}
          >
            <Typography variant="body1">To Chat Bot</Typography>
            <SmartToySharpIcon />
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default AppLayout()(home);
