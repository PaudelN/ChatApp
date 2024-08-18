import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { darkBlue } from "../../../constants/color";
import { transformImage } from "../../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;
  return (
    <>
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
          {...styling}
        >
          <Avatar src={transformImage(avatar)} />
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "block",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <IconButton
            size="large"
            sx={{
              color: isAdded ? "error.main" : "primary.main",
            }}
            onClick={() => handler(_id)}
            disabled={handlerIsLoading}
          >
            {isAdded ? (
              <RemoveIcon />
            ) : (
              <AddIcon
                sx={{
                  border: "1px solid ",
                  borderRadius: "50%",
                  color: "white",
                  bgcolor: darkBlue,
                }}
              />
            )}
          </IconButton>
        </Stack>
      </ListItem>
    </>
  );
};

export default memo(UserItem);
