module Mutations
  class CreateUser < Mutations::BaseMutation
    null true

    argument  :password, String, required: false
    argument  :username, String, required: true

    field :errors, [String], null: false
    field :user, Types::UserType

    def resolve(username:, password: nil)
      user = User.new(username:, password:)

      if user.save
        {
          user:,
          errors: []
        }
      else
        {
          user: nil,
          errors: user.errors.full_messages
        }
      end
    end
  end
end
