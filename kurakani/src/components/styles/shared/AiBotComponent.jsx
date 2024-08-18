import React, { useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { Box, Typography } from "@mui/material";

const AiBotComponent = () => {
  const timeAgo = moment(Date.now()).fromNow();
  const [sameSender, setSameSender] = useState("");




  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#7C8AFA" : "#CCCCCC",
        color: sameSender ? "white" : "black",
        borderRadius: sameSender ? "10px 10px 0px 10px" : "10px 10px 10px 0px",
        padding: "0.5rem",
        width: "fit-content",
        
      }}
    >
      <Box key={""}>
        <Typography variant="body2" color="text.secondary">gasgas</Typography>
      </Box>
     
      {" "}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default AiBotComponent;
