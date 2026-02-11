import { useCallback, useState } from "react";
import {
  useProjectsQuery,
  useTasksQuery,
} from "../../features/projects/queries";
import ProjectItem from "../../features/projects/components/ProjectItem/ProjectItem";
import { useToggleTaskMutation } from "../../features/tasks/task.mutations";
import Modal from "../../components/ui/Modal/Modal";
import { Task } from "../../interfaces/api.interface";
import EditTaskForm from "../../features/tasks/components/EditTaskForm/EditTaskForm";
import TaskItem from "../../features/tasks/components/TaskItem/TaskItem";
import CreateTaskForm from "../../features/tasks/components/CreateTaskForm/CreateTaskForm";
import Button from "../../components/ui/Button/Button";

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const { data: projects, isLoading: projectsLoading } = useProjectsQuery();
  const { data: tasks, isLoading: tasksLoading } =
    useTasksQuery(selectedProjectId);
  const { mutate: toggleTask } = useToggleTaskMutation();

  const handleSelectProject = useCallback((id: number) => {
    setSelectedProjectId(id);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsEditOpen(true);
  }, []);

  if (projectsLoading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <h2>Projects</h2>
        <ul>
          {projects?.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onSelect={handleSelectProject}
            />
          ))}
        </ul>
      </aside>

      <section>
        <h2>Tasks</h2>
        {tasksLoading && <p>Loading tasks...</p>}
        <ul>
          {tasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={(task) => handleEditTask(task)}
              onSelect={(task) => {
                return toggleTask({
                  id: task.id,
                  projectId: selectedProjectId!,
                  title: task.title,
                  completed: !task.completed,
                });
              }}
            />
          ))}
        </ul>
      </section>

      {selectedProjectId && (
        <>
          <Button
            variant="primary"
            type="button"
            onClick={() => setIsCreateOpen(true)}
          >
            + Add Task
          </Button>

          <Modal
            title="Create task"
            isOpen={isCreateOpen || isEditOpen}
            onClose={() => {
              setTaskToEdit(null);
              setIsCreateOpen(false);
              setIsEditOpen(false);
            }}
          >
            {isCreateOpen && (
              <CreateTaskForm
                projectId={selectedProjectId}
                onSuccess={() => setIsCreateOpen(false)}
              />
            )}
            {isEditOpen && (
              <EditTaskForm
                task={taskToEdit!}
                selectedProjectId={selectedProjectId}
                onSuccess={() => {
                  setIsEditOpen(false);
                  setTaskToEdit(null);
                }}
              />
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default Projects;
