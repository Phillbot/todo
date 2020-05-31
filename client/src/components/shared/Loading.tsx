import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

export const SimpleBlueCircleLoadMiddle = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: "65vh" }}
    >
      <CircularProgress size={50} />
    </Grid>
  );
};