import express from "express";
import cors from "cors";
import services from "./Model/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = services.findUserById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
});

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };

function generateRandomID() {
  var id = "";
  var temp;
  // get first three letters
  for (var i = 0; i < 3; i++) {
    temp = Math.floor(Math.random() * 26 + 97); // range of lowercase ASCII values
    id = id.concat(String.fromCharCode(temp));
  }
  // get last three numbers
  for (var j = 0; j < 3; j++) {
    temp = Math.floor(Math.random() * 10); // range of ints 0-9
    id = id.concat(String(temp));
  }

  return id;
}

app.post("/users", (req, res) => {
  const id = generateRandomID();
  req.body["id"] = id;
  const userToAdd = req.body;
  const promise = services.addUser(userToAdd);
  promise.then((user) => {
    if (user) {
      res.status(201).send(user); // status: 201 on successful POST
    }
  });
});

const deleteUser = (userToDelete) => {
  const originalSize = users["users_list"].length;
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] !== userToDelete
  );
  if (originalSize <= users["users_list"].length) return false;
  else return true;
};

app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params.id;
  const ret = deleteUser(userToDelete);
  if (ret === true) res.status(204).send();
  else res.status(404).send("resource not found");
});

app.get("/users", (req, res) => {
  // console.log("name = ", req.query.name);
  // console.log("job = ", req.query.job);
  let promise = services.getUsers(req.query.name, req.query.job);
  promise.then((users) => {
    res.send(users);
    // console.log("users: ", users);
  });
});
