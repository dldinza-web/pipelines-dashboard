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
end
