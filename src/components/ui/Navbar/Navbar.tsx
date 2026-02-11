import { Link, NavLink } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../../../assets/logo.svg";

type NavItem = {
  to: string;
  label: string;
};

type Props = {
  mode: "public" | "private";
  userEmail?: string | null;
  onLogout?: () => void;
  leftItems?: NavItem[];
};

const defaultPublicItems: NavItem[] = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

const defaultPrivateItems: NavItem[] = [
  { to: "/", label: "Dashboard" },
  { to: "/projects", label: "Projects" },
];

const Navbar = ({ mode, userEmail, onLogout, leftItems }: Props) => {
  const items =
    leftItems ??
    (mode === "private" ? defaultPrivateItems : defaultPublicItems);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link to={mode === "private" ? "/" : "/login"} className={styles.brand}>
          <img src={Logo} alt="ProjectFlow logo" />
          <span>ProjectFlow</span>
        </Link>

        <div className={styles.links}>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ""}`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.right}>
          {mode === "private" && (
            <>
              <span className={styles.user} title={userEmail ?? ""}>
                {userEmail}
              </span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
