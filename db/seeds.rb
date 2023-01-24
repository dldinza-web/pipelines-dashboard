# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

accounts = [
  'ryan@testing.com',
  'dennys@testing.com',
  'david@testing.com'
]

# Default Password is in settings.yml

User.delete_all
Project.delete_all

accounts.each do |account|
  User.create!(username: account)
end

3.times.each do
  FactoryBot.create(:project)
end
FactoryBot.create(:project, name: "Lisa's Project")
