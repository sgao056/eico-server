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
  sql.query("INSERT INTO POSTS SET ?",newEico, (err, res) => {
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
      result(null,{...res[0],pined:res[0].pined===1?true:false});
      return;
    }

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
    res.forEach(item=>{
      item.pined = item.pined === 1 ? true : false
    })
    result(null,res);
  });
};

Eico.updateById = (id, eico, result) => {
  sql.query(
    "UPDATE POSTS SET delta = ?, text = ?, edited = ?, created = ?, viewed = ?, pined= ? WHERE id = ?",
    [eico.delta, eico.text, eico.edited, eico.created, eico.viewed, eico.pined, id],
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
