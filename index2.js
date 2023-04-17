const express = require("express");
const app = express();
const port = 3000; // > 1000
// 80 - HTTP
// 443 - HTTPS

// Middleware - Đứng giữa request/response
app.use(express.json());

app.post("/", (request, response) => {
  response.status(400).send("Thiếu id");
});

// Nếu client vào path localhost:3000/abc thì thực thi lệnh response.send()..
// Method hay dùng của HTTP - GET/POST/PUT/PATCH/DELETE - CRUD (Create/Retrieve/Update/Delete)

const users = [
  {
    id: 1,
    name: "Nam",
    age: 20,
  },
  {
    id: 2,
    name: "Tien",
    age: 21,
  },
  {
    id: 3,
    name: "Huy",
    age: 21,
  },
];

app.get("/users", (request, response) => {
  response.send(users);
});

app.get("/users/:id", (request, response) => {
  console.log("params", request.params);
  response.send(users.filter((user) => String(user.id) === request.params.id));
});

app.post("/login", (request, response) => {
  // Request URL = /login
  // Request Body = JSON
  // Request Params = ??
  // Request Query = ??
  console.log(request.body);
  response.send("Login thành công");
});

app.post("/users", (request, response) => {
  // ??
  console.log(request.body);
  users.push(request.body);
  response.send(users);
});

// app.get()
// app.post()
// app.patch()
// app.put()
// app.delete()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
