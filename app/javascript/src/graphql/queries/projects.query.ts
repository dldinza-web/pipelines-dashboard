import { gql } from "@apollo/client";
import { PipelineStatus, Project } from "src/models/models";

export interface ProjectType extends Project {
  __typename: 'Project'
}

export interface PipelineStatusType extends PipelineStatus {
  __typename: 'PipelineStatus'
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
    }
  }
`
