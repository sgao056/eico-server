const Eico = require("../models/eico.model.js");

// Create and Save a new Eico
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Eico
  const eico = new Eico({
    wallet: req.body.wallet,
    email: req.body.email,
    resource: req.body.resource,
    holdingNumbers: req.body.holdingNumbers,
    claimed: req.body.claimed,
  });

  // Save Eico in the database
  Eico.create(eico, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Eico."
      });
    else res.send(data);
  });
};

// Retrieve all Eicos from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Eico.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eico."
      });
    else res.send(data);
  });
};

// Find a single Eico by Id
exports.findOne = (req, res) => {
  Eico.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Eico with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Eico with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Eicos
exports.findAllPublished = (req, res) => {
  Eico.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eico."
      });
    else res.send(data);
  });
};

// Update a Eico identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Eico.updateById(
    req.params.id,
    new Eico(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Eico with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Eico with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Eico with the specified id in the request
exports.delete = (req, res) => {
  Eico.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Eico with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Eico with id " + req.params.id
        });
      }
    } else res.send({ message: `Eico was deleted successfully!` });
  });
};

// Delete all Eicos from the database.
exports.deleteAll = (req, res) => {
  Eico.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all eico."
      });
    else res.send({ message: `All Eicos were deleted successfully!` });
  });
};
