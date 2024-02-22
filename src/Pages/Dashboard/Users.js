import { useState } from "react";
import { useEffect } from "react";
import { USER, USERS } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import TabelShow from "../../Components/Dashboard/Tabel";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");


  // get current user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // get all users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];
  // handle delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=" w-100 bg-white p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>

      <TabelShow
        header={header}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Users;
