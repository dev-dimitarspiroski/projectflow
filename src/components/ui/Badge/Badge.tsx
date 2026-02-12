import { classCombiner } from "../../../utility/classCombiner";
import styles from "./Badge.module.css";

type Variant = "todo" | "in_progress" | "done" | "default";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

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
    <span className={classCombiner(styles.badge, variantClass, className)}>
      {children}
    </span>
  );
};

export default Badge;
