const db = require("../models");
const Tutorial = db.tutorials;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
     res.status(400).send({ message: "covid status data entry" });
     return;
   }
   // Create a Tutorial
   const tutorial = new Tutorial({
     title: req.body.title,
     description: req.body.description,
     published: req.body.published ? req.body.published : false
   });
   // Save Tutorial in the database
   tutorial
     .save(tutorial)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Have some error with covid status data entry"
       });
     });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
     const title = req.query.title;
     var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
     Tutorial.find(condition)
       .then(data => {
         res.send(data);
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "get all the listed covid status of Cambodia"
         });
       });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
     const id = req.params.id;
     Tutorial.findById(id)
       .then(data => {
         if (!data)
           res.status(404).send({ message: "get the covid status of the particular id" + id });
         else res.send(data);
       })
       .catch(err => {
         res
           .status(500)
           .send({ message: "Error get the covid status of the particular id" + id });
       });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
     if (!req.body) {
          return res.status(400).send({
            message: "update covid status data based on id"
          });
        }
        const id = req.params.id;
        Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update covid status data based on id=${id}. Maybe Covid status was not found!`
              });
            } else res.send({ message: "Covid status was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error update covid status data based on id" + id
            });
          });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
     const id = req.params.id;
     Tutorial.findByIdAndRemove(id)
       .then(data => {
         if (!data) {
           res.status(404).send({
             message: `delete covid status data based on id=${id}. Maybe Covid status was not found!`
           });
         } else {
           res.send({
             message: "Covid status was deleted successfully!"
           });
         }
       })
       .catch(err => {
         res.status(500).send({
           message: "Could not delete covid status data based on id=" + id
         });
       });
};
