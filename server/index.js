require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.post("/todos/new", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json({
      ok: true,
      result: newTodo.rows[0],
    });
  } catch (error) {
    res.json({
      ok: false,
      result: [],
    });
    console.log(error.message);
  }
});

app.get("/", async (req, res) => {
  res.send(`APP v.${process.env.APP_V}`);
});

app.get("/todos/get-all", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json({
      ok: true,
      result: allTodos.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      result: [],
    });
    console.log(error.message);
  }
});

app.get("/todos/get-one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json({
      ok: true,
      result: todo.rows[0] ? [todo.rows[0]] : [],
    });
  } catch (error) {
    res.json({
      ok: false,
      result: [],
    });
    console.log(error.message);
  }
});

app.put("/todos/edit-description/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [
      description,
      id,
    ]);

    res.json({
      ok: true,
      result: `todo ${id} was updated!`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/todos-done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todoDone } = req.body;

    await pool.query("UPDATE todo SET is_done = $1 WHERE id = $2", [
      todoDone,
      id,
    ]);

    res.json({
      ok: true,
      result: `todo ${id} was updated!`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todos/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM todo WHERE id = $1", [id]);

    res.json({
      ok: true,
      result: `todo ${id} was delete!`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todos/delete", async (req, res) => {
  try {
    await pool.query("TRUNCATE TABLE todo");

    res.json({
      ok: true,
      result: `All todos delete`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("server run on 5000");
});
