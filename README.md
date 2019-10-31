# Budget
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/budgt/community)

The budgt frontend is written in angular, the backend with java and the spring framework.

## Build Status

Master  
![Build Status Master](https://jenkins.hfmnn.com/buildStatus/icon?job=budget/master)  
Development  
![Build Status Development](https://jenkins.hfmnn.com/buildStatus/icon?job=budgt/development)

### Frontend

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=alert_status "quality gate") ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=coverage "coverage") ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=code_smells "code smells") ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-frontend&metric=security_rating "security")

### Category Service

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-category-service&metric=alert_status "quality gate") ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-category-service&metric=coverage "coverage") ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-category-service&metric=code_smells "code smells") ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-category-service&metric=security_rating "security")

### Account Service
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=alert_status 'quality gate') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=coverage 'coverage') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=code_smells 'code smells') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-account-service&metric=security_rating 'security')

### Auth Service
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-auth-service&metric=alert_status 'quality gate') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-auth-service&metric=coverage 'coverage') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-auth-service&metric=code_smells 'code smells') ![alt text](https://sonarcloud.io/api/project_badges/measure?project=budgt-auth-service&metric=security_rating 'security')  

## Build

Run `gradle cleanBuildDockerLocal` to build the project. It will build the frontend and all microservices, and create new docker images according to the relevant docker files.

See the subfolders of the different services for more information.
