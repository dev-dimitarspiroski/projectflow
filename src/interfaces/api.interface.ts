import { TaskStatus } from "../features/tasks/task.types";

export interface User {
  id: string;
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
  id: string;
  projectId: number;
  title: string;
  status: TaskStatus;
  ownerId: string | null;
  createdBy: string;
}
