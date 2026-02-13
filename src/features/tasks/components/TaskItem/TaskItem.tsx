import React from "react";
import Button from "../../../../components/ui/Button/Button";
import { Task } from "../../../../interfaces/api.interface";
import { TaskStatus } from "../../task.types";
import StatusSelectBadge from "../../../../components/StatusSelectBadge/StatusSelectBadge";
import { useUpdateTaskMutation } from "../../task.mutations";

interface Props {
  task: Task;
  selectedProjectId: number | null;
  onEdit: (task: Task) => void;
}

const TaskItem = React.memo(({ task, selectedProjectId, onEdit }: Props) => {
  const updateTask = useUpdateTaskMutation();

  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    updateTask.mutate({
      id: task.id,
      projectId: selectedProjectId!,
      title: task.title,
      status: newStatus,
    });
  };

  return (
    <li key={task.id}>
      <span>{task.title}</span>
      <StatusSelectBadge
        id={`status-select-${task.id}`}
        value={task.status}
        disabled={updateTask.isPending}
        onChange={(newStatus) => handleStatusChange(task, newStatus)}
      />
      <Button variant="ghost" type="button" onClick={() => onEdit(task)}>
        Edit
      </Button>
    </li>
  );
});

export default TaskItem;
