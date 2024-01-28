import React from "react";
import { useEffect } from "react";
import { USERS, baseUrl } from "../../Api/Api";
import axios from "axios";

const Users = () => {
  useEffect(() => {
    axios
      .get(`${baseUrl}/${USERS}`)
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Users;
