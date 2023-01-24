import { gql } from "@apollo/client";

export type AuthenticatedUserType = {
  authenticateUser: {
    user: {
      id: Number,
      username: String,
      __typename: "User"
    },
    errors: [String] | null,
    __typename: "AuthenticateUserPayload"
  }
}

export const gqlMutationAuthenticate = gql`
  mutation authenticateUser(
    $username: String!,
    $password: String!
  ) {
    authenticateUser(
      input: {
        username: $username,
        password: $password
      }
    ) {
      user {
        id,
        username
      }
      errors
    }
  }
`
