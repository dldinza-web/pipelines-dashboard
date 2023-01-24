import React from 'react';
import { Box } from '@mui/material';
import { AppLayoutProps } from './app.layout.props';
import * as Styles from './styles/bg.styled';

const AppLayout = (props: AppLayoutProps) => {
  return (
    <Styles.Bg>
      <Box sx={Styles.headerStyles}>{props.title}</Box>

      {props.children}
    </Styles.Bg>
  );
};

export default AppLayout;
