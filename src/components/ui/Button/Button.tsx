import { forwardRef } from "react";
import styles from "./Button.module.css";
import { classCombiner } from "../../../utility/classCombiner";

type Variant = "primary" | "ghost" | "default";
type Size = "md" | "sm";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "default",
      size = "md",
      isLoading = false,
      className,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    const variantClass =
      variant === "primary"
        ? styles.primary
        : variant === "ghost"
          ? styles.ghost
          : undefined;

    const sizeClass = size === "sm" ? styles.small : undefined;

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={classCombiner(
          styles.btn,
          variantClass,
          sizeClass,
          isDisabled && styles.disabled,
          className,
        )}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

export default Button;
