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
      ownerId: string | null;
      createdBy: string | null;
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      projectId: number;
      title: string;
      status: TaskStatus;
      ownerId?: string | null;
    }) => {
      const res = await fetch(`${BASE_URL}/tasks/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          status: data.status,
          ownerId: data.ownerId,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
