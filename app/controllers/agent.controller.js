const db = require("../models");
const Agent = db.agents;

//Create and Save a new Agent
exports.create = (req, res) => {

    if(!req.body.AgentID || !req.body.Forename || !req.body.Surname){
        res.status(400).send({ message: "Content cannot be empty!"});
        return;
    }

    const agent = new Agent ({
        AgentID: req.body.AgentID,
        Forename: req.body.Forename,
        Surname: req.body.Surname,
        Username: req.body.Username,
        Phone: req.body.Phone
    });

    agent
      .save(agent)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Agent!"
          });
      });
};

//Retrieve all Agents from the database
exports.findAll = (req, res) => {
    const AgentID = req.query.AgentID;
    var condition = AgentID ? { AgentID: { $regex: new RegExp(AgentID), $options: "i"} } : {};

    Agent.find(condition)
         .then(data => {
             res.send(data);
         })
         .catch(err => {
             res.status(500).send({
                 message:
                   err.message || "Some error occurred while retrieving Agents!"
             });
         });
};

//Find a single Agent with an ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Agent.findById(id)
         .then(data => {
             if(!data)
               res.status(404).send({ message: "Not found Agend with id=" + id});
             else res.send(data);
         })
         .catch(err => {
             res
               .status(500)
               .send({ message: "Error retrieving Agend with id=" + id });
         });
};

//Update a Course by the id in the requres
exports.update = (req, res) => {
    if (!req.body){
        return res.status(400).send ({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Agent.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
         .then(data => {
             if(!data) {
                 res.status(404).send({
                     message: `Cannot update Agent with id=${id}. Maybe Agent was not found!`
                 });
             } else res.send({ message: "Agent was updated successfully!"});
         })
         .catch(err => {
             res.status(500).send({
                 message: "Error updating Agent with id=" + id
             });
         });
};

//Delete an Agent with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Agent.findByIdAndRemove(id)
         .then(data => {
             if(!data) {
                 res.status(404).send({
                     message: `Cannot delete Agent with id=${id}. Maybe Agent was not found!`
                 });
             }else {
                 res.send({
                     message: "Agent was deleted successfully!"
                 });
             }
         })
         .catch(err => {
             res.status(500).send({
                 message: "Could not delete Agent with id=" + id
             });
         });
};

//Delete all Agents from the database
exports.deleteAll = (req, res) => {
    Agent.deleteMany({})
         .then(data => {
             res.send({
                 message: `${data.deletedCount} Agents were deleted successfully!`
             });
         })
         .catch(err => {
             res.status(500).send({
                 message:
                    err.message || "Some error occurred while removing all Agents!"
             });
         });
};


//Find all published Agents
exports.findAllPublished = (req, res) => {
    Agent.find({ published: true})
         .then(data => {
             res.send(data);
         })
         .catch(err => {
             res.status(500).send({
                 message:
                    err.message || "Some error occurred while retrieving Agents!"
             });
         });
};


