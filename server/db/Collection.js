"use strict";

var Q = require("q");
var MongoClient = require("mongodb").MongoClient;

class Collection {
  constructor(db, collectionName) {
    this.db = db;
    this.collection = this.db.collection(collectionName);
  }

  static get(uri, collectionName) {
    console.log("hello");
    const defer = Q.defer();

    MongoClient.connect(uri, (err, db) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(new Collection(db, collectionName));
      }
    });

    return defer.promise;
  }

  findById(id) {
    return this.collection.findOne({
      _id: id
    });
  }

  insert(doc) {
    return this.collection.insertOne(doc );
  }

  /**
   * doc._id is required, otherwise the document is inserted
   * @param doc
   * @returns {*}
   */
  update(doc) {
    if (!doc._id) {
      return this.insert(doc);
    }

    return this.collection.replaceOne({
      _id: doc._id
    }, doc, {
      upsert: false
    });
  }

  remove(id) {
    return this.collection.deleteOne({
      _id: id
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = Collection;

