import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from 'src/components/layout/app.layout';
import { CURRENT_USER_LSTG_KEY } from '../sign-in/constants/sign-in.constants';
import ProjectList from './components/project-list/project-list';

const ProjectsPipelinePage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem(CURRENT_USER_LSTG_KEY)) {
      navigate('/');
    }
  }, []);

  return (
    <AppLayout title="Projects">
      <ProjectList />
    </AppLayout>
  );
};

export default ProjectsPipelinePage;
