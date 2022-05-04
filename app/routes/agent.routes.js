module.exports = app => {
    const agents = require("../controllers/agent.controller.js");

    var router = require("express").Router();
    router.post("/", agents.create);
    router.get("/", agents.findAll);
    router.get("/published", agents.findAllPublished);
    router.get("/:id", agents.findOne);
    router.put("/:id", agents.update);
    router.delete("/:id", agents.delete);
    router.delete("/", agents.deleteAll);

    app.use('/api/agents', router);
};