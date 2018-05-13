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

        stage('Prepare dev deployment') {
            parallel {
                stage("Build new frontend image") {
                    agent any

                    steps {
                        sh 'docker build -f deploy/docker/frontend/Dockerfile -t budgt-frontend .'
                    }
                }

                stage("Build new mock-backend image") {
                    agent any

                    steps {
                        sh 'docker build -f deploy/docker/mockBackend/Dockerfile -t budgt-mockbackend .'
                    }
                }

                stage("Clean dev environment") {
                    agent any

                    steps {
                        script {
                            try {
                                def frontend = sh 'docker inspect -f {{.State.Running}} budget-frontend';
                                if (frontend) {
                                    sh 'docker stop budget-frontend'
                                    sh 'docker rm budget-frontend'
                                }
                            } catch (ex) {
                                echo 'No frontend container running...'
                            }
                            
                            try {
                                def mockBackend = sh 'docker inspect -f {{.State.Running}} budget-mockbackend'
                                if (mockbackend) {
                                    sh 'docker stop budget-mockbackend'
                                    sh 'docker rm budget-mockbackend'
                                }
                            } catch (ex) {
                                echo 'No mockBackend container running...'
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to dev') {
            parallel {
                
                stage('Deploy mockBackend') {
                    agent any
                    
                    steps {
                        sh 'docker run -p 1338:3000 -d budgt-mockbackend -name budgt-mockbackend'
                    }
                }

                stage('Deploy frontend') {
                    agent any
                    
                    steps {
                        sh 'docker run -p 1337:80 -d budgt-frontend -name budgt-frontend'
                    }
                }
            }
        }        

        stage('Clean up workspace') {
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