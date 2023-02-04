import React, { useState } from 'react';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Paper,
  Box,
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  ListItemIcon,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import * as Styles from 'src/components/pages/projects_pipeline/components/project-list/project-list.styles';
import moment from 'moment';
import { ProjectBoxProps } from './project-box.d';
import ProjectDevelopers from '../project-developers/project-developers';
import { CURRENT_USER_LSTG_KEY } from 'src/components/pages/sign-in/constants/sign-in.constants';
import { useMutation } from '@apollo/client';
import {
  gqlMutationAddUserToProject,
  UserAddedType,
} from 'src/graphql/mutations/projects.mutations';
import * as CommonStyles from 'src/components/shared/styles/common';

const ProjectBox = (props: ProjectBoxProps) => {
  const { project } = props;

  const [errorsAddUser, setErrorsAddUser] = useState<string[]>([]);

  const getProjectPipelinesStatus = () => {
    if (
      project.pipelineStatuses === undefined ||
      project.pipelineStatuses.length < 1
    ) {
      return undefined;
    }

    return project.pipelineStatuses.find((i) => i.passed === false)
      ? Styles.PipelineStatus.oneFailed
      : Styles.PipelineStatus.allPassed;
  };

  const onAddUserToProjectCompleted = (data: UserAddedType) => {
    if (data?.addUserToProject?.project?.id) {
      props.refreshAllProjects();
    }

    if (data?.addUserToProject?.errors.length > 0) {
      setErrorsAddUser(data?.addUserToProject?.errors);
    }
  };

  const onAddUserToProjectFailed = () => {
    setErrorsAddUser(['API error joining user.']);
  };

  const [gqlAddUserToProject, gqlAddUserToProjectResponse] = useMutation(
    gqlMutationAddUserToProject,
    {
      onCompleted: onAddUserToProjectCompleted,
      onError: onAddUserToProjectFailed,
    }
  );

  const onAddUserToProject = () => {
    const currentUserData = localStorage.getItem(CURRENT_USER_LSTG_KEY);
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;
    setErrorsAddUser([]);

    if (
      project.users &&
      currentUser &&
      !project.users.find((user) => user.username === currentUser.username)
    ) {
      gqlAddUserToProject({
        variables: { username: currentUser.username, projectId: project.id },
      });
    }
  };

  return (
    <Paper
      sx={Styles.Item}
      id={`project_${props.project.id}`}
      className="project-box"
    >
      <Styles.ProjectTitle status={getProjectPipelinesStatus()}>
        {props.project.name}
      </Styles.ProjectTitle>
      <Box>
        <List
          subheader={
            <ListSubheader component="div" sx={{ fontSize: 'large' }}>
              {project.pipelineStatuses && project.pipelineStatuses.length > 1
                ? 'Pipelines Status'
                : 'No Pipeline Executed'}
            </ListSubheader>
          }
        >
          {project.pipelineStatuses && project.pipelineStatuses.length > 1 && (
            <>
              {project.pipelineStatuses.map((status) => (
                <ListItem key={`pipeline_status_${status.id}`}>
                  <ListItemIcon>
                    {status.passed ? (
                      <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                    ) : (
                      <BlockIcon sx={{ color: 'red' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={moment(status.reportedTime).format('LLLL')}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>

      <ProjectDevelopers
        users={project.users ? project.users : []}
        onAddUserToProject={onAddUserToProject}
        errorsAddUser={errorsAddUser}
      />

      <Backdrop
        open={gqlAddUserToProjectResponse.loading}
        sx={CommonStyles.Overlay}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default React.memo(ProjectBox);
