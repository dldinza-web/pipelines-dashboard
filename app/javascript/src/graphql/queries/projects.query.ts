import { gql } from "@apollo/client";
import { PipelineStatus, Project, User } from "src/models/models";

export interface ProjectType extends Project {
  __typename: 'Project'
}

export interface PipelineStatusType extends PipelineStatus {
  __typename: 'PipelineStatus'
}

export interface UserType extends User {
  __typename: 'User'
}


export const gqlQueryProjects = gql`
  query {
    projects {
      id
      name
      url
      pipelineStatuses {
        id
        passed
        reportedTime
      }
      users {
        id
        username
      }
    }
  }
`
