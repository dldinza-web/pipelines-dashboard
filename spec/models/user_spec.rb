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

  it 'might belongs to multiple projects' do
    user = create(:user)

    user.projects.concat Array.new(3).map { create(:project) }
    user.save!

    expect(user.projects).not_to be_empty
  end

  context 'Invalid Scenarios' do
    it 'username is required' do
      user = build(:user, username: ['', nil].sample)

      expect(user.valid?).to be false
      expect(user.errors.full_messages).to include "Username can't be blank"
    end
  end
end
