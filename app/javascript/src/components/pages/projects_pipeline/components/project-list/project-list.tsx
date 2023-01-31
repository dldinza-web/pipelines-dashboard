import React from 'react';
import { useQuery } from '@apollo/client';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import {
  gqlQueryProjects,
  ProjectType,
} from 'src/graphql/queries/projects.query';
import * as Styles from './project-list.styles';
import ProjectBox from '../project-box/project-box';
import * as CommonStyles from 'src/components/shared/styles/common';

const ProjectList = () => {
  const responseProjects = useQuery(gqlQueryProjects);

  const onRefreshListProjects = () => {
    responseProjects.refetch();
  };

  return (
    <Box sx={Styles.ListContainer}>
      {!responseProjects.loading &&
        !responseProjects.error &&
        responseProjects.data && (
          <>
            {responseProjects.data.projects.map(
              (project: ProjectType, i: number) => (
                <ProjectBox
                  key={`project_${i}`}
                  project={project}
                  refreshAllProjects={onRefreshListProjects}
                />
              )
            )}

            <Backdrop open={responseProjects.loading} sx={CommonStyles.Overlay}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        )}
    </Box>
  );
};

export default ProjectList;
