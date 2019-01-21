########################################
# Dockerfile to build and test budget 
# Based on node
########################################

# Set the base image to node
FROM openjdk:8-jdk-stretch

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

################## BEGIN INSTALLATION ######################
#Install Node, NPM and yarn
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
    yarn \
    && rm -rf /var/lib/apt/lists/*

# Install angular cli and sonarqube-scanner
RUN yarn global add @angular/cli
RUN yarn global add sonarqube-scanner

##################### INSTALLATION END #####################

# Add jenkins user
RUN adduser jenkins --shell /bin/bash --disabled-password -u 974 --gecos ""
RUN echo 'jenkins  ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers