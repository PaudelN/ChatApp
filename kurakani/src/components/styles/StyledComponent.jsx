import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { darkBlue } from "../../constants/color";

export const VisuallyHiddenInput = styled("input")({
  border: 10,
  clip: "rect(0000)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: darkBlue,
  padding: "0.5rem",
});

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "0.5px solid gray",
  padding: "0 3rem",
  borderRadius: "1.5rem",
});

const bounceAnimation = keyframes`
0%{transform:scale(1);}
50%{transform:scale(1.5);}
100%{transform:scale(1);}`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 2s infinite`,
}));
