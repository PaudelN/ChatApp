import {
  AddOutlined as Add,
  SmartToyOutlined as AiRobot,
  ChatBubbleOutlineOutlined as Chat,
  DashboardOutlined as Dashboard,
  PeopleAltOutlined as Group,
  LogoutSharp as Logout,
  Menu as MenuIcon,
  Notifications as Notification,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, lazy, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { darkBlue } from "../../../constants/color";
import { server } from "../../../constants/config";
import { userNotExists } from "../../../redux/reducers/auth";
import { setIsMobile } from "../../../redux/reducers/misc";

const NotificationDialog = lazy(() => import("../../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../../specific/NewGroup"));

const MobileBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isNotification, setIsNotification] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  //Navigation Part
  const handleDashboard = () => navigate("/dashboard");
  const handleChat = () => navigate("/chat/:chatId");
  const handleAiChat = () => navigate("/aibot");
  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box
        position={"sticky"}
        top={"0"}
        sx={{
          flexGrow: 1,
          display: { xs: "block", sm: "none" },
          zIndex: 1,
          width: "100%",
          border: "1px solid blue",
        }}
      >
        <AppBar
          sx={{
            border: "1px solid blue",
            bgcolor: darkBlue,
          }}
        >
          <Toolbar>
            <Box
              display={"flex"}
              flexDirection={"row"}
              position={"relative"}
              gap={"0.2rem"}
            >
              <Box
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <IconButton color="inherit" onClick={handleMobile}>
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box
                margin={"10px"}
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                {" "}
                <Avatar
                  alt="Remy Sharp"
                  src="/src/assets/images/logo.png"
                  sx={{
                    position: "relative",

                    height: "100px",
                    width: "100px",
                    left: "0.5rem",
                  }}
                />
              </Box>

              <IconBtn
                title="Dashboard"
                icon={<Dashboard />}
                onClick={handleDashboard}
              />

              <IconBtn
                title="StartChatting"
                icon={<Chat />}
                onClick={handleChat}
              />

              <IconBtn
                title="AiChat"
                icon={<AiRobot />}
                onClick={handleAiChat}
              />
              <IconBtn
                title="Notification"
                icon={<Notification />}
                onClick={openNotification}
              />
              <IconBtn
                title="Groups"
                icon={<Group />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="New Group"
                icon={<Add />}
                onClick={openNewGroup}
              />
              <IconBtn
                title="Logout"
                icon={<Logout />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        size="small"
        sx={{
          display: { xs: "block", sm: "block" },
        }}
        color="inherit"
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default MobileBar;
