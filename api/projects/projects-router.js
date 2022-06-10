// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { validateProjectId, validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      next({ error });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.existingProject);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.project)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      next({ error });
    });
});

router.put("/:id", validateProject, validateProjectId, (req, res, next) => {
  Projects.update(req.params.id, req.project)
    .then(() => {
      res.status(200).json(req.project);
    })
    .catch((error) => {
      next({ error });
    });
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.existingProject.id)
    .then(() => {
      res.status(200).json(req.existingProject);
    })
    .catch((error) => {
      next({ error });
    });
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then((projects) => {
        res.status(200).json(projects)
    })
    .catch((error) => {
        next({error})
    })
})


module.exports = router;
