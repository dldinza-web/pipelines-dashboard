module Types
  class MutationType < Types::BaseObject
    # Users
    field :authenticate_user, mutation: Mutations::AuthenticateUser
    field :create_user, mutation: Mutations::CreateUser
    field :delete_user, mutation: Mutations::DeleteUser
    field :edit_user, mutation: Mutations::EditUser

    # Project
    field :add_user_to_project, mutation: Mutations::Projects::AddUserToProject
  end
end
