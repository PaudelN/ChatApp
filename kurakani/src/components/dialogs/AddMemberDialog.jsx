import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, userErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../styles/shared/UserItem";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement != id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  userErrors([{ isError, error }]);

  return (
    <>
      <Dialog onClose={closeHandler} open={isAddMember}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
          <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
          <Stack spacing={"1rem"}>
            {isLoading ? (
              <Skeleton />
            ) : data?.friends?.length > 0 ? (
              data?.friends?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Friends To Add</Typography>
            )}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            justifyContent={"space-evenly"}
          >
            {" "}
            <Button onClick={closeHandler} color="error">
              Cancel
            </Button>
            <Button
              onClick={addMemberSubmitHandler}
              variant="contained"
              disabled={isLoadingAddMembers}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddMemberDialog;