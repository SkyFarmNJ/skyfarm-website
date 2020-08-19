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
                sh 'echo "BUILD_NUMBER = ${BUILD_NUMBER}" > .env'
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
                // Dev Server
                sh 'rsync -r --delete -v dist/ /var/www/html/skyfarm/'
                
                // UAT
                sh 'rsync -r --delete -v dist/ 1n1:speers/sf-web-test/'
                
                // Create backup artifact.
                sh 'tar cvf ${ARCHIVE_FILE} dist/'
                
                // Archive the built artifacts
                archiveArtifacts artifacts: "${ARCHIVE_FILE}", followSymlinks: false
                
                // Build link info
                script {
                    currentBuild.description = "<a href='http://red.local/skyfarm'>SkyFarm dev website</a>\n<a href='http://www.speers.nu/sf-web-test/'>SkyFarm UAT Website</a>"
                }
            }
        } 

    }
}
