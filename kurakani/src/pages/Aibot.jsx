import { CleaningServices, SendRounded as Send } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/styles/layout/AppLayout";
import AiBotComponent from "../components/styles/shared/AiBotComponent";
import { InputBox } from "../components/styles/StyledComponent";

const user = {
  _id: "fdghsd",
  name: "Nukesh Paudel",
};

const Aibot = () => {
  const containerRef = useRef(null);
  const [value, setValue] = useState([]);
  const [error, setError] = useState("");

  const config = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    message: value,
  };

  const response = async () => {
    if (!value) {
      setError("Please enter something");
      return;
    }
    try {
      const aiData = await axios.post(`${server}/api/v1/user/aibot`, config);
      const data = await aiData.text();
      console.log(data);
    } catch (error) {
      toast.error(error);
      setError("Something went wrong with the AI");
    }
  };

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"white"}
        height={"88%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* Render Messages */}

      
      </Stack>
      <form
        style={{
          height: "5rem",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"0.7rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <InputBox
            value={value}
            placeholder="Chat with bot..."
            sx={{
              "::placeholder": {
                letterSpacing: "7px",
                fontFamily: "monospace",
              },
            }}
            onChange={(e) => setValue(e.target.value)}
          />

          {!error && (
            <IconButton type="submit" onClick={response}>
              <Send
                sx={{
                  color: "black",
                  marginLeft: "1rem",
                  fontSize: "30px",
                }}
              />
            </IconButton>
          )}

          {error && (
            <IconButton type="submit">
              <CleaningServices
                sx={{
                  color: "black",
                  marginLeft: "1rem",
                  fontSize: "30px",
                }}
              />
            </IconButton>
          )}
        </Stack>
        {error && toast.error(error)}
        <FileMenu />
      </form>
    </>
  );
};

export default AppLayout()(Aibot);
