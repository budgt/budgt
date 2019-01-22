pipeline {
    agent none
    post {
      failure {
        updateGitlabCommitStatus name: 'build', state: 'failed'
      }
      success {
        updateGitlabCommitStatus name: 'build', state: 'success'
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
            agent {
                dockerfile { 
                    dir 'frontend/build/deploy/docker/build'
                    additionalBuildArgs '-t budgt-build'
                }
            }

            steps {
                deleteDir()
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
                            sh 'node --version'

                            sh 'npm -v'

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
            }   
        }

        stage('Unit test') {
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
                    junit 'build/reports/unit-test/*.xml'
                }
            }
        }

        stage('SonarQube analysis') {
            agent {
                dockerfile { 
                    dir 'frontend/build/deploy/docker/build'
                    additionalBuildArgs '-t budgt-build'
                }
            }

            steps {
                withSonarQubeEnv('sonarcloud') {
                    dir("frontend") {
                        sh "sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"
                    }
                }
            }
        }

        stage("Compile modules") {
            parallel {
                stage('Compile frontend') {
                    agent {
                        dockerfile { 
                            dir 'frontend/build/deploy/docker/build'
                            additionalBuildArgs '-t budgt-build'
                        }
                    }

                    steps {
                        dir("frontend") {
                            unstash 'node_modules'
                            sh 'ng build --configuration=production'
                            stash includes: 'dist/', name: 'dist'
                            stash includes: 'build/deploy/conf/', name: 'conf'
                        }
                    }
                }

                stage('Compile config-server') {
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

                stage('Compile category-service') {
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

        stage('Prepare dev deployment') {
            parallel {
                stage("Build new frontend image") {
                    agent any

                    steps {
                        unstash('dist')
                        sh './gradlew frontend:dockerbuild'
                    }
                }

                stage("Build new category-service image") {
                    agent any

                    steps {
                        unstash('category-service')
                        sh './gradlew backend:category-service:dockerbuild'
                    }
                }

                stage("Build new config-server image") {
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
                        sh 'docker push budgt/budgt-frontend:edge'
                        sh 'docker push budgt/budgt-category-service:edge'
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
                script {
                    def remote = [:]
                    remote.name = "docker.budgt.de"
                    remote.host = "docker.budgt.de"

                    withCredentials([sshUserPrivateKey(credentialsId: 'c3551b25-f50a-4443-89fa-dc296a32c46c', keyFileVariable: 'identity', passphraseVariable: 'passphrase', usernameVariable: 'sshusername')]) {
                        remote.user = sshusername
                        remote.identityFile = identity
                        stage("Deploy to dev.") {
                            sshPut remote: remote, from: 'docker-compose.yml', into: '.'
                            sshScript remote: remote, script: 'docker-compose down'
                            sshScript remote: remote, script: 'docker-compose rm -f'
                        }
                    }
                }
            }
        }

        stage('Deploy to dev') {
             when { 
                branch 'development' 
            }
            agent any
                    
            steps {
                script {
                    def remote = [:]
                    remote.name = "docker.budgt.de"
                    remote.host = "docker.budgt.de"

                    withCredentials([sshUserPrivateKey(credentialsId: 'c3551b25-f50a-4443-89fa-dc296a32c46c', keyFileVariable: 'identity', passphraseVariable: 'passphrase', usernameVariable: 'sshusername')]) {
                        remote.user = sshusername
                        remote.identityFile = identity
                        stage("Deploy to dev.") {
                            sshPut remote: remote, from: 'docker-compose.yml', into: '.'
                            sshScript remote: remote, script: 'docker-compose up -d'
                        }
                    }
                }
            }
        }        
    }
}
