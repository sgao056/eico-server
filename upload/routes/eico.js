const express = require('express')
const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  const eico = require("../controllers/eico.controller.js");
  var router = require("express").Router();

  router.post('/upload', (req, res) => {
    const busboy = Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(filename)
      const saveTo = path.join(__dirname, 'media', filename.filename);
      file.pipe(fs.createWriteStream(saveTo));
    });
  
    busboy.on('finish', function () {
      res.send("Upload successfully!");
    });
  
    return req.pipe(busboy);
  });

  router.get('/upload', (req, res) => {
    const image = app.use('/img', express.static(__dirname + '/media/blog1.jpg'));
    console.log(image)
  });

  // router.get("/upload/:id", eico.findOne);

  app.use('/api/eico', router);
};