const sql = require("./db.js");

const Deploy = function(deploy) {
  this.status = deploy.status;
};

Deploy.findById = (id, result) => {
  sql.query(`SELECT * FROM DEPLOY WHERE id = 1`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Deploy with the id
    result({ kind: "not_found" }, null);
  });
};

Deploy.findById = (id, result) => {
  sql.query(`SELECT * FROM DEPLOY WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Deploy with the id
    result({ kind: "not_found" }, null);
  });
};

Deploy.create = (newDeploy, result) => {
  sql.query("INSERT INTO DEPLOY SET ?",newDeploy, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, newDeploy);
  });
};

Deploy.updateById = (id, deploy, result) => {
  sql.query(
    "UPDATE DEPLOY SET status = ? WHERE id = ?",
    [deploy.status, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Deploy with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...deploy });
    }
  );
};

module.exports = Deploy;
