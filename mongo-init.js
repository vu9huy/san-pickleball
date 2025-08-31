// mongo-init.js
db = db.getSiblingDB("sanpickleball");
db.createUser({
  user: "sanpickleball",
  pwd: "sanpickleball",
  roles: [{ role: "readWrite", db: "sanpickleball" }]
});
