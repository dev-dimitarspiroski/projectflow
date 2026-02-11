import { forwardRef } from "react";
import styles from "./Select.module.css";
import { classCombiner } from "../../../utility/classCombiner";
import React from "react";

type Option = { value: string; label: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  label?: string;
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, className, id, ...rest }, ref) => {
    const selectId = id ?? rest.name;

    return (
      <label className={styles.field} htmlFor={selectId}>
        <span className={styles.label}>{label}</span>

        <select
          ref={ref}
          id={selectId}
          className={classCombiner(styles.select, className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p className={styles.error} id={`${selectId}-error`}>
            {error}
          </p>
        )}
      </label>
    );
  },
);

export default Select;
