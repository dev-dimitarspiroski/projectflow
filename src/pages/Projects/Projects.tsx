import { useCallback, useMemo, useState, type CSSProperties } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Transform } from "@dnd-kit/utilities";
import {
  useProjectsQuery,
  useTasksPerProjectQuery,
} from "../../features/projects/queries";
import { useReorderTaskMutation } from "../../features/tasks/task.mutations";
import ProjectItem from "../../features/projects/components/ProjectItem/ProjectItem";
import Modal from "../../components/ui/Modal/Modal";
import { Task } from "../../interfaces/api.interface";
import EditTaskForm from "../../features/tasks/components/EditTaskForm/EditTaskForm";
import TaskItem from "../../features/tasks/components/TaskItem/TaskItem";
import CreateTaskForm from "../../features/tasks/components/CreateTaskForm/CreateTaskForm";
import Button from "../../components/ui/Button/Button";
import styles from "./Projects.module.css";
import { calculateMovedTaskOrder } from "../../features/tasks/taskOrder";
import { useQueryClient } from "@tanstack/react-query";

function SortableTask({
  task,
  selectedProjectId,
  onEdit,
}: {
  task: Task;
  selectedProjectId: number | null;
  onEdit: () => void;
}) {
  const sortable = useSortable({ id: task.id as string });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = sortable as {
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
    setNodeRef: (node: HTMLElement | null) => void;
    transform: Transform | null;
    transition?: string;
    isDragging: boolean;
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  } as CSSProperties;

  return (
    <TaskItem
      ref={setNodeRef}
      task={task}
      selectedProjectId={selectedProjectId}
      onEdit={onEdit}
      dragAttributes={attributes}
      dragListeners={listeners}
      style={style}
    />
  );
}

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const queryClient = useQueryClient();
  const { data: projects, isLoading: projectsLoading } = useProjectsQuery();
  const { data: tasks, isLoading: tasksLoading } =
    useTasksPerProjectQuery(selectedProjectId);
  const orderedTasks = useMemo(() => tasks ?? [], [tasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const reorderMutation = useReorderTaskMutation(selectedProjectId);

  const handleSelectProject = useCallback((id: number) => {
    setSelectedProjectId(id);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsEditOpen(true);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || orderedTasks.length === 0) {
        return;
      }

      if (String(active.id) === String(over.id)) {
        return;
      }

      const oldIndex = orderedTasks.findIndex(
        (task) => String(task.id) === String(active.id),
      );

      const newIndex = orderedTasks.findIndex(
        (task) => String(task.id) === String(over.id),
      );

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const movedTasks = arrayMove<Task>(orderedTasks, oldIndex, newIndex);

      const newOrder = calculateMovedTaskOrder(movedTasks, newIndex);

      const movedTask = movedTasks[newIndex];

      if (!movedTask) {
        return;
      }

      const updatedTasks = movedTasks.map((task, index) =>
        index === newIndex
          ? {
              ...task,
              order: newOrder,
            }
          : task,
      );

      queryClient.setQueryData<Task[]>(
        ["tasks", selectedProjectId],
        updatedTasks,
      );

      reorderMutation.mutate({
        id: movedTask.id,
        order: newOrder,
      });
    },
    [orderedTasks, selectedProjectId, queryClient, reorderMutation],
  );

  const closeModal = useCallback(() => {
    setTaskToEdit(null);
    setIsCreateOpen(false);
    setIsEditOpen(false);
  }, []);

  if (projectsLoading) return <p>Loading projects...</p>;

  return (
    <div className={styles.page}>
      <aside className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Projects</h2>
        </div>

        <div className={styles.panelBody}>
          <ul className={styles.list}>
            {projects?.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onSelect={handleSelectProject}
              />
            ))}
          </ul>
        </div>
      </aside>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div className={styles.rightTopRow}>
            <h2 className={styles.panelTitle}>Tasks</h2>

            {selectedProjectId && (
              <Button
                variant="primary"
                type="button"
                size="sm"
                onClick={() => setIsCreateOpen(true)}
              >
                + Add Task
              </Button>
            )}
          </div>
        </div>

        <div className={styles.panelBody}>
          {!selectedProjectId && (
            <div className={styles.empty}>
              Select a project on the left to view tasks.
            </div>
          )}

          {selectedProjectId && (
            <>
              {tasksLoading && <p className={styles.meta}>Loading tasks...</p>}

              {orderedTasks.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={orderedTasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <ul className={styles.list}>
                      {orderedTasks.map((task) => (
                        <SortableTask
                          key={task.id}
                          task={task}
                          selectedProjectId={selectedProjectId}
                          onEdit={() => handleEditTask(task)}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              )}
            </>
          )}
        </div>
      </section>

      <Modal
        title={isEditOpen ? "Edit task" : "Create task"}
        isOpen={isCreateOpen || isEditOpen}
        onClose={closeModal}
      >
        {isCreateOpen && selectedProjectId && (
          <CreateTaskForm
            projectId={selectedProjectId}
            onSuccess={() => setIsCreateOpen(false)}
          />
        )}

        {isEditOpen && taskToEdit && selectedProjectId && (
          <EditTaskForm
            task={taskToEdit}
            selectedProjectId={selectedProjectId}
            onSuccess={() => {
              setIsEditOpen(false);
              setTaskToEdit(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Projects;
