pipeline {
    agent {
        docker { 
            image 'helaili/vuecli' 
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
