import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
