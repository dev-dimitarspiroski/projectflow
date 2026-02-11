import { useForm } from "react-hook-form";
import { Task } from "../../../interfaces/api.interface";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "../task.mutations";
import btn from "../../../styles/button.module.css";
import styles from "./EditTaskForm.module.css";
import formStyles from "../../../styles/form.module.css";

type FormValues = {
  title: string;
  completed: boolean;
};

type Props = {
  task: Task;
  selectedProjectId: number;
  onSuccess: () => void;
};

const EditTaskForm = ({ task, selectedProjectId, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      completed: task.completed,
    },
  });

  useEffect(() => {
    reset({ title: task.title, completed: task.completed });
  }, [task.id, task.title, task.completed, reset]);

  const updateTask = useUpdateTaskMutation();

  const onSubmitForm = (data: FormValues) => {
    updateTask.mutate(
      {
        id: task.id,
        projectId: selectedProjectId,
        title: data.title,
        completed: data.completed,
      },
      {
        onSuccess: () => onSuccess(),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={formStyles.formGroup}>
        <label className={formStyles.label}>Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Task title"
          autoFocus
          className={formStyles.input}
        />
        {errors.title && (
          <p className={formStyles.error}>{errors.title.message}</p>
        )}
      </div>
      <div className={`${formStyles.formGroup} ${formStyles.checkboxGroup}`}>
        <label className={formStyles.label}>Completed</label>
        <input
          className={formStyles.input}
          type="checkbox"
          {...register("completed")}
        />

        {updateTask.isError && (
          <p className={formStyles.error}>Failed to update task.</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={`${btn.btn} ${btn.primary}`}
          type="submit"
          disabled={updateTask.isPending}
        >
          {updateTask.isPending ? "Saving..." : "Save"}
        </button>

        <button
          className={`${btn.btn} ${btn.ghost}`}
          type="button"
          onClick={onSuccess}
          disabled={updateTask.isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
