require 'rails_helper'

module Queries
  describe Projects, type: :request do
    it 'loads projects' do
      3.times.each { create(:project) }

      request_body = <<~GQL
        query {
          projects {
            id
            name
          }
        }
      GQL

      post '/graphql', params: { query: request_body }
      response_json = JSON.parse response.body

      data_projects = response_json['data']['projects']

      expect(data_projects).not_to be_empty
      expect(data_projects.length).to be 3
    end
  end
end
