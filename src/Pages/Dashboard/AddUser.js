import  { useState} from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

function AddUser  ()  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handel submit
  async function HandelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandelSubmit}>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email..."
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput4"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password..."
            required
          />
          <Form.Text className="text-muted">More Than 6 Chars</Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput3"
        >
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              SelectRoll
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option> 
          </Form.Select>
        </Form.Group>

        <button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
};

export default AddUser;
