pipeline {
    agent {
        dockerfile { 
            dir 'docker/build'
            additionalBuildArgs '-t budget-build'
        }
    }

    stages {

        stage('Install dependencies') {
            steps {
                sh 'yarn install'
            }
        }

        stage('Preparation') {
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
                        sh 'yarn lint'
                    }
                }   
            }   
        }

        stage('SonarQube analysis') {
            steps {
                sh "sonar-scanner -Dsonar.host.url=http://192.168.2.10:9000"
            }
        }

        stage('Build') {
            steps {
                sh 'ng build'
            }
        
        }

        stage('Unit test') {
            steps {
                sh 'ng test --browsers PhantomJS --watch=false'
            }
        }

        stage('Clean up') {
            steps {
                deleteDir()
            }
        }
    }
}