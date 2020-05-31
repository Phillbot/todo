import React from "react";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import { AddTodo } from "../AddTodo";
import { ListTodo } from "../ListTodo";

export const Home = () => {
  

  return (
    <Container fixed style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Helmet>
        <title>Todo</title>
      </Helmet>

      {/* 
      <Typography align="right" className={classes.helloMsg}>
        Hello, user
      </Typography> */}

      <AddTodo />
      <ListTodo />
    </Container>
  );
};
