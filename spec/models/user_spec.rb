require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates' do
    user = create(:user)

    expect(user).to be_persisted
  end
end
