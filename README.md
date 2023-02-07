# Pipelines Project

Dashboard to visualize the status of Pipelines. Capability to assign developers to projects.

**Description:**
The React application is connected to a real backend server. The database is Postgres and the API is GraphQL. The Automation Tests are in Cypress.

## Installation

### Technical Requirements

- `ruby-3.1.0`: Install through RVM: `rvm install 3.1.0` and use it `rvm use 3.1.0`
- `node v18.13.0`: Install through NVM: `nvm install 18.13.0` and use it `nvm use 18.13.0`

**Note:**
Install Ruby Version Manager RVM: `\curl -sSL https://get.rvm.io | bash -s stable --ruby`
Install Node Version Manager NVM: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`

### Steps

1. Clone or download the repository: `git clone git@github.com:dldinza-web/pipelines-dashboard.git`. **Author:** Dennys Lopez Dinza *@dldinza-web*
2. Go to the project directory: `cd pipelines-dashboard`
3. Execute the installation process: `sh ./bin/install.sh`

#### Troubleshooting
Open the file `./bin/install.sh` and execute each command one by one.

### Run Application
1. Execute the application: `yarn dev` and open http://localhost:3000/
2. `Ctrl + C` to close the application

### Tests

- Unit Tests TDD: `yarn test:backend`
- Unit Tests TDD: `yarn test:frontend`
- Automation Tests ATDD and BDD: `yarn test:env`
  - Run Cypress: `yarn cypress`
  - (optional) Run Cypress to run **e2e** Integration Tests manually: `yarn cypress:open`
