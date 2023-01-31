import React from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  gqlQueryProjects,
  ProjectType,
} from 'src/graphql/queries/projects.query';
import * as Styles from './project-list.styles';
import ProjectBox from '../project-box/project-box';

const ProjectList = () => {
  const responseProjects = useQuery(gqlQueryProjects);

  return (
    <Box sx={Styles.ListContainer}>
      {!responseProjects.loading &&
        !responseProjects.error &&
        responseProjects.data && (
          <>
            {responseProjects.data.projects.map(
              (project: ProjectType, i: number) => (
                <ProjectBox key={`project_${i}`} project={project} />
              )
            )}
          </>
        )}
    </Box>
  );
};

export default ProjectList;
