# Budget

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Build Status

Master:  
![Build Status Master](https://jenkins.pahofmann.com/buildStatus/icon?job=budget/master) ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=alert_status 'quality gate') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=coverage 'coverage') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=code_smells 'code smells') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=security_rating 'security')  
Development:  
![Build Status Development](https://jenkins.pahofmann.com/buildStatus/icon?job=budget/development)

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `gradle frontend:buildLocal` to build the project. The build artifacts will be stored in the `dist/` directory.

For local, development and production docker builds use gradle.

`gradle frontend:dockerbuild` will build the budgt-frontend docker image based on the current files in `dist/` and the `build/deploy/docker/frontend/Dockerfile`.

`gradle frontend:cleanBuildDockerLocal` will clean the current `dist/` folder, do a local build of the frontend and build the budgt-frontend image.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `yarn test-debug` to execute the unit tests in a chrome browser with remote debugging enabled.
