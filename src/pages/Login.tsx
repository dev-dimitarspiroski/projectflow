import { useRef, useState, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import btn from "../styles/button.module.css";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setError("");

    const email = emailRef.current?.value || "";

    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input ref={emailRef} type="email" placeholder="Email" required />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p>{error}</p>}

      <button className={`${btn.btn} ${btn.primary}`} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
