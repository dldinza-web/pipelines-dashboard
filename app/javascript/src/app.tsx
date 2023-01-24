import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './router/routes'
import GraphQLClient from './services/graphql-client'

const App = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={GraphQLClient}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ApolloProvider>
    </React.StrictMode>
  )
}

export default App
