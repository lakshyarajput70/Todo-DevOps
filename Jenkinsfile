pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            docker --version
                            docker compose version
                        '''
                    } else {
                        bat '''
                            docker --version
                            docker compose version
                        '''
                    }
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose down || true'
                    } else {
                        bat 'docker compose down'
                    }
                }
            }
        }

        stage('Build Fresh Images') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose build --no-cache'
                    } else {
                        bat 'docker compose build --no-cache'
                    }
                }
            }
        }

        stage('Start Containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker compose up -d'
                    } else {
                        bat 'docker compose up -d'
                    }
                }
            }
        }

        stage('Verify Running Containers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker ps'
                    } else {
                        bat 'docker ps'
                    }
                }
            }
        }
    }

    post {

        success {
            echo '========================================='
            echo 'Deployment Successful!'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'Deployment Failed!'
            echo 'Check the console output for details.'
            echo '========================================='
        }

        always {
            cleanWs()
        }
    }
}