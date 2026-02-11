import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/layout.module.css";
import Navbar from "../components/ui/Navbar/Navbar";

const PrivateLayout = () => {
  const { logout, state } = useAuth();

  return (
    <div>
      <Navbar
        mode="private"
        userEmail={state.user?.email ?? null}
        onLogout={logout}
      />

      <main className={styles.mainLayout}>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
