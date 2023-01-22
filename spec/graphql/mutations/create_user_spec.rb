require 'rails_helper'

module Mutations
  describe CreateUser, type: :request do
    it 'creates an user' do
      new_username = Faker::Internet.username
      new_password = Faker::Internet.password

      request_body = <<~GQL
        mutation {
          createUser(input: {
            username: "#{new_username}",
            password: "#{new_password}"
          }) {
            user {
              id
              username
            }
          }
        }
      GQL

      post '/graphql', params: { query: request_body }
      json = JSON.parse response.body

      data = json['data']['createUser']['user']

      user = User.find(data['id'])

      expect(user.username).to eql new_username
      expect(data['username']).to eql new_username

      # password is never exposed
      expect(data['password']).not_to be_present
    end

    it "creates with default password" do
      new_username = Faker::Internet.username

      request_body = <<~GQL
        mutation {
          createUser(input: {
            username: "#{new_username}"
          }) {
            user {
              id
              username
            }
          }
        }
      GQL

      post '/graphql', params: { query: request_body }
      json = JSON.parse response.body

      data = json['data']['createUser']['user']

      user = User.find(data['id'])

      expect(user.password).not_to be_empty
    end
  end
end
