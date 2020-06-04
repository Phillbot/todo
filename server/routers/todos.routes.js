const { Router } = require("express");
const router = Router();
const pool = require("../db");

router.post("/new", async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (description, user_name) VALUES($1, $2) RETURNING *",
      [description, "Test user"]
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

router.get("/get-all", async (req, res) => {
  console.log(req.body);

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

router.get("/get-one/:id", async (req, res) => {
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

router.put("/edit-description/:id", async (req, res) => {
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

router.put("/todos-done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todoDone } = req.body;

    await pool.query(
      "UPDATE todo SET is_done = $1 WHERE id = $2 and user_name = $3",
      [todoDone, id, "Test user"]
    );

    res.json({
      ok: true,
      result: `todo ${id} was updated!`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
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

router.delete("/delete", async (req, res) => {
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

module.exports = router;
