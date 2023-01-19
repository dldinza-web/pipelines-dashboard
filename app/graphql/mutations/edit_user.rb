module Mutations
  class EditUser < Mutations::BaseMutation
    null false

    argument  :id, Integer, required: true
    argument  :username, String, required: true

    field :user, Types::UserType
    field :errors, [String], null: false

    def resolve(id:, username:)
      user = User.find(id) rescue nil

      if user
        user.username = username

        if user.save
          {
            user: user,
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
