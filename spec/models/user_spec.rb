require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates' do
    user = create(:user, password: Faker::Internet.password)

    expect(user).to be_persisted
  end

  it 'might belongs to multiple projects' do
    user = create(:user, password: Faker::Internet.password)

    user.projects.concat Array.new(3).map { create(:project) }
    user.save!

    expect(user.projects).not_to be_empty
  end

  context 'Invalid Scenarios' do
    it 'username is required' do
      user = build(:user, username: ['', nil].sample, password: Faker::Internet.password)

      expect(user.valid?).to be false
      expect(user.errors.full_messages).to include "Username can't be blank"
    end

    it 'password is required' do
      user = build(:user, username: ['', nil].sample)

      expect(user.valid?).to be false
      expect(user.errors.full_messages).to include "Password can't be blank"
    end
  end
end
