#############################################
# Dockerfile to run budget account service
# Based on alpine:latest
#############################################

# Set the base image to node
FROM openjdk:8-jdk-alpine

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

#Copy config server jar
COPY backend/account-service/build/libs/*.jar /opt/lib/accountService.jar

#ENTRY POint
ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "/opt/lib/accountService.jar"]
