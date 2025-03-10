import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";

import Writer from "./Pages/Dashboard/Writer";
import Err404 from "./Pages/Auth/404";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import Category from "./Pages/Dashboard/Category";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route path="auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />

        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={"1995"} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
