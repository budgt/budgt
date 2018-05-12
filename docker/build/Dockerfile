########################################
# Dockerfile to build and test budget 
# Based on node:alpine
########################################

# Set the base image to node
FROM node

# File Author / Maintainer
MAINTAINER Patrick Hofmann

################## BEGIN INSTALLATION ######################
# Install angular cli and sonarqube-scanner
RUN yarn global add @angular/cli
RUN yarn global add sonarqube-scanner

##################### INSTALLATION END #####################

# Add jenkins user
RUN adduser jenkins --shell /bin/bash --disabled-password -u 974 --gecos ""
RUN echo 'jenkins  ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers

#Configure sonarqube server
#RUN echo 'sonar.host.url=http://192.168.2.10:9000' >> /root/.sonar/native-sonar-scanner/sonar-scanner-3.0.3.778-linux/conf/sonar-scanner.properties
#RUN echo 'sonar.host.url=http://192.168.2.10:9000' >> /etc/sonar-scanner/sonar-scanner.properties
