# !/bin/bash

# Common
echo "\n[Installing packages]\n"
sleep 3
bundle i
yarn

# Dev Environment
echo "\n[Installing databases]\n"
rails db:drop
rails db:create
rails db:migrate
rails db:seed

# Test Environment
rails db:reset RAILS_ENV=test

echo "\n[Running Unit Tests TDD]\n"
sleep 3
yarn test:backend
yarn test:frontend

echo "\n[Manually Run Automation Tests E2E]\n"
echo "- Open 2 consoles"
echo "1. Execute Test Environment: yarn test:env"
echo "2. Run Cypress CI: yarn cypress"
echo "- (optional) Run Manually Cypress CI and run E2E Tests: yarn cypress:open"

echo "\n[Execute Project]\n"
echo "1. Run: yarn dev"
echo "2. Open: http://localhost:3000/"

echo ""

