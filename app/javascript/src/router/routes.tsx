import React from 'react';
import ProjectsPipelinePage from 'src/components/pages/projects_pipeline/projects_pipeline.page';
import SignInPage from 'src/components/pages/sign-in/sign-in.page';

const routes = [
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/projects_pipeline',
    element: <ProjectsPipelinePage />,
  },
];

export default routes;
