import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { Navigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Cookie from "cookie-universal";

function Topbar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  async function handelLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-bar ">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5 ">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handelLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
