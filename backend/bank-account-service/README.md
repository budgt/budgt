# Budget

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Build Status

Master:  
![Build Status Master](https://jenkins.hfmnn.com/buildStatus/icon?job=budgt/master) ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=alert_status 'quality gate') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=coverage 'coverage') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=code_smells 'code smells') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=security_rating 'security')  
Development:  
![Build Status Development](https://jenkins.hfmnn.com/buildStatus/icon?job=budgt/development)

## Build

Run `gradle backend:bank-account-service:build` to build the project. The build artifacts will be stored in the `build/libs` directory.

For local, development and production docker builds use gradle.

`gradle backend:bank-account-service:dockerbuild` will build the budgt-bank-account-service docker image based on the current file in `build/libs` and the `src/main/deploy/docker/Dockerfile`.

`gradle backend:bank-account-service:cleanBuildDocker` will clean the current `build/libs` folder, do a local build of the frontend and build the budgt-bank-account-service image.

## Running unit tests

Run `gradle backend:bank-account-service:test` to execute the unit tests.
