require 'rails_helper'

module Queries
  describe Users, type: :request do
    it 'load users' do
      request_body = <<~GQL
        query {
          users {
            id
            username
          }
        }
      GQL

      users = Array.new(2).map {create(:user)}

      post '/graphql', params: { query: request_body }
      json = JSON.parse response.body

      data = json['data']['users']

      data.each_with_index do |item, i|
        item['id'] = item['id'].to_i

        expect(users[i]).to have_attributes(item)
      end
    end
  end
end
