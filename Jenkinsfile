pipeline {
    agent {
        docker { 
            image 'node:14-alpine' 
            label 'red-host'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
