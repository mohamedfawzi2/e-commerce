import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // id
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);
  // handel submit
  async function HandelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
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
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
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
          </Form.Select>
        </Form.Group>

        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}

export default User;
