import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { baseUrl, LOGIN } from "../../Api/Api";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const cookie = Cookie();
  //ref
  const focus = useRef();

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
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : "writer";
      cookie.set("e-commerce", token);

      window.location.pathname = `/dashboard/${go}`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
      } else {
        setErr("internal server err");
      }
    }
  }
  // handle foucs
  useEffect(() => {
    focus.current.focus();
  }, []);
  return (
    <>
      {loading && <Loading />}

      <div className="container">
        <div className="row " style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handelSubmit}>
            <div className="custom-form ">
              <h1 className="mb-5">Login</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handelChange}
                  placeholder="Enter Your Email.."
                  required
                />

                <Form.Label>Email:</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handelChange}
                  placeholder="Enter Your Password.."
                  minLength={6}
                  required
                />

                <Form.Label>Password:</Form.Label>
              </Form.Group>
            </div>

            <button className="btn btn-primary">Login</button>
            <div className="google-btn">
              <a href={`http://127.0.0.1:8000/login-google`}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/768px-Google_Chrome_icon_%28September_2014%29.svg.png"
                    alt="sign in with google"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </a>
            </div>
            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
