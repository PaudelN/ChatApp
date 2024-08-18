import React, { memo } from "react";
import { Link } from "../StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { darkBlue } from "../../../constants/color";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0px",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          padding: "0.5rem",
          borderRadius: "0px 5px 5px 0px",
          backgroundColor: sameSender ? "white" : "unset",
          color: sameSender ? darkBlue : "unset",
          justifyContent: "flex-start",
        }}
      >
        {/* Avatar card */}
        <AvatarCard avatar={avatar} />

        <Stack direction={"column"}>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Messages</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          ></Box>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
