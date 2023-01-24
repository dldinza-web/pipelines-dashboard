require 'rails_helper'

module Mutations
  describe AuthenticateUser, type: :request do
    it 'authenticates an user' do
      user = create(:user, username: 'ryan@testing.com', password: nil)

      request_body = <<~GQL
        mutation {
          authenticateUser(input: {
            username: "#{user.username}",
            password: "#{user.password}"
          }) {
            user {
              id
              username
            }
          }
        }
      GQL

      post '/graphql', params: { query: request_body }
      response_json = JSON.parse response.body

      user_data = response_json['data']['authenticateUser']['user']

      expect(user_data['id']).to eql user.id
      expect(user_data['username']).to eql user.username
    end

    context 'Invalid Scenarios' do
      it 'wrong authentication' do
        request_body = <<~GQL
          mutation {
            authenticateUser(input: {
              username: "wrong_username",
              password: "wrong_password"
            }) {
              user {
                id
                username
              }
              errors
            }
          }
        GQL

        post '/graphql', params: { query: request_body }
        response_json = JSON.parse response.body

        response_data = response_json['data']['authenticateUser']

        expect(response_data['user']).to be_nil
        expect(response_data['errors']).to include "INVALID_AUTHENTICATION"
      end
    end
  end
end
