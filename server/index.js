const express = require("express");
const app = express();
const cors = require("cors");
const config = require("config");
const PORT = config.get("port");
app.use(express.json());

app.use("/api/auth", require("./routers/auth.routes"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);

app.use("/api/todos", require("./routers/todos.routes"));

app.get("/", async (req, res) => {
  res.send(`APP v.1`);
});

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
