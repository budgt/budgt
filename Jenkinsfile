pipeline {
    agent {
        docker { image 'node:8.11.1-alpine' }
    }

    stages {
        stage('Preparation') {
            steps {
                sh 'node --version'

                sh 'npm -v'

                sh 'npm install -g yarn'

                sh 'yarn -v'

                sh 'yarn global add @angular/cli'

                sh 'ng -v'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube analysis') {
            def scannerHome = tool 'sonar';
            
            withSonarQubeEnv('pahofmann') {
                sh "${scannerHome}/bin/sonar-scanner"
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