const sql = require("./db.js");

// constructor
const Eico = function(eico) {
  this.name = eico.name;
  this.postId = eico.postId;
}

Eico.create = (newEico, result) => {
  sql.query("INSERT INTO UPLOADS SET ?", newEico, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created upload: ", newEico);
    result(null, newEico);
  });
};

Eico.findById = (id, result) => {
  sql.query(`SELECT * FROM UPLOADS WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found upload: ", res[0]);
      result(null,res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Eico.getAll = (result) => {
  let query = "SELECT * FROM UPLOADS";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("uploads: ", res);
    result(null,res);
  });
};

Eico.updateById = (id, eico, result) => {
  sql.query(
    "UPDATE UPLOADS SET name = ?,postId = ? WHERE id = ?",
    [eico.name, eico.postId, id],
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

      console.log("updated upload: ", { id: id, ...eico });
      result(null, { id: id, ...eico });
    }
  );
};

Eico.remove = (id, result) => {
  sql.query("DELETE FROM UPLOADS WHERE id = ?", id, (err, res) => {
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

    console.log("deleted upload with id: ", id);
    result(null, res);
  });
};

Eico.removeAll = result => {
  sql.query("DELETE FROM UPLOADS", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} uploads`);
    result(null, res);
  });
};

module.exports = Eico;
