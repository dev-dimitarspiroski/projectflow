import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../services/api";
import { Endpoints } from "../../enums/endpoints.enum";
import { User } from "../../interfaces/api.interface";

export const useUsersQuery = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => apiFetch(Endpoints.users),
  });
};
