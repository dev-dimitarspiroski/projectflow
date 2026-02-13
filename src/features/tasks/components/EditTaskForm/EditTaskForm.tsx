import styles from "./EditTaskForm.module.css";
import formStyles from "../../../../styles/form.module.css";
import Button from "../../../../components/ui/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { Task } from "../../../../interfaces/api.interface";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "../../task.mutations";
import Input from "../../../../components/ui/Input/Input";
import { TaskStatus } from "../../task.types";
import Select from "../../../../components/ui/Select/Select";
import { STATUS_OPTIONS } from "../../../../consts/status.const";
import { useUsersQuery } from "../../../users/users.queries";

type FormValues = {
  title: string;
  status: TaskStatus;
  ownerId: string;
};

type Props = {
  task: Task;
  selectedProjectId: number;
  onSuccess: () => void;
};

const EditTaskForm = ({ task, selectedProjectId, onSuccess }: Props) => {
  const { data: users = [] } = useUsersQuery();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      status: task.status ?? "todo",
      ownerId: task.ownerId,
    },
  });

  useEffect(() => {
    reset({
      title: task.title,
      status: task.status ?? "todo",
      ownerId: task.ownerId,
    });
  }, [task.id, task.title, task.status, task.ownerId, reset]);

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.email,
  }));

  const updateTask = useUpdateTaskMutation();

  const onSubmitForm = (data: FormValues) => {
    updateTask.mutate(
      {
        id: task.id,
        projectId: selectedProjectId,
        title: data.title,
        status: data.status,
        ownerId: data.ownerId,
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

      <div className={formStyles.formGroup}>
        <Select
          id={`status-select-${task.id}`}
          label="Status"
          options={[...STATUS_OPTIONS]}
          {...register("status")}
        />
      </div>

      <div className={formStyles.formGroup}>
        <Controller
          name="ownerId"
          control={control}
          rules={{ required: "Owner is required" }}
          render={({ field }) => (
            <Select
              id={`owner-select-${task.id}`}
              label="Owner"
              options={userOptions}
              error={errors.ownerId?.message}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button variant="primary" type="submit" disabled={updateTask.isPending}>
          {updateTask.isPending ? "Saving..." : "Save"}
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={onSuccess}
          disabled={updateTask.isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
