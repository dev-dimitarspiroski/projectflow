import { useEffect, useState } from "react";
import { Project } from "../../interfaces/api.interface";
import { apiFetch } from "../../services/api";
import { Endpoints } from "../../enums/endpoints.enum";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Project[]>(Endpoints.projects)
      .then(setProjects)
      .catch(() => setError("Failed to load projects."))
      .finally(() => setIsLoading(false));
  }, []);

  return { projects, isLoading, error };
};
