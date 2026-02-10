import { useCallback, useState } from "react";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import { useProjectsQuery, useTasksQuery } from "../features/projects/queries";
import ProjectItem from "../features/projects/components/ProjectItem";
import TaskItem from "../features/projects/components/TaskItem";
import { useToggleTaskMutation } from "../features/tasks/task.mutations";

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const { data: projects, isLoading: projectsLoading } = useProjectsQuery();
  const { data: tasks, isLoading: tasksLoading } =
    useTasksQuery(selectedProjectId);
  const { mutate: toggleTask } = useToggleTaskMutation();

  const handleSelectProject = useCallback((id: number) => {
    setSelectedProjectId(id);
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
        <section>
          <h2>Create a Task</h2>
          <CreateTaskForm projectId={selectedProjectId}></CreateTaskForm>
        </section>
      )}
    </div>
  );
};

export default Projects;
