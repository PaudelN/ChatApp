import { Box, Drawer, Skeleton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  REFETCH_CHATS,
} from "../../../constants/events";
import { userErrors, useSocketEvents } from "../../../hooks/hook";
import { useMyChatsQuery } from "../../../redux/api/api";
import {
  SetIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../../redux/reducers/misc";
import { getSocket } from "../../../socket";
import ChatPerson from "../../specific/ChatPerson";
import Profile from "../../specific/Profile";
import MobileBar from "../layout/MobileBar";
import Title from "../shared/Title";
import Sidebar from "./Sidebar";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../../redux/reducers/chat";
import { getOrSaveFromLocalStorage } from "../../../lib/features";
import DeleteChatMenu from "../../dialogs/DeleteChatMenu";

//This is the high order component which means it has a function
// which takes a component and returns a new component with modified or enhanced functionality
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const socket = getSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    userErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromLocalStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(SetIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteOptionAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatPerson
              w="50vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}

        <Grid2 container height={"100vh"}>
          <Grid2
            item="true"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            sm={2}
            md={2}
            lg={1}
            height={"100%"}
          >
            <Sidebar />
          </Grid2>
          <Grid2
            item="true"
            sm={2}
            md={2}
            lg={2.5}
            sx={{
              overflowX: "hidden",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            height={"100%"}
            bgcolor={"#B2BAF8"}
            overflow={"auto"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatPerson
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid2>
          <Grid2 item="true" xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <Box
              sx={{
                display: { xs: "block  ", sm: "none" },
              }}
            >
              <MobileBar />
            </Box>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid2>
          <Grid2
            item="true"
            md={3}
            lg={2.5}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "#B2BAF8",
            }}
          >
            <Profile user={user} />
          </Grid2>
        </Grid2>
      </>
    );
  };
};

export default AppLayout;
