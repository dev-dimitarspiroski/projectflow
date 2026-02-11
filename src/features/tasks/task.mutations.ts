import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../consts/api.const";
import { Endpoints } from "../../enums/endpoints.enum";
import { TaskStatus } from "./task.types";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      status: TaskStatus;
      projectId: number;
    }) => {
      return await fetch(`${BASE_URL}${Endpoints.tasks}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: data.status ?? "todo",
        }),
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: number;
      projectId: number;
      title: string;
      status: TaskStatus;
    }) => {
      const res = await fetch(`${BASE_URL}/tasks/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          status: data.status,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: number;
      projectId: number;

      status: TaskStatus;
    }) => {
      const res = await fetch(`${BASE_URL}${Endpoints.tasks}/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: data.status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to toggle task");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.projectId],
      });
    },
  });
};
