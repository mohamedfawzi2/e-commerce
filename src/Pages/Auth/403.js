import { Link } from "react-router-dom";
import "./403.css";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitles">
        Oops , You don't have permission to access this page.
        <Link
          to={role === "1996" ? "/dashboard/writer" : "/"}
          className="d-block text-center btn btn-primary"
        >
          {role === "1996" ? "Go to Home Writer Page" : "Go to Home Page"}
        </Link>
      </div>
    </div>
  );
}
