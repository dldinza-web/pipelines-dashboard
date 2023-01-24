import { ApolloClient, InMemoryCache } from '@apollo/client';
import Rails from '@rails/ujs';

const GraphQLClient = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    'X-CSRF-Token': Rails.csrfToken() || '',
  },
});

export default GraphQLClient;
