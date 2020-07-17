function test(err, req, res, next) {
  //   res.send("test from middleware ");
  console.log("Authorization the login.....");
  console.log("LOGGED");
  // res.send({ error: "Invalid category is provided" });
  next();
}

module.exports = test;
