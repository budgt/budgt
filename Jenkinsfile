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

        stage('Compile') {
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

        stage('Prepare dev deployment') {
            parallel {
                stage("Build new frontend image") {
                    agent any

                    steps {
                        dir("frontend") {
                            unstash('dist')
                        }
                        sh 'docker build -f build/deploy/docker/frontend/Dockerfile -t budgt-frontend .'

                    }
                }

                stage("Build new mock-backend image") {
                    agent any

                    steps {
                        sh 'docker build -f backend/build/deploy/docker/mockBackend/Dockerfile -t budgt-mockbackend .'
                    }
                }

                stage("Clean dev environment") {
                    agent any
                    
                    when { 
                        branch 'development' 
                    }
                    steps {
                        sh 'docker ps -f name=budgt-frontend -q | xargs --no-run-if-empty docker container stop'
                        sh 'docker container ls -a -fname=budgt-frontend -q | xargs -r docker container rm'
                            
                        sh 'docker ps -f name=budgt-mockbackend -q | xargs --no-run-if-empty docker container stop'
                        sh 'docker container ls -a -fname=budgt-mockbackend -q | xargs -r docker container rm'    
                    }
                }
            }
        }

        stage('Deploy to dev') {
             when { 
                branch 'development' 
            }
            parallel {
                
                stage('Deploy mockBackend') {
                    agent any
                    
                    steps {
                        sh 'docker run -p 1338:3000 --name budgt-mockbackend -d budgt-mockbackend'
                    }
                }

                stage('Deploy frontend') {
                    agent any

                    steps {
                        sh 'docker run -p 1337:80 --name budgt-frontend -d budgt-frontend'
                    }
                }
            }
        }        
    }
}