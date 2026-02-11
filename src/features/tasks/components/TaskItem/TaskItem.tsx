import React from "react";
import Button from "../../../../components/ui/Button/Button";
import { Task } from "../../../../interfaces/api.interface";

interface Props {
  task: Task;
  onSelect: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const TaskItem = React.memo(({ task, onSelect, onEdit }: Props) => {
  return (
    <li key={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onSelect(task)}
      />
      <span>{task.title}</span>
      <Button variant="ghost" type="button" onClick={() => onEdit(task)}>
        Edit
      </Button>
    </li>
  );
});

export default TaskItem;
