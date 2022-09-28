const Eico = require("../models/eico.model.js");

const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

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

  // const directoryPath = __basedir + "/upload/media/";

  // fs.readdir(directoryPath, function (err, files) {
  //   if (err) {
  //     res.status(500).send({
  //       message: "Unable to scan files!",
  //     });
  //   }

  //   let fileInfos = [];

  //   files.forEach((file) => {
  //     fileInfos.push({
  //       name: file,
  //       url: baseUrl + file,
  //     });
  //   });
  // res.status(200).send(fileInfos);
  // });

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

const upload = async (req, res) => {
  try {
    const date = Date.now()
    await uploadFile(req, res);

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const eico = new Eico({
      postId: req.body.postId,
      name: req.file.originalname
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

const update = async (req, res) => {
  try {
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
  }
  catch(err){

  }
}

// const download = (req, res) => {
//   const fileName = req.params.name;
//   const directoryPath = __basedir + "/upload/media/";

//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };

const remove = (req, res) => {
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
  upload,
  getListFiles,
  getFile,
  // download,
  remove,
  update
};
