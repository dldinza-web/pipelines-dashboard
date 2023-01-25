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

User.destroy_all
Project.destroy_all

accounts.each { |account| User.create!(username: account) }

project = FactoryBot.create(:project, :with_pipeline_statuses, name: "Lisa's Project")
project.pipeline_statuses.update(:all, passed: true)

more_projects = Array.new(4).map { FactoryBot.create(:project, :with_pipeline_statuses) }
more_projects.first.pipeline_statuses.destroy_all
