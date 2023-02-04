import React from 'react';
import { Box, Button } from '@mui/material';
import { AppLayoutProps } from './app.layout.props';
import * as Styles from './styles/bg.styled';
import { CURRENT_USER_LSTG_KEY } from '../pages/sign-in/constants/sign-in.constants';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from 'src/graphql/mutations/users.mutations';

const AppLayout = (props: AppLayoutProps) => {
  const navigate = useNavigate();

  const userStore = localStorage.getItem(CURRENT_USER_LSTG_KEY);
  const user: UserInterface = userStore ? JSON.parse(userStore) : null;

  const onLogout = () => {
    localStorage.removeItem(CURRENT_USER_LSTG_KEY);

    navigate('/');
  };

  return (
    <Styles.Bg>
      <Box sx={Styles.headerStyles} id={'header'}>
        {props.title}

        {user && (
          <Box id="current-user">
            <span>{user?.username}</span>
            <Button
              variant="outlined"
              onClick={onLogout}
              data-test-id="btnLogout"
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
      {props.children}
    </Styles.Bg>
  );
};

export default AppLayout;
