pipeline {
    agent {
        docker { 
            image 'node' 
            label 'red-host'
        }
    }
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
