import { useQuery } from "@tanstack/react-query";
import { Project, Task } from "../../interfaces/api.interface";
import { apiFetch } from "../../services/api";
import { Endpoints } from "../../enums/endpoints.enum";

export const useProjectsQuery = () => {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => apiFetch(Endpoints.projects),
  });
};

export const useAllTasksQuery = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => apiFetch(`${Endpoints.tasks}?_sort=order&_order=asc`),
  });
};

export const useOwnedTasksQuery = (ownerId: string) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", ownerId],
    queryFn: () =>
      apiFetch(`${Endpoints.tasks}?ownerId=${ownerId}&_sort=-order`),
  });
};

export const useTasksPerProjectQuery = (projectId: number | null) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const allTasks = await apiFetch<Task[]>(
        `${Endpoints.tasks}?_sort=-order`,
      );

      return allTasks.filter(
        (task) => String(task.projectId) === String(projectId),
      );
    },
    enabled: !!projectId,
  });
};

export const useOwnedTasksPerProjectQuery = (
  projectId: number | null,
  ownerId: string | null,
) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", projectId, ownerId],
    queryFn: async () => {
      const allTasks = await apiFetch<Task[]>(
        `${Endpoints.tasks}?_sort=-order`,
      );

      return allTasks.filter(
        (task) =>
          String(task.projectId) === String(projectId) &&
          String(task.ownerId) === String(ownerId),
      );
    },
    enabled: !!projectId && !!ownerId,
  });
};
