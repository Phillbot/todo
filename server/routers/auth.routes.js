const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "email is not valid").isEmail(),
    check("password", "min length 6").isLength({ min: 6 }),
    check("userName", "min length 2").isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = await validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok: false,
          result: errors.array(),
        });
      }

      const { email, password, userName } = req.body;
      const emailsInDB = await pool.query("SELECT email FROM users");

      const emailArray = await emailsInDB.rows.map(({ email }) => {
        return email;
      });

      if (emailArray.includes(email)) {
        return res.status(400).json({
          ok: false,
          result: `user ${email} already exists`,
        });
      }

      if (!email) email = null;

      const hashPassword = await bcrypt.hash(password, 12);

      await pool.query(
        "INSERT INTO users (email, pass, user_name) VALUES($1, $2, $3)",
        [email, hashPassword, userName]
      );

      res.status(201).json({ ok: true, result: "user create" });
    } catch (error) {
      res.status(500).json({ ok: false, result: "error" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "email is not valid").isEmail(),
    check("password", "min length 6").exists(),
  ],
  async (req, res) => {
    try {
      const errors = await validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok: false,
          result: errors.array(),
        });
      }

      const { email, password } = req.body;

      const emailsInDB = await pool.query("SELECT email FROM users");

      const emailArray = await emailsInDB.rows.map(({ email }) => {
        return email;
      });

      if (!emailArray.includes(email)) {
        return res.status(400).json({
          ok: false,
          result: `Password or login is not correct`,
        });
      }

      const passInDB = await pool.query(
        "SELECT pass FROM users where email = $1",
        [email]
      );

      const userPassFromDb = passInDB.rows[0].pass;

      const isMatch = await bcrypt.compare(password, userPassFromDb);

      if (!isMatch) {
        return res.status(400).json({
          ok: false,
          result: `Password or login is not correct`,
        });
      }

      const userNameFromBD = await pool.query(
        "SELECT user_name FROM users where email = $1",
        [email]
      );

      const userName = userNameFromBD.rows[0].user_name;

      const token = jwt.sign({ email }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ ok: true, result: { token, userName, email } });
    } catch (error) {
      res.status(500).json({ ok: false, result: "error" });
    }
  }
);

module.exports = router;
