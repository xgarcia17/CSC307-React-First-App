import express from "express";
import cors from "cors";

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

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

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
  const user = addUser(userToAdd);
  if (user) res.status(201).send("Success"); // return 201 on successful POST
});

const deleteUser = (userToDelete) => {
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] !== userToDelete
  );

  return users["users_list"];
};

app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params.id;
  deleteUser(userToDelete);
  res.send();
});

const findUserByNameAndJob = (name, job) => {
  return users["users_list"]
    .filter((user) => user["name"] === name)
    .filter((user) => user["job"] === job);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});
