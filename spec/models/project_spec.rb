require 'rails_helper'

RSpec.describe Project, type: :model do
  it "creates" do
    project = create(:project)

    expect(project).to be_persisted
  end

  it 'creates project with pipelines' do
    total_pipelines = 6
    project = create(:project, :with_pipeline_statuses, pipeline_status_count: total_pipelines)

    expect(project.pipeline_statuses.length).to be total_pipelines
  end

  it 'deletes all pipelines if project is destroyed' do
    project = create(:project, :with_pipeline_statuses)

    pipelines_statuses_ids = project.pipeline_statuses.map(&:id)

    project.destroy!

    expect { project.reload }.to raise_exception ActiveRecord::RecordNotFound
    expect(PipelineStatus.where(id: pipelines_statuses_ids)).to be_empty
  end

  it 'assigns developers to a project' do
    project = create(:project)

    project.users.concat Array.new(3).map{ create(:user, password: 'th3_p4ss') }
    project.save!

    expect(project.users).not_to be_empty
  end

  it 'removes all teams if project is destroyed' do
    project = create(:project, :with_team)

    team_ids = project.teams.map(&:id)

    project.destroy

    expect(Team.where(id: team_ids)).to be_empty
  end

  context "Invalid scenarios" do
    it 'name is required' do
      project = build(:project, name: [nil, ''].sample)

      expect(project.valid?).to be false
      expect(project.errors.full_messages).to include "Name can't be blank"
    end

    it 'url is required' do
      project = build(:project, url: [nil, ''].sample)

      expect(project.valid?).to be false
      expect(project.errors.full_messages).to include "Url can't be blank"
    end
  end
end
