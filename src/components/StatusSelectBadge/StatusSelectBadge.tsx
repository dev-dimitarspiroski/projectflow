import { STATUS_OPTIONS } from "../../consts/status.const";
import { TaskStatus } from "../../features/tasks/task.types";
import { classCombiner } from "../../utility/classCombiner";
import styles from "./StatusSelectBadge.module.css";

type Props = {
  value: TaskStatus;
  onChange: (next: TaskStatus) => void;
  disabled?: boolean;
  className?: string;
};

const StatusSelectBadge = ({ value, onChange, disabled, className }: Props) => {
  const variantClass =
    value === "in_progress"
      ? styles.inProgress
      : value === "done"
        ? styles.done
        : styles.todo;

  return (
    <span className={styles.wrapper}>
      <select
        className={classCombiner(styles.select, variantClass, className)}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as TaskStatus)}
        aria-label="Task status"
      >
        {[...STATUS_OPTIONS].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className={styles.chevron} aria-hidden="true">
        ▾
      </span>
    </span>
  );
};

export default StatusSelectBadge;
