import styles from "./EditTaskForm.module.css";
import formStyles from "../../../../styles/form.module.css";
import Button from "../../../../components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { Task } from "../../../../interfaces/api.interface";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "../../task.mutations";
import Input from "../../../../components/ui/Input/Input";
import Checkbox from "../../../../components/ui/Checkbox/Checkbox";

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
        <Input
          {...register("title", { required: "Title is required" })}
          label="Title"
          placeholder="Task title"
          autoFocus
          className={formStyles.input}
          error={errors.title?.message}
        />
      </div>
      <div className={`${formStyles.formGroup} ${formStyles.checkboxGroup}`}>
        <Checkbox
          label="Completed"
          className={formStyles.input}
          type="checkbox"
          {...register("completed")}
        />

        {updateTask.isError && (
          <p className={formStyles.error}>Failed to update task.</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button variant="primary" type="submit" disabled={updateTask.isPending}>
          {updateTask.isPending ? "Saving..." : "Save"}
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={onSuccess}
          isLoading={updateTask.isPending}
          disabled={updateTask.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
