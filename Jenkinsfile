pipeline {
    agent {
        docker { 
            image 'node' 
            label 'red-host'
        }
    }
    environment { HOME='.' }
    stages {
        stage('Test') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
