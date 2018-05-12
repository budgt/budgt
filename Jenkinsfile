pipeline {
    agent none

    stages {

        stage('Fetch dependencies') {
            agent {
                dockerfile { 
                    dir 'deploy/docker/build'
                    additionalBuildArgs '-t budget-build'
                }
            }

            steps {
                sh 'yarn install'
                stash includes: 'node_modules/', name: 'node_modules'
            }
        }

        stage('Preparation') {
            agent {
                dockerfile { 
                    dir 'deploy/docker/build'
                    additionalBuildArgs '-t budget-build'
                }
            }

            parallel {
                stage('Check versions') {    
                    steps {
                        sh 'node --version'

                        sh 'npm -v'

                        sh 'yarn -v'

                        sh 'ng -v'

                    }
                }

                stage('Lint') {
                    steps {
                        unstash 'node_modules'
                        sh 'yarn lint'
                    }
                }   
            }   
        }

        stage('SonarQube analysis') {
            agent {
                dockerfile { 
                    dir 'deploy/docker/build'
                    additionalBuildArgs '-t budget-build'
                }
            }

            steps {
                unstash 'node_modules'
                sh "sonar-scanner -Dsonar.host.url=http://192.168.2.10:9000"
            }
        }

        stage('Unit test') {
            agent {
                dockerfile { 
                    dir 'deploy/docker/build'
                    additionalBuildArgs '-t budget-build'
                }
            }

            steps {
                unstash 'node_modules'
                sh 'ng test --browsers PhantomJS --watch=false'
                junit 'reports/**/*.xml'
            }
        }

        stage('Compile') {
            agent {
                dockerfile { 
                    dir 'deploy/docker/build'
                    additionalBuildArgs '-t budget-build'
                }
            }

            steps {
                unstash 'node_modules'
                sh 'ng build --env=production'
                stash includes: 'dist/', name: 'dist'
            }
        
        }

        stage('Clean up') {
            agent {
                dockerfile { 
                    dir 'deploy/docker/build'
                    additionalBuildArgs '-t budget-build'
                }
            }

            steps {
                deleteDir()
            }
        }
    }
}