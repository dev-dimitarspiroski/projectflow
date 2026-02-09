import { useState } from "react";
import { useProjects } from "../features/projects/useProjects";
import { useTasks } from "../features/projects/useTasks";

const Projects = () => {
  const { projects, isLoading: projectsLoading } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );
  const { tasks, isLoading: tasksLoading } = useTasks(selectedProjectId);

  if (projectsLoading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <h2>Projects</h2>
        <ul>
          {projects.map((project) => (
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
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.completed} readOnly />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Projects;
