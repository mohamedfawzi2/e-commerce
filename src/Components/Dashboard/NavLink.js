import { faPlus, faUsers,faCartPlus } from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: "1995",
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faPlus,
    role: "1995",
  },
  
  {
    name: "Writer",
    path: "/dashboard/writer",
    icon: faPlus,
    role: ["1995", "1996"],
  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faCartPlus ,
    role: ["1995", "1999"],
  },
  {
    name: "Add Category",
    path: "/dashboard/category/add",
    icon: faPlus,
    role: ["1995", "1996"],
  },
];
