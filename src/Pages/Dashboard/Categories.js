import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { CAT, Cat } from "../../Api/Api";
import { Link } from "react-router-dom";
import TabelShow from "../../Components/Dashboard/Tabel";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // get all Categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  const header = [
    {
      key:'title',
      name: "Title",
    },
    { key:'image',
      name: "Image",
    },
  ];
    // handle delete
    async function handleDelete(id) {
      try {
        const res = await Axios.delete(`${Cat}/${id}`);
        setCategories((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <div className=" w-100 bg-white p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>

      <TabelShow header={header} data={categories} delete={handleDelete} />
    </div>
  );
}
