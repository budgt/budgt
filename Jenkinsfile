pipeline {
    agent {
        dockerfile { 
            dir 'docker/build'
            additionalBuildArgs '-t budget-build'
        }
    }

     tools {
        sonar 'sonar-scanner'
    }

    stages {
        stage('Preparation') {
            steps {
                checkout scm

                sh 'node --version'

                sh 'npm -v'

                sh 'yarn -v'

            }
        }

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('pahofmann') {
                    sh "sonar-scanner"
                }
            }
        }

        stage('Build') {
            steps {
                sh 'yarn install'

                sh 'ng -v'

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