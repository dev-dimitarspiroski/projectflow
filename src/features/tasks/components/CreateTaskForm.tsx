import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateTaskMutation } from "../task.mutations";
import btn from "../../../styles/button.module.css";

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
      <input
        {...register("title", { required: "Title is required" })}
        placeholder="New task"
      />
      {errors.title && <p>{errors.title.message}</p>}

      <button
        className={`${btn.btn} ${btn.primary}`}
        type="submit"
        disabled={createTask.isPending}
      >
        Add
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateTaskForm;
