module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :projects, resolver: Queries::Projects::Projects
    field :user, resolver: Queries::Users::User
    field :users, resolver: Queries::Users::Users
  end
end
