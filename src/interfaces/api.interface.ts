import { TaskStatus } from "../features/tasks/task.types";

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

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
