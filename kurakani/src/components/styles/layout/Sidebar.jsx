import {
  AddOutlined as Add,
  SmartToyOutlined as AiRobot,
  ChatBubbleOutlineOutlined as Chat,
  DashboardOutlined as Dashboard,
  PeopleAltOutlined as Group,
  LogoutSharp as Logout,
  Notifications as Notification,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, lazy } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { darkBlue } from "../../../constants/color";
import { server } from "../../../constants/config";
import { userNotExists } from "../../../redux/reducers/auth";
import { resetNotificationCount } from "../../../redux/reducers/chat";
import { setIsNewGroup, setIsNotification } from "../../../redux/reducers/misc";

const NotificationDialog = lazy(() => import("../../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../../specific/NewGroup"));

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isNotification, isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
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
      <Box sx={{ flexGrow: 1 }} maxWidth="240px" maxHeight={"100vh"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: darkBlue,
            border: "1px solid blue",
            height: "100vh",
          }}
        >
          <Toolbar>
            <Box
              display={"grid"}
              gridTemplateColumns={"2fr"}
              position={"relative"}
              right={"1rem"}
              gap={"1rem"}
            >
              {/* <Box
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <IconButton color="inherit" onClick={handleMobile}>
                  <MenuIcon />
                </IconButton>
              </Box> */}
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
                value={notificationCount}
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

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        size="large"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        color="inherit"
        onClick={onClick}
      >
        {value ? (
          <Badge badgeContent={value} color="error">
            {" "}
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Sidebar;
