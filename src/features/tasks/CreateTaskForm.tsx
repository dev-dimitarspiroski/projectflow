import { useForm } from "react-hook-form";
import { Endpoints } from "../../enums/endpoints.enum";
import { BASE_URL } from "../../consts/api.const";
import { useState } from "react";
import { Task } from "../../interfaces/api.interface";

interface CreateTaskFormValues {
  title: string;
}

interface Props {
  projectId: number;
  onCreated: (createdTask: Task) => void;
}

const CreateTaskForm = ({ projectId, onCreated }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmitForm = async (data: CreateTaskFormValues) => {
    const createdTask = await fetch(`${BASE_URL}${Endpoints.tasks}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        projectId,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .catch((err) => setError("Failed to create task."));

    reset();
    onCreated(createdTask);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <input
        {...register("title", { required: "Title is required" })}
        placeholder="New task"
      />
      {errors.title && <p>{errors.title.message}</p>}

      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTaskForm;
