import React, { useState } from "react";
import axios from "axios";
import { REGISTER, baseUrl } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // loading
  const [loading, setLoading] = useState(false);
  //err
  const [err, setErr] = useState("");
  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/${REGISTER}`, form);
      setLoading(false);
      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("email is already taken");
      } else {
        setErr("internal server err");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={handelSubmit}>
            <div className="custom-form">
              <h1>SignUp</h1>
              <div className="form-control">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handelChange}
                  placeholder="Enter Your Name.."
                  required
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-control">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handelChange}
                  placeholder="Enter Your Email.."
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-control">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handelChange}
                  placeholder="Enter Your Password.."
                  required
                  minLength={6}
                />
                <label htmlFor="password">Password</label>
              </div>
              <button className="btn btn-primary">Register</button>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
