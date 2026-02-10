import { useState } from "react";
import CreateTaskForm from "../features/tasks/CreateTaskForm";
import { useProjectsQuery, useTasksQuery } from "../features/projects/queries";

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const { data: projects, isLoading: projectsLoading } = useProjectsQuery();
  const { data: tasks, isLoading: tasksLoading } =
    useTasksQuery(selectedProjectId);

  if (projectsLoading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <h2>Projects</h2>
        <ul>
          {projects?.map((project) => (
            <li key={project.id}>
              <button onClick={() => setSelectedProjectId(project.id)}>
                {project.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section>
        <h2>Tasks</h2>
        {tasksLoading && <p>Loading tasks...</p>}
        <ul>
          {tasks?.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.completed} readOnly />
              <span>{task.title}</span>
            </li>
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
