FactoryBot.define do
  factory :pipeline_status do
    passed { [true, false].sample }
    reported_time { Faker::Time.backward(days: 10) }
    association :project
  end
end
