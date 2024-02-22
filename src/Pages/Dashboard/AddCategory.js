import { useState } from "react";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // handel submit
  async function HandelSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);

    form.append("image", image);

    try {
      const res = await Axios.post(`${Cat}/add`, form);
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
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput2"
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
            required
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
        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Add
        </button>
      </Form>
    </>
  );
}
