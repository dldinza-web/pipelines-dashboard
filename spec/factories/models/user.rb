FactoryBot.define do
  factory :user do
    username {Faker::Internet.email}
  end
end
