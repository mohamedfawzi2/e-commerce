import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { REGISTER, baseUrl } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(false);
  //err
  const [err, setErr] = useState("");

  //ref
  const focus = useRef();

  function handelChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/${REGISTER}`, form);
      setLoading(false);
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("email is already taken");
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
              <h1 className="mb-3-">SignUp</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handelChange}
                  placeholder="Enter Your Name.."
                  required
                />

                <Form.Label>Name:</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
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
                controlId="exampleForm.ControlInput3"
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

            <button className="btn btn-primary">Submit</button>
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
      <button className="btn btn-primary">Register</button>
      {err !== "" && <span className="error">{err}</span>}
    </>
  );
}

export default Register;
