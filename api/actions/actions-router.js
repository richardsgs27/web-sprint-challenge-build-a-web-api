// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const { validateActionId, validateAction } = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      next({ error });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.existingAction);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.action)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      next({ error });
    });
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  Actions.update(req.params.id, req.action)
    .then(() => {
      res.status(200).json(req.action);
    })
    .catch((error) => {
      next({ error });
    });
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Actions.remove(req.existingAction.id)
    .then(() => {
      res.status(200).json(req.existingAction);
    })
    .catch((error) => {
      next({ error });
    });
});

module.exports = router;