module Mutations
  class AuthenticateUser < Mutations::BaseMutation
    description 'Authenticate an account'
    null false

    argument :password, String, required: true
    argument :username, String, required: true

    field :errors, [String]
    field :user, Types::UserType

    def resolve(username:, password:)
      user = User.where(username:, password:).first

      if user.present?
        {
          user:
        }
      else
        {
          user: nil,
          errors: ['INVALID_AUTHENTICATION']
        }
      end
    end
  end
end
