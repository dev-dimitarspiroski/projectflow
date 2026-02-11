import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateTaskMutation } from "../../task.mutations";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";
import { TaskStatus } from "../../task.types";
import Select from "../../../../components/ui/Select/Select";
import { STATUS_OPTIONS } from "../../../../consts/status.const";

interface CreateTaskFormValues {
  title: string;
  status: TaskStatus;
}

interface Props {
  projectId: number;
  onSuccess?: () => void;
}

const CreateTaskForm = ({ projectId, onSuccess }: Props) => {
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
    createTask.mutate(
      { title: data.title, status: data.status, projectId },
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
        isLoading={createTask.isPending}
        disabled={createTask.isPending}
      >
        Add
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateTaskForm;
