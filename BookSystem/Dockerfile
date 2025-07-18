# Use WildFly base image
FROM quay.io/wildfly/wildfly:latest

# Set the deployment directory
COPY target/server/standalone/deployments/ROOT.war /opt/jboss/wildfly/standalone/deployments/

# Optional: expose HTTP port
EXPOSE 8080