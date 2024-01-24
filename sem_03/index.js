const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// const counterPage = {
//   home: counterHome,
//   about: counterAbout,
// };

// const counterPageJson = JSON.stringify(counterPage, null, 2);
const pathToFile = path.join(__dirname, "counterPage.json");

const count = JSON.parse(fs.readFileSync(pathToFile));

let counterHome = count.home;
let counterAbout = count.about;

app.get("/", (req, res) => {
  ++counterHome;
  res.send(
    `
        <h1 class="title">Корневая страница</h1>
        <p class="text">Просмотров: ${counterHome}</p>  
        <a class="link" href="/about">About</a>
        `
  );
  count.home = counterHome;
  const counterPageJson = JSON.stringify(count, null, 2);
  fs.writeFileSync(pathToFile, counterPageJson);
});

app.get("/about", (req, res) => {
  ++counterAbout;
  res.send(`
  <h1 class="title">Страница about</h1>
  <p class="text">Просмотров: ${counterAbout}</p>
  <a class="link" href="/">На главную</a>
  `);
  count.about = counterAbout;
  const counterPageJson = JSON.stringify(count, null, 2);
  fs.writeFileSync(pathToFile, counterPageJson);
});

app.use(function (req, res, next) {
  res.status(404).send("Страница не найдена");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
