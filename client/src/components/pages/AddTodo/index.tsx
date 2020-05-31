import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { useStyles } from "../../App/style";
import { postRequest, deleteRequest } from "../../functions/api-calls";
import { api } from "../../../api";
import { useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Swal from "sweetalert2";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import universalAction from "../../../actions/universal-action";

export const AddTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const {
    baseUrl,
    post: { postNewTodo },
    delete: { deleteTodo },
  } = api;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const addTodo = async () => {
    if (inputValue.trim().length < 1) {
      Swal.fire({
        icon: "error",
        text: "Empty todo",
      });
    } else {
      await postRequest(`${baseUrl}${postNewTodo}`, false, {
        description: inputValue.trim(),
      });
      await dispatch(universalAction("UPDATE"));
    }
  };

  const deleteAllTodos = async () => {
    Swal.fire({
      title: "Delete all todos?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#303f9f",
      cancelButtonColor: "#f50057",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        const deleteIT = async () => {
          await deleteRequest(`${baseUrl}${deleteTodo}`);
          await dispatch(universalAction("UPDATE"));
        };
        deleteIT();
      }
    });
  };
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      className={classes.todoInputMarginBottom}
    >
      <Grid item lg={8} md={6} xs={12}>
        <TextField
          id="standard-basic"
          label={"New Todo"}
          className={classes.fullWidth}
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          inputProps={{
            maxLength: 80,
          }}
        />
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={3} />

      <Grid item lg={1} md={2} xs={3}>
        <Button
          color="primary"
          aria-label="add new todo"
          variant="contained"
          onClick={addTodo}
        >
          <AddIcon />
        </Button>
      </Grid>

      <Grid item lg={1} md={2} xs={3}>
        <Button
          color="secondary"
          aria-label="delete all todos"
          variant="contained"
          onClick={deleteAllTodos}
        >
          <DeleteSweepIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
