#############################################
# Dockerfile to run budget banking connector
# Based on alpine:latest
#############################################

# Set the base image to node
FROM openjdk:8-jdk-alpine

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

#Copy config server jar
COPY backend/banking-connector/build/libs/*.jar /opt/lib/bankingConnector.jar

#ENTRY POint
ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "/opt/lib/bankingConnector.jar"]
