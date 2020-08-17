pipeline {
    agent {
        docker { 
            image 'harunpeksen/docker-vue' 
            args '-u 1000:1000'
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
