import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const JWT_SECRET = "aonetuh23324"
app.post("/signup", (req, res) => {
  //db call

  res.json({
    userId: "123"
  })

});
app.post("/signin", (req, res) => {


  const userID = 1;
  const token = jwt.sign({
    userID
  }, JWT_SECRET);

  res.json({
    token
  })
});

app.post("/room", (req, res) => {
  //db call


  res.json({
    roomId: 123
  })

});



app.listen(3001);
