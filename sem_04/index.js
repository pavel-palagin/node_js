const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const Joi = require("joi");
const { error } = require("console");
const pathToFile = path.join(__dirname, "users.json");
let uniqueID = 1;
app.use(express.json());

const schema = Joi.object({
  firstname: Joi.string().min(1).max(30).required(),
  lastname: Joi.string().min(1).max(30).required(),
  age: Joi.number().integer().min(0).max(120).required(),
  city: Joi.string().min(2).max(30),
});

app.get("/users", (req, res) => {
  res.send(fs.readFileSync(pathToFile));
});

app.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFile));
  const user = users.find((user) => user.id === Number(req.params.id));
  user ? res.send({ user }) : res.status(404) && res.send({ user: null });
});

app.post("/users", (req, res) => {
  uniqueID += 1;
  const users = JSON.parse(fs.readFileSync(pathToFile));
  users.push({
    id: uniqueID,
    ...req.body,
  });
  fs.writeFileSync(pathToFile, JSON.stringify(users, null, 2));

  res.send({
    id: uniqueID,
  });
});

app.put("/users/:id", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = JSON.parse(fs.readFileSync(pathToFile));
  let user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.age = req.body.age;
    user.city = req.body.city;
    fs.writeFileSync(pathToFile, JSON.stringify(users, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathToFile));
  const user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    fs.writeFileSync(pathToFile, JSON.stringify(users, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.use(function (req, res, next) {
  res.status(404).send("Страница не найдена");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
