import { render } from '@testing-library/react';
import React from 'react';
import ProjectBox from './project-box';
import { ProjectBoxProps } from './project-box.d';
import { faker } from '@faker-js/faker';
import { MockedProvider } from '@apollo/client/testing';
import moment from 'moment';

describe('ProjectBox', () => {
  it('shows empty project', () => {
    const props: ProjectBoxProps = {
      project: {
        id: 1,
        name: faker.internet.domainName(),
        url: faker.internet.url(),
        pipelineStatuses: [],
        users: [],
        __typename: 'Project',
      },
      refreshAllProjects: jest.fn(),
    };

    const comp = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProjectBox {...props} />
      </MockedProvider>
    );

    expect(comp.getByText(props.project.name)).toBeDefined();
    expect(comp.getByText('No Pipeline Executed')).toBeDefined();
    expect(comp.getByText('No developer found')).toBeDefined();
  });

  it('show project with pipeline statuses', () => {
    const pipelineReportedTime = '2023-02-03T08:00:34Z';

    const props: ProjectBoxProps = {
      project: {
        id: 1,
        name: faker.internet.domainName(),
        url: faker.internet.url(),
        pipelineStatuses: [
          {
            id: 1,
            passed: true,
            reportedTime: pipelineReportedTime,
          },
          {
            id: 2,
            passed: true,
            reportedTime: '2023-02-01T02:00:34Z',
          },
        ],
        users: [],
        __typename: 'Project',
      },
      refreshAllProjects: jest.fn(),
    };

    const comp = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProjectBox {...props} />
      </MockedProvider>
    );

    expect(comp.queryByText('No Pipeline Executed')).toBeNull();
    expect(
      comp.getByText(moment(pipelineReportedTime).format('LLLL'))
    ).toBeDefined();
    expect(comp.getAllByRole('pepiline-item')).toHaveLength(2);
  });

  it('show the list of developers', () => {
    const props: ProjectBoxProps = {
      project: {
        id: 1,
        name: faker.internet.domainName(),
        url: faker.internet.url(),
        pipelineStatuses: [],
        users: [
          {
            id: 2,
            username: faker.internet.email(),
          },
          {
            id: 3,
            username: faker.internet.email(),
          },
        ],
        __typename: 'Project',
      },
      refreshAllProjects: jest.fn(),
    };

    const comp = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProjectBox {...props} />
      </MockedProvider>
    );

    expect(comp.queryByText('No developer found')).toBeNull();

    props.project.users?.forEach((user) => {
      expect(comp.getByText(user.username)).toBeDefined();
    });
  });
});
