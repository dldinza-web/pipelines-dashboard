require 'rails_helper'

RSpec.describe PipelineStatus, type: :model do
  let!(:pipeline_status) {create(:pipeline_status) }

  it 'creates' do
    expect(pipeline_status).to be_persisted
  end

  it 'belongs to a project' do
    expect(pipeline_status.project).to be_a Project
  end
end
