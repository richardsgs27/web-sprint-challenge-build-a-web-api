const express = require("express");
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const actionRouter = require("./actions/actions-router")
const projectRouter = require("./projects/projects-router")

const server = express();

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan("dev"))

server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.error.stack,
    })
})
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;