########################################
# Dockerfile to run budget frontend
# Based on nginx:alpine
########################################

# Set the base image to node
FROM nginx:alpine

# File Author / Maintainer
LABEL maintainer="hofmann@budgt.de"

# Copy config
COPY frontend/build/deploy/conf/nginx.conf /etc/nginx/nginx.conf

# Copy app
WORKDIR /usr/share/nginx/html
COPY dist/ .

#CMD
CMD ["nginx", "-g", "daemon off;"]
