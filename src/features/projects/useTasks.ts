import { useEffect, useState } from "react";
import { Task } from "../../types/api";
import { apiFetch } from "../../services/api";
import { Endpoints } from "../../enums/endpoints.enum";

export const useTasks = (projectId: number | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    setIsLoading(true);

    apiFetch<Task[]>(`${Endpoints.tasks}?projectId=${projectId}`)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks."))
      .finally(() => setIsLoading(false));
  }, [projectId]);

  return { tasks, isLoading, error };
};
