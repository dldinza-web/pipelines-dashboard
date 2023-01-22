module Mutations
  class CreateUser < Mutations::BaseMutation
    null true

    argument  :username, String, required: true
    argument  :password, String, required: false

    field :user, Types::UserType
    field :errors, [String], null: false

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
