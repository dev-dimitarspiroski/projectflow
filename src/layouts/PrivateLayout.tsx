import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const PrivateLayout = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <span>Welcome {user?.email}</span> {" | "}
          <Link to="/">Dashboard</Link>
          {" | "}
          <Link to="/projects">Projects</Link> {" | "}
          <button onClick={logout}>Logout</button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
