import React, { useCallback, useMemo } from "react";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import Button from "../../../../components/ui/Button/Button";
import { Task } from "../../../../interfaces/api.interface";
import { TaskStatus } from "../../task.types";
import StatusSelectBadge from "../../../../components/StatusSelectBadge/StatusSelectBadge";
import { useUpdateTaskMutation } from "../../task.mutations";
import styles from "./TaskItem.module.css";
import { useUsersQuery } from "../../../users/users.queries";
import Avatar from "../../../../components/ui/Avatar/Avatar";

interface Props {
  task: Task;
  selectedProjectId: number | null;
  onEdit: (task: Task) => void;
  // optional drag-and-drop props
  dragAttributes?: DraggableAttributes;
  dragListeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
}

const TaskItemInner = (
  {
    task,
    selectedProjectId,
    onEdit,
    dragAttributes,
    dragListeners,
    style,
  }: Props,
  ref: React.ForwardedRef<HTMLLIElement>,
) => {
  const updateTask = useUpdateTaskMutation();
  const { data: users = [] } = useUsersQuery();

  const [ownerEmail, ownerSrc] = useMemo(() => {
    if (!task.ownerId) return [null, null];
    const owner = users.find((user) => user.id === task.ownerId);

    return [owner?.email ?? null, owner?.avatarSrc ?? null];
  }, [task.ownerId, users]);

  const handleStatusChange = useCallback(
    (newStatus: TaskStatus) => {
      if (!selectedProjectId) return;

      updateTask.mutate({
        id: task.id,
        projectId: selectedProjectId,
        title: task.title,
        status: newStatus,
        ownerId: task.ownerId,
      });
    },
    [selectedProjectId, task, updateTask],
  );

  const isMutating = updateTask.status === "pending";

  return (
    <li
      ref={ref}
      className={`${styles.row} ${isMutating ? styles.pending : ""}`}
      {...dragAttributes}
      {...dragListeners}
      style={style}
    >
      <div className={styles.left}>
        <div className={styles.titleRow}>
          <span
            className={styles.key}
          >{`TASK-${task.id.toLocaleUpperCase()}`}</span>
          <p className={styles.title} title={task.title}>
            {task.title}
          </p>
        </div>

        <div className={styles.meta}>
          <span className={styles.assignee}>
            <Avatar
              email={ownerEmail}
              title={ownerEmail ?? "Unassigned"}
              src={ownerSrc}
            />
            {ownerEmail ? (
              <span className={styles.assigneeText}>{ownerEmail}</span>
            ) : (
              <span className={styles.unassigned}>Unassigned</span>
            )}
          </span>
        </div>
      </div>

      <div className={styles.right}>
        <StatusSelectBadge
          id={`status-select-${task.id}`}
          value={task.status}
          disabled={isMutating}
          onChange={handleStatusChange}
        />

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => onEdit(task)}
          disabled={isMutating}
        >
          Edit
        </Button>
      </div>
    </li>
  );
};

const TaskItem = React.memo(React.forwardRef(TaskItemInner));

export default TaskItem;
