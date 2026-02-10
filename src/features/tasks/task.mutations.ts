import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../consts/api.const";
import { Endpoints } from "../../enums/endpoints.enum";
import { Task } from "../../interfaces/api.interface";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; projectId: number }) => {
      return await fetch(`${BASE_URL}${Endpoints.tasks}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          completed: false,
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

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: number;
      projectId: number;
      title: string;
      completed: boolean;
    }) => {
      console.log(data);
      const res = await fetch(`${BASE_URL}${Endpoints.tasks}/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: data.completed,
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
