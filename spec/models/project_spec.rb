require 'rails_helper'

RSpec.describe Project, type: :model do
  it "creates" do
    project = create(:project)

    expect(project).to be_persisted
  end
end
