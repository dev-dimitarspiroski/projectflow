import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateTaskMutation } from "../../task.mutations";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";

interface CreateTaskFormValues {
  title: string;
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
  } = useForm<CreateTaskFormValues>();
  const [error, setError] = useState<string | null>(null);
  const createTask = useCreateTaskMutation();

  const onSubmitForm = async (data: CreateTaskFormValues) => {
    createTask.mutate(
      { title: data.title, projectId },
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
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
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
