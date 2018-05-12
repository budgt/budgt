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

                sh 'ng -v'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn install'

                sh 'ng build'
            }
        
        }

        stage('unit test') {
            steps {
                sh 'ng test --browsers PhantomJS --single-run'
            }
        }

        stage('clean up') {
            steps {
                deleteDir()
            }
        }
    }
}