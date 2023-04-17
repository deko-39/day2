const express = require("express");
// const users = require("./user.json");

const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", (request, response) => {
  const users = fs.readFileSync("user.json");
  response.status(200).send(JSON.parse(users));
});

app.post("/users", (request, response) => {
  //B1: Đọc file
  const users = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  //B2: Lấy data từ body của request
  const data = request.body;
  //B3: Update mảng user
  users.push(data);
  //B4: Lưu lại file
  fs.writeFileSync("user.json", JSON.stringify(users));
  //B5: Gửi data mới update cho client
  response.status(200).send(users);
});

app.patch("/users/:id", (request, response) => {
  // Lấy id ở params
  const id = request.params.id;
  // Lấy body ở request
  const body = request.body;
  // Đọc file để lấy users
  let users = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  // Tìm user có id = id trong mảng users
  let data = users.find((user) => user.id === Number(id));
  data = { ...data, ...body };
  // Ghi lại vào file sau khi update
  // Xoá thằng id = 3 cũ === lấy tất cả những thằng không có id = 3
  users = users.filter((user) => user.id !== Number(id));
  // Push thằng mới vào
  users.push(data);
  // Ghi lại file
  fs.writeFileSync("user.json", JSON.stringify(users));
  // Gửi lại client
  response.status(200).send(users);
});

// BTVN
app.delete("/users/:id", (request, response) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
