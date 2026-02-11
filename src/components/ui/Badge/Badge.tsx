import styles from "./Badge.module.css";

type Variant = "todo" | "in_progress" | "done" | "default";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const cx = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const Badge = ({ children, variant = "default", className }: Props) => {
  const variantClass =
    variant === "todo"
      ? styles.todo
      : variant === "in_progress"
        ? styles.inProgress
        : variant === "done"
          ? styles.done
          : styles.default;

  return (
    <span className={cx(styles.badge, variantClass, className)}>
      {children}
    </span>
  );
};

export default Badge;
