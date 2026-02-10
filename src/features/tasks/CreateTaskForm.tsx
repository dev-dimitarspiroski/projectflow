import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateTaskMutation } from "./mutations";

interface CreateTaskFormValues {
  title: string;
}

interface Props {
  projectId: number;
}

const CreateTaskForm = ({ projectId }: Props) => {
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
        onSuccess: () => reset(),
        onError: () => setError("Failed to create task."),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <input
        {...register("title", { required: "Title is required" })}
        placeholder="New task"
      />
      {errors.title && <p>{errors.title.message}</p>}

      <button type="submit" disabled={createTask.isPending}>
        Add Task
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateTaskForm;
