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
            parallel {
                stage('Check versions') {    
                    agent {
                        dockerfile { 
                            dir 'deploy/docker/build'
                            additionalBuildArgs '-t budget-build'
                        }
                    }

                    steps {
                        sh 'node --version'

                        sh 'npm -v'

                        sh 'yarn -v'

                        sh 'ng -v'

                    }
                }

                stage('Lint') {
                    agent {
                        dockerfile { 
                            dir 'deploy/docker/build'
                            additionalBuildArgs '-t budget-build'
                        }
                    }
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
                sh 'ng build --configuration=production '
                stash includes: 'dist/', name: 'dist'
                stash includes: 'deploy/conf/', name: 'conf'
            }
        
        }

        stage('Build and run Docker Image') {
            agent any

            steps {
                sh 'docker build deploy/docker/frontend -t budgt-frontend'
                sh 'docker run -p 1337:80 budgt-frontend'
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