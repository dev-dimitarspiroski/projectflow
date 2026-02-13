import { forwardRef } from "react";
import styles from "./Select.module.css";
import { classCombiner } from "../../../utility/classCombiner";
import React from "react";

type Option = { value: string; label: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, className, id, ...rest }, ref) => {
    return (
      <label className={styles.field} htmlFor={id}>
        <span className={styles.label}>{label}</span>

        <select
          id={id ?? rest.name}
          ref={ref}
          className={classCombiner(styles.select, className)}
          {...rest}
        >
          {<option value="unassigned">{"Unassigned"}</option>}
          {options.map((opt, index) => (
            <option key={opt.value + index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p className={styles.error} id={`${id}-error`}>
            {error}
          </p>
        )}
      </label>
    );
  },
);

export default Select;
