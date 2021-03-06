pipeline {
  agent none

  stages {
    stage('Clean up workspace') {
      agent any

      steps {
        dir("${env.WORKSPACE}") {
          deleteDir()
        }
        dir("${env.WORKSPACE}@2") {
          deleteDir()
        }
        dir("${env.WORKSPACE}@3") {
          deleteDir()
        }
        dir("${env.WORKSPACE}@tmp") {
          deleteDir()
        }
        dir("${env.WORKSPACE}@2@tmp") {
          deleteDir()
        }
        dir("${env.WORKSPACE}@3@tmp") {
          deleteDir()
        }
      }
    }

    stage('Fetch dependencies') {
      when {
        changeset "**/frontend/**"
      }
      agent {
        dockerfile {
          dir 'frontend/build/deploy/docker/build'
          additionalBuildArgs '-t budgt-build'
        }
      }

      steps {
        dir("frontend") {
          sh 'yarn install'
          stash includes: 'node_modules/', name: 'node_modules'
        }
      }
    }

    stage('Lint') {
      when {
        changeset "**/frontend/**"
      }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }
          steps {
            dir("frontend") {
              unstash 'node_modules'
              sh 'yarn lint'
            }
        }
    }

    stage('Unit test') {
      parallel {
        stage("frontend") {
          when {
            changeset "**/frontend/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            dir("frontend") {
              unstash 'node_modules'
              sh 'yarn test-coverage'
              script {
                publishHTML([
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: false,
                  reportDir: 'build/reports/coverage/lcov-report/',
                  reportFiles: 'index.html',
                  reportName: 'Unit test coverage'
                ])
              }
              stash includes: 'build/reports/coverage/lcov.info', name: 'frontend-coverage'
            }
          }
        }

        stage("category-service") {
          when {
            changeset "**/backend/category-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:category-service:test jacocoTestReport'
            script {
              publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: false,
                reportDir: 'backend/category-service/build/reports/',
                reportFiles: 'tests/test/index.html',
                reportName: 'Unit test'
              ])
            }
            stash includes: 'backend/category-service/build/reports/jacoco/test/jacocoTestReport.xml', name: 'category-service-coverage'
            junit 'backend/category-service/build/test-results/**/*.xml'
          }
        }

        stage("auth-service") {
          when {
            changeset "**/backend/auth-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:auth-service:test jacocoTestReport'
            script {
              publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: false,
                reportDir: 'backend/auth-service/build/reports/',
                reportFiles: 'tests/test/index.html',
                reportName: 'Unit test'
              ])
            }
            stash includes: 'backend/auth-service/build/reports/jacoco/test/jacocoTestReport.xml', name: 'auth-service-coverage'
            junit 'backend/auth-service/build/test-results/**/*.xml'
          }
        }

        stage("accout-service") {
          when {
            changeset "**/backend/account-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:account-service:test jacocoTestReport'
            script {
              publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: false,
                reportDir: 'backend/account-service/build/reports/',
                reportFiles: 'tests/test/index.html',
                reportName: 'Unit test'
              ])
            }
            stash includes: 'backend/account-service/build/reports/jacoco/test/jacocoTestReport.xml', name: 'account-service-coverage'
            junit 'backend/account-service/build/test-results/**/*.xml'
          }
        }
      }
    }

    stage('SonarCloud analysis') {
      parallel {
        stage('Frontend') {
          when {
            changeset "**/frontend/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            unstash 'frontend-coverage'
            withSonarQubeEnv('sonarcloud') {
              dir("frontend") {
                sh "sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"
              }
            }
          }
        }

        stage('category-service') {
          when {
            changeset "**/backend/category-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            unstash 'category-service-coverage'
            withSonarQubeEnv('sonarcloud') {
              dir("backend/category-service") {
                sh "sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"
              }
            }
          }
        }

        stage('auth-service') {
          when {
            changeset "**/backend/auth-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            unstash 'auth-service-coverage'
            withSonarQubeEnv('sonarcloud') {
              dir("backend/auth-service") {
                sh "sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"
              }
            }
          }
        }

        stage('account-service') {
          when {
            changeset "**/backend/account-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            unstash 'account-service-coverage'
            withSonarQubeEnv('sonarcloud') {
              dir("backend/account-service") {
                sh "sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"
              }
            }
          }
        }

      }
    }

    stage("Compile") {
      parallel {
        stage('frontend') {
          when {
            changeset "**/frontend/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            dir("frontend") {
              unstash 'node_modules'
            }

            sh './gradlew frontend:build'

            dir("frontend") {
              stash includes: 'dist/', name: 'dist'
              stash includes: 'build/deploy/conf/', name: 'conf'
            }
          }
        }

        stage('config-server') {
          when {
            changeset "**/backend/config-server/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:config-server:build'
            stash includes: 'backend/config-server/build/libs/', name: 'config-server'
          }
        }

        stage('gateway') {
          when {
            changeset "**/backend/gateway/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:gateway:build -x test'
            stash includes: 'backend/gateway/build/libs/', name: 'gateway'
          }
        }

        stage('category-service') {
          when {
            changeset "**/backend/category-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:category-service:build'
            stash includes: 'backend/category-service/build/libs/', name: 'category-service'
          }
        }

        stage('auth-service') {
          when {
            changeset "**/backend/auth-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:auth-service:build'
            stash includes: 'backend/auth-service/build/libs/', name: 'auth-service'
          }
        }

        stage('account-service') {
          when {
            changeset "**/backend/account-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:account-service:build'
            stash includes: 'backend/account-service/build/libs/', name: 'account-service'
          }
        }

        stage('registry-service') {
          when {
            changeset "**/backend/registry-service/**"
          }
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            sh './gradlew backend:registry-service:build'
            stash includes: 'backend/registry-service/build/libs/', name: 'registry-service'
          }
        }
      }
    }

    stage('Build image') {
      when {
        branch 'development'
      }
      parallel {
        stage("frontend") {
          when {
            changeset "**/frontend/**"
          }
          agent any

          steps {
            dir("frontend") {
              unstash('dist')
            }

            dir("frontend/build/deploy/conf") {
              sh 'cp dev/nginx.conf nginx.conf'
            }

            sh './gradlew frontend:dockerbuild'
          }
        }

        stage("category-service") {
          when {
            changeset "**/backend/category-service/**"
          }
          agent any

          steps {
            unstash('category-service')
            sh './gradlew backend:category-service:dockerbuild'
          }
        }

        stage("auth-service") {
          when {
            changeset "**/backend/auth-service/**"
          }
          agent any

          steps {
            unstash('auth-service')
            sh './gradlew backend:auth-service:dockerbuild'
          }
        }

        stage("account-service") {
          when {
            changeset "**/backend/account-service/**"
          }
          agent any

          steps {
            unstash('account-service')
            sh './gradlew backend:account-service:dockerbuild'
          }
        }

        stage("registry-service") {
          when {
            changeset "**/backend/registry-service/**"
          }
          agent any

          steps {
            unstash('registry-service')
            sh './gradlew backend:registry-service:dockerbuild'
          }
        }

        stage("config-server") {
          when {
            changeset "**/backend/config-server/**"
          }
          agent any

          steps {
            unstash('config-server')
            sh './gradlew backend:config-server:dockerbuild'
          }
        }

        stage("gateway") {
          when {
            changeset "**/backend/gateway/**"
          }
          agent any

          steps {
            unstash('gateway')
            sh './gradlew backend:gateway:dockerbuild'
          }
        }
      }
    }

    stage('Publish') {
      agent any
      when {
        branch 'development'
      }

      steps {
        script {
          withDockerRegistry([ credentialsId: "2fe1c51c-354e-4e1d-8ef1-2aab165abd22", url: "" ]) {
            sh 'docker tag budgt-frontend budgt/budgt-frontend:edge'
            sh 'docker push budgt/budgt-frontend:edge'

            sh 'docker tag budgt-category-service budgt/budgt-category-service:edge'
            sh 'docker push budgt/budgt-category-service:edge'

            sh 'docker tag budgt-auth-service budgt/budgt-auth-service:edge'
            sh 'docker push budgt/budgt-auth-service:edge'

            sh 'docker tag budgt-account-service budgt/budgt-account-service:edge'
            sh 'docker push budgt/budgt-account-service:edge'

            sh 'docker tag budgt-registry-service budgt/budgt-registry-service:edge'
            sh 'docker push budgt/budgt-registry-service:edge'

            sh 'docker tag budgt-config-server budgt/budgt-config-server:edge'
            sh 'docker push budgt/budgt-config-server:edge'

            sh 'docker tag budgt-gateway budgt/budgt-gateway:edge'
            sh 'docker push budgt/budgt-gateway:edge'
          }
        }
      }
    }

    stage("Clean dev environment") {
      agent any
      when {
        branch 'development'
      }
      steps {
        sshagent(['88d5d798-30d2-49aa-b6cd-8470b97bc9b3']) {
            sh 'scp -o StrictHostKeyChecking=no docker/dev/docker-compose.yml budgt@docker.budgt.de:/opt/budgt/'
            sh 'ssh -o StrictHostKeyChecking=no budgt@docker.budgt.de "cd /opt/budgt && docker-compose rm -f"'
        }
      }
    }

    stage('Deploy to dev') {
       when {
        branch 'development'
      }
      agent any

      steps {
        sshagent(['88d5d798-30d2-49aa-b6cd-8470b97bc9b3']) {
          sh 'ssh -o StrictHostKeyChecking=no budgt@docker.budgt.de "cd /opt/budgt && docker-compose up -d"'
        }
      }
    }
  }
}
