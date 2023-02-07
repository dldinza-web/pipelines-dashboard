import React from 'react';
import { render } from '@testing-library/react';
import ProjectList from './project-list';
import { MockedProvider } from '@apollo/client/testing';
import { gqlQueryProjects } from 'src/graphql/queries/projects.query';

describe('Project List', () => {
  it('shows loading progress bar when api is being colled', async () => {
    const mockQueryProjects = {
      request: {
        query: gqlQueryProjects,
      },
      result: {
        data: {
          projects: [],
        },
      },
    };

    const comp = render(
      <MockedProvider mocks={[mockQueryProjects]} addTypename={false}>
        <ProjectList />
      </MockedProvider>
    );

    expect(await comp.getByRole('progressbar', { hidden: true })).toBeDefined();
  });
});
