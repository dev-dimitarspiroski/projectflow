import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";

const PublicLayout = () => {
  return (
    <div>
      <Navbar mode="public" />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
