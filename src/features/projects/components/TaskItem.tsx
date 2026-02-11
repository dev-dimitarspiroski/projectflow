import React from "react";
import btn from "../../../styles/button.module.css";
import { Task } from "../../../interfaces/api.interface";

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
      <button
        className={`${btn.btn} ${btn.ghost}`}
        type="button"
        onClick={() => onEdit(task)}
      >
        Edit
      </button>
    </li>
  );
});

export default TaskItem;
