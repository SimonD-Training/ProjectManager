const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dotenv = require("dotenv");
const { exit } = require("process");

dotenv.config();

let database;
try {
  database = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWORD,
    database: process.env.DB,
  });
} catch (error) {
  console.log(error);
  exit(1);
}

function client_auth(req, res, next) {
  //Intended for client authentication
  next();
}

router.use(client_auth);

router.post("/get/:table/:field/*", (req, res) => {
  database.query(
    `SELECT * FROM ${req.params.table} WHERE ${req.params.field} = ${req.query.value}`,
    (err, rows) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else res.status(200).send(rows.length > 0 ? rows : null);
    }
  );
});
router.post("/get/:table", (req, res) => {
  database.query(`SELECT * FROM ${req.params.table}`, (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else res.status(200).send(rows.length > 0 ? rows : null);
  });
});

router.post("/projects", (req, res) => {
  let { title, description, start, due } = req.body;
  database.query(
    `INSERT INTO projects (project_title, project_description, project_start_dt, project_due_dt) VALUES ('${title}', '${description}', '${start}', '${due}')`,
    (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else res.status(200).send(true);
    }
  );
});

router.put("/projects", (req, res) => {
  let { id, title, description, due } = req.body;
  database.query(
    `UPDATE projects SET project_title = '${title}', project_description = '${description}', project_due_dt = '${due}' WHERE project_id = ${id}`,
    (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else res.status(200).send(true);
    }
  );
});

router.post("/notes", (req, res) => {
  let { id, note, date } = req.body;
  database.query(
    `INSERT INTO notes (project_id, notes, active_date) VALUES (${id}, '${note}', '${date.slice(0, date.length - 1)}')`,
    (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else res.status(200).send(true);
    }
  );
});

router.delete("/delete/:table/:field/*", (req, res) => {
  database.query(
    `DELETE FROM ${req.params.table} WHERE ${req.params.field} = ${req.query.value}`,
    (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else res.status(200).send(true);
    }
  );
});

module.exports = router;
