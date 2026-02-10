import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../consts/api.const";
import { Endpoints } from "../../enums/endpoints.enum";

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
