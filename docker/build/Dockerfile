########################################
# Dockerfile to build and test budget 
# Based on node:alpine
########################################

# Set the base image to node
FROM node

# File Author / Maintainer
MAINTAINER Patrick Hofmann

################## BEGIN INSTALLATION ######################
# Install angular cli
RUN yarn global add @angular/cli

##################### INSTALLATION END #####################

# Add jenkins user
RUN adduser jenkins -s /bin/ash -D -u 974
RUN echo 'jenkins  ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers
