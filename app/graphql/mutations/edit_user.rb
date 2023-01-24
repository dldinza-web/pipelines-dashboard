module Mutations
  class EditUser < Mutations::BaseMutation
    null false

    argument  :id, Integer, required: true
    argument  :username, String, required: true

    field :errors, [String], null: false
    field :user, Types::UserType

    def resolve(id:, username:)
      user = begin
        User.find(id)
      rescue StandardError
        nil
      end

      if user
        user.username = username

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
      else
        {
          user: nil,
          errors: ["User not found"]
        }
      end
    end
  end
end
