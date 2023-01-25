import React from 'react';

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
} from '@mui/material';
import * as Styles from 'src/components/pages/projects_pipeline/components/project-list/project-list.styles';
import { ProjectType } from 'src/graphql/queries/projects.query';
import moment from 'moment';

interface ProjectBoxProps {
  project: ProjectType;
}

const ProjectBox = (props: ProjectBoxProps) => {
  const { project } = props;

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

  return (
    <Paper sx={Styles.Item}>
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
    </Paper>
  );
};

export default ProjectBox;
