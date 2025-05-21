#!/bin/bash

# Load environment variables from the .env file at the root of the project
ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
else
  echo ".env file not found at $ENV_FILE. Please ensure it exists."
  exit 1
fi

# Check if VERDACCIO_DOMAIN is set
if [ -z "$VERDACCIO_DOMAIN" ]; then
  echo "VERDACCIO_DOMAIN is not set in the .env file."
  exit 1
fi

# Set the npm registry
npm set registry "$VERDACCIO_DOMAIN"

# Confirm the registry has been set
echo "npm registry has been set to: $VERDACCIO_DOMAIN"

# help user to revert the registry to default
echo "To revert the npm registry to default, run:"
echo "  npm config delete registry"