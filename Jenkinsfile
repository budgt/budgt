pipeline {
    agent {
        docker { 
            image 'node:8.11.1-alpine'
            args '-u root'
        }
    }

    stages {
        stage('Preparation') {
            steps {
                sh 'node --version'

                sh 'npm -v'

                sh 'npm install -g @angular/cli'
                
                sh 'ng -v'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'

                sh 'ng build'
            }
        
        }

        stage('unit test') {
            steps {
                sh 'ng test --browsers PhantomJS --single-run'
            }
        }
    }
}