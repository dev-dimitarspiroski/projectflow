import { forwardRef } from "react";
import styles from "./Checkbox.module.css";
import { classCombiner } from "../../../utility/classCombiner";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div>
        <label className={styles.row} htmlFor={inputId}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={classCombiner(styles.checkbox, className)}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          />
          <span className={styles.labelText}>{label}</span>
        </label>

        {error && (
          <p className={styles.error} id={`${inputId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default Checkbox;
