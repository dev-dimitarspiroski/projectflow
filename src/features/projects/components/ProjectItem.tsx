import React from "react";
import { Project } from "../../../interfaces/api.interface";

interface Props {
  project: Project;
  onSelect: (id: number) => void;
}

const ProjectItem = React.memo(({ project, onSelect }: Props) => {
  return (
    <li>
      <button onClick={() => onSelect(project.id)}>{project.name}</button>
    </li>
  );
});

export default ProjectItem;
