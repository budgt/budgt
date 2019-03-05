pipeline {
  agent none
  post {
    failure {
      updateGitlabCommitStatus name: 'build', state: 'failed'
    }

    success {
      updateGitlabCommitStatus name: 'build', state: 'success'
      createDynatraceDeploymentEvent(entityIds: [[$class: 'Host', entityId: 'HOST-06CCF82DAFF2621A']], envId: 'Dynatrace Development Program', tagMatchRules: [[meTypes: [[meType: 'APPLICATION'], [meType: 'HOST'], [meType: 'PROCESS_GROUP'], [meType: 'SERVICE']], tags: [[context: 'CONTEXTLESS', key: 'budgt', value: '']]]]) { }

    }
  }

  options {
    gitLabConnection('pahofmann')
  }

  triggers {
    gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
  }

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

    stage('Preparation') {
      parallel {

        stage('Check versions') {
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            dir("frontend") {

              unstash 'node_modules'

              sh 'node --version'

              sh 'yarn -v'

              sh 'ng --version'

              sh 'java -version'
            }
          }
        }

        stage('Lint') {
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

        stage('Prepare links') {
          agent any
          when {
            branch 'development'
          }

          steps {
            dir("frontend/build/deploy/conf") {
              sh 'ln -s dev/nginx.conf nginx.conf'
            }
          }
        }
      }
    }

      stage('Unit test') {
      parallel {
        stage("frontend") {
          agent {
            dockerfile {
              dir 'frontend/build/deploy/docker/build'
              additionalBuildArgs '-t budgt-build'
            }
          }

          steps {
            dir("frontend") {
              unstash 'node_modules'
              sh 'ng test --browsers PhantomJS --watch=false --code-coverage'
              script {
                publishHTML([
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: false,
                  reportDir: 'build/reports/coverage/report-html/',
                  reportFiles: 'index.html',
                  reportName: 'Unit test coverage'
                ])
              }
              stash includes: 'build/reports/coverage/lcov.info', name: 'frontend-coverage'
              junit 'build/reports/unit-test/*.xml'
            }
          }
        }

        stage("category-service") {
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
      }
    }

    stage('SonarQube analysis') {
      parallel {
        stage('Frontend') {
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

      }
    }


    stage("Compile") {
      parallel {
        stage('frontend') {
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

        stage('category-service') {
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
      }
    }

    stage('Build image') {
      when {
        branch 'development'
      }
      parallel {
        stage("frontend") {
          agent any

          steps {
            dir("frontend") {
              unstash('dist')
            }
            sh './gradlew frontend:dockerbuild'
          }
        }

        stage("category-service") {
          agent any

          steps {
            unstash('category-service')
            sh './gradlew backend:category-service:dockerbuild'
          }
        }

        stage("config-server") {
          agent any

          steps {
            unstash('config-server')
            sh './gradlew backend:config-server:dockerbuild'
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
          withDockerRegistry([ credentialsId: "792ba773-1b3a-48b1-b8d9-1f304cd9607e", url: "" ]) {
            sh 'docker tag budgt-frontend budgt/budgt-frontend:edge'
            sh 'docker push budgt/budgt-frontend:edge'

            sh 'docker tag budgt-category-service budgt/budgt-category-service:edge'
            sh 'docker push budgt/budgt-category-service:edge'

            sh 'docker tag budgt-config-server budgt/budgt-config-server:edge'
            sh 'docker push budgt/budgt-config-server:edge'
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
        sh 'scp -i /var/lib/jenkins/secrets/id_rsa docker/dev/docker-compose.yml budgt@docker.budgt.de:/opt/budgt/'
        sh 'ssh -i /var/lib/jenkins/secrets/id_rsa budgt@docker.budgt.de "cd /opt/budgt && docker-compose down"'
        sh 'ssh -i /var/lib/jenkins/secrets/id_rsa budgt@docker.budgt.de "cd /opt/budgt && docker-compose rm -f"'
          }
    }

    stage('Deploy to dev') {
       when {
        branch 'development'
      }
      agent any

      steps {
        sh 'ssh -i /var/lib/jenkins/secrets/id_rsa budgt@docker.budgt.de "cd /opt/budgt && docker-compose pull"'
        sh 'ssh -i /var/lib/jenkins/secrets/id_rsa budgt@docker.budgt.de "cd /opt/budgt && docker-compose up -d"'
      }
    }
  }
}
