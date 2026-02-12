import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../consts/regex.const";
import { useLoginMutation } from "../../features/auth/auth.mutations";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import styles from "./Login.module.css";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login, state } = useAuth();
  const loginMutation = useLoginMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [state.isAuthenticated, navigate]);

  const onFormSubmit = async (data: LoginForm): Promise<void> => {
    setServerError(null);

    loginMutation.mutate(data, {
      onSuccess: (user) => {
        login(user);
        navigate("/dashboard");
      },
      onError: (error) =>
        error instanceof Error
          ? setServerError(error.message)
          : setServerError("An unknown error occurred"),
    });
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Welcome back — sign in to continue.</p>
        </div>

        <div className={styles.form}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoFocus
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Enter a valid email",
              },
            })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            error={errors.password?.message}
          />

          {serverError && <div className={styles.errorBox}>{serverError}</div>}

          <div className={styles.actions}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
