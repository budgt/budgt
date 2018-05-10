pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }

    stages {
        stage('Preparation') {
            steps {
                sh 'node --version'

                sh 'npm install yarn'

                sh 'yarn -v'

                sh 'yarn add @angular/cli'

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
                sh 'ng test --browsers PhantomJS'
            }
        }
    }
}