import { gql } from '@apollo/client';

export interface UserInterface {
  id: number;
  username: string;
}

export interface AuthenticatedUserType {
  authenticateUser: {
    user: {
      id: number;
      username: string;
      __typename: 'User';
    };
    errors: [string] | null;
    __typename: 'AuthenticateUserPayload';
  };
}

export const gqlMutationAuthenticate = gql`
  mutation authenticateUser($username: String!, $password: String!) {
    authenticateUser(input: { username: $username, password: $password }) {
      user {
        id
        username
      }
      errors
    }
  }
`;
