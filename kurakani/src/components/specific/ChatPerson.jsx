import { Backdrop, Chip, Divider, Stack, Typography } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import ChatItem from "../styles/shared/ChatItem";
import { darkBlue } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";

const SearchDialog = lazy(() => import("../specific/Search"));

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
  index,
}) => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const openSearch = () => dispatch(setIsSearch(true));

  return (
    <>
      <Stack width={w} direction={"column"} height={"100%"}>
        {" "}
        <Typography
          color={"black"}
          sx={{
            fontFamily: "monospace",
            fontSize: "24px",
            marginTop: "3rem",
            letterSpacing: 2.5,
            position: "relative",
            left: "10px",
          }}
        >
          Inbox
        </Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Divider
            sx={{
              marginBottom: "1rem",
            }}
          >
            <Chip
              label="Search"
              sx={{
                color: "black",
                alignContent: "center",
                border: "1px solid black",
                backgroundColor: "white",
                fontSize: "14px",
                fontFamily: "monospace",
                marginTop: "1rem",
                ":hover": {
                  color: "white",
                  backgroundColor: darkBlue,
                  border: "1px solid black",
                },
              }}
              variant="filled"
              size="Large"
              onClick={openSearch}
            ></Chip>
          </Divider>
        </div>
        {chats?.map((data) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );
          const isOnline = members.some(member => onlineUsers.includes(_id));

          return (
            <ChatItem
              index={index}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
      </Stack>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
    </>
  );
};

export default ChatList;
