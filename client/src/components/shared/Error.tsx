import React from "react";
import { Grid, Typography } from "@material-ui/core";

import dino from "../img/dino.jpg";

export const ErrorPage = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ marginTop: "5vh" }}
    >
      <Typography variant="h4" style={{ marginBottom: "10vh" }}>
        Произошла ошибка
      </Typography>

      <img src={dino} style={{ maxWidth: "100%" }} alt="" />
    </Grid>
  );
};
