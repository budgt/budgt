pipeline {
    agent {
        dockerfile { 
            dir 'docker/build'
            additionalBuildArgs '-t budget-build'
        }
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
                sh "sonar-scanner -Dsonar.host.url=http://192.168.2.10:9000"
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