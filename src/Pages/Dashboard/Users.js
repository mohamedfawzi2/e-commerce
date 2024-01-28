import React from "react";
import { useEffect } from "react";
import { USERS, baseUrl } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import Logout from "../Auth/Logout";

const Users = () => {
  const cookie = Cookie();
  useEffect(() => {
    axios
      .get(`${baseUrl}/${USERS}`, {
        headers: {
          Authorization: "Bearer " + cookie.get("e-commerce"),
        },
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <Logout/>
    </div>
  );
};

export default Users;
