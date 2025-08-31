// mongo-init.js
db = db.getSiblingDB("sanpickleball");
db.createUser({
  user: "sanpickleball_user",
  pwd: "sanpickleball_password",
  roles: [{ role: "readWrite", db: "sanpickleball" }]
});
