import { makeStyles, Theme, createStyles, fade } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helloMsg: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(6),
    },

    fullWidth: {
      width: "100%",
    },

    todoInputMarginBottom: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(8),
    },

    todoList: {
      maxHeight: "60vh",
      overflowY: "auto",
      overflowX: "hidden",
      marginBottom: theme.spacing(5),
    },

    easyMrg: {
      marginBottom: theme.spacing(1),
    },

    "@global": {
      "*::-webkit-scrollbar": {
        width: "0.3em",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "#3f51b5",
        outline: "1px solid slategrey",
      },
    },
    search: {
      position: "relative",
      marginBottom: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.light, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.primary.light, 0.25),
      },
      marginLeft: 0,
      paddingTop: theme.spacing(0.4),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "26ch",
        "&:focus": {
          width: "42ch",
        },
      },
    },

    doneTodo: {
      textDecoration: "line-through",
    },
  })
);
