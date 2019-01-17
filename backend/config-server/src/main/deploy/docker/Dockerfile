##########################################
# Dockerfile to run budget config server 
# Based on openjdk:8-jdk-alpine
##########################################

# Set the base image to node
FROM openjdk:8-jdk-alpine

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

#Copy config server jar
COPY backend/config-server/build/libs/*.jar /opt/lib/configServer.jar

#ENTRY POint
ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "/opt/lib/configServer.jar"]