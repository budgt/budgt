pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }

    stages {
        stage('Preparation') {
            steps {
                sh 'node --version'
            }

            steps {
                sh 'npm install yarn'
            }

            steps {
                sh 'yarn -v'
            }

            steps {
                sh 'yarn add @angular/cli'
            }

            steps {
                sh 'ng -v'
            }
        }
    }

    stage {
        stage('Build') {
            steps {
                sh 'yarn install'
            }

            steps {
                sh 'ng build'
            }
        
        }
    }
    stage {
        stage('unit test') {
            steps {
                sh 'ng test --browsers PhantomJS'
            }
        }
    }
}