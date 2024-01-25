
import React, { useState } from "react";
import axios from "axios";
import {  baseUrl ,LOGIN } from "../../Api/Api";

const Login = () => {
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
      axios.post(`${baseUrl}/${LOGIN}`, form);
      console.log("suc");
    } catch (err) {
      console.log("err");
    }
  }
  return (
    <div className="container">
      <form className="form" onSubmit={handelSubmit}>
        
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handelChange}
            placeholder="Enter Your Email.."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handelChange}
            placeholder="Enter Your Password.."
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login
