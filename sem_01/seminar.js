const http = require("http");

const server = http.createServer((req, res) => {
  //   function counter() {
  //     document.addEventListener("DOMContentLoaded", () => {
  //       let count = Number(localStorage.count);
  //       localStorage.count = ++count;
  //       console.log(count);
  //     });
  //   }

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`
    <h1 class="title">Корневая страница</h1>
    <p class="text">Просмотров: </p>  
    <a class="link" href="/about">About</a>
    `);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`
    <h1 class="title">Страница about</h1>
    <p class="text">Просмотров: </p>
    <a class="link" href="/">На главную</a>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
    res.end(`
    <h1 class="title">Страница не найдена</h1>
    `);
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
