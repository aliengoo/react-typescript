"use strict";

var config = require("../config");

var router = require("express").Router();
var Collection = require("../db/Collection");

var errorHandler = res => {
  return err => {
    res.status(500).send({
      err
    });
  };
};

var finallyHandler = collection => {
  return () => {
    collection.close();
  }
};

router.get("/movie/:id", (req, res) => {
  Collection.get(config.db.url, "movies").then((movies) => {
    return movies.findById(req.params.id)
      .then(movie => res.send(movie))
      .catch(errorHandler(res))
      .finally(finallyHandler(movies));
  });
});

router.post("/movie", (req, res) => {
  Collection.get(config.db.url, "movies").then((movies) => {
    return movies.insert(req.body)
      .then(result => res.send(req.body))
      .catch(errorHandler(res))
      .finally(finallyHandler(movies));
  });
});

router.put("/movie", (req, res) => {
  Collection.get(config.db.url, "movies").then((movies) => {
    return movies.update(req.body)
      .then(movie => res.send(movie))
      .catch(errorHandler(res))
      .finally(finallyHandler(movies));
  });
});

router.delete("/movie/:id", (req, res) => {
  Collection.get(config.db.url, "movies").then((movies) => {
    return movies.remove(req.params.id)
      .then(movie => res.send({ok: true}))
      .catch(errorHandler(res))
      .finally(finallyHandler(movies));
  });
});

module.exports = router;