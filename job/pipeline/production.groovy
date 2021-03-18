pipeline {
    agent any

    environment {
        NODE_ENV_DEV=false
        NODE_ENV_TEST=false
        NODE_ENV_HOST_SMTP='smtp.gmail.com'
        NODE_ENV_PORT_SMTP='465'
        NODE_ENV_SECURE_SMTP=false
        NODE_ENV_USER_SMTP='mannafabrizio83@gmail.com'
        NODE_ENV_PASS_SMTP='FmDj)/&(=0@'
        NODE_ENV_SERVICE_SMTP=true
        NODE_ENV_DEBUG_SMTP=true
        NODE_ENV_REJECT_UNAUTHORIZED_SMTP=false
        NODE_ENV_CACHE_LOCAL=true
    }

    triggers {
        cron('*/50 * * * *')
    }

    stages {

        stage('Cloning project') {
            steps {
                echo 'Init project from repository'
                git 'https://github.com/CrashOverride97680/myCMS.JS.git'
                echo 'Cloning project complete'
            }
        }

        stage('Prepare file for build') {
            steps {
                echo 'Init create file for build'
                writeFile encoding: 'UTF-8', file: './app/.env', text: '\n' +
                'NODE_ENV_DEV=' + env.NODE_ENV_DEV + '\n' +
                'NODE_ENV_TEST=' + env.NODE_ENV_TEST + '\n' +
                'NODE_ENV_HOST_SMTP=' + env.NODE_ENV_HOST_SMTP + '\n' +
                'NODE_ENV_PORT_SMTP=' + env.NODE_ENV_PORT_SMTP + '\n' +
                'NODE_ENV_SECURE_SMTP=' + env.NODE_ENV_SECURE_SMTP + '\n' +
                'NODE_ENV_USER_SMTP=' + env.NODE_ENV_USER_SMTP + '\n' +
                'NODE_ENV_PASS_SMTP=' + env.NODE_ENV_PASS_SMTP + '\n' +
                'NODE_ENV_SERVICE_SMTP=' + env.NODE_ENV_SERVICE_SMTP + '\n' +
                'NODE_ENV_DEBUG_SMTP=' + env.NODE_ENV_DEBUG_SMTP + '\n' +
                'NODE_ENV_REJECT_UNAUTHORIZED_SMTP=' + env.NODE_ENV_REJECT_UNAUTHORIZED_SMTP + '\n' +
                'NODE_ENV_CACHE_LOCAL=' + env.NODE_ENV_CACHE_LOCAL + '\n'
                echo 'File create for build'
            }
        }

        stage('Prepare Dockerfile for build') {
            steps {
                echo 'Init create file Dockerfile for build'
                writeFile encoding: 'UTF-8', file: './app/Dockerfile', text: '\n' +
                'FROM node:alpine' + '\n' +
                'RUN mkdir /src' + '\n' +
                'WORKDIR /src' + '\n' +
                'ADD package.json /src' + '\n' +
                'ADD ./* /src/' + '\n' +
                'EXPOSE 9000' + '\n'
                echo 'File created'
            }
        }

        stage('Build project') {
            steps {
                echo 'Init build'
                sh 'COMPOSE_HTTP_TIMEOUT=1000 docker-compose up -d --no-deps --build'
                echo 'Build complete'
            }
        }
    }
}