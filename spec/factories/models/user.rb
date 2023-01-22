FactoryBot.define do
  factory :user do
    username {Faker::Internet.username}
    password { Digest::SHA1.hexdigest(Faker::Internet.password)}
  end
end
