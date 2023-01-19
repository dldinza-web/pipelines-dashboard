module Mutations
  class DeleteUser < Mutations::BaseMutation
    null false

    argument  :id, Integer, required: true

    field :user, Types::UserType
    field :errors, [String], null: false

    def resolve(id:)
      user = User.find(id) rescue nil

      if user
        user.destroy

        {
          user: user,
          errors: []
        }
      else
        {
          user: nil,
          errors: ["User not found"]
        }
      end
    end
  end
end
