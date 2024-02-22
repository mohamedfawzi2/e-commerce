import { useState, useEffect } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat, USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // id
  const {id} = useParams()

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Cat}/${id}`)
      .then((data) => {
        setTitle(data.data.name);
        setImage(data.data.email);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav("/dashboard/users/page/404", { replace: true }));
  }, []);
  // handel submit
  async function HandelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);

    form.append("image", image);
    try {
      const res = await Axios.post(`${Cat}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>

        <Form.Label>Image</Form.Label>
        <FormGroup
          className="mb-3"
          controlId="exampleForm.ControlControlInput3"
        >
          <FormControl
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          ></FormControl>
        </FormGroup>

        <button disabled={disable} className="btn btn-primary">
          Add
        </button>
      </Form>
    </>
  );
}

 
