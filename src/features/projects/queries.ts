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

export const useTasksQuery = (projectId: number | null) => {
  return useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: () => apiFetch(`${Endpoints.tasks}?projectId=${projectId}`),
    enabled: !!projectId,
  });
};
