import {
  Delete,
  Done,
  Edit,
  GroupAddSharp,
  ReplyAllSharp,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponent";
import { LayoutLoader } from "../components/styles/layout/Loaders";
import Sidebar from "../components/styles/layout/Sidebar";
import AvatarCard from "../components/styles/shared/AvatarCard";
import UserItem from "../components/styles/shared/UserItem";
import { useAsyncMutation, userErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAddMember } = useSelector((state) => state.misc);

  //work to do
  // -------- To facilitate the sidebbar as mobilebar for mobile devices

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingremoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, SetIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);

  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  userErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const hanldeMobile = () => {
    SetIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => SetIsMobileMenuOpen(false);

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setconfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setconfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            sm: "none",
            xs: "block",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={hanldeMobile}>
          <ReplyAllSharp sx={{ color: "black" }} />
        </IconButton>
      </Box>
    </>
  );

  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"1rem"}
        padding={"3rem"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />
            <IconButton
              onClick={updateGroupNameHandler}
              disabled={isLoadingGroupName}
              sx={{
                color: "white",
                backgroundColor: "#2e3a99",
                ":hover": { backgroundColor: "#2e3a99", color: "white" },
              }}
            >
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Typography fontFamily={"monospace"} variant="h6">
              {groupName}
            </Typography>
            <IconButton
              onClick={() => setIsEdit(true)}
              disabled={isLoadingGroupName}
              sx={{
                color: "white",
                backgroundColor: "#2e3a99",
                ":hover": { backgroundColor: "#2e3a99", color: "white" },
              }}
            >
              <Edit />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const ButtonGroup = (
    <>
      <Stack
        direction={{
          sm: "row",
          xs: "column-reverse",
        }}
        spacing={"1rem"}
        p={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          variant="text"
          color="error"
          startIcon={<Delete />}
          onClick={openConfirmDeleteHandler}
        >
          Delete Group
        </Button>
        <Button
          size="large"
          variant="contained"
          startIcon={<GroupAddSharp />}
          onClick={openAddMemberHandler}
        >
          Add Member
        </Button>
      </Stack>
    </>
  );
  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <>
      {" "}
      <Stack direction={"row"} bgcolor={"white"}>
        <Sidebar />
        <Grid item={true} container height={"100vh"} overflow={"auto"}>
          <Grid
            item={true}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              bgcolor: "#B2BAF8",
            }}
            sm={4}
          >
            <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
          </Grid>
          <Grid
            item={true}
            xs={12}
            sm={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              padding: "1rem 3rem",
            }}
          >
            {IconBtns}

            {groupName && (
              <>
                {GroupName}
                <Typography alignSelf={"flex-start"} variant="h6">
                  Members
                </Typography>
                <Stack
                  maxWidth={"45rem"}
                  width={"100%"}
                  boxSizing={"border-box"}
                  padding={{
                    sm: "1rem",
                    xs: "0",
                    md: "1rem 4rem",
                  }}
                  spacing={"2rem"}
                  bgcolor={"white"}
                  height={"50vh"}
                  overflow={"auto"}
                >
                  {/* {Members} */}

                  {isLoadingremoveMember ? (
                    <CircularProgress />
                  ) : (
                    members?.map((i) => (
                      <UserItem
                        user={i}
                        key={i._id}
                        isAdded
                        styling={{
                          boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                          padding: "1rem 2rem",
                          borderRadius: "1rem",
                        }}
                        handler={removeMemberHandler}
                      />
                    ))
                  )}
                </Stack>
                {ButtonGroup}
              </>
            )}
          </Grid>
          {isAddMember && (
            <Suspense fallback={<Backdrop open />}>
              <AddMemberDialog chatId={chatId} />
            </Suspense>
          )}

          {confirmDeleteDialog && (
            <>
              <Suspense fallback={<Backdrop open />}>
                <ConfirmDeleteDialog
                  open={confirmDeleteDialog}
                  handleClose={closeConfirmDeleteHandler}
                  deleteHandler={deleteHandler}
                />
              </Suspense>
            </>
          )}
          <Drawer
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileClose}
          >
            <GroupsList
              myGroups={myGroups?.data?.groups}
              chatId={chatId}
              width={"50vw"}
            />
          </Drawer>
        </Grid>
      </Stack>
    </>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
