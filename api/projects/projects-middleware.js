// add middlewares here related to projects
const Projects = require("../projects/projects-model");

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        req.existingProject = project;
        next();
      } else {
        res.status(404).json({ message: "project not found" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function validateProject(req, res, next) {
  let { name, description, completed } = req.body;
  if (
    typeof completed != "boolean" ||
    typeof name != "string" ||
    name.trim() == "" ||
    typeof description != "string" ||
    description.trim() == ""
  ) {
    res.status(400).json({ message: "missing some fields" });
    return;
  }
  req.project = {
    name: name,
    description: description,
    completed: completed,
  };
  next();
}

module.exports = {
  validateProjectId,
  validateProject
};
