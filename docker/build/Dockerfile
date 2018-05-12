########################################
# Dockerfile to build and test budget 
# Based on node:alpine
########################################

# Set the base image to Ubuntu
FROM node:8.11.1-alpine

# File Author / Maintainer
MAINTAINER Patrick Hofmann

################## BEGIN INSTALLATION ######################
# Install yarn and angular-cli

# Install yarn
RUN npm install -g yarn

# Install angular cli
RUN yarn global add @angular/cli

##################### INSTALLATION END #####################
