import Button from "../components/ui/Button/Button";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
