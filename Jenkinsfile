pipeline {
    agent none
    environment { HOME='.' }
    stages {
        stage('Build') {
            agent {
                docker { 
                    image ‘node’ 
                    label ‘red-host’
                }
            }

            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage(‘Stage to red’) {
            agent {
                label ‘red-host’
            }

            steps {
                sh ‘rsync -r —delete -v dist/ /var/www/html/skyfarm/’
            }
        } 
    }
}
