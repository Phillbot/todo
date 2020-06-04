import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import {
  Grid,
  IconButton,
  Typography,
  InputBase,
  Paper,
  Container,
} from "@material-ui/core";
import { api } from "../../../api";
import { getRequest } from "../../functions/api-calls";
import { useStyles } from "../../App/style";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "@material-ui/core";
import { deleteRequest, putRequest } from "../../functions/api-calls";
import { searchTodos } from "../../functions/search";
import { SimpleBlueCircleLoadMiddle } from "../../shared/Loading";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import Swal from "sweetalert2";

import universalAction from "../../../actions/universal-action";
import { ErrorPage } from "../../shared/Error";

export const ListTodo = () => {
  const classes = useStyles();
  const todoReducer = useSelector((state: any) => state.todoReducer.todoReq);

  const dispatch = useDispatch();

  const [debounceInputValue, setDebounceInputValue] = useState("");
  const [filterTodos, getfilterTodos] = useState([]);

  const [res, getRes] = useState({
    todos: [],
    isLoaded: false,
    error: false,
  });

  const {
    baseUrl,
    get: { getAllTodos },
    delete: { deleteTodo },
    put: { editTodo, editItsDone },
  } = api;

  const { todos, isLoaded, error } = res;

  useEffect(() => {
    let isSubscribed = true;

    getRequest(`${baseUrl}${getAllTodos}`).then((res) => {
      const { result, error } = res;

      if (isSubscribed) {
        getRes({
          todos: result || [],
          isLoaded: true,
          error,
        });
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [baseUrl, getAllTodos, todoReducer]);

  const deleteTodoReq = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#303f9f",
      cancelButtonColor: "#f50057",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        const deleteIT = async () => {
          await deleteRequest(`${baseUrl}${deleteTodo}${id}`);
          await dispatch(universalAction("UPDATE"));
        };
        deleteIT();
      }
    });
  };

  const editTodoReq = async (id: string, description: string) => {
    Swal.fire({
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        maxLength: "80",
      },
      inputValue: description,
      showCancelButton: true,
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
      confirmButtonColor: "#303f9f",
      cancelButtonColor: "#f50057",

      preConfirm: (newDesc: string) => {
        if (newDesc.trim().length > 0) {
          const putIT = async () => {
            await putRequest(`${baseUrl}${editTodo}${id}`, false, {
              description: newDesc,
            });
            await dispatch(universalAction("UPDATE"));
          };
          putIT();
        } else {
          return false;
        }
      },
    });
  };

  const changeDoneState = async (id: string, itsdone: Boolean) => {
    await putRequest(`${baseUrl}${editItsDone}${id}`, false, {
      todoDone: !itsdone ? true : false,
    });
    await dispatch(universalAction("UPDATE"));
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceInputValue(e.target.value);
    searchTodos(e, getfilterTodos, todos);
  };

  const allTodos = debounceInputValue.length > 1 ? filterTodos : todos;

  if (error) return <ErrorPage />;
  else if (!isLoaded) return <SimpleBlueCircleLoadMiddle />;
  else
    return (
      <Fragment>
        <Container className={classes.todoList}>
          {allTodos
            .sort((a: any, b: any) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
            .map((todo: any) => {
              const { id, description, is_done } = todo;

              const todoClsnm = is_done ? classes.doneTodo : "";

              return (
                <Paper key={id}>
                  <Grid container justify="center" className={classes.easyMrg}>
                    <Grid item lg={8} xs={6}>
                      <Typography
                        style={{ paddingTop: "12px" }}
                        className={todoClsnm}
                      >
                        {description}
                      </Typography>
                    </Grid>
                    <Grid item lg={1} xs={1} style={{ textAlign: "right" }}>
                      <Checkbox
                        color="primary"
                        checked={is_done}
                        onClick={() => changeDoneState(id, is_done)}
                      />
                    </Grid>

                    <Grid item lg={1} xs={1} style={{ textAlign: "right" }}>
                      <IconButton
                        color="primary"
                        aria-label="delete todo"
                        onClick={() => editTodoReq(id, description)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    <Grid item lg={1} xs={1}>
                      <IconButton
                        color="secondary"
                        aria-label="delete todo"
                        onClick={() => deleteTodoReq(id)}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
        </Container>

        {todos.length > 1 && (
          <Grid container justify="space-around">
            <div className={clsx(classes.search)}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                id="search"
                type="search"
                placeholder={`Search todo`}
                onChange={search}
                value={debounceInputValue}
                fullWidth={true}
              />
            </div>
          </Grid>
        )}
      </Fragment>
    );
};
