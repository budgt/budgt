##########################################
# Dockerfile to run budget gateway server
# Based on openjdk:8-jdk-alpine
##########################################

# Set the base image to node
FROM openjdk:8-jdk-alpine

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

#Copy config server jar
COPY backend/gateway/build/libs/*.jar /opt/lib/gateway.jar

#ENTRY POint
ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "/opt/lib/gateway.jar"]
