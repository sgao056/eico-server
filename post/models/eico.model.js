const sql = require("./db.js");

// constructor
const Eico = function(eico) {
  this.delta = eico.delta;
  this.text = eico.text;
  this.created = eico.created;
  this.edited = eico.edited;
  this.pined = eico.pined;
  this.viewed = eico.viewed;
}

Eico.create = (newEico, result) => {
  sql.query(`INSERT INTO POSTS (delta, text, created, edited, viewed, pined) VALUES(${newEico.delta},${newEico.text},${newEico.created},${newEico.edited},${newEico.viewed},${newEico.pined})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created post: ",newEico);
    result(null, newEico);
  });
};

Eico.findById = (id, result) => {
  sql.query(`SELECT * FROM POSTS WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post: ", res[0]);
      result(null,res[0]);
      return;
    }

    // not found Eico with the id
    result({ kind: "not_found" }, null);
  });
};

Eico.getAll = (title, result) => {
  let query = "SELECT * FROM POSTS";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};

Eico.updateById = (id, eico, result) => {
  sql.query(
    `UPDATE POSTS SET delta = ${eico.delta}, text = ${eico.text}, created = ${eico.created}, edited = ${eico.edited}, pined = ${eico.pined}, viewed = ${eico.viewed} WHERE id = ${id}`,
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

      console.log("updated posts: ", { id: id, ...eico });
      result(null, { id: id, ...eico });
    }
  );
};

Eico.remove = (id, result) => {
  sql.query("DELETE FROM POSTS WHERE id = ?", id, (err, res) => {
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

    console.log("deleted post with id: ", id);
    result(null, res);
  });
};

Eico.removeAll = result => {
  sql.query("DELETE FROM POSTS", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} posts`);
    result(null, res);
  });
};

module.exports = Eico;
