FactoryBot.define do
  factory :project do
    name { Faker::App.name }
    url { Faker::Internet.url }
  end
end
