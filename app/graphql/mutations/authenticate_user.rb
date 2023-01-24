module Mutations
  class AuthenticateUser < Mutations::BaseMutation
    null false

    argument :username, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType
    field :errors, [String]

    def resolve(username:, password:)
      user = User.where(username:, password:).first

      if (user.present?)
        {
          user: user
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
