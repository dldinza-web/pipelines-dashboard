require 'rails_helper'

RSpec.describe Team, type: :model do
  it 'creates' do
    team = create(:team)

    expect(team).to be_persisted
    expect(team.user).to be_a User
    expect(team.project).to be_a Project
  end

  context 'Negative Scenarios' do
    it "a team must not have an user repeated in a project" do
      team_1 = create(:team)

      another_team = build(:team, project: team_1.project, user: team_1.user)

      expect(another_team.valid?).to be false
      expect(another_team.errors.full_messages).to include 'Project and User have been already taken'
    end
  end
end
