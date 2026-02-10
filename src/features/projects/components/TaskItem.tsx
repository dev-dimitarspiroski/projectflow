import React from "react";
import { Task } from "../../../interfaces/api.interface";

interface Props {
  task: Task;
  onSelect: (task: Task) => void;
}

const TaskItem = React.memo(({ task, onSelect }: Props) => {
  return (
    <li key={task.id}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onSelect(task)}
      />
      <span>{task.title}</span>
    </li>
  );
});

export default TaskItem;
