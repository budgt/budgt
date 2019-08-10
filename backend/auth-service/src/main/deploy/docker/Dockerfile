#############################################
# Dockerfile to run budget auth service
# Based on alpine:latest
#############################################

# Set the base image to node
FROM openjdk:8-jdk-alpine

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

#Copy config server jar
COPY backend/auth-service/build/libs/*.jar /opt/lib/authService.jar

#ENTRY POint
ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "/opt/lib/authService.jar"]
