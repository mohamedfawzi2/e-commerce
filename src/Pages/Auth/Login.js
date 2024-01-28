import React, { useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { baseUrl, LOGIN } from "../../Api/Api";
import Cookie from "cookie-universal";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const cookie = Cookie();

  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-comm", token);

      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
      } else {
        setErr("internal server err");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}

      <div className="container">
        <div className="row h-100 ">
          <form className="form" onSubmit={handelSubmit}>
            <div className="custom-form ">
              <div className="form-control">
                <h1>Login</h1>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handelChange}
                  placeholder="Enter Your Email.."
                  required
                />
                <label htmlFor="email">Email:</label>
              </div>
            </div>
            <div className="custom-form">
              <div className="form-control">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handelChange}
                  placeholder="Enter Your Password.."
                  minLength={6}
                  required
                />
                <label htmlFor="password">Password:</label>
              </div>
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
