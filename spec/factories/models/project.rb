FactoryBot.define do
  factory :project do
    name { Faker::App.name }
    url { Faker::Internet.url }
  end

  trait :with_pipeline_statuses do
    transient do
      pipeline_status_count { 3 }
    end

    after(:create) do |project, params|
      create_list(:pipeline_status, params.pipeline_status_count, project: project)

      project.reload
    end
  end
end
