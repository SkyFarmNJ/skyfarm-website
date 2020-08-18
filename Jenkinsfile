pipeline {
    agent none
    environment { 
        HOME='.'
        ARCHIVE_FILE = 'skyfarm-website.tar'
    }
    stages {
        stage('Build') {
            agent {
                docker { 
                    image 'node'
                    label 'red-host'
                }
            }

            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Cleanup') {
            when { expression { fileExists "${ARCHIVE_FILE}" } }
            agent {
                label 'red-host'
            }

            steps {
                sh "rm -f  ${ARCHIVE_FILE}"
            }
        }            
        stage('Stage to red, Archive and Publish') {
            agent {
                label 'red-host'
            }

            steps {
                sh 'rsync -r --delete -v dist/ /var/www/html/skyfarm/'
                sh 'tar cvf ${ARCHIVE_FILE} dist/'
                
                // Archive the built artifacts
                archiveArtifacts artifacts: "${ARCHIVE_FILE}", followSymlinks: false
                
                // Build link info
                script {
                    currentBuild.description = "<a href='http://red.local/skyfarm'>SkyFarm dev website</a>"
                }
            }
        } 

    }
}
