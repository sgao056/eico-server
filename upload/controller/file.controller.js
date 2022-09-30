const Eico = require("../models/eico.model.js");
const saveImage = require("../middleware/uploadImage");
const saveVideo = require("../middleware/uploadVideo");
const fs = require("fs");

const getFile = (req, res) => {
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

const getListFiles = (req, res) => {
  Eico.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eico."
      });
    else res.send(data);
  });
};

const uploadImage = async (req, res) => {
  try {
    const time = Date.now();
    req.uniqueDate = time;
    await saveImage(req, res);
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const eico = new Eico({
      postId: req.body.postId,
      name: `${time}.jpg`
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


  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 5MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const uploadVideo = async (req, res) => {
  try {
    const time = Date.now();
    req.uniqueDate = time;
    await saveVideo(req, res);
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const eico = new Eico({
      postId: req.body.postId,
      name: `${time}.mp4`
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


  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 5MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const removeById = (req, res) => {
  let finder = {}
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
    } 
    else{
      console.log(data)
      const fileName = data.name;
      const directoryPath = __basedir + "/upload/media/";
      fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not delete the file. " + err,
          });
        }

        res.status(200).send({
          message: "File is deleted.",
        });
      });
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
  });
};

const removeByBlog = (req, res) => {
  let finder = {}
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
    } 
    else{
      console.log(data)
      const fileName = data.name;
      const directoryPath = __basedir + "/upload/media/";
      fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not delete the file. " + err,
          });
        }

        res.status(200).send({
          message: "File is deleted.",
        });
      });
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
  });
};


module.exports = {
  uploadImage,
  uploadVideo,
  getListFiles,
  getFile,
  removeById,
  removeByBlog
};
