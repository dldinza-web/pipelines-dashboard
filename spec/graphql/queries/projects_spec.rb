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

    it 'loads pipelines statuses within projects' do
      3.times.each { create(:project, :with_pipeline_statuses) }

      request_body = <<~GQL
        query {
          projects {
            pipelineStatuses {
              passed
              reportedTime
            }
          }
        }
      GQL

      post '/graphql', params: { query: request_body }
      response_json = JSON.parse response.body
      data_projects = response_json['data']['projects']

      expect(data_projects.first['pipelineStatuses']).not_to be_empty
    end

    it "load teams" do
      users = Array.new(3).map { create(:user) }

      project = create(:project)
      project.users = users
      project.save!

      request_body = <<~GQL
        query {
          projects {
            users {
              id
              username
            }
          }
        }
      GQL

      post '/graphql', params: { query: request_body }
      response_json = JSON.parse response.body
      data_projects = response_json['data']['projects']

      expect(data_projects.first['users']).not_to be_empty
    end
  end
end
