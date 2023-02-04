FactoryBot.define do
  factory :team do
    user { create(:user, password: Faker::Internet.password) }
    project
  end
end
