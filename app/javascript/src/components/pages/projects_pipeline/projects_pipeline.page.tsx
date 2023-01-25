import React from 'react';
import AppLayout from 'src/components/layout/app.layout';
import ProjectList from './components/project-list/project-list';

const ProjectsPipelinePage = () => {
  return (
    <AppLayout title="Projects">
      <ProjectList />
    </AppLayout>
  );
};

export default ProjectsPipelinePage;
