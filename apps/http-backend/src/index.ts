import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
const app = express();

app.post("/signup", (req, res) => {
  //db call
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs"
    })
  }

  res.json({
    userId: "123"
  })

});
app.post("/signin", (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs"
    })
  }


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
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.json({
      message: "Incorrect Inputs"
    })
  }



  res.json({
    roomId: 123
  })

});



app.listen(3001);
