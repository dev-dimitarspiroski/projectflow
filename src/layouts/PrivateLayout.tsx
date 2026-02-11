import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import btn from "../styles/button.module.css";

const PrivateLayout = () => {
  const { logout, state } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <span>Welcome {state.user?.email}</span> {" | "}
          <Link to="/">Dashboard</Link>
          {" | "}
          <Link to="/projects">Projects</Link> {" | "}
          <button className={`${btn.btn} ${btn.ghost}`} onClick={logout}>
            Logout
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
