const sql = require("./db.js");

// constructor
const Eico = function(eico) {
  this.wallet = eico.wallet;
  this.email = eico.email;
  this.resource = eico.resource;
  this.holdingNumbers = eico.holdingNumbers;
  this.claimed = eico.claimed;
};

Eico.findById = (id, result) => {
  sql.query(`SELECT * FROM HOLDERS WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found holder: ", res[0]);
      result(null, {...res[0],claimed:res[0].claimed===1?true:false});
      return;
    }

    // not found Eico with the id
    result({ kind: "not_found" }, null);
  });
};

Eico.getAll = (title, result) => {
  let query = "SELECT * FROM HOLDERS";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("holders: ", res);
    res.forEach(item=>{
      item.claimed = item.claimed === 1 ? true : false
    })
    result(null,res);
  });
};


Eico.create = (newEico, result) => {
  sql.query("INSERT INTO HOLDERS SET ?",newEico, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created holder: ",newEico);
    result(null, newEico);
  });
};

Eico.updateById = (id, eico, result) => {
  sql.query(
    "UPDATE HOLDERS SET wallet = ?, email = ?, resource = ?, holdingNumbers = ?, claimed = ? WHERE id = ?",
    [eico.wallet, eico.email, eico.resource, eico.holdingNumbers, eico.claimed, id],
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

      console.log("updated holder: ", { id: id, ...eico });
      result(null, { id: id, ...eico });
    }
  );
};

Eico.remove = (id, result) => {
  sql.query("DELETE FROM HOLDERS WHERE id = ?", id, (err, res) => {
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
  sql.query("DELETE FROM HOLDERS", (err, res) => {
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
