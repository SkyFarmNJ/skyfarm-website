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
                sh 'mkdir /.npm'
                sh 'ls -la /'
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
