const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = [];
app.post("/register", async (req, res) => {
  const { name, email, passwd } = req.body;
  if (!email || !name || !passwd) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.passwd, 10);
    users.push({
      id: new Date().toString(),
      name: req.body.name,
      email: req.body.email,
      passwd: hashedPassword,
    });
    const length = users.length;
    res.status(200).json({ user: users[length - 1] });
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log(`server is connected on port ${PORT}`);
});
