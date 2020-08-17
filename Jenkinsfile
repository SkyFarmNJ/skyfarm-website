pipeline {
    agent {
        docker { 
            image 'vuejs/ci' 
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
