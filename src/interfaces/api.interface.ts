import { TaskStatus } from "../features/tasks/task.types";

export interface Project {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: TaskStatus;
}
