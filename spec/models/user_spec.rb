require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates' do
    user = create(:user)

    expect(user).to be_persisted
  end

  it "sets a default password" do
    user = User.create!(username: Faker::Internet.username)

    default_password = Digest::SHA1.hexdigest(Settings.users.default_password)

    expect(user.password).to eql default_password
    expect(create(:user).password).not_to eql default_password
  end
end
