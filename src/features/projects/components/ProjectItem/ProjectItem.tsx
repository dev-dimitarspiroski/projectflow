import React from "react";
import Button from "../../../../components/ui/Button/Button";
import { Project } from "../../../../interfaces/api.interface";

interface Props {
  project: Project;
  onSelect: (id: number) => void;
}

const ProjectItem = React.memo(({ project, onSelect }: Props) => {
  return (
    <li>
      <Button variant="primary" onClick={() => onSelect(project.id)}>
        {project.name}
      </Button>
    </li>
  );
});

export default ProjectItem;
