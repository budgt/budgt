########################################
# Dockerfile to run budget mockBackend
# Based on node:alpine
########################################

# Set the base image to node
FROM node:alpine

EXPOSE 3000

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

# Copy config
COPY deploy/conf/mockBackend.json /opt/mockBackend.json

# Install json-server
RUN yarn global add -server

#CMD
#CMD ["/bin/sh -c", "json-server", "/opt/mockBackend.json"]