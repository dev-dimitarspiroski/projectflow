import { forwardRef } from "react";
import { classCombiner } from "../../../utility/classCombiner";
import form from "../../../styles/form.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <label className={form.field} htmlFor={inputId}>
        <span className={form.label}>{label}</span>

        <input
          ref={ref}
          id={inputId}
          className={classCombiner(form.input, className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />

        {error && (
          <p className={form.error} id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </label>
    );
  },
);

export default Input;
