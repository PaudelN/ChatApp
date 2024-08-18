import { Skeleton, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { BouncingSkeleton } from "../StyledComponent";

export const LayoutLoader = () => {
  return (
    <>
      <Grid2 container height={"100vh"}>
        <Grid2 item="true" xs={3} sm={2} md={2} lg={1} height={"100%"}>
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid2>
        <Grid2
          item="true"
          sm={2}
          md={2}
          lg={2.5}
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          height={"100%"}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid2>
        <Grid2 item="true" xs={9} sm={8} md={5} lg={6} height={"100%"}>
          <Stack spacing={"1rem"}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={"5rem"} />
            ))}
          </Stack>
        </Grid2>
        <Grid2
          item="true"
          md={3}
          lg={2.5}
          height={"100%"}
          sx={{
            display: { xs: "none", md: "block" },
            padding: "2rem",
          }}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid2>
      </Grid2>
    </>
  );
};

export const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};
