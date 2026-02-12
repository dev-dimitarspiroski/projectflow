import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import styles from "../Login/Login.module.css";
import { useRegisterMutation } from "../../features/auth/auth.mutations";
import { useState } from "react";
import { PASSWORD_REGEX } from "../../consts/regex.const";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onFormSubmit = async (data: RegisterForm): Promise<void> => {
    setServerError("");

    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => navigate("/login"),
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Registration failed";
          setServerError(message);
        },
      },
    );
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register</h1>
          <p className={styles.subtitle}>
            Welcome to ProjectFlow — sign up to get started.
          </p>
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
                value: PASSWORD_REGEX,
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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />

          {serverError && <div className={styles.errorBox}>{serverError}</div>}

          <div className={styles.actions}>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting || registerMutation.isPending}
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
