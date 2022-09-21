const sql = require("./db.js");

// constructor
const Eico = function(eico) {
  this.title = eico.title;
  this.description = eico.description;
  this.published = eico.published;
};

Eico.create = (newEico, result) => {
  sql.query("INSERT INTO eico SET ?", newEico, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created eico: ", { id: res.insertId, ...newEico });
    result(null, { id: res.insertId, ...newEico });
  });
};

Eico.findById = (id, result) => {
  sql.query(`SELECT * FROM eico WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found eico: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Eico with the id
    result({ kind: "not_found" }, null);
  });
};

Eico.getAll = (title, result) => {
  let query = "SELECT * FROM eico";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("eico: ", res);
    result(null, res);
  });
};

Eico.getAllPublished = result => {
  sql.query("SELECT * FROM eico WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("eico: ", res);
    result(null, res);
  });
};

Eico.updateById = (id, eico, result) => {
  sql.query(
    "UPDATE eico SET title = ?, description = ?, published = ? WHERE id = ?",
    [eico.title, eico.description, eico.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Eico with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated eico: ", { id: id, ...eico });
      result(null, { id: id, ...eico });
    }
  );
};

Eico.remove = (id, result) => {
  sql.query("DELETE FROM eico WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Eico with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted eico with id: ", id);
    result(null, res);
  });
};

Eico.removeAll = result => {
  sql.query("DELETE FROM eico", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} eico`);
    result(null, res);
  });
};

module.exports = Eico;
