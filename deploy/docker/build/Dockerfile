########################################
# Dockerfile to build and test budget 
# Based on node
########################################

# Set the base image to node
FROM node:11.1

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

################## BEGIN INSTALLATION ######################
# Install angular cli and sonarqube-scanner
RUN yarn global add @angular/cli
RUN yarn global add sonarqube-scanner

##################### INSTALLATION END #####################

# Add jenkins user
RUN adduser jenkins --shell /bin/bash --disabled-password -u 974 --gecos ""
RUN echo 'jenkins  ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers