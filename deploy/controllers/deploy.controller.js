const Deploy = require("../models/deploy.model.js");

// find Deploy by id
exports.findOne = (req, res) => {
  Deploy.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Deploy with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Deploy with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Create and Save a new Deploy
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   // Create a Deploy
  const deploy = new Deploy({
    status: req.body.status,
  });

//   // Save Deploy in the database
  Deploy.create(deploy, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Deploy."
      });
    else res.send(data);
  });
};

// Update a Deploy identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Deploy.updateById(
    req.params.id,
    new Deploy(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Deploy with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Deploy with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
