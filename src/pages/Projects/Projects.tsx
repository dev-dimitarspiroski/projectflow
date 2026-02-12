import { useCallback, useState } from "react";
import {
  useProjectsQuery,
  useTasksPerProjectQuery,
} from "../../features/projects/queries";
import ProjectItem from "../../features/projects/components/ProjectItem/ProjectItem";
import { useToggleTaskMutation } from "../../features/tasks/task.mutations";
import Modal from "../../components/ui/Modal/Modal";
import { Task } from "../../interfaces/api.interface";
import EditTaskForm from "../../features/tasks/components/EditTaskForm/EditTaskForm";
import TaskItem from "../../features/tasks/components/TaskItem/TaskItem";
import CreateTaskForm from "../../features/tasks/components/CreateTaskForm/CreateTaskForm";
import Button from "../../components/ui/Button/Button";
import styles from "./Projects.module.css"; // ✅ add this

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const { data: projects, isLoading: projectsLoading } = useProjectsQuery();
  const { data: tasks, isLoading: tasksLoading } =
    useTasksPerProjectQuery(selectedProjectId);
  const { mutate: toggleTask } = useToggleTaskMutation();

  const handleSelectProject = useCallback((id: number) => {
    setSelectedProjectId(id);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsEditOpen(true);
  }, []);

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

              <ul className={styles.list}>
                {tasks?.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    selectedProjectId={selectedProjectId}
                    onEdit={() => handleEditTask(task)}
                    onSelect={() =>
                      toggleTask({
                        id: task.id,
                        projectId: selectedProjectId,
                        status: task.status,
                      })
                    }
                  />
                ))}
              </ul>
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
