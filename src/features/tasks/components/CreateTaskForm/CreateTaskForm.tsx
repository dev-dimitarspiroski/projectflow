import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateTaskMutation } from "../../task.mutations";
import { Endpoints } from "../../../../enums/endpoints.enum";
import { BASE_URL } from "../../../../consts/api.const";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";
import { TaskStatus } from "../../task.types";
import type { Task } from "../../../../interfaces/api.interface";
import Select from "../../../../components/ui/Select/Select";
import { STATUS_OPTIONS } from "../../../../consts/status.const";
import { useAuth } from "../../../../hooks/useAuth";

interface CreateTaskFormValues {
  title: string;
  status: TaskStatus;
  ownerId: string | null;
  createdBy: string | null;
}

interface Props {
  projectId: number;
  onSuccess?: () => void;
}

const CreateTaskForm = ({ projectId, onSuccess }: Props) => {
  const { state } = useAuth();
  const loggedInUser = state.user?.id ?? "Unknown";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    defaultValues: { title: "", status: "todo" },
  });
  const [error, setError] = useState<string | null>(null);
  const createTask = useCreateTaskMutation();

  const onSubmitForm = async (data: CreateTaskFormValues) => {
    try {
      const res = await fetch(
        `${BASE_URL}${Endpoints.tasks}?projectId=${projectId}&_sort=-order&_limit=1`,
      );
      if (!res.ok) throw new Error("Failed to fetch last task");
      const lastTasks = (await res.json()) as Task[];
      const maxOrder = lastTasks.length > 0 ? (lastTasks[0].order ?? -1) : -1;
      const newOrder = maxOrder + 1;

      createTask.mutate(
        {
          title: data.title,
          status: data.status,
          projectId,
          ownerId: "unassigned",
          createdBy: loggedInUser,
          order: newOrder,
        },
        {
          onSuccess: () => {
            reset();

            if (onSuccess) {
              onSuccess();
            }
          },
          onError: () => setError("Failed to create task."),
        },
      );
    } catch {
      setError("Failed to determine task order.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        placeholder="New task"
        error={errors.title?.message}
        {...register("title", { required: "Title is required" })}
      />
      <Select
        id="create-task-status"
        label="Status"
        options={[...STATUS_OPTIONS]}
        error={errors.status?.message}
        {...register("status")}
      />
      <Button
        variant="primary"
        type="submit"
        isLoading={createTask.status === "pending"}
        disabled={createTask.status === "pending"}
      >
        Add
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateTaskForm;
