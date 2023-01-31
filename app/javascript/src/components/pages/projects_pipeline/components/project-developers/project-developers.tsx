import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Box,
  List,
  ListItemText,
  ListItem,
  Alert,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonsBox from 'src/components/shared/buttons-group';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CURRENT_USER_LSTG_KEY } from 'src/components/pages/sign-in/constants/sign-in.constants';
import { User } from 'src/models/models';

interface ProjectDevelopersProps {
  users: User[];
  onAddUserToProject: Function;
  errorsAddUser: string[];
}

const ProjectDevelopers = (props: ProjectDevelopersProps) => {
  const showExistingUserSignal = (): JSX.Element => {
    const currentUserData = localStorage.getItem(CURRENT_USER_LSTG_KEY);
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

    if (
      currentUser &&
      props.users.find((user) => user.username === currentUser.username)
    ) {
      return <FiberManualRecordIcon sx={{ color: 'green' }} />;
    }

    return <></>;
  };

  return (
    <Box>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ color: '#5a9cdf' }}
        >
          <>
            {showExistingUserSignal()}

            {`${
              props.users && props.users.length > 0
                ? `(${props.users.length})`
                : ''
            } Developers`}
          </>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {props.errorsAddUser.length > 0 && (
              <Stack direction="column" spacing={2}>
                {props.errorsAddUser.map((msg, i) => (
                  <Alert key={`error_${i}`} severity="error">
                    {msg}
                  </Alert>
                ))}
              </Stack>
            )}

            {props.users && props.users.length > 0 ? (
              <>
                {props.users.map((user) => (
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
            <Button
              variant="contained"
              onClick={() => props.onAddUserToProject()}
            >
              Join
            </Button>
          </ButtonsBox>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProjectDevelopers;
