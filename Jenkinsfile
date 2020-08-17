pipeline {
    agent {
        docker { 
            image 'harunpeksen/docker-vue' 
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
