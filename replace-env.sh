#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

echo "Injecting runtime environment variables..."

# Perform the string replacement securely using double quotes to capture the K8s env variable
find /usr/share/nginx/html -type f -exec sed -i "s|PLACEHOLDER_VITE_API_URL|$VITE_API_URL|g" {} +

echo "Injection complete."