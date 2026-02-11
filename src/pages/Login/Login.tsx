import { useRef, useState, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

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

      <Input ref={emailRef} type="email" placeholder="Email" required />
      <Input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && <p>{error}</p>}

      <Button variant="primary" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Login;
