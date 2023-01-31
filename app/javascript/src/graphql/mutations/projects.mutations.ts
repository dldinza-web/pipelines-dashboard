import { gql } from "@apollo/client";

export interface UserAddedType {
  addUserToProject: {
    project: {
      id: number
      __typename: 'Project'
    }
    errors: [string]
    __typename: 'AddUserToProjectPayload'
  }
}

export const gqlMutationAddUserToProject = gql`
  mutation AddUserToProject(
    $projectId: ID!,
    $username: String!
  ){
    addUserToProject(input: {
      projectId: $projectId,
      username: $username
    }) {
      project {
        id
      }
      errors
    }
  }
`
