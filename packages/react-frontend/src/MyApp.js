import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters.at(index).id;
    deleteUser(id).then((res) => {
      if (res.status == 204) {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => {
            console.log(error);
          });
      } else console.log("uh oh");
    });
  }

  function deleteUser(id) {
    const promise = fetch(`Http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status == 201) {
          res.json().then((data) => {
            setCharacters([...characters, data]);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
