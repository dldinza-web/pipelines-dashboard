import React from 'react';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Paper,
  Box,
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
} from '@mui/material';
import * as Styles from 'src/components/pages/projects_pipeline/components/project-list/project-list.styles';
import moment from 'moment';
import { ProjectBoxProps } from './project-box.d';
import ButtonsBox from 'src/components/shared/buttons-group';

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

      <Box>
        <Accordion sx={{ boxShadow: 'none' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {`${
              project.users && project.users.length > 0
                ? `(${project.users.length})`
                : ''
            } Developers`}
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {project.users && project.users.length > 0 ? (
                <>
                  {project.users.map((user) => (
                    <ListItem key={`user_${user.id}`}>
                      <ListItemText primary={user.username} />
                    </ListItem>
                  ))}
                </>
              ) : (
                <ListItem sx={{ justifyContent: 'center' }}>
                  <Chip label="No developer found" variant="outlined" />
                </ListItem>
              )}
            </List>

            <ButtonsBox>
              <Button variant="contained">Join</Button>
            </ButtonsBox>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default ProjectBox;
