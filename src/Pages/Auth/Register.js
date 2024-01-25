import React, { useState } from "react";
import axios from "axios";
import { REGISTER, baseUrl } from "../../Api/Api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handelSubmit(e) {
    e.preventDefault();
    try {
      axios.post(`${baseUrl}/${REGISTER}`, form);
      console.log("suc");
    } catch (err) {
      console.log("err");
    }
  }
  return (
    <div className="container">
      <div className="row h-100">
        <form className="form" onSubmit={handelSubmit}>
          <div className="custom-form">
            <h1>Register</h1>
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
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
