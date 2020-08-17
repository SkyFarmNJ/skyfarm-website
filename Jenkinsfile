pipeline {
    agent {
        docker { 
            image 'node' 
            args '-u 1000:1000'
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
