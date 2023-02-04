require 'rails_helper'

module Mutations
  module Projects
    describe AddUserToProject, type: :request do
      it 'add user to existing project' do
        project = create(:project)
        user = create(:user, password: 'th3_p4ss')

        request_body = <<~GQL
          mutation {
            addUserToProject(input: {
              projectId: "#{project.id}",
              username: "#{user.username}"
            }) {
              project {
                id
                users {
                  id
                  username
                }
              }
              errors
            }
          }
        GQL

        post '/graphql', params: { query: request_body }
        response_json = JSON.parse response.body

        project_data = response_json['data']['addUserToProject']['project']

        expect(project_data['id']).to be project.id
        expect(project_data['users']).to include({ 'id' => user.id, 'username' => user.username })
        expect(response_json['data']['addUserToProject']['errors']).to be_empty
      end

      context "Negative Scenarios" do
        it "user not found" do
          project = create(:project)

          request_body = <<~GQL
            mutation {
              addUserToProject(input: {
                projectId: "#{project.id}",
                username: "wrong_username"
              }) {
                project { id }
                errors
              }
            }
          GQL

          post '/graphql', params: { query: request_body }
          response_json = JSON.parse response.body

          response_data = response_json['data']['addUserToProject']

          expect(response_data['project']).to be_nil
          expect(response_data['errors']).to include 'User not found'
        end

        it "project not found" do
          user = create(:user, password: 'th3_p4ss')

          request_body = <<~GQL
            mutation {
              addUserToProject(input: {
                projectId: "wrong_username",
                username: "#{user.username}"
              }) {
                project { id }
                errors
              }
            }
          GQL

          post '/graphql', params: { query: request_body }
          response_json = JSON.parse response.body

          response_data = response_json['data']['addUserToProject']

          expect(response_data['project']).to be_nil
          expect(response_data['errors']).to include 'Project not found'
          end
      end
    end
  end
end
